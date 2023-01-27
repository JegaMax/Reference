import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 0 0 0 4px;
  flex: 0 0 auto;
`;

const ColorTypeSelectWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default ColorTypeSelectWrapper;
