import Cropper from 'components/cropper';
import { useAppSelector } from 'hooks';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useMemo } from 'react';
import 'react-image-crop-fork/dist/ReactCrop.css';
import { setCroppedElementStyles } from '../../../../../utils/croppingUtils';
import Styled from './cropped-layer-styles';

const ImageLayer = ({ isActive, width, height, layer, inheritVisibility }) => {
  const isCroppingModeActive = useAppSelector((state) => state.helpers.isCroppingMode);
  const canRenderCropper = useMemo(() => isActive && isCroppingModeActive, [isActive, isCroppingModeActive]);

  const hasDropShadow = useMemo(() => {
    return (
      !layer.settings.layerSettings.fullscreen &&
      layer.type !== layerTypes.GIFS &&
      +layer.settings.generalSettings.shadow !== 0
    );
  }, [layer.settings.layerSettings.fullscreen, layer.type, layer.settings.generalSettings.shadow]);

  if (canRenderCropper) {
    return <Cropper layer={layer} />;
  }

  return (
    <Styled.BackgroundContainer
      className="image-wrapper"
      width={width}
      height={height}
      filter={
        hasDropShadow ? `drop-shadow(1px 1px ${+layer.settings.generalSettings.shadow}px rgba(0,0,0,0.75))` : 'none'
      }
      borderRadius={`${+layer.settings.generalSettings.round * 2}px`}
    >
      <Styled.MediaWrapper
        isActive={!canRenderCropper || layer.settings.layerSettings.fullscreen}
        inheritVisibility={inheritVisibility}
      >
        <img
          style={setCroppedElementStyles(
            layer.settings?.layerSettings,
            layer.settings?.cropSettings,
            width,
            height,
            canRenderCropper,
          )}
          src={layer?.content?.value || layer?.content?.image?.url}
          alt="user-asset"
        />
      </Styled.MediaWrapper>
    </Styled.BackgroundContainer>
  );
};

export default memo(ImageLayer);
