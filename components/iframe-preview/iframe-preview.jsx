import { memo, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


import { storyIds } from '../../config/constants';
import { buildPreviewLink } from '../../utils/preview';

const IframeContainer = styled.div`
  position: relative;
  background: var(--shade-500);
  ${(props) => `
  width: ${props.initialWidth}px;
  height: ${props.initialHeight}px; 
  `}
`;

const StoryIframeWrapper = styled.div`
  border-radius: 2px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
`;

const StoryIframe = styled.iframe`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  mask-image: radial-gradient(circle, white 100%, black 100%);
  &.bottom {
    z-index: 1;
  }
  &.middle {
    z-index: 1;
  }
  &.top {
    z-index: 11;
    width: 100%;
    height: 100%;
    position: absolute;

    top: 0;
    left: 0;
  }
  body {
    overflow: hidden;
  }
  .i-amphtml-story-share-pill {
    display: none;
  }
`;

const IframePreview = () => {
  const iframeRef = useRef(null);
  const deviceSize = useSelector((state) => state.helpers.deviceSize);
  const initialWidth = useSelector((state) => state.ampStory.present.initialWidth);
  const initialHeight = useSelector((state) => state.ampStory.present.initialHeight);
  const storyId = useSelector((state) => state.ampStory.present._id);
  const showFullScreenIEditor = useSelector((state) => state.helpers.showFullScreenIEditor);

  const onIframeLoad = () => {
    const iframe = iframeRef.current;
    /** Chrome iframe bug (Iframe not visible until resize) */
    setTimeout(() => {
      if (iframe) {
        iframe.style.display = 'none';
        iframe.style.display = 'block';
      }
    }, 200);
  };

  return (
    <IframeContainer
      initialWidth={showFullScreenIEditor ? deviceSize.width : initialWidth}
      initialHeight={showFullScreenIEditor ? deviceSize.height : initialHeight}
    >
      {storyId && (
        <StoryIframeWrapper id="iframe-preview">
          <StoryIframe
            ref={iframeRef}
            onLoad={onIframeLoad}
            src={buildPreviewLink(storyId)}
            className="top"
            id={storyIds.editor}
            frameBorder="0"
            allowFullScreen={true}
          />
        </StoryIframeWrapper>
      )}
    </IframeContainer>
  );
};

export default memo(IframePreview);
