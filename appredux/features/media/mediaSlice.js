import { uniq } from 'lodash';
import { batch } from 'react-redux';

import { createSlice } from '@reduxjs/toolkit';

import { imageUrls, mediaUrls, uploadedMediaUrls, videoUrls } from '../../../config/urls';
import { layerTypes } from '../../../interfaces/layer-types';
import api from '../../../utils/api';
import { isMediaLayer } from '../../../utils/editorUtils';
import generateId from '../../../utils/generateId';
import {
  concatMediaArrays,
  getPendingMediaContent,
  getTemporaryVideoUrls,
  onGetVideoDuration,
} from '../../../utils/mediaUtils';
import { setActiveLayerPropsInStore, updateStoryConfig } from '../amp-story/ampStorySlice';
import { addPendingMedia, toggleIsMediaUploading } from '../editor/helpers/helpersSlice';
import {
  setOriginalVideo,
  setVideoProcessing,
  toggleVideoProcessingLoader,
} from '../video-processing/videoProcessingSlice';

const initialState = {
  allMediaFiles: [],
  uploadedMedia: [],
  offset: 0,
  limit: 20,
  isDeleteModalOpen: false,
  showSplitVideoModal: false,
  artboardsCount: 1,
  videoDuration: -1,
  shouldDiscardLayout: false,
  videoFile: null,
};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    addMediaName(state, action) {
      if (!state.allMediaFiles.includes(action.payload)) {
        state.allMediaFiles.push(action.payload);
      }
    },
    addMedia(state, action) {
      state.uploadedMedia = concatMediaArrays(state.uploadedMedia, action.payload);
    },
    addUploadedMedia(state, action) {
      state.uploadedMedia = [action.payload].concat(state.uploadedMedia);
    },
    clearLoadedMedia(state) {
      state.uploadedMedia = [];
    },
    setOffset(state) {
      state.offset = state.offset + state.limit;
    },
    clearOffset(state) {
      state.offset = 0;
    },
    saveAllMediaFiles(state, action) {
      state.allMediaFiles = action.payload;
    },
    filterDeletedMedia(state, action) {
      state.uploadedMedia = state.uploadedMedia.filter((media) => media.id !== action.payload);
    },
    replaceWithUploadedImage(state, action) {
      state.uploadedMedia[0].id = action.payload.id;
      state.uploadedMedia[0].originalName = action.payload.originalName;
    },
    toggleDeleteModal(state, action) {
      state.isDeleteModalOpen = action.payload;
    },
    toggleSplitVideoModal(state) {
      state.showSplitVideoModal = !state.showSplitVideoModal;
    },
    setArtboardsCount(state, action) {
      state.artboardsCount = action.payload;
    },
    setShouldDiscardLayout(state, action) {
      state.shouldDiscardLayout = action.payload;
    },
    setVideoDuration(state, action) {
      state.videoDuration = action.payload;
    },
    setVideoFile(state, action) {
      state.videoFile = action.payload;
    },
  },
});

export const {
  addMedia,
  addMediaName,
  saveAllMediaFiles,
  addUploadedMedia,
  setOffset,
  clearLoadedMedia,
  clearOffset,
  filterDeletedMedia,
  replaceWithUploadedImage,
  toggleDeleteModal,
  toggleSplitVideoModal,
  setShouldDiscardLayout,
  setArtboardsCount,
  setVideoDuration,
  setVideoFile,
} = mediaSlice.actions;
export default mediaSlice.reducer;

export const deleteMedia = (id) => async (dispatch) => {
  try {
    await api.delete(mediaUrls.deleteMedia(id));
    dispatch(filterDeletedMedia(id));
  } catch (err) {
    console.error(err);
  }
};
export const getAllMediaFromStory = (cuts, saveToAllMedias) => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const allMediaFiles = state.media.allMediaFiles;

  const fileNames = [];
  cuts.forEach((cut) => {
    cut.layers.forEach((layer) => {
      const currentLayerType = layer.type === layerTypes.GIFS ? layerTypes.IMAGE : layer.type;
      if (
        [layerTypes.IMAGE, layerTypes.VIDEO, layerTypes.GIFS].includes(layer.type) &&
        layer.content &&
        layer.content[currentLayerType] &&
        layer.content[currentLayerType].name
      ) {
        if (layer.content.thumbnail && typeof layer.content.thumbnail === 'string') {
          fileNames.push(layer.content.thumbnail.split(/[/\\]/).pop());
        }
      }
    });
    fileNames.push(`${cut.position}.image.png`);
  });
  if (saveToAllMedias) {
    dispatch(saveAllMediaFiles(uniq(Array.from(allMediaFiles.concat(fileNames)))));
  }
  return uniq(Array.from(fileNames));
};

export const uploadImage = (fileToBeUploaded) => async (dispatch, getState) => {
  if (!fileToBeUploaded) {
    return;
  }

  const state = getState();
  const user = state.auth.user;
  if (!user) {
    return;
  }
  const storyId = state.ampStory.present._id;
  let uploadImageResponse;

  try {
    const formData = new FormData();
    formData.append('file', fileToBeUploaded);

    dispatch(toggleIsMediaUploading(true));
    const id = generateId();
    const temporaryImage = {
      id,
      temporaryId: id,
      url: URL.createObjectURL(fileToBeUploaded),
      originalName: fileToBeUploaded.name,
    };

    dispatch(addUploadedMedia(temporaryImage));

    uploadImageResponse = await api.post(imageUrls.uploadImage(user?.selectedWorkspaceId, user?._id), formData);
    const image = { ...uploadImageResponse?.data, temporaryId: temporaryImage.id };
    const imageTitle = `${uploadImageResponse.data.name}` || '';
    const pendingMedia = getPendingMediaContent(layerTypes.IMAGE, image);

    batch(() => {
      dispatch(replaceWithUploadedImage(image));
      dispatch(addMediaName(imageTitle || ''));
      dispatch(addPendingMedia({ storyId, temporaryId: temporaryImage.id, pendingMedia }));
      dispatch(toggleIsMediaUploading(false));
    });
    dispatch(updateStoryConfig());
  } catch (e) {
    // TODO
    console.error(e);
    return;
  }
};

export const uploadVideo = (fileToBeUploaded) => async (dispatch, getState) => {
  if (!fileToBeUploaded) {
    return;
  }
  const state = getState();
  const user = state.auth.user;
  if (!user) {
    return;
  }
  const storyId = state.ampStory.present._id;
  let uploadedVideoResponse;
  try {
    dispatch(toggleIsMediaUploading(true));

    const temporaryVideo = await getTemporaryVideoUrls(fileToBeUploaded);
    dispatch(setOriginalVideo(temporaryVideo));

    onGetVideoDuration({
      mediaUrl: temporaryVideo.url,
      callback: async (duration) => {
        const formData = new FormData();
        formData.append('file', fileToBeUploaded);
        formData.append('duration', duration.toString());

        uploadedVideoResponse = await api.post(videoUrls.uploadVideo(user.selectedWorkspaceId, user._id), formData);
        const originalVideo = { ...uploadedVideoResponse?.data?.video, temporaryId: temporaryVideo.id };
        const pendingMedia = getPendingMediaContent(layerTypes.VIDEO, originalVideo);

        batch(() => {
          dispatch(toggleVideoProcessingLoader(true));
          dispatch(setOriginalVideo(originalVideo));
          dispatch(toggleIsMediaUploading(false));
          dispatch(setVideoProcessing(uploadedVideoResponse?.data?.videoProcessing));
          dispatch(addPendingMedia({ storyId, temporaryId: temporaryVideo.id, pendingMedia }));
        });
      },
    });
  } catch (err) {
    console.error(err);
    return;
  }
};

export const replaceTemporaryMediaInStory = () => async (dispatch, getState) => {
  const state = getState();
  const pendingMediaQueue = state.helpers.pendingMediaQueue;
  const storyId = state.ampStory.present._id;

  if (Object.keys(pendingMediaQueue).length > 0) {
    batch(() => {
      state.ampStory.present.cuts.forEach((cut, cutIndex) => {
        cut.layers.forEach((layer, layerIndex) => {
          const isMediaLayerType = isMediaLayer(layer?.type);
          const pendingMedia = pendingMediaQueue?.[storyId]?.[layer?.temporaryId ?? -1];

          if (isMediaLayerType && pendingMedia) {
            const content = {
              ...layer?.content,
              ...pendingMedia.content,
            };
            dispatch(
              setActiveLayerPropsInStore({
                field: 'content',
                value: content,
                activeSlidePosition: cutIndex,
                activeLayerPosition: layerIndex,
              }),
            );
          }

          if (layer?.type === layerTypes.OUTLINK && pendingMedia) {
            dispatch(
              setActiveLayerPropsInStore({
                field: 'content.image',
                value: pendingMedia.content.image,
                activeSlidePosition: cutIndex,
                activeLayerPosition: layerIndex,
              }),
            );
          }
        });
      });
    });
  }
};

export const loadUploadedMedia = (type) => async (dispatch, getState) => {
  const state = getState();
  const user = state.auth.user;
  if (!user) {
    return;
  }
  let loadedMediaResponse = null;
  try {
    loadedMediaResponse = await api.get(
      uploadedMediaUrls.getMedia(user.selectedWorkspaceId, user._id, type, state.media.limit, state.media.offset),
    );
  } catch (err) {
    console.error(err);
  }
  if (loadedMediaResponse?.data?.media) {
    dispatch(addMedia(loadedMediaResponse?.data?.media));
  }
};
