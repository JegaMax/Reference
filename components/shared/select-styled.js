import styled, { css } from 'styled-components';
import ChevronDownIcon from '../icons/chevron-down';


const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const SelectDropdownIcon = styled(ChevronDownIcon)`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: var(--white);
`;

const SelectDropdownTriggerValue = styled.div.attrs(({ fontFamily }) => ({
  style: {
    fontFamily: `"${fontFamily}"`,
  },
}))`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--white);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SelectDropdownTrigger = styled.div`
  background: var(--shade-700-85);
  border: ${({ isFocused }) => (isFocused ? '1px solid var(--shade-300-85);' : '1px solid transparent')};
  border-radius: 6px;
  padding: 7px 24px 7px 12px;
  cursor: pointer;
  &:hover,
  &:focus {
    border: 1px solid var(--shade-300-85);
  }
  ${({ styles }) => styles}
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      & ${SelectDropdownIcon} {
        color: var(--shade-300);
      }
      & ${SelectDropdownTriggerValue} {
        color: var(--shade-300);
      }
    `}
`;

const SelectDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 8px);
  overflow: hidden;
  ${({ dropdownPosition }) =>
    dropdownPosition === 'left'
      ? css`
          left: 0;
          right: auto;
        `
      : `left: auto; right: 0;`}
  width: ${({ dropdownWidth }) => (dropdownWidth ? dropdownWidth : '100%')};
  max-height: ${({ isLarge }) => (isLarge ? '360px' : '300px')};
  background: var(--shade-700);
  border: 1px solid var(--shade-500-85);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 6px;
`;

const SelectDropdownContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  max-width: 100%;
  overflow: auto;
  overflow: overlay;
  margin-top: 12px;
  padding: 0;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 0;
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
  & .infinite-scroll-component__outerdiv {
    max-width: 100%;
  }
`;

const SelectOption = styled.div.attrs(({ fontFamily }) => ({
  style: {
    fontFamily,
  },
}))`
  width: 100%;
  flex-basis: 100%;
  font-family: Heebo;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: #ababba;
  padding: 3px 8px;
  border-radius: 6px;
  transition: 0.12s ease;
  cursor: pointer;
  margin-bottom: 4px;
  &:hover {
    background: var(--primary);
    color: var(--shade-900);
  }
  ${({ isSelected }) =>
    isSelected &&
    css`
      background: var(--primary);
      color: var(--shade-900);
    `}
`;

const OptionSection = styled.div`
  &&& {
    padding: 0 15px;
    width: 100%;
    overflow-x: hidden;
    &:not(:first-of-type) {
      border-top: 1px solid var(--shade-500-85);
      margin-top: 10px;
      padding: 10px 15px 0;
    }
  }
`;

const OptionSectionTitle = styled.h5`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--shade-300);
  padding: 4px 8px;
  margin: 0 0 4px;
`;

export default {
  SelectWrapper,
  SelectDropdownIcon,
  SelectDropdownTriggerValue,
  SelectDropdownTrigger,
  SelectDropdownWrapper,
  SelectDropdownContentWrapper,
  SelectOption,
  OptionSection,
  OptionSectionTitle,
};
