import styled from 'styled-components';

const StyledSidebarRowWrapper = styled.div`
  display: flex;
  padding: 0 20px 0 24px;
  justify-content: space-between;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : 'center')};
  margin: 0 0 16px;
  width: 100%;
  &:last-of-type {
    margin: 0;
  }
`;

const EditorSidebarRowWrapper = ({ children, alignItems }) => {
  return <StyledSidebarRowWrapper alignItems={alignItems}>{children}</StyledSidebarRowWrapper>;
};

export default EditorSidebarRowWrapper;
