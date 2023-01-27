import { batch } from 'react-redux';
import { deleteMedia, toggleDeleteModal } from 'appredux/features/media/mediaSlice';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useCallback, useState } from 'react';

const useDeleteMedia = () => {
  const dispatch = useAppDispatch();
  const isDeleteModalOpen = useAppSelector((state) => state.media.isDeleteModalOpen);

  const [mediaId, setMediaId] = useState('');
  const deleteMessage = `Are you sure you want to delete the selected media?`;

  const toggleDeleteMediaModal = useCallback(
    (id) => () => {
      dispatch(toggleDeleteModal(!isDeleteModalOpen));
      setMediaId(id || '');
    },
    [dispatch, isDeleteModalOpen],
  );

  const deletePersonalMedia = useCallback(() => {
    batch(() => {
      dispatch(deleteMedia(mediaId));
      dispatch(toggleDeleteModal(false));
    });
    setMediaId('');
  }, [dispatch, mediaId]);

  return {
    toggleDeleteMediaModal,
    deletePersonalMedia,
    isDeleteModalOpen,
    deleteMessage,
  };
};

export default useDeleteMedia;
