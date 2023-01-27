import styled from 'styled-components';

const MenuOuterWrapper = styled.div`
  position: absolute;
  top: 10px;
  right: 16px;
  visibility: visible;
  opacity: ${({ isMenuVisible }) => (isMenuVisible ? '1' : '0')};
  transition: 0.12s ease;
  z-index: 1;
  cursor: pointer;
  line-height: 0;
`;

const ColorMenuOuterWrapper = styled.div`
  visibility: visible;
  opacity: ${({ isMenuVisible }) => (isMenuVisible ? '1' : '0')};
  transition: 0.12s ease;
  z-index: 1;
  cursor: pointer;
  line-height: 0;
`;

const ColorPaletteWrapper = styled.div`
  display: flex;
  background: var(--shade-700-85);
  border-radius: 12px;
  align-items: center;
  text-decoration: none;
  position: relative;
  &:hover {
    text-decoration: none;
    ${MenuOuterWrapper} {
      opacity: 1;
    }
  }
`;

const ColorPaletteName = styled.h4`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin: 0 0 4px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: calc(100% - 10px);
`;

const MenuWrapper = styled.div`
  position: relative;
`;

const ColorMenuWrapper = styled.div`
  position: relative;
`;

const MenuTrigger = styled.button`
  display: inline-block;
  padding: 5px 2px;
  background: transparent;
  border: none;
  border-radius: 4px;
  outline: none;
  color: var(--white);
  line-height: 0;
  cursor: pointer;
  transition: 0.12s ease;
  &:hover {
    background: var(--white);
    color: var(--shade-700-85);
  }
`;

const ColorMenuTrigger = styled.button`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: -50px;
  right: -9px;
  backdrop-filter: blur(50px);
  background: transparent;
  border: none;
  outline: none;
  width: 20px;
  height: 20px;
  color: var(--white);
  line-height: 0;
  cursor: pointer;
  transition: 0.12s ease;
  border-radius: 50%;
  box-shadow: 24px 32px 72px rgba(0, 0, 0, 0.18);
  padding: 2px 2px;
`;

const DropdownWrapper = styled.div`
  visibility: ${({ isMenuVisible }) => (isMenuVisible ? `visible` : 'hidden')};
  pointer-events: ${({ isMenuVisible }) => (isMenuVisible ? `auto` : 'none')};
  background: var(--shade-700);
  border: 1px solid var(--white-10);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 12px;
  padding: 16px 12px;
  position: absolute;
  top: ${({ isOverFlowing }) => (isOverFlowing ? `calc(100% - 130px)` : `calc(100% + 2px)`)};
  left: 0;
  min-width: 110px;
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
  &:not(:last-child) {
    margin: 0 0 4px;
  }
  &:hover {
    color: var(--shade-900);
    background: var(--primary);
  }
`;

const ColorPaletteTitle = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  padding: 6px 8px;
  margin-bottom: 2px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0);
  box-sizing: border-box;
  backdrop-filter: blur(50px);
  border-radius: 6px;
  transition: background-color 225ms ease, border-color 225ms ease;
  input {
    color: var(--shade-100);
    font-family: Heebo;
    font-style: normal;
    font-size: 12px;
    line-height: 18px;
    font-weight: normal;
    padding: 0;
  }
  &:hover {
    background: var(--white-10);
    border-color: var(--white-20);
  }
  ${(props) =>
    props.isActive &&
    `
    border-color: var(--primary);                
    &:hover {
      border-color: var(--primary);
      background: transparent;
    }
  `}
`;

export default {
  DropdownItem,
  DropdownWrapper,
  MenuWrapper,
  MenuTrigger,
  MenuOuterWrapper,
  ColorPaletteWrapper,
  ColorPaletteName,
  ColorPaletteTitle,
  ColorMenuWrapper,
  ColorMenuOuterWrapper,
  ColorMenuTrigger,
};
