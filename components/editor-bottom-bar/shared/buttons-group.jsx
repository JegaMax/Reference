import { MouseEventHandler, ReactNode } from 'react';
import styled from 'styled-components';

const ButtonsGroupElement = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: flex-end;
  width: 33.33%;
  min-width: 0;
  max-width: calc(33.33% - 86px);
  flex: 1 1 33.33%;
  // Substract the layer container + right margin
  &:nth-child(2) {
    justify-content: center;
    padding-left: 86px;
  }
  &:nth-child(3) {
    justify-content: flex-end;
  }
`;

const ButtonsGroup = ({ children, onMouseDown }) => {
  return <ButtonsGroupElement onMouseDown={onMouseDown}>{children}</ButtonsGroupElement>;
};

export default ButtonsGroup;
