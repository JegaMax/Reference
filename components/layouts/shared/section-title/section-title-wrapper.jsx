import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: sticky;
  margin-bottom: 16px;
  top: 34px;
  ${({ isSticky }) =>
    isSticky &&
    css`
      z-index: 5;
      display: inline-flex;
    `}
`;

const InnerWrapper = styled.div`
  display: flex;
  align-items: center;
  ${({ isSticky }) =>
    isSticky &&
    css`
      transition: 0.12s ease;
    `}
`;

const SectionTitleWrapper = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);

  const onStickyChange = useCallback(
    (element) => () => {
      const top = element?.getBoundingClientRect().top;
      if ((isSticky && top < -1) || (isSticky && top > 70)) {
        setIsSticky(false);
      }
      if (!isSticky && top === 34) {
        setIsSticky(true);
      }
    },
    [isSticky],
  );

  useEffect(() => {
    if (ref?.current) {
      const element = ref?.current;
      window.addEventListener('scroll', onStickyChange(element));

      return () => window.removeEventListener('scroll', onStickyChange(element));
    }
  }, [onStickyChange]);

  return (
    <Wrapper isSticky={isSticky} ref={ref}>
      <InnerWrapper isSticky={isSticky}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, {
            isSticky,
          });
        })}
      </InnerWrapper>
    </Wrapper>
  );
};

export default SectionTitleWrapper;
