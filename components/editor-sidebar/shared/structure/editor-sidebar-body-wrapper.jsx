import styled from 'styled-components';

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  scrollbar-width: none;
  width: 100%;
  flex: 1;
  overflow-x: hidden;
  overflow-y: auto;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  &:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--shade-300-85) transparent;
  }
  &:hover::-webkit-scrollbar {
    width: 3px;
    border-radius: 2px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
  }
  & > * {
    width: calc(100% + 3px);
  }
  @-moz-document url-prefix() {
    & > * {
      width: calc(100% + 21px);
    }
  }
`;

const EditorSidebarBodyWrapper = ({ children }) => {
  return <BodyWrapper>{children}</BodyWrapper>;
};

export default EditorSidebarBodyWrapper;
