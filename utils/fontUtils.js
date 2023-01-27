
export const loadAllUserFonts = (fonts) => {
  if (!fonts.length) {
    return;
  }

  let fontFacesString = '';
  let fontFacesStyleElement = document.getElementById('font-faces');

  if (!fontFacesStyleElement) {
    fontFacesStyleElement = document.createElement('style');
    fontFacesStyleElement.setAttribute('id', 'font-faces');

    fonts.forEach((font) => {
      font.weight?.forEach((fontWeight) => {
        const url = font?.paths?.[fontWeight];
        const fileType = url?.substr(url?.lastIndexOf('.') + 1) || '';

        fontFacesString += `
            @font-face {
                font-family: '${font?.family}';
                font-style: normal;
                font-weight: ${fontWeight || '400'};
                src: url('${url}') format('${getFontFormat(fileType)}');
              }
    `;
      });
    });
    fontFacesStyleElement.appendChild(document.createTextNode(fontFacesString));
    document.head.appendChild(fontFacesStyleElement);
  } else {
    const font = fonts[fonts.length - 1];
    font.weight?.forEach((fontWeight) => {
      const url = font?.paths?.[fontWeight];
      const fileType = url?.substr(url?.lastIndexOf('.') + 1) || '';

      fontFacesString += `
          @font-face {
              font-family: '${font?.family}';
              font-style: normal;
              font-weight: ${fontWeight || '400'};
              src: url('${url}') format('${getFontFormat(fileType)}');
            }
  `;
    });

    fontFacesStyleElement.appendChild(document.createTextNode(fontFacesString));
  }
};

export const unloadAllUserFonts = () => {
  const fontFaces = document.getElementById('font-faces');
  if (fontFaces) {
    fontFaces.parentNode?.removeChild(fontFaces);
  }
};

export const getFontFormat = (fontFileExtension) => {
  const types = {
    ttf: 'truetype',
    otf: 'opentype',
    otc: 'opentype',
    ttc: 'opentype',
    woff: 'woff',
    woff2: 'woff2',
  };

  return types[fontFileExtension];
};

export const defaultFontWeights = [
  {
    name: 'Regular',
    value: 400,
  },
  { name: 'Bold', value: 700 },
];

export const normalizeUserFontShape = (font) => ({
  _id: font?._id ?? '',
  family: font.family,
  variants: [font.subFamilyName.toLowerCase()],
  paths: {
    [String(font.weight)]: font.url,
  },
  fontType: font.fontType,
  weight: [+font.weight],
});
