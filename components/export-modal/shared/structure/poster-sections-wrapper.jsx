import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  padding: 0 8px;
`;

const PosterSectionsWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default PosterSectionsWrapper;
