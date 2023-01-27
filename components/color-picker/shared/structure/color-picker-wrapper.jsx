import React from 'react';
import styled, { css } from 'styled-components';

const StyledColorPickerWrapper = styled.div`
  position: absolute;
  z-index: 101;
  background: var(--shade-900);
  border: 1px solid var(--shade-700-85);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 12px;
  padding: 22px 24px 33px;
  min-width: 260px;
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: max(90%, 296px);
  top: ${(props) => (props.absoluteTopPosition ? `${props.absoluteTopPosition}%` : '0')};
  transform: ${(props) => (props.translateY ? `translateY(${props.translateY}%)` : '0')};
  right: ${(props) => `calc(${props.absoluteRightPosition ?? 100}% + 8px)`};
  ${({ zIndex, absoluteTopPosition, absoluteRightPosition }) =>
    zIndex !== undefined &&
    css`
      z-index: ${zIndex};
      top: ${absoluteTopPosition}px;
      left: ${absoluteRightPosition}px;
      transform: none;
      right: auto;
    `}

  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  &:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--shade-300-85) transparent;
  }
  &:hover::-webkit-scrollbar {
    width: 3px;
    border-radius: 2px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
  }
`;

const ColorPickerWrapper = ({
  className,
  children,
  absoluteRightPosition,
  translateY,
  absoluteTopPosition,
  zIndex,
}) => {
  return (
    <StyledColorPickerWrapper
      className={className}
      absoluteRightPosition={absoluteRightPosition ?? 100}
      translateY={translateY ?? 0}
      absoluteTopPosition={absoluteTopPosition ?? 0}
      zIndex={zIndex}
    >
      {children}
    </StyledColorPickerWrapper>
  );
};

export default ColorPickerWrapper;
