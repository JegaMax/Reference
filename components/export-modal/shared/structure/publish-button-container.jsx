import styled from 'styled-components';

const Container = styled.div`
  min-width: calc(96px + 2rem);
  min-height: 34px;
  position: relative;
  margin-left: -2rem;
  > button {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

const PublishButtonContainer = ({ children }) => <Container>{children}</Container>;

export default PublishButtonContainer;
