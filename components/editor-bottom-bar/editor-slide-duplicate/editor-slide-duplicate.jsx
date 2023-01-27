import { useCallback } from 'react';
import { BottomBarButtonWrapper } from '../shared';
import { IconButton } from '../../buttons';
import { DuplicateSlide } from '../../icons';
import { duplicateSlide } from '../../../appredux/features/amp-story/ampStorySlice';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { stopPropagation } from '../../../utils/common';

const EditorSlideDuplicate = () => {
  const dispatch = useDispatch();
  const activeSlidePosition = useAppSelector((state) => state.ampStory.present.activeSlidePosition);

  const onDuplicateSlide = useCallback(() => {
    dispatch(duplicateSlide(activeSlidePosition || 0));
  }, [dispatch, activeSlidePosition]);

  return (
    <BottomBarButtonWrapper onClick={stopPropagation}>
      <IconButton onClick={onDuplicateSlide}>
        <DuplicateSlide />
      </IconButton>
    </BottomBarButtonWrapper>
  );
};

export default EditorSlideDuplicate;
