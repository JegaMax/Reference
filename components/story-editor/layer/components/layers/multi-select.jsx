import { useAppDispatch, useAppSelector, useDidUpdateEffect } from 'hooks';
import { layerTypes } from 'interfaces/layer-types';
import { cloneDeep, isNil } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { batch } from 'react-redux';
import { setSelectedLayersChangeCounter } from 'appredux/features/editor/helpers/helpersSlice';
import { fixImages, fixSvgs, rotateRect } from 'utils/commonUtils';
import { parseClip } from 'utils/croppingUtils';
import { calculateAngle } from 'utils/editorUtils';
import EditorMultipleLayersMenu from '../../../../editor-layer-menu/editor-multiple-layers-menu';
import StyledMoveable from '../styled-moveable';

import {
  selectMultipleLayer,
  selectMultipleLayerById,
  setFilteredActiveLayerPropsArrayInStore
} from 'appredux/features/amp-story/ampStorySlice';
import {
  clearMulti,
  setMultiOffsetX,
  setMultiOffsetY,
  toggleForceRebuildMulti
} from 'appredux/features/editor/helpers/groupLayerHelperSlice';

const SNAP_POINTS = {
  top: true,
  bottom: true,
  right: true,
  left: true,
  center: true,
  middle: true,
};

const UpdateType = {
  Drag:'DRAG',
  Resize:'RESZE',
  Rotate:'ROTATE'
}

const STORY_DELIMINATOR = 14;

const updateStoreWithMoveableEvents = ({
  type,
  dispatch,
  events,
  currentActiveLayers,
  groups,
  callback,
  lastEvent,
  rotationCallback,
}) => {
  const updatedFields = [];

  if (type === UpdateType.Drag) {
    events.forEach((event, index) => {
      const layer = currentActiveLayers[index];
      const parentLayer = Object.values(groups).find((group) => group?.childIds?.includes(layer._id));

      const layerOffsetX = Math.round(event.lastEvent.beforeTranslate[0]);
      const layerOffsetY = Math.round(event.lastEvent.beforeTranslate[1]);

      if (!isNil(parentLayer)) {
        const childLayers = parentLayer.childLayers;
        const elementIndex = childLayers?.findIndex((cl) => cl._id === layer._id);
        if (childLayers && !isNil(elementIndex) && elementIndex > -1) {
          childLayers[elementIndex].settings.generalSettings.offsetX = layerOffsetX;
          childLayers[elementIndex].settings.generalSettings.offsetY = layerOffsetY;
          return;
        }
      }

      updatedFields.push(
        {
          position: layer.position,
          field: 'settings.generalSettings.offsetX',
          value: layerOffsetX,
        },
        {
          position: layer.position,
          field: 'settings.generalSettings.offsetY',
          value: layerOffsetY,
        },
      );
    });
  } else if (type === UpdateType.Resize) {
    events.forEach((event, index) => {
      const layer = currentActiveLayers[index];
      const parentLayer = Object.values(groups).find((group) => group?.childIds?.includes(layer._id));

      const layerOffsetX = Math.round(event.lastEvent.drag.beforeTranslate[0]);
      const layerOffsetY = Math.round(event.lastEvent.drag.beforeTranslate[1]);
      const layerWidth = Math.round(event.lastEvent.width);
      const layerHeight = Math.round(event.lastEvent.height);
      const thickness =
        layer.settings.layerSettings.shapeStyles.relativeThickness ??
        layer.settings.layerSettings.shapeStyles.thickness;

      let cropSettings = cloneDeep(layer.settings.cropSettings);

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

        cropSettings = {
          ...cropSettings,
          frame: {
            ...cropSettings.frame,
            clipStyle: `inset(${newClip})`,
          },
          originalWidth: updatedOriginalWidth,
          originalHeight: updatedOriginalHeight,
        };
      }

      if (!isNil(parentLayer)) {
        const childLayers = parentLayer.childLayers;
        const elementIndex = childLayers?.findIndex((cl) => cl._id === layer._id);
        if (childLayers && !isNil(elementIndex) && elementIndex > -1) {
          childLayers[elementIndex].settings.generalSettings.offsetX = layerOffsetX;
          childLayers[elementIndex].settings.generalSettings.offsetY = layerOffsetY;
          childLayers[elementIndex].settings.layerSettings.width = layerWidth - 2 * thickness;
          childLayers[elementIndex].settings.layerSettings.height = layerHeight - 2 * thickness;
          childLayers[elementIndex].settings.cropSettings = cropSettings;
          return;
        }
      }

      updatedFields.push(
        {
          position: layer.position,
          field: 'settings.generalSettings.offsetX',
          value: layerOffsetX,
        },
        {
          position: layer.position,
          field: 'settings.generalSettings.offsetY',
          value: layerOffsetY,
        },
        {
          position: layer.position,
          field: 'settings.layerSettings.width',
          value: layerWidth - 2 * thickness,
        },
        {
          position: layer.position,
          field: 'settings.layerSettings.height',
          value: layerHeight - 2 * thickness,
        },
        {
          position: layer.position,
          field: 'settings.cropSettings',
          value: cropSettings,
        },
      );
    });
  } else if (type === UpdateType.Rotate) {
    events.forEach((event, index) => {
      const layer = currentActiveLayers[index];
      const parentLayer = Object.values(groups).find((group) => group?.childIds?.includes(layer._id));

      const layerOffsetX = Math.round(event.lastEvent.drag.beforeTranslate[0]);
      const layerOffsetY = Math.round(event.lastEvent.drag.beforeTranslate[1]);
      const layerRotate = Math.round(calculateAngle(event.lastEvent.beforeRotate));

      if (!isNil(parentLayer)) {
        const childLayers = parentLayer.childLayers;
        const elementIndex = childLayers?.findIndex((cl) => cl._id === layer._id);
        if (childLayers && !isNil(elementIndex) && elementIndex > -1) {
          childLayers[elementIndex].settings.generalSettings.offsetX = layerOffsetX;
          childLayers[elementIndex].settings.generalSettings.offsetY = layerOffsetY;
          childLayers[elementIndex].settings.generalSettings.rotate = layerRotate;
          return;
        }
      }

      updatedFields.push(
        {
          position: layer.position,
          field: 'settings.generalSettings.offsetX',
          value: layerOffsetX,
        },
        {
          position: layer.position,
          field: 'settings.generalSettings.offsetY',
          value: layerOffsetY,
        },
        {
          position: layer.position,
          field: 'settings.generalSettings.rotate',
          value: layerRotate,
        },
      );
    });
  }

  Object.values(groups).forEach((layer) => {
    const { position, childLayers } = layer;
    if (childLayers) {
      const { width, height, offsetX, offsetY } = childLayers?.reduce(
        (acc, currentLayer) => {
          const { settings } = currentLayer;
          const { offsetX: layerOffsetX, offsetY: layerOffsetY, rotate: angle } = settings.generalSettings;
          const { height: layerHeight, width: layerWidth } = settings.layerSettings;

          if (angle !== 0) {
            const rotatedLayer = rotateRect(angle, layerOffsetX, layerOffsetY, layerWidth, layerHeight, 0);
            const minX = Math.min(rotatedLayer[0][0], rotatedLayer[1][0], rotatedLayer[2][0], rotatedLayer[3][0]);
            const maxX = Math.max(rotatedLayer[0][0], rotatedLayer[1][0], rotatedLayer[2][0], rotatedLayer[3][0]);
            const minY = Math.min(rotatedLayer[0][1], rotatedLayer[1][1], rotatedLayer[2][1], rotatedLayer[3][1]);
            const maxY = Math.max(rotatedLayer[0][1], rotatedLayer[1][1], rotatedLayer[2][1], rotatedLayer[3][1]);
            const adjustedOffsetX = minX;
            const adjustedOffsetY = minY;
            const adjustedWidth = maxX - minX;
            const adjustedHeight = maxY - minY;

            if (+adjustedOffsetX < acc.offsetX) {
              acc.offsetX = Math.round(adjustedOffsetX);
            }

            if (+adjustedOffsetY < acc.offsetY) {
              acc.offsetY = Math.round(adjustedOffsetY);
            }

            if (+adjustedWidth + +adjustedOffsetX > acc.width) {
              acc.width = Math.round(+adjustedWidth + +adjustedOffsetX);
            }

            if (+adjustedHeight + +adjustedOffsetY > acc.height) {
              acc.height = Math.round(+adjustedHeight + +adjustedOffsetY);
            }

            return acc;
          }

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

      if (!isNil(position)) {
        updatedFields.push(
          {
            position,
            field: 'settings.generalSettings.offsetX',
            value: offsetX,
          },
          {
            position,
            field: 'settings.generalSettings.offsetY',
            value: offsetY,
          },
          {
            position,
            field: 'settings.layerSettings.width',
            value: width - offsetX,
          },
          {
            position,
            field: 'settings.layerSettings.height',
            value: height - offsetY,
          },
          {
            position,
            field: 'childLayers',
            value: layer.childLayers,
          },
        );

        if (!isNil(lastEvent)) {
          updatedFields.push({
            position,
            field: 'settings.generalSettings.rotate',
            value: calculateAngle(lastEvent.beforeRotation) + layer.settings.generalSettings.rotate,
          });
        }
      }
    }
  });

  batch(() => {
    dispatch(setFilteredActiveLayerPropsArrayInStore(updatedFields));
    dispatch(setSelectedLayersChangeCounter());
  });

  callback(false);
  if (rotationCallback) {
    rotationCallback(lastEvent.beforeRotate);
  }
};

const MultiSelect = ({ selectedLayers, editorWidth, editorHeight, isShiftHeld, containerRef }) => {
  const dispatch = useAppDispatch();
  const editorParent = document.getElementById('editor')?.parentElement;

  const forceRebuildMulti = useAppSelector((state) => state.groupLayerHelper.forceRebuildMulti);
  const multiWidth = useAppSelector((state) => state.groupLayerHelper.multiWidth);
  const multiHeight = useAppSelector((state) => state.groupLayerHelper.multiHeight);
  const multiX = useAppSelector((state) => state.groupLayerHelper.multiX);
  const multiY = useAppSelector((state) => state.groupLayerHelper.multiY);
  const offsetMultiX = useAppSelector((state) => state.groupLayerHelper.offsetMultiX);
  const offsetMultiY = useAppSelector((state) => state.groupLayerHelper.offsetMultiY);
  const multiAngle = useAppSelector((state) => state.groupLayerHelper.multiAngle);

  const moveableManager = useRef();

  const [pointerEventsAllowed, setPointerEventsAllowed] = useState(false);
  const [targets, setTargets] = useState([]);
  const [elementGuidelines, setElementGuidelines] = useState([]);
  const [frameRotation, setFrameRotation] = useState(0);
  const [moveableActionInProgress, setMoveableActionInProgress] = useState(false);
  const [currentActiveLayers, setCurrentActiveLayers] = useState([]);
  const [groups, setGroups] = useState({});

  const verticalGuidelines = useMemo(
    () => [
      Number(editorWidth) / STORY_DELIMINATOR,
      Number(editorWidth) / 2,
      (Number(editorWidth) / STORY_DELIMINATOR) * (STORY_DELIMINATOR - 1),
    ],
    [editorWidth],
  );

  const horizontalGuidelines = useMemo(
    () => [
      Number(editorHeight) / (Number(editorHeight) / (Number(editorWidth) / STORY_DELIMINATOR)),
      Number(editorHeight) / 2,
      (Number(editorHeight) / (Number(editorHeight) / (Number(editorWidth) / STORY_DELIMINATOR))) *
        (Number(editorHeight) / (Number(editorWidth) / STORY_DELIMINATOR) - 1),
    ],
    [editorHeight, editorWidth],
  );

  const attachReference = useCallback((e) => {
    if (e) {
      moveableManager.current = e;
    }
  }, []);

  const onDragGroupStart = useCallback(
    ({ events }) => {
      events.forEach((ev, i) => {
        const currentLayer = currentActiveLayers[i];
        const layerOffsetX = currentLayer?.settings?.generalSettings?.offsetX ?? 0;
        const layerOffsetY = currentLayer?.settings?.generalSettings?.offsetY ?? 0;

        ev.set([layerOffsetX, layerOffsetY]);
      });
    },
    [currentActiveLayers],
  );

  const onDragGroup = useCallback(
    ({ events }) => {
      if (!moveableActionInProgress) {
        setMoveableActionInProgress(true);
      }
      events.forEach((ev, i) => {
        const layerRotate = currentActiveLayers?.[i]?.settings?.generalSettings?.rotate ?? 0;

        ev.target.style.transform = `translate(${Math.round(ev.beforeTranslate[0])}px, ${Math.round(
          ev.beforeTranslate[1],
        )}px) rotate(${layerRotate}deg)`;
      });
    },
    [currentActiveLayers, moveableActionInProgress],
  );

  const onDragGroupEnd = useCallback(
    (event) => {
      const { events, lastEvent } = event;
      if (lastEvent) {
        updateStoreWithMoveableEvents({
          type: UpdateType.Drag,
          events,
          dispatch,
          currentActiveLayers,
          groups,
          callback: setMoveableActionInProgress,
        });
      }
    },
    [currentActiveLayers, dispatch, groups],
  );

  const onResizeGroupStart = useCallback(
    ({ events }) => {
      events.forEach((ev, i) => {
        const currentLayer = currentActiveLayers?.[i];

        const layerOffsetX = currentLayer?.settings?.generalSettings?.offsetX;
        const layerOffsetY = currentLayer?.settings?.generalSettings?.offsetY;

        ev.setOrigin(['%', '%']);
        ev.dragStart && ev.dragStart.set([layerOffsetX, layerOffsetY]);
      });
    },
    [currentActiveLayers],
  );

  const onResizeGroup = useCallback(
    ({ events }) => {
      if (!moveableActionInProgress) {
        setMoveableActionInProgress(true);
      }

      events.forEach((ev, index) => {
        const rotate = currentActiveLayers[index].settings.generalSettings.rotate;
        const thickness =
          currentActiveLayers[index].settings.layerSettings.shapeStyles.relativeThickness ??
          currentActiveLayers[index].settings.layerSettings.shapeStyles.thickness;

        ev.target.style.width = `${Math.round(ev.width)}px`;
        ev.target.style.height = `${Math.round(ev.height)}px`;
        ev.target.style.transform = `translate(${Math.round(ev.drag.beforeTranslate[0])}px, ${Math.round(
          ev.drag.beforeTranslate[1],
        )}px) rotate(${rotate}deg)`;

        const svgNode = ev.target.querySelector('svg');

        if (svgNode) {
          fixSvgs(svgNode, Math.round(ev.width) - thickness, Math.round(ev.height) - thickness);
          return;
        }

        // Fix single images
        const singleImageNode = ev.target.querySelector('.image-wrapper');
        if (singleImageNode) {
          fixImages(singleImageNode, Math.round(ev.width), Math.round(ev.height), currentActiveLayers[index]);
          return;
        }

        // Fix group images
        if (ev.target.children && ev.target.children[0].classList.contains('image-wrapper')) {
          const imageNode = ev.target.children[0];
          fixImages(imageNode, Math.round(ev.width), Math.round(ev.height), currentActiveLayers[index]);
        }
      });
    },
    [currentActiveLayers, moveableActionInProgress],
  );

  const onResizeGroupEnd = useCallback(
    ({ events, lastEvent }) => {
      if (lastEvent) {
        updateStoreWithMoveableEvents({
          type: UpdateType.Resize,
          dispatch,
          events,
          currentActiveLayers,
          groups,
          callback: setMoveableActionInProgress,
        });
      }
    },
    [currentActiveLayers, dispatch, groups],
  );

  const onRotateGroupStart = useCallback(
    ({ events }) => {
      events.forEach((ev, i) => {
        const currentLayer = currentActiveLayers?.[i];

        const layerOffsetX = currentLayer.settings.generalSettings.offsetX;
        const layerOffsetY = currentLayer.settings.generalSettings.offsetY;
        const layerRotate = currentLayer.settings.generalSettings.rotate;

        ev.set(layerRotate);
        ev.dragStart && ev.dragStart.set([layerOffsetX, layerOffsetY]);
      });
    },
    [currentActiveLayers],
  );

  const onRotateGroup = useCallback(
    ({ events }) => {
      if (!moveableActionInProgress) {
        setMoveableActionInProgress(true);
      }

      events.forEach((ev) => {
        ev.target.style.transform =
          `translate(${ev.drag.beforeTranslate[0]}px, ${ev.drag.beforeTranslate[1]}px)` +
          ` rotate(${ev.beforeRotation}deg)`;
      });
    },
    [moveableActionInProgress],
  );

  const onRotateGroupEnd = useCallback(
    ({ events, lastEvent }) => {
      if (lastEvent) {
        updateStoreWithMoveableEvents({
          type: UpdateType.Rotate,
          dispatch,
          events,
          currentActiveLayers,
          groups,
          callback: setMoveableActionInProgress,
          lastEvent,
          rotationCallback: setFrameRotation,
        });
      }
    },
    [currentActiveLayers, dispatch, groups],
  );

  const onClickGroup = useCallback(
    ({ containsTarget, inputTarget, targets, targetIndex }) => {
      if (!isShiftHeld) {
        return;
      }

      if (containsTarget) {
        const target = targets[targetIndex];
        const id = target.id.replace('layer-', '');
        const layer = selectedLayers?.find(({ _id }) => _id === id);

        if (!layer) {
          const correctLayer = selectedLayers?.find((layer) =>
            layer?.childLayers?.some((childLayer) => childLayer._id === id),
          );

          if (typeof correctLayer?.position === 'number') {
            dispatch(selectMultipleLayer(correctLayer.position, true));
          }
        }

        if (typeof layer?.position === 'number') {
          dispatch(selectMultipleLayer(layer.position, true));
        }

        return;
      }

      if (inputTarget) {
        const layerElement = inputTarget?.id?.includes('layer-') ? inputTarget : inputTarget.closest('[id^="layer-"]');
        const id = layerElement?.id?.replace('layer-', '');
        if (id) {
          dispatch(selectMultipleLayerById(id));
        }
      }
    },
    [dispatch, isShiftHeld, selectedLayers],
  );

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
    if (selectedLayers && selectedLayers.length > 0) {
      const elements = [];
      selectedLayers.forEach((selectedLayer) => {
        // Check for group layers
        if (
          selectedLayer.type === layerTypes.GROUP &&
          selectedLayer?.childLayers &&
          selectedLayer?.childLayers?.length > 0
        ) {
          selectedLayer?.childLayers?.forEach((childLayer) => {
            const element = document.getElementById(`layer-${childLayer._id}`);
            if (element) {
              elements.push(element);
            }
          });

          return;
        }

        const element = document.getElementById(`layer-${selectedLayer._id}`);
        if (element) {
          elements.push(element);
        }
      });

      setTargets(elements);
    }
  }, [selectedLayers]);

  useEffect(() => {
    if (targets && targets?.length > 0) {
      const layers = [];
      const currentGroups = {};

      targets.forEach((target) => {
        const id = target.id.replace('layer-', '');
        const topLayer = selectedLayers.find(({ _id }) => _id === id);

        // Layer is not part of group
        if (topLayer) {
          layers.push(topLayer);
          return;
        }

        // Layer is part of group
        let parent = null;
        const childLayer = selectedLayers.slice(0).reduce((prev, layer, i, arr) => {
          const findItem = prev || layer?.childLayers?.find((cl) => cl?._id === id);
          // ejects early
          if (typeof findItem !== 'undefined') {
            parent = layer;
            arr.splice(1);
          }
          return findItem;
        }, undefined);

        if (childLayer && !isNil(parent)) {
          if (isNil(currentGroups[(parent)._id])) {
            const parentClone = cloneDeep(parent);
            currentGroups[parentClone._id] = {
              ...parentClone,
              childIds: parentClone?.childLayers?.map(({ _id }) => _id) ?? [],
            };
          }

          layers.push(childLayer);
        }
      });

      setCurrentActiveLayers(layers);
      setGroups(currentGroups);
    }
  }, [selectedLayers, targets]);

  useEffect(() => {
    const nodeList = document?.querySelectorAll('#editor > [id^="layer"]');
    const groups = document?.querySelectorAll('#editor .moveable-area');

    const guideLines = [...(nodeList ?? [])]?.filter((elm) => !targets.includes(elm));
    const groupLines = [...(groups ?? [])]?.filter((group) => {
      if (group.closest('.multiselect-wrapper')) {
        return false;
      }

      return true;
    });

    setElementGuidelines([...guideLines, ...groupLines]);
  }, [targets]);

  useEffect(() => {
    if (forceRebuildMulti) {
      const timeout = setTimeout(() => {
        moveableManager.current?.getManager().updateRect();
        dispatch(toggleForceRebuildMulti(false));
      }, 1);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [dispatch, forceRebuildMulti]);

  useDidUpdateEffect(() => {
    if (multiX !== null) {
      moveableManager.current?.request('draggable', {
        x: multiX,
        isInstant: true,
      });
    }
  }, [multiX]);

  useDidUpdateEffect(() => {
    if (multiY !== null) {
      moveableManager.current?.request('draggable', {
        y: multiY,
        isInstant: true,
      });
    }
  }, [multiY]);

  useDidUpdateEffect(() => {
    if (offsetMultiX !== null) {
      moveableManager.current?.request('draggable', {
        deltaX: offsetMultiX,
        isInstant: true,
      });
      dispatch(setMultiOffsetX(null));
    }
  }, [offsetMultiX]);

  useDidUpdateEffect(() => {
    if (offsetMultiY !== null) {
      moveableManager.current?.request('draggable', {
        deltaY: offsetMultiY,
        isInstant: true,
      });
      dispatch(setMultiOffsetY(null));
    }
  }, [offsetMultiY]);

  useDidUpdateEffect(() => {
    if (multiWidth !== null) {
      moveableManager.current?.request('resizable', {
        offsetWidth: multiWidth,
        isInstant: true,
      });
    }
  }, [multiWidth]);

  useDidUpdateEffect(() => {
    if (multiHeight !== null) {
      moveableManager.current?.request('resizable', {
        offsetHeight: multiHeight,
        isInstant: true,
      });
    }
  }, [multiHeight]);

  useDidUpdateEffect(() => {
    if (multiAngle !== null) {
      moveableManager.current?.request('rotatable', {
        rotate: multiAngle,
        isInstant: true,
      });
    }
  }, [multiAngle]);

  useEffect(() => {
    return () => {
      dispatch(clearMulti());
    };
  }, [dispatch]);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMoveDisableEffects);
    return () => {
      document.removeEventListener('mousemove', onMouseMoveDisableEffects);
    };
  }, [onMouseMoveDisableEffects]);

  return (
    <>
      {editorParent &&
        createPortal(
          <StyledMoveable.Wrapper
            $isActive={true}
            $isHovered={false}
            className="multiselect-wrapper"
            $pointerEvents={pointerEventsAllowed}
          >
            <StyledMoveable.Frame
              container={document.getElementById('editor')}
              ref={attachReference}
              zoom={1}
              origin={false}
              target={targets}
              isDisplaySnapDigit={false}
              isDisplayInnerSnapDigit={false}
              snapDirections={SNAP_POINTS}
              elementSnapDirections={SNAP_POINTS}
              position={100}
              keepRatio={true}
              draggable={true}
              rotatable={true}
              resizable={true}
              snappable={true}
              rotationPosition={'bottom'}
              className={'layer-controls'}
              renderDirections={['nw', 'ne', 'sw', 'se']}
              defaultGroupRotate={frameRotation}
              defaultGroupOrigin={'50% 50%'}
              originRelative={true}
              throttleResize={1}
              snapThreshold={2}
              throttleDrag={0}
              verticalGuidelines={verticalGuidelines}
              horizontalGuidelines={horizontalGuidelines}
              elementGuidelines={elementGuidelines}
              throttleRotate={0}
              startDragRotate={0}
              throttleDragRotate={0}
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
        in={!moveableActionInProgress}
        timeout={500}
        classNames="multiselect-menu-fade"
        appear
        key={targets.length}
      > */}
      {!moveableActionInProgress && editorParent && createPortal(<EditorMultipleLayersMenu />, editorParent)}
      {/* </CSSTransition> */}
    </>
  );
};

export default memo(MultiSelect);
