import styled from 'styled-components';

const Wrapper = styled.div`
  margin-left: auto;
  justify-self: flex-end;
  ${({ isSticky }) => isSticky && `display: none`}
`;

const SliderArrowButtonsWrapper = ({ isSticky, children }) => {
  return <Wrapper isSticky={isSticky}>{children}</Wrapper>;
};

export default SliderArrowButtonsWrapper;
