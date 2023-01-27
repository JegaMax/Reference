import styled from 'styled-components';

const StyledListItemsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 6px 12px 0;
  min-width: 100%;
`;

const ListItemsWrapper = ({ children }) => {
  return <StyledListItemsWrapper>{children}</StyledListItemsWrapper>;
};

export default ListItemsWrapper;
