import { ListItemsStyled } from 'components/shared/list-item';
import TitleOverlay from 'components/shared/title-overlay';
import { DraggableTypes } from 'interfaces/dnd';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useEffect, useRef, useState } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';
import { extractImageDimensions, extractVideoDimensions } from 'utils/mediaUtils';
import ImageWrapper from './image-wrapper';

export const StyledUploadedImage = styled.img`
  border-radius: 2px;
  width: 100%;
  background-size: 38px 38px;
  overflow: hidden;
  background-position: 0 0, 19px 19px;
  cursor: pointer;
  will-change: width, height;
  transition: width 225ms ease, height 225ms ease;
`;

const UploadedImage = ({
  media,
  onMouseEnter,
  onMouseLeave,
  toggleDeleteMediaModal,
  onMediaSelect,
  activeTabType,
  selectType,
  selectCallback,
  setDropDisabled,
}) => {
  const mountedRef = useRef(true);
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
        type: media.mimeType?.includes('video') ? layerTypes.VIDEO : layerTypes.IMAGE,
        _id: media._id ?? '',
        subType: '',
        index: 0,
        image: media.mimeType?.includes('video') ? media.thumbnail?.url : media.url,
        width: dimensions.width,
        height: dimensions.height,
        previewWidth: media.mimeType?.includes('video') ? 100.5 : 102,
        uploadedMedia: media,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [dimensions.width, dimensions.height, media, media.mimeType],
  );

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  useEffect(() => {
    if (!dimensions.resolved && !isResolved.current && media?.url) {
      const resolveDimensions = async () => {
        try {
          if (media.mimeType?.includes('video')) {
            const { width: videoWidth, height: videoHeight } = await extractVideoDimensions(media.url || '');
            if (!mountedRef.current) {
              return null;
            }
            setDimensions({
              resolved: true,
              width: videoWidth,
              height: videoHeight,
            });
          } else {
            const { width: imageWidth, height: imageHeight } = await extractImageDimensions(media.url || '');
            if (!mountedRef.current) {
              return null;
            }
            setDimensions({
              resolved: true,
              width: imageWidth,
              height: imageHeight,
            });
          }
        } catch (err) {
          console.error(err);
          setDimensions((prev) => ({ ...prev, resolved: true }));
        }
      };
      isResolved.current = true;
      resolveDimensions();
    }

    return () => {
      mountedRef.current = false;
    };
  }, [dimensions.resolved, media.mimeType, media.url]);

  useEffect(() => {
    setDropDisabled((prev) => (prev !== isDragging ? isDragging : prev));
  }, [isDragging, setDropDisabled]);

  return (
    <ListItemsStyled.StyledListItemWrapper>
      <ImageWrapper
        style={{ opacity: isDragging ? 0 : 1 }}
        id={media.id}
        onMouseEnter={onMouseEnter(media?.originalName)}
        onMouseLeave={onMouseLeave(media?.originalName)}
      >
        <ListItemsStyled.DeleteButton onClick={toggleDeleteMediaModal(media.id)} />
        <StyledUploadedImage
          alt="media"
          src={media.mimeType?.includes('video') ? media.thumbnail?.url : media.url}
          onClick={onMediaSelect(media, activeTabType, selectType, selectCallback)}
          onMouseDown={onMouseLeave(media?.originalName)}
          ref={drag}
        />
        {media?.originalName && <TitleOverlay title={media?.originalName} />}
      </ImageWrapper>
    </ListItemsStyled.StyledListItemWrapper>
  );
};

export default memo(UploadedImage);
