import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--shade-500-85);
  position: fixed;
  width: 100%;
  height: 100%;
  padding: min(5%, 80px);
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 113;
  box-sizing: border-box;
  > * {
    max-width: 1024px;
    width: 100%;
    max-height: 784px;
    height: 100%;
  }
  * {
    box-sizing: border-box;
  }
`;

const ModalExportOuterWrapper = ({ className, children }) => {
  return <Wrapper className={className}>{children}</Wrapper>;
};

export default ModalExportOuterWrapper;
