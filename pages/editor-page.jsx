import { useCallback, useEffect, useRef } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { useResizeDetector } from 'react-resize-detector';
import styled from 'styled-components';
import Editor from '../components/editor/editor';
import EditorHeader from '../components/editor-header/editor-header';
import { DEFAULT_EDITOR_FRAME_SIZE } from '../config/constants';
import { useAppSelector } from '../hooks';
import { getFitEditorHeight } from '../utils/editorUtils';

import {
  setFitZoomPercent,
  setFrameSizeAndZoomPercent,
  stopAnimation,
} from 'appredux/features/editor/helpers/helpersSlice';

const ResizeContainer = styled.div``;

const EditorPage = () => {
  const dispatch = useDispatch();
  const containerRef = useRef(null);
  const areAnimationsRunning = useSelector((state) => state.helpers.areAnimationsRunning);
  const tutorialStoryEditorPassed = useAppSelector((state) => state.auth?.user?.tutorialStoryEditorPassed);

  const updateEditorDimensions = useCallback(() => {
    const fitPercent = Number((getFitEditorHeight() / DEFAULT_EDITOR_FRAME_SIZE.HEIGHT).toFixed(2)) * 100;
    batch(() => {
      dispatch(setFrameSizeAndZoomPercent(fitPercent));
      dispatch(setFitZoomPercent(fitPercent));
    });
  }, [dispatch]);

  const handlePageContainerClick = () => areAnimationsRunning && dispatch(stopAnimation());

  useResizeDetector({
    onResize: updateEditorDimensions,
    targetRef: containerRef,
    handleWidth: false,
    skipOnMount: true,
  });

  // There is a race condition when calling useResizeDetector first time and results in bad set state.
  // To avoid such behaior skip resize on mount and call the function handle once the page is fully mounted.
  useEffect(() => {
    updateEditorDimensions();
  }, [updateEditorDimensions]);

  return (
    <ResizeContainer ref={containerRef} onClick={handlePageContainerClick}>
      <EditorHeader />
      <Editor />
    </ResizeContainer>
  );
};

export default EditorPage;
