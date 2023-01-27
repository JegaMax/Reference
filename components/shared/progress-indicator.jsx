import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  box-sizing: content-box;
  height: 12px; /* Can be anything */
  position: relative;
  background: #555;
  background: var(--shade-300-85);
  border-radius: 19px;
  box-shadow: inset 0 -1px 1px rgba(255, 255, 255, 0.3);
`;

const Bar = styled.span`
  display: block;
  height: 100%;
  border-radius: 19px;
  background-color: var(--primary);
  background-image: linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%);
  box-shadow: inset 0 2px 9px rgba(255, 255, 255, 0.3), inset 0 -2px 6px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;
  transition: width 3s linear;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    z-index: 1;
    background-size: 50px 50px;
    animation: move 2s linear infinite;
    border-radius: 19px;
    overflow: hidden;
  }
  @keyframes move {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 50px 50px;
    }
  }
`;

const ProgressIndicator = ({ percentage }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setWidth(100);
    }, 1000);
  }, []);

  return (
    <Container>
      <Bar style={{ width: `${percentage || width}%` }} />
    </Container>
  );
};

export default ProgressIndicator;
