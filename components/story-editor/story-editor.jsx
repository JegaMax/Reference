import { skipToken } from '@reduxjs/toolkit/dist/query';
import CustomDragLayer from 'components/custom-drag-layer/custom-drag-layer';
import { getFormatedLabel } from 'components/settings/font-settings/font-styles-module';
import { useAppDispatch, useAppSelector } from 'hooks';
import { DraggableTypes } from 'interfaces/dnd';
import { layerTypes } from 'interfaces/layer-types';
import { cloneDeep } from 'lodash';
import { memo, useCallback, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import OutsideClickHandler from 'react-outside-click-handler';
import { batch } from 'react-redux';
import {
  addGoogleFont,
  createNewLayer,
  deleteLayer,
  selectSelectedLayers,
  selectSingleUseLayer,
  setActiveLayerPropsArray
} from 'appredux/features/amp-story/ampStorySlice';
import { selectGif } from 'appredux/features/editor/gif/gifsSlice';
import { toggleGroupLayer } from 'appredux/features/editor/helpers/groupLayerHelperSlice';
import {
  pasteLayer,
  setCurrentTextPresetLabel,
  setLayerCopies,
  setLayerCopyCounter
} from 'appredux/features/editor/helpers/helpersSlice';
import { selectImage } from 'appredux/features/editor/image/imageSlice';
import { addMediaName } from 'appredux/features/media/mediaSlice';
import { useGoogleFontsListQuery, useWorkspaceFontsListQuery } from 'appredux/services/fonts/fonts';
import styled from 'styled-components';
import api from 'utils/api';
import { getNewBackground } from 'utils/colorUtils';
import { generateGradientData, normalizeLayers } from 'utils/editorUtils';
import generateId from 'utils/generateId';
import Layer from './layer';
import MultiSelect from './layer/components/layers/multi-select';

const EditorContainer = styled.div`
  margin: auto;
  overflow: hidden;
  border-radius: 2px;
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  &:focus {
    outline: none;
    border: none;
  }
`;
const EditorContainerOuterWrapper = styled.div``;
const EditorContainerInnerWrapper = styled.div`
  /* background: var(--default-editor-bg); */
  border-radius: 2px;
  /* mask-image: radial-gradient(circle, white 100%, black 100%); */
`;

const StoryEditor = ({
  activeLayer,
  layers,
  keepRatio,
  editorWidth,
  editorHeight,
  containerRef,
  ctaLayerRef,
  backgroundColor,
  activeLayerPosition,
  activeSlidePosition,
  areAnimationsRunning,
  shiftHeld,
  onCloseMenu,
  handleLayerClick,
  handleLayerChange,
  handleContainerClick,
  handleContextMenuOpen,
  handleBatchLayerChange,
  handleEditorContainerClick,
  setContainerRefSet,
}) => {
  const dispatch = useAppDispatch();
  const selectedLayers = useAppSelector(selectSelectedLayers);
  const zoomPercent = useAppSelector((state) => state.helpers.zoomPercent);
  const currentSingleUseLayer = useAppSelector(selectSingleUseLayer);
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);

  const { data: googleFonts } = useGoogleFontsListQuery();
  const { data: workspaceFonts } = useWorkspaceFontsListQuery(selectedWorkspaceId ?? skipToken);

  const setContainerReference = (instance) => {
    if (instance) {
      containerRef.current = instance;
      setContainerRefSet(true);
    }
  };

  const createNewDropLayer = useCallback(
    async (
      {
        type,
        image,
        subType,
        width,
        height,
        _id,
        imageContent,
        gifContent,
        presetContent,
        swipeUpContent,
        uploadedMedia,
        preset,
      },
      rawCoordinates,
      containerCoordinates,
    ) => {
      if (rawCoordinates && containerCoordinates) {
        const coordinates = {
          x: rawCoordinates.x - containerCoordinates.left,
          y: rawCoordinates.y - containerCoordinates.top,
        };

        switch (type) {
          case layerTypes.SHAPE: {
            dispatch(
              createNewLayer({
                type,
                shape: subType,
                coordinates,
              }),
            );
            break;
          }
          case layerTypes.GRADIENTS: {
            if (image) {
              const { data } = await api.get(image);
              const svgData = generateGradientData(data);
              const id = generateId();

              dispatch(
                createNewLayer({
                  type,
                  colorObject: svgData?.colorObject,
                  value: image,
                  temporaryId: id,
                  shape: svgData?.parsedShape,
                  coordinates,
                }),
              );
            }
            break;
          }
          case layerTypes.IMAGE: {
            if (imageContent) {
              const temporaryImage = {
                id: generateId(),
                url: imageContent?.urls.regular,
                name: `${_id}.jpg` || '',
                width,
                height,
              };

              batch(() => {
                dispatch(
                  createNewLayer({
                    type: layerTypes.IMAGE,
                    media: temporaryImage,
                    temporaryId: temporaryImage.id,
                    coordinates,
                  }),
                );
                dispatch(selectImage(imageContent, temporaryImage));
              });
            }

            if (uploadedMedia) {
              const media = { ...uploadedMedia, width, height };
              const mediaTitle = uploadedMedia.name ?? '';

              batch(() => {
                dispatch(
                  createNewLayer({
                    type,
                    media,
                    temporaryId: media?.temporaryId ?? media.id,
                    coordinates,
                  }),
                );
                dispatch(addMediaName(mediaTitle));
              });
            }
            break;
          }
          case layerTypes.VIDEO: {
            if (uploadedMedia) {
              const media = { ...uploadedMedia, width, height };
              const mediaTitle = uploadedMedia?.thumbnail?.name ?? '';

              batch(() => {
                dispatch(
                  createNewLayer({
                    type,
                    media,
                    temporaryId: media?.temporaryId ?? media.id,
                    coordinates,
                  }),
                );
                dispatch(addMediaName(mediaTitle));
              });
            }

            break;
          }
          case layerTypes.GIFS: {
            if (gifContent) {
              const temporaryGif = {
                id: generateId(),
                url: gifContent.images.original.webp,
                name: gifContent.slug || gifContent.images.original.webp.split('').pop(),
                width: gifContent.images.original.width,
                height: gifContent.images.original.height,
              };

              batch(() => {
                dispatch(
                  createNewLayer({
                    type: layerTypes.GIFS,
                    media: temporaryGif,
                    temporaryId: temporaryGif.id,
                    coordinates,
                  }),
                );
                dispatch(selectGif(gifContent, temporaryGif));
              });
            }

            break;
          }
          case layerTypes.STICKERS: {
            if (gifContent) {
              const temporarySticker = {
                id: generateId(),
                url: gifContent.images.original.url,
                name: gifContent.slug || gifContent.images.original.url.split('').pop(),
                width: gifContent.images.original.width,
                height: gifContent.images.original.height,
              };

              batch(() => {
                dispatch(
                  createNewLayer({
                    type: layerTypes.STICKERS,
                    media: temporarySticker,
                    temporaryId: temporarySticker.id,
                    coordinates,
                  }),
                );
                dispatch(selectGif(gifContent, temporarySticker));
              });
            }

            break;
          }
          case layerTypes.OUTLINK: {
            if (presetContent && presetContent.layer && googleFonts) {
              const layer = cloneDeep(presetContent.layer);
              const zoomPercentRatio = zoomPercent / 100;

              const scaledDownCoordinates = {
                x: rawCoordinates.x / zoomPercentRatio,
                y: rawCoordinates.y / zoomPercentRatio,
              };

              const scaledDownContainerCoordinates = {
                x: containerCoordinates.left / zoomPercentRatio,
                y: containerCoordinates.top / zoomPercentRatio,
              };

              const adjustedCoordinates = {
                x: scaledDownCoordinates.x - scaledDownContainerCoordinates.x,
                y: scaledDownCoordinates.y - scaledDownContainerCoordinates.y,
              };

              const deltaX = adjustedCoordinates.x - layer.settings.generalSettings.offsetX;
              const deltaY = adjustedCoordinates.y - layer.settings.generalSettings.offsetY;

              layer.settings.generalSettings.offsetX = adjustedCoordinates.x;
              layer.settings.generalSettings.offsetY = adjustedCoordinates.y;

              const slide = {
                layers: [layer],
              };
              const selectedFont = googleFonts?.find((gf) => gf.family === presetContent?.styles?.fontFamily);
              const normalizedSlide = normalizeLayers(slide, undefined, false, { deltaX, deltaY });

              batch(() => {
                dispatch(setLayerCopies({ layerCopies: normalizedSlide.layers, zoomPercent: 100 }));
                dispatch(setLayerCopyCounter(0));
              });
              batch(() => {
                dispatch(pasteLayer(true));
                dispatch(toggleGroupLayer(true));
                dispatch(
                  addGoogleFont({
                    ...selectedFont,
                    style: 'normal',
                  }),
                );
              });
              setTimeout(() => {
                document.getElementById('link-input')?.focus();
              });
            }

            if (swipeUpContent) {
              if (currentSingleUseLayer) {
                dispatch(
                  deleteLayer({
                    slidePosition: activeSlidePosition,
                    layerPositions: [currentSingleUseLayer.position],
                  }),
                );
              }

              dispatch(createNewLayer({ type: layerTypes.OUTLINK }));
              const updates = [
                {
                  field: 'settings.ctaLayerSettings.linkTitle',
                  value: 'Swipe up',
                },
                {
                  field: 'settings.ctaLayerSettings.fontColor',
                  value: swipeUpContent.config.color,
                },
                {
                  field: 'settings.layerSettings.shapeStyles.fillColor.leftColor',
                  value: swipeUpContent.config.background,
                },
              ];

              // if (currentPreset?.config?.logo) {
              //   updates.push(
              //     {
              //       field: 'content.image.url',
              //       value: currentPreset.config.logo,
              //     },
              //     {
              //       field: 'content.image.name',
              //       value: 'logo',
              //     },
              //     {
              //       field: 'content.image.id',
              //       value: generateId(),
              //     },
              //   );
              // }

              dispatch(setActiveLayerPropsArray(updates));
            }
            break;
          }
          case layerTypes.HTML: {
            if (subType && preset) {
              batch(() => {
                dispatch(setCurrentTextPresetLabel(getFormatedLabel(subType)));
                dispatch(
                  createNewLayer({
                    type,
                    presetFontStyles: preset,
                    googleFonts,
                    workspaceFonts,
                    coordinates,
                  }),
                );
              });
            }

            break;
          }
        }
      }

      // if (gradientSvg?.url) {
      //   const { data } = await api.get(gradientSvg.url);
      //   const svgData = generateGradientData(data);
      //   const id = generateId();
      //   dispatch(
      //     createNewLayer({
      //       type: layerTypes.GRADIENTS,
      //       colorObject: svgData?.colorObject,
      //       value: gradientSvg?.url,
      //       temporaryId: id,
      //       shape: svgData?.parsedShape,
      //     }),
      //   );
      //   return;
      // }
      // dispatch(createNewLayer({ type: layerTypes.SHAPE, shape: shapes[index].type }));
    },
    [activeSlidePosition, currentSingleUseLayer, dispatch, googleFonts, workspaceFonts, zoomPercent],
  );

  const onDrop = useCallback(
    (item, monitor) => {
      const coordinates = monitor.getSourceClientOffset();
      const containerCoordinates = containerRef.current?.getBoundingClientRect();

      createNewDropLayer(item, coordinates, containerCoordinates);
    },
    [containerRef, createNewDropLayer],
  );

  // Constant !
  // const onHover = useCallback((item, monitor) => {
  //   console.log(item);
  //   console.log(monitor);
  // }, []);

  const [__, drop] = useDrop(
    () => ({
      accept: DraggableTypes.Layer,
      drop: onDrop,
      // drop: onDrop,
      // hover: onHover,
      // collect: (monitor) => ({
      //   isOver: monitor.isOver(),

      //   // canDrop: monitor.canDrop(),
      // }),
    }),
    [activeSlidePosition, currentSingleUseLayer, googleFonts, workspaceFonts, zoomPercent],
  );

  // React dnd hack for removing cancel drop delay
  const [_, bodyDropRef] = useDrop(() => ({
    accept: DraggableTypes.Layer,
  }));

  useEffect(() => {
    bodyDropRef(document.body);
    return () => {
      bodyDropRef(null);
    };
  });

  return (
    <>
      <CustomDragLayer />
      <EditorContainerOuterWrapper onClick={handleContainerClick} onContextMenu={handleContextMenuOpen}>
        <OutsideClickHandler onOutsideClick={onCloseMenu}>
          <EditorContainerInnerWrapper ref={drop}>
            <EditorContainer
              id={'editor'}
              ref={setContainerReference}
              width={editorWidth}
              height={editorHeight}
              onMouseDown={handleEditorContainerClick}
              tabIndex={-1}
              style={{
                background: getNewBackground(backgroundColor),
              }}
            >
              {layers.length > 0 &&
                layers
                  .filter((layer) => !layer.settings.layerSettings.isLayerHidden)
                  .map((layer, index) => {
                    return (
                      <Layer
                        key={`${layer._id}-${layer.position}-${index}`}
                        layer={layer}
                        activeLayer={activeLayer}
                        keepRatio={keepRatio}
                        editorWidth={editorWidth}
                        editorHeight={editorHeight}
                        slidePosition={activeSlidePosition}
                        areAnimationsRunning={areAnimationsRunning}
                        isActive={activeLayerPosition === layer.position}
                        handleLayerClick={handleLayerClick}
                        handleLayerChange={handleLayerChange}
                        handleBatchLayerChange={handleBatchLayerChange}
                        ctaLayerRef={ctaLayerRef}
                        shiftHeld={shiftHeld}
                        containerRef={containerRef}
                      />
                    );
                  })}

              {!activeLayer && selectedLayers && selectedLayers?.length > 1 && (
                <MultiSelect
                  isShiftHeld={shiftHeld}
                  selectedLayers={selectedLayers}
                  editorWidth={editorWidth}
                  editorHeight={editorHeight}
                  containerRef={containerRef}
                />
              )}
            </EditorContainer>
          </EditorContainerInnerWrapper>
        </OutsideClickHandler>
      </EditorContainerOuterWrapper>
    </>
  );
};

export default memo(StoryEditor);
