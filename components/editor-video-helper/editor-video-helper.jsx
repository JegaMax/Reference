import { memo } from 'react';
import styled from 'styled-components';

const HiddenContainer = styled.div`
  display: none;
`;

const EditorVideoHelper = () => (
  <HiddenContainer>
    <video id="videoId" muted controls>
      Your browser does not support the video tag.
    </video>
    <canvas id="canvasId" />
  </HiddenContainer>
);

export default memo(EditorVideoHelper);
