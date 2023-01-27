import ChevronDownIcon from 'components/icons/chevron-down';
import FolderSM from 'components/icons/folder-sm';
import { useAppDispatch, useAppSelector } from 'hooks';
import { memo, useCallback, useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { NavLink, useParams } from 'react-router-dom';
import { collapseFolder, expandFolder, makeSelectCurrentFolderState } from 'appredux/features/navigation/navigationSlice';
import { useFoldersListQuery } from 'appredux/services/folders/folders';
import styled, { css } from 'styled-components';
import NavigationFoldersTreeRecursive from './navigation-folders-tree-recursive';

const FolderBorderWrapper = styled.div`
  width: 240px;
  &&& a {
    border: 1px solid ${({ isDraggingOver }) => (isDraggingOver ? `var(--primary)` : `transparent`)};
  }
`;

const Container = styled(NavLink)`
  height: 32px;
  width: 100%;
  padding-right: 32px;
  display: flex;
  align-items: center;
  min-width: 0;
  color: var(--shade-100);
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 225ms ease;
  text-decoration: none !important;
  ${({ $extraPadding }) => $extraPadding && `padding-left: 38px;`}
  &:hover {
    background-color: var(--shade-500-85);
  }
  ${({ $isActive }) =>
    $isActive &&
    `
    background-color: var(--primary-10);
    h5, svg {
      color: var(--primary);
      > path {
        fill: var(--primary);
      }
    }    
    &:hover {
    background-color: var(--primary-10);
  }
  `}
`;

const Title = styled.h5`
  margin: 0;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin-left: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const FolderIcon = styled(FolderSM)`
  min-width: 22px;
  min-height: 22px;
`;

const DropdownWrapper = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-right: 6px;
`;

const DropdownIcon = styled(ChevronDownIcon)`
  width: 14px;
  height: 14px;
  transition: transform 225ms ease;
  transform: rotate(${({ isMenuOpen }) => (isMenuOpen ? `0` : '-90')}deg);
`;

const Collapsible = styled.div`
  height: ${({ isOpen }) => (isOpen ? 'auto' : '0')};
  ${({ isOpen }) =>
    isOpen &&
    css`
      height: max-content;
    `}
  overflow: hidden;
`;

const Folder = ({ folder, teamId }) => {
  const dispatch = useAppDispatch();
  const { id: folderId } = useParams();

  const selectCurrentFolderState = useMemo(makeSelectCurrentFolderState, []);
  const isMenuOpen = useAppSelector((state) => selectCurrentFolderState(state, folder._id));
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);

  const onDrop = useCallback(
    () => ({
      folder: folder._id,
      team: teamId,
      isSidebar: true,
    }),
    [folder._id, teamId],
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'STORY',
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const { data: folders, isLoading: isChildrenLoading } = useFoldersListQuery(
    { workspaceId: selectedWorkspaceId ?? '', folderId: folder._id, teamId },
    { skip: !isMenuOpen || !selectedWorkspaceId },
  );

  const handleSubMenu = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!folder.children.length) {
      return;
    }

    if (isMenuOpen) {
      dispatch(collapseFolder(folder._id));
      return;
    }

    dispatch(expandFolder(folder._id));
  };

  return (
    <>
      <FolderBorderWrapper ref={drop} role={'Folder'} isDraggingOver={isOver}>
        <Container
          $extraPadding={!folder.children.length}
          to={`/${teamId ? 'teams' : 'my-stories'}/folder/${folder._id}`}
          $isActive={folderId === folder._id}
        >
          {!!folder.children.length && (
            <DropdownWrapper onClick={handleSubMenu}>
              <DropdownIcon isMenuOpen={isMenuOpen} />
            </DropdownWrapper>
          )}
          <FolderIcon />
          <Title>{folder.title}</Title>
        </Container>
      </FolderBorderWrapper>
      {!isChildrenLoading && folders && folders?.length > 0 && (
        <Collapsible isOpen={isMenuOpen}>
          <NavigationFoldersTreeRecursive folders={folders} />
        </Collapsible>
      )}
    </>
  );
};

export default memo(Folder);
