import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { getNewBackground } from '../../../../../utils/colorUtils';

const OutlinkElementWrapper = styled.div`
  position: absolute;
  top: 96.5%;
  width: 100%;
  height: auto;
  z-index: ${({ zIndex }) => zIndex};
`;

const OutlinkElementInnerWrapper = styled.div`
  width: 100%;
  position: relative;
  display: grid;
  height: 100%;
  font-size: ${({ viewHeight }) => `calc(2.7596 * ${viewHeight}px)`};
`;

const OutlinkElement = styled.div.attrs(({ color, border, background, borderRadius }) => ({
  style: {
    color,
    border,
    background,
    borderRadius,
  },
}))`
  display: flex;
  align-items: center;
  margin: auto;
  padding: 0.5em 0.5em;
  font-size: 1em;
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  letter-spacing: 0.3px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-decoration: none;
  text-align: center;
  cursor: default;
  transform-origin: center;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 10%;
  max-width: calc(100% - 64px);
  box-sizing: content-box;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
`;

const ArrowIcon = styled.svg`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: ${({ bottom }) => (typeof bottom === 'number' ? `${bottom}em` : bottom)};
  filter: drop-shadow(0px 2px 6px rgba(0, 0, 0, 0.3));
`;

const DefaultIcon = styled.svg`
  width: 1.5em;
  height: 1.5em;
`;

const OutlinkText = styled.span`
  padding: ${({ padding }) => padding};
`;

const UploadedIconWrapper = styled.div`
  width: 1.5em;
  height: 1.5em;
  border-radius: 50%;
  overflow: hidden;
`;

const UploadedIcon = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const OutlinkLayer = ({
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
    <OutlinkElementWrapper zIndex={layer.position}>
      <OutlinkElementInnerWrapper viewWidth={viewWidth} viewHeight={viewHeight}>
        <ArrowIcon bottom="2.8em" viewBox="0 0 20 8" width="1.25em" height="0.5em">
          <path
            fill={getNewBackground(layer.settings.layerSettings.shapeStyles.fillColor)}
            d="m18 7.7-.7-.2-7.3-4-7.3 4c-.7.4-1.6.2-2-.6-.4-.7-.1-1.6.6-2l8-4.4a2 2 0 0 1 1.5 0l8 4.4c.7.4 1 1.3.6 2-.4.5-.9.8-1.4.8z"
          />
        </ArrowIcon>

        <OutlinkElement
          {...(isActive && { ref: ctaLayerRef })}
          border={
            layer.settings.layerSettings.shapeStyles.relativeThickness +
            'px solid ' +
            layer.settings.layerSettings.shapeStyles.borderColor.leftColor
          }
          borderRadius={Number(layer.settings.layerSettings.shapeStyles.round) / 16 + 'em'}
          color={layer.settings?.ctaLayerSettings?.fontColor ?? '#000000'}
          background={getNewBackground(layer.settings.layerSettings.shapeStyles.fillColor)}
          onMouseDown={onMouseDown}
        >
          {layer.content?.image?.url ? (
            <UploadedIconWrapper>
              <UploadedIcon src={layer.content.image.url} />
            </UploadedIconWrapper>
          ) : (
            <></>
          )}
          <OutlinkText padding={`0 ${0.5}em 0 ${0.5}em`}>
            {layer.settings?.ctaLayerSettings?.linkTitle ?? ''}
          </OutlinkText>
        </OutlinkElement>
      </OutlinkElementInnerWrapper>
    </OutlinkElementWrapper>
  );
};

export default memo(OutlinkLayer);
