import { skipToken } from '@reduxjs/toolkit/dist/query';
import { QuaternaryLinkButton } from 'components/buttons';
import MessageModal from 'components/message-modal';
import { useAppSelector, useSpinner, useStateSync } from 'hooks';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useResizeDetector } from 'react-resize-detector';
import { useParams } from 'react-router-dom';
import { toast, Zoom } from 'react-toastify';
import {
  useDeleteStoryMutation,
  useDuplicateStoryMutation,
  useMovePersonalStoriesMutation,
  useMoveTeamStoriesMutation
} from 'appredux/services/stories/stories';
import { useGetTeamQuery, useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import Section from '../../../../layouts/shared/section-title';
import MoveModal from '../../../../move-modal/move-modal';
import { SelectedStoriesBar, StoryItem } from '../../../../stories/shared/elements';
import { SectionTitleButtonWrapper } from '../../structure';

const StoryListWrapper = styled.div`
  min-width: 100%;
  margin-left: calc(-320px - 90px);
  padding-left: calc(320px + 90px);
  overflow: hidden;
  display: flex;
  flex-flow: ${({ wrapStories }) => (wrapStories ? 'wrap' : 'nowrap')};
  gap: 24px;
`;

const Story = styled.div``;

const STORY_WIDTH = 136;
const GAP = 24;

const StoriesSection = ({
  withStoryAuthor,
  headerButtonUrl,
  header = 'Recently edited',
  stories,
  linkHeader,
  limitStories = false,
}) => {
  const wrapperRef = useRef(null);
  const { Spinner, spinnerProps } = useSpinner();

  const [selectedStory, setSelectedStory] = useState(null);
  const [selectedStories, setSelectedStories, selectedStoriesRef] = useStateSync([]);
  const [isMoveModalOpen, setMoveModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [availableStories, setAvailableStories] = useState(limitStories ? 6 : stories?.length);

  const renderStories = useMemo(() => stories?.slice(0, availableStories), [availableStories, stories]);

  const deleteMessage = useMemo(
    () =>
      selectedStory || selectedStories.length === 1
        ? 'Are you sure you want to delete the selected story?'
        : 'Are you sure you want to delete the selected stories?',
    [selectedStories.length, selectedStory],
  );

  const { id: contextFolderId } = useParams();

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const selectedTeamId = useAppSelector((state) => state.auth.user?.selectedTeamId);

  const { customCDN } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      customCDN: workspace?.customCDN,
    }),
  });

  const { teamMembers } = useGetTeamQuery(selectedTeamId ?? skipToken, {
    selectFromResult: ({ data: team }) => ({
      teamMembers: team?.users,
    }),
    skip: !withStoryAuthor || !selectedTeamId,
  });

  const [duplicateStory, { isLoading: isDuplicateLoading }] = useDuplicateStoryMutation();
  const [deleteStory, { isLoading: isDeleteLoading }] = useDeleteStoryMutation();
  const [moveStory, { isLoading: isMoveStoryLoading }] = useMovePersonalStoriesMutation();
  const [moveTeamStory, { isLoading: isMoveTeamStoryLoading }] = useMoveTeamStoriesMutation();

  const onDuplicateStory = useCallback(
    (storyId) => {
      duplicateStory(storyId).unwrap();
    },
    [duplicateStory],
  );

  const onMoveStory = useCallback(
    async (story, dropResult) => {
      // Multiple stories case
      if (selectedStoriesRef?.current?.length > 1) {
        if (story.teamId && !dropResult.team) {
          toast.info('Once a Story is shared with your Team, it can not be moved back in My Stories', {
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
        }

        if (dropResult.team) {
          await moveTeamStory({
            storiesIds: selectedStoriesRef?.current,
            folderId: dropResult.folder,
            teamId: dropResult.team,
          }).unwrap();
        } else {
          await moveStory({
            storiesIds: selectedStoriesRef?.current,
            folderId: dropResult.folder,
          }).unwrap();
        }

        toast.info(`Your Stories have been moved successfully`, {
          position: 'top-center',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: undefined,
          transition: Zoom,
        });

        setSelectedStories([]);
        return;
      }

      if (
        (!story.folderId &&
          !dropResult.folder &&
          ((!story.teamId && !dropResult.team) || (story.teamId && dropResult.team))) ||
        (story.folderId && dropResult.folder && story.folderId === dropResult.folder)
      ) {
        toast.info(`Story is already in this folder!`, {
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
      }

      if (story.teamId && !dropResult.team) {
        toast.info('Once a Story is shared with your Team, it can not be moved back in My Stories', {
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
      }

      if (dropResult.team) {
        await moveTeamStory({
          storiesIds: [story._id],
          folderId: dropResult.folder,
          teamId: dropResult.team,
        }).unwrap();
      } else {
        await moveStory({
          storiesIds: [story._id],
          folderId: dropResult.folder,
        }).unwrap();
      }

      toast.info(`Your Story has been moved successfully`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        transition: Zoom,
      });
    },
    [moveStory, moveTeamStory, selectedStoriesRef, setSelectedStories],
  );

  const onAcceptDeleteStory = useCallback(async () => {
    if (selectedStory) {
      setSelectedStory(null);
      setDeleteModalOpen(false);

      await deleteStory(selectedStory).unwrap();

      toast.info(`Your story has been deleted successfully.`, {
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
    }

    setSelectedStories([]);
    setDeleteModalOpen(false);

    await Promise.all(selectedStories.map((id) => deleteStory(id).unwrap()));

    toast.info(`Your stories have been deleted successfully.`, {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      transition: Zoom,
    });
  }, [deleteStory, selectedStories, selectedStory, setSelectedStories]);

  const onCloseDeleteModal = useCallback(() => {
    if (selectedStory) {
      setSelectedStory(null);
      setDeleteModalOpen(false);
      return;
    }

    setSelectedStories([]);
    setDeleteModalOpen(false);
  }, [selectedStory, setSelectedStories]);

  const onCancelMultipleSelection = useCallback(() => setSelectedStories([]), [setSelectedStories]);

  const onCloseMoveStoryModal = useCallback(() => {
    if (selectedStory) {
      setSelectedStory(null);
      setMoveModalOpen(false);
      return;
    }

    setSelectedStories([]);
    setMoveModalOpen(false);
  }, [selectedStory, setSelectedStories]);

  const onResize = useCallback(
    (width) => {
      if (width && limitStories) {
        const availableSpace = Math.floor((width + GAP) / (STORY_WIDTH + GAP));
        setAvailableStories(availableSpace);
      }
    },
    [limitStories],
  );

  useResizeDetector({
    onResize,
    targetRef: wrapperRef,
  });

  return (
    <>
      <Spinner {...spinnerProps} isVisible={isDuplicateLoading || isDeleteLoading} />
      <div>
        <Section.Wrapper>
          <Section.Title>
            {linkHeader && (
              <>
                <Section.Link to={linkHeader.url}>{linkHeader.text}</Section.Link>
                <Section.Splitter />
              </>
            )}
            <Section.Text>{header}</Section.Text>
          </Section.Title>
          {headerButtonUrl ? (
            <SectionTitleButtonWrapper>
              <QuaternaryLinkButton to={headerButtonUrl} sizeType="medium" text="All stories" />
            </SectionTitleButtonWrapper>
          ) : (
            <></>
          )}
        </Section.Wrapper>

        <StoryListWrapper ref={wrapperRef} wrapStories={!limitStories}>
          {renderStories.map((story) => (
            <Story key={story._id}>
              <StoryItem
                story={story}
                setDeleteModalOpen={setDeleteModalOpen}
                setMoveModalOpen={setMoveModalOpen}
                setSelectedStory={setSelectedStory}
                onDuplicateStory={onDuplicateStory}
                onMoveStory={onMoveStory}
                selectedStories={selectedStories}
                setSelectedStories={setSelectedStories}
                withStoryAuthor={withStoryAuthor}
                teamMembers={teamMembers}
                urlMask={customCDN?.mask}
              />
            </Story>
          ))}
        </StoryListWrapper>

        <SelectedStoriesBar
          selectedStories={selectedStories}
          setMoveModalOpen={setMoveModalOpen}
          setDeleteModalOpen={setDeleteModalOpen}
          onCancel={onCancelMultipleSelection}
        />

        {isMoveModalOpen && (
          <MoveModal
            stories={stories}
            storiesIds={selectedStory ? [selectedStory] : selectedStories}
            showModal={isMoveModalOpen}
            onCloseMoveStoryModal={onCloseMoveStoryModal}
            contextFolderId={contextFolderId}
          />
        )}

        {isDeleteModalOpen && (
          <MessageModal
            isOpen={isDeleteModalOpen}
            message={deleteMessage}
            shouldCloseOnOverlayClick={true}
            onCancel={onCloseDeleteModal}
            onAccept={onAcceptDeleteStory}
          />
        )}
      </div>
    </>
  );
};

export default memo(StoriesSection);
