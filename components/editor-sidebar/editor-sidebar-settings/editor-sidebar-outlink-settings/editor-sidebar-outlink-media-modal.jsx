import { useCallback } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  DEFAULT_TOAST_CONFIG,
  FILE_SIZE_LIMIT_IMAGE,
  imageAcceptedTypes,
  imageTypesArray
} from '../../../../config/constants';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { uploadImage } from '../../../../appredux/features/media/mediaSlice';
import { bytesToMegaBytes } from '../../../../utils/commonUtils';
import { checkFileTypeAccepted } from '../../../../utils/mediaUtils';
import { EDITOR_MODAL_UPLOAD_TAB_IMAGES } from '../../../editor-modals/constants/editor-modal-media-upload-types';
import { selectMediaType } from '../../../editor-modals/interfaces';
import EditorModalDragAndDropUpload from '../../../editor-modals/shared/editor-modal-drag-and-drop-upload/editor-modal-drag-and-drop-upload';
import EditorModalLabel from '../../../editor-modals/shared/editor-modal-label/editor-modal-label';
import EditorModalLabelsWrapper from '../../../editor-modals/shared/editor-modal-labels-wrapper/editor-modal-labels-wrapper';
import EditorModalUploadButton from '../../../editor-modals/shared/editor-modal-upload-button/editor-modal-upload-button';

const customStyles = {
  overlay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--shade-500-85)',
    zIndex: 9999,
  },
  content: {
    inset: 'auto',
    padding: '0',
    maxWidth: '360px',
    width: '100%',
    borderRadius: '8px',
    border: 'none',
    boxShadow: '24px 32px 72px var(--black-18)',
    display: 'flex',
    background: 'var(--shade-900-85)',
    height: 'min(650px, 80vh)',
  },
};

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const SelectorWrapper = styled.div`
  height: calc(100% - 64px);
`;

const UploadButtonWrapper = styled.div`
  justify-self: flex-end;
  margin-left: auto;
`;

const EditorSidebarOutlinkMediaModal = ({
  isOpen,
  onClose,
  selectCallback,
}) => {
  const dispatch = useAppDispatch();

  const isMediaUploading = useAppSelector((state) => state.helpers.isMediaUploading);
  const isVideoProcessing = useAppSelector((state) => state.videoProcessing.isProcessing);

  const checkFileSize = (fileSize) => {
    const fileSizeMb = bytesToMegaBytes(fileSize);

    if (fileSizeMb >= FILE_SIZE_LIMIT_IMAGE) {
      toast.info(`File exceeded the maximum size of ${FILE_SIZE_LIMIT_IMAGE}MB.`, DEFAULT_TOAST_CONFIG);
      return false;
    }

    return true;
  };

  const onUploadButtonClick = useCallback(
    (event) => {
      if (event.target.files?.length > 0 || event.dataTransfer?.files?.length > 0) {
        const fileToBeUploaded = event.target?.files?.[0] || event.dataTransfer?.files?.[0];
        const canUpload = checkFileSize(fileToBeUploaded.size);

        if (!canUpload || isVideoProcessing) {
          event.preventDefault();
          return;
        }

        if (checkFileTypeAccepted(imageTypesArray, fileToBeUploaded.type)) {
          return dispatch(uploadImage(fileToBeUploaded));
        }
      }
    },
    [isVideoProcessing, dispatch],
  );

  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <ModalContent>
        <EditorModalLabelsWrapper>
          <EditorModalLabel text={EDITOR_MODAL_UPLOAD_TAB_IMAGES} isActive />

          <UploadButtonWrapper>
            <EditorModalUploadButton
              isDisabled={isMediaUploading || isVideoProcessing}
              acceptedFileTypes={imageAcceptedTypes}
              onClick={onUploadButtonClick}
            />
          </UploadButtonWrapper>
        </EditorModalLabelsWrapper>

        <SelectorWrapper>
          <EditorModalDragAndDropUpload
            onDrop={onUploadButtonClick}
            selectType={selectMediaType.SELECT_CTA_IMAGE}
            activeTabType={EDITOR_MODAL_UPLOAD_TAB_IMAGES}
            selectCallback={selectCallback}
          />
        </SelectorWrapper>
      </ModalContent>
    </Modal>
  );
};

export default EditorSidebarOutlinkMediaModal;
