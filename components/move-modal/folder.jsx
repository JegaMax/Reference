import { useAppSelector } from 'hooks';
import { memo, useCallback, useMemo, useState } from 'react';
import { useFoldersListQuery } from 'appredux/services/folders/folders';
import styled, { css } from 'styled-components';
import { ChevronRight } from '../icons';
import FolderSM from '../icons/folder-sm';
import TreeRecursive from './tree-recursive';

const StyledFolder = styled.div`
  margin-left: 1px;
  margin-bottom: 8px;
  & & {
    margin-left: 14px;
    margin-bottom: 0;
  }
  & & + & {
    margin-top: 8px;
  }
  .arrow-wrapper {
    display: inline-block;
    align-items: center;
    cursor: pointer;
  }
`;

const StyledSpan = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 2px 26px 2px 5px;
  line-height: 0;
  ${({ isActive }) =>
    isActive &&
    css`
      background: var(--primary);
      border-radius: 6px;
      svg {
        color: var(--shade-900);
      }
    `}
`;

const Collapsible = styled.div`
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  ${({ isOpen }) =>
    isOpen &&
    css`
      margin-top: 8px;
      width: max-content;
      height: max-content;
    `}
  overflow: hidden;
`;

const SelectOption = styled.span`
  display: flex;
  align-items: center;
  font-family: Heebo;
  font-size: 12px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  border-radius: 6px;
  transition: 0.12s ease;
  cursor: pointer;
  margin-left: ${({ hasChildren }) => (hasChildren ? '0px' : '26px')};
  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--shade-900);
      svg {
        color: var(--shade-900);
      }
    `}
`;

const FolderIcon = styled(FolderSM)`
  flex: 0 0 20px;
  width: 20px;
`;

const StyledFolderTitle = styled.span`
  padding: 0 10px;
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 150px;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: var(--shade-300);
    `}
`;

const RightIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ isActive }) => (isActive ? '#e04621' : 'transparent')};
  border-radius: 2px;
  width: 18px;
  height: 18px;
  margin-right: 7px;
`;

const RightIcon = styled(ChevronRight)`
  width: 11px;
  height: 8px;
  color: ${({ isDisabled }) => (isDisabled ? 'var(--shade-300)' : 'var(--shade-100)')};
  transition: 0.12s ease;
  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(90deg);
    `}
`;

const Folder = ({ item, folderId, selectedFolderId, setSelectedFolderId }) => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const [isOpen, setIsOpen] = useState(false);

  const isActive = useMemo(() => selectedFolderId === item._id, [item._id, selectedFolderId]);
  const isDisabled = useMemo(
    () =>
      item._id === folderId ||
      !!item.children.find((c) => c._id === folderId) ||
      !!item.ancestors.find((a) => a._id === folderId),
    [folderId, item._id, item.ancestors, item.children],
  );

  const { data: childrenFolders } = useFoldersListQuery(
    { workspaceId: selectedWorkspaceId ?? '', folderId: item._id },
    { skip: !isOpen || !selectedWorkspaceId },
  );

  const handleExpandFolder = useCallback(() => {
    setIsOpen(!isOpen);
  }, [isOpen]);

  const selectFolder = useCallback(() => {
    if (isActive) {
      setSelectedFolderId(null);
    } else if (!isDisabled) {
      setSelectedFolderId(item._id);
    }
  }, [isActive, isDisabled, item._id, setSelectedFolderId]);

  return (
    <StyledFolder>
      <StyledSpan isActive={isActive}>
        <span className="arrow-wrapper">
          {item?.children?.length > 0 && (
            <RightIconWrapper isActive={isActive}>
              <RightIcon onClick={handleExpandFolder} rotate={isOpen} isDisabled={isDisabled} />
            </RightIconWrapper>
          )}
        </span>

        <span style={{ verticalAlign: 'middle', flex: '1', maxWidth: '169px' }} onClick={selectFolder}>
          <SelectOption hasChildren={item?.children?.length > 0} isActive={isActive}>
            {isActive ? (
              <FolderIcon mainColor="var(--shade-900)" secondaryColor="var(--shade-900" />
            ) : isDisabled ? (
              <FolderIcon mainColor="var(--shade-300)" secondaryColor="var(--shade-300)" />
            ) : (
              <FolderIcon mainColor="var(--shade-100)" secondaryColor="var(--shade-100)" />
            )}
            <StyledFolderTitle isDisabled={isDisabled}>{item.title}</StyledFolderTitle>
          </SelectOption>
        </span>
      </StyledSpan>

      {item?.children?.length > 0 && (
        <Collapsible isOpen={isOpen}>
          <TreeRecursive
            folders={childrenFolders ?? []}
            folderId={folderId}
            selectedFolderId={selectedFolderId}
            setSelectedFolderId={setSelectedFolderId}
          />
        </Collapsible>
      )}
    </StyledFolder>
  );
};

export default memo(Folder);
