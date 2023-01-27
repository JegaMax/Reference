import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-flow: column wrap;
  width: ${({ width }) => (width ? width : '100')}%;
  padding: 0 32px 24px;
  &:nth-of-type(2) {
    border-left: 1px solid var(--shade-500);
    border-right: 1px solid var(--shade-500);
  }
  > * {
    width: 100%;
  }
`;

const PosterSection = ({ width, children }) => {
  return <Wrapper width={width}>{children}</Wrapper>;
};

export default PosterSection;
