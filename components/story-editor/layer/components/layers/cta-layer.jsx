import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { getNewBackground } from '../../../../../utils/colorUtils';


const CtaElementWrapper = styled.div`
  position: absolute;
  top: 98%;
  width: 100%;
  height: auto;
  z-index: ${({ zIndex }) => zIndex};
`;

const CtaElementInnerWrapper = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  height: 100%;
`;

const CtaElement = styled.div.attrs(({ color, border, background, borderRadius }) => ({
  style: {
    color,
    border,
    background,
    borderRadius,
  },
}))`
  margin: auto;
  padding: 0.6em 1em;
  font-size: 0.8em;
  font-family: 'Verdana';
  text-decoration: none;
  text-align: center;
  cursor: default;
  transform-origin: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
  max-width: 35%;
  word-wrap: break-word;
  box-sizing: content-box;
  @media screen and (max-width: 1023px) {
    font-size: ${({ viewWidth }) => `calc(3.434 * ${viewWidth}px)`};
  }
  @media (max-width: 1023px) {
    @media screen and (min-aspect-ratio: 9/12) {
      font-size: ${({ viewHeight }) => `calc(1.9596 * ${viewHeight}px)`};
    }

    @media screen and (max-aspect-ratio: 9/20) {
      font-size: ${({ viewHeight }) => `calc(3.48 * ${viewHeight}px)`};
    }
  }
  @media screen and (min-width: 1024px) {
    font-size: ${({ viewHeight }) => `calc(1.9596 * ${viewHeight}px)`};
  }
`;

const CtaLayer = ({
  isActive,
  layer,
  editorWidth,
  editorHeight,
  ctaLayerRef,
  onMouseDown,
}) => {
  const viewWidth = useMemo(() => Number(editorWidth) / 100, [editorWidth]);
  const viewHeight = useMemo(() => Number(editorHeight) / 100, [editorHeight]);

  return (
    <CtaElementWrapper zIndex={layer.position}>
      <CtaElementInnerWrapper>
        <CtaElement
          {...(isActive && { ref: ctaLayerRef })}
          border={
            layer.settings.layerSettings.shapeStyles.relativeThickness +
            'px solid ' +
            layer.settings.layerSettings.shapeStyles.borderColor.leftColor
          }
          borderRadius={Number(layer.settings.layerSettings.shapeStyles.round) / 16 + 'em'}
          color={layer.settings?.ctaLayerSettings?.fontColor ?? '#000000'}
          viewWidth={viewWidth}
          viewHeight={viewHeight}
          background={getNewBackground(layer.settings.layerSettings.shapeStyles.fillColor)}
          onMouseDown={onMouseDown}
        >
          {layer.settings?.ctaLayerSettings?.linkTitle ?? ''}
        </CtaElement>
      </CtaElementInnerWrapper>
    </CtaElementWrapper>
  );
};

export default memo(CtaLayer);
