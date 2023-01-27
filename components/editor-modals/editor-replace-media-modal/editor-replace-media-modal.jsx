import EditorModalDragAndDropUpload from '../shared/editor-modal-drag-and-drop-upload/editor-modal-drag-and-drop-upload';
import EditorModalDragAndDropUploadVideo from '../shared/editor-modal-drag-and-drop-upload/editor-modal-drag-and-drop-upload-video';
import EditorModalLabel from '../shared/editor-modal-label/editor-modal-label';
import EditorModalLabelsWrapper from '../shared/editor-modal-labels-wrapper/editor-modal-labels-wrapper';
import EditorModalUploadButton from '../shared/editor-modal-upload-button/editor-modal-upload-button';
import ImageSelector from '../../media/images/image-selector';
import Modal from 'react-modal';
import styled from 'styled-components';
import { batch } from 'react-redux';
import { bytesToMegaBytes } from '../../../utils/commonUtils';
import { checkFileTypeAccepted } from '../../../utils/mediaUtils';
import { layerTypes } from '../../../interfaces/layer-types';
import { selectActiveLayer } from '../../../appredux/features/amp-story/ampStorySlice';
import { selectMediaType } from '../interfaces';
import { setFileSize } from '../../../appredux/features/video-processing/videoProcessingSlice';
import { toast } from 'react-toastify';
import { toggleReplaceModal } from '../../../appredux/features/editor/helpers/helpersSlice';
import { UNSPLASH_IMAGES, UPLOADED_IMAGES, UPLOADED_VIDEOS } from './constants';
import { uploadImage, uploadVideo } from '../../../appredux/features/media/mediaSlice';
import { useAppDispatch, useAppSelector, useDebounceSearch } from '../../../hooks';
import { useCallback, useMemo, useState } from 'react';
import {
  DEFAULT_TOAST_CONFIG,
  FILE_SIZE_LIMIT_IMAGE,
  FILE_SIZE_LIMIT_VIDEO,
  imageAcceptedTypes,
  imageTypesArray,
  videoAcceptedTypes,
  videoTypesArray,
} from '../../../config/constants';
import {
  EDITOR_MODAL_UPLOAD_TAB_IMAGES,
  EDITOR_MODAL_UPLOAD_TAB_VIDEOS,
} from '../constants/editor-modal-media-upload-types';

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

const TAB_NAMES = [UPLOADED_IMAGES, UPLOADED_VIDEOS, UNSPLASH_IMAGES];

const EditorReplaceMediaModal = () => {
  const dispatch = useAppDispatch();

  const layer = useAppSelector(selectActiveLayer);
  const selectedChildLayer = useAppSelector((state) => state.groupLayerHelper.selectedChildLayer);
  const showReplaceModal = useAppSelector((state) => state.helpers.showReplaceModal);
  const isMediaUploading = useAppSelector((state) => state.helpers.isMediaUploading);
  const isVideoProcessing = useAppSelector((state) => state.videoProcessing.isProcessing);

  const activeLayer = useMemo(() => selectedChildLayer ?? layer, [layer, selectedChildLayer]);

  const [activeTab, setActiveTab] = useState(activeLayer?.type === layerTypes.IMAGE ? TAB_NAMES[0] : TAB_NAMES[1]);
  const [searchValue, debouncedSearchValue, onSearchChange] = useDebounceSearch();

  const fileTypes = useMemo(() => (activeTab === UPLOADED_IMAGES ? imageAcceptedTypes : videoAcceptedTypes), [
    activeTab,
  ]);

  const onCancel = useCallback(() => {
    dispatch(toggleReplaceModal());
  }, [dispatch]);

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
          setActiveTab(UPLOADED_IMAGES);
          return dispatch(uploadImage(fileToBeUploaded));
        }

        if (isVideo) {
          setActiveTab(EDITOR_MODAL_UPLOAD_TAB_VIDEOS);
          return batch(() => {
            dispatch(setFileSize(fileToBeUploaded.size));
            dispatch(uploadVideo(fileToBeUploaded));
          });
        }
      }
    },
    [isVideoProcessing, dispatch],
  );

  const handleTabChange = useCallback(
    (tabName) => () => {
      setActiveTab(tabName);
    },
    [],
  );

  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={showReplaceModal}
      style={customStyles}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <ModalContent>
        <EditorModalLabelsWrapper>
          {TAB_NAMES.map((tabName) => (
            <EditorModalLabel
              key={tabName}
              text={tabName}
              isActive={tabName === activeTab}
              onClick={handleTabChange(tabName)}
            />
          ))}
          {(activeTab === UPLOADED_IMAGES || activeTab === UPLOADED_VIDEOS) && (
            <UploadButtonWrapper>
              <EditorModalUploadButton
                isDisabled={isMediaUploading || isVideoProcessing}
                acceptedFileTypes={fileTypes}
                onClick={onUploadButtonClick}
              />
            </UploadButtonWrapper>
          )}
        </EditorModalLabelsWrapper>

        <SelectorWrapper>
          {activeTab === UPLOADED_IMAGES && (
            <EditorModalDragAndDropUpload
              onDrop={onUploadButtonClick}
              activeTabType={EDITOR_MODAL_UPLOAD_TAB_IMAGES}
              selectType={selectMediaType.REPLACE_MEDIA}
            />
          )}
          {activeTab === UPLOADED_VIDEOS && (
            <EditorModalDragAndDropUploadVideo
              onDrop={onUploadButtonClick}
              activeTabType={EDITOR_MODAL_UPLOAD_TAB_VIDEOS}
              selectType={selectMediaType.REPLACE_MEDIA}
            />
          )}

          {activeTab === UNSPLASH_IMAGES && (
            <ImageSelector
              selectType={selectMediaType.REPLACE_MEDIA}
              searchValue={searchValue}
              debouncedSearchValue={debouncedSearchValue}
              onSearchChange={onSearchChange}
            />
          )}
        </SelectorWrapper>
      </ModalContent>
    </Modal>
  );
};

export default EditorReplaceMediaModal;
