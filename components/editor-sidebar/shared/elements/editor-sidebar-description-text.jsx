import { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  margin: ${({ customMargin }) => customMargin ?? '8px 0 16px 0'};
`;

const Content = styled.p`
  margin: 0;

  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const EditorSidebarDescriptionText = ({ text, customMargin }) => (
  <Container customMargin={customMargin}>
    <Content>{text}</Content>
  </Container>
);

export default memo(EditorSidebarDescriptionText);
