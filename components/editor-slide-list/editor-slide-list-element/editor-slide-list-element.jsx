import Layer from 'components/story-editor/layer';
import { useAppDispatch, useAppSelector } from 'hooks';
import { memo, useCallback, useMemo, useRef } from 'react';
import styled from 'styled-components';
import { falseFunction } from 'utils/commonUtils';
import { setActiveSlideThunk } from '../../../appredux/features/amp-story/ampStorySlice';
import { getNewBackground } from '../../../utils/colorUtils';

const ContainerBackground = styled.div`
  background: var(--default-editor-bg) center center calc(100% - 4px) calc(100% - 4px);
  border-radius: 8px;
  box-sizing: border-box;
  mask-image: radial-gradient(circle, white 100%, black 100%);
  border: ${({ activeSlide }) => (activeSlide ? '3px solid var(--primary)' : '3px solid transparent')};
  overflow: hidden;
`;

const Container = styled.div`
  margin: 0;
  box-sizing: border-box;
  position: relative;
  width: ${({ containerWidth }) => containerWidth}px;
  height: ${({ containerHeight }) => containerHeight}px;
  max-width: ${({ containerWidth }) => containerWidth}px;
  max-height: ${({ containerHeight }) => containerHeight}px;
  background: rgba(255, 255, 255, 0.1);
`;

export const ScaleWrapper = styled.div`
  transform: ${({ containerHeight, height }) => `scale(${containerHeight / height})`};
  transform-origin: left top;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  pointer-events: none;
`;

const miniEditorHeight = 104;

const SlideListElement = ({ slide }) => {
  const dispatch = useAppDispatch();
  const activeSlidePosition = useAppSelector((state) => state.ampStory.present.activeSlidePosition);
  const editorWidth = useAppSelector((state) => state.ampStory.present.initialWidth);
  const editorHeight = useAppSelector((state) => state.ampStory.present.initialHeight);

  const emptyRef = useRef();

  const dimensionsRatio = useMemo(() => (Number(editorWidth) / Number(editorHeight)).toFixed(2), [
    editorWidth,
    editorHeight,
  ]);

  const miniEditorWidth = useMemo(() => miniEditorHeight * Number(dimensionsRatio), [dimensionsRatio]);

  const onSlideClick = useCallback(() => {
    slide.position !== activeSlidePosition && dispatch(setActiveSlideThunk(slide.position));
  }, [activeSlidePosition, dispatch, slide.position]);

  const reversedLayers = useMemo(() => [...slide.layers].reverse(), [slide]);
  const style = useMemo(
    () => ({
      background: getNewBackground(slide.backgroundColor),
    }),
    [slide.backgroundColor],
  );

  return (
    <ContainerBackground activeSlide={slide.position === activeSlidePosition}>
      <Container
        onClick={onSlideClick}
        id={`slide-preview-${slide.position}`}
        containerWidth={miniEditorWidth}
        containerHeight={miniEditorHeight}
        style={style}
      >
        <ScaleWrapper
          width={editorWidth}
          height={editorHeight}
          containerWidth={miniEditorWidth}
          containerHeight={miniEditorHeight}
        >
          {reversedLayers
            .filter((layer) => !layer.settings.layerSettings.isLayerHidden)
            .map((layer) => {
              return (
                <Layer
                  key={`${slide.position}-${layer._id}-${layer.position}`}
                  layer={layer}
                  activeLayer={false}
                  keepRatio={false}
                  editorWidth={editorWidth}
                  editorHeight={editorHeight}
                  slidePosition={activeSlidePosition}
                  areAnimationsRunning={false}
                  isActive={false}
                  handleLayerClick={falseFunction}
                  handleLayerChange={falseFunction}
                  handleBatchLayerChange={falseFunction}
                  ctaLayerRef={emptyRef}
                  isTextReadOnly
                />
              );
            })}
        </ScaleWrapper>
      </Container>
    </ContainerBackground>
  );
};

export default memo(SlideListElement);
