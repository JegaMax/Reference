import { DraggableTypes } from 'interfaces/dnd';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { extractVideoDimensions } from 'utils/mediaUtils';
import ImageWrapper from './image-wrapper';
import VideoLoader from './video-loader';


const VideoWrapper = styled(ImageWrapper)`
  min-height: ${({ hasThumbnail }) => (hasThumbnail ? '0' : '60px')};
  transition: min-height 0.5s ease;
  line-height: 0;
`;

export const ProcessingVideoThumbnail = styled.img`
  border-radius: 2px;
  width: 100%;
  background-size: 38px 38px;
  overflow: hidden;
  background-position: 0 0, 19px 19px;
  cursor: pointer;
  will-change: width, height;
  transition: width 225ms ease, height 225ms ease;
`;

const ProcessingVideo = ({
  videoProcessing,
  progress,
  handleTemporaryVideoClick,
  setDropDisabled,
}) => {
  const isResolved = useRef(false);
  const [dimensions, setDimensions] = useState({
    resolved: false,
    width: 0,
    height: 0,
  });

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DraggableTypes.Layer,
      item: {
        type: layerTypes.VIDEO,
        _id: videoProcessing.originalVideo?.id ?? '',
        subType: '',
        index: 0,
        image: videoProcessing?.originalVideo?.thumbnail?.url,
        width: dimensions.width,
        height: dimensions.height,
        previewWidth: 100.5,
        uploadedMedia: videoProcessing.originalVideo ?? {},
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [
      dimensions.width,
      dimensions.height,
      videoProcessing.originalVideo?._id,
      videoProcessing?.originalVideo?.thumbnail?.url,
      videoProcessing?.originalVideo,
    ],
  );

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  useEffect(() => {
    if (!dimensions.resolved && !isResolved.current && videoProcessing?.originalVideo?.url) {
      const resolveDimensions = async () => {
        try {
          const { width: videoWidth, height: videoHeight } = await extractVideoDimensions(
            videoProcessing.originalVideo?.url || '',
          );

          setDimensions({
            resolved: true,
            width: videoWidth,
            height: videoHeight,
          });
        } catch (err) {
          console.error(err);
          setDimensions((prev) => ({ ...prev, resolved: true }));
        }
      };
      isResolved.current = true;
      resolveDimensions();
    }
  }, [dimensions.resolved, videoProcessing.originalVideo?.url]);

  useEffect(() => {
    setDropDisabled((prev) => (prev !== isDragging ? isDragging : prev));
  }, [isDragging, setDropDisabled]);

  return (
    <VideoWrapper id="video-uploading" hasThumbnail={videoProcessing?.originalVideo?.thumbnail}>
      <VideoLoader percentage={progress} />
      {videoProcessing?.originalVideo?.thumbnail && (
        <ProcessingVideoThumbnail
          ref={drag}
          alt="media"
          src={videoProcessing?.originalVideo?.thumbnail?.url || ''}
          onClick={handleTemporaryVideoClick}
        />
      )}
    </VideoWrapper>
  );
};

export default memo(ProcessingVideo);
