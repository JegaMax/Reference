import styled, { css } from 'styled-components';

const Percentage = styled.span`
  color: var(--white);
  margin-right: 2px;
`;

const EditorZoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 184px;
  position: absolute;
  bottom: calc(100% + 8px);
  background: var(--shade-900-85);
  border: 1px solid var(--shade-700-85);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 6px;
  z-index: 112;
  transform: translateX(-50%);
  left: 50%;
  max-height: max(
    calc(
      var(--editor-height) - (var(--editor-wrapper-padding) * 2) - var(--layer-button-height) -
        var(--toolbar-layers-menu-offset) - var(--toolbar-height) - 8px
    ),
    163px
  );
`;

const ZoomOptionFitWrapper = styled.div`
  padding: 12px;
  border-bottom: 1px solid var(--shade-700-85);
`;

const ZoomOptionsWrapper = styled.div`
  padding: 12px;
  overflow: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  &:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--shade-300-85) transparent;
  }
  &:hover::-webkit-scrollbar {
    width: 3px;
    border-radius: 2px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
  }
`;

const ZoomOption = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: ${({ isActive }) => (isActive ? 'var(--shade-900)' : 'var(--shade-100)')};
  background: ${({ isActive }) => (isActive ? 'var(--primary)' : 'transparent')};
  border-radius: 6px;
  text-align: center;
  padding: 3px 15px;
  cursor: pointer;
  transition: 0.12s ease;
  &:not(:last-of-type) {
    margin: 0 0 4px;
  }
  ${({ isActive }) =>
    !isActive &&
    css`
      &:hover {
        color: var(--shade-900);
        background: var(--primary);
      }
    `}
`;

export default {
  EditorZoomWrapper,
  ZoomOptionFitWrapper,
  ZoomOptionsWrapper,
  ZoomOption,
  Percentage,
};
