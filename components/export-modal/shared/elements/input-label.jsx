import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0 0 6px;
`;

const InputLabel = ({ htmlFor, text }) => {
  return <Label htmlFor={htmlFor}>{text}</Label>;
};

export default InputLabel;
