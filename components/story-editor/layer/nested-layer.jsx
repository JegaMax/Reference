import EditorLayerMenu from 'components/editor-layer-menu';
import { EDITOR_LAYER_CURSOR } from 'config/constants';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useMemo } from 'react';
import { createPortal } from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import styled from 'styled-components';
import Layers from './components/layers';

// const Container = styled.div`
//   &&& {
//     ${(props) => `
//       min-width: unset;
//       min-height: unset;
//       position: absolute;
//       width: ${props.width}px;
//       height: ${props.height}px;
//       transform: ${props.transform};
//       z-index: ${props.zIndex};
//       opacity: ${props.opacity};
//     `}
//   }
// `;

const Container = styled.div.attrs(({ width, height, zIndex, opacity, transform, visibility }) => ({
  style: {
    width,
    height,
    zIndex,
    opacity,
    transform,
    visibility,
  },
}))`
  &&& {
    position: absolute;
    min-width: unset;
    min-height: unset;
    > div > div {
      min-width: 100%;
      min-height: 100%;
    }
  }
`;

const NestedLayer = ({
  layer,
  parentLayer,
  handleTextLayerOutsideClick,
  handleHeightUpdate,
  slidePosition,
  editorWidth,
  editorHeight,
  cursor,
  isActive,
  isMuted,
  handleBatchLayerChange,
  isTextReadOnly,
  areAnimationsRunning,
}) => {
  const portalHost = document.getElementById('editor')?.parentElement;

  const thickness = useMemo(() => {
    return (
      layer.settings.layerSettings.shapeStyles.relativeThickness ?? layer.settings.layerSettings.shapeStyles.thickness
    );
  }, [layer.settings.layerSettings.shapeStyles.thickness, layer.settings.layerSettings.shapeStyles?.relativeThickness]);

  const { x, y } = useMemo(() => {
    const xCoordinate = Math.round(layer.settings.generalSettings.offsetX);
    const yCoordinate = Math.round(layer.settings.generalSettings.offsetY);

    if (areAnimationsRunning) {
      const parentOffsetX = Math.round(parentLayer.settings.generalSettings.offsetX);
      const parentOffsetY = Math.round(parentLayer.settings.generalSettings.offsetY);

      return { x: xCoordinate - parentOffsetX, y: yCoordinate - parentOffsetY };
    }

    return { x: xCoordinate, y: yCoordinate };
  }, [
    areAnimationsRunning,
    layer.settings.generalSettings.offsetX,
    layer.settings.generalSettings.offsetY,
    parentLayer.settings.generalSettings.offsetX,
    parentLayer.settings.generalSettings.offsetY,
  ]);

  return (
    <>
      <Container
        zIndex={layer.position}
        id={`layer-${layer._id}`}
        data-group={`group-${parentLayer._id}`}
        opacity={Number(layer.settings.generalSettings.opacity) / 100}
        width={layer.settings.layerSettings?.width + 2 * thickness}
        height={layer.settings.layerSettings?.height + 2 * thickness}
        transform={`translate(${x}px, ${y}px) rotate(${layer.settings.generalSettings.rotate}deg)`}
        visibility={layer.settings.layerSettings.isLayerHidden ? 'hidden' : 'visible'}
      >
        {layer.type === layerTypes.HTML && layer?.settings?.editorState && (
          <>
            {isTextReadOnly ? (
              <Layers.TextPreview
                editorWidth={+editorWidth}
                editorHeight={+editorHeight}
                shadow={+layer.settings.generalSettings.shadow}
                layer={layer}
              />
            ) : (
              <OutsideClickHandler onOutsideClick={(e) => handleTextLayerOutsideClick(e, layer._id)}>
                <Layers.Text
                  isActive={isActive}
                  currentWidth={layer.settings.layerSettings?.width}
                  currentHeight={layer.settings.layerSettings?.height}
                  layer={layer}
                  parentLayer={parentLayer}
                  editorWidth={editorWidth}
                  editorHeight={editorHeight}
                  isReadOnly={cursor.type !== EDITOR_LAYER_CURSOR.TEXT || cursor.activeLayer !== layer._id}
                  handleHeightUpdate={handleHeightUpdate}
                  handleBatchLayerChange={handleBatchLayerChange}
                />
              </OutsideClickHandler>
            )}
          </>
        )}

        {layer.type === layerTypes.VIDEO && (
          <Layers.Video
            isActive={isActive}
            width={layer.settings.layerSettings.width}
            height={layer.settings.layerSettings.height}
            layer={layer}
            slidePosition={slidePosition}
            isMuted={isMuted}
            inheritVisibility
          />
        )}
        {(layer.type === layerTypes.IMAGE || layer.type === layerTypes.GIFS) && (
          <Layers.Image
            isActive={isActive}
            width={layer.settings.layerSettings.width}
            height={layer.settings.layerSettings.height}
            layer={layer}
            slidePosition={slidePosition}
            inheritVisibility
          />
        )}
        {layer.type === layerTypes.SHAPE && (
          <Layers.Shape
            layer={layer}
            width={layer.settings.layerSettings?.width}
            height={layer.settings.layerSettings?.height}
            slidePosition={0}
          />
        )}
        {layer.type === layerTypes.GRADIENTS && (
          <Layers.Gradient handleBatchLayerChange={handleBatchLayerChange} layer={layer} parentLayer={parentLayer} />
        )}
      </Container>
      {isActive &&
        portalHost &&
        !isTextReadOnly &&
        createPortal(
          // <CSSTransition
          //   in={isActive}
          //   timeout={500}
          //   classNames="multiselect-menu-fade"
          //   appear
          //   unmountOnExit
          //   key={`${layer._id}-${isActive}`}
          // >
          <EditorLayerMenu layer={layer} parentLayer={parentLayer} handleBatchLayerChange={handleBatchLayerChange} />,
          // </CSSTransition>,
          portalHost,
        )}
    </>
  );
};

export default memo(NestedLayer);
