import React from 'react';
import styled from 'styled-components';

const SidebarSectionTitle = styled.h3`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  margin: 0;
  color: var(--white);
`;

const EditorSidebarSectionTitle = ({ text }) => {
  return <SidebarSectionTitle>{text}</SidebarSectionTitle>;
};

export default EditorSidebarSectionTitle;
