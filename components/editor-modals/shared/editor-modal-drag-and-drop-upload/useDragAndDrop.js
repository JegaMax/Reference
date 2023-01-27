import { useCallback, useEffect } from 'react';

const useDragAndDrop = ({ isDropDisabled, fileWrapper, onDrop }) => {
  const handleDrag = useCallback(
    (event) => {
      if (isDropDisabled) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    },
    [isDropDisabled],
  );

  const handleDragIn = useCallback(
    (event) => {
      if (isDropDisabled) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    },
    [isDropDisabled],
  );

  const handleDragOut = useCallback(
    (event) => {
      if (isDropDisabled) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
    },
    [isDropDisabled],
  );

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      event.stopPropagation();

      if (isDropDisabled) {
        return;
      }

      if (event?.dataTransfer?.files && event.dataTransfer.files.length > 0) {
        onDrop(event);
        event.dataTransfer.clearData();
      }
    },
    [isDropDisabled, onDrop],
  );

  useEffect(() => {
    if (fileWrapper) {
      fileWrapper?.addEventListener('dragenter', handleDragIn);
      fileWrapper?.addEventListener('dragleave', handleDragOut);
      fileWrapper?.addEventListener('dragover', handleDrag);
      fileWrapper?.addEventListener('drop', handleDrop);
    }

    return () => {
      if (fileWrapper) {
        fileWrapper.removeEventListener('dragenter', handleDragIn);
        fileWrapper.removeEventListener('dragleave', handleDragOut);
        fileWrapper.removeEventListener('dragover', handleDrag);
        fileWrapper.removeEventListener('drop', handleDrop);
      }
    };
  }, [fileWrapper, handleDrag, handleDragIn, handleDragOut, handleDrop]);
};

export default useDragAndDrop;
