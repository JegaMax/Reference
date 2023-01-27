import React, { ReactNode } from 'react';
import styled from 'styled-components';

const TitleElement = styled.h2`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0;
`;

const Title = ({ className, children }) => {
  return <TitleElement className={className}>{children}</TitleElement>;
};

export default Title;
