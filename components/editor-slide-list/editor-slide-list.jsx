import { batch, useDispatch, useSelector } from 'react-redux';



import SlideListElement from './editor-slide-list-element/editor-slide-list-element';

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import styled, { css } from 'styled-components';
import plusImage from './images/editor-slide/plus.svg';
import { addNewSlide, reorderSlides, selectActiveSlide, setActiveSlidePosition } from '../../appredux/features/amp-story/ampStorySlice';
import { incrementStoryChangedCount } from '../../appredux/features/editor/helpers/helpersSlice';
import { stopPropagation } from '../../utils/common';

const ContainerWrapper = styled.div`
  display: flex;
  min-height: 154px;
  pointer-events: auto;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 auto;
  align-items: center;
  padding: 12px 12px 4px;
  background: rgba(20, 20, 31, 0.85);
  overflow: hidden;
  max-width: 434px;
  min-width: 58px;
  box-shadow: 24px 32px 72px rgba(0, 0, 0, 0.18);
  border-radius: 12px;
  @-moz-document url-prefix() {
    padding: ${($isOverflowing) => ($isOverflowing ? '10px 12px 2px' : '12px 12px 4px')};
  }
`;
const SlideWrapper = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  padding-bottom: 5px;
  border-radius: 8px;
  @-moz-document url-prefix() {
    & {
      scrollbar-width: thin;
      scrollbar-color: var(--shade-300-85) transparent;
      ${($isOverflowing) =>
        $isOverflowing &&
        css`
          padding-bottom: 2px;
        `}
    }
  }
  &::-webkit-scrollbar {
    height: 5px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  > div {
    margin: 0 3px;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
`;
const ButtonContainer = styled.div`
  display: inline-flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: ${({ $isOverflowing }) => ($isOverflowing ? '6px' : '8px')};
`;

const SlideButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.primary ? '#F6522B' : '#ABABBA')};
  width: 18px;
  height: 18px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
  border-radius: 50%;
  border: none;
  outline: none;
  cursor: pointer;
`;
const AddSlideButton = styled(SlideButton)`
  margin-left: auto;
`;

const DraggableContainer = styled.div``;
const SliderOuterWrapper = styled.div`
  width: 100%;
  max-height: 100%;
`;

const EditorSlideList = () => {
  const dispatch = useDispatch();
  const outerWrapperRef = useRef(null);
  const containerRef = useRef(null);
  const slides = useSelector((state) => state.ampStory.present.cuts);
  const activeSlide = useSelector(selectActiveSlide);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }
    const newActiveSlidePosition = calculateNewActiveSlide(
      result.source.index,
      result.destination?.index,
      activeSlide?.position,
    );

    batch(() => {
      dispatch(
        reorderSlides({
          sourceSlideId: result.source.index,
          destinationSlideId: result.destination?.index,
        }),
      );
      dispatch(incrementStoryChangedCount(true));
      dispatch(setActiveSlidePosition(newActiveSlidePosition));
    });
  };

  const calculateNewActiveSlide = (sourceSlide, destinationSlide = 0, activeSlide = 0) => {
    // if dragged slide is the same as active slide, dragged slides' new position will be active
    if (sourceSlide === activeSlide) {
      return destinationSlide;
    }

    const isGoingDownwards = sourceSlide < activeSlide && activeSlide <= destinationSlide;
    const isGoingUpwards = sourceSlide > activeSlide && activeSlide >= destinationSlide;

    //If the dragged slide is going downards changing active slides' position we subtract from it
    if (isGoingDownwards) {
      return activeSlide - 1;
    }

    //If the dragged slide is going downards changing active slides' position we add to it
    if (isGoingUpwards) {
      return activeSlide + 1;
    }

    //If other slides than the active slide are reordered we keep the active slide
    return activeSlide;
  };
  const onNewSlideAdd = () => {
    dispatch(addNewSlide());
  };

  const setInnerWrapperOverflow = useCallback((isOverflowing) => {
    setIsOverflowing(isOverflowing);
  }, []);

  useEffect(() => {
    if (outerWrapperRef?.current) {
      const innerWrapper = outerWrapperRef.current.childNodes[0];
      const containerWrapper = containerRef.current;
      setInnerWrapperOverflow(containerWrapper.offsetWidth > innerWrapper.offsetWidth);
    }
  }, [setInnerWrapperOverflow]);

  useEffect(() => {
    const activeSlideId = `slide-preview-${activeSlide?.position}`;
    const activeSlideDomElement = document.getElementById(activeSlideId);
    if (activeSlideDomElement) {
      activeSlideDomElement.scrollIntoView({ behavior: 'smooth', inline: 'center' });
    }
  }, [activeSlide?.position]);

  return (
    <ContainerWrapper onMouseDown={stopPropagation} ref={containerRef}>
      <Container $isOverflowing={isOverflowing}>
        <ButtonContainer $isOverflowing={isOverflowing}>
          {/*<SlideButton>*/}
          {/*  <img src={bothDirectionArrows} />*/}
          {/*</SlideButton>*/}
          <AddSlideButton primary onClick={onNewSlideAdd}>
            <img src={plusImage} alt="Plus" />
          </AddSlideButton>
        </ButtonContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="scroll-slides" direction="horizontal">
            {(provided) => (
              <SliderOuterWrapper ref={outerWrapperRef}>
                <SlideWrapper {...provided.droppableProps} $isOverflowing={isOverflowing} ref={provided.innerRef}>
                  {slides.map((slide, index) => (
                    <Draggable
                      index={index}
                      key={`${slide.position}-${slide._id}`}
                      draggableId={`${slide.position}-${slide._id}`}
                    >
                      {(provided) => (
                        <DraggableContainer
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <SlideListElement key={slide._id} slide={slide} />
                        </DraggableContainer>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </SlideWrapper>
              </SliderOuterWrapper>
            )}
          </Droppable>
        </DragDropContext>
      </Container>
    </ContainerWrapper>
  );
};

export default memo(EditorSlideList);
