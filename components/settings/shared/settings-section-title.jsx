import React from 'react';
import styled from 'styled-components';

const Title = styled.h3`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: ${({ $margin }) => ($margin ? $margin : `0 0 13px`)};
`;

const SettingsSectionTitle = ({ text, margin }) => {
  return <Title $margin={margin}>{text}</Title>;
};

export default SettingsSectionTitle;
