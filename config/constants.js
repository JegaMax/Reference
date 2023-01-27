import { Zoom } from 'react-toastify';
import {
  EDITOR_MODAL_HTML, EDITOR_MODAL_MEDIA_UNSPLASH,
  EDITOR_MODAL_MEDIA_UPLOAD,
  EDITOR_MODAL_OUTLINK,
  EDITOR_MODAL_SHAPE,
  EDITOR_MODAL_TEMPLATES
} from '../components/editor-modals/constants/editor-modal-type-names';
import { layerTypes } from '../interfaces/layer-types';
import { getCustomStyle } from '../utils/textEditorUtils';

import { environment } from '../config/environment';

export const storyProportion = 1.777752694847339;
export const headerHeight = 56;
export const STATUS_PUBLISHED = 'published';
export const STATUS_DRAFT = 'draft';

export const storyConstants = {
  cutsLimit: 75,
  layersLimit: 75,
  slideMinDuration: 4,
  slideMaxDuration: 120,
};

export const shapesContent = {
  square: {
    viewBox: '0 0 370 370',
    d: 'M0 0 L 370 0 L370 370 L 0 370 Z',
    translate: '0 0',
  },
  circle: {
    viewBox: '0 0 33 33',
    d: 'M1059 244.75a16.5 16.5 0 1 1 33 0 16.5 16.5 0 0 1-33 0z',
    translate: '-1059 -228.25',
  },
  cloud: {
    viewBox: '0 0 220 220',
    d:
      'M2.36308 66.1585C8.12515 20.0481 52.7944 4.91144 74.4022 1.30906C110.413 -4.68812 163.712 9.95477 175.236 44.5376C189.641 87.7661 186.04 80.568 211.249 134.604C236.458 188.639 186.04 231.861 142.825 213.849C99.6091 195.837 103.213 195.837 52.7944 185.03C2.37633 174.223 -4.83951 123.797 2.36308 66.1585Z',
    translate: '0 0',
  },
  diamond: {
    viewBox: '0 0 900 900',
    d: 'M 0 270 L 450 900 L 900 270 L 750 0 L 150 0 Z',
    translate: '0 0',
  },
  flag: {
    viewBox: '0 0 600 600',
    d: 'M 0 0 L 0 600 L 300 450 L 600 600 L 600 0 Z',
    translate: '0 0',
  },
  heart: {
    viewBox: '0 0 176 176',
    d:
      'M150.383,18.301c-7.13-3.928-15.308-6.187-24.033-6.187c-15.394,0-29.18,7.015-38.283,18.015\n' +
      '\t\t\tc-9.146-11-22.919-18.015-38.334-18.015c-8.704,0-16.867,2.259-24.013,6.187C10.388,26.792,0,43.117,0,61.878\n' +
      '\t\t\tC0,67.249,0.874,72.4,2.457,77.219c8.537,38.374,85.61,86.771,85.61,86.771s77.022-48.396,85.571-86.771\n' +
      '\t\t\tc1.583-4.819,2.466-9.977,2.466-15.341C176.104,43.124,165.716,26.804,150.383,18.301z',
    translate: '0 0',
  },
  hexagon: {
    viewBox: '0 0 800 800',
    d: 'M 0 400 L 160 800 L 640 800 L 800 400 L 640 0 L 160 0 Z',
    translate: '0 0',
  },
  line: {
    viewBox: '0 0 1000 1000',
    d: 'M 200 300 L 0 500 L 200 700 L 800 700 L 1000 500 L 800 300 Z',
    translate: '0 0',
  },
  pentagon: {
    viewBox: '0 0 720 720',
    d: 'M0 300 L 160 720 L 560 720 L 720 300 L 360 0 Z',
    translate: '0 0',
  },
  plus: {
    viewBox: '0 0 1500 1500',
    d:
      'M 0 900 L 600 900 L 600 1500 L 900 1500 L 900 900 L 1500 900 L 1500 600 L 900 600 L 900 0 L 600 0 L 600 600 L 0 600 Z',
    translate: '0 0',
  },
  star: {
    viewBox: '0 0 900 900',
    d: 'M450 0 L 300 300 L 0 325 L 225 600 L 150 900 L 450 750 L 750 900 L 675 600 L 900 325 L 600 300 Z',
    translate: '0 0',
  },
  triangle: {
    viewBox: '0 0 400 400',
    d: 'M200 0 L 0 400 L400 400 Z',
    translate: '0 0',
  },
};
export const shapesWithoutRoundAngles = ['circle', 'cloud', 'heart'];

export const layersMenuConfig = [
  {
    name: layerTypes.TEMPLATES,
    imageSrc: 'template.svg',
    imageActiveSrc: 'template-active.svg',
    imageDisabledSrc: 'template-disabled.svg',
    matTooltip: 'Templates',
    classes: {},
    modalType: EDITOR_MODAL_TEMPLATES,
  },
  {
    name: layerTypes.HTML,
    imageSrc: 'new-text.svg',
    imageActiveSrc: 'new-text-active.svg',
    imageDisabledSrc: 'new-text-disabled.svg',
    modalType: EDITOR_MODAL_HTML,
    matTooltip: 'Text',
    classes: {},
  },
  {
    name: layerTypes.UPLOAD,
    imageSrc: 'new-upload.svg',
    imageActiveSrc: 'new-upload-active.svg',
    imageDisabledSrc: 'new-upload-disabled.svg',
    matTooltip: 'Uploads',
    classes: {},
    modalType: EDITOR_MODAL_MEDIA_UPLOAD,
  },
  {
    name: layerTypes.IMAGE,
    imageSrc: 'new-image.svg',
    imageActiveSrc: 'new-image-active.svg',
    imageDisabledSrc: 'new-image-disabled.svg',
    matTooltip: 'Images',
    classes: {},
    modalType: EDITOR_MODAL_MEDIA_UNSPLASH,
  },
  {
    name: layerTypes.SHAPE,
    imageSrc: 'new-shape.svg',
    imageActiveSrc: 'new-shape-active.svg',
    imageDisabledSrc: 'new-shape-disabled.svg',
    matTooltip: 'Shapes',
    classes: {},
    modalType: EDITOR_MODAL_SHAPE,
  },
  {
    name: layerTypes.OUTLINK,
    imageSrc: 'new-cta-link.svg',
    imageActiveSrc: 'new-cta-link-active.svg',
    imageDisabledSrc: 'new-cta-link-disabled.svg',
    modalType: EDITOR_MODAL_OUTLINK,
    matTooltip: 'CTA',
    classes: { locked: false },
  },
];

export const colorPickerConfig = {
  ifOpenColorPicker: false,
  ifFirstOpen: true,
  colorPickerToggle: false,
  ifOpenBgColor: false,
};

export const titleConfig = {
  fillColor: 'Choose Fill Style',
  borderColor: 'Choose Border Style',
  bgColor: 'Background style',
};

export const directionConfig = {
  horizontalArray: [
    { prop: 'left', value: 0 },
    { prop: 'center', value: 50 },
    { prop: 'right', value: 100 },
  ],
  verticalArray: [
    { prop: 'top', value: 0 },
    { prop: 'middle', value: 50 },
    { prop: 'bottom', value: 100 },
  ],
  horizontalValue: 'center',
  verticalValue: 'middle',
};

export const emailRegex = new RegExp(
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
);

export const gifSearchTypes = {
  gifs: 'gifs',
  stickers: 'stickers',
};

export const alignConfig = [
  {
    name: 'top',
    imageSrc: './images/align-section/Align_Top.svg',
  },
  {
    name: 'centerY',
    imageSrc: './images/align-section/Align_CenterY.svg',
  },
  {
    name: 'bottom',
    imageSrc: './images/align-section/Align_Bottom.svg',
  },
  {
    name: 'left',
    imageSrc: './images/align-section/Align_Left.svg',
  },
  {
    name: 'centerX',
    imageSrc: './images/align-section/Align_CenterX.svg',
  },
  {
    name: 'right',
    imageSrc: './images/align-section/Align_Right.svg',
  },
];

export const limits = {
  rotate: [-180, 180],
  opacity: [0, 100],
  round: [0, 100],
  shadow: [0, 100],
  width: [0, 10000],
  height: [0, 10000],
  animationDuration: [1, 15],
  animationDelay: [0, 10],
};

export const layerSetting = {
  rotate: '0',
  opacity: '100',
  shadow: '0',
  margin: '0',
  position: '1',
};

export const defaultTextLayerContent =
  '{"blocks":[{"key":"1eip","text":"Type something","type":"center","depth":0,"inlineStyleRanges":[{"offset":0,"length":14,"style":"FONT_COLOR_rgb(255, 255, 255, 1)"},{"offset":0,"length":14,"style":"FONT_FAMILY_Heebo"},{"offset":0,"length":14,"style":"FONT_SIZE_45"},{"offset":0,"length":14,"style":"FONT_SPACING_1_5"}],"entityRanges":[],"data":{}}],"entityMap":{}}';

export const defaultTextLayerHtml =
  '<p style="text-align: center; font-size: inherit;"><span style="color: rgba(255, 255, 255, 1); font-family: Heebo; font-size: 2.8125em; line-height: 1.5">Type something</span></p>';

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

export const defaultFontWeightConfig = {
  100: 'Thin',
  200: 'Extra light',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'Semi Bold',
  700: 'Bold',
  800: 'Extra Bold',
  900: 'Ultra Bold',
};

export const columnType = {
  HALF : '50%',
  ONE_THIRD : '33%',
  TWO_THIRDS : '66%',
  WHOLE : '100%',
}

export const COLORS = {
  PRIMARY: '#f6522b',
  WHITE: '#ffffff',
  SHADE_900: '#14141f',
  SHADE_700: '#21212c',
  SHADE_500: '#2e2e38',
  SHADE_300: '#505062',
  SHADE_100: '#ababba',

  SHADE_900_o95: 'rgba(20, 20, 31, 0.95)',

  PRIMARY_o85: 'rgba(246, 82, 43, 0.85)',
  WHITE_o85: 'rgba(255, 255, 255, 0.85)',
  SHADE_900_o85: 'rgba(20, 20, 31, 0.85)',
  SHADE_700_o85: 'rgba(33, 33, 44, 0.85)',
  SHADE_500_o85: 'rgba(46, 46, 56, 0.85)',
  SHADE_300_o85: 'rgba(80, 80, 98, 0.85)',
  SHADE_100_o85: 'rgba(171, 171, 186, 0.85)',

  PRIMARY_o20: 'rgba(246, 82, 43, 0.2)',
  WHITE_o20: 'rgba(255, 255, 255, 0.2)',
  SHADE_900_o20: 'rgba(20, 20, 31, 0.2)',

  PRIMARY_o10: 'rgba(246, 82, 43, 0.1)',
  WHITE_o10: 'rgba(255, 255, 255, 0.1)',
  BLACK_o18: 'rgba(0, 0, 0, 0.18)',
  AMP_DEFAULT: 'rgba(238, 238, 238, 1)',
};

export const whiteRGBA = 'rgba(255, 255, 255, 1)';
export const blackRGBA = 'rgba(20, 20, 31, 1)';
export const defaultRightColor = whiteRGBA;
export const defaultShapeLeftColor = whiteRGBA;
export const defaultBgLeftColor = 'rgba(67, 67, 76, 1)';
export const defaultResetBgLeftColor = COLORS.AMP_DEFAULT;
export const defaultCTAFillLeftColor = 'rgba(246, 82, 43, 1)';
export const defaultBackgroundColor = 'rgba(0, 0, 0, 0)';
export const defaultCTABorderLeftColor = defaultBackgroundColor;
export const defaultCTATextColor = blackRGBA;
export const defaultTextFontColor = whiteRGBA;

export const nonFullscreenAnimations = [16, 17, 18, 19];

export const posterTypes = {
  portrait: 'Portrait',
  landscape: 'Landscape',
  square: 'Square',
};

export const storyIds = {
  editor: 'ampViewerPlaceholder',
  exportModal: 'ampModalViewerPlaceholder',
};

export const widgetIds = {
  editor: 'ampViewerPlaceholder',
  exportModal: 'ampModalViewerPlaceholder',
};

export const googleAnalyticsRegex = new RegExp(/^ua-\d{4,9}-\d{1,4}$/i);
export const snippetHeadRegex = new RegExp(/^<script.*(?=.*\bcustom-element\b)(?=.*\bsrc\b).*>$/);
export const snippetBodyRegex = new RegExp(
  /<amp-analytics((.|\n)*)<script((.|\n)*)<\/script>((.|\n)*)<\/amp-analytics>/,
);
export const domainNameRegex = new RegExp(/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/);

export const SNIPPET_LIVE = 'Live';
export const SNIPPET_PENDING = 'Pending';
export const SNIPPET_REJECTED = 'Rejected';
export const SNIPPET_STATUSES = [SNIPPET_LIVE, SNIPPET_PENDING, SNIPPET_REJECTED];

export const imageTypesArray = ['jpg', 'jpeg', 'png', 'svg'];
export const videoTypesArray = ['mp4', 'mpeg-4', 'mov', 'wmv', 'avi', 'quicktime'];
export const nonThumbnailVideoTypesArray = ['mov', 'avi', 'quicktime'];
export const imageAcceptedTypes = '.jpg, .jpeg, .png, .svg';
export const videoAcceptedTypes = '.mp4, .mpeg-4, .mov, .wmv, .avi';
export const allAcceptedFileTypes = imageAcceptedTypes.concat(', ', videoAcceptedTypes);

export const VIDEO_PROCESSING_STATUS_DONE = 'DONE';
export const VIDEO_PROCESSING_STATUS_REJECTED = 'REJECTED';

export const ctaDimensions = {
  width: 80,
  height: 22,
};

export const outlinkDimensions = {
  width: 123,
  height: 45,
};

export const USER_ROLES = {
  USER: 'APP_USER',
  ADMIN: 'APP_ADMIN',
};

export const TEXT_INLINE_STYLES = {
  ITALIC: 'ITALIC',
  UNDERLINE: 'UNDERLINE',
  BOLD: 'FONT_WEIGHT_BOLD',
};

export const TEXT_BLOCK_STYLES = {
  ALIGN_LEFT: 'left',
  ALIGN_RIGHT: 'right',
  ALIGN_CENTER: 'center',
  ALIGN_JUSTIFY: 'justify',
};

export const DEFAULT_TOAST_CONFIG = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  transition: Zoom,
};

export const editorCustomStyleMap = {
  FONT_SIZE_5: {
    fontSize: '5px',
  },
  FONT_SIZE_10: {
    fontSize: '10px',
  },
  FONT_SIZE_15: {
    fontSize: '15px',
  },
  FONT_SIZE_20: {
    fontSize: '20px',
  },
  FONT_SIZE_25: {
    fontSize: '25px',
  },
  FONT_SIZE_30: {
    fontSize: '30px',
  },
  FONT_SIZE_35: {
    fontSize: '35px',
  },
  FONT_SIZE_40: {
    fontSize: '40px',
  },
  FONT_SIZE_45: {
    fontSize: '45px',
  },
  FONT_SIZE_50: {
    fontSize: '50px',
  },
  FONT_SIZE_55: {
    fontSize: '55px',
  },
  FONT_SIZE_60: {
    fontSize: '60px',
  },
  FONT_SIZE_65: {
    fontSize: '65px',
  },
  FONT_SIZE_70: {
    fontSize: '70px',
  },
  FONT_SIZE_75: {
    fontSize: '75px',
  },
  FONT_SIZE_80: {
    fontSize: '80px',
  },
  FONT_SIZE_85: {
    fontSize: '85px',
  },
  FONT_SIZE_90: {
    fontSize: '90px',
  },
  FONT_SIZE_95: {
    fontSize: '95px',
  },
  FONT_SIZE_100: {
    fontSize: '100px',
  },
  FONT_SIZE_105: {
    fontSize: '105px',
  },
  FONT_SIZE_110: {
    fontSize: '110px',
  },
  FONT_SIZE_115: {
    fontSize: '115px',
  },
  FONT_SIZE_120: {
    fontSize: '120px',
  },
  FONT_SIZE_125: {
    fontSize: '125px',
  },
  FONT_SIZE_130: {
    fontSize: '130px',
  },
  FONT_SIZE_135: {
    fontSize: '135px',
  },
  FONT_SIZE_140: {
    fontSize: '140px',
  },
  FONT_SIZE_145: {
    fontSize: '145px',
  },
  FONT_SIZE_150: {
    fontSize: '150px',
  },
  FONT_SIZE_155: {
    fontSize: '155px',
  },
  FONT_SIZE_160: {
    fontSize: '160px',
  },
  FONT_SIZE_165: {
    fontSize: '165px',
  },
  FONT_SIZE_170: {
    fontSize: '170px',
  },
  FONT_SIZE_175: {
    fontSize: '175px',
  },
  FONT_SIZE_180: {
    fontSize: '180px',
  },
  FONT_SIZE_185: {
    fontSize: '185px',
  },
  FONT_SIZE_190: {
    fontSize: '190px',
  },
  FONT_SIZE_195: {
    fontSize: '195px',
  },
  FONT_SIZE_200: {
    fontSize: '200px',
  },
  FONT_SIZE_205: {
    fontSize: '205px',
  },
  FONT_SIZE_210: {
    fontSize: '210px',
  },
  FONT_SIZE_215: {
    fontSize: '215px',
  },
  FONT_SIZE_220: {
    fontSize: '220px',
  },
  FONT_SIZE_225: {
    fontSize: '225px',
  },
  FONT_SIZE_230: {
    fontSize: '230px',
  },
  FONT_SIZE_235: {
    fontSize: '235px',
  },
  FONT_SIZE_240: {
    fontSize: '240px',
  },
  FONT_SIZE_245: {
    fontSize: '245px',
  },
  FONT_SIZE_250: {
    fontSize: '250px',
  },
  FONT_SIZE_255: {
    fontSize: '255px',
  },
  FONT_SIZE_260: {
    fontSize: '260px',
  },
  FONT_SIZE_265: {
    fontSize: '265px',
  },
  FONT_SIZE_270: {
    fontSize: '270px',
  },
  FONT_SIZE_275: {
    fontSize: '275px',
  },
  FONT_SIZE_280: {
    fontSize: '280px',
  },
  FONT_SIZE_285: {
    fontSize: '285px',
  },
  FONT_SIZE_290: {
    fontSize: '290px',
  },
  FONT_SIZE_295: {
    fontSize: '295px',
  },
  FONT_SIZE_300: {
    fontSize: '300px',
  },
  FONT_SPACING_0_5: {
    lineHeight: 0.5,
  },
  FONT_SPACING_1: {
    lineHeight: 1,
  },
  FONT_SPACING_1_5: {
    lineHeight: 1.5,
  },
  FONT_SPACING_2: {
    lineHeight: 2,
  },
  FONT_SPACING_2_5: {
    lineHeight: 2.5,
  },
  FONT_SPACING_3: {
    lineHeight: 3,
  },
  FONT_SPACING_3_5: {
    lineHeight: 3.5,
  },
  FONT_SPACING_4: {
    lineHeight: 4,
  },
  FONT_SPACING_4_5: {
    lineHeight: 4.5,
  },
  FONT_SPACING_5: {
    lineHeight: 5,
  },
  FONT_SPACING_5_5: {
    lineHeight: 5.5,
  },
  FONT_SPACING_6: {
    lineHeight: 6,
  },
  FONT_WEIGHT_100: {
    fontWeight: 100,
  },
  FONT_WEIGHT_200: {
    fontWeight: 200,
  },
  FONT_WEIGHT_300: {
    fontWeight: 300,
  },
  FONT_WEIGHT_400: {
    fontWeight: 400,
  },
  FONT_WEIGHT_500: {
    fontWeight: 500,
  },
  FONT_WEIGHT_600: {
    fontWeight: 600,
  },
  FONT_WEIGHT_700: {
    fontWeight: 6700,
  },
  FONT_WEIGHT_800: {
    fontWeight: 800,
  },
  FONT_WEIGHT_900: {
    fontWeight: 900,
  },
};

export const fontSizes = [8, 24, 28, 32, 36, 48, 80, 120, 180];

export const textSpacings = [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6];

export const FILE_SIZE_LIMIT_IMAGE = 25;
export const FILE_SIZE_LIMIT_VIDEO = 100;
export const FONT_SIZE_STYLE_PREFIX = 'FONT_SIZE_';
export const FONT_SPACING_STYLE_PREFIX = 'FONT_SPACING_';
export const FONT_FAMILY_STYLE_PREFIX = 'FONT_FAMILY_';
export const FONT_WEIGHT_STYLE_PREFIX = 'FONT_WEIGHT_';
export const FONT_COLOR_STYLE_PREFIX = 'FONT_COLOR_';
export const FONT_BG_COLOR_STYLE_PREFIX = 'FONT_BG_COLOR_';
export const FONT_PADDING_BG_COLOR_STYLE_PREFIX = 'FONT_PADDING_BG_COLOR_';
export const TEXT_DECORATION_PREFIX = 'TEXT_DECORATION_';

export const defaultDomain = environment?.defaultStoriesHost?.replace(/(^\w+:|^)\/\//, '') ?? 'cutnut.tv';

export const defaultStoryName = 'Untitled Story';

export const textExportingOptions = {
  inlineStyles: {
    ITALIC: { element: 'i' },
  },
  inlineStyleFn: (styles) => {
    const style = getCustomStyle(styles);
    return {
      element: 'span',
      style,
    };
  },
  blockStyleFn: (block) => {
    const textAlign = block.getType() === 'unstyled' ? 'center' : block.getType();

    return {
      style: {
        textAlign,
        fontSize: 'inherit',
      },
    };
  },
};

export const DEFAULT_EDITOR_FRAME_SIZE = {
  WIDTH: 354.38,
  HEIGHT: 630,
};
export const ZOOM_PERCENTAGES = [25, 50, 75, 100, 125, 150, 200, 300];
export const ZOOM_TYPE = {
  IN : 'IN',
  OUT : 'OUT',
}

export const SCROLL_DIRECTION = {
  VERTICAL : 'VERTICAL',
  HORIZONTAL : 'HORIZONTAL',
}

export const EDITOR_LAYER_CURSOR = {
  MOVE : 'move',
  TEXT : 'text',
  AUTO : 'auto',
}

export const PENDING_MEDIA_QUEUE = 'pendingMediaQueue';

export const REDUX_UNDO_ACTION_TYPES = {
  UNDO : 'UNDO',
  REDO : 'REDO',
}

export const USER_ROLE_OPTIONS = [
  { name: 'Admin', value: 'admin' },
  { name: 'Creator', value: 'user' },
  { name: 'Remove', value: 'remove', topDivider: true },
];

export const STORY_LOCK_MODE_TIME = 60;

export const FONT_TYPE = {
  GOOGLE_FONT : 'GOOGLE_FONT',
  USER_FONT : 'USER_FONT',
}

export const passwordStrength = ['Too weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
export const passwordStrengthStyles = {
  fontFamily: 'Heebo',
  fontSize: '12px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '22px',
  letterSpacing: '0.01em',
  textAlign: 'left',
  color: 'var(--white)',
  marginTop: '0px',
  alignSelf: 'flex-end',
};

export const defaultHeeboObject = {
  fontType: 'GOOGLE_FONT',
  weight: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  variants: [],
  family: 'Heebo',
  file: 'https://fonts.gstatic.com/s/heebo/v18/NGSpv5_NC0k9P_v6ZUCbLRAHxK1EiSycckOnz02SXQ.ttf',
  style: 'normal',
};

export const LAYERS_WITHOUT_MOVEABLE = [layerTypes.CTA_LINK, layerTypes.OUTLINK, layerTypes.GROUP];
export const STORY_DELIMINATOR = 14;
export const SNAP_POINTS = { center: true, middle: true, left: true, right: true, top: true, bottom: true };
