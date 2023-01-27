import styled, { css } from 'styled-components';
import ChevronDownIcon from '../../icons/chevron-down';
import EditorSidebarSectionWrapper from '../shared/structure/editor-sidebar-section-wrapper';

const AnimationSectionWrapper = styled(EditorSidebarSectionWrapper)`
  padding: 28px 24px 27px;
  ${({ disableCursor }) =>
    disableCursor &&
    css`
      cursor: default;
      * {
        cursor: default;
      }
    `}
  &:last-of-type {
    border-bottom: 1px solid var(--shade-700-85);
    padding-bottom: 26px;
    ${({ removeBorder }) =>
      removeBorder &&
      css`
        border-bottom: 0;
      `}
  }
`;

const OutsideClickHandlerWrapper = styled.div`
  width: 100%;
  & > * {
    width: 100%;
  }
`;

const AnimationsDropdownWrapper = styled.div`
  display: block;
  position: relative;
  width: 100%;
`;

const AnimationLabel = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: #ffffff;
`;

const DropdownIcon = styled(ChevronDownIcon)`
  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);
  color: var(--white);
`;

const AnimationDropdownTrigger = styled.div`
  display: flex;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  background: var(--shade-700-85);
  padding: 12px 50px 12px 12px;
  width: 100%;
  border: 1px solid transparent;
  cursor: pointer;
  ${({ isDropdownOpen }) =>
    isDropdownOpen &&
    css`
      border-color: var(--shade-300);
    `}

  ${({ isDisabled }) =>
    isDisabled
      ? css`
          & ${AnimationLabel} {
            color: var(--shade-300);
          }
          & ${DropdownIcon} {
            color: var(--shade-300);
          }
        `
      : css`
          &:hover {
            border-color: var(--shade-300);
          }
        `}
`;

const AnimationIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  overflow: hidden;
  width: 40px;
  height: 40px;
  background: var(--white-10);
`;

const AnimationIcon = styled.img`
  max-width: 100%;
`;

const AnimationLabelWrapper = styled.div`
  display: block;
  padding: 3px 12px;
`;

const DropdownMenuWrapper = styled.div`
  display: block;
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  background: var(--shade-700-85);
  border: 1px solid var(--shade-500-85);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 6px;
  padding: ${({ isOverflowing }) => (isOverflowing ? '9px 8px 0 5px' : '0 8px 0')};
  scrollbar-width: none;
  max-height: 376px;
  width: 100%;
  overflow: auto;
  z-index: 1;
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

const AnimationItem = styled.div`
  display: flex;
  padding: 4px;
  border-radius: 6px;
  margin: 0 0 12px;
  transition: background 0.12s ease;
  cursor: pointer;
  &:hover {
    background: var(--primary);
    ${AnimationLabel} {
      color: var(--shade-900);
    }
    ${AnimationIconWrapper} {
      background: var(--shade-900);
    }
  }
`;

const AnimationPreviewButton = styled.button`
  display: block;
  padding: 8px 12px;
  color: var(--shade-900);
  background: var(--primary);
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.16);
  border-radius: 6px;
  cursor: pointer;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.01em;
  width: 100%;
  outline: none;
  border: none;
  transition: background 0.12s ease;
  &:hover {
    background: var(--primary-85);
  }
  :disabled {
    background: var(--primary-20);
    cursor: default;
  }
`;

const AnimationToggleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
`;

const AnimationPrimaryLabel = styled.h4`
  margin: 0;
  padding: 0;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--white);
`;

export default {
  AnimationIcon,
  AnimationLabel,
  AnimationIconWrapper,
  AnimationLabelWrapper,
  AnimationItem,
  AnimationDropdownTrigger,
  AnimationPreviewButton,
  AnimationsDropdownWrapper,
  AnimationSectionWrapper,
  DropdownMenuWrapper,
  OutsideClickHandlerWrapper,
  DropdownIcon,
  AnimationToggleContainer,
  AnimationPrimaryLabel,
};
