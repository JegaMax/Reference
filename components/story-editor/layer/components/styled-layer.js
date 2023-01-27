import styled, { css } from 'styled-components';
import { getAnimation, getAnimationInitialState, getAnimationTiming } from '../../../../utils/editorUtils';

const LayerContainer = styled.div.attrs(
  ({ width, height, zIndex, opacity, transform, top, left, border }) => ({
    style: {
      width,
      height,
      zIndex,
      opacity,
      transform,
      top,
      left,
      border,
    },
  }),
)`
  position: absolute;
  cursor: ${({ cursor }) => cursor};
  &:hover {
    cursor: ${({ cursor, isActive }) => (isActive ? cursor : 'default')};
  }
  div {
    min-height: 100%;
    min-width: 100%;
  }
  ${({ skipPointerEvents }) =>
    skipPointerEvents &&
    css`
      pointer-events: none;
    `}
`;

const AnimationContainer = styled.div`
  ${({ display }) =>
    display &&
    css`
      display: ${display};
      width: 100%;
      height: 100%;
    `}
  ${({
    width,
    height,
    rotate,
    offsetX,
    offsetY,
    thickness,
    animateIn,
    animateInDelay,
    animateInDuration,
    animateOut,
    animateOutDuration,
    animateOutDelay,
    containerWidth,
    containerHeight,
    areAnimationsRunning,
    isFullscreen,
    isGroupLayer,
  }) =>
    areAnimationsRunning && animateIn.length > 0 && animateOut.length > 0
      ? css`
          animation-fill-mode: forwards;
          animation-delay: ${animateInDelay}s, ${animateInDuration + animateInDelay + animateOutDelay}s;
          animation-duration: ${animateInDuration}s, ${animateOutDuration}s;
          animation-timing-function: ${getAnimationTiming({
              animateIn,
            })},
            ${getAnimationTiming({
              animateIn: animateOut,
            })};
          animation-name: ${getAnimation({
              width,
              height,
              rotate,
              offsetX,
              offsetY,
              thickness,
              animateIn,
              containerWidth: Number(containerWidth),
              containerHeight: Number(containerHeight),
              isFullscreen,
              isGroupLayer,
            })},
            ${getAnimation({
              width,
              height,
              rotate,
              offsetX,
              offsetY,
              thickness,
              animateIn: animateOut,
              containerWidth: Number(containerWidth),
              containerHeight: Number(containerHeight),
              isFullscreen,
              isGroupLayer,
            })};
        `
      : areAnimationsRunning && animateIn.length > 0
      ? css`
          animation-fill-mode: forwards;
          animation-delay: ${animateInDelay}s;
          animation-duration: ${animateInDuration}s;
          animation-timing-function: ${getAnimationTiming({
            animateIn,
          })};
          animation-name: ${getAnimation({
            width,
            height,
            rotate,
            offsetX,
            offsetY,
            thickness,
            animateIn,
            containerWidth: Number(containerWidth),
            containerHeight: Number(containerHeight),
            isFullscreen,
            isGroupLayer,
          })};
        `
      : areAnimationsRunning && animateOut.length > 0
      ? css`
          animation-fill-mode: forwards;
          animation-delay: ${animateOutDelay}s;
          animation-duration: ${animateOutDuration}s;
          animation-timing-function: ${getAnimationTiming({
            animateIn: animateOut,
          })};
          animation-name: ${getAnimation({
            width,
            height,
            rotate,
            offsetX,
            offsetY,
            thickness,
            animateIn: animateOut,
            containerWidth: Number(containerWidth),
            containerHeight: Number(containerHeight),
            isFullscreen,
            isGroupLayer,
          })};
        `
      : css``}
  ${({ animateIn, animateInDelay, areAnimationsRunning }) =>
    animateInDelay && areAnimationsRunning ? getAnimationInitialState(animateIn) : css``}
`;

export default {
  LayerContainer,
  AnimationContainer,
};
