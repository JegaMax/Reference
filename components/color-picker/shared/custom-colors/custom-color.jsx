import { memo } from 'react';
import styled from 'styled-components';
import PlusImg from './images/color-picker/plus.svg';

const StyledCustomColorOuter = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${({ $isActive }) => ($isActive ? 'var(--white-20)' : 'var(--shade-700-85)')};
  border-radius: 6px;
  padding: 2px;
  cursor: pointer;
  margin: 0 2px;
  transition: 0.12s ease;
  &:hover {
    border-color: var(--shade-300);
  }
  &:focus,
  &:focus-within {
    border-color: var(--white-20);
  }
`;

const StyledCustomColorInner = styled.div`
  width: 26px;
  height: 26px;
  background: ${({ color }) => color};
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CustomColor = ({ selectedColor, color, withPlus, handleClick }) => {
  return (
    <StyledCustomColorOuter $isActive={selectedColor === color} withPlus={withPlus} onClick={handleClick}>
      <StyledCustomColorInner color={color}>{withPlus && <img src={PlusImg} alt="Plus" />}</StyledCustomColorInner>
    </StyledCustomColorOuter>
  );
};

CustomColor.defaultProps = {
  color: 'var(--shade-700-85)',
  withPlus: false,
  handleClick: () => null,
};

export default memo(CustomColor);
