import { isNil } from 'lodash';

export const toRGBString = (color) => {
  const colorObjectKeys = Object.keys(color);
  if (colorObjectKeys.length === 3) {
    return colorObjectKeys.join('').concat(`a(${Object.values(color).join(', ')}, 1)`);
  }
  if (colorObjectKeys.length === 4 && typeof color === 'object' && color.a === undefined) {
    return `${Object.keys(color).join('')}(${Object.values(color).join(', ').concat('1')})`;
  }

  return `${Object.keys(color).join('')}(${Object.values(color).join(', ')})`;
};

export const toRGBObject = function (rgb) {
  let c = rgb.slice(rgb.indexOf('(') + 1, rgb.indexOf(')')).split(',');

  c = c.map(function (n) {
    return parseInt(n, 10), parseFloat(n);
  });

  const obj = {
    r: c[0],
    g: c[1],
    b: c[2],
    a: c[3],
  };

  return obj;
};

export const rgbaToHex = (rgb) => {
  const rgbArr = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+],[\s+]?(\d+)[\s+],[\s+]?(\d+)[\s+]?/i);

  return rgbArr && rgbArr.length === 4
    ? '#' +
        ('0' + parseInt(rgbArr[1], 10).toString(16).toUpperCase()).slice(-2) +
        ('0' + parseInt(rgbArr[2], 10).toString(16).toUpperCase()).slice(-2) +
        ('0' + parseInt(rgbArr[3], 10).toString(16).toUpperCase()).slice(-2)
    : '';
};

export const rgbaToHexa = (orig) => {
  let a = 0o1;
  const rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i);
  const alpha = ((rgb && rgb[4]) || '').trim();

  const r = isNil(rgb?.[1]) ? 0 : Number(rgb?.[1]);
  const g = isNil(rgb?.[2]) ? 0 : Number(rgb?.[2]);
  const b = isNil(rgb?.[3]) ? 0 : Number(rgb?.[3]);

  const hex = rgb
    ? (r | (1 << 8)).toString(16).slice(1) + (g | (1 << 8)).toString(16).slice(1) + (b | (1 << 8)).toString(16).slice(1)
    : orig;

  if (alpha !== '') {
    a = +alpha;
  }
  a = ((a * 255) | (1 << 8)).toString(16).slice(1);

  return `#${hex + a}`.toUpperCase();
};

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);

  if (!result) {
    return '';
  }

  const r = parseInt(result[1], 16),
    g = parseInt(result[2], 16),
    b = parseInt(result[3], 16),
    a = result?.[4] ? ((parseInt(result?.[4], 16) / 255) * 1000) / 1000 : 1;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
};

export const rgbaToHsla = ({ r, g, b, a }) => {
  // It converts [0,255] format, to [0,1]
  r = r === 255 ? 1 : (r % 255) / parseFloat('255');
  g = g === 255 ? 1 : (g % 255) / parseFloat('255');
  b = b === 255 ? 1 : (b % 255) / parseFloat('255');

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0,
    s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a,
  };
};

const createHsaConfig = (red, blue, green) => {
  return { red, green, blue };
};

// convert the rgba color to hsla
export const hslaToRgba = (hsla) => {
  const hue = hsla.h;
  const saturation = hsla.s / 100;
  const lightness = hsla.l / 100;
  const alpha = hsla.a;

  const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
  let huePrime = hue / 60;
  const secondComponent = chroma * (1 - Math.abs((huePrime % 2) - 1));

  huePrime = Math.floor(huePrime);
  let config = { red: 0, blue: 0, green: 0 };

  switch (huePrime) {
    case 0: {
      config = createHsaConfig(chroma, 0, secondComponent);
      break;
    }
    case 1: {
      config = createHsaConfig(secondComponent, 0, chroma);
      break;
    }
    case 2: {
      config = createHsaConfig(0, secondComponent, chroma);
      break;
    }
    case 3: {
      config = createHsaConfig(0, chroma, secondComponent);
      break;
    }
    case 4: {
      config = createHsaConfig(secondComponent, chroma, 0);
      break;
    }
    case 5:
    case 6: {
      config = createHsaConfig(chroma, secondComponent, 0);
      break;
    }
    default: {
      break;
    }
  }

  const lightnessAdjustment = lightness - chroma / 2;
  config.red += lightnessAdjustment;
  config.green += lightnessAdjustment;
  config.blue += lightnessAdjustment;
  return {
    r: Math.round(config.red * 255),
    g: Math.round(config.green * 255),
    b: Math.round(config.blue * 255),
    a: alpha,
  };
};

export const isHexColor = (hex) => typeof hex === 'string' && /^#?[0-9a-f]{6,8}$/i.test(hex);

export const isRgbaColor = (rgba) => {
  const regExp = new RegExp(/[Rr][Gg][Bb][Aa][(](((([\d]{1,3}|[\d.]{1,3})[,]{0,1})[\s]*){4})[)]/gm);

  return regExp.test(rgba);
};

export const getCssColor = (data) => {
  if (data.type === 'linear') {
    return data.rightColor;
  }

  return data.leftColor;
};

export const getLinearRGBValue = (x) => {
  // 8bit to sRGB.
  x /= 255;

  // Converts the gamma-compressed RGB values to linear RGB.
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
};

export const getOutlinkColor = (fillColor) => {
  const regexPattern = /rgba?\((\d{1,3}), (\d{1,3}), (\d{1,3})/;
  const cssColor = getCssColor(fillColor);
  const matches = regexPattern.exec(cssColor);

  return {
    r: Number(matches?.[1]),
    g: Number(matches?.[2]),
    b: Number(matches?.[3]),
  };
};
