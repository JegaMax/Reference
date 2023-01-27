import ChevronDownIcon from 'components/icons/chevron-down';
import styled, { css } from 'styled-components';

const LayersMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 238px;
  position: absolute;
  bottom: calc(100% + 8px);
  background: var(--shade-900-85);
  border: 1px solid var(--shade-700-85);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 6px;
  z-index: 112;
  max-height: max(
    calc(
      var(--editor-height) - (var(--editor-wrapper-padding) * 2) - var(--layer-button-height) -
        var(--toolbar-layers-menu-offset) - var(--toolbar-height) - 8px
    ),
    163px
  );
`;

const LayersWrapper = styled.div`
  padding: 0 12px 7px;
  margin-top: 16px;
  flex: 1;
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

const LayerItemImageWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 18px;
  height: 18px;
  & svg {
    max-width: 100%;
    color: var(--shade-100);
  }
  ${({ isGreyedOut }) =>
    isGreyedOut &&
    css`
      & svg {
        color: var(--shade-300);
      }
    `}
`;

const LayerItemButtonWrapper = styled(LayerItemImageWrapper)`
  &:not(:last-child) {
    margin-right: 4px;
  }
  ${({ isActive }) =>
    !isActive &&
    css`
      visibility: hidden;
      pointer-events: none;
      opacity: 0;
      transition: opacity 0.12s ease;
    `}
`;

const LayerItemName = styled.div`
  flex: 1;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  ${({ capitalize }) =>
    capitalize &&
    css`
      text-transform: capitalize;
    `};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 8px;
  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--shade-900);
    `}
  ${({ isGreyedOut }) =>
    isGreyedOut &&
    css`
      color: var(--shade-300);
    `}
`;

const DropdownIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: stretch;
  margin-left: 8px;
  margin-right: 6px;
`;

const DropdownIcon = styled(ChevronDownIcon)`
  width: 8px;
  height: 5px;
  transform: rotate(${({ isMenuOpen }) => (isMenuOpen ? `0` : '-90')}deg);
  color: var(--shade-100);
`;

const LayerItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ isGroup }) => (isGroup ? '3px 10px 3px 2px' : '3px 10px 3px 24px')};
  border-radius: 6px;
  margin-bottom: 4px;
  cursor: pointer !important;
  transition: background 0.12s ease;
  user-select: none;
  &:hover {
    background: var(--primary);
  }
  ${({ isActive }) =>
    isActive &&
    css`
      background: var(--primary);
      & ${LayerItemImageWrapper} svg {
        color: var(--shade-900);
      }
      & ${DropdownIcon} {
        color: var(--shade-900);
      }
      & ${LayerItemButtonWrapper} {
        pointer-events: auto;
        visibility: visible;
        opacity: 1;
      }
    `}

  &:hover ${LayerItemImageWrapper} svg {
    color: var(--shade-900);
  }
  &:hover ${LayerItemName} {
    color: var(--shade-900);
  }
  &:hover ${DropdownIcon} {
    color: var(--shade-900);
  }
  &:hover ${LayerItemButtonWrapper} {
    pointer-events: auto;
    visibility: visible;
    opacity: 1;
  }
  &:focus {
    cursor: grab;
  }
`;

const SocialMarginLabel = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const SocialMarginsItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.12s ease;
  &:hover {
    background: var(--primary);
  }
  &:hover ${SocialMarginLabel} {
    color: var(--shade-900);
  }
`;

const SocialMarginsWrapper = styled.div`
  padding: 14px 12px 18px;
  border-top: 1px solid var(--white-10);
`;

const LayerTitleInput = styled.input`
  color: var(--white);
  font-family: Heebo;
  font-size: 10px;
  max-width: 100%;
  width: 100%;
  border-radius: 4px;
  background: transparent;
  border: none;
  &:focus,
  &:active {
    outline: none;
    border: none;
  }
  ${({ value }) =>
    value.length > 0 &&
    css`
      text-align: left;
      background: var(--shade-300-85);
    `};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--shade-300);
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: var(--shade-300);
    opacity: 1;
  }
`;

export default {
  SocialMarginLabel,
  SocialMarginsItem,
  SocialMarginsWrapper,
  LayerItem,
  LayerItemButtonWrapper,
  LayerItemImageWrapper,
  LayerItemName,
  LayersWrapper,
  LayersMenuWrapper,
  LayerTitleInput,
  DropdownIconWrapper,
  DropdownIcon,
};
