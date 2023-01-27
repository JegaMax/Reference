import isEqual from 'lodash/isEqual';

export const preventDefault = (event) => {
  event.preventDefault();
  event.stopPropagation();
};

export const stopPropagation = (e) => e.stopPropagation();

export const getArrowEventValue = (event) => {
  if (!(event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
    return 0;
  }
  return event.key === 'ArrowUp' ? 1 : -1;
};

export const getObjectDiff = (firstObject, secondObject) => {
  if (typeof firstObject !== 'object' || typeof secondObject !== 'object') {
    return [];
  }
  const diff = Object.keys(firstObject).reduce((result, key) => {
    // eslint-disable-next-line no-prototype-builtins
    if (!secondObject.hasOwnProperty(key)) {
      result.push(key);
    } else if (isEqual(firstObject[key], secondObject[key])) {
      const resultKeyIndex = result.indexOf(key);
      result.splice(resultKeyIndex, 1);
    }
    return result;
  }, Object.keys(secondObject));

  return diff;
};

export const loadScript = (src) => {
  if (document.querySelectorAll(`script[src="${src}"]`).length === 0) {
    const tag = document.createElement('script');
    tag.async = false;
    tag.src = src;
    document.getElementsByTagName('body')[0].appendChild(tag);
  }
};

export const removeScript = (src) => {
  const script = document.querySelector(`script[src="${src}"]`);
  if (script) {
    script.remove();
  }
};

export const calculateNumberOfPercent = (number, percent) => {
  return typeof number === 'number' && typeof percent === 'number' ? (number * percent) / 100 : 0;
};

// For normalizing a result after subtraction
// EXAMPLE: 1.2 - 1 = 0.19999999999999996
export const subNumbers = (b, c) => {
  const b1 = b.toString().split('.');
  let b1Max = 0;
  if (b1.length === 2) {
    b1Max = b1[1].length;
  }

  const c1 = c.toString().split('.');
  let c1Max = 0;
  if (c1.length === 2) {
    c1Max = c1[1].length;
  }

  const maxLen = b1Max > c1Max ? b1Max : c1Max;

  return Number((b - c).toFixed(maxLen));
};

export const getNodeSize = (node) => {
  let height = 0;
  let width = 0;

  document.body.appendChild(node);

  height = node.clientHeight;
  width = node.clientWidth;

  node?.parentNode?.removeChild(node);
  return {
    width,
    height,
  };
};
