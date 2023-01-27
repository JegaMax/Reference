import React from 'react';
import styled from 'styled-components';

const SidebarLabel = styled.p`
  padding-top: ${({ paddingTop }) => paddingTop};
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  ${({ highlighted }) =>
    highlighted &&
    `
    font-size: 14px;
    line-height: 20px;
    font-weight: 500;
    color: #fff;
  
  `}
`;

const EditorSidebarLabel = ({ text, highlighted, paddingTop }) => {
  return (
    <SidebarLabel highlighted={highlighted} paddingTop={paddingTop}>
      {text}
    </SidebarLabel>
  );
};

export default EditorSidebarLabel;
