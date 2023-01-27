import styled from 'styled-components';

const StyledImageWrapper = styled.div`
  position: relative;
  margin: 0 0 16px;
`;

const ImageWrapper = ({ id, className, children, ...rest }) => {
  return (
    <StyledImageWrapper id={id} className={className} {...rest}>
      {children}
    </StyledImageWrapper>
  );
};

export default ImageWrapper;
