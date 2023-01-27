import { ReactNode } from 'react';
// Styles
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  position: relative;
  pointer-events: auto;
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

const BottomBarButtonWrapper = ({ children, onClick }) => {
  return <ButtonWrapper onMouseDown={onClick}>{children}</ButtonWrapper>;
};

export default BottomBarButtonWrapper;
