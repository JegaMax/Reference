import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  > * {
    flex: 1;
  }
  > *:not(:last-of-type) {
    margin-right: 4px;
  }
`;

const ColorInputsWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ColorInputsWrapper;
