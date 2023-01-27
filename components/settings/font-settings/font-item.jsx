import { useAppSelector } from 'hooks';
import { DraggableTypes } from 'interfaces/dnd';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled, { css } from 'styled-components';
import { measureText } from 'utils/editorUtils';
import { getFormatedLabel } from './font-styles-module';

const getSize = (key) => {
  switch (key) {
    case 'title':
      return 24;
    case 'headLine':
      return 18;
    case 'subHeadline':
      return 14;
    case 'normalText':
      return 12;
    case 'smallText':
      return 10;
  }
};

export const StyledFontItem = styled.div`
  display: flex;
  min-width: 0;
  max-width: 100%;
  align-items: center;
  height: 48px;
  overflow: hidden;
  white-space: nowrap;
  justify-content: flex-start;
  padding: 10px 14px;
  color: var(--white);
  background: var(--shade-700);
  cursor: pointer;
  position: relative;
  border-radius: 6px;
  width: 328px;

  &:hover {
    background: var(--shade-500);
  }
  ${({ $isActive }) =>
    $isActive &&
    css`
      background: var(--shade-500);
    `}
`;

const Trim = styled.span`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0 0 0 6px;
`;

const FontItem = ({
  currentPreset,
  presetKey,
  isActive,
  handleSelectPreset,
  isModalShownInEditor,
}) => {
  const clientWidth = useAppSelector((state) => +state.ampStory.present.initialWidth);
  const zoomPercentRatio = useAppSelector((state) => state.helpers.zoomPercent / 100);

  const [textDimensions, setTextDimensions] = useState({
    width: 0,
    height: 0,
    resolved: false,
    zoomPercentRatio,
  });

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DraggableTypes.Layer,
      item: {
        type: layerTypes.HTML,
        _id: presetKey,
        subType: presetKey,
        index: 0,
        width: textDimensions.width,
        height: textDimensions.height,
        preset: currentPreset,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [presetKey, textDimensions.width, textDimensions.height, currentPreset],
  );

  const onClick = () => handleSelectPreset(presetKey);

  const dynamicStyles = useMemo(
    () => ({
      textDecoration: currentPreset.style?.includes('underline') ? 'underline' : 'none',
      fontStyle: currentPreset.style?.includes('italic') ? 'italic' : 'normal',
      fontFamily: currentPreset.fontFamily,
      fontWeight: currentPreset.weight !== 700 && currentPreset.style?.includes('bold') ? 'bold' : currentPreset.weight,
      fontSize: getSize(presetKey),
      opacity: isDragging ? 0 : 1,
    }),
    [currentPreset.fontFamily, currentPreset.style, currentPreset.weight, isDragging, presetKey],
  );

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  useLayoutEffect(() => {
    if (!textDimensions.resolved || textDimensions.zoomPercentRatio !== zoomPercentRatio) {
      const resolveTextDimensions = async () => {
        const fontSize = currentPreset.size;
        const fontFamily = currentPreset.fontFamily;

        const lineHeight = 1.5;
        const sizeConst = (fontSize / 16) * (2.6 * (+clientWidth / 100));

        const singleLineHeight = sizeConst * +lineHeight;
        const maxHeight = singleLineHeight * 2;

        const textMeasurement = await measureText(
          'Type something',
          `${dynamicStyles.fontStyle} ${dynamicStyles.fontWeight} ${sizeConst}px ${fontFamily}`,
        );

        // Add some buffer
        let width = Math.round((textMeasurement?.width ?? 220) * (zoomPercentRatio < 0.75 ? 0.75 : zoomPercentRatio));
        let height = Math.round(singleLineHeight);

        while (width > clientWidth && height < maxHeight) {
          width = Math.round(width * (0.75 / zoomPercentRatio));
          height = Math.round(singleLineHeight + height);
        }

        setTextDimensions({
          width,
          height,
          resolved: true,
          zoomPercentRatio,
        });
      };

      resolveTextDimensions();
    }
  }, [
    clientWidth,
    currentPreset.fontFamily,
    currentPreset.size,
    dynamicStyles.fontStyle,
    dynamicStyles.fontWeight,
    textDimensions.resolved,
    textDimensions.zoomPercentRatio,
    zoomPercentRatio,
  ]);

  return (
    <StyledFontItem ref={drag} $isActive={isActive} onClick={onClick} style={dynamicStyles}>
      {isModalShownInEditor ? (
        `${getFormatedLabel(presetKey)}`
      ) : (
        <>
          {getFormatedLabel(presetKey)}, <Trim>{currentPreset.fontFamily}</Trim>, {currentPreset.size}
        </>
      )}
    </StyledFontItem>
  );
};

export default memo(FontItem);
