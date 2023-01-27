import styled, { css } from 'styled-components';
import Check from '../../../../icons/check';

const MenuOuterWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  pointer-events: none;
  opacity: ${({ isMenuVisible }) => (isMenuVisible ? 1 : 0)};
  transition: opacity 0.12s ease;
  z-index: 3;
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 8px;
  top: 8px;
  width: 18px;
  height: 18px;
  border: 1px solid var(--white);
  border-radius: 4px;
  z-index: 3;
  opacity: 0;
  transition: 0.2s ease;
  ${({ isSelected }) =>
    isSelected &&
    css`
      background: var(--primary);
      border-color: var(--primary);
      opacity: 1;
    `}
`;

const StoryWrapper = styled.div`
  display: inline-block;
  width: 136px;
  &:hover ${MenuOuterWrapper} {
    pointer-events: all;
    opacity: 1;
    visibility: visible;
  }
  &:hover ${Select} {
    opacity: 1;
  }
`;

const StoryHeaderWrapper = styled.div`
  position: relative;
`;

const StoryImageWrapper = styled.div`
  position: relative;
  height: 248px;
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
`;

const StoryDraggedImageWrapper = styled.div`
  z-index: -1;
  position: absolute;
  height: 82px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  aspect-ratio: 9 / 16;
  border-radius: 12px;
  background: transparent;
  transition: opacity 225ms ease;
  > img {
    border-radius: 12px;
  }
`;

const StoryImage = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const StoryBodyWrapper = styled.div`
  padding: 12px 0 0;
`;

const StoryTitleWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 4px;
`;

const PublishedIcon = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex: 0 0 10px;
  background: var(--primary);
  margin-right: 6px;
`;

const StoryTitle = styled.h2`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const StoryInfo = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 14px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  &:not(:last-of-type) {
    margin: 0 0 4px;
  }
`;

const MenuWrapper = styled.div`
  position: relative;
  & > * {
    line-height: 0;
  }
`;

const MenuSection = styled.div`
  position: relative;
`;

const MenuTrigger = styled.button`
  display: inline-block;
  padding: 8px 3px;
  background: none;
  border: none;
  outline: none;
  line-height: 0;
  border-radius: 4px;
  transition: 0.12s ease;
  cursor: pointer;
  background: var(--white-85);
  color: var(--shade-700-85);
  &:hover {
    background: var(--shade-700-85);
    color: var(--white);
  }
  ${({ isFocused }) =>
    isFocused &&
    ` background: var(--shade-700-85);
    color: var(--white);`}
`;

const StoryLinkWrapper = styled.div`
  display: block;
  position: relative;
  margin-top: 8px;
  padding: 8px 3px;
  background: none;
  border: none;
  outline: none;
  line-height: 0;
  border-radius: 4px;
  transition: all 0.22s ease;
  cursor: pointer;
  background: var(--white-85);
  color: var(--shade-700-85);
  &:hover {
    background: var(--shade-700-85);
    color: var(--white);
    > span {
      opacity: 1;
    }
  }
`;

const StyledStoryLink = styled.span`
  position: absolute;
  display: inline-block;
  top: 1px;
  right: 28px;
  font-size: 10px;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  padding: 1px 10px;
  background: #14141f;
  color: var(--shade-100);
  border: 1px solid var(--white-10);
  opacity: 0;
  line-height: 18px;
  white-space: nowrap;
  box-shadow: 24px 32px 72px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(50px);
  border-radius: 6px;
  pointer-events: none;
`;

const DropdownWrapper = styled.div`
  visibility: ${({ isMenuVisible }) => (isMenuVisible ? `visible` : 'hidden')};
  background: var(--shade-700-85);
  border: 1px solid var(--white-10);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 12px;
  padding: 16px 12px;
  position: absolute;
  top: calc(100% + 2px);
  left: 0;
  min-width: 124px;
  z-index: 1000;
`;

const DropdownItem = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  border-radius: 6px;
  padding: 4px 8px;
  transition: 0.12s ease;
  cursor: pointer;
  &:not(:last-of-type) {
    margin-bottom: 4px;
  }
  &:hover {
    color: var(--shade-900);
    background: var(--primary);
  }
`;

const SelectedFrame = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid var(--primary);
  border-radius: 8px;
  background: var(--primary-10);
  z-index: 2;
  cursor: pointer;
`;

const StyledCheck = styled(Check)`
  width: 8px;
  height: auto;
`;

export {
  Select,
  SelectedFrame,
  StoryInfo,
  StoryBodyWrapper,
  StoryImage,
  StoryHeaderWrapper,
  StoryTitle,
  StoryImageWrapper,
  StoryWrapper,
  StyledCheck,
  StoryTitleWrapper,
  PublishedIcon,
  DropdownItem,
  DropdownWrapper,
  MenuWrapper,
  MenuSection,
  MenuTrigger,
  StoryLinkWrapper,
  MenuOuterWrapper,
  StyledStoryLink,
  StoryDraggedImageWrapper,
};
