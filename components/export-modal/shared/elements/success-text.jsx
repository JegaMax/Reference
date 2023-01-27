import React from 'react';
import styled from 'styled-components';


const Text = styled.h4`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--white);
  max-width: ${({ width }) => (width ? width : '210px')};
  margin: auto;
`;

const SuccessText = ({ width, text }) => {
  return <Text width={width}>{text}</Text>;
};

export default SuccessText;
