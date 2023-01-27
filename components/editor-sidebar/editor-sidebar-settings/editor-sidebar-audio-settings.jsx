import { batch, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import SoundMuted from '../../../components/icons/sound-muted';
import Sound from '../../../components/icons/sound';
import EditorSidebarLabel from '../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../shared/elements/editor-sidebar-section-title';
import EditorSidebarLabelWrapper from '../shared/structure/editor-sidebar-label-wrapper';
import EditorSidebarRowWrapper from '../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../shared/structure/editor-sidebar-section-title-wrapper';
import { useAppSelector } from '../../../hooks';
import { setIsStoryMuted } from '../../../appredux/features/amp-story/ampStorySlice';
import { memo, useCallback } from 'react';
import { incrementStoryChangedCount } from '../../../appredux/features/editor/helpers/helpersSlice';

const SoundIconWrapper = styled.div`
  padding: 9px 9px 4px 9px;
  cursor: pointer;
  backdrop-filter: blur(50px);
  border-radius: 6px;
  background-color: var(--shade-800);
`;

const SoundOnIconWrapper = styled(SoundIconWrapper)`
  ${({ isMuted }) =>
    !isMuted &&
    css`
      background-color: var(--primary-10);
    `}
`;

const SoundOffIconWrapper = styled(SoundIconWrapper)`
  margin-right: 5px;
  ${({ isMuted }) =>
    isMuted &&
    css`
      background-color: var(--primary-10);
    `}
`;

const EditorSidebarAudioSettings = () => {
  const dispatch = useDispatch();
  const isMuted = useAppSelector((state) => state.ampStory.present.isMuted);

  const muteStoryHandler = useCallback(() => {
    batch(() => {
      dispatch(setIsStoryMuted(true));
      dispatch(incrementStoryChangedCount());
    });
  }, [dispatch]);

  const unmuteStoryHandler = useCallback(() => {
    batch(() => {
      dispatch(setIsStoryMuted(false));
      dispatch(incrementStoryChangedCount());
    });
  }, [dispatch]);

  return (
    <div style={{ paddingTop: '20px' }}>
      <EditorSidebarSectionTitleWrapper>
        <EditorSidebarSectionTitle text={'Audio'} />
      </EditorSidebarSectionTitleWrapper>
      <EditorSidebarRowWrapper>
        <EditorSidebarLabelWrapper>
          <EditorSidebarLabel text={'Story'} />
        </EditorSidebarLabelWrapper>
        <div style={{ display: 'flex' }}>
          <SoundOffIconWrapper isMuted={isMuted} onClick={muteStoryHandler}>
            <SoundMuted fillColor={isMuted ? 'var(--primary)' : 'var(--shade-300)'} />
          </SoundOffIconWrapper>
          <SoundOnIconWrapper isMuted={isMuted} onClick={unmuteStoryHandler}>
            <Sound fillColor={isMuted ? 'var(--shade-300)' : 'var(--primary)'} />
          </SoundOnIconWrapper>
        </div>
      </EditorSidebarRowWrapper>
    </div>
  );
};

export default memo(EditorSidebarAudioSettings);
