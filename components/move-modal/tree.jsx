import { memo } from 'react';
import styled from 'styled-components';
import TreeRecursive from './tree-recursive';

const StyledTree = styled.div`
  line-height: 1.5;
  height: 100%;
  overflow: auto;
  margin-right: -10px;
  padding: 0 5px 0 0;
  scrollbar-width: none;
  width: 100%;
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
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
`;


const Tree = ({ folders, folderId, selectedFolderId, setSelectedFolderId }) => {
  return (
    <StyledTree>
      <TreeRecursive
        folders={folders}
        folderId={folderId}
        selectedFolderId={selectedFolderId}
        setSelectedFolderId={setSelectedFolderId}
      />
    </StyledTree>
  );
};

export default memo(Tree);
