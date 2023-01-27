import React from 'react';
import styled from 'styled-components';

const Title = styled.h5`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin: 0 0 23px;
`;

const SectionTitle = ({ text }) => {
  return <Title>{text}</Title>;
};

export default SectionTitle;
