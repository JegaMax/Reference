import styled from 'styled-components';

const Column = styled.div`
  display: inline-flex;
  flex-direction: column;
  vertical-align: top;
  max-width: 40.9%;
  position: sticky;
  top: 0;
  padding: 16px 40px 0 56px;
  height: 100%;
`;

const AmpColumn = ({ children, propRef }) => {
  return <Column ref={propRef}>{children}</Column>;
};

export default AmpColumn;
