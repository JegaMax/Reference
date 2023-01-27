import styled from 'styled-components';

const StyledTemplatesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 6px 20px 18px;
  gap: 18px;
  min-width: 100%;
  align-items: flex-start;
`;

const TemplatesWrapper = ({ children }) => {
  return <StyledTemplatesWrapper>{children}</StyledTemplatesWrapper>;
};

export default TemplatesWrapper;
