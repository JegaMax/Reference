import { memo, useCallback, useEffect, useRef } from 'react';
import styled from 'styled-components';


const TooltipContainer = styled.div`
  display: flex;
  margin-left: 28px;

  position: fixed;
  z-index: 9999;

  width: auto !important;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 8px;
  background: var(--shade-100);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 6px;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-900);
  white-space: nowrap;
  opacity: 0;
  transition: opacity 225ms ease;
  ${({ showTooltip }) => showTooltip && `opacity: 1`};
  ${({ inverted }) =>
    inverted &&
    `
    background: var(--shade-900);
    color: var(--shade-100);
    padding: 5.5px 12px;
    `}
`;

const MoveableTooltip = ({
  position = 'right',
  width,
  showTooltip,
  text,
  inverted = false,
  children,
}) => {
  const tooltipRef = useRef(null);

  const move = useCallback(
    (e) => {
      if (tooltipRef.current) {
        if (position === 'right') {
          tooltipRef.current.style.left = e.clientX + 'px';
          tooltipRef.current.style.top = e.clientY + 'px';
        }
        if (position === 'left' && width) {
          tooltipRef.current.style.left = `${e.clientX - width - 28}px`;
          tooltipRef.current.style.top = e.clientY + 'px';
        }
      }
    },
    [position, width],
  );

  useEffect(() => {
    if (showTooltip) {
      document.addEventListener('mousemove', move, false);
    } else {
      document.removeEventListener('mousemove', move, false);
    }

    return () => {
      document.removeEventListener('mousemove', move, false);
    };
  }, [showTooltip, move]);

  return (
    <TooltipContainer ref={tooltipRef} showTooltip={showTooltip} inverted={inverted}>
      {text ?? children}
    </TooltipContainer>
  );
};

export default memo(MoveableTooltip);
