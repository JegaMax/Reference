import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { storyIds } from '../../../../config/constants';
import { buildPreviewLink } from '../../../../utils/preview';

const Wrapper = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  margin: 0 0 16px;
`;

const Iframe = styled.iframe`
  border-radius: 6px;
  &.bottom {
    z-index: 1;
  }
  &.middle {
    z-index: 1;
  }
  body {
    overflow: hidden;
  }
  .i-amphtml-story-share-pill {
    display: none;
  }
`;

const StoryIframe = ({ size, propRef }) => {
  const storyId = useSelector((state) => state.ampStory.present._id);

  return (
    <Wrapper ref={propRef}>
      <Iframe
        src={buildPreviewLink(storyId)}
        className="top"
        id={storyIds.exportModal}
        frameBorder="0"
        width={`${size.width}px`}
        height={`${size.height}px`}
        allowFullScreen={true}
      />
    </Wrapper>
  );
};

export default StoryIframe;
