import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  ${({ $isActive }) =>
    $isActive &&
    css`
      color: var(--white);
    `}
`;

const TitleLink = ({ className, isActive, to, children }) => {
  return (
    <StyledLink className={className} $isActive={isActive} to={to}>
      {children}
    </StyledLink>
  );
};

TitleLink.defualtProps = {
  isActive: false,
};

export default TitleLink;
