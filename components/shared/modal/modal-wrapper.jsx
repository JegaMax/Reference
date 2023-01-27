import styled from 'styled-components';


const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  background: var(--black-18);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
`;

const ModalWrapper = ({ propRef, children }) => {
  return <Wrapper ref={propRef}>{children}</Wrapper>;
};

export default ModalWrapper;
