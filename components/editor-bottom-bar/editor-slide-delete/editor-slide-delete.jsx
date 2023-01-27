import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSlide } from '../../../appredux/features/amp-story/ampStorySlice';
import { stopPropagation } from '../../../utils/common';
import { IconButton } from '../../buttons';
import { Delete } from '../../icons';
import { BottomBarButtonWrapper } from '../shared';

const EditorSlideDelete = () => {
  const dispatch = useDispatch();
  const activeSlidePosition = useSelector((state) => state.ampStory.present.activeSlidePosition);

  const onDeleteSlide = useCallback(() => {
    dispatch(removeSlide(activeSlidePosition || 0));
  }, [dispatch, activeSlidePosition]);

  return (
    <BottomBarButtonWrapper onClick={stopPropagation}>
      <IconButton onClick={onDeleteSlide}>
        <Delete />
      </IconButton>
    </BottomBarButtonWrapper>
  );
};

export default EditorSlideDelete;
