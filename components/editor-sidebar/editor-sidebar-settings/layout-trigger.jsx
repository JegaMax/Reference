import ChevronDownIcon from 'components/icons/chevron-down';
import styled from 'styled-components';

const DropdownWrapper = styled.div`
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  cursor: pointer;
  background-color: transparent;
  transition: background-color 225ms ease;
  &:hover {
    background-color: var(--shade-500-85);
  }
`;

const DropdownIcon = styled(ChevronDownIcon)`
  width: 14px;
  height: 14px;
  transition: transform 225ms ease;
  transform: rotate(${({ isMenuOpen }) => (isMenuOpen ? `0` : '-90')}deg);
  color: #fff;
`;

const LayoutTrigger = ({ isOpen, toggle }) => {
  return (
    <DropdownWrapper onClick={toggle}>
      <DropdownIcon isMenuOpen={isOpen} />
    </DropdownWrapper>
  );
};

export default LayoutTrigger;
