import React from 'react';
import styled from 'styled-components';

const Title = styled.h4`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--white);
  justify-self: center;
  margin: 0 15px;
`;

const HeaderTitle = ({ className, text }) => {
  return <Title className={className}>{text}</Title>;
};

export default HeaderTitle;
