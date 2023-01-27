// Hooks
import { useAppSelector, useCustomScrolling } from '../../hooks';
// Constants
import { SCROLL_DIRECTION } from '../../config/constants';
// Styles
import { useMemo } from 'react';
import styled from 'styled-components';

const Track = styled.div`
  display: flex;
  align-items: stretch;
  position: absolute;
  z-index: 4;
`;

const ThumbWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Thumb = styled.div`
  position: absolute;
  background: var(--shade-300-85);
  width: 100%;
  height: 100%;
  border-radius: 2px;
`;

const EditorScrollbar = ({
  element,
  direction,
  ratio = 1,
  shouldCalculateRatio = false,
}) => {
  const zoomPercent = useAppSelector((state) => state.helpers.zoomPercent);

  const { scrollBoxSize, scrollBoxOffset, handleScrollThumbMouseDown } = useCustomScrolling({
    element,
    direction,
    changeDependency: zoomPercent,
    ratio,
    shouldCalculateRatio,
  });

  const trackStyles = useMemo(() => {
    return direction === SCROLL_DIRECTION.VERTICAL
      ? {
          position: 'absolute',
          height: element ? element.clientHeight / ratio : 0,
          width: '4px',
          right: 0,
          top: 12,
        }
      : {
          position: 'fixed',
          width: element ? element.clientWidth / ratio : 0,
          height: '4px',
          bottom: '5px',
          left: 24,
        };
  }, [element, direction, ratio]);

  const thumbStyles = useMemo(() => {
    return direction === SCROLL_DIRECTION.VERTICAL
      ? {
          height: scrollBoxSize / ratio,
          top: scrollBoxOffset / ratio,
        }
      : {
          width: scrollBoxSize / ratio,
          left: scrollBoxOffset / ratio,
        };
  }, [direction, ratio, scrollBoxSize, scrollBoxOffset]);

  return (
    <Track className="editor-scrollbar" style={trackStyles}>
      <ThumbWrapper>
        <Thumb style={thumbStyles} onMouseDown={handleScrollThumbMouseDown} />
      </ThumbWrapper>
    </Track>
  );
};

export default EditorScrollbar;
