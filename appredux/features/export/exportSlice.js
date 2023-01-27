import { createSlice } from '@reduxjs/toolkit';
import { pick } from 'lodash';
import { batch } from 'react-redux';
import { widgetsApi } from '../../../appredux/services/widgets/widgets';
import { STORY_STATUS_PUBLISHED } from '../../../components/stories/constants/story';
import { defaultDomain } from '../../../config/constants';
import { storyUrls, widgetUrls } from '../../../config/urls';
import api, { checkPending } from '../../../utils/api';
import { changeColorToGradient } from '../../../utils/colors';
import { cloneObj } from '../../../utils/commonUtils';
import { removeFontsFromAmp } from '../../../utils/editorUtils';
import loopThroughStoryLayers from '../../../utils/loopThroughStoryLayers';
import { prepareTextLayer } from '../../../utils/textEditorUtils';
import { invalidateRTKStory, setNewAmpStory, updateStoryConfigDebounced } from '../amp-story/ampStorySlice';
import { ActionCreators } from '../amp-story/enhancedUndoable';
import { removeStoryPendingMedia, resetImageCrops, resetStoryChangedCount } from '../editor/helpers/helpersSlice';
import { loadingFinished, loadingStarted } from '../loader/loaderSlice';
import { replaceTemporaryMediaInStory } from '../media/mediaSlice';

const initialState = {
  isExportModalOpen: false,
  isPosterModalOpen: false,
  isPublishedModalOpen: false,
  isSocialMediaSuccessModalOpen: false,
  posterType: '',
  bucketKey: '',
  extendedAccessKey: null,
  isExportLoading: false,
  domain: defaultDomain,
};

const exportSlice = createSlice({
  name: 'export',
  initialState,
  reducers: {
    setIsExportModalOpen(state, action) {
      state.isExportModalOpen = action.payload;
    },
    setIsPosterModalOpen(state, action) {
      state.isPosterModalOpen = action.payload;
    },
    setIsPublishedModalOpen(state, action) {
      state.isPublishedModalOpen = action.payload;
    },
    setIsSocialMediaSuccessModalOpen(state, action) {
      state.isSocialMediaSuccessModalOpen = action.payload;
    },
    setPosterType(state, action) {
      state.posterType = action.payload;
    },
    toggleExportLoading(state, action) {
      state.isExportLoading = action.payload;
    },
    setBucketKey(state, action) {
      state.bucketKey = action.payload;
    },
    setExtendedAccessKey(state, action) {
      state.extendedAccessKey = action.payload;
    },
    setDomain(state, action) {
      state.domain = action.payload;
    },
  },
});

export const {
  setIsExportModalOpen,
  setIsPosterModalOpen,
  setPosterType,
  setIsPublishedModalOpen,
  toggleExportLoading,
  setBucketKey,
  setIsSocialMediaSuccessModalOpen,
  setExtendedAccessKey,
  setDomain,
} = exportSlice.actions;

export default exportSlice.reducer;

export const saveStoryAndOpenPublishAsWebStory = (disableLoader) => async (dispatch, getState) => {
  dispatch(replaceTemporaryMediaInStory());
  updateStoryConfigDebounced.cancel();

  const state = getState();
  const ampStory = state.ampStory.present;
  const userId = state.auth?.user?._id;
  const clonedObj = cloneObj(ampStory);
  clonedObj.modifiedBy = userId;
  removeFontsFromAmp(clonedObj);
  // Maybe local loader?
  try {
    if (!disableLoader) {
      dispatch(loadingStarted());
    }
    // Save the settings and get the new cover
    const saveRequestConfig = {
      method: 'PUT',
      url: storyUrls.saveStoryChanges,
    };

    let pendingSaveRequest = checkPending(saveRequestConfig);
    while (pendingSaveRequest) {
      await new Promise((res) => setTimeout(res, 500));
      pendingSaveRequest = checkPending(saveRequestConfig);
    }

    const ampStoryResponse = await api.put(storyUrls.saveStoryChanges, {
      ampStory: clonedObj,
    });

    const responseAmpStory = ampStoryResponse?.data;
    loopThroughStoryLayers(responseAmpStory, [changeColorToGradient, prepareTextLayer]);
    const updatedStory = {
      ...ampStory,
      ...responseAmpStory,
      googleFonts: responseAmpStory?.googleFonts,
      fonts: responseAmpStory?.fonts,
    };

    // Assign the new cover to the story
    batch(() => {
      dispatch(setNewAmpStory(updatedStory));
      dispatch(invalidateRTKStory(updatedStory?._id));
    });

    // const hasStoryChangedResponse: AxiosResponse = await api.get(storyUrls.checkChanges(ampStory._id));

    // if (!hasStoryChangedResponse.data) {
    //   batch(() => {
    //     dispatch(setBucketKey(ampStory.amp?.key ?? ''));
    //     dispatch(setIsExportModalOpen(true));
    //   });
    //   return;
    // }

    batch(() => {
      dispatch(ActionCreators.updatePastMediaLayers());
      dispatch(setIsExportModalOpen(true));
      dispatch(removeStoryPendingMedia(ampStory._id));
    });
  } catch (e) {
    // TODO
    console.error(e);
  } finally {
    batch(() => {
      dispatch(resetStoryChangedCount());
      if (!disableLoader) {
        dispatch(loadingFinished());
      }
    });
  }
};

export const publishWebStory = () => async (dispatch, getState) => {
  const state = getState();
  const ampStory = state.ampStory.present;
  const selectedTags = state.tags.selectedTags;

  // Check if story was already published and needs to be updated
  // or publish the story for first time

  const url = storyUrls.publishWebStory;
  const method = 'post';
  const storyId = ampStory._id;

  try {
    dispatch(toggleExportLoading(true));

    const publishResponse = await api.request({
      method,
      url,
      data: { storyId },
    });

    // Assign the exported story to store
    const publishedStory = { ...ampStory, ...publishResponse.data };
    const bucketKey = publishResponse.data.amp?.key;
    const hasExtendedAccess = publishResponse.data?.hasAccessControl && publishResponse.data?.extendedAccess;

    if (!bucketKey) {
      return;
    }

    const tags = selectedTags?.map(({ id }) => id) ?? [];

    await api.put(storyUrls.updateStoryTags, {
      storyId,
      amp: publishResponse.data.amp,
      tags,
    });

    publishedStory.tags = tags ?? [];

    loopThroughStoryLayers(publishedStory, [changeColorToGradient, prepareTextLayer]);
    batch(() => {
      dispatch(setNewAmpStory(publishedStory));
      dispatch(invalidateRTKStory(publishedStory?._id));
      dispatch(setBucketKey(bucketKey));
      if (hasExtendedAccess) {
        dispatch(setExtendedAccessKey(`${bucketKey}?utm_source=newsshowcase&utm_medium=gnews`));
      }
    });
  } catch (e) {
    console.error(e);
    return;
  } finally {
    dispatch(toggleExportLoading(false));
  }

  batch(() => {
    dispatch(setIsExportModalOpen(false));
    dispatch(setIsPublishedModalOpen(true));
    dispatch(resetImageCrops());
    dispatch(widgetsApi.util.invalidateTags([{ type: 'Widgets' }]));
  });
};

export const updateMetadata = (input) => async (dispatch, getState) => {
  const state = getState();
  const ampStory = state.ampStory.present;
  // Temp until props sorted
  const updateBody = pick(input, ['title', 'description', 'authorName']);

  try {
    dispatch(toggleExportLoading(true));
    const metadataUpdateResponse = await api.put(storyUrls.updateMetadata, {
      id: ampStory._id,
      title: updateBody?.title,
      customDomain: ampStory?.customDomain,
      description: updateBody?.description,
      ...(updateBody?.authorName && {
        authorSEO: {
          name: updateBody?.authorName,
        },
      }),
    });
    const storyResponse = metadataUpdateResponse.data.ampStory;
    loopThroughStoryLayers(storyResponse, [changeColorToGradient, prepareTextLayer]);
    dispatch(setNewAmpStory({ ...ampStory, ...storyResponse }));

    if (updateBody.title) {
      dispatch(invalidateRTKStory(storyResponse?._id));
      if (ampStory?.amp && ampStory?.status === STORY_STATUS_PUBLISHED) {
        await api.put(widgetUrls.updateStory, {
          storyAmpId: ampStory?.amp?.id ?? ampStory?.amp,
          title: updateBody.title,
        });
      }
    }
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(toggleExportLoading(false));
  }
};

export const uploadPosters = (imageSrcs) => async (dispatch, getState) => {
  const state = getState();
  const storyId = state.ampStory.present._id;

  try {
    dispatch(toggleExportLoading(true));
    const files = await Promise.all(
      Object.entries(imageSrcs).map(async (entry) => {
        const key =
          entry[0] === 'square'
            ? 'posterPortrait1x1'
            : entry[0] === 'landscape'
            ? 'posterLandscape'
            : 'posterPortrait3x4';

        const file = await (await fetch(entry[1])).blob();
        return {
          [key]: file,
        };
      }),
    );
    const formData = new FormData();
    files.forEach((file) => {
      const [key, value] = Object.entries(file)[0];
      formData.append(key, value, `${key}.png`);
    });

    const uploadResponse = await api.post(storyUrls.uploadPosters(storyId), formData);
    const updateMetadataBody = {
      posterLandscapeUrl: uploadResponse.data.posterLandscape.url,
      posterPortrait1x1Url: uploadResponse.data.posterPortrait1x1.url,
      posterPortrait3x4Url: uploadResponse.data.posterPortrait3x4.url,
    };

    const metadataResponse = await api.put(storyUrls.updateMetadata, {
      id: storyId,
      ...updateMetadataBody,
    });
    const storyResponse = metadataResponse.data.ampStory;
    loopThroughStoryLayers(storyResponse, [changeColorToGradient, prepareTextLayer]);

    /** Update widgets with story poster image */
    if (storyResponse?.amp) {
      await api.put(widgetUrls.updateStory, {
        storyAmpId: storyResponse?.amp?.id ?? storyResponse?.amp,
        posterUrl: uploadResponse?.data?.posterPortrait3x4?.url,
      });
    }

    dispatch(setNewAmpStory(storyResponse));
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(toggleExportLoading(false));
  }
};

export const socialExportStory = () => async (dispatch, getState) => {
  dispatch(replaceTemporaryMediaInStory());

  const state = getState();
  const ampStory = cloneObj(state.ampStory.present);
  const userEmail = state.auth.user?.email;
  removeFontsFromAmp(ampStory);

  try {
    dispatch(loadingStarted());
    // Save story
    await api.put(storyUrls.updateStoryConfig, {
      ampStory,
    });
    // Social export
    const socialExportResponse = await api.post(storyUrls.socialExport(ampStory._id), {
      emails: [userEmail],
    });
    // Check response data
    if (socialExportResponse?.data?.status === 200 && socialExportResponse?.data?.statusText === 'OK') {
      dispatch(setIsSocialMediaSuccessModalOpen(true));
    }
  } catch (e) {
    console.error(e);
  } finally {
    dispatch(loadingFinished());
  }
};
