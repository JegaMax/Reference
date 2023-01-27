import React, { ReactNode } from 'react';
import styled from 'styled-components';

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1 0 25.4%;
  width: 25.4%;
`;

const EditorSidebarLabelWrapper = ({ className, children }) => {
  return <LabelWrapper className={className}>{children}</LabelWrapper>;
};

export default EditorSidebarLabelWrapper;
