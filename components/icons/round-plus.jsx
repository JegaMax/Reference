import { memo } from 'react';
import styled from 'styled-components';

const Circle = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${({ $size }) => ($size ? $size : '18px')};
  height: ${({ $size }) => ($size ? $size : '18px')};
  border-radius: 50%;
  background: var(--shade-100);
  color: var(--shade-900);
`;

const RoundPlus = ({ className, size }) => {
  return (
    <Circle className={className} $size={size}>
      <svg
        className={className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="m16.0625,11.0625l-3.125,0l0,-3.125c0,-0.5625 -0.375,-0.9375 -0.9375,-0.9375c-0.5625,0 -0.9375,0.375 -0.9375,0.9375l0,3.125l-3.125,0c-0.5625,0 -0.9375,0.375 -0.9375,0.9375c0,0.5625 0.375,0.9375 0.9375,0.9375l3.125,0l0,3.125c0,0.5625 0.375,0.9375 0.9375,0.9375c0.5625,0 0.9375,-0.375 0.9375,-0.9375l0,-3.125l3.125,0c0.5625,0 0.9375,-0.375 0.9375,-0.9375c0,-0.5625 -0.375,-0.9375 -0.9375,-0.9375z"
          fill="currentColor"
        />
      </svg>
    </Circle>
  );
};

export default memo(RoundPlus);
