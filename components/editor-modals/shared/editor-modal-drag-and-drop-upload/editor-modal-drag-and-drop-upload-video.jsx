import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nonThumbnailVideoTypesArray, VIDEO_PROCESSING_STATUS_DONE } from '../../../../config/constants';
import { useMoveableTooltip, useSpinner } from '../../../../hooks';
import { setTemporaryProgress } from '../../../../appredux/features/video-processing/videoProcessingSlice';
import { checkFileTypeAccepted } from '../../../../utils/mediaUtils';
import ImageColumn from '../../../media/shared/image-column';
import ImagesWrapper from '../../../media/shared/images-wrapper';
import LoaderWrapper from '../../../media/shared/loader-wrapper';
import ProcessingVideo from '../../../media/shared/processing-video';
import SelectorContentWrapper from '../../../media/shared/selector-content-wrapper';
import StyledInfiniteScroll from '../../../media/shared/styled-infinite-scroll';
import UploadedImage from '../../../media/shared/uploaded-image';
import MessageModal from '../../../message-modal';
import { MoveableTooltip } from '../../../tooltip';
import { selectMediaType } from '../../interfaces';
import DragAndDropEmptyContent from '../drag-and-drop-empty-content/drag-and-drop-empty-content';
import DragAndDropWrapper from '../drag-and-drop-wrapper';
import useDeleteMedia from './useDeleteMedia';
import useDragAndDrop from './useDragAndDrop';
import useUploadAndSelectMedia from './useUploadAndSelectMedia';

const EditorModalDragAndDropUploadVideo = ({
  onDrop,
  activeTabType,
  selectType = selectMediaType.CREATE_LAYER,
}) => {
  const dispatch = useDispatch();
  const processingRecord = useSelector((state) => state.videoProcessing.processingRecord);
  const temporaryProgress = useSelector((state) => state.videoProcessing.temporaryProgress);
  const isMediaUploading = useSelector((state) => state.helpers.isMediaUploading);
  const fileSize = useSelector((state) => state.videoProcessing.fileSize);
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(temporaryProgress || 0);
  const [videoProcessingInterval, setVideoProcessingInterval] = useState(null);
  const [isDropDisabled, setDropDisabled] = useState(false);

  const setProgressStep = useCallback((fileSize) => {
    if (fileSize) {
      setStep(100 / (fileSize / 1000000));
    }
    if (!fileSize) {
      setStep(0);
    }
  }, []);

  useEffect(() => {
    setProgressStep(fileSize);
  }, [setProgressStep, fileSize]);

  useEffect(() => {
    /** Check if videoProcessing is initialized */
    if (!processingRecord) {
      /** Clear interval if is setted. Just in case */
      videoProcessingInterval && clearInterval(videoProcessingInterval);
      return;
    }
    /** Clear interval on each cycle */
    if (videoProcessingInterval) {
      clearInterval(videoProcessingInterval);
      setVideoProcessingInterval(null);
    }
    /** Check videoProcessing status, if is REJECTED, or DONE, stop requests */
    if (processingRecord?.status === VIDEO_PROCESSING_STATUS_DONE && videoProcessingInterval) {
      setTimeout(() => {
        setProgress(0);
        dispatch(setTemporaryProgress(0));
      }, 500);

      clearInterval(videoProcessingInterval);
    }

    const interval = setInterval(() => {
      if (progress + step < 90) {
        setProgress((progress) => progress + step);
      }
    }, 500);

    setVideoProcessingInterval(interval);
  }, [processingRecord, progress, step]);

  useEffect(() => {
    if (processingRecord && processingRecord.percentage > progress) {
      setProgress(processingRecord.percentage);
    }
  }, [processingRecord, progress]);

  useEffect(() => {
    return () => {
      dispatch(setTemporaryProgress(progress));
    };
  }, [dispatch, progress]);

  const {
    dropRef,
    uploadedMedia,
    uploadedMediaFirstColumn,
    uploadedMediaSecondColumn,
    isLoading,
    isUploadDisabled,
    onListScroll,
    onMediaSelect,
    videoProcessing,
  } = useUploadAndSelectMedia(activeTabType);

  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'SyncLoader',
    size: 10,
  });

  useDragAndDrop({ isDropDisabled: isUploadDisabled || isDropDisabled, fileWrapper: dropRef.current, onDrop: onDrop });

  const handleTemporaryVideoClick = useCallback(() => {
    const fileType = videoProcessing?.originalVideo?.mimeType || '';
    const canBeClicked = !checkFileTypeAccepted(nonThumbnailVideoTypesArray, fileType);

    if (videoProcessing?.originalVideo && canBeClicked) {
      onMediaSelect(videoProcessing.originalVideo, activeTabType, selectType)();
    }
  }, [activeTabType, onMediaSelect, selectType, videoProcessing.originalVideo]);

  const { toggleDeleteMediaModal, deletePersonalMedia, isDeleteModalOpen, deleteMessage } = useDeleteMedia();
  const { tooltip, onMouseEnter, onMouseLeave } = useMoveableTooltip();

  return (
    <>
      <DragAndDropWrapper ref={dropRef}>
        {isLoading && (
          <LoaderWrapper>
            <Spinner {...spinnerProps} isVisible={true} />
          </LoaderWrapper>
        )}
        {(uploadedMedia.length > 0 || videoProcessing?.isProcessing || isMediaUploading) && (
          <SelectorContentWrapper id={'media-list-container'}>
            <StyledInfiniteScroll
              dataLength={uploadedMedia.length}
              hasMore={true}
              next={onListScroll}
              loader={<></>}
              scrollableTarget={'media-list-container'}
            >
              <ImagesWrapper>
                <ImageColumn>
                  {(videoProcessing?.isProcessing || isMediaUploading) && (
                    <ProcessingVideo
                      videoProcessing={videoProcessing}
                      progress={progress}
                      handleTemporaryVideoClick={handleTemporaryVideoClick}
                      setDropDisabled={setDropDisabled}
                    />
                  )}
                  {uploadedMediaFirstColumn.map((media) => (
                    <UploadedImage
                      key={media._id}
                      media={media}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      toggleDeleteMediaModal={toggleDeleteMediaModal}
                      onMediaSelect={onMediaSelect}
                      activeTabType={activeTabType}
                      selectType={selectType}
                      setDropDisabled={setDropDisabled}
                    />
                  ))}
                </ImageColumn>
                <ImageColumn>
                  {uploadedMediaSecondColumn.map((media) => (
                    <UploadedImage
                      key={media._id}
                      media={media}
                      onMouseEnter={onMouseEnter}
                      onMouseLeave={onMouseLeave}
                      toggleDeleteMediaModal={toggleDeleteMediaModal}
                      onMediaSelect={onMediaSelect}
                      activeTabType={activeTabType}
                      selectType={selectType}
                      setDropDisabled={setDropDisabled}
                    />
                  ))}
                </ImageColumn>
              </ImagesWrapper>
            </StyledInfiniteScroll>
          </SelectorContentWrapper>
        )}
        {uploadedMedia.length < 1 && !isLoading && !videoProcessing?.isProcessing && !isMediaUploading && (
          <DragAndDropEmptyContent />
        )}
      </DragAndDropWrapper>
      <MessageModal
        isOpen={isDeleteModalOpen}
        message={deleteMessage}
        shouldCloseOnOverlayClick={true}
        onCancel={toggleDeleteMediaModal()}
        onAccept={deletePersonalMedia}
      />
      <MoveableTooltip showTooltip={tooltip.show && !isDropDisabled} text={tooltip.text} inverted />
    </>
  );
};

export default EditorModalDragAndDropUploadVideo;
