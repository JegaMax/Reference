import styled from 'styled-components';

const Wrapper = styled.div`
  padding: ${({ padding }) => (padding ? `${padding}px` : '24px')};
  background: var(--shade-900-85);
  box-shadow: 24px 32px 72px var(--black-18);
  backdrop-filter: blur(50px);
  border-radius: 12px;
  overflow: hidden;
  width: 100%;
`;

const SuccessModalInnerWrapper = ({ children, padding }) => {
  return <Wrapper padding={padding}>{children}</Wrapper>;
};

export default SuccessModalInnerWrapper;
