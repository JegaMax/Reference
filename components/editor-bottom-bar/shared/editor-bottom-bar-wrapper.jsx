import { ReactNode } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: calc(100% + 64px);
  margin-left: -64px;
  margin-top: 24px;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
`;

const EditorBottomBarWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default EditorBottomBarWrapper;
