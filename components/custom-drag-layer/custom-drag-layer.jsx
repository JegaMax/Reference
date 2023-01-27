import {
  PresetContainer,
  StyledChevronRight,
  StyledLabelIcon,
  StyledPlusIcon
} from 'components/editor-modals/editor-modal-presets/preset';
import { StyledChevronUp, SwipeUpContainer } from 'components/editor-modals/editor-modal-presets/swipe-up';
import { StyledImage } from 'components/media/shared/image';
import { StyledUploadedImage } from 'components/media/shared/uploaded-image';
import { ShapeImage, ShapeItem } from 'components/shape/shape';
import { useAppSelector, useDragPreview } from 'hooks';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useMemo } from 'react';
import { changeMediaSize } from 'utils/mediaUtils';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  zIndex: 100,
  left: 0,
  top: 0,
  width: '100%',
  height: '100%',
};

const MEDIA_TYPES = [layerTypes.IMAGE, layerTypes.GIFS, layerTypes.STICKERS, layerTypes.VIDEO];

const CustomDragLayer = () => {
  const clientWidth = useAppSelector((state) => +state.ampStory.present.initialWidth);
  const zoomPercent = useAppSelector((state) => state.helpers.zoomPercent);

  const [item, previewRef, { isDragging, isOverEditor }] = useDragPreview();
  const zoomPercentRatio = useMemo(() => zoomPercent / 100, [zoomPercent]);
  const outlinkTextSize = useMemo(() => {
    if (item?.presetContent?.layer) {
      let fontSize = 26;
      const textLayer = (item?.presetContent?.layer?.childLayers)?.find(
        (l) => l.type === layerTypes.HTML,
      );
      if (textLayer) {
        const regex = new RegExp(/FONT_SIZE_\d+/);
        const fontSizeString = textLayer.content.value.match(regex)?.[0];
        const fontSizeTokens = fontSizeString?.split('_');
        fontSize = +(fontSizeTokens?.[fontSizeTokens.length - 1] ?? 26);
      }

      return fontSize;
    }
    return null;
  }, [item?.presetContent?.layer]);

  const mediaData = useMemo(() => {
    if (item?.type && MEDIA_TYPES.includes(item?.type)) {
      const dimensions = changeMediaSize(
        item?.width,
        item?.height,
        item?.type === layerTypes.GIFS || item?.type === layerTypes.STICKERS
          ? 150 * zoomPercentRatio
          : 300 * zoomPercentRatio,
      );
      const previewHeight = (item?.previewWidth ?? 1) / (dimensions.width / dimensions.height);
      return {
        ...dimensions,
        previewWidth: item?.previewWidth,
        previewHeight,
      };
    }

    return null;
  }, [item?.height, item?.previewWidth, item?.type, item?.width, zoomPercentRatio]);

  function renderItem() {
    switch (item?.type) {
      case layerTypes.SHAPE:
      case layerTypes.GRADIENTS:
        return (
          <ShapeItem
            style={{
              width: isOverEditor ? `${zoomPercent}px` : `${item.width}px`,
              height: isOverEditor ? `${zoomPercent}px` : `${item.height}px`,
            }}
          >
            <ShapeImage src={item?.image} alt="shape" />
          </ShapeItem>
        );
      case layerTypes.IMAGE:
      case layerTypes.GIFS:
      case layerTypes.STICKERS:
        if (item.uploadedMedia) {
          return (
            <StyledUploadedImage
              alt="media"
              src={item.image}
              style={{
                width: isOverEditor ? `${mediaData?.width}px` : `${mediaData?.previewWidth ?? 0}px`,
                height: isOverEditor ? `${mediaData?.height}px` : `${mediaData?.previewHeight ?? 0}px`,
              }}
            />
          );
        }

        return (
          <StyledImage
            src={item?.image}
            alt="image"
            style={{
              width: isOverEditor ? `${mediaData?.width}px` : `${mediaData?.previewWidth ?? 0}px`,
              height: isOverEditor ? `${mediaData?.height}px` : `${mediaData?.previewHeight ?? 0}px`,
            }}
          />
        );
      case layerTypes.VIDEO: {
        return (
          <StyledUploadedImage
            alt="media"
            src={item.image}
            style={{
              width: isOverEditor ? `${mediaData?.width}px` : `${mediaData?.previewWidth ?? 0}px`,
              height: isOverEditor ? `${mediaData?.height}px` : `${mediaData?.previewHeight ?? 0}px`,
            }}
          />
        );
      }
      case layerTypes.OUTLINK: {
        if (item?.presetContent && outlinkTextSize) {
          return (
            <PresetContainer
              {...item?.presetContent?.styles}
              style={{
                width: isOverEditor
                  ? `${(item?.presetContent?.layer.settings.layerSettings.width ?? 1) * zoomPercentRatio}px`
                  : `${item?.width ?? 0}px`,
                height: isOverEditor
                  ? `${(item?.presetContent?.layer.settings.layerSettings.height ?? 1) * zoomPercentRatio}px`
                  : `${item?.height ?? 0}px`,
                fontSize: isOverEditor ? `${(outlinkTextSize / 16) * (2.6 * (+clientWidth / 100))}px` : '12px',
              }}
            >
              {item?.presetContent?.plusIcon ? (
                <StyledPlusIcon
                  style={{
                    width: isOverEditor ? `26px` : `24px`,
                    height: isOverEditor ? `26px` : `24px`,
                    transform: isOverEditor ? `scale(${zoomPercentRatio})` : 'none',
                    marginRight: isOverEditor ? `${7 * zoomPercentRatio}px` : '0',
                  }}
                />
              ) : null}
              {item?.presetContent?.title}
              {item?.presetContent?.chevron ? (
                <StyledChevronRight
                  style={{
                    width: isOverEditor ? `6px` : `4px`,
                    height: isOverEditor ? `9px` : `7px`,
                    transform: isOverEditor ? `scale(${zoomPercentRatio})` : 'none',
                    marginLeft: isOverEditor ? `${7 * zoomPercentRatio}px` : '7px',
                  }}
                />
              ) : null}
              {item?.presetContent?.labelIcon ? (
                <StyledLabelIcon
                  style={{
                    width: isOverEditor ? `15px` : `13px`,
                    height: isOverEditor ? `15px` : `13px`,
                    transform: isOverEditor ? `scale(${zoomPercentRatio})` : 'none',
                    marginLeft: isOverEditor ? `${7 * zoomPercentRatio}px` : '7px',
                  }}
                />
              ) : null}
            </PresetContainer>
          );
        }

        return (
          <SwipeUpContainer
            {...item?.swipeUpContent?.styles}
            hasBlackChevron={item?.swipeUpContent?.hasBlackChevron}
            // style={{
            //   width: isOverEditor
            //     ? `${(item?.presetContent?.layer.settings.layerSettings.width ?? 1) * zoomPercentRatio}px`
            //     : `${item?.width ?? 0}px`,
            //   height: isOverEditor
            //     ? `${(item?.presetContent?.layer.settings.layerSettings.height ?? 1) * zoomPercentRatio}px`
            //     : `${item?.height ?? 0}px`,
            //   fontSize: isOverEditor ? '17.7532px' : '12px',
            // }}
          >
            {/* {config.logo ? (
                  <UploadedIconWrapper>
                    <UploadedIcon src={config.logo} />
                  </UploadedIconWrapper>
                ) } */}
            {item?.swipeUpContent?.title}
            {item?.swipeUpContent?.chevron ? <StyledChevronUp /> : null}
          </SwipeUpContainer>
        );
      }
      case layerTypes.HTML: {
        return (
          <div
            style={{
              background: 'transparent',
              color: '#fff',
              textDecoration: item?.preset?.style?.includes('underline') ? 'underline' : 'none',
              fontStyle: item?.preset?.style?.includes('italic') ? 'italic' : 'normal',
              fontFamily: item?.preset?.fontFamily,
              fontWeight:
                item?.preset?.weight !== 700 && item?.preset?.style?.includes('bold') ? 'bold' : item?.preset?.weight,
              fontSize: `${((item?.preset?.size ?? 1) / 16) * (2.6 * (+clientWidth / 100))}px`,
              height: item.height,
              width: item.width,
              alignItems: 'flex-start',
              whiteSpace: 'break-spaces',
              overflowWrap: 'break-word',
              lineHeight: 1.5,
              wordBreak: 'break-word',
              textAlign: 'center',
            }}
          >
            Type something
          </div>
        );
      }
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <div style={layerStyles}>
      <div ref={previewRef}>{renderItem()}</div>
    </div>
  );
};

export default memo(CustomDragLayer);
