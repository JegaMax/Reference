import styled from 'styled-components';

const Column = styled.div`
  width: ${({ width }) => (width ? width : '100%')};
  padding: 0 8px;
`;

const SectionColumn = ({ width, children }) => {
  return <Column width={width}>{children}</Column>;
};

export default SectionColumn;
