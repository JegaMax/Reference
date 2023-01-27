import { Direction } from '../components/editor-sidebar/editor-sidebar-animations/direction-button';
import { ContentState, EditorState, Modifier, RichUtils, SelectionState } from 'draft-js';
import {
  TEXT_BLOCK_STYLES,
  defaultBackgroundColor,
  defaultBgLeftColor,
  defaultRightColor,
  defaultTextFontColor,
  defaultTextLayerContent,
  defaultTextLayerHtml,
  whiteRGBA,
} from '../config/constants';
import { IColorType } from '../interfaces/colors';
import { layerTypes } from '../interfaces/layer-types';
import { rotateRect } from './commonUtils';
import { isMediaLayer } from './editorUtils';
import generateId from './generateId';
import { selectAllText } from './textEditorUtils';

const getDefaultColor = (type) => {
  switch (type) {
    case IColorType.BgColor:
      return defaultBgLeftColor;
    default:
      return whiteRGBA;
  }
};

export const defaultEditorModel = (
  id,
  author,
  type,
  title,
  presetFontStyles,
) => ({
  _id: id ?? '',
  ...(type && isMediaLayer(type) && { temporaryId: id ?? '' }),
  position: 0,
  isTitleDirty: false,
  author,
  title,
  type,
  settings: defaultSettingModel(type, presetFontStyles),
  content: defaultContentModel(type),
});

const createEditorState = (presetFontStyles) => {
  const text = 'Type something';
  let contentState = ContentState.createFromText(text);
  let editorState = EditorState.createWithContent(contentState);
  const selection = selectAllText(editorState);

  let presetFontWeightValue = '';

  if (presetFontStyles?.style?.includes('bold') && presetFontStyles?.weight !== 700) {
    presetFontWeightValue = 'BOLD';
  } else {
    presetFontWeightValue = (presetFontStyles?.weight ?? 400).toString();
  }

  [
    `FONT_WEIGHT_${presetFontWeightValue}`,
    'FONT_SPACING_1_5',
    'FONT_COLOR_rgb(255, 255, 255, 1)',
    presetFontStyles?.fontFamily ? `FONT_FAMILY_${presetFontStyles?.fontFamily}` : `FONT_FAMILY_Heebo`,
    presetFontStyles?.size ? `FONT_SIZE_${presetFontStyles.size}` : 'FONT_SIZE_45',
    presetFontStyles?.style?.includes('underline') ? 'UNDERLINE' : '',
    presetFontStyles?.style?.includes('italic') ? 'ITALIC' : '',
  ].forEach((style) => {
    contentState = Modifier.applyInlineStyle(contentState, selection, style);
  });
  const blockKey = Object.keys(contentState.getBlockMap().toJS())?.[0];
  const selectionBeforeState = SelectionState.createEmpty(blockKey).merge({
    anchorOffset: text.length - 1,
    focusOffset: text.length - 1,
    anchorKey: blockKey,
    focusKey: blockKey,
    isBackward: false,
    hasFocus: true,
  });
  const selectionAfterState = SelectionState.createEmpty(blockKey).merge({
    anchorOffset: text.length,
    focusOffset: text.length,
    anchorKey: blockKey,
    focusKey: blockKey,
    isBackward: false,
    hasFocus: true,
  });

  const contentWithSelectionBefore = contentState.set('selectionBefore', selectionBeforeState);
  const contentWithSelectionAfter = contentWithSelectionBefore.set('selectionAfter', selectionAfterState);

  editorState = EditorState.set(editorState, {
    currentContent: contentWithSelectionAfter,
  });
  return EditorState.moveFocusToEnd(RichUtils.toggleBlockType(editorState, TEXT_BLOCK_STYLES.ALIGN_CENTER));
};

const defaultSettingModel = (type, presetFontStyles) => {
  return {
    animateIn: '',
    animateInDuration: 2,
    animateInDelay: 0,
    animateOut: '',
    animateOutDuration: 2,
    animateOutDelay: 3,
    generalSettings: defaultGeneralSettings(),
    layerSettings: defaultLayerSettings(),
    linkSettings: defaultLinkSettings(),
    ...(type &&
      type === layerTypes.HTML && {
        editorState: createEditorState(presetFontStyles),
      }),
    ...(type &&
      type === layerTypes.CTA_LINK && {
        ctaLayerSettings: defaultCtaLinkModel(),
      }),
    ...(type &&
      type === layerTypes.OUTLINK && {
        ctaLayerSettings: defaultCtaLinkModel(),
      }),
  };
};

const defaultGeneralSettings = () => ({
  initialOffsetY: '0',
  initialOffsetX: '0',
  innerOffsetY: '0',
  innerOffsetX: '0',
  offsetY: 0,
  offsetX: 0,
  margin: '0',
  opacity: '100',
  position: '0',
  rotate: 0,
  round: '0',
  shadow: '0',
  locked: false,
});

export const getDefaultTextSettings = () => ({
  fontWeight: 400,
  fontFamily: 'Heebo',
  fontSize: 45,
  textAlign: 'center',
  lineHeight: 1.3,
});

export const defaultCut = (position, title, author) => ({
  duration: 10,
  layers: [],
  lastActiveLayer: null,
  backgroundColor: defaultGradientColor(IColorType.BgColor),
  _id: position.toString(),
  position,
  author,
  title,
  type: 'amp',
});

const defaultLayerSettings = () => ({
  width: 0,
  height: 0,
  fullscreen: false,
  originalWidth: 0,
  originalHeight: 0,
  mute: false,
  shapeStyles: defaultShapeStyles(),
  locked: true,
  permissionForFullScreen: false,
  fullScreenConfig: {},
  isLayerHidden: false,
});

const defaultLinkSettings = () => ({
  isEnabled: false,
  link: '',
  text: 'Click here',
  icon: null,
});

const defaultShapeStyles = () => ({
  borderColor: styleSettingsColorModel(IColorType.BorderColor),
  fillColor: styleSettingsColorModel(IColorType.FillColor),
  thickness: 0,
  relativeThickness: 0,
  round: '25',
});

export const defaultGradientColor = (type) => ({
  type: 'solid',
  leftColor: getDefaultColor(type),
  leftColorPercent: 0,
  rightColor: defaultRightColor,
  rightColorPercent: 100,
  angle: 90,
  horizontalDirection: 50,
  verticalDirection: 50,
});

export const defaultCtaLinkModel = (ctaLinkSettings) => ({
  link: ctaLinkSettings?.link ?? '',
  fontColor: ctaLinkSettings?.fontColor ?? '#000000',
  linkTitle: ctaLinkSettings?.linkTitle ?? 'Learn more',
  withQueries: ctaLinkSettings?.withQueries ?? false,
});

const defaultContentModel = (type) => ({
  value: type === layerTypes.HTML ? defaultTextLayerContent : '',
  link: '',
  html: type === layerTypes.HTML ? defaultTextLayerHtml : '',
  shape: '',
  image: {
    url: '',
    name: '',
  },
  video: {
    url: '',
    name: '',
  },
});

export const styleSettingsColorModel = (colorType = IColorType.BgColor) => ({
  ...defaultGradientModel(colorType),
  colorType,
});

export const defaultGradientModel = (type) => ({
  type: 'solid',
  //Change for shapes
  leftColor: getDefaultColor(type),
  leftColorPercent: 0,
  rightColor: defaultRightColor,
  rightColorPercent: 100,
  angle: 90,
  horizontalDirection: 50,
  verticalDirection: 50,
});

export const defaultTextEditorConfig = (
  fonts,
  searchedFonts,
  scrollPosition,
) => ({
  tempTextAlign: 'center',
  tempFontFamily: 'Heebo',
  tempFontWeight: 400,
  tempFontWeightConfig: [],
  tempFontSize: 45,
  tempSpacingSize: 1.3,
  tempFontColor: defaultTextFontColor,
  tempBgColor: defaultBackgroundColor,
  fonts: fonts ?? [],
  allFonts: fonts ?? [],
  searchedFonts: searchedFonts ?? [],
  scrollPosition: scrollPosition ?? 0,
  scrollStep: 5,
  searchWord: '',
  fontSizes: [
    5,
    10,
    15,
    20,
    25,
    30,
    35,
    40,
    45,
    50,
    55,
    60,
    65,
    70,
    75,
    80,
    85,
    90,
    95,
    100,
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145,
    150,
    155,
    160,
    165,
    170,
    175,
    180,
    185,
    190,
    195,
    200,
    205,
    210,
    215,
    220,
    225,
    230,
    235,
    240,
    245,
    250,
    255,
    260,
    265,
    270,
    275,
    280,
    285,
    290,
    295,
    300,
  ],
  textSpacing: [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6],
  isBold: false,
  isUnderline: false,
  isItalic: false,
});

export const defaultWindowsConfig = {
  fontFamily: 'fontFamilyWindow',
  fontWeight: 'fontWeightWindow',
  colorPicker: 'colorPickerWindow',
  fontSize: 'fontSizeWindow',
  textSpacing: 'textSpacingWindow',
};

export const tagConfig = {
  [defaultWindowsConfig.fontFamily]: '#font-family',
  [defaultWindowsConfig.fontWeight]: '#font-weight',
  [defaultWindowsConfig.fontSize]: '#font-size',
  [defaultWindowsConfig.textSpacing]: '#text-spacing',
};

export const defaultImageEditorModel = {
  mediaPath: '',
  name: '',
  fullscreen: false,
  touched: false,
  locked: true,
  isUnsplash: true,
  offset: 0,
  limit: 20,
};

export const defaultImageSearchModel = {
  ownLibrary: false,
  openSelect: false,
  searchTitle: '',
  searchTimeout: null,
  focusTimeout: null,
  autocompleteTags: [],
  ifHideAutocomplete: true,
  offset: 0,
  limit: 20,
};
export const defaultLayerFonts = ({ family, weight, style, paths, fontType, italic }) => ({
  family,
  weight,
  style,
  paths,
  fontType,
  italic,
});

export const defaultStoryFonts = (googleFonts, storyFonts) => ({
  googleFonts,
  storyFonts,
});

export const shapes = [
  {
    id: 1,
    type: 'square',
    images: {
      active: './images/shapes/square-active.svg',
      inactive: './images/shapes/square-inactive.svg',
    },
  },
  {
    id: 2,
    type: 'circle',
    images: {
      active: './images/shapes/oval-active.svg',
      inactive: './images/shapes/oval-inactive.svg',
    },
  },
  {
    id: 3,
    type: 'triangle',
    images: {
      active: './images/shapes/triangle-active.svg',
      inactive: './images/shapes/triangle-inactive.svg',
    },
  },
  {
    id: 5,
    type: 'heart',
    images: {
      active: './images/shapes/heart-active.svg',
      inactive: './images/shapes/heart-inactive.svg',
    },
  },
  {
    id: 6,
    type: 'star',
    images: {
      active: './images/shapes/star-active.svg',
      inactive: './images/shapes/star-inactive.svg',
    },
  },
  {
    id: 7,
    type: 'pentagon',
    images: {
      active: './images/shapes/pentagon-active.svg',
      inactive: './images/shapes/pentagon-inactive.svg',
    },
  },
  {
    id: 8,
    type: 'hexagon',
    images: {
      active: './images/shapes/hexagon-active.svg',
      inactive: './images/shapes/hexagon-inactive.svg',
    },
  },
  {
    id: 9,
    type: 'diamond',
    images: {
      active: './images/shapes/diamond-active.svg',
      inactive: './images/shapes/diamond-inactive.svg',
    },
  },
  {
    id: 10,
    type: 'plus',
    images: {
      active: './images/shapes/plus-active.svg',
      inactive: './images/shapes/plus-inactive.svg',
    },
  },
  {
    id: 11,
    type: 'flag',
    images: {
      active: './images/shapes/flag-active.svg',
      inactive: './images/shapes/flag-inactive.svg',
    },
  },
  {
    id: 12,
    type: 'cloud',
    images: {
      active: './images/shapes/cloud-active.svg',
      inactive: './images/shapes/cloud-inactive.svg',
    },
  },
];

export const defaultStyleSettingsModel = () => ({
  borderColor: styleSettingsColorModel(IColorType.BorderColor),
  thickness: 0,
  fillColor: styleSettingsColorModel(IColorType.FillColor),
  round: '25',
});
export const defaultLayerSettingModel = {
  innerOffsetX: '0',
  innerOffsetY: '0',
  offsetY: '0',
  offsetX: '0',
  rotate: '0',
  round: '0',
  opacity: '100',
  shadow: '0',
  margin: '0',
  position: '8',

  width: '0',
  height: '0',

  originalWidth: 0,
  originalHeight: 0,
  locked: true,
};

export const enterAnimations = [
  {
    name: 'fade-in',
    label: 'Fade-in',
    imageActive: './images/animateIn/Fade-In.svg',
    image: './images/animateIn/Fade-In-Black.svg',
  },
  {
    name: 'fly-in-bottom',
    label: 'Fly-in',
    imageActive: './images/animateIn/Fly-In-Top.svg',
    image: './images/animateIn/Fly-In-Top-Black.svg',
    directions: [Direction.top, Direction.right, Direction.bottom, Direction.left],
  },
  {
    name: 'pulse',
    label: 'Pulse',
    imageActive: './images/animateIn/Pulse.svg',
    image: './images/animateIn/Pulse-Black.svg',
  },
  {
    name: 'rotate-in-left',
    label: 'Rotate-In',
    imageActive: './images/animateIn/Rotate-In-Right.svg',
    image: './images/animateIn/Rotate-In-Right-Black.svg',
    directions: [Direction.right, Direction.left],
  },
  {
    name: 'twirl-in',
    label: 'Twirl-In',
    imageActive: './images/animateIn/Twirl-In.svg',
    image: './images/animateIn/Twirl-In-Black.svg',
  },
  {
    name: 'whoosh-in-left',
    label: 'Whoosh-In',
    imageActive: './images/animateIn/Whoosh-In-Right.svg',
    image: './images/animateIn/Whoosh-In-Right-Black.svg',
    directions: [Direction.right, Direction.left],
  },
  {
    name: 'drop',
    label: 'Drop-In',
    imageActive: './images/animateIn/Drop.svg',
    image: './images/animateIn/Drop-Black.svg',
  },
  {
    name: 'zoom-in',
    label: 'Zoom-In',
    imageActive: './images/animateIn/Zoom-In.svg',
    image: './images/animateIn/Zoom-In-Black.svg',
  },
  {
    name: 'zoom-out',
    label: 'Zoom-Out',
    imageActive: './images/animateIn/Zoom-Out.svg',
    image: './images/animateIn/Zoom-Out-Black.svg',
  },
];

export const exitAnimations = [
  {
    name: 'fade-out',
    label: 'Fade-out',
    imageActive: './images/animateIn/Fade-In.svg',
    image: './images/animateIn/Fade-In-Black.svg',
  },
  {
    name: 'fly-out-top',
    label: 'Fly-Out',
    imageActive: './images/animateIn/Fly-In-Top.svg',
    image: './images/animateIn/Fly-In-Top-Black.svg',
    directions: [Direction.top, Direction.right, Direction.bottom, Direction.left],
  },
  {
    name: 'rotate-out-right',
    label: 'Rotate-Out',
    imageActive: './images/animateIn/Rotate-In-Right.svg',
    image: './images/animateIn/Rotate-In-Right-Black.svg',
    directions: [Direction.right, Direction.left],
  },
  {
    name: 'twirl-out',
    label: 'Twirl-Out',
    imageActive: './images/animateIn/Twirl-In.svg',
    image: './images/animateIn/Twirl-In-Black.svg',
  },
  {
    name: 'whoosh-out-right',
    label: 'Whoosh-Out',
    imageActive: './images/animateIn/Whoosh-In-Right.svg',
    image: './images/animateIn/Whoosh-In-Right-Black.svg',
    directions: [Direction.right, Direction.left],
  },
];

export const fullscreenAnimations = [
  {
    name: 'pan-top',
    label: 'Pan',
    imageActive: './images/animateIn/Pan-Up.svg',
    image: './images/animateIn/Pan-Up-Black.svg',
    directions: [Direction.top, Direction.right, Direction.bottom, Direction.left],
  },
  // {
  //   id: 17,
  //   name: 'pan-left',
  //   label: 'Pan-Left',
  //   imageActive: './images/animateIn/Pan-Left.svg',
  //   image: './images/animateIn/Pan-Left-Black.svg',
  // },
  // {
  //   id: 18,
  //   name: 'pan-down',
  //   label: 'Pan-Down',
  //   imageActive: './images/animateIn/Pan-Up.svg',
  //   image: './images/animateIn/Pan-Up-Black.svg',
  // },
  // {
  //   id: 19,
  //   name: 'pan-up',
  //   label: 'Pan-Up',
  //   imageActive: './images/animateIn/Pan-Down.svg',
  //   image: './images/animateIn/Pan-Down-Black.svg',
  // },
];

export const defaultVideoEditor = {
  mediaPath: '',
  name: '',
  fullscreen: false,
  mute: true,
  thumbnail: '',
  locked: true,
};

export const defaultBgColor = { r: 238, g: 238, b: 238, a: 1 };

export const presetColors = [
  [
    'rgba(0, 0, 0, 1)',
    'rgba(84, 84, 84, 1)',
    'rgba(115, 115, 115, 1)',
    'rgba(166, 166, 166, 1)',
    'rgba(217, 217, 217, 1)',
    'rgba(255, 255, 255, 1)',
  ],
  [
    'rgba(255, 22, 22, 1)',
    'rgba(255, 87, 87, 1)',
    'rgba(255, 102, 196, 1)',
    'rgba(203, 108, 230, 1)',
    'rgba(140, 82, 255, 1)',
    'rgba(3, 152, 158, 1)',
  ],
  [
    'rgba(56, 182, 255, 1)',
    'rgba(0, 74, 173, 1)',
    'rgba(0, 128, 55, 1)',
    'rgba(126, 217, 87, 1)',
    'rgba(255, 222, 89, 1)',
    'rgba(255, 145, 77, 1)',
  ],
];

export const buildGroup = (layers) => {
  const _id = generateId();
  const type = layerTypes.GROUP;
  const title = 'Group';
  const isTitleDirty = false;
  const content = defaultContentModel();

  const { width, height, offsetX, offsetY, position } = layers.reduce(
    (acc, currentLayer) => {
      const { settings, position } = currentLayer;
      const { offsetX: layerOffsetX, offsetY: layerOffsetY, rotate: angle } = settings.generalSettings;
      const { height: layerHeight, width: layerWidth } = settings.layerSettings;

      if (angle !== 0) {
        const rotatedLayer = rotateRect(angle, layerOffsetX, layerOffsetY, layerWidth, layerHeight, 0);
        const minX = Math.min(rotatedLayer[0][0], rotatedLayer[1][0], rotatedLayer[2][0], rotatedLayer[3][0]);
        const maxX = Math.max(rotatedLayer[0][0], rotatedLayer[1][0], rotatedLayer[2][0], rotatedLayer[3][0]);
        const minY = Math.min(rotatedLayer[0][1], rotatedLayer[1][1], rotatedLayer[2][1], rotatedLayer[3][1]);
        const maxY = Math.max(rotatedLayer[0][1], rotatedLayer[1][1], rotatedLayer[2][1], rotatedLayer[3][1]);
        const adjustedOffsetX = minX;
        const adjustedOffsetY = minY;
        const adjustedWidth = maxX - minX;
        const adjustedHeight = maxY - minY;

        if (+adjustedOffsetX < acc.offsetX) {
          acc.offsetX = Math.round(adjustedOffsetX);
        }

        if (+adjustedOffsetY < acc.offsetY) {
          acc.offsetY = Math.round(adjustedOffsetY);
        }

        if (+adjustedWidth + +adjustedOffsetX > acc.width) {
          acc.width = Math.round(+adjustedWidth + +adjustedOffsetX);
        }

        if (+adjustedHeight + +adjustedOffsetY > acc.height) {
          acc.height = Math.round(+adjustedHeight + +adjustedOffsetY);
        }

        if (position < acc.position) {
          acc.position = position;
        }

        return acc;
      }

      if (+layerOffsetX < acc.offsetX) {
        acc.offsetX = Math.round(layerOffsetX);
      }

      if (+layerOffsetY < acc.offsetY) {
        acc.offsetY = Math.round(layerOffsetY);
      }

      if (+layerWidth + +layerOffsetX > acc.width) {
        acc.width = Math.round(+layerWidth + +layerOffsetX);
      }

      if (+layerHeight + +layerOffsetY > acc.height) {
        acc.height = Math.round(+layerHeight + +layerOffsetY);
      }

      if (position < acc.position) {
        acc.position = position;
      }

      return acc;
    },
    {
      width: 0,
      height: 0,
      offsetX: Number.POSITIVE_INFINITY,
      offsetY: Number.POSITIVE_INFINITY,
      position: Number.POSITIVE_INFINITY,
    },
  );

  const updatedLayers = layers.map((layer) => ({
    ...layer,
    settings: {
      ...layer.settings,
      generalSettings: {
        ...layer.settings.generalSettings,
        locked: false,
      },
    },
  }));

  const settings = {
    animateIn: '',
    animateInDuration: 2,
    animateInDelay: 0,
    animateOut: '',
    animateOutDuration: 2,
    animateOutDelay: 3,
    generalSettings: {
      initialOffsetY: '0',
      initialOffsetX: '0',
      innerOffsetY: '0',
      innerOffsetX: '0',
      offsetY,
      offsetX,
      margin: '0',
      opacity: '100',
      position: '0',
      rotate: 0,
      round: '0',
      shadow: '0',
      locked: false,
    },
    layerSettings: {
      width: width - offsetX,
      height: height - offsetY,
      fullscreen: false,
      originalWidth: width - offsetX,
      originalHeight: height - offsetY,
      mute: false,
      shapeStyles: defaultShapeStyles(),
      locked: true,
      permissionForFullScreen: false,
      fullScreenConfig: {},
      isLayerHidden: false,
    },
    linkSettings: {
      isEnabled: false,
      link: '',
      text: 'Click here',
      icon: null,
    },
  };

  return {
    _id,
    position,
    type,
    title,
    isTitleDirty,
    content,
    settings,
    childLayers: updatedLayers,
  };
};
