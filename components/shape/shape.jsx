import { DraggableTypes } from 'interfaces/dnd';
import { useCallback, useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import styled from 'styled-components';

export const ShapeItem = styled.div`
  display: block;
  width: 72px;
  height: 72px;
  will-change: width, height;
  transition: width 225ms ease, height 225ms ease;
`;

export const ShapeImage = styled.img`
  display: block;
  object-fit: fill;
  width: 100%;
  height: 100%;
  background: transparent;
  color: transparent;
`;

export const ShapeWrapper = styled.div`
  display: inline-flex;
  padding: 13px;
  margin-bottom: 20px;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.12s ease;
  align-self: flex-start;
  &:nth-child(even) {
    justify-content: flex-end;
  }
  &:hover {
    background-color: var(--shade-500-85);
  }
`;

export const VirtuosoItem = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  transition: background-color 0.12s ease;
  &:hover {
    background-color: var(--shade-500-85);
  }
` ;

const Shape = ({ shape, shapeIndex, gradient, type, onSelectShape, active }) => {
  const [{ isDragging }, drag, dragPreview] = useDrag(
    () => ({
      type: DraggableTypes.Layer,
      item: {
        type,
        _id: shape?.id || gradient?.key || '',
        subType: shape?.type || 'gradient',
        index: shapeIndex,
        image: shape?.images?.inactive || gradient?.url || '',
        width: 72,
        height: 72,
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [shape, shapeIndex, type, gradient],
  );

  const selectGradient = useCallback(() => onSelectShape(shapeIndex, gradient), [gradient, onSelectShape, shapeIndex]);
  const selectShape = useCallback(() => onSelectShape(shapeIndex), [onSelectShape, shapeIndex]);

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, [dragPreview]);

  if (gradient) {
    return (
      <VirtuosoItem style={{ opacity: isDragging ? 0 : 1 }} onClick={selectGradient}>
        <ShapeItem ref={drag}>
          <ShapeImage src={gradient.url} />
        </ShapeItem>
      </VirtuosoItem>
    );
  }

  return (
    <ShapeWrapper style={{ opacity: isDragging ? 0 : 1 }} onClick={selectShape}>
      <ShapeItem ref={drag}>
        <ShapeImage src={active ? shape?.images?.active : shape?.images?.inactive} alt="shape" />
      </ShapeItem>
    </ShapeWrapper>
  );
};

export default Shape;
