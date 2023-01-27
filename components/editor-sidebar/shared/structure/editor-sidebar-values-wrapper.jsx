import styled from 'styled-components';

const SidebarValuesWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent};
  flex: 1 1 100%;
  max-width: 74.6%;
`;

const EditorSidebarValuesWrapper = ({ justifyContent, children }) => {
  return <SidebarValuesWrapper justifyContent={justifyContent}>{children}</SidebarValuesWrapper>;
};

EditorSidebarValuesWrapper.defaultProps = {
  justifyContent: 'space-between',
};

export default EditorSidebarValuesWrapper;
