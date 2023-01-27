import backButtonIcon from '../../images/header/back-button-icon.svg';
import ExportMenu from '../../components/export-menu/export-menu';
import InlineEditor from '../inline-editor';
import isNull from 'lodash/isNull';
import PreviewButtonIcon from '../icons/play';
import React, { memo, useCallback, useState } from 'react';
import RoundQuestionIcon from '../icons/round-question';
import SaveIndicator from './save-indicator/save-indicator';
import Styled from './shared/styled-editor-header';
import SupportModal from '../support-modal';
import throttle from 'lodash/throttle';
import { batch } from 'react-redux';
import { ChevronLeft } from '../icons';
import { defaultStoryName, storyIds } from '../../config/constants';
import { HeaderContextMenu } from '../context-menu';
import { PrimaryButton } from '../buttons';
import { setAmpStoryTitle, updateStoryConfig, updateStoryMetadata } from '../../appredux/features/amp-story/ampStorySlice';
import { useAppDispatch, useAppSelector, useToggle } from '../../hooks';
import { useHistory } from 'react-router-dom';

import {
  startPreview,
  stopPreview,
  incrementStoryChangedCount,
  resetStoryChangedCount,
  setAmpStoryTitleChanged,
} from '../../appredux/features/editor/helpers/helpersSlice';

const EditorHeader = () => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();

  const storyTitle = useAppSelector((state) => state.ampStory.present.title);
  const isMediaUploading = useAppSelector((state) => state.helpers.isMediaUploading);
  const isVideoProcessing = useAppSelector((state) => state.videoProcessing.isProcessing);
  const storyId = useAppSelector((state) => state.ampStory.present._id);
  const isTeamStory = useAppSelector((state) => state.ampStory.present.teamId);
  const isFullScreenEditor = useAppSelector((state) => state.helpers.showFullScreenIEditor);
  const storyChangedCount = useAppSelector((state) => state.helpers.storyChangedCount);

  const [activeEditor, setActiveEditor] = useState(false);
  const [isBackButtonHovered, setIsBackButtonHovered] = useState(false);
  const { isShown, toggle, setHide } = useToggle(false);
  const isExportDisabled = isMediaUploading || isVideoProcessing;

  const onStoryTitleChange = useCallback(
    (title) => {
      batch(() => {
        dispatch(setAmpStoryTitle(title));
        dispatch(setAmpStoryTitleChanged(true));
      });
    },
    [dispatch],
  );

  const onBlurCallback = useCallback(() => {
    if (storyTitle === '') {
      dispatch(setAmpStoryTitle(defaultStoryName));
    }
    dispatch(updateStoryMetadata());
    dispatch(incrementStoryChangedCount());
  }, [dispatch, storyTitle]);

  const handleStartPreviewThrottled = throttle(
    (event) => {
      dispatch(startPreview(storyIds.editor, event));
    },
    3000,
    { trailing: false },
  );

  const onStartPreview = useCallback(
    (event) => {
      if (!isMediaUploading) {
        handleStartPreviewThrottled(event);
      }
    },
    [handleStartPreviewThrottled, isMediaUploading],
  );

  const onStopPreview = useCallback(
    (event) => {
      dispatch(stopPreview(storyIds.editor, event));
    },
    [dispatch],
  );

  const onHoverBackButtonLabel = () => {
    setIsBackButtonHovered(!isBackButtonHovered);
  };

  const goBack = async () => {
    if (!isNull(storyChangedCount) && storyChangedCount > 0 && !isMediaUploading) {
      dispatch(updateStoryConfig());
      dispatch(resetStoryChangedCount());
    }

    if (isTeamStory) {
      push('/teams');
    } else {
      push('/my-stories');
    }
  };

  return (
    <Styled.HeaderContainer>
      {storyId && isFullScreenEditor && (
        <Styled.BackButtonWrapper>
          <Styled.ButtonWithIcon isHovered={isBackButtonHovered} onClick={onStopPreview}>
            <img src={backButtonIcon} alt="Back" />
          </Styled.ButtonWithIcon>
          <Styled.BackButtonLabel
            onMouseEnter={onHoverBackButtonLabel}
            onMouseLeave={onHoverBackButtonLabel}
            onClick={onStopPreview}
          >
            Back to Editor
          </Styled.BackButtonLabel>
        </Styled.BackButtonWrapper>
      )}
      {storyId && !isFullScreenEditor && (
        <>
          <Styled.ButtonWithIconWrapper margin={'0 32px 0 4px'}>
            <Styled.ButtonWithIcon type="button" onClick={goBack}>
              <ChevronLeft />
            </Styled.ButtonWithIcon>
          </Styled.ButtonWithIconWrapper>

          <HeaderContextMenu />

          <Styled.StoryTitle isActive={activeEditor}>
            <InlineEditor
              open={activeEditor}
              setOpen={setActiveEditor}
              onChange={onStoryTitleChange}
              onBlurCallback={onBlurCallback}
              placeholder={defaultStoryName}
              value={storyTitle}
            />
          </Styled.StoryTitle>

          <SaveIndicator changeCount={storyChangedCount} />

          <Styled.RightColumn>
            <Styled.ButtonWithIconWrapper>
              <Styled.ButtonWithIcon type="button" onClick={toggle}>
                <RoundQuestionIcon />
              </Styled.ButtonWithIcon>
              <SupportModal isOpen={isShown} onCancel={setHide} />
            </Styled.ButtonWithIconWrapper>

            <Styled.ButtonWithIconWrapper>
              <Styled.ButtonWithIcon type="button" onClick={onStartPreview} isDisabled={isMediaUploading}>
                <PreviewButtonIcon />
              </Styled.ButtonWithIcon>
            </Styled.ButtonWithIconWrapper>

            <Styled.PrimaryButtonWrapper>
              <ExportMenu isDisabled={isExportDisabled}>
                <PrimaryButton text={'Publish'} isDisabled={isExportDisabled} />
              </ExportMenu>
            </Styled.PrimaryButtonWrapper>
          </Styled.RightColumn>
        </>
      )}
    </Styled.HeaderContainer>
  );
};

export default memo(EditorHeader);
