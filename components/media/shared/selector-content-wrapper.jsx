import styled from 'styled-components';

const StyledSelectorContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  max-width: 100%;
  height: 100%;
  overflow: auto;
  padding: 0;
  position: relative;
  margin-top: -6px;
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

const SelectorContentWrapper = ({
  id,
  className,
  children,
}) => {
  return (
    <StyledSelectorContentWrapper id={id} className={className}>
      {children}
    </StyledSelectorContentWrapper>
  );
};

export default SelectorContentWrapper;
