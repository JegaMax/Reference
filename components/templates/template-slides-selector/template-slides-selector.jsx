import { ScaleWrapper } from 'components/editor-slide-list/editor-slide-list-element/editor-slide-list-element';
import Layer from 'components/story-editor/layer';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { falseFunction } from 'utils/commonUtils';
import { loadFonts } from 'utils/textEditorUtils';
import { useAppDispatch } from '../../../hooks';
import { applyTemplate } from '../../../appredux/features/templates/templatesSlice';
import { getNewBackground } from '../../../utils/colorUtils';
import Styled from '../template-modal/template-modal-styles';
import { Plus } from './../../icons';

const OuterWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  background: linear-gradient(180deg, rgba(20, 20, 31, 0) 0%, var(--shade-900) 100%);
  border-radius: 0 0 12px 12px;
  padding: 16px;
  width: 100%;
  text-align: center;
`;

const Button = styled.button`
  align-items: center;
  display: inline-flex;
  background: var(--primary);
  box-shadow: 0 4px 12px var(--black-16);
  border-radius: 6px;
  padding: 7px 12px;
  cursor: pointer;
  border: none;
  outline: none;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-900);
`;

const PlusIcon = styled(Plus)`
  width: 20px;
  height: 20px;
  margin-right: 2px;
`;

const SlidesWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  scrollbar-width: none;
  width: 100%;
  height: 100%;
  padding: 0 13px 50px;
  overflow: auto;
  ::-webkit-scrollbar-corner {
    background-color: transparent;
  }
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background-color 0.12s ease;
  }
  &:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--shade-300-85) transparent;
  }
  &:hover::-webkit-scrollbar {
    width: 3px;
    border-radius: 2px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
  }
`;

const miniEditorHeight = 176;

const TemplateSlidesSelector = ({ selectedTemplate, setSelectedTemplate }) => {
  const dispatch = useAppDispatch();
  const emptyRef = useRef();
  const [selectedSlides, setSelectedSlides] = useState([]);

  const editorWidth = +selectedTemplate.initialWidth;
  const editorHeight = +selectedTemplate.initialHeight;

  const dimensionsRatio = useMemo(() => (Number(editorWidth) / Number(editorHeight)).toFixed(2), [
    editorHeight,
    editorWidth,
  ]);
  const miniEditorWidth = useMemo(() => miniEditorHeight * Number(dimensionsRatio), [dimensionsRatio]);

  const getButtonText = () =>
    !selectedSlides || selectedSlides?.length === 0 ? 'Add all artboards' : 'Add selected artboards';

  const onSelectSlides = useCallback(
    (position) => () => {
      const index = selectedSlides.indexOf(position);
      if (index > -1) {
        const selectedSlidesCopy = [...selectedSlides];
        selectedSlidesCopy.splice(index, 1);
        setSelectedSlides(selectedSlidesCopy);
        return;
      }

      setSelectedSlides([...selectedSlides, position]);
    },
    [selectedSlides],
  );

  const onAddSlidesClick = () => dispatch(applyTemplate(selectedTemplate, selectedSlides));

  useEffect(() => {
    loadFonts(selectedTemplate?.googleFonts);
  }, [selectedTemplate?.googleFonts]);

  useEffect(() => {
    return () => {
      setSelectedTemplate(null);
    };
  }, [setSelectedTemplate]);

  return (
    <OuterWrapper>
      <SlidesWrapper>
        {selectedTemplate?.cuts?.map((slide) => {
          const isActiveSlide = selectedSlides?.includes(slide.position);
          return (
            <Styled.ContainerBackground
              activeSlide={isActiveSlide}
              key={`slide-select-${slide.position}`}
              onClick={onSelectSlides(slide.position)}
              margin="0 6px 16px"
              cursor="pointer"
            >
              <Styled.Container
                containerHeight={miniEditorHeight}
                containerWidth={miniEditorWidth}
                style={{
                  background: getNewBackground(slide.backgroundColor),
                }}
              >
                <ScaleWrapper
                  width={editorWidth}
                  height={editorHeight}
                  containerWidth={miniEditorWidth}
                  containerHeight={miniEditorHeight}
                >
                  {slide?.layers
                    ?.filter((layer) => !layer.settings.layerSettings.isLayerHidden)
                    ?.map((layer) => {
                      return (
                        <Layer
                          key={`${slide.position}-${layer._id}-${layer.position}`}
                          layer={layer}
                          activeLayer={false}
                          keepRatio={false}
                          editorWidth={editorWidth}
                          editorHeight={editorHeight}
                          slidePosition={slide.position}
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
                {isActiveSlide && (
                  <>
                    <Styled.ActiveSlideMask />
                    <Styled.StyledChecked right="8px" bottom="8px" zIndex={1000} />
                  </>
                )}
              </Styled.Container>
            </Styled.ContainerBackground>
          );
        })}
      </SlidesWrapper>

      <ButtonWrapper>
        <Button type="button" onClick={onAddSlidesClick}>
          <PlusIcon />
          {getButtonText()}
        </Button>
      </ButtonWrapper>
    </OuterWrapper>
  );
};

export default memo(TemplateSlidesSelector);
