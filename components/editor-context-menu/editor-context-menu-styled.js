import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: column wrap;
  position: fixed;
  z-index: ${({ isOpen }) => (isOpen ? 100 : -100)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  background: var(--shade-700-85);
  border: 1px solid var(--white-10);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 12px;
  width: 208px;
  padding: 12px 0;
  transition: opacity 225ms ease;
`;

const MenuItemLabel = styled.span`
  color: var(--shade-100);
  padding: 0 12px;
`;

const MenuItemShortcut = styled.span`
  margin-left: auto;
  color: var(--shade-300);
`;

const MenuItemIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: var(--shade-100);
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  flex 1;
  margin: 4px 12px;
  padding: 3px 8px;
  border-radius: 6px;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.3px;
  background: none;
  border: none;
  transition: background 0.12s ease;
  &:focus,
  &:hover {
    outline: none;
    border: none;
    background: var(--primary);
  }
  ${({ $isDisabled }) =>
    !$isDisabled
      ? css`
          &:hover ${MenuItemLabel}, &:hover ${MenuItemIcon}, &:hover ${MenuItemShortcut} {
            color: var(--shade-900);
          }
        `
      : css`
          pointer-events: none;
          ${MenuItemLabel}, ${MenuItemIcon}, ${MenuItemShortcut} {
            color: var(--shade-300);
          }
        `}
   
`;

const Splitter = styled.div`
  height: 1px;
  width: 100%;
  background: var(--shade-700-85);
  margin: 7px 0;
`;

export default { Wrapper, MenuItem, MenuItemLabel, MenuItemShortcut, MenuItemIcon, Splitter };
