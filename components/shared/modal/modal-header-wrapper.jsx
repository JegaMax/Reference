import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: var(--shade-900-80);
`;

const ModalHeaderWrapper = ({ children, propRef, className }) => {
  return (
    <Wrapper className={className} ref={propRef}>
      {children}
    </Wrapper>
  );
};

export default ModalHeaderWrapper;
