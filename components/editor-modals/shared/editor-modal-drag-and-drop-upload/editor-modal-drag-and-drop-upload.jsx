import { memo, useState } from 'react';
import { useMoveableTooltip, useSpinner } from '../../../../hooks';
import ImageColumn from '../../../media/shared/image-column';
import ImagesWrapper from '../../../media/shared/images-wrapper';
import LoaderWrapper from '../../../media/shared/loader-wrapper';
import SelectorContentWrapper from '../../../media/shared/selector-content-wrapper';
import StyledInfiniteScroll from '../../../media/shared/styled-infinite-scroll';
import UploadedImage from '../../../media/shared/uploaded-image';
import MessageModal from '../../../message-modal/message-modal';
import { MoveableTooltip } from '../../../tooltip';
import { selectMediaType } from '../../interfaces';
import DragAndDropEmptyContent from '../drag-and-drop-empty-content/drag-and-drop-empty-content';
import DragAndDropWrapper from '../drag-and-drop-wrapper';
import useDeleteMedia from './useDeleteMedia';
import useDragAndDrop from './useDragAndDrop';
import useUploadAndSelectMedia from './useUploadAndSelectMedia';

const EditorModalDragAndDropUpload = ({
  onDrop,
  activeTabType,
  selectType = selectMediaType.CREATE_LAYER,
  selectCallback,
}) => {
  const {
    dropRef,
    uploadedMedia,
    uploadedMediaFirstColumn,
    uploadedMediaSecondColumn,
    isLoading,
    isUploadDisabled,
    onListScroll,
    onMediaSelect,
  } = useUploadAndSelectMedia(activeTabType);

  const [isDropDisabled, setDropDisabled] = useState(false);
  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'SyncLoader',
    size: 10,
  });

  useDragAndDrop({ isDropDisabled: isUploadDisabled || isDropDisabled, fileWrapper: dropRef.current, onDrop: onDrop });

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
        {uploadedMedia.length > 0 && (
          <>
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
                        selectCallback={selectCallback}
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
                        selectCallback={selectCallback}
                        setDropDisabled={setDropDisabled}
                      />
                    ))}
                  </ImageColumn>
                </ImagesWrapper>
              </StyledInfiniteScroll>
            </SelectorContentWrapper>
          </>
        )}
        {uploadedMedia.length < 1 && !isLoading && <DragAndDropEmptyContent />}
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

export default memo(EditorModalDragAndDropUpload);
