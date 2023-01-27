import styled from 'styled-components';

const StyledImagesWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  margin: 0 -8px 31px;
  min-width: 100%;
  position: relative;
`;

const ImagesWrapper = ({ children }) => {
  return <StyledImagesWrapper>{children}</StyledImagesWrapper>;
};

export default ImagesWrapper;
