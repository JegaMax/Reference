import React, { useCallback, useMemo } from 'react';
import { BottomBarButtonWrapper } from '../shared';
import { IconButton } from '../../buttons';
import { StepBack, StepForward } from '../../icons';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../../hooks';
import { stopPropagation } from '../../../utils/common';
import { ActionCreators } from 'redux-undo';
import { REDUX_UNDO_ACTION_TYPES } from '../../../config/constants';
import { getAmpStoryData } from '../../../utils/editorUtils';
import { incrementStoryChangedCount } from '../../../appredux/features/editor/helpers/helpersSlice';

const EditorUndoRedo = () => {
  const dispatch = useDispatch();
  const ampStory = useAppSelector((state) => state.ampStory.present);
  const ampStoryPast = useAppSelector((state) => state.ampStory.past);
  const ampStoryFuture = useAppSelector((state) => state.ampStory.future);

  const isUndoDisabled = useMemo(() => ampStoryPast.length < 1, [ampStoryPast.length]);
  const isRedoDisabled = useMemo(() => ampStoryFuture.length < 1, [ampStoryFuture.length]);

  const getUndoJumps = useCallback(() => {
    const { jumps } = getAmpStoryData(ampStoryPast, REDUX_UNDO_ACTION_TYPES.UNDO, ampStory);

    return jumps;
  }, [ampStory, ampStoryPast]);

  const getRedoJumps = useCallback(() => {
    const { jumps } = getAmpStoryData(ampStoryFuture, REDUX_UNDO_ACTION_TYPES.REDO, ampStory);

    return jumps;
  }, [ampStory, ampStoryFuture]);

  const onUndoClick = useCallback(
    (event) => {
      stopPropagation(event);

      if (ampStoryPast?.length === 0) {
        return;
      }
      dispatch(incrementStoryChangedCount(true));
      const jumps = getUndoJumps();
      if (jumps > 1) {
        const optimizeJumps = jumps > ampStoryPast.length ? ampStoryPast.length : jumps;
        dispatch(ActionCreators.jump(-1 * optimizeJumps));
        return;
      }

      dispatch(ActionCreators.undo());
    },
    [dispatch, getUndoJumps, ampStoryPast],
  );

  const onRedoClick = useCallback(
    (event) => {
      stopPropagation(event);

      if (ampStoryFuture?.length === 0) {
        return;
      }
      dispatch(incrementStoryChangedCount(true));
      const jumps = getRedoJumps();
      if (jumps > 1) {
        const optimizeJumps = jumps > ampStoryFuture.length ? ampStoryFuture.length : jumps;
        dispatch(ActionCreators.jump(optimizeJumps));
        return;
      }

      dispatch(ActionCreators.redo());
    },
    [dispatch, getRedoJumps, ampStoryFuture],
  );

  return (
    <>
      <BottomBarButtonWrapper onClick={stopPropagation}>
        <IconButton onClick={onUndoClick} isDisabled={isUndoDisabled}>
          <StepBack />
        </IconButton>
      </BottomBarButtonWrapper>

      <BottomBarButtonWrapper onClick={stopPropagation}>
        <IconButton onClick={onRedoClick} isDisabled={isRedoDisabled}>
          <StepForward />
        </IconButton>
      </BottomBarButtonWrapper>
    </>
  );
};

export default EditorUndoRedo;
