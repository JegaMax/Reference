import { ReactNode } from 'react';
import styled from 'styled-components';

const StyledSidebarWrapper = styled.div`
  display: flex;
  flex: 0 0 260px;
  background: var(--shade-900-85);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 12px;
  box-sizing: border-box;
  height: 100%;
  overflow: auto;
  align-self: flex-start;
  flex-direction: column;
  /* backdrop-filter: blur(50px); */
  * {
    box-sizing: border-box;
  }
`;

const EditorSidebarWrapper = ({ children }) => {
  return <StyledSidebarWrapper>{children}</StyledSidebarWrapper>;
};

export default EditorSidebarWrapper;
