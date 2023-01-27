import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 100%;
  padding: ${window.innerWidth < 1460 ? '0 70px' : '0 92px'};
  ${({ hiddenOverflow }) => hiddenOverflow && `overflow: hidden;`}
`;

const StoriesWrapper = ({ children, hiddenOverflow = true }) => {
  return (
    <Wrapper innerWidth={window.innerWidth} hiddenOverflow={hiddenOverflow}>
      {children}
    </Wrapper>
  );
};

export default StoriesWrapper;
