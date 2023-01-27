import React, { ReactNode } from 'react';
import styled from 'styled-components';

const Section = styled.div`
  padding: ${({ padding }) => (padding ? padding : '0 32px')};
  &:not(:last-of-type) {
    margin: 0 0 40px;
  }
`;

const FormSection = ({ padding, children }) => {
  return <Section padding={padding}>{children}</Section>;
};

export default FormSection;
