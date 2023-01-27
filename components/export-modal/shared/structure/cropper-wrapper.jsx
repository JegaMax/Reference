import styled from 'styled-components';

const Wrapper = styled.div`
  height: 360px;
  width: 100%;
  position: relative;
  margin: 0 0 32px;
`;

const CropperWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default CropperWrapper;
