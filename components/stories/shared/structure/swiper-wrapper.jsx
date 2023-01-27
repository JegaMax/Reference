import styled from 'styled-components';

const Wrapper = styled.div`
  min-width: 100%;
  margin-right: -90px;
  margin-left: calc(-320px - 90px);
  padding-left: calc(320px + 90px);
  overflow: hidden;
`;

const SwiperWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default SwiperWrapper;
