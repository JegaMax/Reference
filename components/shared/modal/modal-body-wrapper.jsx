import styled from 'styled-components';

const Wrapper = styled.div`
  overflow: auto;
  background: var(--shade-900-80);
  scrollbar-width: none;
  flex: 1;
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

const ModalBodyWrapper = ({ className, children }) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default ModalBodyWrapper;
