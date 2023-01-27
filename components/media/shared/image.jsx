import { DraggableTypes } from 'interfaces/dnd';
import { layerTypes } from 'interfaces/layer-types';
import { useCallback, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';

export const StyledImage = styled.img`
  border-radius: 2px;
  width: 100%;
  background-size: 38px 38px;
  overflow: hidden;
  background-position: 0 0, 19px 19px;
  cursor: pointer;
  will-change: width, height;
  transition: width 225ms ease, height 225ms ease;
`;

const Image = ({ className, alt, image, gif, onClick, isSticker }) => {
  const onSelect = useCallback(() => {
    if (image) {
      onClick(image);
      return;
    }

    if (gif) {
      onClick(gif);
      return;
    }
  }, [gif, image, onClick]);

  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DraggableTypes.Layer,
      item: {
        type: image ? layerTypes.IMAGE : isSticker ? layerTypes.STICKERS : layerTypes.GIFS,
        _id: image?.id ?? gif?.id ?? '',
        subType: '',
        index: 0,
        image: image?.urls?.regular ?? (isSticker ? gif?.images?.original?.url : gif?.images?.original?.webp) ?? '',
        width: image?.width ?? +(gif?.images?.original?.width ?? 0),
        height: image?.height ?? +(gif?.images?.original?.height ?? 0),
        previewWidth: 100.5,
        imageContent: image,
        gifContent: gif,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [image],
  );

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  return (
    <StyledImage
      style={{ opacity: isDragging ? 0 : 1 }}
      ref={drag}
      id={image?.id}
      className={className}
      src={image?.urls?.small ?? (gif?.images?.fixed_height_small?.url || gif?.images?.fixed_width_still.url) ?? ''}
      alt={alt}
      onClick={onSelect}
    />
  );
};

export default Image;
