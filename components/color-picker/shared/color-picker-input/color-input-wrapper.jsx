import React from 'react';
import styled from 'styled-components';

const StyledColorInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  margin: 0 -4px;
  min-width: 100%;
`;

const ColorInputWrapper = ({ children }) => {
  return <StyledColorInputWrapper>{children}</StyledColorInputWrapper>;
};

export default ColorInputWrapper;
