import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch, useAppSelector, useDidUpdateEffect } from 'hooks';
import produce from 'immer';
import { isEqual } from 'lodash';
import debounce from 'lodash/debounce';
import isNil from 'lodash/isNil';
import isNull from 'lodash/isNull';
import isUndefined from 'lodash/isUndefined';
import set from 'lodash/set';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { batch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Selecto from 'react-selecto';
import { CSSTransition } from 'react-transition-group';
import { ActionCreators } from 'redux-undo';
import {
  setMultiOffsetX,
  setMultiOffsetY,
  toggleGroupLayer
} from 'appredux/features/editor/helpers/groupLayerHelperSlice';
import { useGetTeamQuery, useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import StoryInaccessibleModal from 'components/teams/shared/story-inaccessible-modal';
import {
  REDUX_UNDO_ACTION_TYPES,
  SCROLL_DIRECTION,
  STORY_LOCK_MODE_TIME,
  VIDEO_PROCESSING_STATUS_DONE,
  VIDEO_PROCESSING_STATUS_REJECTED,
  ZOOM_TYPE
} from 'config/constants';
import { layerTypes } from 'interfaces/layer-types';
import {
  adjustStoryAfterCreation,
  clearAmpStory,
  createNewGroup,
  loadStory,
  pushToHistory,
  removeActiveLayerPosition,
  removeActiveSlidePosition,
  saveAmpStoryChanges,
  selectActiveLayer,
  selectActiveSlide,
  selectMultipleLayer,
  selectSelectedLayers,
  setActiveLayerPosition,
  setActiveSlidePropsDebouncedAction,
  setSelectedLayerNumbers,
  unGroup,
  updateActiveLayerDebouncedAction,
  updateStoryConfigDebounced,
  updateStoryConfigDebouncedAction
} from 'appredux/features/amp-story/ampStorySlice';
import {
  copyLayer,
  cutLayer,
  deleteLayerAction,
  deselectLayer,
  deselectLayerDebouncedAction,
  duplicateLayerAction,
  incrementStoryChangedCount,
  pasteLayer,
  resetHelpersStore,
  selectLayer,
  setCroppedLayer,
  setFrameSizeAndZoomPercent,
  setIsEditorContextMenuOpen,
  setSelectedLayersChangeCounter,
  stopAnimation,
  toggleEditorLayerMenuVisibility,
  toggleStorySavedNotificationVisibility,
  toggleTemplateSavedNotificationVisibility
} from 'appredux/features/editor/helpers/helpersSlice';
import {
  clearVideoProcessing,
  fetchVideoProcessing,
  finishVideoProcessing
} from 'appredux/features/video-processing/videoProcessingSlice';
import { preventDefault, stopPropagation } from 'utils/common';
import {
  getAllZoomPercentages,
  getAmpStoryData,
  getNewZoomPercentage,
  intersectingRect
} from 'utils/editorUtils';
import { editorWrapperResizeObserver } from 'utils/resizeObservers';
import timeDiffFromNow from 'utils/timeDiffFromNow';
import EditorBottomBar from '../editor-bottom-bar';
import EditorContextMenu from '../editor-context-menu/editor-context-menu';
import EditorModal from '../editor-modals/editor-modal';
import EditorReplaceMediaModal from '../editor-modals/editor-replace-media-modal/editor-replace-media-modal';
import EditorSavePrompt from '../editor-save-prompt';
import EditorSidebar from '../editor-sidebar/editor-sidebar';
import EditorVideoHelper from '../editor-video-helper';
import ExportModal from '../export-modal/export-modal';
import SocialMediaSuccessModal from '../export-modal/social-media-success-modal';
import SuccessfullyPublishedModal from '../export-modal/successfully-published-modal';
import IframePreview from '../iframe-preview';
import LayerMenu from '../layer-menu';
import { Notification } from 'components/shared';
import SafeArea from '../safe-area';
import SplitVideoModal from '../split-video/split-video-modal';
import StoryEditor from '../story-editor';
import TemplateModal from '../templates/template-modal/template-modal';
import EditorScrollbar from './../shared/editor-scrollbar';
import Styled from './editor-styled';

const MULTISELECT_BANNED_LAYER = [layerTypes.CTA_LINK, layerTypes.OUTLINK];
const SELECTO_ALLOWED_IDS = ['editor', 'editor-placeholder', 'editor-inner-placeholder'];
let SELECTO_CACHE = {};
let SELECTO_CURRENT_TARGETS = [];
let SELECTO_LAYERS_CACHE = {};

const Editor = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();

  const historyParams = useParams();
  const menuRef = useRef(null);
  const [keepRatio, setKeepRatio] = useState(true);
  const containerRef = useRef();
  const [containerRefSet, setContainerRefSet] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ top: `0px`, left: `0px` });
  const ctaLayerRef = useRef(null);
  const [videoProcessingInterval, setVideoProcessingInterval] = useState(null);
  const storyId = useAppSelector((state) => state.ampStory.present._id);
  const storyChangedCount = useAppSelector((state) => state.helpers.storyChangedCount);
  const areAnimationsRunning = useAppSelector((state) => state.helpers.areAnimationsRunning);
  const isMediaUploading = useAppSelector((state) => state.helpers.isMediaUploading);
  const selectedLayerNumbers = useAppSelector((state) => state.ampStory.present.selectedLayerNumbers);

  const ampStoryFuture = useAppSelector((state) => state.ampStory.future);
  const ampStoryPast = useAppSelector((state) => state.ampStory.past);
  const ampStory = useAppSelector((state) => state.ampStory.present);

  const activeSlide = useAppSelector(selectActiveSlide);
  const activeLayer = useAppSelector(selectActiveLayer);

  const copiedLayers = useAppSelector((state) => state.helpers.copiedLayers);
  const showFullScreenIEditor = useAppSelector((state) => state.helpers.showFullScreenIEditor);
  const activeSlidePosition = useAppSelector((state) => state.ampStory.present.activeSlidePosition);

  const isSaveTemplateModalOpen = useAppSelector((state) => state.templates.isSaveTemplateModalOpen);
  const showSplitVideoModal = useAppSelector((state) => state.media.showSplitVideoModal);
  const isExportModalOpen = useAppSelector((state) => state.export.isExportModalOpen);
  const isPublishedModalOpen = useAppSelector((state) => state.export.isPublishedModalOpen);
  const isSocialMediaSuccessModalOpen = useAppSelector((state) => state.export.isSocialMediaSuccessModalOpen);
  const isStorySavedNotificationVisible = useAppSelector((state) => state.helpers.isStorySavedNotificationVisible);
  const isTemplateSavedNotificationVisible = useAppSelector(
    (state) => state.helpers.isTemplateSavedNotificationVisible,
  );
  const videoProcessing = useAppSelector((state) => state.videoProcessing.processingRecord);
  const zoomPercent = useAppSelector((state) => state.helpers.zoomPercent);
  const fitZoomPercent = useAppSelector((state) => state.helpers.fitZoomPercent);
  const croppedLayer = useAppSelector((state) => state.helpers.croppedLayer);
  const selectedLayers = useAppSelector(selectSelectedLayers);
  const selectedLayersChangeCounter = useAppSelector((state) => state.helpers.selectedLayersChangeCounter);

  const allZoomPercentages = useMemo(() => {
    return getAllZoomPercentages(fitZoomPercent);
  }, [fitZoomPercent]);

  const editorPlaceholderRef = useRef(null);
  const editorContainerRef = useRef(null);

  const verticalScrollBarRatio = editorPlaceholderRef.current
    ? editorPlaceholderRef.current.clientHeight / (editorPlaceholderRef.current.clientHeight - 72)
    : 1;
  const horizontalScrollBarRatio = editorPlaceholderRef.current
    ? editorPlaceholderRef.current.clientWidth / (editorPlaceholderRef.current.clientWidth - 48)
    : 1;
  const [hasScrollbar, setHasScrollbar] = useState({ horizontal: false, vertical: false });
  const [activeSlideBgColor, setActiveSlideBgColor] = useState(activeSlide?.backgroundColor);
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const editorWidth = useAppSelector((state) => state.ampStory.present.initialWidth);
  const editorHeight = useAppSelector((state) => state.ampStory.present.initialHeight);
  const [currentActiveLayer, setCurrentActiveLayer] = useState(activeLayer);
  const activeLayerPosition = useAppSelector((state) => state.ampStory.present.activeLayerPosition);
  const [currentLayerPosition, setCurrentLayerPosition] = useState(0);
  const isEditorContextMenuOpen = useAppSelector((state) => state.helpers.isEditorContextMenuOpen);
  const isEditorLayerMenuVisible = useAppSelector((state) => state.helpers.isEditorLayerMenuVisible);
  const showReplaceModal = useAppSelector((state) => state.helpers.showReplaceModal);
  const isTextLayerInEditMode = useAppSelector((state) => state.groupLayerHelper.isTextLayerInEditMode);
  const [containerBounds, setContainerBounds] = useState(null);
  const [isInaccesibleModalOpen, setIsInaccesibleModalOpen] = useState(false);
  const isTeamStory = useMemo(() => ampStory?.teamId !== null, [ampStory?.teamId]);

  const { teamId } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      teamId: workspace?.teams?.[0]?._id,
    }),
  });

  const { lastUserToModify } = useGetTeamQuery(teamId ?? skipToken, {
    selectFromResult: ({ data: team }) => ({
      lastUserToModify: team?.users?.find((user) => user._id === ampStory?.modifiedBy),
    }),
  });

  const timeDiff = useMemo(() => timeDiffFromNow(ampStory?.storyUpdatedAt || ampStory?.updatedAt || ''), [
    ampStory?.storyUpdatedAt,
    ampStory?.updatedAt,
  ]);
  const isStoryLockedIgnored = useAppSelector((state) => state.helpers.isStoryLockedIgnored);
  const currentUserId = useAppSelector((state) => state.auth.user?._id);
  const isSameUser = useMemo(() => ampStory?.modifiedBy === currentUserId, [currentUserId, ampStory?.modifiedBy]);

  const layers = useMemo(() => {
    if (!activeSlide) {
      return [];
    }

    return activeSlide?.layers;
  }, [activeSlide]);

  const [shiftHeld, setShiftHeld] = useState(false);

  useEffect(() => {
    if (zoomPercent && editorPlaceholderRef.current && editorHeight) {
      setHasScrollbar({
        horizontal: editorPlaceholderRef.current.scrollWidth > editorPlaceholderRef.current.clientWidth,
        vertical: editorPlaceholderRef.current.scrollHeight > editorPlaceholderRef.current.clientHeight,
      });
    }
  }, [zoomPercent, editorHeight]);

  useDidUpdateEffect(() => {
    if (activeSlide?.backgroundColor !== activeSlideBgColor) {
      dispatch(setActiveSlidePropsDebouncedAction({ field: 'backgroundColor', value: activeSlideBgColor }));
    }
  }, [activeSlideBgColor, dispatch]);

  const debouncedShowEditorLayerMenu = useCallback(
    debounce(() => {
      if (!isEditorLayerMenuVisible) {
        dispatch(toggleEditorLayerMenuVisibility(true));
      }
    }, 200),
    [isEditorLayerMenuVisible],
  );

  useEffect(() => {
    setActiveSlideBgColor(activeSlide?.backgroundColor);
  }, [activeLayer, activeSlide?.backgroundColor]);

  // MANAGE SINGLE LAYER CHANGE
  useEffect(() => {
    setCurrentLayerPosition(currentActiveLayer?.position);
  }, [currentActiveLayer]);

  useEffect(() => {
    setCurrentActiveLayer(activeLayer);
  }, [activeLayer]);

  useDidUpdateEffect(() => {
    debouncedShowEditorLayerMenu();

    if (activeLayer && JSON.stringify(activeLayer) !== JSON.stringify(currentActiveLayer)) {
      dispatch(updateActiveLayerDebouncedAction(currentActiveLayer));
    }
  }, [currentActiveLayer, dispatch]);

  // END: MANAGE SINGLE LAYER CHANGE

  // MANAGE SELECTED LAYERS UPDATE
  const debouncedUpdateSlideLayers = debounce(
    () => {
      batch(() => {
        dispatch(pushToHistory());
        dispatch(incrementStoryChangedCount());
        dispatch(setSelectedLayersChangeCounter(0));
      });
    },
    75,
    { leading: true, trailing: true },
  );

  useEffect(() => {
    if (selectedLayers && selectedLayers?.length > 1 && selectedLayersChangeCounter) {
      debouncedUpdateSlideLayers();
    }
  }, [debouncedUpdateSlideLayers, selectedLayers, selectedLayersChangeCounter]);

  // END: MANAGE SELECTED LAYERS UPDATE

  useEffect(() => {
    if (editorContainerRef?.current) {
      editorWrapperResizeObserver.observe(editorContainerRef.current);
    }

    return () => {
      if (editorContainerRef?.current) {
        editorWrapperResizeObserver.unobserve(editorContainerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    /** Check if videoProcessing is initialized */
    if (!videoProcessing) {
      /** Clear interval if is setted. Just in case */
      videoProcessingInterval && clearInterval(videoProcessingInterval);
      return;
    }
    /** Clear interval on each cycle */
    if (videoProcessingInterval) {
      clearInterval(videoProcessingInterval);
      setVideoProcessingInterval(null);
    }

    /** Check videoProcessing status, if is REJECTED, or DONE, stop requests */
    if (videoProcessing?.status === VIDEO_PROCESSING_STATUS_DONE) {
      videoProcessingInterval && clearInterval(videoProcessingInterval);
      setVideoProcessingInterval(null);
      dispatch(finishVideoProcessing());
      return;
    }
    if (videoProcessing?.status === VIDEO_PROCESSING_STATUS_REJECTED) {
      videoProcessingInterval && clearInterval(videoProcessingInterval);
      setVideoProcessingInterval(null);
      dispatch(finishVideoProcessing());
      return;
    }

    const processingInterval = setInterval(() => {
      dispatch(fetchVideoProcessing());
    }, 2000);

    setVideoProcessingInterval(processingInterval);
  }, [dispatch, videoProcessing]);

  useEffect(() => {
    /** Clear interval in case of Unmount */
    return () => {
      if (videoProcessingInterval) {
        clearInterval(videoProcessingInterval);
      }
      /** Clear video processing state */
      dispatch(clearVideoProcessing());
      dispatch(resetHelpersStore());
    };
  }, []);

  useEffect(() => {
    if (storyId && historyParams?.id) {
      dispatch(adjustStoryAfterCreation());
    }
  }, []);

  useEffect(() => {
    if (!storyId && historyParams?.id) {
      dispatch(loadStory({ storyId: historyParams.id, history }, true));
    }
  }, [dispatch, history, historyParams.id, storyId]);

  useEffect(() => {
    return () => {
      setTimeout(() => {
        dispatch(clearAmpStory());
      });
    };
  }, [dispatch]);

  useEffect(() => {
    if (isStorySavedNotificationVisible) {
      const timeout = setTimeout(() => {
        dispatch(toggleStorySavedNotificationVisibility(false));
      }, 3000);

      return () => {
        dispatch(toggleStorySavedNotificationVisibility(false));
        clearTimeout(timeout);
      };
    }
  }, [dispatch, isStorySavedNotificationVisible]);

  useEffect(() => {
    if (isTemplateSavedNotificationVisible) {
      const timeout = setTimeout(() => {
        dispatch(toggleTemplateSavedNotificationVisibility(false));
      }, 3000);

      return () => {
        dispatch(toggleTemplateSavedNotificationVisibility(false));
        clearTimeout(timeout);
      };
    }
  }, [dispatch, isTemplateSavedNotificationVisible]);

  useEffect(() => {
    let isMounted = true;
    if (!isNull(storyChangedCount) && storyChangedCount > 0 && !isMediaUploading && isMounted) {
      dispatch(updateStoryConfigDebouncedAction());
    }
    return () => {
      isMounted = false;
    };
  }, [dispatch, isMediaUploading, storyChangedCount]);

  useEffect(() => {
    return () => {
      updateStoryConfigDebounced.cancel();
    };
  }, [dispatch]);

  const onEditorWrapperClick = (e) => {
    e.stopPropagation();

    batch(() => {
      if (areAnimationsRunning) {
        dispatch(stopAnimation());
        return;
      }
      if (!isNil(currentLayerPosition)) {
        dispatch(deselectLayerDebouncedAction());
      }
      if (selectedLayerNumbers) {
        dispatch(setSelectedLayerNumbers(null));
      }
      dispatch(setIsEditorContextMenuOpen(false));
    });
  };

  const handleNavigate = (path) => history.push(path);
  const handleConfirm = () => dispatch(removeActiveSlidePosition());

  const changeSlideLayer = useCallback(
    ({ layer, field, value }) => {
      const nextState = produce(layer ?? currentActiveLayer, (draftState) => {
        set(draftState, field, value);
      });

      return nextState;
    },
    [currentActiveLayer],
  );

  const changeActiveLayer = useCallback(
    (layer) => {
      if (activeLayer) {
        setCurrentActiveLayer((activeLayer) => {
          return {
            ...activeLayer,
            ...layer,
          };
        });
        batch(() => {
          if (croppedLayer?._id === layer?._id) {
            dispatch(setCroppedLayer({ ...activeLayer, ...layer }));
          }
          if (isEditorLayerMenuVisible) {
            dispatch(toggleEditorLayerMenuVisibility(false));
          }
        });
      }
    },
    [activeLayer, croppedLayer?._id, dispatch, isEditorLayerMenuVisible],
  );

  const handleBatchLayerChange = useCallback(
    (values) => {
      let updatedLayer = { ...currentActiveLayer };
      values.forEach(({ field, value }) => {
        updatedLayer = changeSlideLayer({
          layer: updatedLayer,
          field,
          value,
        });
      });

      changeActiveLayer(updatedLayer);
    },
    [changeActiveLayer, changeSlideLayer, currentActiveLayer],
  );

  const handleLayerChange = useCallback(
    ({ field, value }) => {
      let updatedLayer = { ...currentActiveLayer };
      updatedLayer = changeSlideLayer({
        field,
        value,
      });

      changeActiveLayer(updatedLayer);
    },
    [changeActiveLayer, changeSlideLayer, currentActiveLayer],
  );

  const handleSlideBackgroundColorChange = (backgroundColor) => setActiveSlideBgColor(backgroundColor);

  const handleLayerClick = useCallback(
    (position) => {
      const selectedLayer = activeSlide.layers[position];
      const hasCta = selectedLayers?.find(
        (layer) => layer?.type === layerTypes.CTA_LINK || layer?.type === layerTypes.OUTLINK,
      );

      // Selecting locked layer or selected layer is locked
      if (
        shiftHeld &&
        activeLayer &&
        selectedLayer &&
        selectedLayer._id !== activeLayer._id &&
        (selectedLayer.settings.generalSettings.locked || activeLayer.settings.generalSettings.locked)
      ) {
        return;
      }

      // We have group and we want to select locked layer
      if (
        shiftHeld &&
        selectedLayer &&
        selectedLayer.settings.generalSettings.locked &&
        selectedLayers &&
        selectedLayers?.length > 1
      ) {
        return;
      }

      if (
        shiftHeld &&
        selectedLayer?.type === layerTypes.GROUP &&
        selectedLayers?.length === 1 &&
        selectedLayer._id === selectedLayers?.[0]?._id
      ) {
        dispatch(deselectLayer());
        return;
      }

      if (
        shiftHeld &&
        selectedLayer?.type !== layerTypes.CTA_LINK &&
        selectedLayer?.type !== layerTypes.OUTLINK &&
        !hasCta &&
        !selectedLayer?.settings?.layerSettings?.fullscreen &&
        !activeLayer?.settings?.layerSettings?.fullscreen
      ) {
        batch(() => {
          if (activeLayer) {
            dispatch(deselectLayer());
          }
          if (!activeLayer && (selectedLayers?.length === 0 || !selectedLayers)) {
            dispatch(selectLayer(position));
          }
          dispatch(selectMultipleLayer(position, true));
        });
      } else {
        if (position === currentLayerPosition) {
          return;
        }
        batch(() => {
          setCurrentLayerPosition(position);
          dispatch(selectLayer(position));
          dispatch(selectMultipleLayer(position, false));
          if (selectedLayer?.type === layerTypes.GROUP) {
            dispatch(toggleGroupLayer(true));
          }
        });
      }
      const activeElement = document.activeElement;
      const inputs = ['input', 'select', 'button', 'textarea'];
      if (activeElement && inputs.indexOf(activeElement.tagName.toLowerCase()) !== -1) {
        (activeElement | HTMLButtonElement | HTMLSelectElement | HTMLTextAreaElement)?.blur();
      }
    },
    [activeLayer, activeSlide?.layers, currentLayerPosition, dispatch, selectedLayers, shiftHeld],
  );

  const handleEditorContainerClick = useCallback(
    (e) => {
      e.stopPropagation();

      if (e.target !== containerRef.current || isTextLayerInEditMode) {
        return;
      }

      batch(() => {
        if (!isNil(currentLayerPosition)) {
          dispatch(deselectLayerDebouncedAction());
        }
        if (selectedLayerNumbers) {
          dispatch(setSelectedLayerNumbers(null));
        }
        dispatch(setIsEditorContextMenuOpen(false));
      });
    },
    [currentLayerPosition, dispatch, isTextLayerInEditMode, selectedLayerNumbers],
  );

  const onCloseMenu = useCallback(() => dispatch(setIsEditorContextMenuOpen(false)), [dispatch]);

  const handleContextMenuOpen = useCallback(
    (event) => {
      event.preventDefault();

      let newTop = event.pageY;
      if (menuRef.current) {
        const totalHeight = event.pageY + menuRef.current?.clientHeight;
        newTop = totalHeight > window.innerHeight ? newTop - (totalHeight - window.innerHeight) : newTop;
      }

      setContextMenuPosition({ top: `${newTop}px`, left: `${event.pageX}px` });
      dispatch(setIsEditorContextMenuOpen(true));
    },
    [dispatch],
  );

  const handleContainerClick = useCallback(() => isEditorContextMenuOpen && onCloseMenu(), [
    isEditorContextMenuOpen,
    onCloseMenu,
  ]);

  const updateSelectedLayersPosition = useCallback(
    (x, y) => {
      if (x !== 0) {
        dispatch(setMultiOffsetX(x));
        return;
      }
      dispatch(setMultiOffsetY(y));
    },
    [dispatch],
  );

  const updateActiveLayerPosition = useCallback(
    (x, y) => {
      const positionX = Number(currentActiveLayer?.settings?.generalSettings?.offsetX);
      const positionY = Number(currentActiveLayer?.settings?.generalSettings?.offsetY);
      const type = x !== 0 ? 'offsetX' : 'offsetY';
      const value = x !== 0 ? Number(positionX) + x : Number(positionY) + y;

      handleLayerChange({ field: `settings.generalSettings.${type}`, value });
    },
    [
      currentActiveLayer?.settings?.generalSettings?.offsetX,
      currentActiveLayer?.settings?.generalSettings?.offsetY,
      handleLayerChange,
    ],
  );

  const onArrowKeyPress = useCallback(
    (x, y) => {
      if (isUndefined(activeLayerPosition)) {
        return updateSelectedLayersPosition(x, y);
      }

      return updateActiveLayerPosition(x, y);
    },
    [activeLayerPosition, updateActiveLayerPosition, updateSelectedLayersPosition],
  );

  const shortCutZoomAction = useCallback(
    (type) => {
      const newZoomPercent = getNewZoomPercentage(type, zoomPercent, allZoomPercentages);
      return newZoomPercent !== zoomPercent ? dispatch(setFrameSizeAndZoomPercent(newZoomPercent)) : null;
    },
    [dispatch, allZoomPercentages, zoomPercent],
  );

  const onKeyDown = useCallback(
    (event) => {
      const step = event.shiftKey ? 10 : 1;
      const withMetaKey = event.ctrlKey || event.metaKey;
      const isNotCta = !selectedLayers?.some(
        (layer) => layer?.type === layerTypes.CTA_LINK || layer?.type === layerTypes.OUTLINK,
      );
      const nodeName = document?.activeElement?.nodeName;

      if (nodeName !== 'INPUT' && nodeName !== 'TEXTAREA') {
        if (event.shiftKey) {
          setShiftHeld(true);
        }
        if (selectedLayers?.length) {
          preventDefault(event);
          if (event.shiftKey && activeLayer?.type === layerTypes.SHAPE) {
            setKeepRatio(false);
          }
          if (event.key === 'x' && withMetaKey) {
            return dispatch(cutLayer());
          }
          if (event.key === 'c' && withMetaKey) {
            return dispatch(copyLayer());
          }
          if (event.key === 'd' && withMetaKey && isNotCta) {
            return dispatch(duplicateLayerAction());
          }
          if (event.key === 'g' && event.shiftKey && activeLayer?.type === layerTypes.GROUP) {
            preventDefault(event);
            return dispatch(unGroup());
          }
          if (event.key === 'g' && !event.shiftKey && selectedLayers.length > 1) {
            preventDefault(event);
            return dispatch(createNewGroup());
          }
          if (event.key === 'Delete' || event.key === 'Backspace') {
            return dispatch(deleteLayerAction());
          }
          if (event.key === 'ArrowUp') {
            return onArrowKeyPress(0, -step);
          }
          if (event.key === 'ArrowDown') {
            return onArrowKeyPress(0, step);
          }
          if (event.key === 'ArrowLeft') {
            return onArrowKeyPress(-step, 0);
          }
          if (event.key === 'ArrowRight') {
            return onArrowKeyPress(step, 0);
          }
          if (
            (event.shiftKey && event.key === 'F5') ||
            (event.shiftKey && event.key === 'F5' && withMetaKey) ||
            (event.shiftKey && event.key === 'r' && withMetaKey)
          ) {
            return window.location.replace(window.location.href);
          }
          if ((event.key === 'r' && withMetaKey) || event.key === 'F5') {
            return window.location.reload();
          }
        }
        if (event.key === 'z' && withMetaKey && ampStoryPast?.length > 0) {
          preventDefault(event);

          const { jumps } = getAmpStoryData(ampStoryPast, REDUX_UNDO_ACTION_TYPES.UNDO, ampStory);
          dispatch(incrementStoryChangedCount());
          if (jumps > 1) {
            const optimizeJumps = jumps > ampStoryPast.length ? ampStoryPast.length : jumps;
            return dispatch(ActionCreators.jump(-1 * optimizeJumps));
          }
          return dispatch(ActionCreators.undo());
        }

        if (event.key === 'y' && withMetaKey && ampStoryFuture?.length > 0) {
          preventDefault(event);

          const { jumps } = getAmpStoryData(ampStoryFuture, REDUX_UNDO_ACTION_TYPES.REDO, ampStory);
          dispatch(incrementStoryChangedCount());
          if (jumps > 1) {
            const optimizeJumps = jumps > ampStoryFuture.length ? ampStoryFuture.length : jumps;
            return dispatch(ActionCreators.jump(optimizeJumps));
          }

          return dispatch(ActionCreators.redo());
        }
        if (event.key === 'v' && withMetaKey && copiedLayers?.layerCopies?.length) {
          preventDefault(event);
          return dispatch(pasteLayer());
        }
        if (event.key === 's' && withMetaKey && !isMediaUploading) {
          preventDefault(event);
          return dispatch(saveAmpStoryChanges(false, true));
        }
        if ((event.key === '=' && withMetaKey) || (event.key === '+' && withMetaKey)) {
          preventDefault(event);
          return shortCutZoomAction(ZOOM_TYPE.IN);
        }
        if (event.key === '-' && withMetaKey) {
          preventDefault(event);
          return shortCutZoomAction(ZOOM_TYPE.OUT);
        }
      }
    },
    [
      selectedLayers,
      activeLayer,
      ampStory,
      ampStoryFuture,
      ampStoryPast,
      dispatch,
      copiedLayers,
      onArrowKeyPress,
      shortCutZoomAction,
      isMediaUploading,
    ],
  );

  const onKeyUp = useCallback(
    (event) => {
      const nodeName = document?.activeElement?.nodeName;

      if (nodeName !== 'INPUT' && nodeName !== 'TEXTAREA') {
        setShiftHeld(false);

        if (
          activeLayer?.type === layerTypes.SHAPE &&
          activeLayer.settings.layerSettings.locked &&
          event.key === 'Shift'
        ) {
          setKeepRatio(true);
        }
      }
    },
    [activeLayer],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [onKeyUp, onKeyDown]);

  useEffect(() => {
    if (activeLayer) {
      setKeepRatio(activeLayer.settings.layerSettings.locked && activeLayer.type !== layerTypes.HTML);
    }
  }, [activeLayer]);

  useEffect(() => {
    if (isTeamStory && !isSameUser && !isStoryLockedIgnored && timeDiff) {
      setIsInaccesibleModalOpen(timeDiff < STORY_LOCK_MODE_TIME);
    }
  }, [isStoryLockedIgnored, isSameUser, isTeamStory, timeDiff]);

  const handleMultiselect = useCallback(
    (selectedLayersIds) => {
      if (!selectedLayersIds || selectedLayersIds?.length === 0) {
        batch(() => {
          dispatch(setSelectedLayerNumbers([]));
          dispatch(toggleGroupLayer(false));
          dispatch(removeActiveLayerPosition());
        });
        return;
      }

      const selectedLayers = [];
      selectedLayersIds.forEach((layerId) => {
        let id = layerId;
        if (id.startsWith('group')) {
          id = id.substr(6);
        }

        if (SELECTO_LAYERS_CACHE[id]) {
          selectedLayers.push(SELECTO_LAYERS_CACHE[id]);
          return;
        }

        const layer = layers.find((l) => l._id === id);

        if (layer.settings.generalSettings.locked || MULTISELECT_BANNED_LAYER.includes(layer.type)) {
          return;
        }

        SELECTO_LAYERS_CACHE[id] = layer;
        selectedLayers.push(layer);
      });

      batch(() => {
        if (selectedLayers && selectedLayers?.length === 1) {
          if (selectedLayers[0].type === layerTypes.GROUP) {
            dispatch(toggleGroupLayer(true));
          } else {
            dispatch(toggleGroupLayer(false));
          }
          dispatch(setActiveLayerPosition(selectedLayers[0].position));
          dispatch(setSelectedLayerNumbers(selectedLayers.map(({ position }) => position)));
        } else {
          dispatch(setSelectedLayerNumbers(selectedLayers.map(({ position }) => position)));
          dispatch(removeActiveLayerPosition());
        }
      });
    },
    [dispatch, layers],
  );

  const handleSelectoDragStart = useCallback((e) => {
    const target = e.inputEvent.target;
    if (Object.keys(SELECTO_CACHE)?.length > 0) {
      SELECTO_CACHE = {};
    }
    if (Object.keys(SELECTO_LAYERS_CACHE)?.length > 0) {
      SELECTO_LAYERS_CACHE = {};
    }
    if (!SELECTO_ALLOWED_IDS.includes(target?.id)) {
      e.stop();
    }
  }, []);

  const handleSelectoDrag = useCallback(
    (e) => {
      const { rect } = e;
      const intersectionBetweenSelectoAndEditor = intersectingRect(containerBounds, rect);

      if (intersectionBetweenSelectoAndEditor.width > 0 && intersectionBetweenSelectoAndEditor.height > 0) {
        const selectedTargets = new Set(
          e.currentTarget
            .getSelectedTargets()
            ?.filter((element) => {
              if (element?.dataset?.group && SELECTO_CACHE[element?.dataset?.group] !== undefined) {
                return SELECTO_CACHE[element?.dataset?.group];
              }

              if (SELECTO_CACHE[element.id] !== undefined) {
                return SELECTO_CACHE[element.id];
              }

              const elementBoundaries = element.getBoundingClientRect();
              const { height, width } = intersectingRect(elementBoundaries, intersectionBetweenSelectoAndEditor);

              if (height > 0 && width > 0) {
                if (element?.dataset?.group) {
                  SELECTO_CACHE[element?.dataset?.group] = true;
                  return true;
                }

                SELECTO_CACHE[element.id] = true;
                return true;
              }

              if (element?.dataset?.group) {
                SELECTO_CACHE[element?.dataset?.group] = false;
                return false;
              }

              SELECTO_CACHE[element.id] = false;
              return false;
            })
            ?.map((el) => {
              if (el.dataset.group !== undefined) {
                return el.dataset.group;
              }

              return el.id.toString().substring(6);
            }),
        );

        const targetsArray = [...selectedTargets];
        const areEqualArraysEqual = isEqual(SELECTO_CURRENT_TARGETS, targetsArray);

        if (!areEqualArraysEqual) {
          SELECTO_CURRENT_TARGETS = targetsArray;
          return handleMultiselect(targetsArray);
        }
      }
    },
    [containerBounds, handleMultiselect],
  );

  useEffect(() => {
    if (containerRefSet) {
      setContainerBounds(containerRef.current?.getBoundingClientRect());
    }
  }, [zoomPercent, containerRefSet]);

  return (
    <Styled.Container>
      {isExportModalOpen && <ExportModal modalTitle={'Publish as web story (AMP)'} />}
      {isPublishedModalOpen && <SuccessfullyPublishedModal />}
      {isSocialMediaSuccessModalOpen && <SocialMediaSuccessModal />}
      {isInaccesibleModalOpen && (
        <StoryInaccessibleModal
          user={lastUserToModify?.username || ''}
          onClose={() => setIsInaccesibleModalOpen(false)}
          isOpen={isInaccesibleModalOpen}
        />
      )}
      {showReplaceModal && <EditorReplaceMediaModal />}
      {isSaveTemplateModalOpen && <TemplateModal />}
      <CSSTransition in={showSplitVideoModal} timeout={120} classNames="fade" unmountOnExit>
        <SplitVideoModal />
      </CSSTransition>

      <Styled.EditorContainer ref={editorContainerRef}>
        <Styled.EditorWrapper
          alignContent={showFullScreenIEditor ? 'auto' : 'space-between'}
          onMouseDown={onEditorWrapperClick}
        >
          {(isStorySavedNotificationVisible || isTemplateSavedNotificationVisible) && (
            <Notification
              emphasisText={'Saved.'}
              text={`${isStorySavedNotificationVisible ? 'Your story' : 'The template'} has been saved successfully`}
              config={{
                position: 'absolute',
                top: '0',
                zIndex: '100',
                left: 'calc(50%)',
                transform: 'translate(calc(-50% + 32px), -50%)',
              }}
            />
          )}

          {showFullScreenIEditor ? (
            <Styled.LayersMenuSpacing />
          ) : (
            <Styled.LayersContainer onClick={stopPropagation}>
              <LayerMenu />
              <EditorModal />
            </Styled.LayersContainer>
          )}

          {hasScrollbar.vertical && !showFullScreenIEditor && (
            <EditorScrollbar
              element={editorPlaceholderRef.current}
              direction={SCROLL_DIRECTION.VERTICAL}
              ratio={verticalScrollBarRatio}
            />
          )}
          {hasScrollbar.horizontal && !showFullScreenIEditor && (
            <EditorScrollbar
              element={editorPlaceholderRef.current}
              direction={SCROLL_DIRECTION.HORIZONTAL}
              ratio={horizontalScrollBarRatio}
            />
          )}

          <Styled.EditorPlaceholder id="editor-placeholder" ref={editorPlaceholderRef}>
            <Styled.EditorInnerPlaceholder id="editor-inner-placeholder">
              {!showFullScreenIEditor && (
                <Styled.SlidePosition>Artboard {(activeSlidePosition ?? 0) + 1}</Styled.SlidePosition>
              )}

              {activeSlide && (
                <Styled.EditorContainerWrapper>
                  {showFullScreenIEditor ? (
                    <IframePreview />
                  ) : (
                    <StoryEditor
                      setContainerRefSet={setContainerRefSet}
                      shiftHeld={shiftHeld}
                      activeLayer={currentActiveLayer}
                      layers={layers}
                      keepRatio={keepRatio}
                      editorWidth={editorWidth}
                      editorHeight={editorHeight}
                      containerRef={containerRef}
                      ctaLayerRef={ctaLayerRef}
                      backgroundColor={activeSlideBgColor}
                      activeSlidePosition={activeSlidePosition}
                      activeLayerPosition={currentLayerPosition}
                      areAnimationsRunning={areAnimationsRunning}
                      onCloseMenu={onCloseMenu}
                      handleLayerClick={handleLayerClick}
                      handleLayerChange={handleLayerChange}
                      handleContainerClick={handleContainerClick}
                      handleContextMenuOpen={handleContextMenuOpen}
                      handleBatchLayerChange={handleBatchLayerChange}
                      handleEditorContainerClick={handleEditorContainerClick}
                    />
                  )}
                  <SafeArea />
                </Styled.EditorContainerWrapper>
              )}

              <Styled.SlideListSpacing />
            </Styled.EditorInnerPlaceholder>
          </Styled.EditorPlaceholder>

          <EditorContextMenu
            top={contextMenuPosition.top}
            left={contextMenuPosition.left}
            onClose={onCloseMenu}
            menuRef={menuRef}
          />

          {!showFullScreenIEditor && (
            <Styled.EditorSecondLine>
              <EditorBottomBar handleLayerClick={handleLayerClick} />
            </Styled.EditorSecondLine>
          )}
          <Selecto
            selectableTargets={['#editor [id^=layer-]']}
            hitRate={'1px'}
            selectByClick={true}
            selectFromInside={true}
            ratio={0}
            onDragStart={handleSelectoDragStart}
            onDrag={handleSelectoDrag}
            // onSelectStart={handleSelectStart}
            // onSelect={handleMultiselect}
            // getElementRect={getElementInfo}
            // onSelectEnd={handleSelectEnd}
          />
        </Styled.EditorWrapper>
        <EditorSidebar
          keepRatio={keepRatio}
          layer={currentActiveLayer}
          ctaLayerRef={ctaLayerRef}
          backgroundColor={activeSlideBgColor}
          handleLayerChange={handleLayerChange}
          handleBatchLayerChange={handleBatchLayerChange}
          handleSlideBackgroundColorChange={handleSlideBackgroundColorChange}
        />
      </Styled.EditorContainer>
      {/* Extract video dimensions helper */}
      <EditorVideoHelper />
      <EditorSavePrompt
        when={isMediaUploading || (storyChangedCount ?? 0) > 0}
        navigate={handleNavigate}
        onConfirm={handleConfirm}
      />
    </Styled.Container>
  );
};

export default memo(Editor);
