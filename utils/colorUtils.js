
export const getNewShapeBackground = (
  inputType,
  background,
  size,
  shapeType,
) => {
  const computedFontSize = parseFloat(window.getComputedStyle(background.parentNode).fontSize);

  if (inputType === 'stroke-width') {
    let height;
    let width;
    let transform;
    if (shapeType === 'line') {
      height = `calc(100% + ${size / computedFontSize}em)`;
      width = `calc(100% - ${size / computedFontSize}em)`;
      transform = `translate(${size / 2 / computedFontSize}em, ${-size / 2 / computedFontSize}em)`;
    } else if (shapeType === 'triangle') {
      height = `calc(100% - ${size / 2 / computedFontSize}em)`;
      width = `calc(100%)`;
      transform = `translate(0px, 0px)`;
    } else {
      height = `calc(100% - ${size / computedFontSize}em)`;
      width = `calc(100% - ${size / computedFontSize}em)`;
      transform = `translate(${size / 2 / computedFontSize}em, ${size / 2 / computedFontSize}em)`;
    }
    background.setAttribute('height', height);
    background.setAttribute('width', width);
    background.style.height = height;
    background.style.width = width;
    background.style.transform = transform;
    background.getElementsByTagName('path')[0].setAttribute('stroke-width', size / computedFontSize + 'em');
  }
  return background;
};

export const getNewShapeGradientBackground = (
  data,
  background,
  layerPosition,
  cutPosition,
) => {
  const colorType = data.colorType === 'borderColor' ? 'stroke' : 'fill';
  const path = background.querySelector('path');

  if (!path) {
    return background;
  }
  if (data.type === 'solid') {
    path.style[colorType] = data.leftColor;
  } else {
    const gradient = background.querySelector(`#${data.type}${data.colorType}${cutPosition}${layerPosition}`);
    if (gradient) {
      gradient.innerHTML = `<stop offset="${data.leftColorPercent}%" style="stop-color:${data.leftColor};stop-opacity:1" />
    <stop offset="${data.rightColorPercent}%" style="stop-color:${data.rightColor};stop-opacity:1" />`;
      path.style[colorType] = `url(#${data.type}${data.colorType}${cutPosition}${layerPosition})`;
      if (data.type === 'linear') {
        const anglePI = -data.angle * (Math.PI / 180);
        gradient.setAttribute('x1', Math.round(50 + Math.sin(anglePI) * 50) + '%');
        gradient.setAttribute('y1', Math.round(50 + Math.cos(anglePI) * 50) + '%');
        gradient.setAttribute('x2', Math.round(50 + Math.sin(anglePI + Math.PI) * 50) + '%');
        gradient.setAttribute('y2', Math.round(50 + Math.cos(anglePI + Math.PI) * 50) + '%');
      } else if (data.type === 'radial') {
        gradient.setAttribute('fx', `${data.horizontalDirection}%`);
        gradient.setAttribute('fy', `${data.verticalDirection}%`);
      }
    }
  }
  return background;
};

export const getNewBackground = (data) => {
  if (!data) {
    return '';
  }

  switch (data.type) {
    case 'solid': {
      return data.leftColor;
    }
    case 'linear': {
      return `linear-gradient(${data.angle}deg, ${data.leftColor} ${data.leftColorPercent}%, ${data.rightColor} ${data.rightColorPercent}%)`;
    }
    case 'radial': {
      return `radial-gradient(circle at ${data.horizontalDirection}% ${data.verticalDirection}%, ${data.leftColor} ${data.leftColorPercent}%, ${data.rightColor} ${data.rightColorPercent}%)`;
    }
    default: {
      return data.leftColor;
    }
  }
};

// returns the alpha value to set the color opacity
const getAlphaPercentage = (v) =>
  parseFloat((parseInt(((parseInt(v, 16) / 255) * 1000).toString(), 10) / 1000).toString());

// convert the hex color to rgba
export const hex8ToRgba = (data) => {
  if (data && !data.includes('rgb')) {
    const hex = data.slice(1);
    const c = hex.match(/.{1,2}/g);
    const rgb = [];
    const a = getAlphaPercentage(c[3]);
    c.slice(0, 3).forEach((v) => {
      rgb.push(parseInt(v, 16));
    });
    a !== 0 ? rgb.push(a) : rgb.push(0.001);
    return `rgba(${rgb[0]},${rgb[1]},${rgb[2]}, ${rgb[3] || '1'})`;
  } else {
    return data;
  }
};

export const setSlideBgColor = (data, slidePosition) => {
  const previewContainer = document.getElementById(`slide-preview-${slidePosition}`);
  if (previewContainer) {
    previewContainer.style.background = getNewBackground(data);
  }
};
