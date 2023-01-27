import styled from 'styled-components';

const Row = styled.div`
  display: flex;
  align-items: flex-start;
  flex-flow: row wrap;
  width: 100%;
  position: relative;
  &:not(:last-of-type) {
    margin-bottom: 32px;
  }
`;

const SectionRow = ({ children }) => {
  return <Row>{children}</Row>;
};

export default SectionRow;
