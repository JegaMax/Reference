import { skipToken } from '@reduxjs/toolkit/dist/query';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import OutsideClickHandler from 'react-outside-click-handler';
import { useLocation } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import { useCreateFolderMutation, useFoldersListQuery, useMoveFolderMutation } from 'appredux/services/folders/folders';
import { useMovePersonalStoriesMutation, useMoveTeamStoriesMutation } from 'appredux/services/stories/stories';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import styled, { css } from 'styled-components';
import { useAppSelector } from '../../hooks';
import { AddButton, SecondaryButton } from '../buttons';
import FolderSM from '../icons/folder-sm';
import InputBasic from '../shared/input-basic';
import Select from '../shared/select';
import Tree from './tree';

const customStyles = {
  overlay: {
    backgroundColor: 'var(--shade-500-85)',
    zIndex: 9999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '30px 30px 0 30px',
    maxWidth: '390px',
    borderRadius: '12px',
    border: 'none',
    boxShadow: '24px 32px 72px var(--black-18)',
    display: 'flex',
    background: 'var(--shade-900-95)',
  },
};

const Row = styled.div`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
  ${({ margin }) => margin && `margin: ${margin}`};
`;

const ModalContainer = styled.div`
  height: 467px;
  width: 263px;
  display: flex;
  flex-direction: column;
  background: var(--shade-85-900);
  border-radius: 12px;
`;

const MessageContainer = styled.div`
  flex-grow: 10;
  display: flex;
  flex-direction: column;
  max-height: 500px;
  min-height: 335px;
`;

const Message = styled.h1`
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--white);
  letter-spacing: 0.01em;
  margin: 0;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  margin-top: 10px;

  button {
    cursor: pointer;
  }
`;

const StyledBorder = styled.div`
  border-top: 2px solid var(--shade-500);
  justify-content: center;
  margin: 0 -30px 0;
  min-width: 100%;
  line-height: 0;
`;

const StyledButtonContainer = styled(ButtonContainer)`
  flex-direction: column;
  margin: 24px 0;
  > * {
    justify-content: center;
  }
`;

const StyledSecondaryButton = styled(SecondaryButton)`
  margin-bottom: 10px;
  background: ${({ isDisabled }) => (isDisabled ? 'var(--primary-10) !important' : 'var(--primary) !important')};
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `}
`;

const StyledLabel = styled.label`
  flex: 0 0 35%;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const StyledSelect = styled(Select)`
  flex: 0 0 60%;
`;

const StyledAddButton = styled(AddButton)`
  cursor: pointer;
  margin: 5px 0 0 5px;
  div {
    background: var(--primary);
  }
  span {
    color: var(--primary) !important;
    padding-left: 11px;
    font-family: Heebo;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.01em;
  }
  svg {
    width: 20px;
    height: 20px;
  }
`;

const StyledFoldersWrapper = styled.div`
  margin-left: 65px;
  display: flex;
  justify-content: flex-start;
  color: var(--shade-100);
  cursor: pointer;
  max-height: 200px;
  font-family: 'Heebo';
  font-size: 14px;
  width: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none !important;
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
`;

const MOVE_TO_SECTIONS = {
  team: { name: 'Teams', value: 'team' },
  'my-stories': { name: 'My Stories', value: 'my-stories' },
};

const MoveModal = ({
  showModal,
  storiesIds,
  stories,
  onCloseMoveStoryModal,
  contextFolderId,
  folderId,
}) => {
  const { pathname } = useLocation();
  const isMyStoriesPage = useMemo(() => pathname.includes('my-stories'), [pathname]);

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const { defaultTeamId } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      defaultTeamId: workspace?.teams?.[0]?._id,
    }),
  });

  const { data: folders } = useFoldersListQuery(
    { workspaceId: selectedWorkspaceId ?? '', getAll: true },
    { skip: !selectedWorkspaceId },
  );
  const [moveFolder] = useMoveFolderMutation();
  const [createFolder] = useCreateFolderMutation();
  const [movePersonalStories] = useMovePersonalStoriesMutation();
  const [moveTeamStories] = useMoveTeamStoriesMutation();

  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const [isCreateFolderInputEnalbed, setCreateFolderInput] = useState(false);
  const [inputValue, setInputValue] = useState('Untitled');
  const [isDisabled, setIsDisabled] = useState(false);
  const [moveTo, setMoveTo] = useState(
    isMyStoriesPage ? { name: 'My Stories', value: 'my-stories' } : { name: 'Teams', value: 'team' },
  );

  const { personalFolders, teamFolders } = useMemo(
    () =>
      folders?.reduce(
        (acc, folder) => {
          if (folder.team) {
            acc.teamFolders.push(folder);
            return acc;
          }
          acc.personalFolders.push(folder);
          return acc;
        },
        { personalFolders: [], teamFolders: [] },
      ) ?? { personalFolders: [], teamFolders: [] },
    [folders],
  );

  const currentFolders = useMemo(() => {
    if (moveTo.value === 'my-stories') {
      return personalFolders;
    }

    return teamFolders;
  }, [moveTo.value, personalFolders, teamFolders]);

  const isMovingStories = useMemo(() => !!storiesIds, [storiesIds]);

  const handleSelect = useCallback(
    (event) => {
      if (moveTo.value !== MOVE_TO_SECTIONS[event].value) {
        setMoveTo(MOVE_TO_SECTIONS[event]);
        setSelectedFolderId(null);
      }
    },
    [moveTo],
  );
  const addFolderClick = useCallback(() => setCreateFolderInput(true), []);
  const onInputChange = useCallback((e) => {
    setInputValue(e.target.value);
  }, []);
  const onInputBlur = useCallback(async () => {
    const teamId = moveTo.value === 'team' && defaultTeamId ? defaultTeamId : null;
    try {
      await createFolder({
        title: inputValue,
        teamId,
      }).unwrap();

      setCreateFolderInput(false);
      setInputValue('Untitled');
    } catch (err) {
      console.error(err);
    }
  }, [createFolder, inputValue, moveTo.value, defaultTeamId]);

  const onKeyDownHandler = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        onInputBlur();
      }
    },
    [onInputBlur],
  );
  const onOutsideClick = useCallback(() => {
    setCreateFolderInput(false);
  }, []);

  const moveAcceptHandler = useCallback(async () => {
    if (storiesIds) {
      if (moveTo.value === 'my-stories') {
        try {
          await movePersonalStories({
            storiesIds,
            folderId: selectedFolderId,
          }).unwrap();
          setSelectedFolderId(null);
          onCloseMoveStoryModal();

          toast.info(`Your ${storiesIds.length > 1 ? 'Stories' : 'Story'} have been moved successfully`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            transition: Zoom,
          });
          return;
        } catch (err) {
          console.error(err);
        }
      } else if (moveTo.value === 'team' && defaultTeamId) {
        try {
          await moveTeamStories({
            storiesIds,
            folderId: selectedFolderId,
            teamId: defaultTeamId,
          }).unwrap();
          setSelectedFolderId(null);
          onCloseMoveStoryModal();

          toast.info(`Your ${storiesIds.length > 1 ? 'Stories' : 'Story'} have been moved successfully`, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            transition: Zoom,
          });
          return;
        } catch (err) {
          console.error(err);
        }
      }
    } else if (folderId) {
      try {
        await moveFolder({
          folderId,
          rootId: selectedFolderId,
          teamId: moveTo.value === 'team' ? defaultTeamId : null,
          parentFolder: contextFolderId,
        }).unwrap();

        setSelectedFolderId(null);
        onCloseMoveStoryModal();

        toast.info(`Your folder have been moved successfully`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          transition: Zoom,
        });
      } catch (err) {
        console.error(err);
      }
    }
  }, [
    storiesIds,
    folderId,
    moveTo.value,
    defaultTeamId,
    movePersonalStories,
    selectedFolderId,
    onCloseMoveStoryModal,
    moveTeamStories,
    moveFolder,
    contextFolderId,
  ]);

  // Check if move is possible otherwise disable the button
  useEffect(() => {
    if (storiesIds && stories && stories?.length > 0) {
      const shouldDisableButton = storiesIds.some((storyId) => {
        const currentStory = stories?.find((story) => story._id === storyId);

        const isTheSameFolder =
          currentStory?.folderId && selectedFolderId && currentStory?.folderId === selectedFolderId;

        const isAlreadyInRoot = !selectedFolderId && !contextFolderId && !currentStory?.folderId;

        const isTheSameContext =
          (moveTo.value === MOVE_TO_SECTIONS['team'].value && currentStory?.teamId) ||
          (moveTo.value === MOVE_TO_SECTIONS['my-stories'].value && !currentStory?.teamId);

        if ((isTheSameFolder || isAlreadyInRoot) && isTheSameContext) {
          return true;
        }

        return false;
      });

      if (shouldDisableButton) {
        setIsDisabled(true);
        return;
      }
    }

    if (folderId) {
      const isTheSameContext = isMyStoriesPage && moveTo.value === 'my-stories';

      if (
        selectedFolderId === folderId ||
        (!selectedFolderId && !contextFolderId && folders?.find((f) => f._id === folderId) && isTheSameContext)
      ) {
        setIsDisabled(true);
        return;
      }
    }

    setIsDisabled(false);
  }, [contextFolderId, folderId, folders, isMyStoriesPage, moveTo.value, selectedFolderId, stories, storiesIds]);

  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={showModal}
      style={customStyles}
      onRequestClose={onCloseMoveStoryModal}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <ModalContainer>
        <MessageContainer>
          <Row justifyContent="space-between" margin="0 5px 30px 0">
            <Message>
              Move{' '}
              {isMovingStories && storiesIds
                ? `${storiesIds.length} Stor${storiesIds.length === 1 ? 'y' : 'ies'}`
                : `1 Folder`}
            </Message>
          </Row>
          <Row justifyContent="space-between">
            <StyledLabel>Move to</StyledLabel>
            <StyledSelect
              isDisabled={!isMyStoriesPage}
              selectOption={moveTo.name}
              options={[
                { name: 'My Stories', value: 'my-stories' },
                { name: 'Teams', value: 'team' },
              ]}
              onSelect={handleSelect}
            />
          </Row>
          <Row justifyContent="start" margin="10px 0 5px 0">
            <StyledLabel>Folder</StyledLabel>

            {isCreateFolderInputEnalbed ? (
              <OutsideClickHandler onOutsideClick={onOutsideClick}>
                <div style={{ display: 'flex', padding: '5px', alignItems: 'center' }}>
                  <FolderSM />
                  <div style={{ marginLeft: '7px' }}>
                    <InputBasic
                      onKeyDown={onKeyDownHandler}
                      value={inputValue}
                      onChange={onInputChange}
                      onBlur={onInputBlur}
                      autoFocus
                    />
                  </div>
                </div>
              </OutsideClickHandler>
            ) : (
              <StyledAddButton onClick={addFolderClick} text="New folder" />
            )}
          </Row>
          <StyledFoldersWrapper>
            {currentFolders && (
              <Tree
                folders={currentFolders}
                folderId={folderId}
                selectedFolderId={selectedFolderId}
                setSelectedFolderId={setSelectedFolderId}
              />
            )}
          </StyledFoldersWrapper>
        </MessageContainer>
        <StyledBorder />
        <StyledButtonContainer>
          <StyledSecondaryButton
            isDisabled={isDisabled}
            text={isMovingStories ? 'Move Stories' : 'Move Folder'}
            onClick={moveAcceptHandler}
          />
          <SecondaryButton text="Cancel" onClick={onCloseMoveStoryModal} />
        </StyledButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default memo(MoveModal);
