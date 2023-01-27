import { useCallback, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { batch, useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import {
  allAcceptedFileTypes,
  DEFAULT_TOAST_CONFIG,
  FILE_SIZE_LIMIT_IMAGE,
  FILE_SIZE_LIMIT_VIDEO,
  imageTypesArray,
  videoTypesArray
} from '../../../config/constants';
import { layerTypes } from '../../../interfaces/layer-types';
import { onOutsideClickModal } from '../../../appredux/features/editor-modal/editorModalSlice';
import { setVideoFile, uploadImage, uploadVideo } from '../../../appredux/features/media/mediaSlice';
import { setFileSize } from '../../../appredux/features/video-processing/videoProcessingSlice';
import { bytesToMegaBytes } from '../../../utils/commonUtils';
import { checkFileTypeAccepted } from '../../../utils/mediaUtils';
import {
  EDITOR_MODAL_UPLOAD_TAB_IMAGES,
  EDITOR_MODAL_UPLOAD_TAB_VIDEOS
} from '../constants/editor-modal-media-upload-types';
import EditorModalDragAndDropUpload from '../shared/editor-modal-drag-and-drop-upload/editor-modal-drag-and-drop-upload';
import EditorModalDragAndDropUploadVideo from '../shared/editor-modal-drag-and-drop-upload/editor-modal-drag-and-drop-upload-video';
import EditorModalLabel from '../shared/editor-modal-label/editor-modal-label';
import EditorModalLabelsWrapper from '../shared/editor-modal-labels-wrapper/editor-modal-labels-wrapper';
import EditorModalUploadButton from '../shared/editor-modal-upload-button/editor-modal-upload-button';
import EditorModalWrapper from '../shared/editor-modal-wrapper/editor-modal-wrapper';

const UploadButtonWrapper = styled.div`
  justify-self: flex-end;
  margin-left: auto;
`;

const EditorModalMediaUpload = () => {
  const dispatch = useDispatch();
  const tabNames = [EDITOR_MODAL_UPLOAD_TAB_IMAGES, EDITOR_MODAL_UPLOAD_TAB_VIDEOS];
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const isMediaUploading = useSelector((state) => state.helpers.isMediaUploading);
  const isVideoProcessing = useSelector((state) => state.videoProcessing.isProcessing);
  const isDeleteModalOpen = useSelector((state) => state.media.isDeleteModalOpen);

  const checkFileSize = (fileSize, limit) => {
    const fileSizeMb = bytesToMegaBytes(fileSize);

    if (fileSizeMb >= limit) {
      toast.info(`File exceeded the maximum size of ${limit}MB.`, DEFAULT_TOAST_CONFIG);
      return false;
    }

    return true;
  };

  const onUploadButtonClick = useCallback(
    (event) => {
      if (event.target.files?.length > 0 || event.dataTransfer?.files?.length > 0) {
        const fileToBeUploaded = event.target?.files?.[0] || event.dataTransfer?.files?.[0];

        const isImage = checkFileTypeAccepted(imageTypesArray, fileToBeUploaded.type);
        const isVideo = isImage ? false : checkFileTypeAccepted(videoTypesArray, fileToBeUploaded.type);

        const canUpload = checkFileSize(fileToBeUploaded.size, isImage ? FILE_SIZE_LIMIT_IMAGE : FILE_SIZE_LIMIT_VIDEO);

        if (!canUpload || isVideoProcessing) {
          event.preventDefault();
          return;
        }

        if (isImage) {
          setActiveTab(EDITOR_MODAL_UPLOAD_TAB_IMAGES);
          return dispatch(uploadImage(fileToBeUploaded));
        }

        if (isVideo) {
          setActiveTab(EDITOR_MODAL_UPLOAD_TAB_VIDEOS);
          return batch(() => {
            dispatch(setFileSize(fileToBeUploaded.size));
            dispatch(uploadVideo(fileToBeUploaded));
            dispatch(setVideoFile(fileToBeUploaded));
          });
        }
      }
    },
    [isVideoProcessing, dispatch],
  );

  return (
    <OutsideClickHandler
      disabled={isDeleteModalOpen}
      onOutsideClick={(event) => dispatch(onOutsideClickModal(event, layerTypes.UPLOAD))}
    >
      <EditorModalWrapper>
        <EditorModalLabelsWrapper>
          {tabNames.map((tabName) => (
            <EditorModalLabel
              key={tabName}
              text={tabName}
              isActive={tabName === activeTab}
              onClick={() => setActiveTab(tabName)}
            />
          ))}

          <UploadButtonWrapper>
            <EditorModalUploadButton
              isDisabled={isMediaUploading || isVideoProcessing}
              acceptedFileTypes={allAcceptedFileTypes}
              onClick={onUploadButtonClick}
            />
          </UploadButtonWrapper>
        </EditorModalLabelsWrapper>

        {activeTab === EDITOR_MODAL_UPLOAD_TAB_IMAGES && (
          <EditorModalDragAndDropUpload onDrop={onUploadButtonClick} activeTabType={EDITOR_MODAL_UPLOAD_TAB_IMAGES} />
        )}
        {activeTab === EDITOR_MODAL_UPLOAD_TAB_VIDEOS && (
          <EditorModalDragAndDropUploadVideo
            onDrop={onUploadButtonClick}
            activeTabType={EDITOR_MODAL_UPLOAD_TAB_VIDEOS}
          />
        )}
      </EditorModalWrapper>
    </OutsideClickHandler>
  );
};

export default EditorModalMediaUpload;
