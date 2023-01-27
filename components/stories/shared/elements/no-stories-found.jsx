import notFoundImage from './images/editor-modal/no-results';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 44px 19px;
`;

const Image = styled.img`
  width: 129px;
  height: 129px;
  margin: 0 0 29px;
`;

const Text = styled.p`
  margin: 0;
  max-width: 198px;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const NoStoriesFound = () => {
  return (
    <Wrapper>
      <Image src={notFoundImage} alt="not found" />
      <Text>
        No Stories found.
        <br /> Try again.
      </Text>
    </Wrapper>
  );
};

export default NoStoriesFound;
