import { memo } from 'react';
import { Delete } from '../../../../icons';
import FolderSM from '../../../../icons/folder-sm';
import * as Styled from './selected-stories-bar-styled';

const SelectedStoriesBar = ({
  selectedStories,
  setMoveModalOpen,
  setDeleteModalOpen,
  onCancel,
}) =>
  selectedStories.length > 0 ? (
    <Styled.BarWrapper>
      <Styled.SelectedItemsText>{selectedStories.length} selected</Styled.SelectedItemsText>
      <Styled.Row style={{ display: 'flex' }}>
        <Styled.IconButton onClick={() => setMoveModalOpen(true)}>
          <FolderSM />
        </Styled.IconButton>

        <Styled.IconButton onClick={() => setDeleteModalOpen(true)}>
          <Delete />
        </Styled.IconButton>
      </Styled.Row>

      <Styled.CancelButton onClick={onCancel}>Cancel</Styled.CancelButton>
    </Styled.BarWrapper>
  ) : (
    <></>
  );

export default memo(SelectedStoriesBar);
