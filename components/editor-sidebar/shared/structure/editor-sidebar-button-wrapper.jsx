import React, { ReactNode } from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin: 0 4px;
`;

const EditorSidebarButtonWrapper = ({ children }) => {
  return <ButtonWrapper>{children}</ButtonWrapper>;
};

export default EditorSidebarButtonWrapper;
