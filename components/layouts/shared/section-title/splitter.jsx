import React from 'react';
import styled from 'styled-components';

const SplitterElement = styled.span`
  margin: 0 4px;
  color: inherit;
`;

const Splitter = ({ className }) => {
  return <SplitterElement className={className}>/</SplitterElement>;
};

export default Splitter;
