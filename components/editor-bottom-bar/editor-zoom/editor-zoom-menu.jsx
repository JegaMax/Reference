// Redux
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { resizeStory, setZoomPercent } from '../../../appredux/features/editor/helpers/helpersSlice';
// Constants
import { ZOOM_PERCENTAGES } from '../../../config/constants';
// Styles
import Styled from './editor-zoom-styled';
import { batch } from 'react-redux';

const EditorZoomMenu = () => {
  const dispatch = useAppDispatch();
  const zoomPercent = useAppSelector((state) => state.helpers.zoomPercent);
  const fitZoomPercent = useAppSelector((state) => state.helpers.fitZoomPercent);

  const onOptionSelect = (percent) => () => {
    const selectedPercent = percent ?? fitZoomPercent;

    batch(() => {
      dispatch(setZoomPercent(selectedPercent));
      dispatch(resizeStory(selectedPercent));
    });
  };

  return (
    <Styled.EditorZoomWrapper>
      <Styled.ZoomOptionFitWrapper>
        <Styled.ZoomOption isActive={fitZoomPercent === zoomPercent} onClick={onOptionSelect()}>
          Fit
        </Styled.ZoomOption>
      </Styled.ZoomOptionFitWrapper>

      <Styled.ZoomOptionsWrapper>
        {ZOOM_PERCENTAGES.map((percent) => {
          return (
            <Styled.ZoomOption key={percent} isActive={percent === zoomPercent} onClick={onOptionSelect(percent)}>
              {percent} %
            </Styled.ZoomOption>
          );
        })}
      </Styled.ZoomOptionsWrapper>
    </Styled.EditorZoomWrapper>
  );
};

export default EditorZoomMenu;
