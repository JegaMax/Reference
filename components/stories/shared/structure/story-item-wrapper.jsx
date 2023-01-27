import styled from 'styled-components';

const Wrapper = styled.div`
  margin: 0 12px 40px;
`;

const StoryItemWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default StoryItemWrapper;
