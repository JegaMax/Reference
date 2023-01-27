import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  position: ${({ position }) => position};
  flex: ${({ flex }) => flex};
  margin: ${({ margin }) => margin};
  ${({ oddStyles }) =>
    oddStyles
      ? css`
          &:nth-child(odd) {
            ${oddStyles}
          }
        `
      : ''}
`;

const ListItemWrapper = ({
  id,
  className,
  children,
  margin,
  position,
  flex,
  onMouseEnter,
  onMouseLeave,
  oddStyles,
}) => {
  return (
    <Wrapper
      id={id}
      className={className}
      margin={margin}
      position={position}
      flex={flex}
      oddStyles={oddStyles}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </Wrapper>
  );
};

export default ListItemWrapper;
