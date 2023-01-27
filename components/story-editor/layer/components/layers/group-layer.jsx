import StyledMoveable from 'components/story-editor/layer/components/styled-moveable';
import { EDITOR_LAYER_CURSOR, SNAP_POINTS } from 'config/constants';
import { useAppDispatch, useAppSelector, useDidUpdateEffect } from 'hooks';
import produce from 'immer';
import { layerTypes } from 'interfaces/layer-types';
import { isNil, set } from 'lodash';
import { memo, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { selectSelectedLayers } from 'appredux/features/amp-story/ampStorySlice';
import {
  selectChildLayer,
  toggleForceRebuild,
  toggleTextLayerEditMode
} from 'appredux/features/editor/helpers/groupLayerHelperSlice';
import {
  handleCroppedLayer,
  setIsEditorContextMenuOpen,
  toggleEditorLayerMenuVisibility
} from 'appredux/features/editor/helpers/helpersSlice';
import styled, { css } from 'styled-components';
import { calculateAngle } from 'utils/editorUtils';
import NestedLayer from '../../nested-layer';
import Styled from '../styled-layer';

import EditorLayerMenu from 'components/editor-layer-menu';
import { createPortal } from 'react-dom';
import { batch } from 'react-redux';
import { fixImages, fixSvgs, rotateRect } from 'utils/commonUtils';
import { parseClip } from 'utils/croppingUtils';

const Wrapper = styled.div`
  ${({ areAnimationsRunning }) =>
    areAnimationsRunning &&
    css`
      > div {
        width: 100%;
        height: 100%;
      }
    `}
`;

const GroupContainer = styled.div``;

const CustomAbleProps = {
  mouseListener: true,
};

const GroupLayer = ({
  layer,
  isActive,
  horizontalGuidelines,
  verticalGuidelines,
  handleBatchLayerChange,
  handleLayerClick,
  slidePosition,
  isPreviewMode,
  editorWidth,
  editorHeight,
  areAnimationsRunning,
  isTextReadOnly,
  shiftHeld,
  containerRef,
}) => {
  const dispatch = useAppDispatch();
  const innerPlaceholder = document.getElementById('editor-inner-placeholder');
  const editorParent = document.getElementById('editor')?.parentElement;

  const moveableManager = useRef();
  const moveableAreaRef = useRef();

  const [didMount, setMount] = useState(false);

  const [isHovered, setHovered] = useState(false);
  const [showLines, setShowLines] = useState(false);
  const [pointerEventsAllowed, setPointerEventsAllowed] = useState(false);

  const [targets, setTargets] = useState([]);
  const [elementGuidelines, setElementGuidelines] = useState([]);
  const [cursor, setCursor] = useState({
    type: EDITOR_LAYER_CURSOR.MOVE,
    activeLayer: null,
  });

  const changedWidth = useAppSelector((state) => state.groupLayerHelper.width);
  const changedHeight = useAppSelector((state) => state.groupLayerHelper.height);
  const changedOffsetX = useAppSelector((state) => state.groupLayerHelper.offsetX);
  const changedOffsetY = useAppSelector((state) => state.groupLayerHelper.offsetY);
  const forceRebuild = useAppSelector((state) => state.groupLayerHelper.forceRebuild);
  const isTextLayerInEditMode = useAppSelector((state) => state.groupLayerHelper.isTextLayerInEditMode);

  const isMuted = useAppSelector((state) => state.ampStory.present.isMuted);
  const selectedChildLayer = useAppSelector((state) => state.groupLayerHelper.selectedChildLayer);
  const selectedLayers = useAppSelector(selectSelectedLayers);
  const isCroppingMode = useAppSelector((state) => state.helpers.isCroppingMode);
  const debouncedStaleUpdate = layer.isStale;

  const selectedChildIndex = useMemo(() => {
    const index = layer.childLayers?.findIndex((cl) => cl?._id === selectedChildLayer?._id);
    if (index > -1) {
      return index;
    }

    return null;
  }, [layer.childLayers, selectedChildLayer?._id]);

  const isCurrentGroupInMultiSelect = useMemo(() => {
    if (!selectedLayers || selectedLayers?.length < 2) {
      return false;
    }

    const groupIndex = selectedLayers?.findIndex((sl) => sl._id === layer._id);

    if (groupIndex > -1) {
      return true;
    }

    return false;
  }, [layer._id, selectedLayers]);

  // const directions = useMemo(() => renderDirections(layer.type), [layer.type]);

  const canUseMoveable = useMemo(() => !layer?.settings?.generalSettings?.locked && isNil(selectedChildLayer), [
    layer?.settings?.generalSettings?.locked,
    selectedChildLayer,
  ]);

  const style = useMemo(() => {
    const hasDropShadow = !layer.settings.layerSettings.fullscreen && +layer.settings.generalSettings.shadow !== 0;

    return {
      position: 'absolute',
      zIndex: layer.position,
      filter: hasDropShadow
        ? `drop-shadow(1px 1px ${+layer.settings.generalSettings.shadow}px rgba(0,0,0,0.75))`
        : 'none',
      borderRadius: `${+layer.settings.generalSettings.round * 2}px`,
      opacity: Number(layer.settings.generalSettings.opacity) / 100,
    };
  }, [
    layer.position,
    layer.settings.generalSettings.opacity,
    layer.settings.generalSettings.round,
    layer.settings.generalSettings.shadow,
    layer.settings.layerSettings.fullscreen,
  ]);

  const onDragGroupStart = useCallback(
    (event) => {
      const { events } = event;

      handleLayerClick(layer.position);
      // handleDragging(true, false);

      batch(() => {
        dispatch(toggleEditorLayerMenuVisibility(false));
        dispatch(setIsEditorContextMenuOpen(false));
      });

      events.forEach((ev, i) => {
        const currentLayer = layer.childLayers?.[i];

        const layerOffsetX = currentLayer.settings.generalSettings.offsetX;
        const layerOffsetY = currentLayer.settings.generalSettings.offsetY;

        ev.set([layerOffsetX, layerOffsetY]);
      });
    },
    [dispatch, handleLayerClick, layer.childLayers, layer.position],
  );

  const onDragGroup = useCallback(
    ({ events }) => {
      if (!showLines) {
        setShowLines(true);
      }

      if (shiftHeld) {
        return;
      }

      events.forEach((ev, index) => {
        const layerRotate = layer.childLayers[index].settings.generalSettings.rotate;

        ev.target.style.transform = `translate(${Math.round(ev.beforeTranslate[0])}px, ${Math.round(
          ev.beforeTranslate[1],
        )}px) rotate(${layerRotate}deg)`;
      });
    },
    [layer.childLayers, shiftHeld, showLines],
  );

  const onDragGroupEnd = useCallback(
    (event) => {
      const { events, lastEvent } = event;
      if (lastEvent) {
        let minOffsetX = null;
        let minOffsetY = null;

        const updatedLayers = layer.childLayers.map((layer, index) => {
          const event = events[index];

          const layerOffsetX = Math.round(event.lastEvent.beforeTranslate[0]);
          const layerOffsetY = Math.round(event.lastEvent.beforeTranslate[1]);
          const angle = layer.settings.generalSettings.rotate;
          const width = layer.settings.layerSettings.width;
          const height = layer.settings.layerSettings.height;

          if (angle !== 0) {
            const rotatedLayer = rotateRect(angle, layerOffsetX, layerOffsetY, width, height, 0);
            const adjustedOffsetX = Math.round(
              Math.min(rotatedLayer[0][0], rotatedLayer[1][0], rotatedLayer[2][0], rotatedLayer[3][0]),
            );
            const adjustedOffsetY = Math.round(
              Math.min(rotatedLayer[0][1], rotatedLayer[1][1], rotatedLayer[2][1], rotatedLayer[3][1]),
            );

            if (minOffsetX === null || adjustedOffsetX < minOffsetX) {
              minOffsetX = adjustedOffsetX;
            }

            if (minOffsetY === null || adjustedOffsetY < minOffsetY) {
              minOffsetY = adjustedOffsetY;
            }
          } else {
            if (minOffsetX === null || layerOffsetX < minOffsetX) {
              minOffsetX = layerOffsetX;
            }
            if (minOffsetY === null || layerOffsetY < minOffsetY) {
              minOffsetY = layerOffsetY;
            }
          }

          return {
            ...layer,
            settings: {
              ...layer.settings,
              generalSettings: {
                ...layer.settings.generalSettings,
                offsetX: layerOffsetX,
                offsetY: layerOffsetY,
              },
            },
          };
        });

        const deltaOffsetX = (minOffsetX ?? 0) - layer.settings.generalSettings.offsetX;
        const deltaOffsetY = (minOffsetY ?? 0) - layer.settings.generalSettings.offsetY;

        handleBatchLayerChange([
          {
            field: 'childLayers',
            value: updatedLayers,
          },
          {
            field: 'settings.generalSettings.offsetX',
            value: layer.settings.generalSettings.offsetX + (deltaOffsetX ?? 0),
          },
          {
            field: 'settings.generalSettings.offsetY',
            value: layer.settings.generalSettings.offsetY + (deltaOffsetY ?? 0),
          },
        ]);

        // handleDragging(false, true);
        setShowLines(false);
      }
    },
    [
      handleBatchLayerChange,
      layer.childLayers,
      layer.settings.generalSettings.offsetX,
      layer.settings.generalSettings.offsetY,
    ],
  );

  const onResizeGroupStart = useCallback(
    ({ events }) => {
      // handleDragging(true, false);
      events.forEach((ev, i) => {
        const currentLayer = layer.childLayers[i];

        const layerOffsetX = currentLayer.settings.generalSettings.offsetX;
        const layerOffsetY = currentLayer.settings.generalSettings.offsetY;

        ev.setOrigin(['%', '%']);
        ev.dragStart && ev.dragStart.set([layerOffsetX, layerOffsetY]);
      });
    },
    [layer.childLayers],
  );

  const onResizeGroup = useCallback(
    ({ events }) => {
      if (!showLines) {
        setShowLines(true);
      }

      events.forEach((ev, index) => {
        const childLayer = layer.childLayers[index];
        const rotate = childLayer.settings.generalSettings.rotate;
        const thickness =
          childLayer.settings.layerSettings.shapeStyles.relativeThickness ??
          childLayer.settings.layerSettings.shapeStyles.thickness;

        ev.target.style.width = `${Math.round(ev.width)}px`;
        ev.target.style.height = `${Math.round(ev.height)}px`;
        ev.target.style.transform = `translate(${Math.round(ev.drag.beforeTranslate[0])}px, ${Math.round(
          ev.drag.beforeTranslate[1],
        )}px) rotate(${rotate}deg)`;

        if (ev.target.children && ev.target.children[0].nodeName === 'svg') {
          fixSvgs(
            ev.target.children[0],
            Math.round(ev.width) - thickness,
            Math.round(ev.height) - thickness,
          );
        }

        if (ev.target.children && ev.target.children[0].classList.contains('image-wrapper')) {
          fixImages(ev.target.children[0], Math.round(ev.width), Math.round(ev.height), childLayer);
        }
      });
    },
    [layer.childLayers, showLines],
  );

  const onResizeGroupEnd = useCallback(
    ({ events, lastEvent }) => {
      if (lastEvent) {
        let minOffsetX = null;
        let minOffsetY = null;

        const updatedLayers = layer.childLayers.map((layer, index) => {
          const event = events[index];

          const layerOffsetX = Math.round(event.lastEvent.drag.beforeTranslate[0]);
          const layerOffsetY = Math.round(event.lastEvent.drag.beforeTranslate[1]);
          const layerWidth = Math.round(event.lastEvent.width);
          const layerHeight = Math.round(event.lastEvent.height);
          const angle = layer.settings.generalSettings.rotate;
          const thickness =
            layer.settings.layerSettings.shapeStyles.relativeThickness ??
            layer.settings.layerSettings.shapeStyles.thickness;

          if (angle !== 0) {
            const rotatedLayer = rotateRect(
              angle,
              layerOffsetX,
              layerOffsetY,
              layerWidth - 2 * thickness,
              layerHeight - 2 * thickness,
              thickness,
            );
            const adjustedOffsetX = Math.round(
              Math.min(rotatedLayer[0][0], rotatedLayer[1][0], rotatedLayer[2][0], rotatedLayer[3][0]),
            );
            const adjustedOffsetY = Math.round(
              Math.min(rotatedLayer[0][1], rotatedLayer[1][1], rotatedLayer[2][1], rotatedLayer[3][1]),
            );

            if (minOffsetX === null || adjustedOffsetX < minOffsetX) {
              minOffsetX = adjustedOffsetX;
            }

            if (minOffsetY === null || adjustedOffsetY < minOffsetY) {
              minOffsetY = adjustedOffsetY;
            }
          } else {
            if (minOffsetX === null || layerOffsetX < minOffsetX) {
              minOffsetX = layerOffsetX;
            }
            if (minOffsetY === null || layerOffsetY < minOffsetY) {
              minOffsetY = layerOffsetY;
            }
          }

          const cropSettings = layer.settings.cropSettings;

          if (cropSettings) {
            const parsedClip = parseClip(cropSettings.frame.clipStyle);

            const deltaWidth = layerWidth / layer.settings.layerSettings.width;
            const deltaHeight = layerHeight / layer.settings.layerSettings.height;

            const updatedOriginalWidth = cropSettings.originalWidth * deltaWidth;
            const updatedOriginalHeight = cropSettings.originalHeight * deltaHeight;

            const topRatio = parsedClip[0] / cropSettings.originalHeight;
            const rightRatio = parsedClip[1] / cropSettings.originalWidth;
            const bottomRatio = parsedClip[2] / cropSettings.originalHeight;
            const leftRatio = parsedClip[3] / cropSettings.originalWidth;

            const newTopClip = updatedOriginalHeight * topRatio;
            const newRightClip = updatedOriginalWidth * rightRatio;
            const newBottomClip = updatedOriginalHeight * bottomRatio;
            const newLeftClip = updatedOriginalWidth * leftRatio;

            const newClip = [newTopClip, newRightClip, newBottomClip, newLeftClip]
              .map((v) => `${v.toFixed(0)}px`)
              .join(' ');

            return {
              ...layer,
              settings: {
                ...layer.settings,
                generalSettings: {
                  ...layer.settings.generalSettings,
                  offsetX: layerOffsetX,
                  offsetY: layerOffsetY,
                },
                layerSettings: {
                  ...layer.settings.layerSettings,
                  width: layerWidth,
                  height: layerHeight,
                },
                cropSettings: {
                  ...cropSettings,
                  frame: {
                    ...cropSettings.frame,
                    clipStyle: `inset(${newClip})`,
                  },
                  originalWidth: updatedOriginalWidth,
                  originalHeight: updatedOriginalHeight,
                },
              },
            };
          }

          return {
            ...layer,
            settings: {
              ...layer.settings,
              generalSettings: {
                ...layer.settings.generalSettings,
                offsetX: layerOffsetX,
                offsetY: layerOffsetY,
              },
              layerSettings: {
                ...layer.settings.layerSettings,
                width: layerWidth - 2 * thickness,
                height: layerHeight - 2 * thickness,
              },
            },
          };
        });

        const deltaOffsetX = (minOffsetX ?? 0) - layer.settings.generalSettings.offsetX;
        const deltaOffsetY = (minOffsetY ?? 0) - layer.settings.generalSettings.offsetY;

        handleBatchLayerChange([
          {
            field: 'settings.generalSettings.offsetX',
            value: layer.settings.generalSettings.offsetX + (deltaOffsetX ?? 0),
          },
          {
            field: 'settings.generalSettings.offsetY',
            value: layer.settings.generalSettings.offsetY + (deltaOffsetY ?? 0),
          },
          {
            field: 'settings.layerSettings.width',
            value: Math.round(lastEvent.width),
          },
          {
            field: 'settings.layerSettings.height',
            value: Math.round(lastEvent.height),
          },
          {
            field: 'childLayers',
            value: updatedLayers,
          },
        ]);

        // handleDragging(false, true);
        setShowLines(false);
      }
    },
    [
      handleBatchLayerChange,
      layer.childLayers,
      layer.settings.generalSettings.offsetX,
      layer.settings.generalSettings.offsetY,
    ],
  );

  const onRotateGroupStart = useCallback(
    ({ events }) => {
      // handleDragging(true, false);
      events.forEach((ev, i) => {
        const currentLayer = layer.childLayers[i];

        const layerOffsetX = currentLayer.settings.generalSettings.offsetX;
        const layerOffsetY = currentLayer.settings.generalSettings.offsetY;

        const layerRotate = currentLayer.settings.generalSettings.rotate;

        ev.set(layerRotate);
        ev.dragStart && ev.dragStart.set([layerOffsetX, layerOffsetY]);
      });
    },
    [layer.childLayers],
  );

  const onRotateGroup = useCallback(
    ({ events }) => {
      if (!showLines) {
        setShowLines(true);
      }

      events.forEach((ev) => {
        ev.target.style.transform =
          `translate(${Math.round(ev.drag.beforeTranslate[0])}px, ${Math.round(ev.drag.beforeTranslate[1])}px)` +
          ` rotate(${calculateAngle(ev.beforeRotation)}deg)`;
      });
    },
    [showLines],
  );

  const onRotateGroupEnd = useCallback(
    ({ events, lastEvent }) => {
      if (lastEvent) {
        let minOffsetX = null;
        let minOffsetY = null;

        const updatedLayers = layer.childLayers.map((layer, index) => {
          const event = events[index];
          const layerOffsetX = Math.round(event.lastEvent.drag.beforeTranslate[0]);
          const layerOffsetY = Math.round(event.lastEvent.drag.beforeTranslate[1]);
          const layerRotate = Math.round(calculateAngle(event.lastEvent.beforeRotate));
          const width = layer.settings.layerSettings.width;
          const height = layer.settings.layerSettings.height;

          if (layerRotate !== 0) {
            const rotatedLayer = rotateRect(layerRotate, layerOffsetX, layerOffsetY, width, height, 0);
            const adjustedOffsetX = Math.round(
              Math.min(rotatedLayer[0][0], rotatedLayer[1][0], rotatedLayer[2][0], rotatedLayer[3][0]),
            );
            const adjustedOffsetY = Math.round(
              Math.min(rotatedLayer[0][1], rotatedLayer[1][1], rotatedLayer[2][1], rotatedLayer[3][1]),
            );

            if (minOffsetX === null || adjustedOffsetX < minOffsetX) {
              minOffsetX = adjustedOffsetX;
            }

            if (minOffsetY === null || adjustedOffsetY < minOffsetY) {
              minOffsetY = adjustedOffsetY;
            }
          } else {
            if (minOffsetX === null || layerOffsetX < minOffsetX) {
              minOffsetX = layerOffsetX;
            }
            if (minOffsetY === null || layerOffsetY < minOffsetY) {
              minOffsetY = layerOffsetY;
            }
          }

          return {
            ...layer,
            settings: {
              ...layer.settings,
              generalSettings: {
                ...layer.settings.generalSettings,
                offsetX: layerOffsetX,
                offsetY: layerOffsetY,
                rotate: layerRotate,
              },
            },
          };
        });

        const deltaOffsetX = (minOffsetX ?? 0) - layer.settings.generalSettings.offsetX;
        const deltaOffsetY = (minOffsetY ?? 0) - layer.settings.generalSettings.offsetY;

        handleBatchLayerChange([
          {
            field: 'childLayers',
            value: updatedLayers,
          },
          {
            field: 'settings.generalSettings.rotate',
            value: calculateAngle(lastEvent?.beforeRotate),
          },
          {
            field: 'settings.generalSettings.offsetX',
            value: layer.settings.generalSettings.offsetX + (deltaOffsetX ?? 0),
          },
          {
            field: 'settings.generalSettings.offsetY',
            value: layer.settings.generalSettings.offsetY + (deltaOffsetY ?? 0),
          },
        ]);

        // handleDragging(false, true);
        setShowLines(false);
      }
    },
    [
      handleBatchLayerChange,
      layer.childLayers,
      layer.settings.generalSettings.offsetX,
      layer.settings.generalSettings.offsetY,
    ],
  );

  const handleHeightUpdate = useCallback(
    (inputHeight, layerId) => {
      if (!isActive) {
        return;
      }

      const updatedLayers = layer?.childLayers?.map((cl) => {
        if (cl._id === selectedChildLayer?._id || cl._id === layerId) {
          const nextState = produce(cl, (draftState) => {
            set(draftState, 'settings.layerSettings.height', inputHeight);
          });

          return nextState;
        }

        return cl;
      });

      const { height, offsetY } = updatedLayers.reduce(
        (acc, currentLayer) => {
          const { settings } = currentLayer;
          const { offsetY: layerOffsetY } = settings.generalSettings;
          const { height: layerHeight } = settings.layerSettings;

          if (+layerOffsetY < acc.offsetY) {
            acc.offsetY = Math.round(layerOffsetY);
          }

          if (+layerHeight + +layerOffsetY > acc.height) {
            acc.height = Math.round(+layerHeight + +layerOffsetY);
          }

          return acc;
        },
        {
          height: 0,
          offsetY: Number.POSITIVE_INFINITY,
        },
      );

      handleBatchLayerChange([
        { field: 'childLayers', value: updatedLayers },
        { field: 'settings.layerSettings.height', value: height - offsetY },
        { field: 'settings.generalSettings.offsetY', value: offsetY },
        { field: 'isStale', value: true },
      ]);
    },
    [handleBatchLayerChange, isActive, layer?.childLayers, selectedChildLayer?._id],
  );

  const attachReference = useCallback((e) => {
    if (e) {
      moveableManager.current = e;
    }
  }, []);

  const onClickGroup = useCallback(
    ({ targets, inputTarget, isTarget, containsTarget, targetIndex, isDouble }) => {
      if (isActive && layer.settings.generalSettings.locked) {
        return;
      }

      if (isCroppingMode) {
        dispatch(handleCroppedLayer());
      }

      // Put text layer in edit mode
      if (
        selectedChildLayer &&
        isDouble &&
        layer.childLayers[targetIndex]._id === selectedChildLayer._id &&
        selectedChildLayer.type === layerTypes.HTML
      ) {
        dispatch(toggleTextLayerEditMode(true));
        setCursor({ type: EDITOR_LAYER_CURSOR.TEXT, activeLayer: selectedChildLayer._id });
        setHovered(false);
      }

      // Double click to select child layer
      if ((!selectedChildLayer && isDouble && targetIndex > -1) || (selectedChildLayer && targetIndex > -1)) {
        const child = layer.childLayers[targetIndex];
        dispatch(selectChildLayer(child));
      }

      // Deselect child layer
      if (selectedChildLayer && targetIndex < 0) {
        dispatch(selectChildLayer(null));
      }

      handleLayerClick(layer.position);
      // handleDragging(false, true);
    },
    [dispatch, handleLayerClick, isCroppingMode, layer.childLayers, layer.position, selectedChildLayer],
  );

  const onMouseEnter = useCallback(() => {
    setHovered(true);
  }, []);
  const onMouseLeave = useCallback(() => setHovered(false), []);

  const handleTextLayerOutsideClick = useCallback(
    (e, layerId) => {
      if (moveableAreaRef.current && cursor.type === EDITOR_LAYER_CURSOR.TEXT && layerId === cursor.activeLayer) {
        dispatch(toggleTextLayerEditMode(false));
        setCursor({ type: EDITOR_LAYER_CURSOR.MOVE, activeLayer: null });
      }
    },
    [cursor.activeLayer, cursor.type, dispatch],
  );

  useEffect(() => {
    if (isPreviewMode || isTextLayerInEditMode) {
      return;
    }

    const group = document.querySelector(`#editor #group-${layer._id}`);
    setTargets([].slice.call(group?.querySelectorAll(`:scope>[id^=layer-]`)));
  }, [isPreviewMode, layer._id, isTextLayerInEditMode]);

  useEffect(() => {
    if (isPreviewMode) {
      return;
    }

    if (isActive) {
      const editor = document.getElementById('editor');

      // Select layers not included in the group with editor scope
      const nodeList = editor?.querySelectorAll(':scope > [id^=layer]');
      const groups = editor?.querySelectorAll('.moveable-area');
      const guideLines = [...(groups ?? [])]?.filter((elm) => {
        const wrapper = elm?.closest('.group-wrapper');
        const prevSibling = wrapper?.previousSibling;
        const groupLayer = prevSibling?.querySelector('[id^=group]');
        return groupLayer?.id !== `group-${layer._id}`;
      });
      setElementGuidelines([...(nodeList ?? []), ...guideLines]);
    }
  }, [isActive, isPreviewMode, layer._id]);

  useDidUpdateEffect(() => {
    if (debouncedStaleUpdate && layer.type === layerTypes.GROUP && isActive) {
      moveableManager.current?.getManager().updateRect();
      handleBatchLayerChange([{ field: 'isStale', value: false }]);
    }
  }, [handleBatchLayerChange, isActive, debouncedStaleUpdate, layer.type]);

  useDidUpdateEffect(() => {
    if (moveableAreaRef.current) {
      if (cursor.type === EDITOR_LAYER_CURSOR.TEXT) {
        moveableAreaRef.current.style.pointerEvents = 'none';
        return;
      }
      moveableAreaRef.current.style.removeProperty('pointer-events');
    }
  }, [cursor]);

  useDidUpdateEffect(() => {
    if (moveableAreaRef.current) {
      if (isCroppingMode) {
        moveableAreaRef.current.style.pointerEvents = 'none';
        return;
      }
      moveableAreaRef.current.style.removeProperty('pointer-events');
    }
  }, [isCroppingMode]);

  useEffect(() => {
    if (forceRebuild) {
      const timeout = setTimeout(() => {
        moveableManager.current?.getManager().updateRect();
        dispatch(toggleForceRebuild(false));
      }, 1);
      // const secondTimeout = setTimeout(() => {
      //   moveableManager.current?.getManager().updateRect();
      //   dispatch(toggleForceRebuild(false));
      // }, 2);

      return () => {
        clearTimeout(timeout);
        // clearTimeout(secondTimeout);
      };
    }
  }, [dispatch, forceRebuild]);

  useEffect(() => {
    if (!isActive && selectedLayers && selectedLayers?.length > 1) {
      setHovered(false);
    }
  }, [isActive, selectedLayers]);

  // useDidUpdateEffect(() => {
  //   if (isPreviewMode) {
  //     return;
  //   }

  //   moveableManager.current?.request('resizable', {
  //     offsetWidth: changedWidth,
  //     offsetHeight: changedHeight,
  //     isInstant: true,
  //   });
  // }, [changedWidth, changedHeight]);

  // useDidUpdateEffect(() => {
  //   if (isPreviewMode) {
  //     return;
  //   }

  //   moveableManager.current?.request('draggable', {
  //     x: changedOffsetX,
  //     isInstant: true,
  //   });
  // }, [changedOffsetX]);

  // useDidUpdateEffect(() => {
  //   if (isPreviewMode) {
  //     return;
  //   }

  //   moveableManager.current?.request('draggable', {
  //     y: changedOffsetY,
  //     isInstant: true,
  //   });
  // }, [changedOffsetY]);

  // useDidUpdateEffect(() => {
  //   if (isPreviewMode) {
  //     return;
  //   }

  //   moveableManager.current?.request('rotatable', {
  //     rotate: changedOffsetY,
  //     isInstant: true,
  //   });
  // }, [changedRotate]);

  const MouseCustomAble = useMemo(
    () => ({
      name: 'mouseListener',
      props: {
        mouseListener: true,
        onMouseEnter,
        onMouseLeave,
      },
      events: {},
      mouseEnter() {
        this.props.onMouseEnter();
      },
      mouseLeave() {
        this.props.onMouseLeave();
      },
    }),
    [onMouseEnter, onMouseLeave],
  );

  const animationWrapper = useMemo(() => {
    if (areAnimationsRunning) {
      return {
        position: 'absolute',
        width: `${layer.settings.layerSettings.width}px`,
        height: `${layer.settings.layerSettings.height}px`,
        transform: `translate(${layer.settings.generalSettings.offsetX}px, ${layer.settings.generalSettings.offsetY}px)`,
      };
    }
  }, [
    areAnimationsRunning,
    layer.settings.generalSettings.offsetX,
    layer.settings.generalSettings.offsetY,
    layer.settings.layerSettings.height,
    layer.settings.layerSettings.width,
  ]);

  const onMouseMoveDisableEffects = useCallback(
    (e) => {
      if (containerRef?.current) {
        const { left, right, top, bottom } = containerRef?.current?.getBoundingClientRect();
        const { clientX, clientY } = e;

        if (clientX >= left && clientX <= right && clientY >= top && clientY <= bottom) {
          setPointerEventsAllowed(true);
          return;
        }

        setPointerEventsAllowed(false);
      }
    },
    [containerRef],
  );

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMoveDisableEffects);
    return () => {
      document.removeEventListener('mousemove', onMouseMoveDisableEffects);
    };
  }, [onMouseMoveDisableEffects]);

  useLayoutEffect(() => {
    if (isPreviewMode) {
      return;
    }

    if (didMount) {
      const moveableArea = document.querySelector(`#group-wrapper-${layer._id} .moveable-area`);
      if (moveableArea) {
        moveableAreaRef.current = moveableArea;
      }
    }
  }, [didMount, isPreviewMode, layer._id]);

  useEffect(() => {
    setMount(true);
  }, []);

  if (
    cursor.type === 'text' &&
    selectedChildLayer?.type === layerTypes.HTML &&
    !isTextReadOnly &&
    innerPlaceholder &&
    isTextLayerInEditMode
  ) {
    return createPortal(
      <Wrapper
        style={{
          position: 'absolute',
          top: 26,
          left: 0,
          width: `${layer.settings.layerSettings.width}px`,
          height: `${layer.settings.layerSettings.height}px`,
        }}
        areAnimationsRunning={areAnimationsRunning}
      >
        <Styled.AnimationContainer
          display={layer?.type === layerTypes.GRADIENTS ? 'flex' : undefined}
          width={layer.settings.layerSettings.width}
          height={layer.settings.layerSettings.height}
          rotate={layer.settings.generalSettings.rotate}
          offsetX={layer.settings.generalSettings.offsetX}
          offsetY={layer.settings.generalSettings.offsetY}
          containerWidth={editorWidth}
          containerHeight={editorHeight}
          animateIn={layer.settings.animateIn}
          animateInDelay={layer.settings.animateInDelay}
          animateInDuration={layer.settings.animateInDuration}
          animateOut={layer.settings.animateOut}
          animateOutDelay={layer.settings.animateOutDelay}
          animateOutDuration={layer.settings.animateOutDuration}
          areAnimationsRunning={areAnimationsRunning}
          thickness={0}
          isFullscreen={false}
          isGroupLayer
        >
          <GroupContainer id={`group-${layer._id}`} style={style}>
            {layer.childLayers?.map((childLayer) => (
              <NestedLayer
                handleTextLayerOutsideClick={handleTextLayerOutsideClick}
                handleBatchLayerChange={handleBatchLayerChange}
                parentLayer={layer}
                key={childLayer._id}
                layer={childLayer}
                groupWidth={layer.settings.layerSettings.width}
                groupHeight={layer.settings.layerSettings.height}
                groupOffsetX={layer.settings.generalSettings.offsetX}
                groupOffsetY={layer.settings.generalSettings.offsetY}
                slidePosition={slidePosition}
                editorWidth={editorWidth}
                editorHeight={editorHeight}
                cursor={cursor}
                isActive={selectedChildLayer?._id === childLayer?._id}
                isMuted={isMuted}
                handleHeightUpdate={handleHeightUpdate}
                isTextReadOnly={isTextReadOnly}
                areAnimationsRunning={areAnimationsRunning}
              />
            ))}
          </GroupContainer>
        </Styled.AnimationContainer>
      </Wrapper>,
      innerPlaceholder,
    );
  }

  return (
    <>
      <Wrapper style={animationWrapper} areAnimationsRunning={areAnimationsRunning}>
        <Styled.AnimationContainer
          display={layer?.type === layerTypes.GRADIENTS ? 'flex' : undefined}
          width={layer.settings.layerSettings.width}
          height={layer.settings.layerSettings.height}
          rotate={layer.settings.generalSettings.rotate}
          offsetX={layer.settings.generalSettings.offsetX}
          offsetY={layer.settings.generalSettings.offsetY}
          containerWidth={editorWidth}
          containerHeight={editorHeight}
          animateIn={layer.settings.animateIn}
          animateInDelay={layer.settings.animateInDelay}
          animateInDuration={layer.settings.animateInDuration}
          animateOut={layer.settings.animateOut}
          animateOutDelay={layer.settings.animateOutDelay}
          animateOutDuration={layer.settings.animateOutDuration}
          areAnimationsRunning={areAnimationsRunning}
          thickness={0}
          isFullscreen={false}
          isGroupLayer
        >
          <GroupContainer id={`group-${layer._id}`} style={style}>
            {layer.childLayers?.map((childLayer) => (
              <NestedLayer
                handleTextLayerOutsideClick={handleTextLayerOutsideClick}
                handleBatchLayerChange={handleBatchLayerChange}
                parentLayer={layer}
                key={childLayer._id}
                layer={childLayer}
                groupWidth={layer.settings.layerSettings.width}
                groupHeight={layer.settings.layerSettings.height}
                groupOffsetX={layer.settings.generalSettings.offsetX}
                groupOffsetY={layer.settings.generalSettings.offsetY}
                slidePosition={slidePosition}
                editorWidth={editorWidth}
                editorHeight={editorHeight}
                cursor={cursor}
                isActive={selectedChildLayer?._id === childLayer?._id}
                isMuted={isMuted}
                handleHeightUpdate={handleHeightUpdate}
                isTextReadOnly={isTextReadOnly}
                areAnimationsRunning={areAnimationsRunning}
              />
            ))}
          </GroupContainer>
        </Styled.AnimationContainer>
      </Wrapper>

      {!isPreviewMode &&
        !areAnimationsRunning &&
        !isCurrentGroupInMultiSelect &&
        editorParent &&
        createPortal(
          <StyledMoveable.Wrapper
            $isActive={isActive && !forceRebuild}
            $isHovered={!showLines && isHovered && !selectedChildLayer && !isActive && !forceRebuild}
            $selectedChildIndex={selectedChildIndex}
            $pointerEvents={pointerEventsAllowed}
            className="group-wrapper"
            id={`group-wrapper-${layer._id}`}
          >
            <StyledMoveable.Frame
              ables={[MouseCustomAble]}
              props={CustomAbleProps}
              container={document.getElementById('editor')}
              ref={attachReference}
              zoom={1}
              origin={false}
              target={targets}
              isDisplaySnapDigit={false}
              isDisplayInnerSnapDigit={false}
              snapDirections={SNAP_POINTS}
              elementSnapDirections={SNAP_POINTS}
              position={layer?.position}
              keepRatio={true}
              draggable={canUseMoveable}
              resizable={canUseMoveable}
              rotatable={canUseMoveable}
              snappable={canUseMoveable}
              rotationPosition={'bottom'}
              className={'layer-controls'}
              renderDirections={['nw', 'ne', 'sw', 'se']}
              defaultGroupRotate={layer.settings.generalSettings.rotate}
              defaultGroupOrigin={'50% 50%'}
              originRelative={true}
              throttleResize={1}
              snapThreshold={2}
              throttleDrag={0}
              verticalGuidelines={showLines ? verticalGuidelines : []}
              horizontalGuidelines={showLines ? horizontalGuidelines : []}
              elementGuidelines={showLines ? elementGuidelines : []}
              onDragGroupStart={onDragGroupStart}
              onDragGroup={onDragGroup}
              onDragGroupEnd={onDragGroupEnd}
              onResizeGroupStart={onResizeGroupStart}
              onResizeGroup={onResizeGroup}
              onResizeGroupEnd={onResizeGroupEnd}
              onRotateGroupStart={onRotateGroupStart}
              onRotateGroup={onRotateGroup}
              onRotateGroupEnd={onRotateGroupEnd}
              onClickGroup={onClickGroup}
            />
          </StyledMoveable.Wrapper>,
          editorParent,
        )}

      {/* <CSSTransition
        in={isActive && !showLines && !selectedChildLayer}
        timeout={500}
        classNames="multiselect-menu-fade"
        appear
        unmountOnExit
        key={`${layer._id}-${isActive}-${layer.settings.generalSettings.locked}`}
      > */}
      {isActive &&
        !showLines &&
        !selectedChildLayer &&
        !areAnimationsRunning &&
        editorParent &&
        createPortal(<EditorLayerMenu layer={layer} handleBatchLayerChange={handleBatchLayerChange} />, editorParent)}

      {/* </CSSTransition> */}
    </>
  );
};

export default memo(GroupLayer);
