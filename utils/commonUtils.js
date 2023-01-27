import { parseClip } from './croppingUtils';
// return the scale value of fullscreen media. (need for rotate function)
export const rotateImage = (
  rotate,
  clientWidth,
  clientHeight,
  isMiniLayer = false,
  mode = {},
) => {
  const dist = Math.sqrt(Math.pow(clientWidth, 2) + Math.pow(clientHeight, 2));
  const diagAngle = Math.asin(clientHeight / dist);
  let a1 = ((((+rotate * Math.PI) / 180) % (Math.PI * 2)) + Math.PI * 4) % (Math.PI * 2);
  if (a1 > Math.PI) {
    a1 -= Math.PI;
  }
  if (a1 > Math.PI / 2 && a1 <= Math.PI) {
    a1 = Math.PI / 2 - (a1 - Math.PI / 2);
  }
  const ang1 = Math.PI / 2 - diagAngle - Math.abs(a1);
  const ang2 = Math.abs(diagAngle - Math.abs(a1));
  const scale = Math.max((Math.cos(ang1) * dist) / mode.height, (Math.cos(ang2) * dist) / mode.width);
  return isMiniLayer ? `rotate(${rotate}deg) scale(${scale})` : scale;
};

// return the container proportion
export const setProportion = (width, height) => {
  return height / width;
};

export const bytesToMegaBytes = (bytes) => bytes / (1024 * 1024);

export const validateInput = (event, data, limitMin, limitMax, enableMinus) => {
  event.preventDefault();
  event.stopPropagation();
  const validateReg = enableMinus ? /^-?\d*(\.)?(\d)?$/ : /^\d*(\.)?(\d)?$/;
  // update event.target.value to last if it has forbidden symbols or leave empty for empty field and first forbidden symbol
  if (!validateReg.test(event.target.value)) {
    event.target.value = !event.target.value || event.target.value.length === 1 ? '' : data;
    return false;
  }
  // if first minus or .
  if (isNaN(parseFloat(event.target.value))) {
    return false;
  }

  // check limit value and don't update model value if min/max value has already written in input
  if (limitMin !== null && event.target.value < limitMin) {
    event.target.value = '';
    event.target.value = limitMin;
    if (+data === limitMin) {
      return false;
    }
  }

  if (limitMax !== null && event.target.value > limitMax) {
    event.target.value = '';
    event.target.value = limitMax;
    if (+data === limitMax) {
      return false;
    }
  }

  return event.target.value;
};

export const generateEmbededIframe = (storyLink) =>
  `<iframe width='282px' height='500px' src='${storyLink}'></iframe>`;

export const rotateRect = (angle, x, y, w, h, th) => {
  const rads = (angle * Math.PI) / 180;

  const xAx = Math.cos(rads); // x axis x
  const xAy = Math.sin(rads); // x axis y

  if (th) {
    w += th * 2;
    h += th * 2;
  }

  const ox = x + w / 2; // Center x
  const oy = y + h / 2; // Center y

  x -= ox; // Move rectangle onto center origin
  y -= oy;

  return [
    [
      x * xAx - y * xAy + ox, // Get the top left rotated position
      x * xAy + y * xAx + oy, // and move it back to the origin
    ],
    [
      (x + w) * xAx - y * xAy + ox, // Get the top right rotated position
      (x + w) * xAy + y * xAx + oy, // and move it back to the origin
    ],
    [
      (x + w) * xAx - (y + h) * xAy + ox, // Get the bottom right rotated position
      (x + w) * xAy + (y + h) * xAx + oy, // and move it back to the origin
    ],
    [
      x * xAx - (y + h) * xAy + ox, // Get the bottom left rotated position
      x * xAy + (y + h) * xAx + oy, // and move it back to the origin
    ],
  ];
};

export const calculateSinCos = (rotate) => {
  const rads = rotate * (Math.PI / 180);

  const sin = Math.sin(rads);
  const cos = Math.cos(rads);

  return {
    sin,
    cos,
  };
};

export const cloneObj = (object) => {
  //This deep clones the object but funcs are not included
  return JSON.parse(JSON.stringify(object));
};

export const validateEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const getSelectedLayers = (layers, selectedLayersPosition) => {
  if (layers && selectedLayersPosition) {
    return layers.filter((layer) => selectedLayersPosition.includes(layer.position));
  }
  return [];
};

export const parseQuery = (queryString) => {
  const query = {};
  const pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');

  for (let i = 0; i < pairs.length; i++) {
    const pair = pairs[i].split('=');
    query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
  }
  return query;
};

export const falseFunction = () => {
  return false;
};

export function fixSvgs(svgNode, width, height) {
  svgNode.setAttribute('width', width.toString());
  svgNode.setAttribute('height', height.toString());
}

export function fixImages(divNode, width, height, childLayer) {
  if (childLayer && childLayer?.settings?.cropSettings) {
    const crop = childLayer.settings.cropSettings;
    // How much the width changed in percentage
    const deltaWidth = width / childLayer.settings.layerSettings.width;
    // How much the height changed in percentage
    const deltaHeight = height / childLayer.settings.layerSettings.height;

    // New cropper dimensions
    const updatedOriginalWidth = crop.originalWidth * deltaWidth;
    const updatedOriginalHeight = crop.originalHeight * deltaHeight;

    const parsedClip = parseClip(crop.frame.clipStyle);

    const topRatio = parsedClip[0] / crop.originalHeight;
    const rightRatio = parsedClip[1] / crop.originalWidth;
    const leftRatio = parsedClip[3] / crop.originalWidth;

    const newTopClip = updatedOriginalHeight * topRatio;
    const newRightClip = updatedOriginalWidth * rightRatio;
    const newLeftClip = updatedOriginalWidth * leftRatio;

    const originalCropProportion = updatedOriginalWidth / updatedOriginalHeight;

    const croppedWidth = updatedOriginalWidth - newRightClip - newLeftClip;
    const croppedWidthProportion = croppedWidth / width;

    const newOriginalWidth = updatedOriginalWidth / croppedWidthProportion;
    const newOriginalHeight = newOriginalWidth / originalCropProportion;

    divNode.style.width = `${width}px`;
    divNode.style.height = `${height}px`;
    const img = divNode.querySelector('img');
    if (img) {
      img.style.width = `${newOriginalWidth}px`;
      img.style.height = `${newOriginalHeight}px`;
      img.style.top = `${-1 * (newTopClip / croppedWidthProportion)}px`;
      img.style.left = `${-1 * (newLeftClip / croppedWidthProportion)}px`;
    }

    return;
  }

  divNode.style.width = `${width}px`;
  divNode.style.height = `${height}px`;
  const img = divNode.querySelector('img');
  if (img) {
    img.style.width = `${width}px`;
    img.style.height = `${height}px`;
  }
}
