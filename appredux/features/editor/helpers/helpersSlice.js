import { createSlice, current } from '@reduxjs/toolkit';
import { EditorState } from 'draft-js';
import { debounce, isNil, isNull } from 'lodash';
import { batch } from 'react-redux';
import { PENDING_MEDIA_QUEUE, layersMenuConfig, storyIds } from '../../../../config/constants';
import { environment } from '../../../../config/environment';
import { storyUrls } from '../../../../config/urls';
import { layerTypes } from '../../../../interfaces/layer-types';
import api from '../../../../utils/api';
import { getObjectDiff } from '../../../../utils/common';
import { getSelectedLayers } from '../../../../utils/commonUtils';
import { generateCroppedLayer } from '../../../../utils/croppingUtils';
import generateId from '../../../../utils/generateId';
import { setLocalStorageObjectItem } from '../../../../utils/setLocalStorageItem';
import { selectAllText } from '../../../../utils/textEditorUtils';
import { batchGroupBy } from '../../../../utils/undoableUtils';
import { replaceTemporaryMediaInStory } from '../../media/mediaSlice';
import { setSizeProportion } from '../layer-setting/layerSettingSlice';
import { toggleForceRebuild, toggleForceRebuildMulti, toggleGroupLayer } from './groupLayerHelperSlice';

import {
  changeEditorSize,
  checkVideoCtaCutsLimited,
  generateGradientData,
  getDuplicateName,
  isMediaLayer,
  sortLayersOrCuts,
} from '../../../../utils/editorUtils';
import {
  addLayer,
  deleteLayer,
  filteredSetInitialHeight,
  filteredSetInitialWidth,
  filteredUpdateActiveLayerInStore,
  filteredUpdateLayersScaling,
  removeActiveLayerPosition,
  setActiveLayerPosition,
  setGradientInputString,
  setInitialHeight,
  setInitialWidth,
  setLastActiveLayer,
  setNewAmpStory,
  setScaleValue,
  setSelectedLayerNumbers,
  updateActiveLayerInStore,
  updateLayersScaling,
} from '../../amp-story/ampStorySlice';

let playAnimationTimeout;

const imageCropsInitialValues = {
  portrait: { x: 0, y: 0 },
  landscape: { x: 0, y: 0 },
  square: { x: 0, y: 0 },
};

const initialState = {
  isExportPressed: true,
  isDurationInvalid: false,
  showFullScreenIEditor: false,
  layersMenuConfig,
  ctaCutLimited: false,
  videoCutLimited: false,
  storyChangedCount: null,
  willUpdateStoryTimestamp: false,
  durationIsInvalid: false,
  isMediaUploading: false,
  isStorySaving: false,
  oldStoryTitle: 'new story',
  initialStoryWidth: null,
  initialStoryHeight: null,
  isEditorLayerMenuVisible: true,
  isStorySavedNotificationVisible: false,
  isTemplateSavedNotificationVisible: false,
  areAnimationsRunning: false,
  copiedLayers: null,
  layerCopyCounter: 0,
  pendingMediaQueue: {},
  isEditorContextMenuOpen: false,
  deviceSize: { width: 0, height: 0 },
  zoomPercent: 100,
  fitZoomPercent: 75,
  imageCrops: imageCropsInitialValues,
  newLayerPosition: null,
  isCroppingMode: false,
  croppedLayer: null,
  isStoryLockedIgnored: false,
  storiesAndFoldersWrapperClicked: false,
  titleChanged: false,
  shouldSlideUpdateTrigger: true,
  selectedLayersChangeCounter: 0,
  showReplaceModal: false,
  showMoveModal: false,
  loadedFontNames: [],
  loadedFontsCount: 10,
  showSelectCtaImage: false,
  currentTextPresetLabel: '',
  layerMenuBoldFlag: null,
  isFontStyleModalOpenState: false,
  isLayoutSettingsToggledOn: false,
};

const helpersSlice = createSlice({
  name: 'helpers',
  initialState,
  reducers: {
    setExportPressed(state, action) {
      state.isExportPressed = action.payload;
    },
    setFullScreenEditor(state, action) {
      state.showFullScreenIEditor = action.payload;
    },
    toggleIsMediaUploading(state, action) {
      state.isMediaUploading = action.payload;
    },
    setLayersMenuConfig(state, action) {
      const { condition, index } = action.payload;

      state.layersMenuConfig[index].classes['locked'] = condition;
    },
    incrementStoryChangedCount(state, action) {
      const count = isNull(state.storyChangedCount) ? 1 : state.storyChangedCount + 1;
      state.storyChangedCount = count;
      if (action.payload !== undefined && action.payload === true) {
        state.willUpdateStoryTimestamp = true;
      }
    },
    resetStoryChangedCount(state) {
      state.storyChangedCount = null;
      state.willUpdateStoryTimestamp = false;
    },
    setDurationIsInvalid(state, action) {
      state.durationIsInvalid = action.payload;
    },
    setOldStoryTitle(state, action) {
      state.oldStoryTitle = action.payload;
    },
    setInitialStoryWidth(state, action) {
      state.initialStoryWidth = action.payload;
    },
    setInitialStoryHeight(state, action) {
      state.initialStoryHeight = action.payload;
    },
    toggleCtaCutLimited(state, action) {
      state.ctaCutLimited = action.payload;
    },
    toggleVideoCutLimited(state, action) {
      state.videoCutLimited = action.payload;
    },
    toggleEditorLayerMenuVisibility(state, action) {
      state.isEditorLayerMenuVisible = action.payload;
    },
    toggleStorySavedNotificationVisibility(state, action) {
      state.isStorySavedNotificationVisible = action.payload;
    },
    toggleTemplateSavedNotificationVisibility(state, action) {
      state.isTemplateSavedNotificationVisible = action.payload;
    },
    toggleAreAnimationsRunning(state, action) {
      state.areAnimationsRunning = action.payload;
    },
    resetHelpersStore(state) {
      return {
        ...initialState,
        pendingMediaQueue: state.pendingMediaQueue,
      };
    },
    setLayerCopies(state, action) {
      state.copiedLayers = action.payload;
    },
    setLayerCopyCounter(state, action) {
      state.layerCopyCounter = action.payload;
    },
    persistPendingMediaQueue(state, action) {
      state.pendingMediaQueue = action.payload;
    },
    addPendingMedia(state, action) {
      const { storyId, temporaryId, pendingMedia } = action.payload;
      state.pendingMediaQueue[storyId] = {
        ...state.pendingMediaQueue[storyId],
        [temporaryId]: pendingMedia,
      };
      localStorage.setItem(PENDING_MEDIA_QUEUE, JSON.stringify(current(state).pendingMediaQueue));
    },
    removePendingMedia(state, action) {
      const { mediaId, storyId } = action.payload;
      if (!state.pendingMediaQueue?.[storyId]) {
        return state;
      }
      const { [storyId]: removedStoryMedia, ...restStoryMedia } = state.pendingMediaQueue;
      const { [mediaId]: removedMediaItem, ...restMedia } = state.pendingMediaQueue?.[storyId];
      const filteredPendingMediaQueue = {
        ...restStoryMedia,
        ...(restMedia && Object.keys(restMedia).length > 0 && { [storyId]: restMedia }),
      };

      state.pendingMediaQueue = filteredPendingMediaQueue;
      setLocalStorageObjectItem(PENDING_MEDIA_QUEUE, filteredPendingMediaQueue);
    },
    removeMultiplePendingMedia(state, action) {
      const { mediaIds, storyId } = action.payload;
      const { [storyId]: removedStoryMedia, ...restStoryMedia } = state.pendingMediaQueue;

      if (removedStoryMedia && typeof removedStoryMedia === 'object') {
        mediaIds.forEach((mediaId) => {
          delete removedStoryMedia[mediaId];
        });
      }

      const filteredPendingMediaQueue = {
        ...(restStoryMedia && Object.keys(restStoryMedia).length > 0 && restStoryMedia),
        ...(removedStoryMedia && Object.keys(removedStoryMedia).length > 0 && { [storyId]: removedStoryMedia }),
      };

      state.pendingMediaQueue = filteredPendingMediaQueue;
      setLocalStorageObjectItem(PENDING_MEDIA_QUEUE, filteredPendingMediaQueue);
    },
    removeStoryPendingMedia(state, action) {
      const { [action.payload]: removedStoryMedia, ...restStoryMedia } = state.pendingMediaQueue;

      state.pendingMediaQueue = restStoryMedia;
      setLocalStorageObjectItem(PENDING_MEDIA_QUEUE, restStoryMedia);
    },
    setIsEditorContextMenuOpen(state, action) {
      state.isEditorContextMenuOpen = action.payload;
    },
    setDeviceSize(state, action) {
      state.deviceSize = action.payload;
    },
    setZoomPercent(state, action) {
      state.zoomPercent = action.payload;
    },
    setFitZoomPercent(state, action) {
      state.fitZoomPercent = action.payload;
    },
    setImageCrops(state, action) {
      state.imageCrops = action.payload;
    },
    resetImageCrops(state) {
      state.imageCrops = imageCropsInitialValues;
    },
    setNewLayerPosition(state, action) {
      state.newLayerPosition = action.payload;
    },
    setIsCroppingMode(state, action) {
      state.isCroppingMode = action.payload;
    },
    setCroppedLayer(state, action) {
      state.croppedLayer = action.payload;
    },
    setIsStoryLockedIgnored(state, action) {
      state.isStoryLockedIgnored = action.payload;
    },
    setAmpStoryTitleChanged(state, action) {
      state.titleChanged = action.payload;
    },
    setShouldSlideUpdateTrigger(state, action) {
      state.shouldSlideUpdateTrigger = action.payload;
    },
    setSelectedLayersChangeCounter(state, action) {
      if (typeof action.payload === 'number') {
        state.selectedLayersChangeCounter = action.payload;
      } else {
        state.selectedLayersChangeCounter += 1;
      }
    },
    toggleReplaceModal(state) {
      state.showReplaceModal = !state.showReplaceModal;
    },
    setShowMoveModal(state, action) {
      state.showMoveModal = action.payload;
    },
    setLoadedFontName(state, action) {
      state.loadedFontNames.push(action.payload);
    },
    setLoadedFontsCount(state, action) {
      state.loadedFontsCount = action.payload;
    },
    toggleSelectCtaImage(state) {
      state.showSelectCtaImage = !state.showSelectCtaImage;
    },
    setCurrentTextPresetLabel(state, action) {
      state.currentTextPresetLabel = action.payload;
    },
    toggleLayerMenuBoldFlag(state, action) {
      state.layerMenuBoldFlag = action.payload;
    },
    setFontStyleModalState(state, action) {
      state.isFontStyleModalOpenState = action.payload;
    },
    toggleLayoutSettings(state, action) {
      state.isLayoutSettingsToggledOn = action.payload;
    },
  },
});

export const {
  setExportPressed,
  setFullScreenEditor,
  setLayersMenuConfig,
  incrementStoryChangedCount,
  resetStoryChangedCount,
  setDurationIsInvalid,
  setOldStoryTitle,
  resetHelpersStore,
  setInitialStoryWidth,
  setInitialStoryHeight,
  toggleCtaCutLimited,
  toggleVideoCutLimited,
  toggleIsMediaUploading,
  toggleEditorLayerMenuVisibility,
  toggleStorySavedNotificationVisibility,
  toggleTemplateSavedNotificationVisibility,
  toggleAreAnimationsRunning,
  setLayerCopies,
  setLayerCopyCounter,
  addPendingMedia,
  removePendingMedia,
  removeMultiplePendingMedia,
  removeStoryPendingMedia,
  persistPendingMediaQueue,
  setIsEditorContextMenuOpen,
  setDeviceSize,
  setZoomPercent,
  setFitZoomPercent,
  setImageCrops,
  resetImageCrops,
  setNewLayerPosition,
  setIsCroppingMode,
  setCroppedLayer,
  setIsStoryLockedIgnored,
  setAmpStoryTitleChanged,
  setShouldSlideUpdateTrigger,
  setSelectedLayersChangeCounter,
  toggleReplaceModal,
  setShowMoveModal,
  setLoadedFontName,
  setLoadedFontsCount,
  toggleSelectCtaImage,
  setCurrentTextPresetLabel,
  toggleLayerMenuBoldFlag,
  setFontStyleModalState,
  toggleLayoutSettings,
} = helpersSlice.actions;
export default helpersSlice.reducer;

export const updateSlidesLimits = () => (dispatch, getState) => {
  const state = getState();

  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];

  const { ctaCutLimited, videoCutLimited } = checkVideoCtaCutsLimited(activeSlide);

  batch(() => {
    dispatch(toggleCtaCutLimited(ctaCutLimited));
    dispatch(toggleVideoCutLimited(videoCutLimited));
  });
};

export const resetCropHelpers = () => (dispatch, getState) => {
  const state = getState();
  const croppedLayer = state.helpers.croppedLayer;
  const isCroppingMode = state.helpers.isCroppingMode;

  if (isCroppingMode) {
    dispatch(setIsCroppingMode(false));
  }
  if (croppedLayer) {
    dispatch(setCroppedLayer(null));
  }
};

export const handleCroppedLayer = () => (dispatch, getState) => {
  const state = getState();
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];
  const croppedLayer = state.helpers.croppedLayer;
  const previousActiveLayer = activeSlide?.layers[activeLayerPosition ?? -1];
  const isCroppingMode = state.helpers.isCroppingMode;
  const selectedChildLayer = state.groupLayerHelper.selectedChildLayer;

  if (
    croppedLayer &&
    selectedChildLayer &&
    croppedLayer?._id === selectedChildLayer?._id &&
    previousActiveLayer?.childLayers?.length > 0
  ) {
    const updatedLayers = previousActiveLayer.childLayers.map((childLayer) => {
      if (childLayer._id === croppedLayer?._id) {
        return croppedLayer;
      }

      return childLayer;
    });

    const { width, height, offsetX, offsetY } = updatedLayers.reduce(
      (
        acc,
        currentLayer,
      ) => {
        const { settings, position } = currentLayer;
        const { offsetX: layerOffsetX, offsetY: layerOffsetY } = settings.generalSettings;
        const { height: layerHeight, width: layerWidth } = settings.layerSettings;

        if (+layerOffsetX < acc.offsetX) {
          acc.offsetX = Math.round(layerOffsetX);
        }

        if (+layerOffsetY < acc.offsetY) {
          acc.offsetY = Math.round(layerOffsetY);
        }

        if (+layerWidth + +layerOffsetX > acc.width) {
          acc.width = Math.round(+layerWidth + +layerOffsetX);
        }

        if (+layerHeight + +layerOffsetY > acc.height) {
          acc.height = Math.round(+layerHeight + +layerOffsetY);
        }

        if (position < acc.position) {
          acc.position = position;
        }

        return acc;
      },
      {
        width: 0,
        height: 0,
        offsetX: Number.POSITIVE_INFINITY,
        offsetY: Number.POSITIVE_INFINITY,
        position: Number.POSITIVE_INFINITY,
      },
    );

    dispatch(
      updateActiveLayerInStore({
        layer: {
          ...previousActiveLayer,
          childLayers: updatedLayers,
          settings: {
            ...previousActiveLayer.settings,
            layerSettings: {
              ...previousActiveLayer.settings.layerSettings,
              width: width - offsetX,
              height: height - offsetY,
            },
            generalSettings: {
              ...previousActiveLayer.settings.generalSettings,
              offsetX,
              offsetY,
            },
          },
          isStale: true,
        },
        position: previousActiveLayer.position,
        activeSlidePosition,
      }),
    );

    if (croppedLayer) {
      dispatch(setCroppedLayer(null));
    }
    if (isCroppingMode) {
      dispatch(setIsCroppingMode(false));
    }

    return;
  }

  if (
    croppedLayer &&
    previousActiveLayer &&
    croppedLayer?._id === previousActiveLayer?._id &&
    getObjectDiff(croppedLayer?.settings, previousActiveLayer?.settings).length > 0
  ) {
    dispatch(
      updateActiveLayerInStore({
        layer: croppedLayer,
        position: croppedLayer?.position,
        activeSlidePosition,
      }),
    );
  } else if (croppedLayer?._id === previousActiveLayer?._id && croppedLayer?.settings?.cropSettings && isCroppingMode) {
    const { frame } = croppedLayer.settings?.cropSettings;
    const updatedLayer = generateCroppedLayer(croppedLayer, frame);
    dispatch(
      updateActiveLayerInStore({
        layer: updatedLayer,
        position: updatedLayer.position,
        activeSlidePosition,
      }),
    );
  }
  if (croppedLayer) {
    dispatch(setCroppedLayer(null));
  }
  if (isCroppingMode) {
    dispatch(setIsCroppingMode(false));
  }
};

export const selectLayer = (position) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];
  const currentLayer = position !== undefined ? activeSlide.layers[position] : null;
  const newLayerPosition = state.helpers.newLayerPosition;

  batch(() => {
    if (
      currentLayer &&
      currentLayer?.type === layerTypes.HTML &&
      typeof activeSlidePosition === 'number' &&
      activeSlidePosition > -1
    ) {
      const selection = selectAllText(currentLayer.settings.editorState);
      dispatch(
        filteredUpdateActiveLayerInStore({
          layer: {
            ...currentLayer,
            settings: {
              ...currentLayer.settings,
              editorState: EditorState.acceptSelection(currentLayer.settings.editorState, selection),
            },
          },
          position: position,
          activeSlidePosition: activeSlidePosition,
        }),
      );
    }
    dispatch(setIsEditorContextMenuOpen(false));
    dispatch(handleCroppedLayer());

    dispatch(setActiveLayerPosition(position));
    dispatch(toggleGroupLayer(currentLayer?.type === layerTypes.GROUP));
    dispatch(setSizeProportion());
    if (newLayerPosition !== null) {
      dispatch(setNewLayerPosition(null));
    }
  });
};

export const startPreview = (storyId, event) => async (dispatch, getState) => {
  if (event && event.stopPropagation) {
    event?.stopPropagation();
  }
  dispatch(handleCroppedLayer());
  dispatch(replaceTemporaryMediaInStory());

  const state = getState();
  const ampStory = state.ampStory;
  const fitZoomPercent = state.helpers.fitZoomPercent;
  if (storyId !== storyIds.exportModal) {
    await api.put(storyUrls.updateStoryConfig, {
      ampStory: ampStory.present,
    });
  }

  dispatch(startStoryPreview(storyId));
  dispatch(filteredResizeStory(fitZoomPercent));
};

export const stopPreview = (storyId, event) => (dispatch, getState) => {
  if (event && event.stopPropagation) {
    event?.stopPropagation();
  }
  const state = getState();
  const zoomPercent = state.helpers.zoomPercent;

  dispatch(stopStoryPreview(storyId));
  dispatch(filteredResizeStory(zoomPercent));
};

export const startStoryPreview = (storyId) => (dispatch, getState) => {
  const state = getState();
  const showFullScreenIEditor = state.helpers.showFullScreenIEditor;

  if (!showFullScreenIEditor && storyId !== storyIds.exportModal) {
    dispatch(setFullScreenEditor(true));
  }
};

export const stopStoryPreview = (storyId) => (dispatch, getState) => {
  const state = getState();
  const showFullScreenIEditor = state.helpers.showFullScreenIEditor;

  if (showFullScreenIEditor && storyId !== storyIds.exportModal) {
    setTimeout(() => {
      if (showFullScreenIEditor) {
        dispatch(setFullScreenEditor(false));
      }
    });
  }
};

export const deleteLayerAction = () => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeSlide = state.ampStory.present.cuts?.[activeSlidePosition ?? -1];
  const selectedLayerNumbers = state.ampStory.present.selectedLayerNumbers;
  const selectedLayers = getSelectedLayers(activeSlide?.layers, selectedLayerNumbers);
  const isCtaLayer = selectedLayers?.some((layer) => layer?.type === layerTypes.CTA_LINK);
  const croppedLayer = state.helpers.croppedLayer;

  batch(() => {
    batchGroupBy.start();
    dispatch(updateLayerOnDelete());
    dispatch(incrementStoryChangedCount());
    dispatch(resetCropHelpers());
    batchGroupBy.end();
  });
  const { videoCutLimited } = checkVideoCtaCutsLimited(activeSlide);

  batch(() => {
    if (isCtaLayer) {
      dispatch(toggleCtaCutLimited(!isCtaLayer));
    }
    if (selectedLayers?.length === 1 && croppedLayer?._id === selectedLayers?.[0]._id) {
      dispatch(setCroppedLayer(null));
    }
    dispatch(toggleVideoCutLimited(videoCutLimited));
  });
};

export const updateLayerOnDelete = () => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition ?? -1;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition ?? -1;
  const selectedLayerNumbers = state.ampStory.present.selectedLayerNumbers;

  const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];
  const slidesLengthAfterDeletion = activeSlide?.layers?.length - selectedLayerNumbers?.length ?? 1;

  batch(() => {
    if (slidesLengthAfterDeletion) {
      dispatch(setActiveLayerPosition(slidesLengthAfterDeletion - 1));
      dispatch(setSelectedLayerNumbers([slidesLengthAfterDeletion - 1]));
      dispatch(setLastActiveLayer({ activeSlidePosition, activeLayerPosition }));
    } else {
      dispatch(removeActiveLayerPosition());
      dispatch(setSelectedLayerNumbers(null));
    }

    dispatch(
      deleteLayer({
        slidePosition: activeSlidePosition,
        layerPositions: selectedLayerNumbers ?? [activeLayerPosition],
      }),
    );
  });
};

export const deleteMediaLayersWithoutPendingData = () => (dispatch, getState) => {
  const state = getState();
  const ampStory = state.ampStory.present;
  const stringifiedPendingMediaQueue = localStorage.getItem(PENDING_MEDIA_QUEUE) ?? '{}';
  const pendingMediaQueue = state.helpers.pendingMediaQueue ?? JSON.parse(stringifiedPendingMediaQueue);
  const cuts = ampStory.cuts.map((cut) => {
    const layers = cut.layers.filter((layer) => {
      const activeLayer = { ...layer };

      const pendingMedia = pendingMediaQueue?.[ampStory._id]?.[activeLayer?.temporaryId];
      const isMediaTypeLayer = isMediaLayer(activeLayer.type);
      if (!isMediaTypeLayer) {
        return true;
      }

      if (
        activeLayer._id !== activeLayer.temporaryId ||
        activeLayer.content.value.includes(environment.mediaEndpoint)
      ) {
        return true;
      }

      return Boolean(pendingMedia);
    });

    return { ...cut, layers };
  });

  const updatedStory = {
    ...ampStory,
    cuts,
  };

  batch(() => {
    dispatch(setNewAmpStory(updatedStory));
  });
};

export const deleteAlreadyAppliedPendingMedia = () => (dispatch, getState) => {
  const state = getState();
  const ampStory = state.ampStory.present;
  const pendingMediaQueue = state.helpers.pendingMediaQueue;
  const pendingMediaQueueForStory = pendingMediaQueue?.[ampStory._id];
  const mediaIds = [];
  const temporaryLayerIds = [];
  ampStory.cuts.forEach((cut) => {
    cut.layers.forEach((layer) => {
      if (layer?.temporaryId) {
        temporaryLayerIds.push(layer.temporaryId);
        const pendingMedia = pendingMediaQueueForStory?.[layer.temporaryId];
        if (pendingMedia && layer?.content?.value.includes(environment.mediaEndpoint)) {
          mediaIds.push(layer.temporaryId);
        }
      }
    });
  });

  if (pendingMediaQueueForStory && Object.keys(pendingMediaQueueForStory).length > 0) {
    Object.keys(pendingMediaQueueForStory).forEach((mediaId) => {
      if (!temporaryLayerIds.includes(mediaId)) {
        mediaIds.push(mediaId);
      }
    });
  }

  dispatch(removeMultiplePendingMedia({ mediaIds, storyId: ampStory._id }));
};

export const duplicateLayerAction = () => (dispatch, getState) => {
  const state = getState();

  const layerCopies = state.helpers?.copiedLayers;
  const layerCopyCounter = state.helpers.layerCopyCounter;

  batch(() => {
    dispatch(copyLayer());
    dispatch(pasteLayer());
  });

  batch(() => {
    dispatch(setLayerCopies(layerCopies));
    dispatch(setLayerCopyCounter(layerCopyCounter));
  });
};

export const copyLayer = () => (dispatch, getState) => {
  const state = getState();
  const selectedLayerNumbers = state.ampStory.present.selectedLayerNumbers;
  const activeSlidePosition = state.ampStory.present.activeSlidePosition ?? -1;
  const activeSlide = state.ampStory.present.cuts?.[activeSlidePosition] | undefined;
  const zoomPercent = state.helpers.zoomPercent;
  const layers =
    activeSlide?.layers.filter(
      (layer) => selectedLayerNumbers.includes(layer?.position) && layer?.type !== layerTypes.CTA_LINK,
    ) ?? [];

  batch(() => {
    dispatch(setLayerCopies({ layerCopies: layers, zoomPercent }));
    dispatch(setLayerCopyCounter(0));
  });
};

export const cutLayer = () => (dispatch) => {
  batch(() => {
    dispatch(copyLayer());
    dispatch(deleteLayerAction());
  });
};

export const pasteLayer = (isPresetCopy = false) => (dispatch, getState) => {
  const state = getState();
  const zoomPercent = state.helpers.zoomPercent;
  const layerCopies = state.helpers?.copiedLayers?.layerCopies;
  const oldZoomPercent = state.helpers?.copiedLayers?.zoomPercent;
  const layerCopyCounter = isPresetCopy ? 0 : state.helpers.layerCopyCounter + 1;

  if (!layerCopies) {
    return;
  }

  const newLayerCopies = [...layerCopies];
  const activeSlidePosition = state.ampStory.present.activeSlidePosition ?? -1;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition ?? -1;
  const activeSlide = state.ampStory.present.cuts?.[activeSlidePosition];
  const layers = activeSlide.layers;

  const zoomPercentRatio = oldZoomPercent ? oldZoomPercent / zoomPercent : 1;

  // Outlink cannot be multiselected so if it's in the buffer it should be alone.
  const isCtaLayerCopy =
    layerCopies?.[0]?.type === layerTypes.CTA_LINK || layerCopies?.[0]?.type === layerTypes.OUTLINK;

  if (isCtaLayerCopy) {
    const alreadyHasCTALayer = layers.some(
      (layer) => layer.type === layerTypes.OUTLINK || layer.type === layerTypes.CTA_LINK,
    );

    if (alreadyHasCTALayer) {
      return;
    }
  }

  const modifiedLayerCopies = newLayerCopies.sort(sortLayersOrCuts).map((layer) => {
    const { offsetX, offsetY } = layer.settings.generalSettings;
    const _id = generateId();
    const offsetStep = layerCopyCounter * 10;

    /** If we duplicate gradient layer, we also need to reset the gradients ids,
     * so we can distinguish between them and be able to apply proper colors
     * */
    let parsedShape = '';
    if (layer.type === layerTypes.GRADIENTS && layer?.content?.gradient?.input) {
      parsedShape = generateGradientData(layer?.content?.gradient?.input).parsedShape;
    }

    let childLayers = [];
    if (layer.type === layerTypes.GROUP && layer?.childLayers && layer?.childLayers?.length > 0) {
      childLayers = layer.childLayers?.map((childLayer) => {
        const _id = generateId();
        const { offsetX, offsetY } = childLayer.settings.generalSettings;

        let parsedShape = '';
        if (childLayer.type === layerTypes.GRADIENTS && childLayer?.content?.gradient?.input) {
          parsedShape = generateGradientData(childLayer?.content?.gradient?.input).parsedShape;
        }

        return {
          ...childLayer,
          _id,
          // title: getDuplicateName(layers, layer.title ?? ''),
          content: {
            ...childLayer.content,
            ...(parsedShape && {
              gradient: {
                ...childLayer.content.gradient,
                input: parsedShape,
              },
            }),
          },
          settings: {
            ...childLayer.settings,
            generalSettings: {
              ...childLayer.settings?.generalSettings,
              offsetX:
                (childLayer.settings?.layerSettings?.fullscreen ? Number(offsetX) : Number(offsetX) + offsetStep) /
                zoomPercentRatio,
              offsetY:
                (childLayer.settings?.layerSettings?.fullscreen ? Number(offsetY) : Number(offsetY) + offsetStep) /
                zoomPercentRatio,
            },
            layerSettings: {
              ...childLayer.settings.layerSettings,
              width: childLayer.settings.layerSettings.width / zoomPercentRatio,
              height: childLayer.settings.layerSettings.height / zoomPercentRatio,
            },
          },
        };
      });
    }

    return {
      ...layer,
      _id,
      title: isPresetCopy ? layer.title : getDuplicateName(layers, layer.title ?? ''),
      content: {
        ...layer.content,
        ...(parsedShape && {
          gradient: {
            ...layer.content.gradient,
            input: parsedShape,
          },
        }),
      },
      settings: {
        ...layer.settings,
        generalSettings: {
          ...layer.settings?.generalSettings,
          offsetX:
            (layer.settings?.layerSettings?.fullscreen ? Number(offsetX) : Number(offsetX) + offsetStep) /
            zoomPercentRatio,
          offsetY:
            (layer.settings?.layerSettings?.fullscreen ? Number(offsetY) : Number(offsetY) + offsetStep) /
            zoomPercentRatio,
        },
        layerSettings: {
          ...layer.settings.layerSettings,
          width: layer.settings.layerSettings.width / zoomPercentRatio,
          height: layer.settings.layerSettings.height / zoomPercentRatio,
        },
      },
      childLayers,
    };
  });

  const copyLayerPosition = layers.find(
    (layer) => layer.type === layerTypes.CTA_LINK || layer.type === layerTypes.OUTLINK,
  )
    ? layers.length - 1
    : layers.length;

  batch(() => {
    if (newLayerCopies?.length === 1) {
      dispatch(setLastActiveLayer({ activeSlidePosition, activeLayerPosition }));
      dispatch(setActiveLayerPosition(copyLayerPosition));
      dispatch(setNewLayerPosition(copyLayerPosition));
    }

    dispatch(addLayer({ position: copyLayerPosition, layers: modifiedLayerCopies, activeSlidePosition }));
    dispatch(incrementStoryChangedCount());
    dispatch(setLayerCopyCounter(layerCopyCounter));
  });
};

export const stopAnimation = () => async (dispatch) => {
  clearTimeout(playAnimationTimeout);
  dispatch(toggleAreAnimationsRunning(false));
  dispatch(toggleEditorLayerMenuVisibility(true));
};

export const playAnimations = () => async (dispatch, getState) => {
  const state = getState();
  const areAnimationsRunning = state.helpers.areAnimationsRunning;
  const activeSlidePosition = state.ampStory.present.activeSlidePosition ?? -1;

  if (areAnimationsRunning) {
    dispatch(stopAnimation());
    return;
  }

  if (!isNil(activeSlidePosition)) {
    batch(() => {
      dispatch(toggleAreAnimationsRunning(true));
      dispatch(toggleEditorLayerMenuVisibility(false));
    });

    const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];

    playAnimationTimeout = setTimeout(() => {
      dispatch(stopAnimation());
    }, activeSlide.duration * 1000);
  }
};

const toggleEditorLayerMenuVisibilityDebounced = debounce(
  (dispatch, arg) => dispatch(toggleEditorLayerMenuVisibility(arg)),
  600,
  { leading: false, trailing: true },
);

export const setEditorLayerMenuVisibilityDebouncedAction = (arg) => (dispatch) => {
  toggleEditorLayerMenuVisibilityDebounced(dispatch, arg);
};

export const deselectLayerDebouncedAction = () => (dispatch) => {
  deselectLayerDebounced(dispatch);
};

const deselectLayerDebounced = debounce((dispatch) => dispatch(deselectLayer()));

export const deselectLayer = () => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition ?? -1;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition ?? -1;
  const activeLayer = state.ampStory.present.cuts[activeSlidePosition]?.layers[activeLayerPosition];
  const newLayerPosition = state.helpers.newLayerPosition;

  if (!activeLayer) {
    return;
  }

  dispatch(handleCroppedLayer());
  batch(() => {
    if (
      activeLayer.type === layerTypes.HTML &&
      activeLayer.settings.editorState.getCurrentContent().getPlainText().trim().length < 1
    ) {
      dispatch(deleteLayerAction());
    }
    dispatch(toggleGroupLayer(false));
    dispatch(removeActiveLayerPosition());

    if (newLayerPosition !== null) {
      dispatch(setNewLayerPosition(null));
    }
  });
};

export const resizeStory = (scalePercent) => (dispatch, getState) => {
  const { editorHeight, editorWidth } = changeEditorSize(scalePercent);
  const state = getState();
  const storyHeight = state.ampStory.present.initialHeight;
  const zoomPercent = state.helpers.zoomPercent;

  if (editorHeight !== storyHeight) {
    const scaleStory = editorHeight / +storyHeight;
    if (storyHeight > 0) {
      dispatch(updateLayersScaling({ scaleValue: scaleStory, zoomPercent }));
    }
    batch(() => {
      dispatch(setInitialHeight(editorHeight));
      dispatch(setInitialWidth(editorWidth));
      dispatch(setScaleValue(104 / editorHeight));
      dispatch(toggleForceRebuild(true));
      dispatch(toggleForceRebuildMulti(true));
    });
  }
};

export const filteredResizeStory = (scalePercent) => (dispatch, getState) => {
  const { editorHeight, editorWidth } = changeEditorSize(scalePercent);
  const state = getState();
  const storyHeight = state.ampStory.present.initialHeight;
  const zoomPercent = state.helpers.zoomPercent;

  if (editorHeight !== storyHeight) {
    const scaleStory = editorHeight / +storyHeight;
    if (storyHeight > 0) {
      dispatch(filteredUpdateLayersScaling({ scaleValue: scaleStory, zoomPercent }));
    }
    batch(() => {
      dispatch(filteredSetInitialHeight(editorHeight));
      dispatch(filteredSetInitialWidth(editorWidth));
      dispatch(setScaleValue(104 / editorHeight));
    });
  }
};

export const setFrameSizeAndZoomPercent = (percent) => (dispatch) => {
  batch(() => {
    dispatch(resizeStory(percent));
    dispatch(setZoomPercent(percent));
  });
};

export const rebuildGradientData = (layer) => async (dispatch, getState) => {
  const state = getState();

  if (layer.content.gradient?.url) {
    try {
      const { data } = await api.get(layer.content.gradient?.url);
      const { parsedShape: input } = generateGradientData(data);

      const activeSlide = state.ampStory.present.activeSlidePosition;
      const activeLayer = layer.position;
      batch(() => {
        dispatch(
          setGradientInputString({
            activeSlide,
            activeLayer,
            input,
          }),
        );
        dispatch(incrementStoryChangedCount());
      });
    } catch (err) {
      return;
    }
  }
};
