import { environment } from 'config/environment';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import OutsideClickHandler from 'react-outside-click-handler';
import { useHistory } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import emptyPreview from '.././images/empty-preview.png';
import { buildPreviewLink } from '../../../../../utils/preview';
import sinceTime from '../../../../../utils/sinceTime';
import { DotsIcon, Publish } from '../../../../icons';
import { STORY_STATUS_PUBLISHED } from '../../../constants/story';
import * as Styled from './story-items-styled';

const appearing = keyframes`
  0% {
    opacity: 1;
    z-index: 1;
    transform: translate(-50%, 0%);
  }

  20%{
    opacity: 1;
    transform: translate(-50%, -100%);
  }

  80%{
    opacity: 1;
  }

  100%{
    opacity: 0;
    z-index: -1;
  }
`;

const Tooltip = styled.div`
  z-index: -1;
  font-family: Heebo;
  font-size: 12px;
  position: absolute;
  background-color: var(--shade-900);
  border-radius: 22px;
  color: var(--white);
  line-height: 1;
  padding: 5px 12px;
  top: 1px;
  right: 0;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  transform: translate(-50%, -180%);
  white-space: nowrap;
  ${({ isVisible }) =>
    isVisible &&
    css`
      z-index: -1;
      animation-name: ${appearing};
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
    `}
`;

const DraggingCountToken = styled.div`
  width: 18px;
  height: 18px;
  background-color: var(--primary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  position: absolute;
  top: -7px;
  right: -7px;
  z-index: 1;

  font-family: Heebo;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--white);
`;

const previewOptions = { offsetX: 16, offsetY: 16, captureDraggingState: true };

const StoryItem = ({
  story,
  setSelectedStory,
  selectedStories,
  setSelectedStories,
  setMoveModalOpen,
  setDeleteModalOpen,
  onDuplicateStory,
  onMoveStory,
  withStoryAuthor,
  teamMembers,
  urlMask,
}) => {
  const { push } = useHistory();
  const canDrag = useMemo(() => selectedStories.length === 0 || selectedStories.includes(story._id), [
    selectedStories,
    story._id,
  ]);

  const onEnd = useCallback(
    (item, monitor) => {
      const result = monitor.getDropResult();
      if (result) {
        onMoveStory(item, result);
      }
    },
    [onMoveStory],
  );

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: 'STORY',
      canDrag,
      end: onEnd,
      previewOptions,
      item: { _id: story._id, folderId: story.folderId, teamId: story.teamId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [story._id, story.folderId, story.teamId, canDrag],
  );

  const callbackRef = useCallback((node) => dragPreview(node, previewOptions), [dragPreview]);

  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [storyLinkCopied, setStoryLinkCopied] = useState(false);

  const menuRef = useRef(null);

  const isSelected = useMemo(() => selectedStories?.includes(story?._id), [selectedStories, story?._id]);
  const author = useMemo(() => {
    if (withStoryAuthor && teamMembers && teamMembers?.length > 0) {
      const teamMember = teamMembers?.find((teamUser) => teamUser._id === story.author);

      if (teamMember) {
        return `${teamMember.username}`;
      }
    }

    return null;
  }, [story.author, teamMembers, withStoryAuthor]);

  const onPreviewClick = useCallback(() => {
    const previewLink = buildPreviewLink(story?._id);
    const win = window.open(previewLink, '_blank');
    if (win != null) {
      win.focus();
      setIsMenuVisible(false);
    }
  }, [story?._id]);

  const onDeleteStoryClick = useCallback(
    (event) => {
      event.stopPropagation();

      setSelectedStory(story._id);
      setDeleteModalOpen(true);
    },
    [setDeleteModalOpen, setSelectedStory, story._id],
  );

  const onMoveStoryClick = useCallback(
    (event) => {
      event.stopPropagation();

      setSelectedStory(story._id);
      setMoveModalOpen(true);
    },
    [setMoveModalOpen, setSelectedStory, story._id],
  );

  const onDuplicateStoryClick = useCallback(
    (event) => {
      event.stopPropagation();

      onDuplicateStory(story._id);
      setIsMenuVisible(false);
    },
    [onDuplicateStory, story._id],
  );

  const onSelectStory = useCallback(
    () =>
      setSelectedStories((prev) =>
        prev.includes(story._id) ? prev.filter((s) => s !== story._id) : [...prev, story._id],
      ),
    [setSelectedStories, story._id],
  );

  const editStory = useCallback(() => {
    if (selectedStories.length > 0) {
      onSelectStory();
      return;
    }

    push(`/story/${story._id}`);
  }, [selectedStories.length, push, story._id, onSelectStory]);

  const preventDrag = useCallback(
    (e) => {
      if (!canDrag) {
        e.preventDefault();
        return false;
      }
    },
    [canDrag],
  );

  const onCloseMenu = useCallback(() => setIsMenuVisible(false), []);

  const onDropdownTriggerClick = useCallback(
    (event) => {
      event.stopPropagation();
      setIsMenuVisible(!isMenuVisible);
    },
    [isMenuVisible],
  );

  const copyToClipboard = useCallback(async () => {
    let storyLink = story?.customDomain
      ? `https://${story.customDomain}/${story?.amp?.key}`
      : `${environment.defaultStoriesHost}/${story?.amp?.key}`;

    if (urlMask) {
      storyLink = storyLink.replace(new RegExp(urlMask), '');
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(storyLink);
      setStoryLinkCopied(true);
      return;
    }
    const textArea = document.createElement('textarea');

    textArea.value = storyLink;

    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    textArea.remove();

    setStoryLinkCopied(true);
  }, [story?.amp?.key, story.customDomain]);

  useEffect(() => {
    if (menuRef.current) {
      const parent = menuRef.current.closest('[data-rbd-draggable-context-id]');
      if (parent) {
        if (isMenuVisible) {
          parent.style.zIndex = '9999';

          return;
        }
        parent.style.zIndex = '1';
      }
    }
  }, [isMenuVisible]);

  return (
    <Styled.StoryWrapper ref={drag} onDragStart={preventDrag}>
      <Styled.StoryHeaderWrapper>
        {isSelected && <Styled.SelectedFrame onClick={onSelectStory} />}
        <Styled.Select isSelected={Boolean(isSelected)} onClick={onSelectStory}>
          {isSelected && <Styled.StyledCheck />}
        </Styled.Select>

        {!isSelected && (
          <Styled.MenuOuterWrapper ref={menuRef} isMenuVisible={isMenuVisible}>
            <Styled.MenuWrapper>
              <OutsideClickHandler onOutsideClick={onCloseMenu}>
                <Styled.MenuSection>
                  <Styled.MenuTrigger isFocused={isMenuVisible} onClick={onDropdownTriggerClick}>
                    <DotsIcon />
                  </Styled.MenuTrigger>
                  {isMenuVisible && (
                    <Styled.DropdownWrapper isMenuVisible={isMenuVisible}>
                      <Styled.DropdownItem onClick={onPreviewClick}>Preview</Styled.DropdownItem>
                      <Styled.DropdownItem onClick={onDuplicateStoryClick}>Duplicate</Styled.DropdownItem>
                      <Styled.DropdownItem onClick={onMoveStoryClick}>Move to</Styled.DropdownItem>
                      <Styled.DropdownItem onClick={onDeleteStoryClick}>Delete</Styled.DropdownItem>
                    </Styled.DropdownWrapper>
                  )}
                </Styled.MenuSection>
              </OutsideClickHandler>
              {story?.amp?.key && (
                <Styled.StoryLinkWrapper onClick={copyToClipboard}>
                  <Publish />
                  <Tooltip isVisible={storyLinkCopied}>Copied</Tooltip>
                  <Styled.StyledStoryLink>Copy Story link</Styled.StyledStoryLink>
                </Styled.StoryLinkWrapper>
              )}
            </Styled.MenuWrapper>
          </Styled.MenuOuterWrapper>
        )}

        <Styled.StoryImageWrapper onClick={editStory} id={`story-${story._id}`}>
          <Styled.StoryImage
            alt="story preview"
            src={story?.posterPortrait3x4Url || story?.cover?.url || emptyPreview}
          />
          <Styled.StoryDraggedImageWrapper ref={callbackRef} style={{ opacity: isDragging ? 1 : 0 }}>
            <Styled.StoryImage
              alt="dragging preview"
              src={story?.posterPortrait3x4Url || story?.cover?.url || emptyPreview}
            />
            {selectedStories?.length > 1 && <DraggingCountToken>{selectedStories?.length}</DraggingCountToken>}
          </Styled.StoryDraggedImageWrapper>
        </Styled.StoryImageWrapper>
      </Styled.StoryHeaderWrapper>

      <Styled.StoryBodyWrapper>
        <Styled.StoryTitleWrapper>
          {story.status === STORY_STATUS_PUBLISHED && <Styled.PublishedIcon />}
          <Styled.StoryTitle>{story.title}</Styled.StoryTitle>
        </Styled.StoryTitleWrapper>

        {author && <Styled.StoryInfo>by {author}</Styled.StoryInfo>}

        <Styled.StoryInfo>{sinceTime(story.storyUpdatedAt || story.updatedAt)}</Styled.StoryInfo>
      </Styled.StoryBodyWrapper>
    </Styled.StoryWrapper>
  );
};

export default memo(StoryItem);
