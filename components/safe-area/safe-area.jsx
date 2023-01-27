import { useSelector } from 'react-redux';
import styled from 'styled-components';

import bottomSocialOverlay from './images/social-overlay/bottom-social-overlay.svg';
import topSocialOverlay from './images/social-overlay/top-social-overlay.svg';


const SafeAreaWrapper = styled.div`
  display: ${(isVisible) => (isVisible ? 'block' : 'none')};
`;

const TopStoryMargin = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  z-index: 11;
  pointer-events: none;
  background-size: contain;
  background-repeat: no-repeat;
`;

const BottomStoryMargin = styled.div`
  position: absolute;
  top: auto;
  bottom: 0;
  padding: 0 10px 10px 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  z-index: 11;
  pointer-events: none;
  background-size: contain;
  background-repeat: no-repeat;
`;

const StoryImageWrapper = styled.div`
  width: 100%;
`;

const StoryImage = styled.img`
  width: 100%;
  box-shadow: none;
`;

const SafeArea = () => {
  const isActive = useSelector((state) => state.safeArea.isActive);
  const showFullScreenIEditor = useSelector((state) => state.helpers.showFullScreenIEditor);
  const slides = useSelector((state) => state.ampStory.present?.cuts);

  return (
    <SafeAreaWrapper isVisible={showFullScreenIEditor}>
      {slides?.length !== 0 && isActive && (
        <>
          <TopStoryMargin>
            <StoryImageWrapper>
              <StoryImage src={topSocialOverlay} alt="oval" />
            </StoryImageWrapper>
          </TopStoryMargin>

          <BottomStoryMargin>
            <StoryImageWrapper>
              <StoryImage src={bottomSocialOverlay} alt="oval" />
            </StoryImageWrapper>
          </BottomStoryMargin>
        </>
      )}
    </SafeAreaWrapper>
  );
};

export default SafeArea;
