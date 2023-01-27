import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--shade-500-85);
  position: fixed;
  width: 100%;
  min-height: 100%;
  padding: min(5%, 80px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 113;
  box-sizing: border-box;
  flex-wrap: wrap;
  overflow: auto;
  > * {
    max-width: ${({ childrenWidth }) => (childrenWidth ? `${childrenWidth}px` : '390px')};
    width: 100%;
  }
  * {
    box-sizing: border-box;
  }
`;

const ModalPublishedOuterWrapper = ({ children, childrenWidth }) => {
  return <Wrapper childrenWidth={childrenWidth}>{children}</Wrapper>;
};

export default ModalPublishedOuterWrapper;
