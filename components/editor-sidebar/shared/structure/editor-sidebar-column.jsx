import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Column = styled.div`
  display: flex;
  padding: 0 4px;
  flex: 0 0 100%;
  width: 100%;
  align-items: center;
`;

const EditorSidebarColumn = ({ children }) => {
  return <Column>{children}</Column>;
};

EditorSidebarColumn.defaultProps = {
  justifyContent: 'flex-start',
};

export default EditorSidebarColumn;
