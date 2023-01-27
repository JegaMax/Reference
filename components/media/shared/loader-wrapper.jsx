import styled from 'styled-components';

const StyledLoaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const LoaderWrapper = ({ children }) => {
  return <StyledLoaderWrapper>{children}</StyledLoaderWrapper>;
};

export default LoaderWrapper;
