import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { imageUrls } from '../../../../config/urls';
import { layerTypes } from '../../../../interfaces/layer-types';
import api from '../../../../utils/api';
import { defaultImageEditorModel, defaultImageSearchModel } from '../../../../utils/builders';
import { concatMediaArrays, getPendingMediaContent } from '../../../../utils/mediaUtils';
import { setActiveLayerPropsArray, setActiveLayerSettingsType, updateStoryConfig } from '../../amp-story/ampStorySlice';
import { addMediaName } from '../../media/mediaSlice';
import { addPendingMedia, toggleIsMediaUploading } from '../helpers/helpersSlice';

const initialState = {
  images: [],
  model: { ...defaultImageEditorModel },
  searchModel: { ...defaultImageSearchModel },
  currentLayer: null,
};

const imageSlice = createSlice({
  name: 'imageSlice',
  initialState,
  reducers: {
    addImage(state, action) {
      state.images = concatMediaArrays(state.images, action.payload);
    },
    setSearchTitle(state, action) {
      state.searchModel.searchTitle = action.payload;
    },
    setOffset(state) {
      state.model.offset = state.model.offset + state.model.limit;
    },
    setIsUnsplash(state, action) {
      state.model.isUnsplash = action.payload;
    },
    clearLoadedImages(state) {
      state.images = [];
    },
    setOwnLibrary(state, action) {
      state.searchModel.ownLibrary = action.payload;
    },
    setOpenSelect(state, action) {
      state.searchModel.openSelect = action.payload;
    },
    setAutocompleteTags(state, action) {
      state.searchModel.autocompleteTags = action.payload;
    },
    clearAutocompleteTags(state) {
      state.searchModel.autocompleteTags = [];
    },
    resetOffset(state) {
      state.model.offset = 0;
    },
  },
});

export const {
  addImage,
  clearLoadedImages,
  clearAutocompleteTags,
  setOffset,
  resetOffset,
  setSearchTitle,
  setIsUnsplash,
  setOwnLibrary,
  setOpenSelect,
  setAutocompleteTags,
} = imageSlice.actions;
export default imageSlice.reducer;

// Thunks
export const loadUnsplashImages = (title = '') => async (dispatch, getState) => {
  const state = getState();
  try {
    const page = state.image.model.offset / state.image.model.limit + 1;
    const imageResponse = await api.get(imageUrls.images(page, title));
    batch(() => {
      dispatch(setSearchTitle(title));
      dispatch(addImage(imageResponse?.data));
      dispatch(clearAutocompleteTags());
    });
  } catch (err) {
    console.error(err);
  }
};

export const selectImage = (image, temporaryImage) => async (dispatch, getState) => {
  const state = getState();
  const storyId = state.ampStory.present._id;

  batch(() => {
    dispatch(toggleIsMediaUploading(true));
    dispatch(setOpenSelect(false));
  });

  try {
    const uploadImageResponse = await api.post(imageUrls.uploadRemoteImage, {
      fileName: `${image.id}`,
      url: image.links.download_location,
    });

    const pendingMedia = getPendingMediaContent(layerTypes.IMAGE, uploadImageResponse.data);

    batch(() => {
      dispatch(addPendingMedia({ storyId, temporaryId: temporaryImage.id, pendingMedia }));
      dispatch(toggleIsMediaUploading(false));
      dispatch(addMediaName(temporaryImage.name));
    });
    dispatch(updateStoryConfig());
  } catch (err) {
    console.error(err);
    return;
  }
};
//TODO autocomplete
export const unsplashAutocomplete = (title) => async (dispatch, getState) => {
  const state = getState();
  try {
    const response = await api.get(
      `/images/autocomplete?searchType=${state.image.searchModel.searchTitle}&search=${title}`,
    );
    dispatch(setAutocompleteTags(response.data));
  } catch (err) {
    console.error(err);
  }
};

export const toggleLayerFullScreen = (isFullScreen) => (dispatch, getState) => {
  const state = getState();
  const initialWidth = +Number(state.ampStory.present.initialWidth).toFixed(2);
  const initialHeight = +Number(state.ampStory.present.initialHeight).toFixed(2);
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;
  const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];
  const activeLayer = activeSlide.layers[activeLayerPosition ?? -1];
  const newLayerSettings = { ...activeLayer.settings.layerSettings };
  const newGeneralSettings = { ...activeLayer.settings.generalSettings };
  const proportion = newLayerSettings.originalWidth / newLayerSettings.originalHeight;

  if (isFullScreen) {
    newLayerSettings.fullScreenConfig = {
      width: newLayerSettings.width,
      height: newLayerSettings.height,
      top: newGeneralSettings.offsetY / initialHeight,
      left: newGeneralSettings.offsetX / initialWidth,
      round: newGeneralSettings.round,
      rotate: newGeneralSettings.rotate,
    };
  }

  let height = isFullScreen ? initialHeight : newLayerSettings.fullScreenConfig.height;
  let width = isFullScreen ? height * proportion : newLayerSettings.fullScreenConfig.width;

  // This will upscale the layer if it's width doesn't fill the editor frame
  if (width < initialWidth && isFullScreen) {
    const rescaleProportion = initialWidth / width;
    height = +(rescaleProportion * height).toFixed(2);
    width = +(rescaleProportion * width).toFixed(2);
  }

  const innerOffsetX = (newLayerSettings.width - initialWidth) / 2;
  const innerOffsetY = (newLayerSettings.height - initialHeight) / 2;
  const newOffsetX = isFullScreen
    ? (initialWidth - width) / 2
    : parseFloat(newLayerSettings.fullScreenConfig.left) * +initialWidth;

  // Width needs to be round number but bigger than editor frame
  if (width === initialWidth) {
    width = Math.ceil(width);
  }

  const newOffsetY = isFullScreen
    ? (initialHeight - height) / 2
    : parseFloat(newLayerSettings.fullScreenConfig.top) * +initialHeight;
  const rotate = isFullScreen ? '0' : newLayerSettings.fullScreenConfig.rotate || '0';
  const round = isFullScreen ? '0' : newLayerSettings.fullScreenConfig.round || '0';

  newLayerSettings.width = width;
  newLayerSettings.height = height;
  newGeneralSettings.round = round;
  newGeneralSettings.rotate = rotate;
  newLayerSettings.fullscreen = isFullScreen;
  newGeneralSettings.offsetX = newOffsetX;
  newGeneralSettings.offsetY = newOffsetY;
  newLayerSettings.permissionForFullScreen = isFullScreen;
  newGeneralSettings.innerOffsetX = innerOffsetX.toString();
  newGeneralSettings.innerOffsetY = innerOffsetY.toString();

  batch(() => {
    dispatch(setActiveLayerSettingsType({ layerSettings: newLayerSettings, generalSettings: newGeneralSettings }));

    if (activeLayer.settings.animateIn.includes('pan')) {
      dispatch(
        setActiveLayerPropsArray([
          {
            field: 'settings.animateInDuration',
            value: 1,
          },
          {
            field: 'settings.animateInDelay',
            value: 0,
          },
          {
            field: 'settings.animateIn',
            value: '',
          },
        ]),
      );
    }
  });
};
