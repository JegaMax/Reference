import MODAL_COMPONENTS from './constants/editor-modal-types';
import { useSelector } from 'react-redux';


const EditorModal = () => {
  const modalType = useSelector((state) => state.editorModal.modalType);

  if (modalType) {
    const ModalComponent = MODAL_COMPONENTS[modalType];
    return <ModalComponent />;
  }

  return null;
};

export default EditorModal;
