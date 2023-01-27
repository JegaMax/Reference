import React from 'react';
import styled from 'styled-components';

const Text = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: ${({ $margin }) => $margin && $margin};
  width: ${({ $width }) => $width && $width};
`;

const SuccessSubText = ({ text, width = '100%', margin = '0' }) => {
  return (
    <Text $width={width} $margin={margin}>
      {text}
    </Text>
  );
};

export default SuccessSubText;
