import { nonThumbnailVideoTypesArray, storyConstants } from '../config/constants';
import { layerTypes } from '../interfaces/layer-types';
import generateId from './generateId';
import { rotateImage, setProportion } from './commonUtils';

const VIDEO_QUEUE = new Set([]);
const VIDEO_CACHE = new Map();

let IS_VIDEO_PROCESSING = false;

// create the array with two columns (for gifs and unsplash media)
export const concatMediaArrays = (oldArr, newArr) => {
  return oldArr
    .slice(0, oldArr.length / 2)
    .concat(newArr.slice(0, newArr.length / 2))
    .concat(oldArr.slice(oldArr.length / 2, oldArr.length))
    .concat(newArr.slice(newArr.length / 2, newArr.length));
};

export const changeMediaSize = (
  width,
  height,
  sizeLimit,
) => {
  if (width >= height && width >= sizeLimit) {
    height = height * (sizeLimit / width);
    width = sizeLimit;
  } else if (height >= width && height > sizeLimit) {
    width = width * (sizeLimit / height);
    height = sizeLimit;
  }
  return { width, height };
};

export const createMediaConfig = (
  width,
  height,
  editorWidth,
  editorHeight,
  currentLayer,
  zoomPercentRatio,
) => {
  const config = {
    width,
    height,
    originalWidth: width,
    originalHeight: height,
    scale: 1,
  };
  if (currentLayer.settings.layerSettings.fullscreen) {
    config.scale = rotateImage(0, editorWidth, editorHeight, false, { width, height });
  } else {
    const data = changeMediaSize(
      width,
      height,
      currentLayer.type === layerTypes.GIFS ? 150 * zoomPercentRatio : 300 * zoomPercentRatio,
    );
    config.width = data.width;
    config.height = data.height;
  }
  return config;
};

export const createMediaSettings = ({
  activeLayer,
  originalWidth,
  originalHeight,
  editorWidth,
  editorHeight,
  zoomPercentRatio,
  coordinates,
}) => {
  const isLayerFullScreen = activeLayer.settings.layerSettings.fullscreen;

  const config = createMediaConfig(
    originalWidth,
    originalHeight,
    +editorWidth,
    +editorHeight,
    activeLayer,
    zoomPercentRatio,
  );

  let mediaConfig;
  if (!isLayerFullScreen && (activeLayer.settings.layerSettings.width || activeLayer.settings.layerSettings.height)) {
    mediaConfig = {
      'settings.layerSettings.originalWidth': config.originalWidth,
      'settings.layerSettings.originalHeight': config.originalHeight,
      'settings.layerSettings.height':
        setProportion(config.width, config.height) * activeLayer.settings.layerSettings.width,
    };
  } else {
    const offsetXWidth = !isLayerFullScreen ? config.width : +editorWidth - Math.round(config.width * config.scale);
    const offsetYHeight = !isLayerFullScreen ? config.height : +editorHeight - Math.round(config.height * config.scale);

    mediaConfig = {
      'settings.generalSettings.offsetX': isLayerFullScreen
        ? offsetXWidth / 2
        : Math.round(+editorWidth / 2) - offsetXWidth / 2,
      'settings.generalSettings.offsetY': isLayerFullScreen
        ? offsetYHeight / 2
        : Math.round(+editorHeight / 2) - offsetYHeight / 2,
      'settings.layerSettings.originalWidth': config.originalWidth,
      'settings.layerSettings.originalHeight': config.originalHeight,
      'settings.layerSettings.width': !isLayerFullScreen
        ? config.width
        : +editorWidth - Math.round(config.width * config.scale),
      'settings.layerSettings.height': !isLayerFullScreen
        ? config.height
        : +editorHeight - Math.round(config.height * config.scale),
    };

    if (coordinates) {
      mediaConfig['settings.generalSettings.offsetX'] = coordinates.x;
      mediaConfig['settings.generalSettings.offsetY'] = coordinates.y;
    }
  }

  if (activeLayer.settings.layerSettings.fullscreen) {
    mediaConfig['settings.layerSettings.fullScreenConfig.height'] =
      setProportion(config.width, config.height) *
        parseFloat(activeLayer.settings.layerSettings.fullScreenConfig.width) +
      'em';
  }

  const proportion = setProportion(
    !isLayerFullScreen ? config.width : +editorWidth - Math.round(config.width * config.scale),
    !isLayerFullScreen ? config.height : +editorHeight - Math.round(config.height * config.scale),
  );

  return {
    mediaConfig,
    proportion,
  };
};

export const extractImageDimensions = (url) =>
  new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const { width, height } = image;
      resolve({
        width,
        height,
      });
    };
    image.src = url;
  });

export const extractVideoDimensions = async (url) => {
  const cache = VIDEO_CACHE.get(url);

  if (cache) {
    return cache;
  }

  if (IS_VIDEO_PROCESSING) {
    VIDEO_QUEUE.add(url);
    await new Promise((res) => setTimeout(res, 100));
    return extractVideoDimensions(url);
  }

  return new Promise((resolve) => {
    const video = document.getElementById('videoId');
    const canvas = document.getElementById('canvasId');

    IS_VIDEO_PROCESSING = true;

    video.onloadeddata = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      resolve({
        width: video.videoWidth,
        height: video.videoHeight,
      });
      video.onloadeddata = null;
      IS_VIDEO_PROCESSING = false;
      VIDEO_QUEUE.delete(url);
      VIDEO_CACHE.set(url, {
        width: video.videoWidth,
        height: video.videoHeight,
      });
    };
    video.src = url;
  });
};

export const checkFileTypeAccepted = (fileTypesArray, fileType) => {
  return fileTypesArray.some((type) => fileType.indexOf(type) >= 0);
};

export const getVideoCover = (file, seekTo = 0.0) => {
  return new Promise((resolve, reject) => {
    if (checkFileTypeAccepted(nonThumbnailVideoTypesArray, file.type)) {
      return reject(new Error(`Can't create thumbnail!`));
    }

    const videoPlayer = document.createElement('video');
    videoPlayer.setAttribute('src', URL.createObjectURL(file));
    videoPlayer.setAttribute('id', 'temp-video');
    videoPlayer.muted = true;
    videoPlayer.load();

    videoPlayer.addEventListener('loadedmetadata', () => {
      setTimeout(() => {
        videoPlayer.currentTime = seekTo;
      }, 100);
      videoPlayer.addEventListener('seeked', () => {
        const canvas = document.createElement('canvas');
        canvas.width = videoPlayer.videoWidth;
        canvas.height = videoPlayer.videoHeight;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);

        document.getElementById('temp-video')?.remove();

        ctx?.canvas.toBlob(
          (blob) => {
            resolve(URL.createObjectURL(blob));
          },
          'image/jpeg',
          0.75,
        );
      });
    });
  });
};

export const getTemporaryVideoUrls = async (file) => {
  const id = generateId();
  const url = URL.createObjectURL(file);
  let thumbnail = null;

  try {
    thumbnail = await getVideoCover(file);
  } catch (e) {
    console.error(e);
    thumbnail = `${process.env.PUBLIC_URL}/assets/images/video-default-thumbnail.png`;
  }

  return {
    id,
    url,
    mimeType: file.type,
    thumbnail: { url: thumbnail },
    originalName: file.name,
  };
};

export const getPendingMediaContent = (type, originalMedia) => {
  const content = {};
  const contentImage = type === layerTypes.VIDEO ? originalMedia?.thumbnail : originalMedia;

  content.value = originalMedia?.url;
  content.image = {
    id: contentImage?.id,
    url: contentImage?.url || '',
    name: contentImage?.name || '',
  };

  if (type === layerTypes.VIDEO) {
    content.video = {
      id: originalMedia?.id,
      url: originalMedia?.url,
      name: originalMedia?.name,
    };
  }

  return {
    type,
    content,
    temporaryId: originalMedia.temporaryId,
  };
};

const calculateReplaceMediaCropSettings = (
  type,
  layer,
  mediaSize,
  editorSize,
) => {
  const { height: lHeight, width: lWidth } = layer?.settings?.layerSettings;
  const { offsetX, offsetY } = layer?.settings?.generalSettings;
  const mediaRatio = mediaSize.width / mediaSize.height;
  const { width: initialWidth, height: initialHeight } = editorSize;

  let layerWidth = lWidth;
  let layerHeight = lHeight;
  let newOffsetX = offsetX;
  let newOffsetY = offsetY;

  if (layer.settings.layerSettings.fullscreen) {
    newOffsetX = parseFloat(layer.settings.layerSettings.fullScreenConfig.left) * +initialWidth;
    newOffsetY = parseFloat(layer.settings.layerSettings.fullScreenConfig.top) * +initialHeight;
    layerHeight = layer.settings.layerSettings.fullScreenConfig.height;
    layerWidth = layer.settings.layerSettings.fullScreenConfig.width;
  }

  const heightDifference = mediaSize.height - layerHeight;
  const widthDifference = mediaSize.width - layerWidth;

  if (type === 'width') {
    const newHeight = layerWidth / mediaRatio;
    const newHeightDifference = newHeight - layerHeight;
    const clipStyle = `inset(${newHeightDifference / 2}px ${widthDifference / 2}px ${newHeightDifference / 2}px ${
      widthDifference / 2
    }px)`;

    return {
      frame: {
        translate: [0, 0, 0, 0],
        clipStyle,
      },
      originalWidth: layerWidth,
      originalHeight: newHeight,
    };
  }

  const newWidth = layerHeight * mediaRatio;
  const newWidthDifference = newWidth - layerWidth;
  const clipStyle = `inset(${heightDifference / 2}px ${newWidthDifference / 2}px ${heightDifference / 2}px ${
    newWidthDifference / 2
  }px)`;

  return {
    frame: {
      translate: [0, 0, 0, 0],
      clipStyle,
    },
    originalWidth: newWidth,
    originalHeight: layerHeight,
  };
};

const calculateMediaReplacementSize = (type, layerSize, mediaSize) => {
  const { width: lWidth, height: lHeight } = layerSize;
  const { width: mWidth, height: mHeight } = mediaSize;
  const mediaRatio = mWidth / mHeight;

  if (type === 'width') {
    return {
      width: lWidth,
      height: lWidth / mediaRatio,
    };
  }

  return {
    width: lHeight * mediaRatio,
    height: lHeight,
  };
};

export const generateReplaceMediaDimensions = (
  layer,
  mediaSize,
  editorSize,
) => {
  const { width: lWidth, height: lHeight } = layer?.settings?.layerSettings;
  const { width: mWidth, height: mHeight } = mediaSize;
  const { width: initialWidth, height: initialHeight } = editorSize;

  let layerWidth = lWidth;
  let layerHeight = lHeight;

  if (layer.settings.layerSettings.fullscreen) {
    layerWidth = layer.settings.layerSettings.fullScreenConfig.width;
    layerHeight = layer.settings.layerSettings.fullScreenConfig.height;
  }

  let newMediaSize = calculateMediaReplacementSize(
    'width',
    { width: layerWidth, height: layerHeight },
    { width: mWidth, height: mHeight },
  );
  let cropSettings = calculateReplaceMediaCropSettings(
    'width',
    layer,
    {
      width: newMediaSize.width,
      height: newMediaSize.height,
    },
    { width: initialWidth, height: initialHeight },
  );

  if (newMediaSize.height < layerHeight) {
    newMediaSize = calculateMediaReplacementSize(
      'height',
      { width: layerWidth, height: layerHeight },
      { width: mWidth, height: mHeight },
    );
    cropSettings = calculateReplaceMediaCropSettings(
      'height',
      layer,
      {
        width: newMediaSize.width,
        height: newMediaSize.height,
      },
      { width: initialWidth, height: initialHeight },
    );
  }

  return {
    width: newMediaSize.width,
    height: newMediaSize.height,
    ...(cropSettings && { cropSettings }),
  };
};

export const onGetVideoDuration = ({ mediaUrl, shouldLimitDuration = false, callback }) => {
  let video = null;

  video = document.createElement('video');
  video.src = mediaUrl;
  video.preload = 'metadata';

  video.ondurationchange = () => {
    let duration = video?.duration;

    if (shouldLimitDuration) {
      duration = limitDuration(duration);
    }

    callback(duration);
    video?.remove();
  };
};

export const limitDuration = (duration) => {
  if (typeof duration !== 'number') {
    return storyConstants.slideMinDuration;
  }
  if (duration > storyConstants.slideMaxDuration) {
    duration = storyConstants.slideMaxDuration;
  } else if (duration < storyConstants.slideMinDuration) {
    duration = storyConstants.slideMinDuration;
  } else {
    duration = Math.round(duration);
  }

  return duration;
};
