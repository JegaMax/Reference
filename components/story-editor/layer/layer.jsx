import EditorLayerMenu from 'components/editor-layer-menu';
import { LAYERS_WITHOUT_MOVEABLE, SNAP_POINTS, STORY_DELIMINATOR } from 'config/constants';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { batch } from 'react-redux';
import { parseClip } from 'utils/croppingUtils';
import { renderDirections } from 'utils/layerUtils';
import { EDITOR_LAYER_CURSOR } from '../../../config/constants';
import { layerTypes } from '../../../interfaces/layer-types';
import {
  clearAboveSnappedLayers,
  clearBelowSnappedLayers,
  clearSnappedLayers, makeSelectCurrentLayerSnappedLayers,
  makeSelectCurrentLayerSnappedToLayers,
  setFilteredActiveLayerPropsArrayInStore,
  updateAboveSnappedLayers,
  updateBelowSnappedLayers,
  updateTextLayersOffset
} from '../../../appredux/features/amp-story/ampStorySlice';
import { setSizeProportionWithParams } from '../../../appredux/features/editor/layer-setting/layerSettingSlice';
import { calculateAngle, isMediaLayer } from '../../../utils/editorUtils';
import Layers from './components/layers';
import Styled from './components/styled-layer';
import StyledMoveable from './components/styled-moveable';

import {
  setIsCroppingMode,
  setIsEditorContextMenuOpen,
  toggleEditorLayerMenuVisibility
} from '../../../appredux/features/editor/helpers/helpersSlice';

const Layer = ({
  layer,
  activeLayer,
  keepRatio,
  isActive,
  // isSelected,
  editorWidth,
  editorHeight,
  slidePosition,
  areAnimationsRunning,
  ctaLayerRef,
  handleLayerClick,
  handleLayerChange,
  handleBatchLayerChange,
  isTextReadOnly,
  shiftHeld,
  containerRef,
}) => {
  const innerPlaceholder = document.getElementById('editor-inner-placeholder');
  const editorParent = document.getElementById('editor')?.parentElement;

  const selectCurrentLayerSnappedLayers = useMemo(makeSelectCurrentLayerSnappedLayers, []);
  const selectCurrentLayerSnappedToLayers = useMemo(makeSelectCurrentLayerSnappedToLayers, []);

  const dispatch = useAppDispatch();

  const isCroppingMode = useAppSelector((state) => state.helpers.isCroppingMode);
  const newLayerPosition = useAppSelector((state) => state.helpers.newLayerPosition);
  const activeLayerPosition = useAppSelector((state) => state.ampStory.present.activeLayerPosition);
  const isMuted = useAppSelector((state) => state.ampStory.present.isMuted);
  const currentLayerSnappedLayers = useAppSelector((state) => selectCurrentLayerSnappedLayers(state, layer._id));
  const currentLayerSnappedToLayers = useAppSelector((state) => selectCurrentLayerSnappedToLayers(state, layer._id));

  const isCurrentLayerActive = useMemo(
    () => layer.position === activeLayer?.position && layer?._id === activeLayer?._id,
    [activeLayer?._id, activeLayer?.position, layer?._id, layer.position],
  );
  const currentLayer = useMemo(() => (isCurrentLayerActive ? activeLayer : layer), [
    isCurrentLayerActive,
    activeLayer,
    layer,
  ]);
  const canUseMoveable = useMemo(
    () =>
      (!layer?.settings?.generalSettings?.locked && isActive && !isCroppingMode) ||
      (!layer?.settings?.generalSettings?.locked && !isActive),
    [isActive, isCroppingMode, layer?.settings?.generalSettings?.locked],
  );
  const thickness = useMemo(() => {
    return (
      currentLayer.settings.layerSettings.shapeStyles.relativeThickness ??
      currentLayer.settings.layerSettings.shapeStyles.thickness
    );
  }, [
    currentLayer.settings.layerSettings.shapeStyles.thickness,
    currentLayer.settings.layerSettings.shapeStyles?.relativeThickness,
  ]);
  const zoom = useMemo(() => (layer.settings.layerSettings.fullscreen ? 0 : 1), [
    layer.settings.layerSettings.fullscreen,
  ]);
  const directions = useMemo(() => renderDirections(currentLayer.type), [currentLayer.type]);
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

  const [_, forceUpdate] = useState(0);
  const [cursor, setCursor] = useState(EDITOR_LAYER_CURSOR.MOVE);
  const [target, setTarget] = useState();
  const [width, setWidth] = useState(currentLayer.settings.layerSettings.width);
  const [height, setHeight] = useState(currentLayer.settings.layerSettings.height);

  const [rotate, setRotate] = useState(currentLayer.settings.generalSettings.rotate);
  const [offsetX, setOffsetX] = useState(Number(currentLayer.settings.generalSettings.offsetX));
  const [offsetY, setOffsetY] = useState(Number(currentLayer.settings.generalSettings.offsetY));

  const [isNewTextLayer, setIsNewTextLayer] = useState(
    layer?.type === layerTypes.HTML && layer?.position === newLayerPosition,
  );
  const [elementGuidelines, setElementGuidelines] = useState([]);
  const moveableRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  const [showLines, setShowLines] = useState(false);

  const attachReference = (e) => {
    if (e) {
      moveableRef.current = e;
    }
  };

  const handleOnSnap = useCallback(
    ({ elements }) => {
      if (layer.type !== layerTypes.HTML) {
        return;
      }

      if (elements.length === 0 && (currentLayerSnappedLayers?.length > 0 || currentLayerSnappedToLayers?.length > 0)) {
        dispatch(clearSnappedLayers(layer._id));
        return;
      }

      // We have snap elements
      if (elements.length > 0) {
        // Current element snap points
        const { left, center, right } = {
          left: offsetX,
          center: offsetX + width / 2,
          right: offsetX + width,
        };

        // Filter out horizontal snaps and
        // sort above and below items
        const { above, below, aboveForUpdate, belowForUpdate } = elements?.reduce(
          (acc, element) => {
            const { type, pos, elementRect } = element;
            const { rect } = elementRect || {};

            // We care only about vertical snaps
            if (
              type === 'vertical' &&
              rect?.left !== undefined &&
              rect?.right !== undefined &&
              rect?.center !== undefined
            ) {
              // Check if it's pure left, center or right snap
              let snapLocation = null;

              if (Math.abs(pos[0] - rect.left) <= 1 && Math.abs(pos[0] - left) <= 1) {
                snapLocation = 'left';
              }
              if (Math.abs(pos[0] - rect.center) <= 1 && Math.abs(pos[0] - center) <= 1) {
                snapLocation = 'center';
              }
              if (Math.abs(pos[0] - rect.right) <= 1 && Math.abs(pos[0] - right) <= 1) {
                snapLocation = 'right';
              }

              const _id = element.element?.getAttribute('id')?.split('layer-')?.[1];

              if (snapLocation !== null && _id) {
                if (pos[1] < offsetY) {
                  acc.above.push({ _id, snapLocation });
                  if (!currentLayerSnappedToLayers?.includes(_id)) {
                    acc.aboveForUpdate.push({ _id, snapLocation });
                  }
                  return acc;
                }

                acc.below.push({ _id, snapLocation });
                if (!currentLayerSnappedLayers?.includes(_id)) {
                  acc.belowForUpdate.push({ _id, snapLocation });
                }
                return acc;
              }
            }
            return acc;
          },
          { above: [], below: [], aboveForUpdate: [], belowForUpdate: [] },
        );

        if (aboveForUpdate.length > 0) {
          dispatch(updateAboveSnappedLayers({ layerId: layer._id, above }));
        } else if (above.length === 0 && currentLayerSnappedToLayers?.length > 0) {
          dispatch(clearAboveSnappedLayers(layer._id));
        }

        if (belowForUpdate.length > 0) {
          dispatch(updateBelowSnappedLayers({ layerId: layer._id, below }));
        } else if (below.length === 0 && currentLayerSnappedLayers?.length > 0) {
          dispatch(clearBelowSnappedLayers(layer._id));
        }
      }
    },
    [currentLayerSnappedLayers, currentLayerSnappedToLayers, dispatch, layer._id, layer.type, offsetX, offsetY, width],
  );

  const onDoubleClick = () => {
    if (isTextReadOnly) {
      return;
    }

    if (currentLayer.type === layerTypes.HTML) {
      setCursor(EDITOR_LAYER_CURSOR.TEXT);
    }
    if (
      isMediaLayer(currentLayer?.type) &&
      !currentLayer?.settings?.generalSettings?.locked &&
      !currentLayer?.settings?.layerSettings?.fullscreen
    ) {
      setCursor(EDITOR_LAYER_CURSOR.AUTO);
      dispatch(setIsCroppingMode(true));
    }
  };

  const onContainerMouseHover = (isHovered) => () => {
    setIsHovered(isHovered);
  };

  const onBlur = () => setCursor(EDITOR_LAYER_CURSOR.MOVE);

  const handleHeightUpdate = useCallback(
    (newHeight, layerId, skipSnappedLayers) => {
      if (!isActive || isTextReadOnly) {
        return;
      }

      if (typeof slidePosition === 'number' && slidePosition > -1) {
        const fields = [
          {
            position: currentLayer.position,
            field: 'settings.layerSettings.height',
            value: newHeight,
          },
        ];

        dispatch(setFilteredActiveLayerPropsArrayInStore(fields));
        setHeight(newHeight);

        if (
          height !== newHeight &&
          currentLayerSnappedLayers &&
          currentLayerSnappedLayers?.length > 0 &&
          !skipSnappedLayers
        ) {
          const delta = newHeight - height;

          // console.log('called ');
          // console.log({ newHeight, height });

          dispatch(updateTextLayersOffset({ layers: currentLayerSnappedLayers, delta }));
        }
      }
    },
    [currentLayerSnappedLayers, dispatch, height, isActive, isTextReadOnly, currentLayer.position, slidePosition],
  );

  const onRotateStart = ({ set }) => {
    if (isTextReadOnly) {
      return;
    }

    set(rotate);
    dispatch(toggleEditorLayerMenuVisibility(false));
  };

  const onRotate = (event) => {
    const { beforeRotate } = event;
    if (!showLines) {
      setShowLines(true);
    }

    let value = calculateAngle(beforeRotate);

    const magnet = Math.round(Math.abs(beforeRotate % 45));

    if (magnet > 40 || magnet < 6) {
      value = calculateAngle(Math.round(beforeRotate / 45) * 45);
    }

    setRotate(value);
  };

  const onRotateEnd = () => {
    handleLayerChange({ field: 'settings.generalSettings.rotate', value: rotate });
    setShowLines(false);
  };

  const onResizeStart = ({ target, set, setOrigin, dragStart }) => {
    if (isTextReadOnly) {
      return;
    }

    dispatch(toggleEditorLayerMenuVisibility(false));
    // Set origin if transform-orgin use %.
    setOrigin(['%', '%']);

    // If cssSize and offsetSize are different, set cssSize. (no box-sizing)
    const style = window.getComputedStyle(target);
    const cssWidth = parseFloat(style.width) - 2 * thickness;
    const cssHeight = parseFloat(style.height) - 2 * thickness;
    set([cssWidth, cssHeight]);

    // If a drag event has already occurred, there is no dragStart.
    dragStart && dragStart.set([offsetX, offsetY]);
  };

  const onResize = useCallback(
    ({ width: newWidth, height: newHeight, drag }) => {
      if (!showLines) {
        setShowLines(true);
      }

      const { beforeTranslate } = drag;

      const changedWidth = newWidth <= 0 ? 1 : newWidth;
      const changedHeight = newHeight <= 0 ? 1 : newHeight;

      setWidth(changedWidth);
      setHeight(changedHeight);

      if (currentLayer.type === layerTypes.HTML) {
        setOffsetX(Math.round(beforeTranslate[0]));
        return;
      }

      setOffsetX(Math.round(beforeTranslate[0]));
      setOffsetY(Math.round(beforeTranslate[1]));
    },
    [currentLayer.type, showLines],
  );

  const onResizeEnd = () => {
    let newOriginalWidth = null;
    let newOriginalHeight = null;
    let parsedClip = null;
    const mappedClip = [];
    let mappedTranslate = null;
    let mappedClipForRender = null;
    const { cropSettings } = layer.settings;
    if (cropSettings) {
      const { frame } = cropSettings;
      parsedClip = parseClip(frame.clipStyle);
      const croppedWidth = cropSettings.originalWidth - parsedClip[1] - parsedClip[3];
      const croppedHeight = cropSettings.originalHeight - parsedClip[0] - parsedClip[2];
      const addToOriginalWidth = croppedWidth / width;
      const addToOriginalHeight = croppedHeight / height;
      newOriginalWidth = +cropSettings.originalWidth / addToOriginalWidth;
      newOriginalHeight = +cropSettings.originalHeight / addToOriginalHeight;
      mappedClipForRender = parsedClip.map((elm, i) => {
        if (i === 0 || i === 2) {
          mappedClip.push(elm / addToOriginalHeight);
          return `${elm / addToOriginalHeight}px`;
        }
        mappedClip.push(elm / addToOriginalWidth);
        return `${elm / addToOriginalWidth}px`;
      });
      mappedTranslate = frame.translate.map((elm) => {
        if (elm !== 0) {
          return elm / addToOriginalWidth;
        }
        return elm;
      });
    }

    handleBatchLayerChange([
      { field: 'settings.layerSettings.height', value: height },
      { field: 'settings.layerSettings.width', value: width },
      { field: 'settings.generalSettings.offsetX', value: offsetX },
      { field: 'settings.generalSettings.offsetY', value: offsetY },
      ...(cropSettings
        ? [
            {
              field: 'settings.cropSettings.originalWidth',
              value: newOriginalWidth,
            },
            {
              field: 'settings.cropSettings.originalHeight',
              value: newOriginalHeight,
            },
            { field: 'settings.cropSettings.frame.clipStyle', value: `inset(${mappedClipForRender?.join(' ')})` },
            { field: 'settings.cropSettings.frame.translate', value: mappedTranslate },
          ]
        : []),
    ]);
    dispatch(setSizeProportionWithParams({ width, height }));
    setShowLines(false);
  };

  const onLayerClick = (e) => {
    e.stopPropagation();
    handleLayerClick(currentLayer.position);
  };

  // const debouncedHandleDragging = useCallback(
  //   debounce((dragging) => {
  //     handleDragging(dragging);
  //   }, 400),
  //   [],
  // );

  const onDragStart = useCallback(
    ({ set }) => {
      if (isTextReadOnly) {
        return;
      }

      set([offsetX, offsetY]);
      batch(() => {
        dispatch(toggleEditorLayerMenuVisibility(false));
        dispatch(setIsEditorContextMenuOpen(false));
      });
    },
    [dispatch, isTextReadOnly, offsetX, offsetY],
  );

  const onDrag = useCallback(
    ({ beforeTranslate }) => {
      if (!isActive) {
        return;
      }

      if (!showLines) {
        setShowLines(true);
      }

      const newOffsetX = Math.round(beforeTranslate[0]);
      /** When the layer is full screen and is at editor's boundaries
     it's movement to left and right respectively are restricted */
      if (
        currentLayer.settings.layerSettings.fullscreen &&
        ((newOffsetX > 0 && newOffsetX > offsetX) ||
          (newOffsetX < 0 && newOffsetX < Math.round(Number(editorWidth)) - width))
      ) {
        return;
      }

      setOffsetX(newOffsetX);

      const newOffsetY = Math.round(beforeTranslate[1]);

      if (
        currentLayer.settings.layerSettings.fullscreen &&
        ((newOffsetY > 0 && newOffsetY > offsetY) ||
          (newOffsetY < 0 && newOffsetY < Math.round(Number(editorHeight)) - height))
      ) {
        return;
      }

      /** When the layer is full screen it cannot move on the Y axis
     only when the image  in landscape mode */
      if (
        !currentLayer.settings.layerSettings.fullscreen ||
        (currentLayer.settings.layerSettings.fullscreen && currentLayer.settings.layerSettings.height > editorHeight)
      ) {
        setOffsetY(newOffsetY);
      }
    },
    [
      currentLayer.settings.layerSettings.fullscreen,
      currentLayer.settings.layerSettings.height,
      editorHeight,
      editorWidth,
      height,
      isActive,
      offsetX,
      offsetY,
      showLines,
      width,
    ],
  );

  const onDragEnd = useCallback(() => {
    if (isTextReadOnly) {
      return;
    }

    const batchArray = [
      { field: 'settings.generalSettings.offsetX', value: offsetX },
      { field: 'settings.generalSettings.offsetY', value: offsetY },
    ];

    handleBatchLayerChange(batchArray);

    // debouncedHandleDragging(false);
    dispatch(toggleEditorLayerMenuVisibility(true));
    setShowLines(false);
  }, [dispatch, handleBatchLayerChange, isTextReadOnly, offsetX, offsetY]);

  // Set moveable target when layer changes
  useEffect(() => {
    setTarget(document.getElementById(`layer-${currentLayer._id.toString()}`));
  }, [currentLayer]);

  // Sync rotation
  useEffect(() => {
    setRotate(Number(currentLayer.settings.generalSettings.rotate));
  }, [currentLayer.settings.generalSettings.rotate]);

  // Sync offset X
  useEffect(() => {
    setOffsetX(Number(currentLayer.settings.generalSettings.offsetX));
  }, [currentLayer.settings.generalSettings.offsetX]);

  // Sync offset Y
  useEffect(() => {
    setOffsetY(Number(currentLayer.settings.generalSettings.offsetY));
  }, [currentLayer.settings.generalSettings.offsetY]);

  // Sync width
  useEffect(() => {
    setWidth(Number(currentLayer.settings.layerSettings.width));
  }, [currentLayer.settings.layerSettings.width]);

  // Sync height
  useEffect(() => {
    setHeight(Number(currentLayer.settings.layerSettings.height));
  }, [currentLayer.settings.layerSettings.height]);

  // Sync sidebar settings
  useEffect(() => {
    if (!moveableRef.current?.getManager().isDragging()) {
      moveableRef.current?.updateRect();
    }
  }, [offsetX, offsetY, width, height, rotate]);

  // Sync moveable frame when fonts load (prob height change)
  useEffect(() => {
    (document ).fonts.onloadingdone = function () {
      forceUpdate((v) => v + 1);
      moveableRef.current?.updateRect('End');
    };

    return () => {
      (document ).fonts.onloadingdone = null;
    };
  }, []);

  // Set edit mode on when new text layer is added
  useEffect(() => {
    if (
      isActive &&
      currentLayer.type === layerTypes.HTML &&
      currentLayer.position === newLayerPosition &&
      cursor === EDITOR_LAYER_CURSOR.MOVE &&
      isNewTextLayer
    ) {
      setIsNewTextLayer(false);
      setCursor(EDITOR_LAYER_CURSOR.TEXT);
    }
  }, [isActive, currentLayer, newLayerPosition, cursor, isNewTextLayer]);

  // Reset cursor when layer different than text is added
  useEffect(() => {
    setCursor(EDITOR_LAYER_CURSOR.MOVE);
  }, [newLayerPosition]);

  // Reset cursor for unactive layers
  useEffect(() => {
    if (currentLayer?.type === layerTypes.HTML && currentLayer?.position !== activeLayerPosition) {
      setCursor(EDITOR_LAYER_CURSOR.MOVE);
    }
  }, [currentLayer, activeLayerPosition]);

  // Set guidelines when layer selected
  useEffect(() => {
    if (isCurrentLayerActive && moveableRef.current) {
      const target = moveableRef.current?.props?.target;
      const container = target?.parentElement;

      const nodeList = container?.querySelectorAll(':scope > [id^=layer]');
      const groups = container?.querySelectorAll('.moveable-area');
      const guideLines = [...(nodeList ?? []), ...(groups ?? [])]?.filter((elm) => elm.id !== target.id);
      setElementGuidelines(guideLines);
    }
  }, [isCurrentLayerActive]);

  // Group layers have different structure
  if (currentLayer.type === layerTypes.GROUP) {
    return (
      <Layers.Group
        layer={currentLayer}
        isActive={isActive}
        verticalGuidelines={verticalGuidelines}
        horizontalGuidelines={horizontalGuidelines}
        handleBatchLayerChange={handleBatchLayerChange}
        handleLayerClick={handleLayerClick}
        slidePosition={slidePosition}
        isPreviewMode={isTextReadOnly}
        editorWidth={editorWidth}
        editorHeight={editorHeight}
        areAnimationsRunning={areAnimationsRunning}
        isTextReadOnly={isTextReadOnly}
        shiftHeld={shiftHeld}
        containerRef={containerRef}
      />
    );
  }

  // Text is in edit mode and needs to overflow from editor container
  if (cursor === 'text' && currentLayer.type === layerTypes.HTML && !isTextReadOnly && innerPlaceholder) {
    return createPortal(
      <>
        <Styled.LayerContainer
          cursor={cursor}
          isActive={isActive}
          zIndex={currentLayer.position}
          id={`layer-${currentLayer._id.toString()}`}
          opacity={Number(currentLayer.settings.generalSettings.opacity) / 100}
          // Correction in width because of the frame
          width={width + 2 * thickness + 2}
          transform={`translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`}
          height={height + 2 * thickness}
          onBlur={onBlur}
          onMouseDown={onLayerClick}
          onDoubleClick={onDoubleClick}
          onMouseEnter={onContainerMouseHover(true)}
          onMouseLeave={onContainerMouseHover(false)}
          skipPointerEvents={isCroppingMode}
          // Default title offset
          top="25px"
          // Default title offset
          left="-1px"
          // Remove moveable and add regular border
          border="1px solid var(--primary)"
        >
          <Styled.AnimationContainer
            display={currentLayer?.type === layerTypes.GRADIENTS ? 'flex' : undefined}
            width={width}
            height={height}
            rotate={rotate}
            offsetX={offsetX}
            offsetY={offsetY}
            containerWidth={editorWidth}
            containerHeight={editorHeight}
            animateIn={currentLayer.settings.animateIn}
            animateInDelay={currentLayer.settings.animateInDelay}
            animateInDuration={currentLayer.settings.animateInDuration}
            animateOut={currentLayer.settings.animateOut}
            animateOutDelay={currentLayer.settings.animateOutDelay}
            animateOutDuration={currentLayer.settings.animateOutDuration}
            areAnimationsRunning={areAnimationsRunning}
            thickness={thickness}
            isFullscreen={currentLayer.settings.layerSettings.fullscreen}
          >
            <>
              <OutsideClickHandler
                onOutsideClick={() => {
                  setCursor(EDITOR_LAYER_CURSOR.MOVE);
                }}
              >
                <Layers.Text
                  isActive={isActive}
                  currentWidth={width}
                  currentHeight={height}
                  layer={currentLayer}
                  editorWidth={editorWidth}
                  editorHeight={editorHeight}
                  isReadOnly={cursor !== 'text'}
                  handleHeightUpdate={handleHeightUpdate}
                  handleBatchLayerChange={handleBatchLayerChange}
                />
              </OutsideClickHandler>
            </>
          </Styled.AnimationContainer>
        </Styled.LayerContainer>
        {isActive && !showLines && (
          <EditorLayerMenu
            layer={currentLayer}
            handleBatchLayerChange={handleBatchLayerChange}
            offsetCorrections={[26]}
          />
        )}
      </>,
      innerPlaceholder,
    );
  }

  return (
    <>
      <Styled.LayerContainer
        cursor={cursor}
        isActive={isActive}
        zIndex={currentLayer.position}
        id={`layer-${currentLayer._id.toString()}`}
        opacity={Number(currentLayer.settings.generalSettings.opacity) / 100}
        width={width + 2 * thickness}
        transform={`translate(${offsetX}px, ${offsetY}px) rotate(${rotate}deg)`}
        height={height + 2 * thickness}
        onBlur={onBlur}
        onMouseDown={onLayerClick}
        onDoubleClick={onDoubleClick}
        onMouseEnter={onContainerMouseHover(true)}
        onMouseLeave={onContainerMouseHover(false)}
        skipPointerEvents={isCroppingMode}
      >
        <Styled.AnimationContainer
          display={currentLayer?.type === layerTypes.GRADIENTS ? 'flex' : undefined}
          width={width}
          height={height}
          rotate={rotate}
          offsetX={offsetX}
          offsetY={offsetY}
          containerWidth={editorWidth}
          containerHeight={editorHeight}
          animateIn={currentLayer.settings.animateIn}
          animateInDelay={currentLayer.settings.animateInDelay}
          animateInDuration={currentLayer.settings.animateInDuration}
          animateOut={currentLayer.settings.animateOut}
          animateOutDelay={currentLayer.settings.animateOutDelay}
          animateOutDuration={currentLayer.settings.animateOutDuration}
          areAnimationsRunning={areAnimationsRunning}
          thickness={thickness}
          isFullscreen={currentLayer.settings.layerSettings.fullscreen}
        >
          {currentLayer.type === layerTypes.HTML && (
            <>
              {isTextReadOnly ? (
                <Layers.TextPreview
                  editorWidth={+editorWidth}
                  editorHeight={+editorHeight}
                  shadow={layer.settings.generalSettings.shadow}
                  layer={layer}
                />
              ) : (
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setCursor(EDITOR_LAYER_CURSOR.MOVE);
                  }}
                >
                  <Layers.Text
                    isActive={isActive}
                    currentWidth={width}
                    currentHeight={height}
                    layer={currentLayer}
                    editorWidth={editorWidth}
                    editorHeight={editorHeight}
                    isReadOnly={cursor !== 'text'}
                    handleHeightUpdate={handleHeightUpdate}
                    handleBatchLayerChange={handleBatchLayerChange}
                  />
                </OutsideClickHandler>
              )}
            </>
          )}
          {currentLayer.type === layerTypes.VIDEO && (
            <Layers.Video
              isActive={isActive}
              width={width}
              height={height}
              layer={currentLayer}
              slidePosition={slidePosition}
              isMuted={isMuted || isTextReadOnly}
            />
          )}
          {(currentLayer.type === layerTypes.IMAGE || currentLayer.type === layerTypes.GIFS) && (
            <Layers.Image
              isActive={isActive}
              width={width}
              height={height}
              layer={currentLayer}
              slidePosition={slidePosition}
            />
          )}

          {currentLayer.type === layerTypes.SHAPE && (
            <Layers.Shape layer={currentLayer} width={width} height={height} slidePosition={slidePosition} />
          )}
          {currentLayer.type === layerTypes.GRADIENTS && (
            <Layers.Gradient
              handleBatchLayerChange={handleBatchLayerChange}
              layer={currentLayer}
              isPreview={isTextReadOnly}
            />
          )}
        </Styled.AnimationContainer>
      </Styled.LayerContainer>

      {currentLayer.type === layerTypes.CTA_LINK && (
        <Layers.Cta
          isActive={currentLayer.position === activeLayer?.position}
          ctaLayerRef={ctaLayerRef}
          layer={currentLayer}
          editorWidth={editorWidth}
          editorHeight={editorHeight}
          onMouseDown={onLayerClick}
        />
      )}

      {currentLayer.type === layerTypes.OUTLINK && (
        <Layers.Outlink
          isActive={currentLayer.position === activeLayer?.position}
          ctaLayerRef={ctaLayerRef}
          layer={currentLayer}
          editorWidth={editorWidth}
          editorHeight={editorHeight}
          onMouseDown={onLayerClick}
        />
      )}

      {!LAYERS_WITHOUT_MOVEABLE.includes(currentLayer.type) &&
        !areAnimationsRunning &&
        editorParent &&
        !isTextReadOnly &&
        createPortal(
          <StyledMoveable.Wrapper $isActive={isActive} $isHovered={!showLines && isHovered && !isActive}>
            <StyledMoveable.Frame
              zoom={zoom}
              origin={false}
              target={target}
              throttleDrag={0}
              isDisplaySnapDigit={false}
              isDisplayInnerSnapDigit={false}
              container={target?.parentElement}
              snapDirections={SNAP_POINTS}
              elementSnapDirections={SNAP_POINTS}
              throttleRotate={0}
              throttleResize={0}
              keepRatio={keepRatio}
              ref={attachReference}
              position={currentLayer?.position}
              draggable={canUseMoveable}
              resizable={canUseMoveable}
              rotatable={canUseMoveable}
              snappable={canUseMoveable}
              rotationPosition={'bottom'}
              className={'layer-controls'}
              renderDirections={directions}
              verticalGuidelines={showLines ? verticalGuidelines : []}
              horizontalGuidelines={showLines ? horizontalGuidelines : []}
              elementGuidelines={showLines ? elementGuidelines : []}
              onDrag={onDrag}
              onResize={onResize}
              onRotate={onRotate}
              onDragEnd={onDragEnd}
              onResizeEnd={onResizeEnd}
              onRotateEnd={onRotateEnd}
              onDragStart={onDragStart}
              onRotateStart={onRotateStart}
              onResizeStart={onResizeStart}
              onSnap={handleOnSnap}
              hideDefaultLines={isCroppingMode}
            />
          </StyledMoveable.Wrapper>,
          editorParent,
        )}

      {/* <CSSTransition
        in={isActive && !showLines}
        timeout={500}
        classNames="multiselect-menu-fade"
        appear
        unmountOnExit
        key={`${currentLayer._id}-${isActive}`}
      > */}
      {isActive &&
        !showLines &&
        editorParent &&
        createPortal(
          <EditorLayerMenu layer={currentLayer} handleBatchLayerChange={handleBatchLayerChange} />,
          editorParent,
        )}
      {/* </CSSTransition> */}
    </>
  );
};

export default Layer;
