import { createSelector, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { EditorState } from 'draft-js';
import { debounce, get, isNil, isUndefined, set } from 'lodash';
import { batch } from 'react-redux';
import undoable, { ActionCreators, combineFilters, excludeAction, includeAction } from 'redux-undo';
import { updateLayerAnimations } from '../../../utils/animations';
import { convertCroppedLayers } from '../../../utils/croppingUtils';
import { STORY_STATUS_PUBLISHED } from '../../../components/stories/constants/story';
import { FONT_TYPE, defaultStoryName, storyConstants } from '../../../config/constants';
import { storyUrls, videoUrls, widgetUrls } from '../../../config/urls';
import { IColorType } from '../../../interfaces/colors';
import { layerTypes } from '../../../interfaces/layer-types';
import api from '../../../utils/api';
import { buildGroup, defaultCut, defaultEditorModel, defaultGradientColor } from '../../../utils/builders';
import { getNewShapeGradientBackground } from '../../../utils/colorUtils';
import { changeColorToGradient } from '../../../utils/colors';
import { getObjectDiff } from '../../../utils/common';
import { cloneObj } from '../../../utils/commonUtils';
import generateId, { convertId } from '../../../utils/generateId';
import loopThroughStoryLayers from '../../../utils/loopThroughStoryLayers';
import { generateReplaceMediaDimensions, limitDuration, onGetVideoDuration } from '../../../utils/mediaUtils';
import {
  loadFontFamily,
  loadFonts,
  prepareTextLayer,
  removeTextLayerConfig,
  selectAllText,
} from '../../../utils/textEditorUtils';
import { batchGroupBy } from '../../../utils/undoableUtils';
import { storiesApi } from '../../services/stories/stories';
import { closeModal } from '../editor-modal/editorModalSlice';
import { toggleGroupLayer } from '../editor/helpers/groupLayerHelperSlice';
import { setSizeProportion } from '../editor/layer-setting/layerSettingSlice';
import { saveStoryAndOpenPublishAsWebStory, toggleExportLoading } from '../export/exportSlice';
import { loadingFinished, loadingStarted } from '../loader/loaderSlice';
import { addMediaName, replaceTemporaryMediaInStory, toggleSplitVideoModal } from '../media/mediaSlice';
import enhancedUndoableAmpStoryReducer from './enhancedUndoable';

import { filterSnappedLayers } from '../../../utils/layerUtils';
import {
  checkLayersLimit,
  checkVideoCtaCutsLimited,
  createSlideName,
  deleteMediaLayersWithoutPendingDataUtil,
  getAllPendingMediaIdsWithoutLayerForStory,
  getAmpStoryWithReplacedMedia,
  getDuplicateName,
  getIsEditorStateChangeEssential,
  normalizeLayers,
  removeFontsFromAmp,
  rescaleLayer,
  rescaleTemplate,
  rescaleThickness,
  scaleEditorConfig,
  setDataToNewLayer,
  setIndexes,
  sortLayersOrCuts,
} from '../../../utils/editorUtils';
import {
  deleteAlreadyAppliedPendingMedia,
  handleCroppedLayer,
  incrementStoryChangedCount,
  removeMultiplePendingMedia,
  resetCropHelpers,
  resetStoryChangedCount,
  resizeStory,
  selectLayer,
  setAmpStoryTitleChanged,
  setExportPressed,
  setFrameSizeAndZoomPercent,
  setLayerCopyCounter,
  setNewLayerPosition,
  setOldStoryTitle,
  toggleCtaCutLimited,
  toggleStorySavedNotificationVisibility,
  toggleVideoCutLimited,
  updateSlidesLimits,
} from '../editor/helpers/helpersSlice';

export const SINGLE_USE_LAYERS = [layerTypes.OUTLINK, layerTypes.CTA_LINK];

const initialState = {
  type: 'amp-story',
  title: defaultStoryName,
  publisher: 'user name',
  publisherLogoSrc: 'https://example.com/logo/1x1.png',
  initialWidth: 0,
  initialHeight: 0,
  cuts: [],
  fonts: [],
  googleFonts: [],
  storyFonts: [],
  fromPreview: true,
  _id: '',
  author: '',
  posterPortrait3x4Url: '',
  posterPortrait1x1Url: '',
  posterLandscapeUrl: '',
  backgroundAudioUrl: '',
  description: '',
  status: '',
  downloadable: false,
  reportedBy: [],
  editToken: '',
  viewToken: '',
  storyConfigId: '',
  createdAt: '',
  updatedAt: '',
  storyUpdatedAt: '',
  __v: 0,
  scaleValue: 0.18,
  modifiedBy: '',
  teamId: null,
  isMuted: false,
  zoomRatio: 1,
  selectedLayerNumbers: null,
  hasAccessControl: false,
  extendedAccess: null,
  customDomain: null,
  isScalingActive: false,
};

const setLayerName = (type) => {
  switch (type) {
    case layerTypes.CTA_LINK:
    case layerTypes.OUTLINK:
      return 'CTA Layer';
    case layerTypes.GIFS:
      return 'Gif Layer';
    case layerTypes.STICKERS:
      return 'Sticker';
    case layerTypes.HTML:
      return 'Type something';
    case layerTypes.IMAGE:
      return 'Image Layer';
    case layerTypes.SHAPE:
      return 'Shape Layer';
    default:
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
};

const ampStorySlice = createSlice({
  name: 'ampStory',
  initialState,
  reducers: {
    setActiveSlidePosition(state, action) {
      state.activeSlidePosition = action.payload;
    },
    removeActiveSlidePosition(state) {
      delete state.activeSlidePosition;
    },
    setActiveLayerPosition(state, action) {
      state.activeLayerPosition = action?.payload;
    },
    removeActiveLayerPosition(state) {
      delete state.activeLayerPosition;
    },
    setAmpStoryTitle(state, action) {
      state.title = action.payload;
    },
    addSlide(state, action) {
      const position = action.payload.position || state.cuts.length;
      const slide = action.payload.slide;

      state.cuts.splice(position, 0, slide);
      setIndexes(state.cuts);
    },
    deleteSlide(state, action) {
      state.cuts.splice(action.payload, 1);
      setIndexes(state.cuts);
    },
    resetSlide(state, action) {
      let slide = state.cuts[action.payload];
      slide = defaultCut(action.payload, slide.title ?? 'New slide', slide?.author || '');
      state.cuts[action.payload] = slide;
    },
    reorderSlides(state, action) {
      const [reorderedSlide] = state.cuts.splice(action.payload.sourceSlideId, 1);
      state.cuts.splice(action.payload.destinationSlideId || 0, 0, reorderedSlide);
      setIndexes(state.cuts);
    },
    updateSlidesScaleEditorConfig(state, action) {
      const { scaleValue, updatePosition } = action.payload;

      state.cuts = scaleEditorConfig(state.cuts, scaleValue, updatePosition);
    },
    addNewLayer(state, action) {
      const { layer, activeSlidePosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];
      const layers = activeSlide.layers;
      const filteredLayers = layers.filter(
        (currentLayer) => currentLayer.type !== layerTypes.CTA_LINK && currentLayer.type !== layerTypes.OUTLINK,
      );
      const ctaLayer = layers.find(
        (currentLayer) => currentLayer.type === layerTypes.CTA_LINK || currentLayer.type === layerTypes.OUTLINK,
      );

      filteredLayers.push(layer);
      if (ctaLayer) {
        filteredLayers.push(ctaLayer);
      }
      activeSlide.layers = filteredLayers;
      setIndexes(activeSlide.layers);
      activeSlide.lastActiveLayer = layer;
    },
    addLayer(state, action) {
      const activeSlidePosition = action.payload.activeSlidePosition;
      const layers = state.cuts[activeSlidePosition].layers;
      const position = !isUndefined(action.payload.position) ? action.payload.position : layers.length;
      const layersPayload = action.payload.layers;
      const newPositions = [];

      layersPayload.forEach((layer, index) => {
        layers.splice(position + index, 0, layer);
        newPositions.push(position + index);
      });

      setIndexes(state.cuts[activeSlidePosition ?? -1].layers);
      state.selectedLayerNumbers = newPositions;
    },
    deleteLayer(state, action) {
      const { slidePosition, layerPositions } = action.payload;
      const newLayers = state.cuts[slidePosition ?? -1].layers.filter(
        (layer) => !layerPositions?.includes(+layer?.position),
      );

      setIndexes(newLayers);
      state.cuts[slidePosition ?? -1].layers = newLayers;
    },
    reorderLayers(state, action) {
      const { sourceLayerId, destinationLayerId, activeSlidePosition } = action.payload;
      const [reorderedSlide] = state.cuts[activeSlidePosition].layers.splice(sourceLayerId, 1);

      state.cuts[activeSlidePosition].layers.splice(destinationLayerId || 0, 0, reorderedSlide);
      setIndexes(state.cuts[activeSlidePosition].layers);
    },
    setLastActiveLayer(state, action) {
      const { activeSlidePosition, activeLayerPosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];
      const activeLayer = activeSlide.layers[activeLayerPosition ?? -1];
      if (activeSlide) {
        activeSlide.lastActiveLayer = activeLayer;
      }
    },
    setCutsIndexes(state) {
      for (let i = 0; i < state.cuts.length; i++) {
        state.cuts[i].position = i;
      }
    },
    setLayerIndexes(state, action) {
      const { activeSlidePosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];

      setIndexes(activeSlide.layers);
    },
    setInitialWidth(state, action) {
      state.initialWidth = action.payload;
    },
    filteredSetInitialWidth(state, action) {
      state.initialWidth = action.payload;
    },
    setInitialHeight(state, action) {
      state.initialHeight = action.payload;
    },
    filteredSetInitialHeight(state, action) {
      state.initialHeight = action.payload;
    },
    setLoadedAmpStory(state, action) {
      // Merge the default state with newly created story
      return { ...state, ...action.payload };
    },
    setNewAmpStory(state, action) {
      // Merge the default state with newly created story
      return { ...state, ...action.payload };
    },
    clearAmpStory() {
      return initialState;
    },
    updateSlideImagesAndLastActiveLayer(state, action) {
      state.cuts = action.payload.map((element, index) => {
        const image = `${index}.image.png`;
        const lastActiveLayer = element.layers.length > 0 ? element.layers[0] : layerTypes.NEW_LAYER;
        return { ...element, image, lastActiveLayer };
      });
    },
    mapBackActiveSlideToStory(state, action) {
      const { activeSlide, activeLayer } = action.payload;
      const correctLayers = activeSlide.layers.map((layer) => {
        if (layer._id === activeLayer._id) {
          return activeLayer;
        }
        return layer;
      });
      state.cuts = state.cuts.map((cut) => {
        if (cut._id === activeSlide._id) {
          return {
            ...activeSlide,
            layers: correctLayers,
          };
        }
        return cut;
      });
    },
    setFonts(state, action) {
      state.fonts = action.payload;
    },
    setGoogleFonts(state, action) {
      state.googleFonts = action.payload;
    },
    addStoryFont(state, action) {
      state.fonts.push(action.payload);
    },
    addGoogleFont(state, action) {
      state.googleFonts.push(action.payload);
    },
    setActiveSlidePropsInStore(state, action) {
      const { field, value, activeSlidePosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];
      if (activeSlide) {
        set(activeSlide, field, value);
      }
    },
    setActiveSlideColorPickerPropsInStore(state, action) {
      const { field, value, activeSlidePosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];
      if (activeSlide) {
        set(activeSlide, field, value);
      }
    },
    updateActiveSlideInStore(state, action) {
      const { slide, position } = action.payload;
      state.cuts[position ?? -1] = slide;
    },
    updateActiveLayerInStore(state, action) {
      const { layer, activeSlidePosition, position } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];

      if (activeSlide) {
        const activeLayer = activeSlide.layers[position ?? -1];
        if (activeLayer) {
          activeSlide.layers[position ?? -1] = layer;
        }
      }
    },
    filteredUpdateActiveLayerInStore(state, action) {
      const { layer, activeSlidePosition, position } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];

      if (activeSlide) {
        const activeLayer = activeSlide.layers[position ?? -1];
        if (activeLayer) {
          activeSlide.layers[position ?? -1] = layer;
        }
      }
    },
    setActiveLayerPropsInStore(state, action) {
      const { field, value, activeSlidePosition, activeLayerPosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];

      if (activeSlide) {
        const activeLayer = activeSlide.layers[activeLayerPosition ?? -1];
        if (activeLayer) {
          set(activeLayer, field, value);
        }
      }
    },
    setFilteredActiveLayerPropsArrayInStore(state, action) {
      const inputArray = action.payload;
      const activeSlidePosition = state.activeSlidePosition;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];

      if (activeSlide) {
        inputArray.forEach((inputPair) => {
          const { position, field, value } = inputPair;
          const activeLayer = activeSlide.layers[position ?? -1];
          if (activeLayer) {
            set(activeLayer, field, value);
          }
        });
      }
    },
    setActiveLayerPropsArrayInStore(state, action) {
      const { inputArray, activeSlidePosition, activeLayerPosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];

      if (activeSlide) {
        const activeLayer = activeSlide.layers[activeLayerPosition ?? -1];
        if (activeLayer) {
          inputArray.forEach((inputPair) => {
            const { field, value } = inputPair;
            set(activeLayer, field, value);
          });
        }
      }
    },
    setCTAImage(
      state,
      action,
    ) {
      const { temporaryId, imageId, imageUrl, imageName } = action.payload;

      const activeSlidePosition = state.activeSlidePosition;
      const activeLayerPosition = state.activeLayerPosition;

      const activeSlide = state.cuts[activeSlidePosition ?? -1];

      if (activeSlide) {
        const activeLayer = activeSlide.layers[activeLayerPosition ?? -1];
        if (activeLayer) {
          activeLayer.temporaryId = temporaryId;
          activeLayer.content.image.id = imageId;
          activeLayer.content.image.url = imageUrl;
          activeLayer.content.image.name = imageName;
        }
      }
    },
    setActiveLayerSettingsTypeInStore(state, action) {
      const { input, activeSlidePosition, activeLayerPosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];
      if (activeSlide) {
        const activeLayer = activeSlide.layers[activeLayerPosition ?? -1];
        if (activeLayer) {
          Object.keys(input).forEach((settingCategory) => {
            Object.keys(input[settingCategory]).forEach((singleSetting) => {
              set(activeLayer.settings[settingCategory], singleSetting, input[settingCategory][singleSetting]);
            });
          });
        }
      }
    },
    setActiveSlideBackgroundColor(state, action) {
      const { activeSlidePosition } = action.payload;
      const activeSlide = state.cuts[activeSlidePosition ?? -1];

      if (activeSlide && !activeSlide?.backgroundColor) {
        activeSlide.backgroundColor = defaultGradientColor(IColorType.BgColor);
      }
    },
    updateLayersScaling(state, action) {
      const { scaleValue, zoomPercent } = action.payload;

      state.cuts.forEach((cut) => {
        cut?.layers.forEach((layer) => {
          if (layer?.type === layerTypes.GROUP) {
            layer?.childLayers?.forEach((childLayer) => {
              rescaleLayer(childLayer, scaleValue);
              rescaleThickness(childLayer, zoomPercent / 100);
            });
          }

          rescaleLayer(layer, scaleValue);
          rescaleThickness(layer, zoomPercent / 100);
        });
      });

      state.isScalingActive = true;
    },
    restoreScaling(state) {
      if (state.isScalingActive) {
        state.isScalingActive = false;
      }
    },
    filteredUpdateLayersScaling(state, action) {
      const { scaleValue, zoomPercent } = action.payload;

      state.cuts.forEach((cut) => {
        cut?.layers.forEach((layer) => {
          if (layer?.type === layerTypes.GROUP) {
            layer?.childLayers?.forEach((childLayer) => {
              rescaleLayer(childLayer, scaleValue);
              rescaleThickness(childLayer, zoomPercent / 100);
            });
          }

          rescaleLayer(layer, scaleValue);
          rescaleThickness(layer, zoomPercent / 100);
        });
      });
    },
    updateSlideLayersScaling(state, action) {
      const { scaleValue, activeSlidePosition, zoomPercent } = action.payload;
      const slide = state.cuts[activeSlidePosition];

      slide?.layers.forEach((layer) => {
        if (layer?.type === layerTypes.GROUP) {
          layer?.childLayers?.forEach((childLayer) => {
            rescaleLayer(childLayer, scaleValue);
            rescaleThickness(childLayer, zoomPercent / 100);
          });
        }

        rescaleLayer(layer, scaleValue);
        rescaleThickness(layer, zoomPercent / 100);
      });
    },
    setScaleValue(state, action) {
      state.scaleValue = action.payload;
    },
    setIsStoryMuted(state, action) {
      state.isMuted = action.payload;
    },
    setGradientColors(state, action) {
      const { activeSlide, activeLayer, key, stopId, newColor } = action.payload;
      const gradientColors = state.cuts[activeSlide].layers[activeLayer].content.gradient.colors;
      gradientColors[key].color = newColor;
    },
    setGradientInputString(state, action) {
      const { activeSlide, activeLayer, input } = action.payload;
      state.cuts[activeSlide].layers[activeLayer].content.gradient.input = input;
    },
    setZoomRatio(state, action) {
      state.zoomRatio = action.payload;
    },
    setAccessControl(state, action) {
      state.hasAccessControl = action.payload;
    },
    updateSlideLayers(state, action) {
      const { layers, activeSlidePosition } = action.payload;

      layers.forEach((layer) => {
        const layerClone = cloneObj(layer);
        if (layerClone.type === layerTypes.HTML || layerClone.type === layerTypes.TEXT) {
          prepareTextLayer(layerClone);
        }
        state.cuts[activeSlidePosition].layers[layer.position] = layerClone;
      });
    },
    setSelectedLayerNumbers(state, action) {
      state.selectedLayerNumbers = action.payload;
    },
    lockLayers(state, action) {
      const selectedLayerNumbers = state.selectedLayerNumbers;
      const activeSlidePosition = state.activeSlidePosition;

      if (selectedLayerNumbers && typeof activeSlidePosition === 'number') {
        selectedLayerNumbers.forEach((layerPosition) => {
          state.cuts[activeSlidePosition].layers[layerPosition].settings.generalSettings.locked = action.payload;
        });
      }
    },
    updateStoryCoverAndUpdatedAtDate(state, action) {
      state.storyUpdatedAt = action.payload.storyUpdatedAt;
      state.cover = action.payload.cover;
    },
    updateStoryModifiedBy(state, action) {
      state.modifiedBy = action.payload;
    },
    setCustomDomain(state, action) {
      state.customDomain = action.payload;
    },
    pushToHistory(state) {
      return state;
    },
    createGroup(
      state,
      action,
    ) {
      const { group, layersIds, activeSlidePosition } = action.payload;
      const cut = state.cuts[activeSlidePosition];
      const startIndex = group.position;

      if (isNil(startIndex)) {
        return;
      }

      cut.layers = cut.layers.filter((layer) => !layersIds.includes(layer._id));
      cut.layers.splice(startIndex, 0, group);
      cut.layers = cut.layers.map((layer, index) => ({ ...layer, position: index }));
    },
    setUngroup(state, action) {
      const { group, activeSlidePosition } = action.payload;
      const cut = state.cuts[activeSlidePosition];
      const startIndex = group.position;

      if (isNil(startIndex) || !group.childLayers) {
        return;
      }

      cut.layers.splice(startIndex, 1, ...group.childLayers);
      cut.layers = cut.layers.map((layer, index) => ({ ...layer, position: index }));

      const selectedLayerNumbersUpdated = [];
      let counterIndex = startIndex;

      [...Array(group.childLayers.length).keys()].forEach(() => {
        selectedLayerNumbersUpdated.push(counterIndex);
        counterIndex++;
      });

      state.activeLayerPosition = undefined;
      state.selectedLayerNumbers = selectedLayerNumbersUpdated;
    },
    updateAboveSnappedLayers(state, action) {
      const activeSlidePosition = state.activeSlidePosition;
      const cuts = state.cuts;

      if (isNil(activeSlidePosition) || activeSlidePosition < 0) {
        return;
      }

      const { above, layerId } = action.payload;
      above.forEach(({ _id }) => {
        const layer = cuts[activeSlidePosition]?.layers.find((l) => l.type === layerTypes.HTML && l._id === _id);

        if (layer) {
          if (state?.snappedLayers?.[layer._id]) {
            if (!state.snappedLayers[layer._id].find((sl) => sl === layerId)) {
              state.snappedLayers[layer._id].push(layerId);
            }
          } else {
            state.snappedLayers = { ...state.snappedLayers, [layer._id]: [layerId] };
          }
        }
      });
    },
    updateBelowSnappedLayers(state, action) {
      const activeSlidePosition = state.activeSlidePosition;
      const cuts = state.cuts;

      if (isNil(activeSlidePosition) || activeSlidePosition < 0) {
        return;
      }

      const { below, layerId } = action.payload;
      below.forEach(({ _id }) => {
        const layer = cuts[activeSlidePosition]?.layers.find((l) => l.type === layerTypes.HTML && l._id === _id);

        if (layer) {
          if (state?.snappedLayers?.[layerId]) {
            if (!state?.snappedLayers[layerId].find((sl) => sl === _id)) {
              state?.snappedLayers[layerId].push(_id);
            }
          } else {
            state.snappedLayers = { ...state.snappedLayers, [layerId]: [_id] };
          }
        }
      });
    },
    clearAboveSnappedLayers(state, action) {
      const target = action.payload;
      if (state.snappedLayers) {
        Object.keys(state.snappedLayers).forEach((key) => {
          if (state?.snappedLayers?.[key]) {
            state.snappedLayers[key] = state.snappedLayers[key]?.filter((sl) => sl !== target);
            if (state.snappedLayers[key].length === 0) {
              delete state.snappedLayers[key];
            }
          }
        });
      }
    },
    clearBelowSnappedLayers(state, action) {
      const layerId = action.payload;
      if (state?.snappedLayers?.[layerId]) {
        delete state.snappedLayers[layerId];
      }
    },
    clearSnappedLayers(state, action) {
      const target = action.payload;
      if (state.snappedLayers?.[target]) {
        delete state.snappedLayers[target];
      }
      if (state.snappedLayers) {
        Object.keys(state.snappedLayers).forEach((key) => {
          if (state?.snappedLayers?.[key]) {
            state.snappedLayers[key] = state.snappedLayers[key]?.filter((sl) => sl !== target);
            if (state.snappedLayers[key].length === 0) {
              delete state.snappedLayers[key];
            }
          }
        });
      }
    },
    updateTextLayersOffset(state, action) {
      const activeSlidePosition = state.activeSlidePosition;
      const { layers, delta } = action.payload;

      if (isNil(activeSlidePosition) || activeSlidePosition < 0) {
        return;
      }

      layers?.forEach((l) => {
        const currentLayer = state.cuts[activeSlidePosition]?.layers?.find(({ _id }) => _id === l);
        if (currentLayer) {
          currentLayer.settings.generalSettings.offsetY += delta;
        }
      });
    },
    syncSnappedLayers(state, action) {
      const existingIds = action.payload;

      if (state.snappedLayers) {
        Object.keys(state.snappedLayers).forEach((key) => {
          if (!existingIds.includes(key)) {
            delete state?.snappedLayers?.[key];
            return;
          }
        });
      }
    },
  },
});

export const {
  setActiveSlidePosition,
  removeActiveSlidePosition,
  setActiveLayerPosition,
  removeActiveLayerPosition,
  setAmpStoryTitle,
  resetSlide,
  addSlide,
  deleteSlide,
  reorderSlides,
  updateSlidesScaleEditorConfig,
  setCutsIndexes,
  setInitialWidth,
  setInitialHeight,
  setNewAmpStory,
  setLoadedAmpStory,
  clearAmpStory,
  updateActiveSlideInStore,
  updateActiveLayerInStore,
  updateSlideImagesAndLastActiveLayer,
  addLayer,
  addNewLayer,
  deleteLayer,
  reorderLayers,
  setLastActiveLayer,
  setFonts,
  setGoogleFonts,
  addStoryFont,
  addGoogleFont,
  mapBackActiveSlideToStory,
  setActiveSlidePropsInStore,
  setActiveSlideColorPickerPropsInStore,
  setActiveSlideBackgroundColor,
  setLayerIndexes,
  setActiveLayerPropsInStore,
  setActiveLayerPropsArrayInStore,
  setCTAImage,
  setActiveLayerSettingsTypeInStore,
  updateSlideLayersScaling,
  updateLayersScaling,
  filteredUpdateActiveLayerInStore,
  filteredUpdateLayersScaling,
  filteredSetInitialHeight,
  filteredSetInitialWidth,
  setScaleValue,
  setIsStoryMuted,
  setGradientColors,
  setGradientInputString,
  setZoomRatio,
  updateSlideLayers,
  setSelectedLayerNumbers,
  lockLayers,
  updateStoryCoverAndUpdatedAtDate,
  updateStoryModifiedBy,
  setCustomDomain,
  pushToHistory,
  setFilteredActiveLayerPropsArrayInStore,
  setAccessControl,
  createGroup,
  setUngroup,
  updateAboveSnappedLayers,
  updateBelowSnappedLayers,
  clearAboveSnappedLayers,
  clearBelowSnappedLayers,
  clearSnappedLayers,
  updateTextLayersOffset,
  syncSnappedLayers,
  restoreScaling,
} = ampStorySlice.actions;

const undoableAmpStoryReducer = undoable(ampStorySlice.reducer, {
  limit: 30,
  groupBy: batchGroupBy.init([
    'ampStory/setActiveSlidePosition',
    'ampStory/deleteSlide',
    'ampStory/addSlide',
    'ampStory/deleteLayer',
    'ampStory/addNewLayer',
    'ampStory/setActiveSlidePropsInStore',
  ]),
  filter: combineFilters(
    includeAction([
      'ampStory/addLayer',
      'ampStory/resetSlide',
      'ampStory/deleteLayer',
      'ampStory/addNewLayer',
      'ampStory/reorderSlides',
      'ampStory/reorderLayers',
      'ampStory/updateActiveLayerInStore',
      'ampStory/setActiveLayerPropsInStore',
      'ampStory/setActiveSlidePropsInStore',
      'ampStory/setActiveLayerSettingsTypeInStore',
      'ampStory/setActiveSlidePosition',
      'ampStory/setLoadedAmpStory',
      'ampStory/setScaleValue',
      'ampStory/setIsStoryMuted',
      'ampStory/deleteSlide',
      'ampStory/addSlide',
      'ampStory/updateSlideLayers',
      'ampStory/pushToHistory',
      'ampStory/setActiveSlideColorPickerPropsInStore',
      'ampStory/setCTAImage',
      'ampStory/createGroup',
      'ampStory/setUngroup',
    ]),
    excludeAction([
      'ampStory/setSelectedLayerNumbers',
      'ampStory/removeActiveSlidePosition',
      'ampStory/setActiveLayerPosition',
      'ampStory/removeActiveLayerPosition',
      'ampStory/filteredUpdateActiveLayerInStore',
      'ampStory/filteredUpdateLayersScaling',
      'ampStory/filteredSetInitialHeight',
      'ampStory/filteredSetInitialWidth',
      'ampStory/setNewAmpStory',
      'ampStory/setFilteredActiveLayerPropsInStore',
      'ampStory/updateStoryCoverAndUpdatedAtDate',
    ]),
  ),
});

export default enhancedUndoableAmpStoryReducer(undoableAmpStoryReducer);

// Stories
export const createStory = (title, history) => async (dispatch) => {
  batch(() => {
    dispatch(loadingStarted());
  });

  try {
    const ampStoryResponse = await api.post(storyUrls.createStory, {
      title,
    });
    batch(() => {
      dispatch(setLoadedAmpStory(ampStoryResponse?.data?.ampStory));
      dispatch(addNewSlide());
      dispatch(storiesApi.util.invalidateTags([{ type: 'Stories', id: 'LIST' }]));
      dispatch(storiesApi.util.invalidateTags([{ type: 'Folder', id: 'LIST' }]));
    });
    history.push(`/story/${ampStoryResponse.data.ampStory._id}`);
  } catch (e) {
    console.error(e);
    // TODO
  } finally {
    dispatch(loadingFinished());
  }
};

const modifySlides = (slides) => slides.map((slide) => normalizeLayers(slide));

export const loadStory = (
  { storyId, scale, history, activeSlidePosition, slideScaling, scaleIndexes },
  shouldClearUndoHistory,
  openModalAfterLoading,
  disableLoader,
  saveAfterTemplateApply,
) => async (dispatch, getState) => {
  if (!disableLoader) {
    dispatch(loadingStarted());
  }
  let mediaIds = [];
  let ampStoryId = null;
  const pendingMediaQueue = getState().helpers.pendingMediaQueue;

  try {
    // Fetch the amp story configuration
    const ampStoryResponse= await api.get(storyUrls.getStory(storyId));
    let ampStory = ampStoryResponse?.data;
    if (
      typeof slideScaling === 'number' &&
      typeof activeSlidePosition === 'number' &&
      typeof scale === 'number' &&
      slideScaling !== 1 &&
      scaleIndexes !== undefined
    ) {
      ampStory = rescaleTemplate(ampStory, activeSlidePosition, slideScaling, scale, scaleIndexes);
    }
    ampStory = deleteMediaLayersWithoutPendingDataUtil(ampStory, pendingMediaQueue);
    const textLayersIds = [];
    // Set the correct color gradients to story layers
    loopThroughStoryLayers(
      ampStory,
      [
        changeColorToGradient,
        prepareTextLayer,
        convertId,
        convertCroppedLayers,
        updateLayerAnimations,
        filterSnappedLayers(textLayersIds),
      ],
      [convertId],
    );

    const slides = modifySlides(ampStory.cuts);
    ampStory = { ...ampStory, cuts: slides.sort(sortLayersOrCuts) };
    // Set the story in the store
    const activeSlide = ampStory?.cuts?.[activeSlidePosition ?? 0];
    const oldStoryTitle = ampStory?.title;
    const { ctaCutLimited, videoCutLimited } = checkVideoCtaCutsLimited(activeSlide);

    const activeLayer = activeSlide?.layers?.[0];
    ampStoryId = ampStory?._id;

    const storyGoogleFonts = ampStory?.googleFonts;

    /** Backward compatibility remove all old fonts and assign them to google fonts */
    const backwardFonts = ampStory?.fonts?.filter(
      (font, index, self) =>
        font?.fontType === FONT_TYPE.GOOGLE_FONT && index === self?.findIndex((f) => f?.family === font?.family),
    );

    if (backwardFonts?.length) {
      backwardFonts?.forEach((backwardFont) => {
        const isFontAlreadyLoaded = storyGoogleFonts?.find((f) => f?.family === backwardFont?.family);
        if (!isFontAlreadyLoaded) {
          storyGoogleFonts.push({
            family: backwardFont?.family,
            weight: backwardFont?.weight,
            fontType: backwardFont?.fontType,
            style: 'normal',
            file: backwardFont?.paths?.[400] ?? backwardFont?.paths?.['regular'],
          });
        }
      });
    }

    ampStory.fonts = ampStory.fonts.filter((f) => f?.fontType !== FONT_TYPE.GOOGLE_FONT);
    ampStory.googleFonts = storyGoogleFonts;

    /** Load google fonts */
    loadFonts(storyGoogleFonts);

    batch(() => {
      mediaIds = getAllPendingMediaIdsWithoutLayerForStory(ampStory?._id, ampStory?.cuts);
      dispatch(setLoadedAmpStory(ampStory));
      dispatch(invalidateRTKStory(ampStory?._id));
      dispatch(setOldStoryTitle(oldStoryTitle));
      if (ampStory.cuts.length < 1) {
        dispatch(addNewSlide());
      }
      if (activeSlide) {
        dispatch(setActiveSlidePosition(activeSlidePosition || activeSlide.position));
      }
      dispatch(toggleCtaCutLimited(ctaCutLimited));
      dispatch(toggleVideoCutLimited(videoCutLimited));
      dispatch(setExportPressed(false));
      dispatch(syncSnappedLayers(textLayersIds));

      if (activeLayer && shouldClearUndoHistory) {
        dispatch(setActiveLayerPosition(activeLayer.position));
        dispatch(selectMultipleLayer(activeLayer.position, false));
        if (activeLayer.type === layerTypes.GROUP) {
          dispatch(toggleGroupLayer(true));
        }
      }
      if (activeLayer && activeLayer.type === layerTypes.HTML) {
        const editorState = activeLayer.settings.editorState;
        const selection = selectAllText(editorState);
        dispatch(
          setActiveLayerPropsInStore({
            field: `settings.editorState`,
            value: EditorState.acceptSelection(editorState, selection),
            activeLayerPosition: activeLayer.position,
            activeSlidePosition: activeSlide.position,
          }),
        );
      }
      dispatch(resizeStory(scale));
    });
    batch(() => {
      dispatch(deleteAlreadyAppliedPendingMedia());
      if (shouldClearUndoHistory) {
        dispatch(ActionCreators.clearHistory());
      }
    });
  } catch (e) {
    console.error(e);
    if ((e?.response?.status === 400 || e?.response?.status === 404) && history) {
      history.push('/page-not-found');
    }
  } finally {
    batch(() => {
      if (mediaIds.length > 0 && ampStoryId) {
        dispatch(removeMultiplePendingMedia({ mediaIds, storyId: ampStoryId }));
      }
      if (!disableLoader) {
        dispatch(loadingFinished());
      }
    });
  }

  if (openModalAfterLoading) {
    const fitZoom = getState().helpers.fitZoomPercent;
    dispatch(setFrameSizeAndZoomPercent(fitZoom));
    dispatch(saveStoryAndOpenPublishAsWebStory(true));
  }

  // Templates race condition fixed
  if (saveAfterTemplateApply) {
    batch(() => {
      dispatch(updateStoryConfig(true));
      dispatch(closeModal());
    });
  }
};

export const adjustStoryAfterCreation = () => async (dispatch) => {
  // fix wrong sizing of editor frame on freshly created story
  // open an existing story fires a request which cause resizeStory in it to execute later in time
  // setTimeout is used to call actions after current call stack is executed to simulate async await in loadStory
  setTimeout(() => {
    batch(() => {
      dispatch(resizeStory());
      dispatch(ActionCreators.clearHistory());
    });
  });
};

export const updateStoryConfigDebounced = debounce((dispatch) => dispatch(updateStoryConfig()), 5000, {
  leading: false,
  trailing: true,
});

export const updateStoryConfigDebouncedAction = () => (dispatch) => {
  updateStoryConfigDebounced(dispatch);
};

export const updateStoryConfig = (forceCoverRecreation = false) => async (dispatch, getState) => {
  const state = getState();
  const userId = state.auth.user?._id ?? '';
  const isMediaUploading = state.helpers.isMediaUploading;
  const ampStory = cloneObj(state.ampStory.present);
  const pendingMediaQueue = state.helpers.pendingMediaQueue;
  const willUpdateStoryTimestamp = state.helpers.willUpdateStoryTimestamp;

  const updatedAmpStory = getAmpStoryWithReplacedMedia(ampStory, pendingMediaQueue);
  updatedAmpStory.modifiedBy = userId;
  if (isMediaUploading) {
    return;
  }

  if (willUpdateStoryTimestamp) {
    updatedAmpStory.storyUpdatedAt = new Date().toISOString();
  }

  loopThroughStoryLayers(updatedAmpStory, [removeTextLayerConfig]);
  removeFontsFromAmp(updatedAmpStory);
  try {
    const res = await api.put(storyUrls.saveStoryChanges, {
      ampStory: updatedAmpStory,
      forceCoverRecreation,
    });

    const { cover, modifiedBy, storyUpdatedAt } = res?.data;

    batch(() => {
      dispatch(updateStoryModifiedBy(modifiedBy));
      dispatch(updateStoryCoverAndUpdatedAtDate({ cover, storyUpdatedAt }));
      dispatch(invalidateRTKStory(res?.data?._id));
      dispatch(resetStoryChangedCount());
    });
  } catch (e) {
    console.error(e);
  }
};

export const invalidateRTKStory = (storyId) => (dispatch) => {
  batch(() => {
    dispatch(storiesApi.util.invalidateTags([{ type: 'Stories', id: 'LIST' }]));
    dispatch(storiesApi.util.invalidateTags([{ type: 'Folder', id: 'LIST' }]));
  });
};

export const saveAmpStoryChanges = (exportLoader, updateDate) => async (
  dispatch,
  getState,
) => {
  dispatch(replaceTemporaryMediaInStory());

  const state = getState();
  const ampStory = state.ampStory.present;
  const userId = state.auth.user?._id;
  const clonedObj = cloneObj(ampStory);
  clonedObj.modifiedBy = userId;
  removeFontsFromAmp(clonedObj);

  if (updateDate) {
    clonedObj.storyUpdatedAt = new Date().toISOString();
  }

  // Maybe local loader?
  if (exportLoader) {
    dispatch(toggleExportLoading(true));
  } else {
    dispatch(loadingStarted());
  }

  try {
    const ampStoryResponse = await api.put(storyUrls.saveStoryChanges, {
      ampStory: clonedObj,
    });

    const responseAmpStory = ampStoryResponse?.data;
    loopThroughStoryLayers(responseAmpStory, [changeColorToGradient, prepareTextLayer]);

    dispatch(
      setNewAmpStory({
        ...ampStory,
        ...responseAmpStory,
        googleFonts: responseAmpStory?.googleFonts,
        fonts: responseAmpStory?.fonts,
      }),
    );
    dispatch(invalidateRTKStory(responseAmpStory?._id));
    dispatch(toggleStorySavedNotificationVisibility(true));
  } catch (e) {
    // TODO
    console.error(e);
  } finally {
    dispatch(resetStoryChangedCount());
    if (exportLoader) {
      dispatch(toggleExportLoading(false));
    } else {
      dispatch(loadingFinished());
    }
  }
};

export const updateStoryMetadata = () => async (dispatch, getState) => {
  const state = getState();
  const ampStory = state.ampStory.present;

  try {
    await api.put(storyUrls.updateMetadata, {
      id: ampStory._id,
      title: ampStory.title,
    });
    if (ampStory?.amp && ampStory?.status === STORY_STATUS_PUBLISHED) {
      await api.put(widgetUrls.updateStory, {
        storyAmpId: ampStory?.amp?.id ?? ampStory?.amp,
        title: ampStory.title,
      });
    }
  } catch (e) {
    console.error(e);
  }

  if (ampStory.titleChanged) {
    dispatch(setAmpStoryTitleChanged(false));
  }
};

// Slides
export const addNewSlide = () => async (dispatch, getState) => {
  const state = getState();
  const ampStory = state.ampStory.present;

  // New slide position (Append at the end)
  const position = ampStory.cuts.length;
  const userId = state.auth.user?._id;

  if (position < storyConstants.cutsLimit) {
    // Build new slide
    const newSlideName = createSlideName(ampStory.cuts);
    const slide = defaultCut(position, newSlideName, userId ?? '');

    dispatch(handleCroppedLayer());
    batch(() => {
      batchGroupBy.start();
      dispatch(addSlide({ slide }));
      dispatch(setActiveSlidePosition(position));
      dispatch(removeActiveLayerPosition());
      dispatch(setSelectedLayerNumbers(null));
      dispatch(incrementStoryChangedCount(true));
      dispatch(setLayerCopyCounter(-1));
      batchGroupBy.end();
    });

    dispatch(updateSlidesLimits());
  } else {
    console.error('Limit reached!');
    // TODO
  }
};
export const setActiveSlideThunk = (position) => (dispatch, getState) => {
  const state = getState();
  const activeLayer = state.ampStory.present.cuts?.[position]?.layers?.[0];

  batch(() => {
    dispatch(handleCroppedLayer());
    dispatch(setActiveSlidePosition(position));
    dispatch(setActiveLayerPosition(activeLayer?.position ?? undefined));
    dispatch(setSelectedLayerNumbers(typeof activeLayer?.position === 'number' ? [activeLayer.position] : null));
    dispatch(setLayerCopyCounter(-1));
  });

  dispatch(updateSlidesLimits());
};
export const removeSlide = (position) => (dispatch, getState) => {
  const state = getState();
  const slides = state.ampStory.present.cuts;
  const activeSlidePosition = position === 0 ? 0 : position - 1;
  const newSlidesLength = slides.length - 1;

  if (newSlidesLength > 0) {
    batch(() => {
      batchGroupBy.start();
      dispatch(deleteSlide(position));
      dispatch(setActiveSlidePosition(activeSlidePosition));
      if (slides[activeSlidePosition]?.lastActiveLayer) {
        dispatch(setActiveLayerPosition(slides[activeSlidePosition]?.layers?.[0]?.position));
        dispatch(setSelectedLayerNumbers([slides[activeSlidePosition]?.layers?.[0]?.position]));
      } else {
        dispatch(setActiveLayerPosition(undefined));
        dispatch(setSelectedLayerNumbers(null));
      }
      dispatch(incrementStoryChangedCount(true));
      dispatch(resetCropHelpers());
      batchGroupBy.end();
    });
  } else {
    batch(() => {
      dispatch(removeActiveLayerPosition());
      dispatch(resetSlide(position));
      dispatch(setSelectedLayerNumbers(null));
    });
    return;
  }

  dispatch(updateSlidesLimits());
};

export const duplicateSlide = (position) => (dispatch, getState) => {
  const state = getState();
  const ampStory = state.ampStory.present;
  const activeSlidePosition = position + 1;
  let duplicatedSlide = cloneObj(ampStory.cuts[position]);
  const lastActiveLayer = { ...duplicatedSlide?.lastActiveLayer };

  const duplicateId = generateId();
  const slide = normalizeLayers(duplicatedSlide, lastActiveLayer);

  duplicatedSlide = {
    ...slide,
    index: duplicatedSlide.index + 1,
    _id: duplicateId,
    title: getDuplicateName(ampStory.cuts, duplicatedSlide.title),
    position: activeSlidePosition,
    lastActiveLayer: Object.keys(lastActiveLayer).length ? lastActiveLayer : null,
  };

  batch(() => {
    batchGroupBy.start();
    dispatch(addSlide({ slide: duplicatedSlide, position: position + 1 }));
    dispatch(setActiveSlidePosition(duplicatedSlide.position));
    dispatch(addMediaName(`${activeSlidePosition}.image.png`));
    dispatch(incrementStoryChangedCount(true));
    batchGroupBy.end();
  });

  batch(() => {
    dispatch(updateSlidesLimits());
    dispatch(updateStoryConfig());
  });
};

export const splitVideo = (videoDurationParts) => async (dispatch, getState) => {
  dispatch(loadingStarted());
  const state = getState();
  const shouldDiscardLayout = state.media.shouldDiscardLayout;
  let videoFile = state.media.videoFile;
  const videoDuration = state.media.videoDuration;
  const artboardsCount = state.media.artboardsCount;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];
  const activeLayer = activeSlide?.layers[activeLayerPosition ?? -1];
  const userId = state.auth.user?._id;
  const workspaceId = state.auth.user?.selectedWorkspaceId;
  const {
    video: { url: videoUrl },
    originalName,
  } = activeLayer.content;
  const isBlob = videoUrl.includes('blob');

  if (!videoFile && isBlob) {
    try {
      const file = await axios.get(videoUrl, { responseType: 'blob' });
      videoFile = file.data;
    } catch (error) {
      dispatch(toggleSplitVideoModal());
      dispatch(loadingFinished());
      throw error;
    }
  }

  const splittedUrl = videoUrl.split('.');
  const fileExtension = isBlob ? videoFile?.type?.split?.('/')?.[1] : splittedUrl[splittedUrl.length - 1];
  const formData = new FormData();

  const data = {
    userId,
    workspaceId,
    videoUrl,
    artboardsCount,
    videoDurationParts,
    videoDuration,
    fileExtension,
    originalName,
    file: videoFile,
  };
  // @ts-ignore
  Object.keys(data).forEach((element) => formData.append(element, data[element]));

  try {
    const { data: videos } = await api.post(videoUrls.splitVideo, formData);

    // Duplicate current slide
    let duplicatedSlide = cloneObj(activeSlide);
    // Duplicate video layer
    const duplicatedLayer = cloneObj(activeLayer);
    // First segment after the split
    const firstSegment = videos[0];
    // Re-assign the segment to the current video layer
    duplicatedLayer.content = {
      ...duplicatedLayer.content,
      video: { id: firstSegment._id, name: firstSegment.name, url: firstSegment.url },
      image: { id: firstSegment.thumbnail?.id, name: firstSegment.thumbnail?.name, url: firstSegment.thumbnail?.url },
      value: firstSegment.url,
      originalName: firstSegment.originalName,
    };
    // Update current layer with first segment
    batch(() => {
      dispatch(
        updateActiveLayerInStore({
          layer: duplicatedLayer,
          activeSlidePosition: duplicatedSlide.position,
          position: duplicatedLayer.position,
        }),
      );
      // Update slide duration with segment duration
      dispatch(
        setActiveSlidePropsInStore({
          field: 'duration',
          value: limitDuration(firstSegment?.duration),
          activeSlidePosition: duplicatedSlide.position,
        }),
      );
    });

    batch(() => {
      batchGroupBy.start();
      videos.forEach((video, index) => {
        if (index === 0) {
          return;
        }
        const videoLayerId = generateId();
        const thumbnail = video.thumbnail;
        let videoLayer = {
          ...activeLayer,
          _id: videoLayerId,
          temporaryId: videoLayerId,
          content: {
            ...activeLayer.content,
            video: { id: video._id, name: video.name, url: video.url },
            image: { id: thumbnail.id, name: thumbnail.name, url: thumbnail.url },
            value: video.url,
            originalName: video.originalName,
          },
        };
        if (shouldDiscardLayout) {
          videoLayer = { ...videoLayer, position: 0 };
          duplicatedSlide = {
            ...duplicatedSlide,
            layers: [videoLayer],
            backgroundColor: defaultGradientColor(IColorType.BgColor),
          };
        } else {
          const modifiedLayers = duplicatedSlide.layers.map((layer) => {
            const newLayerId = generateId();
            return {
              ...layer,
              _id: newLayerId,
              ...(layer.temporaryId && { temporaryId: newLayerId }),
            };
          });
          modifiedLayers[videoLayer.position] = videoLayer;
          duplicatedSlide = { ...duplicatedSlide, layers: modifiedLayers };
          duplicatedSlide = normalizeLayers(duplicatedSlide);
        }
        duplicatedSlide = { ...duplicatedSlide, duration: limitDuration(video?.duration) };
        dispatch(addSlide({ slide: duplicatedSlide, position: activeSlidePosition + index + 1 }));
      });
      dispatch(setActiveSlidePosition(activeSlidePosition + videos.length - 1));
      if (shouldDiscardLayout) {
        dispatch(setActiveLayerPosition(0));
      }
      dispatch(incrementStoryChangedCount());
      batchGroupBy.end();
    });
  } catch (error) {
    console.error(error);
  } finally {
    dispatch(toggleSplitVideoModal());
    dispatch(loadingFinished());
  }
};

export const setActiveSlideProps = ({ field, value }) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;

  batch(() => {
    dispatch(
      setActiveSlideColorPickerPropsInStore({
        field,
        value,
        activeSlidePosition,
      }),
    );
    dispatch(incrementStoryChangedCount(true));
  });
};
export const setGradient = (slidePosition, layerPosition) => (dispatch, getState) => {
  const state = getState();
  const previewContainer = document.querySelectorAll(
    `.slide-preview-${slidePosition} ${
      layerPosition ? '.layer-preview-shape' : '.layer-preview-shape#layer-preview-' + layerPosition
    }`,
  );
  previewContainer.forEach((el) => {
    const matchedId = el.id.match(/\d+/);
    const position = matchedId ? +matchedId[0] : undefined;
    const layerData = state.ampStory.present.cuts[state.ampStory.present.activeSlidePosition ?? -1].layers.find(
      (layer) => layer.position === position,
    ).settings.layerSettings.shapeStyles;
    ['borderColor', 'fillColor'].forEach((key) => {
      if (typeof layerData[key] !== 'string') {
        layerData[key].colorType = key;
        getNewShapeGradientBackground(layerData[key], el, position, slidePosition);
      }
    });
  });
};

const setActiveSlidePropsDebounced = debounce(
  (dispatch, { field, value }) =>
    dispatch(
      setActiveSlideProps({
        field,
        value,
      }),
    ),
  300,
  { leading: false, trailing: true },
);

export const setActiveSlidePropsDebouncedAction = (args) => (dispatch) => {
  setActiveSlidePropsDebounced(dispatch, args);
};

export const selectMultipleLayerById = (id) => (dispatch, getState) => {
  const state = getState();

  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];

  if (activeSlide) {
    const layer = activeSlide?.layers?.find((l) => l?._id === id);
    if (layer) {
      dispatch(selectMultipleLayer(layer.position, true));
    }
  }
};

export const selectMultipleLayer = (position, shouldPush) => (dispatch, getState) => {
  const state = getState();
  const selectedLayerNumbers = state.ampStory.present.selectedLayerNumbers;
  const numbersCopy = selectedLayerNumbers?.slice();

  if (shouldPush && numbersCopy) {
    let combinedNumbers = null;
    if (numbersCopy.includes(position)) {
      numbersCopy.splice(numbersCopy.indexOf(position), 1);
    } else {
      combinedNumbers = [...numbersCopy, position];
    }
    batch(() => {
      dispatch(setSelectedLayerNumbers(combinedNumbers ?? numbersCopy));
      if (!combinedNumbers && numbersCopy.length === 1) {
        dispatch(setActiveLayerPosition(numbersCopy[0]));
      }
    });
  } else {
    dispatch(setSelectedLayerNumbers([position]));
  }
};

export const updateActiveSlide = (updatedSlide) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition ?? -1;

  batch(() => {
    dispatch(
      updateActiveSlideInStore({
        slide: updatedSlide,
        position: activeSlidePosition,
      }),
    );
    dispatch(incrementStoryChangedCount());
  });
};

const updateActiveSlideDebounced = debounce(
  (dispatch, updatedSlide) => dispatch(updateActiveSlide(updatedSlide)),
  300,
  { leading: false, trailing: true },
);

export const updateActiveSlideDebouncedAction = (updatedSlide) => (dispatch) => {
  updateActiveSlideDebounced(dispatch, updatedSlide);
};

// TODO
// Text layer in group actions check (UNDO / REDO)

export const updateActiveLayer = (updatedLayer) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition ?? -1;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition ?? -1;
  const activeLayer = state.ampStory.present.cuts[activeSlidePosition]?.layers?.[activeLayerPosition];
  const currentEditorStateDiff = getObjectDiff(
    activeLayer?.settings?.editorState?.toJS(),
    updatedLayer?.settings?.editorState?.toJS(),
  );

  batch(() => {
    if (
      typeof activeLayer === 'object' &&
      activeLayer?.type === layerTypes.HTML &&
      updatedLayer?.type === layerTypes.HTML &&
      !getIsEditorStateChangeEssential(currentEditorStateDiff)
    ) {
      dispatch(
        filteredUpdateActiveLayerInStore({
          layer: updatedLayer,
          activeSlidePosition,
          position: updatedLayer?.position,
        }),
      );
    } else {
      dispatch(
        updateActiveLayerInStore({
          layer: updatedLayer,
          activeSlidePosition,
          position: updatedLayer?.position,
        }),
      );
    }
    dispatch(incrementStoryChangedCount(true));
  });
};

const updateActiveLayerDebounced = debounce(
  (dispatch, updatedLayer) => {
    dispatch(updateActiveLayer(updatedLayer));
  },
  75,
  { leading: true, trailing: true },
);

export const updateActiveLayerDebouncedAction = (updatedLayer) => (dispatch) => {
  updateActiveLayerDebounced(dispatch, updatedLayer);
};

export const replaceMedia = (media) => (dispatch, getState) => {
  const state = getState();
  const story = state.ampStory.present;
  const selectedChildLayer = state.groupLayerHelper.selectedChildLayer;
  const activeSlidePosition = story.activeSlidePosition;
  const activeLayerPosition = story.activeLayerPosition;
  const layer = story.cuts[activeSlidePosition ?? -1]?.layers[activeLayerPosition ?? -1];
  const activeLayer = selectedChildLayer ?? layer;
  const initialWidth = +Number(story.initialWidth).toFixed(2);
  const initialHeight = +Number(story.initialHeight).toFixed(2);
  const isFullscreen = activeLayer.settings.layerSettings.fullscreen;

  if (activeLayer && (activeLayer?.type === layerTypes.IMAGE || activeLayer?.type === layerTypes.VIDEO)) {
    const isNewMediaVideo = media?.__t === 'Video';

    const generatedData = generateReplaceMediaDimensions(
      activeLayer,
      { width: media.width, height: media.height },
      { width: initialWidth, height: initialHeight },
    );
    const mediaProportion = media.width / media.height;
    let fullScreenHeight = initialHeight;
    let fullScreenWidth = fullScreenHeight * mediaProportion;
    if (isFullscreen && fullScreenWidth < initialWidth) {
      const rescaleProportion = initialWidth / fullScreenWidth;
      fullScreenHeight = +(rescaleProportion * fullScreenHeight).toFixed(2);
      fullScreenWidth = +(rescaleProportion * fullScreenWidth).toFixed(2);
    }
    const fullScreenOffsetX = (initialWidth - fullScreenWidth) / 2;
    const fullScreenOffsetY = (initialHeight - fullScreenHeight) / 2;
    const { cropSettings, ...restSettings } = activeLayer.settings;

    const modifiedLayer = {
      ...activeLayer,
      temporaryId: media.temporaryId ?? media.id,
      type: isNewMediaVideo ? layerTypes.VIDEO : layerTypes.IMAGE,
      title: activeLayer?.isTitleDirty ? activeLayer?.title : media?.originalName ?? 'Image Layer',
      settings: {
        ...restSettings,
        layerSettings: {
          ...activeLayer.settings.layerSettings,
          ...(isFullscreen && {
            width: fullScreenWidth,
            height: fullScreenHeight,
          }),
          originalWidth: media.width,
          originalHeight: media.height,
        },
        ...(isFullscreen && {
          generalSettings: {
            ...restSettings.generalSettings,
            offsetX: fullScreenOffsetX,
            offsetY: fullScreenOffsetY,
          },
        }),
        ...(generatedData?.cropSettings && { cropSettings: generatedData.cropSettings }),
      },
      content: {
        ...activeLayer.content,
        value: media.url,
        image: {
          id: isNewMediaVideo ? media?.thumbnail?.id : media?.id,
          url: isNewMediaVideo ? media?.thumbnail?.url : media?.url,
          name: isNewMediaVideo ? media?.thumbnail?.name : media?.name,
        },
        video: {
          id: isNewMediaVideo ? media?.id : '',
          url: isNewMediaVideo ? media?.url : '',
          name: isNewMediaVideo ? media?.name : '',
        },
      },
    };

    const callActions = (duration) => {
      if (!isNil(selectedChildLayer)) {
        const childLayers = layer.childLayers.map((childLayer) => {
          if (childLayer._id === selectedChildLayer._id) {
            return modifiedLayer;
          }

          return childLayer;
        });

        batch(() => {
          dispatch(
            updateActiveLayerInStore({
              layer: { ...layer, childLayers },
              activeSlidePosition,
              position: activeLayerPosition,
            }),
          );
          dispatch(incrementStoryChangedCount());
          if (typeof duration === 'number') {
            dispatch(
              setActiveSlideProps({
                field: 'duration',
                value: limitDuration(duration),
              }),
            );
          }
        });
        return;
      }

      batch(() => {
        dispatch(
          updateActiveLayerInStore({ layer: modifiedLayer, activeSlidePosition, position: activeLayerPosition }),
        );
        dispatch(incrementStoryChangedCount());
        if (typeof duration === 'number') {
          dispatch(
            setActiveSlideProps({
              field: 'duration',
              value: limitDuration(duration),
            }),
          );
        }
      });
    };

    if (isNewMediaVideo && typeof media?.duration === 'undefined') {
      onGetVideoDuration({ mediaUrl: media?.url, shouldLimitDuration: true, callback: callActions });
    } else {
      callActions(media?.duration);
    }
  }
};

export const createNewLayer = ({
  type,
  shape,
  media,
  temporaryId,
  colorObject,
  value,
  presetFontStyles,
  googleFonts,
  workspaceFonts,
  coordinates,
}) => async (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeSlide = state.ampStory.present.cuts[activeSlidePosition ?? -1];
  const zoomPercent = state.helpers.zoomPercent;
  const clientWidth = +state.ampStory.present.initialWidth;
  const clientHeight = +state.ampStory.present.initialHeight;
  const isInLimit = checkLayersLimit(activeSlide?.layers);
  const storyGoogleFonts = state.ampStory.present.googleFonts;
  const storyUploadedFonts = state.ampStory.present.fonts;

  if (activeSlide && isInLimit) {
    const cta = activeSlide.layers.find(
      (layer) => layer.type === layerTypes.CTA_LINK || layer.type === layerTypes.OUTLINK,
    );
    const position = cta ? activeSlide.layers.length - 1 : activeSlide.layers.length;
    const { videoCutLimited } = checkVideoCtaCutsLimited(activeSlide);

    const isLayerIdExist = activeSlide.layers.some((layer) => layer._id === media?.id);
    const id = isLayerIdExist ? generateId() : temporaryId ?? generateId();

    let newLayer = defaultEditorModel(
      id,
      state.ampStory.present.author,
      type === layerTypes.STICKERS ? layerTypes.GIFS : type,
      setLayerName(type),
      presetFontStyles,
    );

    const enhancedNewLayer = await setDataToNewLayer({
      type,
      shape,
      media,
      zoomPercent,
      clientWidth,
      clientHeight,
      layer: newLayer,
      colorObject,
      value,
      coordinates,
    });

    newLayer = {
      ...newLayer,
      ...enhancedNewLayer,
      position,
    };

    const callActions = (duration) => {
      batch(() => {
        batchGroupBy.start();
        if (type === layerTypes.VIDEO && typeof duration === 'number') {
          dispatch(
            setActiveSlideProps({
              field: 'duration',
              value: limitDuration(duration),
            }),
          );
        }
        dispatch(setActiveLayerPosition(position));
        dispatch(selectMultipleLayer(position, false));
        dispatch(addNewLayer({ layer: newLayer, activeSlidePosition }));
        dispatch(setNewLayerPosition(position));
        dispatch(incrementStoryChangedCount(true));
        if (type === layerTypes.CTA_LINK || cta || type === layerTypes.OUTLINK) {
          dispatch(toggleCtaCutLimited(true));
        }
        dispatch(toggleVideoCutLimited(videoCutLimited));
        dispatch(setSizeProportion());
        batchGroupBy.end();
      });
    };

    if (type === layerTypes.VIDEO && typeof media?.duration === 'undefined') {
      onGetVideoDuration({ mediaUrl: media?.url, shouldLimitDuration: true, callback: callActions });
    } else {
      callActions(media?.duration);
    }

    if (type === layerTypes.HTML || type === layerTypes.TEXT) {
      const fontFamily = presetFontStyles?.fontFamily;
      const existingFont = [...storyUploadedFonts, ...storyGoogleFonts].find(
        (storyFont) => storyFont.family === fontFamily,
      );
      let selectedFont = existingFont;
      if (!existingFont) {
        selectedFont = [...(workspaceFonts ?? []), ...(googleFonts ?? [])].find(
          (storyFont) => storyFont.family === fontFamily,
        );

        loadFontFamily(selectedFont);
        if (selectedFont?.fontType === FONT_TYPE.GOOGLE_FONT) {
          dispatch(
            addGoogleFont({
              ...selectedFont,
              style: 'normal',
            }),
          );
        } else if (selectedFont?.fontType === FONT_TYPE.USER_FONT) {
          dispatch(
            addStoryFont({
              ...selectedFont,
              style: 'normal',
            }),
          );
        }
      }
    }
  }
};

export const createNewGroup = () => async (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const selectedLayersIds = state.ampStory.present.selectedLayerNumbers;

  const selectedLayers = state.ampStory.present.cuts[
    activeSlidePosition
  ].layers.filter(({ position }) => selectedLayersIds.includes(position));

  if (
    !selectedLayers ||
    selectedLayers.length < 2 ||
    selectedLayers.some(
      (sl) => sl.type === layerTypes.GROUP || sl.type === layerTypes.OUTLINK || sl.type === layerTypes.CTA_LINK,
    )
  ) {
    return;
  }

  const layersIds = selectedLayers.map(({ _id }) => _id);
  const group = buildGroup(selectedLayers);

  batch(() => {
    dispatch(setSelectedLayerNumbers([group.position]));
    dispatch(createGroup({ group, layersIds, activeSlidePosition }));
  });

  batch(() => {
    dispatch(selectLayer(group.position));
    dispatch(toggleGroupLayer(true));
    dispatch(dispatch(incrementStoryChangedCount(true)));
  });
};

export const unGroup = () => async (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;

  const group = state.ampStory.present.cuts[activeSlidePosition].layers[activeLayerPosition];

  if (group.settings.generalSettings.locked) {
    return;
  }

  dispatch(setUngroup({ group, activeSlidePosition }));
  dispatch(dispatch(incrementStoryChangedCount(true)));
};

export const setActiveLayerProps = ({ field, value }) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;

  batch(() => {
    dispatch(
      setActiveLayerPropsInStore({
        field,
        value,
        activeSlidePosition,
        activeLayerPosition,
      }),
    );
    dispatch(incrementStoryChangedCount(true));
  });
};

export const setActiveLayerPropsArray = (inputArray) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;

  batch(() => {
    dispatch(
      setActiveLayerPropsArrayInStore({
        inputArray,
        activeSlidePosition,
        activeLayerPosition,
      }),
    );
    dispatch(incrementStoryChangedCount(true));
  });
};

export const setActiveLayerSettingsType = (input) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;

  batch(() => {
    dispatch(
      setActiveLayerSettingsTypeInStore({
        input,
        activeLayerPosition,
        activeSlidePosition,
      }),
    );
    dispatch(incrementStoryChangedCount());
  });
};

export const changeCtaImage = (media) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;
  const activeLayer = state.ampStory.present?.cuts?.[activeSlidePosition ?? -1]?.layers?.[activeLayerPosition ?? -1];

  if (activeLayer?.type === layerTypes.OUTLINK) {
    batch(() => {
      dispatch(
        setCTAImage({
          temporaryId: media?.temporaryId,
          imageId: media?.id ?? '',
          imageUrl: media?.url ?? '',
          imageName: media?.name ?? '',
        }),
      );
      dispatch(incrementStoryChangedCount());
    });
  }
};

export const healGradientLayer = (layerId, gradientInput) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const layer = state.ampStory.present?.cuts?.[activeSlidePosition ?? -1]?.layers?.find(
    (layer) => layer._id === layerId,
  );

  if (layer && gradientInput) {
    dispatch(
      setActiveLayerPropsInStore({
        field: 'content.gradient.input',
        value: gradientInput,
        activeLayerPosition: layer.position,
        activeSlidePosition,
      }),
    );
  }
};

export const deleteGradientLayer = (layerId) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;

  const layer = state.ampStory.present?.cuts?.[activeSlidePosition ?? -1]?.layers?.find(
    (layer) => layer._id === layerId,
  );

  if (layer) {
    dispatch(
      deleteLayer({
        slidePosition: activeSlidePosition,
        layerPositions: [layer.position],
      }),
    );
  }
};

// Selectors
export const selectActiveSlide = createSelector(
  (state) => state.ampStory.present.cuts,
  (state) => state.ampStory.present.activeSlidePosition,
  (slides, activeSlidePosition) => slides?.[activeSlidePosition ?? -1],
);
export const selectActiveLayer = createSelector(
  (state) => state.ampStory.present.cuts,
  (state) => state.ampStory.present.activeSlidePosition,
  (state) => state.ampStory.present.activeLayerPosition,
  (slides, activeSlidePosition, activeLayerPosition) =>
    slides?.[activeSlidePosition ?? -1]?.layers?.[activeLayerPosition ?? -1],
);
export const selectSelectedLayers = createSelector(
  (state) => state.ampStory.present.cuts,
  (state) => state.ampStory.present.activeSlidePosition,
  (state) => state.ampStory.present.selectedLayerNumbers,
  (slides, activeSlidePosition, selectedLayerNumbers) =>
    slides?.[activeSlidePosition ?? -1]?.layers?.filter((layer) =>
      selectedLayerNumbers?.includes(layer.position),
    ),
);
export const selectSingleUseLayer = createSelector(
  (state) => state.ampStory.present.cuts,
  (state) => state.ampStory.present.activeSlidePosition,
  (slides, activeSlidePosition) =>
    slides?.[activeSlidePosition ?? -1]?.layers?.find((layer) => SINGLE_USE_LAYERS.includes(layer.type)),
);

export const makeSelectPropFromActiveSlide = () =>
  createSelector(
    selectActiveSlide,
    (_, field) => field,
    (activeSlide, field) => get(activeSlide, field),
  );

export const makeSelectPropFromActiveLayer = () =>
  createSelector(
    selectActiveLayer,
    (_, field) => field,
    (activeLayer, field) => get(activeLayer, field),
  );

export const makeSelectCurrentLayerSnappedLayers = () =>
  createSelector(
    (state) => state.ampStory.present.snappedLayers,
    (_, layerId) => layerId,
    (snappedLayers, layerId) => get(snappedLayers, layerId),
  );

export const makeSelectCurrentLayerSnappedToLayers = () =>
  createSelector(
    (state) => state.ampStory.present.snappedLayers,
    (_, layerId) => layerId,
    (snappedLayers, layerId) =>
      Object.keys(snappedLayers || {}).filter(
        (key) => key !== layerId && snappedLayers[key].find((l) => l === layerId),
      ),
  );

export const selectHasAutoAdvancedOnAnySlide = createSelector(
  (state) => state.ampStory.present.cuts,
  (slides) => slides.some((slide) => slide?.isAutoAdvancedDisabled),
);
