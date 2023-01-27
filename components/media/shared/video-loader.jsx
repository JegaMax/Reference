import React from 'react';
import styled from 'styled-components';

const VideoLoaderWrapper = styled.div`
  display: flex;
  align-items: stretch;
  position: absolute;
  bottom: 6px;
  left: 50%;
  transform: translate(-50%);
  width: calc(100% - 16px);
  height: 7px;
  background: var(--shade-900);
  border-radius: 4px;
  pointer-events: none;
`;

const VideoProgress = styled.div`
  height: 100%;
  background: var(--primary);
  border-radius: 4px;
  transition: 0.5s linear;
`;

const VideoLoader = ({ percentage }) => {
  return (
    <VideoLoaderWrapper>
      <VideoProgress style={{ width: `${percentage}%` }} />
    </VideoLoaderWrapper>
  );
};

export default VideoLoader;
