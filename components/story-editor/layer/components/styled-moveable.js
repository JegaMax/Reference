import { isNil } from 'lodash';
import Moveable from 'react-moveable';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  &&& {
    &.group-wrapper,
    &.multiselect-wrapper {
      pointer-events: ${({ $pointerEvents }) => ($pointerEvents ? 'all' : 'none')};
      .moveable-rotation,
      .moveable-control {
        pointer-events: all;
      }
    }
    div {
      min-width: unset;
      min-height: unset;
    }
  }
  // Disalbe nested control box
  .moveable-control-box {
    .moveable-control-box {
      visibility: hidden;
    }
  }
  & {
    ${({ $isActive }) =>
      !$isActive &&
      css`
        .moveable-line,
        .moveable-control {
          pointer-events: none;
          opacity: 0;
          transition: 0.12s ease;
        }
      `}
  }
  & {
    ${({ $isHovered }) =>
      $isHovered &&
      css`
        .moveable-line {
          pointer-events: auto;
          opacity: 1;
          transition: 0.12s ease;
        }
      `}
  }
  &&& {
    ${({ $selectedChildIndex }) =>
      !isNil($selectedChildIndex) &&
      css`
        .moveable-line {
          background: repeating-linear-gradient(
            to right,
            var(--primary),
            var(--primary) 4px,
            transparent 4px,
            transparent 8px
          ) !important;
        }
        > .moveable-control-box {
          > div:nth-child(${$selectedChildIndex + 1}) {
            visibility: visible;
            .moveable-line {
              background: var(--primary) !important;
            }
          }
        }
      `}
  }
`;

const Frame = styled(Moveable)`
  z-index: ${({ position }) => position} !important;
  .moveable-line {
    background: var(--primary) !important;
  }
  .moveable-line.moveable-rotation-line {
    background: var(--primary) !important;
    display: none !important;
  }
  .moveable-rotation .moveable-rotation-control {
    width: 10px;
    height: 10px;
    margin-top: 15px;
    margin-left: -5px;
    border: 1px solid var(--primary) !important;
  }
  .moveable-direction.moveable-ne,
  .moveable-direction.moveable-nw,
  .moveable-direction.moveable-se,
  .moveable-direction.moveable-sw {
    width: 12px;
    height: 12px;
    margin-top: -6px;
    margin-left: -6px;
    background: var(--white) !important;
    border: 1px solid var(--primary) !important;
  }
  .moveable-direction.moveable-e,
  .moveable-direction.moveable-w {
    width: 6px;
    height: 16px;
    margin-top: -8px;
    margin-left: -3px;
    border-radius: 4px;
    background: var(--white) !important;
    border: 1px solid var(--primary) !important;
  }
  .moveable-direction.moveable-n,
  .moveable-direction.moveable-s {
    width: 16px;
    height: 6px;
    margin-top: -3px;
    margin-left: -8px;
    border-radius: 4px;
    background: var(--white) !important;
    border: 1px solid var(--primary) !important;
  }
`;

export default { Frame, Wrapper };
