import { memo, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { whiteRGBA } from '../../../config/constants';
import { IColorType } from '../../../interfaces/colors';
import { getNewBackground } from '../../../utils/colorUtils';
import { toRGBString } from '../../../utils/parseColors';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: ${({ $size }) => `${$size}px`};
  width: ${({ $size }) => `${$size}px`};
  ${({ $isFocused, $lightenBorder }) =>
    $isFocused
      ? 'border: 1px solid var(--white-20);'
      : `border: 1px solid var(--shade-${$lightenBorder ? '500' : '700'}-85);`}
  border-radius: 6px;
  transition: 0.12s ease;
  &:hover {
    border-color: var(--shade-300);
  }
  &:focus,
  &:focus-within {
    border-color: var(--white-20);
  }
`;

const ColorPickerBlockBackground = styled.div`
  background: ${({ bulletFocused }) => (bulletFocused ? 'var(--primary)' : `var(--default-editor-bg)`)};
  display: inline-block;
  position: relative;
  width: ${({ $size }) => `${$size - ($size * 18.75) / 100}px`};
  height: ${({ $size }) => `${$size - ($size * 18.75) / 100}px`};
  border-radius: 5px;
`;

const StyledColorPickerBlock = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ $size }) => `${$size - ($size * 18.75) / 100}px`};
  height: ${({ $size }) => `${$size - ($size * 18.75) / 100}px`};
  border-radius: 4px;
  ${({ isDefaultColor }) =>
    isDefaultColor &&
    css`
      &::before {
        display: block;
        position: absolute;
        content: '';
        width: 26px;
        height: 2px;
        top: 50%;
        left: 0;
        transform: translateY(-50%) rotate(-45deg);
        background: var(--primary);
      }
    `};
`;

const ColorPickerBlock = ({
  isPickerOpen,
  type,
  color,
  colorType,
  defaultLeftColor,
  leftColorPercent,
  rightColorPercent,
  onClick,
  bulletFocused,
  size = 32,
  lightenBorder,
}) => {
  const leftColorStringified = toRGBString(color.leftColor);
  const rightColorStringified = toRGBString(color.rightColor);

  const backgroundColor = useMemo(
    () =>
      getNewBackground({
        type,
        leftColor: leftColorStringified,
        rightColor: rightColorStringified,
        leftColorPercent,
        rightColorPercent,
        angle: 90,
        horizontalDirection: 50,
        verticalDirection: 50,
      }),
    [leftColorPercent, leftColorStringified, rightColorPercent, rightColorStringified, type],
  );

  const isDefaultColor = backgroundColor === defaultLeftColor;

  return (
    <Wrapper $isFocused={isPickerOpen} $lightenBorder={lightenBorder} onClick={onClick} $size={size}>
      <ColorPickerBlockBackground bulletFocused={bulletFocused} $size={size}>
        <StyledColorPickerBlock
          $size={size}
          style={{ background: isDefaultColor && colorType === IColorType.BgColor ? whiteRGBA : backgroundColor }}
          isDefaultColor={isDefaultColor && colorType === IColorType.BgColor}
        />
      </ColorPickerBlockBackground>
    </Wrapper>
  );
};

export default memo(ColorPickerBlock);
