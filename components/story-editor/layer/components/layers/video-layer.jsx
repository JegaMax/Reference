import Cropper from 'components/cropper';
import { useAppSelector } from 'hooks';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useMemo } from 'react';
import { setCroppedElementStyles } from '../../../../../utils/croppingUtils';
import Styled from './cropped-layer-styles';

const VideoLayer = ({
  isActive,
  width,
  height,
  layer,
  slidePosition,
  isMuted,
  inheritVisibility,
}) => {
  const isCroppingModeActive = useAppSelector((state) => state.helpers.isCroppingMode);
  const canRenderCropper = useMemo(() => isActive && isCroppingModeActive, [isActive, isCroppingModeActive]);

  const hasDropShadow = useMemo(() => {
    return (
      !layer.settings.layerSettings.fullscreen &&
      layer.type !== layerTypes.GIFS &&
      +layer.settings.generalSettings.shadow !== 0
    );
  }, [layer.settings.layerSettings.fullscreen, layer.type, layer.settings.generalSettings.shadow]);

  const video = useMemo(
    () => (
      <video
        key={layer.content.video.id}
        autoPlay
        playsInline={!layer.settings.layerSettings.isLayerHidden}
        muted={isMuted || (inheritVisibility && layer.settings.layerSettings.isLayerHidden)}
        src={layer.content.value || layer.content.video.url}
        width={layer.settings?.cropSettings?.originalWidth ?? width}
        height={layer.settings?.cropSettings?.originalHeight ?? height}
      />
    ),
    [
      height,
      inheritVisibility,
      isMuted,
      layer.content.value,
      layer.content.video.id,
      layer.content.video.url,
      layer.settings?.cropSettings?.originalHeight,
      layer.settings?.cropSettings?.originalWidth,
      layer.settings.layerSettings.isLayerHidden,
      width,
    ],
  );

  if (canRenderCropper) {
    return <Cropper layer={layer} videoComponent={video} />;
  }

  return (
    <Styled.BackgroundContainer
      width={width}
      height={height}
      filter={
        hasDropShadow ? `drop-shadow(1px 1px ${+layer.settings.generalSettings.shadow}px rgba(0,0,0,0.75))` : 'none'
      }
      borderRadius={`${+layer.settings.generalSettings.round * 2}px`}
    >
      {/* <Styled.Cropper
        isActive={isLayerInCroppingMode && !layer.settings.layerSettings.fullscreen}
        ruleOfThirds
        renderComponent={video}
        src={''}
        crop={crop}
        keepSelection
        minWidth={20}
        minHeight={20}
        spin={+layer.settings.generalSettings?.rotate}
        onChange={onCropChange}
        disabled={!isLayerInCroppingMode}
        style={setCropperStyles(isLayerInCroppingMode, layer.settings?.cropSettings, width, height)}
      /> */}
      <Styled.MediaWrapper
        isActive={!canRenderCropper || layer.settings.layerSettings.fullscreen}
        inheritVisibility={inheritVisibility}
      >
        <video
          key={layer.content.video.id}
          autoPlay
          playsInline={!layer.settings.layerSettings.isLayerHidden}
          muted={isMuted || (inheritVisibility && layer.settings.layerSettings.isLayerHidden)}
          style={setCroppedElementStyles(
            layer.settings.layerSettings,
            layer.settings?.cropSettings,
            width,
            height,
            canRenderCropper,
          )}
          src={layer.content.value || layer.content.video.url}
        />
      </Styled.MediaWrapper>
    </Styled.BackgroundContainer>
  );
};

export default memo(VideoLayer);
