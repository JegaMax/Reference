import { calculateNumberOfPercent } from './common';

const pattern = /[inset | ( | ) | px]/gim;

export const parseClip = (clip) => {
  const values = clip
    .replaceAll(pattern, ' ')
    .split(' ')
    .filter((v) => v)
    .map((v) => Number(v));

  if (values.length === 0) {
    return [0, 0, 0, 0];
  }

  return values;
};

export const setCroppedElementStyles = (
  layerSettings,
  cropSettings,
  width,
  height,
  isLayerInCroppingMode,
) => {
  if (layerSettings?.fullscreen) {
    return {
      width: layerSettings.width,
      height: layerSettings.height,
    };
  }

  if (cropSettings && !isLayerInCroppingMode) {
    const originalCropProportion = +cropSettings?.originalWidth / +cropSettings?.originalHeight;
    const parsedClip = parseClip(cropSettings?.frame?.clipStyle);

    const croppedWidth = cropSettings?.originalWidth - parsedClip?.[1] - parsedClip?.[3];
    const croppedWidthProportion = croppedWidth / width;

    const newOriginalWidth = +cropSettings?.originalWidth / croppedWidthProportion;
    const newOriginalHeight = newOriginalWidth / originalCropProportion;

    return {
      top: `${-1 * (parsedClip?.[0] / croppedWidthProportion)}px`,
      left: `${-1 * (parsedClip?.[3] / croppedWidthProportion)}px`,
      width: `${newOriginalWidth}px`,
      height: `${newOriginalHeight}px`,
    };
  }

  return {
    width,
    height,
  };
};

export const setCropperStyles = (
  isLayerInCroppingMode,
  cropSettings,
  width,
  height,
) => {
  return {
    transform:
      !isLayerInCroppingMode && cropSettings
        ? `translate(-${calculateNumberOfPercent(
            cropSettings.original.width,
            cropSettings.x || 0,
          )}px, -${calculateNumberOfPercent(cropSettings.original.height, cropSettings.y || 0)}px)`
        : 'translate(0px, 0px)',

    width: `${cropSettings?.original?.width ?? width}px`,
    height: `${cropSettings?.original?.height ?? height}px`,
  };
};

export const generateCroppedLayer = (layer, frame) => {
  const { layerSettings, generalSettings, cropSettings } = layer.settings;

  if (cropSettings) {
    const currentClip = parseClip(cropSettings?.frame?.clipStyle);
    const parsedClip = parseClip(frame.clipStyle);

    const deltaLeft = parsedClip[3] - currentClip[3];
    const deltaRight = parsedClip[1] - currentClip[1];
    const deltaTop = parsedClip[0] - currentClip[0];
    const deltaBottom = parsedClip[2] - currentClip[2];

    const deltaTranslateX = frame.translate[0] - cropSettings?.frame.translate[0];
    const deltaTranslateY = frame.translate[1] - cropSettings?.frame.translate[1];

    const croppedWidth = layerSettings.width - deltaLeft - deltaRight;
    const croppedHeight = layerSettings.height - deltaTop - deltaBottom;

    const newOffsetX = generalSettings.offsetX + deltaLeft + deltaTranslateX;
    const newOffsetY = generalSettings.offsetY + deltaTop + deltaTranslateY;

    return {
      ...layer,
      settings: {
        ...layer.settings,
        layerSettings: {
          ...layerSettings,
          width: croppedWidth,
          height: croppedHeight,
        },
        generalSettings: {
          ...generalSettings,
          offsetX: newOffsetX,
          offsetY: newOffsetY,
        },
        cropSettings: {
          ...cropSettings,
          frame,
        },
      },
    };
  }

  const parsedClip = parseClip(frame.clipStyle);

  const deltaLeft = parsedClip[3];
  const deltaRight = parsedClip[1];
  const deltaTop = parsedClip[0];
  const deltaBottom = parsedClip[2];

  const deltaTranslateX = frame.translate[0];
  const deltaTranslateY = frame.translate[1];

  const croppedWidth = layerSettings.width - deltaLeft - deltaRight;
  const croppedHeight = layerSettings.height - deltaTop - deltaBottom;

  const newOffsetX = generalSettings.offsetX + deltaLeft + deltaTranslateX;
  const newOffsetY = generalSettings.offsetY + deltaTop + deltaTranslateY;

  return {
    ...layer,
    settings: {
      ...layer.settings,
      layerSettings: {
        ...layerSettings,
        width: croppedWidth,
        height: croppedHeight,
      },
      generalSettings: {
        ...generalSettings,
        offsetX: newOffsetX,
        offsetY: newOffsetY,
      },
      cropSettings: {
        frame,
        originalWidth: layerSettings.width,
        originalHeight: layerSettings.height,
      },
    },
  };
};

export const normalizeLayer = (layer) => {
  const { layerSettings, generalSettings, cropSettings } = layer.settings;
  const { originalWidth, originalHeight } = cropSettings;

  return {
    ...layer,
    settings: {
      ...layer.settings,
      layerSettings: {
        ...layerSettings,
        width: originalWidth,
        height: originalHeight,
      },
      generalSettings: {
        ...generalSettings,
      },
    },
  };
};

export const convertCroppedLayers = (layer) => {
  const parsedCropSettings = layer.settings.cropSettings ;

  if (
    parsedCropSettings?.x !== undefined ||
    parsedCropSettings?.y !== undefined ||
    parsedCropSettings?.unit !== undefined
  ) {
    const currentCropSettings = layer.settings?.cropSettings ;

    let width = currentCropSettings?.original?.width;
    let height = currentCropSettings?.original?.height;
    let offsetX = currentCropSettings?.original?.offsetX;
    let offsetY = currentCropSettings?.original?.offsetY;

    if (width < 0.5) {
      width = 0;
    }

    if (height < 0.5) {
      height = 0;
    }

    if (offsetX < 0.5) {
      offsetX = 0;
    }

    if (offsetY < 0.5) {
      offsetY = 0;
    }

    const verticalClip = height - (currentCropSettings.height / 100) * height;
    let topCrop = (currentCropSettings.y / 100) * height;
    if (topCrop < 0.5) {
      topCrop = 0;
    }

    let bottomCrop = verticalClip - topCrop;

    if (bottomCrop < 0.5) {
      bottomCrop = 0;
    }

    const horizontalClip = width - (currentCropSettings.width / 100) * width;
    let leftCrop = (currentCropSettings.x / 100) * width;
    if (leftCrop < 0.5) {
      leftCrop = 0;
    }

    let rightCrop = horizontalClip - leftCrop;

    if (rightCrop < 0.5) {
      rightCrop = 0;
    }

    const clipStyle = `inset(${topCrop}px ${rightCrop}px ${bottomCrop}px ${leftCrop}px)`;

    layer.settings.cropSettings = {
      originalWidth: width,
      originalHeight: height,
      frame: {
        translate: [0, 0, 0, 0],
        clipStyle,
      },
    };
  }
};
