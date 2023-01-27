import { useCallback, useEffect, useRef, useState } from 'react';
import { useDragDropManager } from 'react-dnd';

const useDragPreview = () => {
  const previewRef = useRef(null);
  const monitorRef = useRef(null);

  const [item, setItem] = useState(null);
  const [isOverEditor, setOverEditor] = useState(false);
  const [isDragging, setDragging] = useState(false);
  const dragDropManager = useDragDropManager();

  const updateItem = useCallback(() => {
    setDragging((prev) => {
      if (monitorRef?.current) {
        const isDragging = monitorRef?.current?.isDragging();
        return isDragging;
      }

      return prev;
    });

    setOverEditor((prev) => {
      if (monitorRef?.current) {
        const targetIds = monitorRef.current?.getTargetIds();
        if (targetIds.length > 1) {
          const editorTarget = targetIds[targetIds.length - 1];
          return monitorRef?.current?.isOverTarget(editorTarget);
        }
        return false;
      }

      return prev;
    });

    setItem(monitorRef?.current?.getItem());
  }, []);

  const updateOffset = useCallback(
    () =>
      requestAnimationFrame(() => {
        if (previewRef.current) {
          const offset = monitorRef?.current?.getSourceClientOffset() || { x: 0, y: 0 };
          previewRef.current.style.transform = `translate(${offset.x}px, ${offset.y}px)`;
        }
      }),
    [],
  );

  useEffect(() => {
    let unsubscribeToStateChange;
    let unsubscribeToOffsetChange;

    if (!monitorRef.current) {
      monitorRef.current = dragDropManager.getMonitor();
      unsubscribeToStateChange = monitorRef.current.subscribeToStateChange(updateItem);
      unsubscribeToOffsetChange = monitorRef.current.subscribeToOffsetChange(updateOffset);
    }

    return () => {
      if (typeof unsubscribeToStateChange === 'function') {
        unsubscribeToStateChange();
      }
      if (typeof unsubscribeToOffsetChange === 'function') {
        unsubscribeToOffsetChange();
      }
    };
  }, [dragDropManager, updateItem, updateOffset]);

  return [item, previewRef, { isDragging, isOverEditor }];
};

export default useDragPreview;
