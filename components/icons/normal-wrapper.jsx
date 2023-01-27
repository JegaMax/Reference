import { memo } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  transform: ${(props) => props.transform};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: ${(props) => props.margin};
  cursor: pointer;
  svg > * {
    fill: ${(props) => props.iconColor};
  }
`;

const NormalIconWrapper = ({
  children,
  margin = '0',
  height = '24px',
  width = '24px',
  iconColor = 'var(--shade-100)',
  transform,
}) => (
  <Container margin={margin} height={height} width={width} iconColor={iconColor} transform={transform}>
    {children}
  </Container>
);

export default memo(NormalIconWrapper);
