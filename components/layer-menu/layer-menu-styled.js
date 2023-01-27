import styled, { css } from 'styled-components';

const NewLayerMenuWrapper = styled.div`
  padding: 12px 0 4px;
  border-radius: 12px;
  background-color: var(--shade-900-85);
  width: 64px;
  align-self: flex-start;
  flex-basis: 64px;
  flex-shrink: 0;
  text-align: center;
  box-shadow: 24px 32px 72px var(--black-18);
`;

const LayerItem = styled.div`
  display: inline-flex;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  margin: 0 0 8px;
  transition: background 0.12s ease;
  &:hover {
    background: var(--shade-500-85);
  }
  ${({ isActive }) =>
    isActive &&
    css`
      background: var(--primary-10);
      &:hover {
        background: var(--primary-10);
      }
    `};
  ${({ isLocked }) =>
    isLocked &&
    css`
      pointer-events: none;
    `};
`;

const StyledDiv = styled.div`
  position: relative;
  line-height: 0;
  span {
    visibility: hidden;
  }

  &:hover {
    span {
      visibility: visible;
    }
  }
`;

export default {
  StyledDiv,
  LayerItem,
  NewLayerMenuWrapper,
};
