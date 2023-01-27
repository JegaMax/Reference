import React from 'react';
import styled from 'styled-components';

const OuterWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ColorPickerOuterWrapper = ({ children }) => {
  return <OuterWrapper>{children}</OuterWrapper>;
};

export default ColorPickerOuterWrapper;
