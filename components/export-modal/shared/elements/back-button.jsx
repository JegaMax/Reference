import styled from 'styled-components';
import ChevronLeft from '../../../icons/chevron-left';

const BackButtonWrapper = styled.button`
  display: inline-flex;
  width: 32px;
  height: 32px;
  justify-content: center;
  align-items: center;
  padding: 0;
  border: none;
  outline: none;
  color: var(--shade-100);
  transition: 0.12s ease;
  background: transparent;
  border-radius: 6px;
  &:hover {
    background: var(--shade-500-85);
  }
  &:focus {
    background: var(--primary-10);
    color: var(--primary);
  }
`;

const BackButtonIcon = styled(ChevronLeft)`
  color: inherit;
`;

const BackButton = ({ onClick, icon }) => {
  return <BackButtonWrapper onClick={onClick}>{icon ? icon : <BackButtonIcon />}</BackButtonWrapper>;
};

export default BackButton;
