import { useCallback, useEffect, useState } from 'react';
import { SCROLL_DIRECTION } from '../config/constants';


const useCustomScrolling = ({
  element,
  direction,
  changeDependency,
  ratio,
  shouldCalculateRatio,
}) => {
  const [scrollBoxSize, setScrollBoxSize] = useState(0);
  const [scrollBoxOffset, setScrollBoxOffset] = useState(0);
  const [lastScrollThumbPosition, setScrollThumbPosition] = useState(0);
  const [isDragging, setDragging] = useState(false);

  const handleDocumentMouseUp = useCallback(
    (event) => {
      if (isDragging) {
        event.preventDefault();
        setDragging(false);
      }
    },
    [isDragging],
  );

  const handleDocumentMouseMove = useCallback(
    (event) => {
      if (isDragging && element) {
        event.preventDefault();
        event.stopPropagation();
        if (direction === SCROLL_DIRECTION.VERTICAL) {
          const { scrollHeight, offsetHeight } = element;

          const deltaY = event.clientY - lastScrollThumbPosition;
          const percentage = deltaY * (scrollHeight / offsetHeight);

          setScrollThumbPosition(event.clientY);
          setScrollBoxOffset(Math.min(Math.max(0, scrollBoxOffset + deltaY), offsetHeight - scrollBoxSize));
          element.scrollTop = Math.min(element.scrollTop + percentage, scrollHeight - offsetHeight);
          return;
        }

        const { scrollWidth, offsetWidth } = element;

        const deltaX = event.clientX - lastScrollThumbPosition;
        const percentage = deltaX * (scrollWidth / offsetWidth);

        setScrollThumbPosition(event.clientX);
        setScrollBoxOffset(Math.min(Math.max(0, scrollBoxOffset + deltaX), offsetWidth - scrollBoxSize));
        element.scrollLeft = Math.min(element.scrollLeft + percentage, scrollWidth - offsetWidth);
      }
    },
    [element, isDragging, lastScrollThumbPosition, scrollBoxSize, scrollBoxOffset, direction],
  );

  const handleScrollThumbMouseDown = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();
      setDragging(true);
      if (direction === SCROLL_DIRECTION.VERTICAL) {
        setScrollThumbPosition(event.clientY);
        return;
      }
      setScrollThumbPosition(event.clientX);
    },
    [direction],
  );

  const handleScroll = useCallback(() => {
    if (!element) {
      return;
    }

    let offset;

    if (direction === SCROLL_DIRECTION.VERTICAL) {
      const { scrollTop, scrollHeight, offsetHeight } = element;

      offset = (parseInt(scrollTop.toString(), 10) / parseInt(scrollHeight.toString(), 10)) * offsetHeight;
      offset = Math.min(offset, offsetHeight - scrollBoxSize);
    } else {
      const { scrollLeft, scrollWidth, offsetWidth } = element;

      offset = (parseInt(scrollLeft.toString(), 10) / parseInt(scrollWidth.toString(), 10)) * offsetWidth;
      offset = Math.min(offset, offsetWidth - scrollBoxSize);
    }

    setScrollBoxOffset(offset);
  }, [element, scrollBoxSize, direction]);

  useEffect(() => {
    if (element && changeDependency) {
      let scrollThumbSize;
      if (direction === SCROLL_DIRECTION.VERTICAL) {
        const { clientHeight, scrollHeight } = element;
        const scrollThumbPercentage = shouldCalculateRatio
          ? clientHeight / ratio / scrollHeight
          : clientHeight / scrollHeight;

        scrollThumbSize = shouldCalculateRatio
          ? scrollThumbPercentage * (clientHeight / ratio)
          : scrollThumbPercentage * clientHeight;
      } else {
        const { clientWidth, scrollWidth } = element;
        const scrollThumbPercentage = clientWidth / scrollWidth;

        scrollThumbSize = scrollThumbPercentage * clientWidth;
      }
      setScrollBoxSize(scrollThumbSize);
      element.addEventListener('scroll', handleScroll, true);
    }

    return () => {
      element?.removeEventListener('scroll', handleScroll, true);
    };
  }, [element, handleScroll, changeDependency, direction, ratio, shouldCalculateRatio]);

  useEffect(() => {
    //this is handle the dragging on scroll-thumb
    document.addEventListener('mousemove', handleDocumentMouseMove);
    document.addEventListener('mouseup', handleDocumentMouseUp);
    document.addEventListener('mouseleave', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleDocumentMouseMove);
      document.removeEventListener('mouseup', handleDocumentMouseUp);
      document.removeEventListener('mouseleave', handleDocumentMouseUp);
    };
  }, [handleDocumentMouseMove, handleDocumentMouseUp]);

  return {
    scrollBoxSize,
    scrollBoxOffset,
    handleScrollThumbMouseDown,
  };
};

export default useCustomScrolling;
