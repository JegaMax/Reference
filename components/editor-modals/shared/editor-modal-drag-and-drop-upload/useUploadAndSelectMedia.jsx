import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { layerTypes } from '../../../../interfaces/layer-types';
import { changeCtaImage, createNewLayer, replaceMedia } from '../../../../appredux/features/amp-story/ampStorySlice';
import { toggleReplaceModal, toggleSelectCtaImage } from '../../../../appredux/features/editor/helpers/helpersSlice';
import {
  addMediaName,
  clearLoadedMedia,
  clearOffset,
  loadUploadedMedia,
  setOffset
} from '../../../../appredux/features/media/mediaSlice';
import { extractImageDimensions, extractVideoDimensions } from '../../../../utils/mediaUtils';
import { EDITOR_MODAL_UPLOAD_TAB_VIDEOS } from '../../constants/editor-modal-media-upload-types';
import { selectMediaType } from '../../interfaces';

const useUploadAndSelectMedia = (activeTabType) => {
  const dropRef = useRef(null);
  const dispatch = useDispatch();
  const uploadedMedia = useSelector((state) => state.media.uploadedMedia);
  const uploadedMediaFirstColumn = uploadedMedia.slice(0, uploadedMedia.length / 2);
  const uploadedMediaSecondColumn = uploadedMedia.slice(uploadedMedia.length / 2);
  const offset = useSelector((state) => state.media.offset);
  const [isLoading, setIsLoading] = useState(true);
  const videoProcessing = useSelector((state) => state.videoProcessing);
  const isUploadDisabled = useMemo(() => {
    return activeTabType === EDITOR_MODAL_UPLOAD_TAB_VIDEOS && videoProcessing?.isProcessing;
  }, [activeTabType, videoProcessing?.isProcessing]);

  const getUploadedMedia = useCallback(async () => {
    setIsLoading(true);
    await dispatch(loadUploadedMedia(activeTabType));
    setIsLoading(false);
  }, [activeTabType, dispatch]);

  const onListScroll = useCallback(() => {
    dispatch(setOffset());
  }, [dispatch]);

  const createMediaLayer = useCallback(
    (media, type, mediaTitle) => {
      batch(() => {
        dispatch(
          createNewLayer({
            type: type === EDITOR_MODAL_UPLOAD_TAB_VIDEOS ? layerTypes.VIDEO : layerTypes.IMAGE,
            media,
            temporaryId: media?.temporaryId ?? media.id,
          }),
        );
        dispatch(addMediaName(mediaTitle));
      });
    },
    [dispatch],
  );

  const replaceMediaLayer = useCallback(
    (media, type, mediaTitle) => {
      dispatch(toggleReplaceModal());

      batch(() => {
        dispatch(replaceMedia(media));
        dispatch(addMediaName(mediaTitle));
      });
    },
    [dispatch],
  );

  const onMediaLayerChange = useCallback(
    async (media, type, selectType) => {
      let originalHeight, originalWidth;
      try {
        if (type === 'Video') {
          const { width: videoWidth, height: videoHeight } = await extractVideoDimensions(media.url || '');
          originalHeight = videoHeight;
          originalWidth = videoWidth;
        } else {
          const { width: imageWidth, height: imageHeight } = await extractImageDimensions(media.url || '');
          originalHeight = imageHeight;
          originalWidth = imageWidth;
        }
        media = {
          ...media,
          width: originalWidth,
          height: originalHeight,
        };
      } catch (err) {
        console.error(err);
        return;
      }
      const mediaTitle = type === 'Video' ? media?.thumbnail?.name : media.name;

      if (selectType === selectMediaType.CREATE_LAYER) {
        createMediaLayer(media, type, mediaTitle);
      }
      if (selectType === selectMediaType.REPLACE_MEDIA) {
        replaceMediaLayer(media, type, mediaTitle);
      }
    },
    [createMediaLayer, replaceMediaLayer],
  );

  const onSelectCtaImage = useCallback(
    (media) => {
      batch(() => {
        dispatch(changeCtaImage(media));
        dispatch(toggleSelectCtaImage());
      });
    },
    [dispatch],
  );

  const onMediaSelect = useCallback(
    (
      media,
      type,
      selectType = selectMediaType.CREATE_LAYER,
      selectCallback,
    ) => async () => {
      if (selectCallback && typeof selectCallback === 'function' && media?.url) {
        selectCallback(media.url);
        return;
      }

      if (selectType === selectMediaType.SELECT_CTA_IMAGE) {
        onSelectCtaImage(media);
      } else {
        await onMediaLayerChange(media, type, selectType);
      }
    },
    [onMediaLayerChange, onSelectCtaImage],
  );

  useEffect(() => {
    batch(() => {
      dispatch(clearLoadedMedia());
      dispatch(clearOffset());
    });
  }, [dispatch, activeTabType]);

  useEffect(() => {
    getUploadedMedia();
  }, [dispatch, activeTabType, offset, getUploadedMedia]);

  return {
    dropRef,
    uploadedMedia,
    uploadedMediaFirstColumn,
    uploadedMediaSecondColumn,
    isLoading,
    isUploadDisabled,
    onListScroll,
    onMediaSelect,
    videoProcessing,
  };
};

export default useUploadAndSelectMedia;
