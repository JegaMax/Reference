import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-start;
  margin: 0 -12px;
  min-width: 100%;
`;

const StoryItemsWrapper = ({ id, children }) => {
  return <Wrapper id={id}>{children}</Wrapper>;
};

export default StoryItemsWrapper;
