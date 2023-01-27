import styled, { css } from 'styled-components';

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: ${({ top, left, layerTextContentLength, isCtaLayer }) =>
    `translate(${left}px, ${isCtaLayer ? (layerTextContentLength < 23 ? top - top / 100 : top - top / 25) : top}px)`};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  padding: 4px 7px;
  display: flex;
  background-color: var(--shade-900-85);
  border-radius: 6px;
  opacity: ${({ isContainerVisible }) => (isContainerVisible ? 1 : 0)};
  color: var(--shade-100);
  /* ${({ isMenuOverHeader, top, left }) =>
    isMenuOverHeader &&
    css`
      top: ${top}px;
      left: ${left}px;
      transform: translate(0, 0);
    `} */
  &&& > div {
    margin: 0 2px;
    border: none;
    transition: background-color 300ms ease;
    &:first-child {
      margin-left: 0;
    }
    &:last-child {
      margin-right: 0;
    }
  }
  &.multiselect-menu-fade-appear {
    opacity: 0;
  }
  &.multiselect-menu-fade-appear-active {
    opacity: 1;
    transition: opacity 500ms linear;
  }
  &.multiselect-menu-fade-appear-done,
  &.multiselect-menu-fade-enter-done {
    opacity: 1;
  }

  &.multiselect-menu-fade-enter {
    opacity: 0;
  }
  &.multiselect-menu-fade-enter-active {
    opacity: 1;
    transition: opacity 500ms linear;
  }

  &.multiselect-menu-fade-exit {
    opacity: 1;
  }
  &.multiselect-menu-fade-exit-active {
    opacity: 0;
    transition: opacity 100ms linear;
  }
`;

export default {
  Container,
};

// .fade-enter {
//   opacity: 0;
// }
// .fade-enter-active {
//   opacity: 1;
//   transition: opacity 120ms;
// }
// .fade-exit {
//   opacity: 1;
// }
// .fade-exit-active {
//   opacity: 0;
//   transition: opacity 120ms;
// }
