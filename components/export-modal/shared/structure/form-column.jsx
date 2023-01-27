import styled from 'styled-components';

const Column = styled.div`
  display: inline-block;
  vertical-align: top;
  padding: 24px 0;
  flex: 1;
  border-right: 1px solid var(--shade-500);
`;

const FormColumn = ({ children }) => {
  return <Column>{children}</Column>;
};

export default FormColumn;
