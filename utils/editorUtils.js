import { EditorState } from 'draft-js';
import set from 'lodash/set';
import { css } from 'styled-components';
import { v4 } from 'uuid';
import styledAnimations from '../components/story-editor/layer/components/styled-animations';
import {
  ctaDimensions,
  DEFAULT_EDITOR_FRAME_SIZE,
  headerHeight,
  outlinkDimensions,
  PENDING_MEDIA_QUEUE,
  REDUX_UNDO_ACTION_TYPES,
  storyConstants,
  storyProportion,
  ZOOM_PERCENTAGES,
  ZOOM_TYPE
} from '../config/constants';
import { environment } from '../config/environment';
import { IColorType } from '../interfaces/colors';
import { layerTypes } from '../interfaces/layer-types';
import { defaultGradientColor } from './builders';
import { getObjectDiff } from './common';
import { calculateSinCos, cloneObj, rotateRect } from './commonUtils';
import { convertCroppedLayers, parseClip } from './croppingUtils';
import { createMediaSettings } from './mediaUtils';
import { isHexColor, rgbaToHex } from './parseColors';
import {
  getActiveFontFamily,
  getActiveFontSize,
  getActiveFontSpacing,
  getAllFontFamilies,
  prepareTextLayer
} from './textEditorUtils';

export const measureText = async (txt, font) => {
  const parsedDocument = document ;

  let retries = 0;
  let isFontLoaded = parsedDocument.fonts.check(font);

  while (!isFontLoaded && retries < 5) {
    await new Promise((res) => setTimeout(res, 250));
    isFontLoaded = parsedDocument.fonts.check(font);
    retries += 1;
  }

  const element = document.createElement('canvas');
  const context = element.getContext('2d');

  if (context) {
    context.font = font;
    return context.measureText(txt);
  }

  return null;
};

export const createSlideName = (list) => {
  if (!list.length) {
    return 'New Slide';
  } else {
    const slides = [];
    list.find((element) => {
      if (element?.title?.match(/New Slide \d*$/) !== null || element?.title === 'New Slide') {
        if (element?.title?.[element?.title.length - 1] === 'e') {
          slides.push(0);
        } else if (element.title) {
          slides.push(element?.title?.split(' ')?.[2]);
        }
      }
    });
    slides.sort((a, b) => +a - +b);
    if (slides[0] !== 0) {
      return 'New Slide';
    }
    let name = '';
    for (let i = 0; i < slides.length; i++) {
      if (parseInt(slides[i], 10) === i) {
        name = 'New Slide ' + (i + 1);
      }
    }
    return name;
  }
};

export const checkCutDuration = (cuts) => {
  return !!cuts.find((cut) => !cut.duration || cut.duration > 15 || cut.duration < 4);
};

export const checkLayersLimit = (layers) =>
  // TODO Double check logic
  (layers?.[0]?.position ?? 0) + 1 < storyConstants.layersLimit;

export const setIndexes = (data) => {
  for (let i = 0; i < data.length; i++) {
    data[i].position = i;
  }
};

export const getDuplicateName = (arr, name) => {
  const copyReg = /\(copy(\s\d*)?\)$/;
  let copyCountArr = [];
  let counter;
  // if name contains (copy N) or (copy) in the end - slice it to compare with name in list
  if (copyReg.test(name)) {
    name = name.slice(0, name.lastIndexOf('(copy') - 1);
  }
  // loop through list, if find title (also slice to compare) with same name - push it copy number
  for (let i = 0; i < arr.length; i++) {
    if (copyReg.test(arr[i].title)) {
      const copyName = arr[i].title.slice(0, arr[i].title.lastIndexOf('(copy') - 1);
      if (copyName === name) {
        // return array like ["(copy 2)", " 2" ...] or ["(copy)", undefined ...]
        const copyValue = copyReg.exec(arr[i].title);
        copyCountArr.push(copyValue[1] ? +copyValue[1].trim() : 1);
      }
    }
  }
  // sort, filter duplicate and find if some number of copy is missed
  copyCountArr = copyCountArr
    .sort((a, b) => a - b)
    .filter((el, index) => copyCountArr.indexOf(el) === index);
  for (let i = 0; i < copyCountArr.length; i++) {
    if (copyCountArr[i] !== i + 1) {
      counter = i + 1;
      break;
    }
  }
  // if find copy and if no counter, none of numbers was missed in copy, use copyCountArr.length
  // if counter === 1, delete it number
  if (!counter && copyCountArr.length > 0) {
    counter = copyCountArr.length + 1;
  } else if (counter === 1) {
    counter = null;
  }
  return `${name} (copy${counter ? ' ' + counter : ''})`;
};

export const getMaxId = (list) => {
  let max = -1;
  for (let i = 0; i < list.length; i++) {
    if (list[i].position > max) {
      max = list[i].position;
    }
  }
  return max;
};

export const checkVideoCtaCutsLimited = (activeSlide) => {
  const videoCutLimited = checkSlideLayerLimit(activeSlide, layerTypes.VIDEO);
  const ctaCutLimited = checkSlideLayerLimit(activeSlide, layerTypes.CTA_LINK);
  const outlinkLimited = checkSlideLayerLimit(activeSlide, layerTypes.OUTLINK);

  return {
    videoCutLimited,
    ctaCutLimited: outlinkLimited || ctaCutLimited,
  };
};

export const checkSlideLayerLimit = (cut, type) =>
  cut && cut.layers ? !!cut.layers.find((layer) => layer.type === type) : false;

export const hasLayers = (list) => !list?.some((cut) => cut.layers && cut.layers.length > 0);

export const scaleEditorConfig = (cuts, scaleValue, updatePosition) => {
  for (let i = 0; i < cuts.length; i++) {
    cuts[i].layers.forEach((layer) => {
      if (updatePosition) {
        layer.settings.generalSettings.offsetX = layer.settings.generalSettings.offsetX * scaleValue;
        layer.settings.generalSettings.offsetY = layer.settings.generalSettings.offsetY * scaleValue;
      }
      layer.settings.layerSettings.width = layer.settings.layerSettings.width * scaleValue;
      layer.settings.layerSettings.height = layer.settings.layerSettings.height * scaleValue;
    });
  }
  return cuts;
};

export const checkGoogleFonts = (storyFonts, allFonts) =>
  storyFonts
    .map((storyFont) => allFonts.find((font) => font && storyFont && font.family === storyFont.family))
    .filter((font) => font);

export const setCutBgColor = (list) =>
  list.map((slide) => {
    if (!slide.backgroundColor) {
      return {
        ...slide,
        backgroundColor: defaultGradientColor(IColorType.BgColor),
      };
    }
    return slide;
  });

/**
 * Everything is inverted - do not touch
 */
export const calculateNewActiveLayer = (
  sourceSlide,
  destinationSlide = 0,
  activeSlide = 0,
  endPosition,
) => {
  activeSlide = endPosition - activeSlide;

  // if dragged slide is the same as active slide, dragged slides' new position will be active
  if (sourceSlide === activeSlide) {
    return endPosition - destinationSlide;
  }

  const isGoingDownwards = sourceSlide > activeSlide && activeSlide >= destinationSlide;
  const isGoingUpwards = sourceSlide < activeSlide && activeSlide <= destinationSlide;

  //If the dragged slide is going downards changing active slides' position we subtract from it
  if (isGoingDownwards) {
    return endPosition - activeSlide - 1;
  }

  //If the dragged slide is going downards changing active slides' position we add to it
  if (isGoingUpwards) {
    return endPosition - activeSlide + 1;
  }

  //If other slides than the active slide are reordered we keep the active slide
  return endPosition - activeSlide;
};

export const getFitEditorHeight = () => {
  const bodyDimensions = document.body.getBoundingClientRect();
  let editorHeight = bodyDimensions.height - headerHeight - 24 * 2 - 26 - 24 - 154;
  if (editorHeight < 200) {
    editorHeight = 200;
  }

  if (editorHeight > 1120) {
    editorHeight = 1120;
  }

  return editorHeight;
};

export const changeEditorSize = (scalePercent) => {
  let editorHeight = getFitEditorHeight();

  if (scalePercent) {
    editorHeight = DEFAULT_EDITOR_FRAME_SIZE.HEIGHT * (scalePercent / 100);
  }

  const editorWidth = editorHeight / storyProportion;

  return {
    editorHeight,
    editorWidth,
  };
};

export const getIframeDeviceSize = (
  deviceSize = { width: 0, height: 0 },
) => {
  const editorHeight = getComputedStyle(document.documentElement).getPropertyValue('--editor-height');
  const editorPadding = getComputedStyle(document.documentElement).getPropertyValue('--editor-wrapper-padding');
  const editorAvailableHeightNumber = parseFloat(editorHeight) - parseFloat(editorPadding) * 2;
  let newDeviceHeight = deviceSize?.height;
  let newDeviceWidth = deviceSize?.width;
  const ratio = editorAvailableHeightNumber / deviceSize.height;

  if (editorAvailableHeightNumber < deviceSize?.height) {
    //const ratio = editorAvailableHeightNumber / deviceSize.height;
    newDeviceHeight *= ratio;
    newDeviceWidth *= ratio;
  }

  if (deviceSize?.height === 0 && deviceSize?.width === 0) {
    newDeviceHeight = editorAvailableHeightNumber - 94;
    newDeviceWidth = newDeviceHeight / storyProportion;
  }

  return {
    width: newDeviceWidth,
    height: newDeviceHeight,
  };
};

export const rescaleLayer = (layer, scaleValue) => {
  if (layer.settings.layerSettings.fullScreenConfig) {
    layer.settings.layerSettings.fullScreenConfig.width =
      layer.settings.layerSettings.fullScreenConfig.width * scaleValue;
    layer.settings.layerSettings.fullScreenConfig.height =
      layer.settings.layerSettings.fullScreenConfig.height * scaleValue;
  }

  layer.settings.generalSettings.offsetX = Number(layer.settings.generalSettings.offsetX) * scaleValue;
  layer.settings.generalSettings.offsetY = Number(layer.settings.generalSettings.offsetY) * scaleValue;

  layer.settings.layerSettings.width = layer.settings.layerSettings.width * scaleValue;
  layer.settings.layerSettings.height = layer.settings.layerSettings.height * scaleValue;

  if (layer.settings?.cropSettings) {
    const parsedClip = parseClip(layer.settings.cropSettings.frame.clipStyle);
    const mappedClip = parsedClip.map((elm) => `${elm * scaleValue}px`);

    layer.settings.cropSettings.originalWidth = Number(layer.settings.cropSettings.originalWidth) * scaleValue;
    layer.settings.cropSettings.originalHeight = Number(layer.settings.cropSettings.originalHeight) * scaleValue;

    layer.settings.cropSettings.frame.clipStyle = `inset(${mappedClip.join(' ')})`;
  }
};

export const rescaleThickness = (layer, scaleValue) => {
  layer.settings.layerSettings.shapeStyles.relativeThickness =
    layer.settings.layerSettings.shapeStyles.thickness * scaleValue;
};

export const getAnimationTiming = ({ animateIn }) => {
  switch (animateIn) {
    case 'fly-in-left':
    case 'fly-in-right':
    case 'fly-in-top':
    case 'fly-in-bottom':
    case 'fly-out-left':
    case 'fly-out-right':
    case 'fly-out-top':
    case 'fly-out-bottom':
      return 'cubic-bezier(0.2, 0.6, 0, 1)';
    case 'pulse':
      return 'cubic-bezier(0.3, 0, 0, 1)';
    case 'rotate-in-left':
    case 'rotate-in-right':
    case 'rotate-out-left':
    case 'rotate-out-right':
    case 'fade-in':
    case 'fade-out':
    case 'twirl-in':
    case 'twirl-out':
    case 'whoosh-in-left':
    case 'whoosh-in-right':
    case 'whoosh-out-left':
    case 'whoosh-out-right':
      return 'cubic-bezier(0.4, 0.4, 0.0, 1)';
    case 'drop':
    case 'pan-top':
    case 'pan-left':
    case 'pan-right':
    case 'pan-bottom':
    case 'zoom-in':
    case 'zoom-out':
      return 'linear';
    default:
      return `ease`;
  }
};

export const getAnimation = ({
  animateIn,
  width,
  height,
  rotate,
  offsetX,
  offsetY,
  thickness,
  containerWidth,
  containerHeight,
  isFullscreen,
  isGroupLayer,
}) => {
  const rotatedRect = rotateRect(rotate, offsetX, offsetY, width, height, thickness);
  const rotatedOffsetX = Math.min(rotatedRect[0][0], rotatedRect[1][0], rotatedRect[2][0], rotatedRect[3][0]);
  const rotatedOffsetY = Math.min(rotatedRect[0][1], rotatedRect[1][1], rotatedRect[2][1], rotatedRect[3][1]);
  const { sin, cos } = calculateSinCos(rotate);

  switch (animateIn) {
    case 'drop':
    case 'pan-top':
    case 'pan-left':
    case 'pan-right':
    case 'pan-bottom':
    case 'fly-in-top':
    case 'fly-in-left':
    case 'fly-in-right':
    case 'fly-in-bottom':
    case 'fly-out-top':
    case 'fly-out-left':
    case 'fly-out-right':
    case 'fly-out-bottom':
    case 'whoosh-in-left':
    case 'whoosh-in-right':
    case 'whoosh-out-left':
    case 'whoosh-out-right':
    case 'rotate-in-left':
    case 'rotate-in-right':
    case 'rotate-out-left':
    case 'rotate-out-right':
      return styledAnimations[animateIn]({
        sin,
        cos,
        width,
        height,
        rotate,
        offsetX: rotatedOffsetX,
        offsetY: rotatedOffsetY,
        containerWidth,
        containerHeight,
        isGroupLayer,
      });
    case 'zoom-in':
    case 'zoom-out':
      return styledAnimations[animateIn]({
        isFullscreen,
      });
    default:
      return styledAnimations[animateIn];
  }
};

export const getAnimationInitialState = (animateIn) => {
  switch (animateIn) {
    case 'drop':
    case 'fade-in':
    case 'zoom-in':
    case 'twirl-in':
    case 'fly-in-top':
    case 'fly-in-left':
    case 'fly-in-right':
    case 'fly-in-bottom':
    case 'whoosh-in-left':
    case 'rotate-in-left':
    case 'rotate-in-right':
    case 'whoosh-in-right':
      return css`
        opacity: 0;
      `;
    case 'zoom-out':
      return css`
        transform: scale(2.5, 2.5);
      `;
    case 'pan-top': {
      return css`
        transform: translateY(-12.5%) scale(1.25);
      `;
    }
    case 'pan-bottom': {
      return css`
        transform: translateY(12.5%) scale(1.25);
      `;
    }
    default:
      return css``;
  }
};

export const getAllZoomPercentages = (fitPercent) => {
  return [...ZOOM_PERCENTAGES, fitPercent]
    .sort((currentNumber, nextNumber) => currentNumber - nextNumber)
    .filter((value, index, self) => self.indexOf(value) === index);
};

export const getNewZoomPercentage = (type, currentPercent, allZoomPercentages) => {
  const currentZoomPercentIndex = allZoomPercentages.findIndex((percent) => currentPercent === percent);

  if (type === ZOOM_TYPE.OUT) {
    return currentZoomPercentIndex >= 1 ? allZoomPercentages[currentZoomPercentIndex - 1] : allZoomPercentages[0];
  }

  return currentZoomPercentIndex < allZoomPercentages.length - 1
    ? allZoomPercentages[currentZoomPercentIndex + 1]
    : allZoomPercentages[allZoomPercentages.length - 1];
};

export const setDataToNewLayer = async ({
  layer,
  type,
  zoomPercent,
  clientWidth,
  clientHeight,
  shape,
  media,
  colorObject,
  value,
  coordinates,
}) => {
  const zoomPercentRatio = zoomPercent / 100;
  switch (type) {
    case layerTypes.CTA_LINK: {
      const newCtaDimensions = {
        height: ctaDimensions.height * zoomPercentRatio,
        width: ctaDimensions.width * zoomPercentRatio,
      };

      // CTA wrapper height is 10%
      layer.content.value = 'www.example.com';
      layer.settings.layerSettings.shapeStyles.fillColor.leftColor = 'rgba(255, 255, 255, 1)';
      layer.settings.layerSettings.shapeStyles.round = '0';
      if (layer.settings.ctaLayerSettings) {
        layer.settings.ctaLayerSettings.fontColor = 'rgba(246, 82, 43, 1)';
      }

      layer.settings.generalSettings.initialOffsetY = clientHeight - newCtaDimensions.height * 1.6;
      layer.settings.generalSettings.initialOffsetX = clientWidth / 2 - newCtaDimensions.width / 2;
      layer.settings.generalSettings.offsetY = clientHeight - newCtaDimensions.height * 1.6;
      layer.settings.generalSettings.offsetX = clientWidth / 2 - newCtaDimensions.width / 2;
      layer.settings.layerSettings.width = newCtaDimensions.width;
      layer.settings.layerSettings.height = newCtaDimensions.height;
      break;
    }
    case layerTypes.OUTLINK: {
      const newOutlinkDimensions = {
        height: outlinkDimensions.height * zoomPercentRatio,
        width: outlinkDimensions.width * zoomPercentRatio,
      };

      // CTA wrapper height is 10%
      layer.content.value = 'www.example.com';
      layer.settings.layerSettings.shapeStyles.fillColor.leftColor = 'rgba(255, 255, 255, 1)';
      layer.settings.layerSettings.shapeStyles.round = '30';
      if (layer.settings.ctaLayerSettings) {
        layer.settings.ctaLayerSettings.fontColor = 'rgba(0, 0, 0, 1)';
      }

      layer.settings.generalSettings.initialOffsetY = clientHeight - newOutlinkDimensions.height * 1.6;
      layer.settings.generalSettings.initialOffsetX = clientWidth / 2 - newOutlinkDimensions.width / 2;
      layer.settings.generalSettings.offsetY = clientHeight - newOutlinkDimensions.height * 1.6;
      layer.settings.generalSettings.offsetX = clientWidth / 2 - newOutlinkDimensions.width / 2;
      layer.settings.layerSettings.width = newOutlinkDimensions.width;
      layer.settings.layerSettings.height = newOutlinkDimensions.height;
      break;
    }
    case layerTypes.HTML: {
      const editorState = layer.settings.editorState;
      if (editorState) {
        layer.settings.editorState = EditorState.moveFocusToEnd(editorState);
        const fontSize = getActiveFontSize(layer.settings.editorState);
        const fontFamily = getActiveFontFamily(layer.settings.editorState);
        const lineHeight = getActiveFontSpacing(layer.settings.editorState);

        const sizeConst = ((fontSize / 16) * (2.6 * Number(clientWidth))) / 100;

        const singleLineHeight = sizeConst * +lineHeight;
        const maxHeight = singleLineHeight * 2;

        const textMeasurement = await measureText(
          layer.settings.editorState?.getCurrentContent()?.getPlainText() ?? 'Type something',
          `${sizeConst}px ${fontFamily}`,
        );

        // Add some buffer
        let width = Math.round((textMeasurement?.width ?? 220) * (zoomPercentRatio < 0.75 ? 0.75 : zoomPercentRatio));
        let height = Math.round(singleLineHeight);

        while (width > clientWidth && height < maxHeight) {
          width = Math.round(width * (0.75 / zoomPercentRatio));
          height = Math.round(singleLineHeight + height);
        }

        layer.settings.generalSettings.offsetY = Number(clientHeight) / 2 - height / 2;
        layer.settings.generalSettings.offsetX = Number(clientWidth) / 2 - width / 2;
        layer.settings.layerSettings.width = width;
        layer.settings.layerSettings.height = height;
        layer.settings.layerSettings.locked = true;

        if (coordinates) {
          layer.settings.generalSettings.offsetX = coordinates.x;
          layer.settings.generalSettings.offsetY = coordinates.y;
        }

        break;
      }

      const width = clientWidth > 220 * zoomPercentRatio ? 210 * zoomPercentRatio : Number(clientWidth) - 20;
      const height = clientWidth > 220 * zoomPercentRatio ? 31 * zoomPercentRatio : 22;

      layer.settings.generalSettings.offsetY = Number(clientHeight) / 2 - height / 2;
      layer.settings.generalSettings.offsetX = Number(clientWidth) / 2 - width / 2;
      layer.settings.layerSettings.width = width;
      layer.settings.layerSettings.height = height;
      layer.settings.layerSettings.locked = true;

      if (coordinates) {
        layer.settings.generalSettings.offsetX = coordinates.x;
        layer.settings.generalSettings.offsetY = coordinates.y;
      }

      break;
    }
    case layerTypes.SHAPE: {
      if (shape) {
        layer.content.value = shape;
        layer.content.shape = shape;
      }
      layer.settings.layerSettings.width = 100 * zoomPercentRatio;
      layer.settings.layerSettings.height = 100 * zoomPercentRatio;
      layer.settings.generalSettings.initialOffsetX =
        Math.round(Number(clientWidth) / 2) - (100 * zoomPercentRatio) / 2;
      layer.settings.generalSettings.initialOffsetY =
        Math.round(Number(clientHeight) / 2) - (100 * zoomPercentRatio) / 2;

      if (coordinates) {
        layer.settings.generalSettings.offsetX = coordinates.x;
        layer.settings.generalSettings.offsetY = coordinates.y;
      } else {
        layer.settings.generalSettings.offsetX = Math.round(Number(clientWidth) / 2) - (100 * zoomPercentRatio) / 2;
        layer.settings.generalSettings.offsetY = Math.round(Number(clientHeight) / 2) - (100 * zoomPercentRatio) / 2;
      }
      break;
    }
    case layerTypes.GRADIENTS: {
      if (value && colorObject && shape) {
        layer.content.value = value;
        layer.content.shape = 'gradient';
        layer.content.gradient = {
          name: value.slice(value.lastIndexOf('/') + 1),
          url: value,
          input: shape,
          colors: colorObject,
        };
      }

      layer.settings.layerSettings.width = 100 * zoomPercentRatio;
      layer.settings.layerSettings.height = 100 * zoomPercentRatio;
      layer.settings.generalSettings.initialOffsetX =
        Math.round(Number(clientWidth) / 2) - (100 * zoomPercentRatio) / 2;
      layer.settings.generalSettings.initialOffsetY =
        Math.round(Number(clientHeight) / 2) - (100 * zoomPercentRatio) / 2;

      if (coordinates) {
        layer.settings.generalSettings.offsetX = coordinates.x;
        layer.settings.generalSettings.offsetY = coordinates.y;
      } else {
        layer.settings.generalSettings.offsetX = Math.round(Number(clientWidth) / 2) - (100 * zoomPercentRatio) / 2;
        layer.settings.generalSettings.offsetY = Math.round(Number(clientHeight) / 2) - (100 * zoomPercentRatio) / 2;
      }

      break;
    }
    case layerTypes.VIDEO:
    case layerTypes.IMAGE:
    case layerTypes.GIFS:
    case layerTypes.STICKERS: {
      const isVideo = type === layerTypes.VIDEO;
      const originalWidth = +media.width;
      const originalHeight = +media.height;

      const { mediaConfig } = createMediaSettings({
        originalWidth,
        originalHeight,
        zoomPercentRatio,
        activeLayer: layer,
        editorWidth: clientWidth,
        editorHeight: clientHeight,
        coordinates,
      });
      mediaConfig['content.value'] = media.url;
      mediaConfig['content.image.id'] = isVideo ? media?.thumbnail?.id : media.id;
      mediaConfig['content.image.url'] = isVideo ? media?.thumbnail?.url : media.url;
      mediaConfig['content.image.name'] = isVideo ? media?.thumbnail?.name : media.name;
      if (media.originalName) {
        mediaConfig['content.originalName'] = media.originalName;
      }
      if (isVideo) {
        mediaConfig['content.video.id'] = media.id;
        mediaConfig['content.video.url'] = media.url;
        mediaConfig['content.video.name'] = media.name;

        mediaConfig['settings.layerSettings.mute'] = false;
      }

      Object.keys(mediaConfig).map((key) => {
        set(layer, key, mediaConfig[key]);
      });
      break;
    }
  }

  return layer;
};

export const isMediaLayer = (type) =>
  type === layerTypes.VIDEO || type === layerTypes.GIFS || type === layerTypes.STICKERS || type === layerTypes.IMAGE;

export const getIsEditorStateChangeEssential = (editorStateDiff) => {
  return !(
    (editorStateDiff.length < 4 &&
      editorStateDiff.includes('allowUndo') &&
      editorStateDiff.includes('forceSelection') &&
      editorStateDiff.includes('selection')) ||
    (editorStateDiff.length < 4 &&
      editorStateDiff.includes('selection') &&
      editorStateDiff.includes('nativelyRenderedContent') &&
      editorStateDiff.includes('forceSelection')) ||
    (editorStateDiff.length < 3 && editorStateDiff.includes('allowUndo') && editorStateDiff.includes('undoStack')) ||
    (editorStateDiff.length < 3 &&
      editorStateDiff.includes('nativelyRenderedContent') &&
      editorStateDiff.includes('forceSelection')) ||
    (editorStateDiff.length < 3 &&
      editorStateDiff.includes('selection') &&
      editorStateDiff.includes('forceSelection')) ||
    (editorStateDiff.length < 3 &&
      editorStateDiff.includes('selection') &&
      editorStateDiff.includes('nativelyRenderedContent')) ||
    (editorStateDiff.length === 1 && editorStateDiff.includes('forceSelection')) ||
    (editorStateDiff.length === 1 && editorStateDiff.includes('selection')) ||
    (editorStateDiff.length === 1 && editorStateDiff.includes('nativelyRenderedContent'))
  );
};

export const getAmpStoryWithReplacedMedia = (ampStory, pendingMediaQueue) => {
  const storyId = ampStory._id;
  let cuts = [];
  const localAmpStory = { ...ampStory };

  if (Object.keys(pendingMediaQueue).length > 0) {
    cuts = localAmpStory.cuts.map((cut) => {
      const layers = cut.layers.map((layer) => {
        let activeLayer = { ...layer };
        const pendingMedia = pendingMediaQueue?.[storyId]?.[activeLayer.temporaryId];

        if (isMediaLayer(activeLayer.type) && pendingMedia) {
          activeLayer = {
            ...activeLayer,
            content: {
              ...activeLayer.content,
              ...pendingMedia.content,
            },
          };
        }

        return activeLayer;
      });
      return { ...cut, layers };
    });

    set(localAmpStory, 'cuts', cuts);
  }

  return localAmpStory;
};

// Remove unused fonts
export const removeFontsFromAmp = (ampStory) => {
  const layerFontFamilies = getAllFontFamilies(ampStory.cuts);

  ampStory.googleFonts = ampStory?.googleFonts?.filter(
    (gFont, index, array) =>
      layerFontFamilies?.has(gFont?.family) &&
      array?.findIndex((arrayElement) => arrayElement?.family === gFont?.family) === index,
  );

  ampStory.fonts = ampStory?.fonts?.filter(
    (cFont, index, array) =>
      layerFontFamilies?.has(cFont.family) &&
      array?.findIndex((arrayElement) => arrayElement?.family === cFont?.family) === index,
  );

  return ampStory;
};

export const getAllPendingMediaIdsForSlide = (
  storyId,
  slide,
  pendingMediaQueue,
) => {
  return slide.layers
    .map((layer) => {
      if (layer?.temporaryId && Object.keys(pendingMediaQueue).length > 0) {
        return pendingMediaQueue[storyId]?.[layer?.temporaryId] ? layer?.temporaryId : null;
      }

      return null;
    })
    .filter(Boolean);
};

export const getAllPendingMediaIdsWithoutLayerForStory = (storyId, slides) => {
  const pendingMediaQueueFromLocalStorage = localStorage.getItem(PENDING_MEDIA_QUEUE);
  const pendingMediaQueue = pendingMediaQueueFromLocalStorage ? JSON.parse(pendingMediaQueueFromLocalStorage) : {};
  const { [storyId]: storyMedia, ...restMedia } = pendingMediaQueue;
  const mediaIds = [];

  slides.forEach((slide) => {
    (slide.layers).forEach((layer) => {
      const mediaId = storyMedia && layer?.temporaryId ? storyMedia[layer?.temporaryId] : null;
      if (mediaId) {
        mediaIds.push(mediaId);
      }
    });
  });

  return mediaIds;
};

export const getAmpStoryData = (
  ampStoryList,
  type,
  ampStory,
  counter = 1,
) => {
  const historyAmpStory =
    ampStoryList[type === REDUX_UNDO_ACTION_TYPES.UNDO ? ampStoryList.length - counter : counter - 1];
  const historyActiveSlidePosition = historyAmpStory?.activeSlidePosition;
  const historyActiveLayerPosition = historyAmpStory?.activeLayerPosition;
  const activeSlidePosition = ampStory?.activeSlidePosition;
  const activeLayerPosition = ampStory?.activeLayerPosition;
  let historyActiveLayer = null;
  let activeLayer = null;

  if (typeof historyActiveSlidePosition === 'number' && typeof historyActiveLayerPosition === 'number') {
    historyActiveLayer = historyAmpStory?.cuts[historyActiveSlidePosition]?.layers?.[historyActiveLayerPosition];
  }
  if (typeof activeSlidePosition === 'number' && typeof activeLayerPosition === 'number') {
    activeLayer = ampStory?.cuts[activeSlidePosition]?.layers?.[activeLayerPosition];
  }

  const historyEditorState = historyActiveLayer?.settings?.editorState?.toJS();
  const editorState = activeLayer?.settings?.editorState?.toJS();
  const editorStateDiff = getObjectDiff(
    type === REDUX_UNDO_ACTION_TYPES.UNDO ? editorState : historyEditorState,
    type === REDUX_UNDO_ACTION_TYPES.UNDO ? historyEditorState : editorState,
  );

  const editorStateShouldJump = !getIsEditorStateChangeEssential(editorStateDiff) && ampStoryList.length > 1;

  if (editorStateShouldJump) {
    return getAmpStoryData(ampStoryList, type, ampStory, counter + 1);
  }

  return {
    jumps: editorStateShouldJump ? counter++ : counter,
    shouldJump: editorStateShouldJump,
  };
};

export const rescaleTemplate = (
  ampStory,
  activeSlidePosition,
  scaleValue,
  zoomPercent,
  scaleIndexes,
) => {
  const cuts = ampStory?.cuts;
  // Rescale all cuts
  cuts?.forEach((cut) => {
    if (scaleIndexes.includes(cut?.position)) {
      cut?.layers?.forEach((layer) => {
        if (layer?.type === layerTypes.GROUP) {
          layer?.childLayers?.forEach((childLayer) => {
            rescaleLayer(childLayer, scaleValue);
            rescaleThickness(childLayer, zoomPercent / 100);
          });
        }

        rescaleLayer(layer, scaleValue);
        rescaleThickness(layer, zoomPercent / 100);
      });
    }
  });

  return {
    ...ampStory,
    cuts,
  };
};

export const deleteMediaLayersWithoutPendingDataUtil = (
  ampStory,
  pendingMediaQueue,
) => {
  const stringifiedPendingMediaQueue = localStorage.getItem(PENDING_MEDIA_QUEUE) ?? '{}';
  const mediaQueue = pendingMediaQueue ?? JSON.parse(stringifiedPendingMediaQueue);
  const cuts = ampStory.cuts.map((cut) => {
    const layers = cut.layers.filter((layer) => {
      const activeLayer = { ...layer };

      const pendingMedia = mediaQueue?.[ampStory._id]?.[activeLayer?.temporaryId];
      const isMediaTypeLayer = isMediaLayer(activeLayer.type);
      if (!isMediaTypeLayer) {
        return true;
      }

      if (
        activeLayer._id !== activeLayer.temporaryId ||
        activeLayer.content.value.includes(environment.mediaEndpoint)
      ) {
        return true;
      }

      return Boolean(pendingMedia);
    });

    return { ...cut, layers };
  });

  return {
    ...ampStory,
    cuts,
  };
};

export const generateGradientData = (
  svgString,
) => {
  const template = document.createElement('template');
  template.innerHTML = svgString;

  const stopElements = Array.from(template.content.querySelectorAll('stop'));
  const svg = template.content.querySelector('svg');

  // Order is important
  return {
    colorObject: generateGradientColors(stopElements),
    dimensions: generateSvgDimensions(svg),
    parsedShape: generateSvgShapeData(svg),
  };
};

export const generateGradientColors = (stopElements) => {
  if (!stopElements) {
    return undefined;
  }
  let index = 0;
  let colorObject = {};
  const colors = [];
  stopElements.forEach((element) => {
    let id = element.id;
    let color = element.style.stopColor || (element?.getAttribute('stop-color') ?? '');

    if (!id) {
      id = v4();
      element.id = id;
    }

    if (color.includes('rgb')) {
      color = rgbaToHex(color);
    }

    // check if color is shorthand hex
    if (color?.length === 4) {
      const shortColor = color.slice(1, color.length);
      color =
        '#' +
        shortColor
          .split('')
          .map((hex) => hex + hex)
          .join('');
    }

    if (!colors.includes(color)) {
      colors.push(color);
      // if hex color is invalid - set color to black, which is default for most browsers
      if (!isHexColor(color)) {
        color = '#000000FF';
      }
      colorObject = {
        ...colorObject,
        [`color${index}`]: {
          color,
          stopId: [id],
        },
      };
      index++;
    } else {
      Object.keys(colorObject).every((key) => {
        if (colorObject[key].color === color) {
          colorObject = {
            ...colorObject,
            [key]: {
              ...colorObject[key],
              stopId: [...colorObject[key].stopId, id],
            },
          };

          return false;
        }

        return true;
      });
    }
  });

  return colorObject;
};

export const generateSvgDimensions = (svg) => {
  if (!svg) {
    return {
      width: 0,
      height: 0,
    };
  }

  const viewBox = svg.getAttribute('viewBox') ?? '';
  const [_, __, width, height] = viewBox?.split(' ');

  return {
    width: +width,
    height: +height,
  };
};

export const generateSvgShapeData = (svg) => {
  if (!svg) {
    return '';
  }

  const gradients = svg?.querySelectorAll('linearGradient') ?? [];

  const ids = new Map();

  [...gradients].forEach((gradient) => {
    const newId = v4();

    const gradientId = gradient.getAttribute('id');
    ids.set(gradientId, newId);
    gradient.setAttribute('id', ids.get(gradientId));
  });

  let parsedSvg = svg.outerHTML;

  [...ids.keys()].forEach((gradientId) => {
    parsedSvg = parsedSvg.replaceAll(gradientId, ids.get(gradientId));
  });

  return parsedSvg;
};

export const sortLayersOrCuts = (a, b) => {
  if (a.position < b.position) {
    return -1;
  }
  if (a.position > b.position) {
    return 1;
  }
  return 0;
};

export const normalizeLayers = (
  slide,
  lastActiveLayer,
  isTemplateSlide = false,
  deltaCoordinates,
) => {
  let layers = [];

  slide.layers.forEach((layer) => {
    const layerCopy = cloneObj(layer);

    if (layerCopy?.childLayers?.length ?? 0 > 0) {
      let childLayers = [];
      layerCopy.childLayers?.forEach((childLayer) => {
        const childLayerCopy = cloneObj(childLayer);

        if (childLayerCopy?.type === layerTypes.HTML) {
          prepareTextLayer(childLayerCopy);
        }

        // Adjust gradients ids because of conflicts
        if (childLayerCopy?.type === layerTypes.GRADIENTS && childLayerCopy?.content?.gradient?.input) {
          const parsedShape = generateGradientData(childLayerCopy?.content?.gradient?.input).parsedShape;
          childLayerCopy.content.gradient.input = parsedShape;
        }

        if (childLayerCopy?.settings?.cropSettings) {
          convertCroppedLayers(childLayerCopy);
        }

        if (deltaCoordinates) {
          childLayerCopy.settings.generalSettings.offsetX =
            childLayerCopy.settings.generalSettings.offsetX + deltaCoordinates.deltaX;
          childLayerCopy.settings.generalSettings.offsetY =
            childLayerCopy.settings.generalSettings.offsetY + deltaCoordinates.deltaY;
        }

        childLayers = [...childLayers, { ...childLayerCopy }];
      });

      layerCopy.childLayers = childLayers;
    }

    if (layerCopy?.type === layerTypes.HTML) {
      prepareTextLayer(layerCopy);
    }

    // Adjust gradients ids because of conflicts
    if (layerCopy?.type === layerTypes.GRADIENTS && layerCopy?.content?.gradient?.input) {
      const parsedShape = generateGradientData(layerCopy?.content?.gradient?.input).parsedShape;
      layerCopy.content.gradient.input = parsedShape;
    }

    if (layerCopy?.settings?.cropSettings) {
      convertCroppedLayers(layerCopy);
    }

    layers = [...layers, { ...layerCopy }];

    if (lastActiveLayer?._id === layer?._id) {
      lastActiveLayer = {
        ...layerCopy,
      };
    }
  });

  return { ...slide, ...(isTemplateSlide ? { isTemplateSlide: true } : {}), layers: layers.sort(sortLayersOrCuts) };
};

export const calculateAngle = (rotate) => {
  if (rotate > 360 || rotate < -360) {
    return calculateAngle(rotate % 360);
  }

  if (rotate >= 180) {
    return Math.round(rotate - 360);
  }

  if (rotate <= -180) {
    return Math.round(360 + rotate);
  }

  return Math.round(rotate);
};

export const intersectRect = (r1, r2) => {
  return !(r2.left > r1.right || r2.right < r1.left || r2.top > r1.bottom || r2.bottom < r1.top);
};

export const intersectingRect = (r1, r2) => {
  const x = Math.max(r1.left, r2.left);
  const y = Math.max(r1.top, r2.top);
  const xx = Math.min(r1.left + r1.width, r2.left + r2.width);
  const yy = Math.min(r1.top + r1.height, r2.top + r2.height);

  return {
    left: x,
    top: y,
    bottom: yy + y,
    right: xx + x,
    width: xx - x,
    height: yy - y,
  };
};
