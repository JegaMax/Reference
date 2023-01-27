import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  justify-content: space-between;
  max-width: 100%;
  height: 100%;
  overflow: auto;
  padding: ${({ isOverflowing }) => (isOverflowing ? '0 17px 0 20px' : '0 20px')};
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background 0.12s ease;
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

const EditorModalContentWrapper = ({ id, className, children }) => {
  const contentWrapperRef = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  const isContentOverflowing = (element) => {
    const curOverflow = element.style.overflow;

    if (!curOverflow || curOverflow === 'visible') {
      element.style.overflow = 'hidden';
    }

    const isOverflowing = element.clientWidth < element.scrollWidth || element.clientHeight < element.scrollHeight;

    element.style.overflow = curOverflow;

    return isOverflowing;
  };

  useEffect(() => {
    if (contentWrapperRef?.current) {
      setIsOverflowing(isContentOverflowing(contentWrapperRef.current));
    }
  }, [contentWrapperRef.current]);

  return (
    <ContentWrapper id={id} className={className} ref={contentWrapperRef} isOverflowing={isOverflowing}>
      {children}
    </ContentWrapper>
  );
};

export default EditorModalContentWrapper;
