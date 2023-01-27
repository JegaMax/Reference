import { useEffect, useState } from 'react';
import { useAppSelector } from '../../../hooks';
import { BottomBarButtonWrapper, Typography } from '../shared';
import { IconButton } from '../../buttons';
import OutsideClickHandler from 'react-outside-click-handler';
import EditorZoomMenu from './editor-zoom-menu';
import Styled from './editor-zoom-styled';
import { setZoomPercent } from '../../../appredux/features/editor/helpers/helpersSlice';
import { useDispatch } from 'react-redux';
import { DEFAULT_EDITOR_FRAME_SIZE } from '../../../config/constants';
import { setZoomRatio } from '../../../appredux/features/amp-story/ampStorySlice';
import { stopPropagation } from '../../../utils/common';

const EditorZoom = () => {
  const [isZoomMenuVisible, setIsZoomMenuVisible] = useState(false);
  const zoomPercent = useAppSelector((state) => state.helpers.zoomPercent);
  const editorHeight = useAppSelector((state) => state.ampStory.present.initialHeight);
  const fitZoomPercent = useAppSelector((state) => state.helpers.fitZoomPercent);
  const dispatch = useDispatch();

  const onZoomButtonClick = () => setIsZoomMenuVisible(!isZoomMenuVisible);
  const onOutsideZoomMenuClick = () => setIsZoomMenuVisible(false);

  useEffect(() => {
    dispatch(setZoomPercent(Math.round((editorHeight * 100) / DEFAULT_EDITOR_FRAME_SIZE.HEIGHT)));
  }, [dispatch, editorHeight]);

  useEffect(() => {
    dispatch(setZoomRatio(zoomPercent / fitZoomPercent));
  }, [dispatch, fitZoomPercent, zoomPercent]);

  return (
    <BottomBarButtonWrapper onClick={stopPropagation}>
      <OutsideClickHandler onOutsideClick={onOutsideZoomMenuClick}>
        <IconButton width="89px" onClick={onZoomButtonClick}>
          <Typography padding={'0 16px'}>
            <Styled.Percentage>{`${zoomPercent} %`}</Styled.Percentage>
          </Typography>
        </IconButton>

        {isZoomMenuVisible && <EditorZoomMenu />}
      </OutsideClickHandler>
    </BottomBarButtonWrapper>
  );
};

export default EditorZoom;
