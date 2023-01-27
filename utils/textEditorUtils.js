import {
  EditorState,
  SelectionState,
  convertFromRaw,
  convertToRaw
} from 'draft-js';
import { union } from 'lodash';
import {
  FONT_BG_COLOR_STYLE_PREFIX,
  FONT_COLOR_STYLE_PREFIX,
  FONT_FAMILY_STYLE_PREFIX,
  FONT_PADDING_BG_COLOR_STYLE_PREFIX,
  FONT_SIZE_STYLE_PREFIX,
  FONT_SPACING_STYLE_PREFIX,
  FONT_WEIGHT_STYLE_PREFIX,
  defaultBackgroundColor,
  defaultFontWeightConfig,
  whiteRGBA,
} from '../config/constants';
import { layerTypes } from '../interfaces/layer-types';

/** New text editor utils */

export const rawContentToEditorState = (rawContent) =>
  EditorState.createWithContent(convertFromRaw(JSON.parse(rawContent)));

export const editorStateToRawContent = (editorState) =>
  JSON.stringify(convertToRaw(editorState.getCurrentContent()));

export const prepareTextLayer = (layer) => {
  if (layer.type === layerTypes.HTML && layer.settings) {
    layer.settings.editorState = rawContentToEditorState(layer.content.value);
  }
};

export const removeTextLayerConfig = (layer) => {
  if (layer.settings?.editorState) {
    delete layer.settings.editorState;
  }
};

export const doesTextHaveStyle = (style, editorState) => {
  if (!editorState || !editorState.getCurrentInlineStyle) {
    return false;
  }

  return editorState.getCurrentInlineStyle().has(style);
};

export const doesTextHaveBlockStyle = (style, editorState) => {
  if (!editorState || !editorState.getSelection) {
    return false;
  }

  const selection = editorState.getSelection();
  const blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();

  return style === blockType;
};

export const getBlockStyle = (block) => {
  switch (block.getType()) {
    case 'left':
      return 'align-left';
    case 'justify':
      return 'align-justify';
    case 'right':
      return 'align-right';
    default:
      return 'align-center';
  }
};

export const getActiveFontSize = (editorState) => {
  if (!editorState || !editorState.getCurrentInlineStyle) {
    return 45;
  }

  const fontSizeStyle = editorState
    .getCurrentInlineStyle()
    .find((fontSize) => fontSize?.startsWith(FONT_SIZE_STYLE_PREFIX) || false);
  const fontSize = fontSizeStyle ? fontSizeStyle.split(FONT_SIZE_STYLE_PREFIX)[1] : 45;

  return Number(fontSize);
};

export const getActiveFontFamily = (editorState) => {
  if (!editorState || !editorState.getCurrentInlineStyle) {
    return 'Heebo';
  }

  const fontFamilyStyle = editorState
    .getCurrentInlineStyle()
    .find((font) => font.startsWith(FONT_FAMILY_STYLE_PREFIX));
  const fontFamily = fontFamilyStyle ? fontFamilyStyle.split(FONT_FAMILY_STYLE_PREFIX)[1] : 'Heebo';

  return fontFamily.replaceAll('_', ' ');
};

export const getActiveFontSpacing = (editorState) => {
  if (!editorState || !editorState.getCurrentInlineStyle) {
    return '1.3';
  }

  const fontSpacingStyle = editorState
    .getCurrentInlineStyle()
    .find((font) => font.startsWith(FONT_SPACING_STYLE_PREFIX));
  const fontSpacing = fontSpacingStyle ? fontSpacingStyle.split(FONT_SPACING_STYLE_PREFIX)[1] : '1.3';

  return fontSpacing.replace('_', '.');
};

export const getActiveFontWeight = (editorState, options) => {
  if (!editorState || !editorState.getCurrentInlineStyle) {
    return 400;
  }

  const fontWeightStyle = editorState
    .getCurrentInlineStyle()
    .find((font) => font.startsWith(FONT_WEIGHT_STYLE_PREFIX));
  const fontWeight = fontWeightStyle ? fontWeightStyle.split(FONT_WEIGHT_STYLE_PREFIX)[1] : 400;
  let fontWeightObj = options.find((option) => option.value === Number(fontWeight));
  if (!fontWeightObj) {
    fontWeightObj = options.find((option) => option.value === 400);
  }

  return fontWeightObj?.name ?? options[0].name;
};


export const getDefaultFontWeight = (fontWeights) => {
  return fontWeights.find((weight) => weight.value === 400) || fontWeights[0];
};

export const getFontWeights = (fontWeight) =>
  fontWeight.map((weight) => {
    return {
      name: defaultFontWeightConfig[Number(weight)],
      value: Number(weight),
    };
  });

export const getActiveFontColor = (editorState) => {
  if (!editorState || !editorState.getCurrentInlineStyle) {
    return whiteRGBA;
  }

  const fontColorStyle = editorState
    .getCurrentInlineStyle()
    .find((font) => font.startsWith(FONT_COLOR_STYLE_PREFIX));

  const fontColor = fontColorStyle ? fontColorStyle.split(FONT_COLOR_STYLE_PREFIX)[1] : whiteRGBA;

  return fontColor.replace('_', ' ');
};

export const getActiveFontBgColor = (editorState) => {
  if (!editorState || !editorState.getCurrentInlineStyle) {
    return defaultBackgroundColor;
  }

  const fontBgColorStyle = editorState
    .getCurrentInlineStyle()
    .find((font) => font.startsWith(FONT_BG_COLOR_STYLE_PREFIX));

  const fontBgColor = fontBgColorStyle ? fontBgColorStyle.split(FONT_BG_COLOR_STYLE_PREFIX)[1] : defaultBackgroundColor;

  return fontBgColor.replace('_', ' ');
};

export const getFontOptionName = (font, withPrefix = true) => {
  const fontFamily = font.replaceAll(' ', '_');

  return `${withPrefix ? FONT_FAMILY_STYLE_PREFIX : ''}${fontFamily}`;
};

export const selectAllText = (editorState) => {
  const currentContent = editorState.getCurrentContent();

  return editorState.getSelection().merge({
    anchorKey: currentContent.getFirstBlock().getKey(),
    anchorOffset: 0,
    focusOffset: currentContent.getLastBlock().getText().length,
    focusKey: currentContent.getLastBlock().getKey(),
  });
};

export const selectCurrentBlockText = (editorState) => {
  const startKey = editorState.getSelection().getStartKey();
  const selectedBlock = editorState.getCurrentContent().getBlockForKey(startKey);

  return editorState.getSelection().merge({
    anchorKey: selectedBlock.getKey(),
    anchorOffset: 0,
    focusOffset: selectedBlock.getText().length,
    focusKey: selectedBlock.getKey(),
  });
};

export const reverseTextSelection = (selection) => {
  return selection.merge({
    isBackward: !selection.getIsBackward(),
    anchorKey: selection.getFocusKey(),
    anchorOffset: selection.getFocusOffset(),
    focusOffset: selection.getAnchorOffset(),
    focusKey: selection.getAnchorKey(),
  });
};

export const getSelectedBlocks = (contentState, startKey, endKey) => {
  const isSameBlock = startKey === endKey;
  const startingBlock = contentState.getBlockForKey(startKey);
  const selectedBlocks = [startingBlock];

  if (!isSameBlock) {
    let blockKey = startKey;

    while (blockKey !== endKey) {
      const nextBlock = contentState.getBlockAfter(blockKey);
      if (nextBlock) {
        selectedBlocks.push(nextBlock);
        blockKey = nextBlock.getKey();
      }
    }
  }

  return selectedBlocks;
};

export const getCurrentSelectionStyles = (editorState) => {
  const selection = editorState.getSelection();
  const content = editorState.getCurrentContent();
  const blocks = getSelectedBlocks(content, selection.getAnchorKey(), selection.getFocusKey());

  const start = selection.getAnchorOffset();
  const end = selection.getFocusOffset();
  let styles = [];
  blocks.forEach((block) => {
    const chars = block.getCharacterList();

    for (let i = start; i < end; i++) {
      const char = chars.get(i);
      if (char) {
        const style = char.getStyle();
        styles = union(styles, style.toJS());
      }
    }
  });

  return styles;
};

export const loadFontFamily = (font) => {
  if (font && font.fontType === 'GOOGLE_FONT') {
    const fontWeights = font?.weight ?? font?.variants ?? [];
    const href = `https://fonts.googleapis.com/css2?family=${font?.family.split(' ').join('+')}:wght@${fontWeights.join(
      ';',
    )}&display=swap`;
    const link = document.querySelector(`link[href="${href}"]`);
    if (!link) {
      const style = document.createElement('link');
      style.rel = 'stylesheet';
      style.href = href;
      document.getElementsByTagName('head')[0].appendChild(style);
    }
  }
};

export const loadFonts = (fonts) => fonts.forEach((font) => loadFontFamily(font));

export const getCustomStyleFn = (style) => getCustomStyle(style);

export const getCustomStyle = (style) => {
  const styleNames = style.toJS();
  return styleNames.reduce((styles, styleName) => {
    if (styleName.startsWith(FONT_COLOR_STYLE_PREFIX)) {
      styles.color = styleName.split(FONT_COLOR_STYLE_PREFIX)[1];
    }

    if (styleName.startsWith(FONT_BG_COLOR_STYLE_PREFIX)) {
      styles.backgroundColor = styleName.split(FONT_BG_COLOR_STYLE_PREFIX)[1];
    }

    if (styleName.startsWith(FONT_PADDING_BG_COLOR_STYLE_PREFIX)) {
      styles.paddingLeft = styleName.split(FONT_PADDING_BG_COLOR_STYLE_PREFIX)[1];
      styles.paddingRight = styleName.split(FONT_PADDING_BG_COLOR_STYLE_PREFIX)[1];
    }

    if (styleName.startsWith(FONT_FAMILY_STYLE_PREFIX)) {
      const tempFontName = styleName.split(FONT_FAMILY_STYLE_PREFIX)[1].replace('_', ' ');
      styles.fontFamily = `"${tempFontName.replaceAll('_', ' ')}"`;
    }

    if (styleName.startsWith(FONT_SPACING_STYLE_PREFIX)) {
      styles.lineHeight = styleName.split(FONT_SPACING_STYLE_PREFIX)[1].replace('_', '.');
    }

    if (styleName.startsWith(FONT_WEIGHT_STYLE_PREFIX)) {
      styles.fontWeight = styleName.split(FONT_WEIGHT_STYLE_PREFIX)[1];
    }

    if (styleName.startsWith(FONT_SIZE_STYLE_PREFIX)) {
      styles.fontSize = `${styleName.split(FONT_SIZE_STYLE_PREFIX)[1] / 16}em`;
    }

    styles.whiteSpace = 'break-spaces';

    return styles;
  }, {});
};

export const moveSelectionToEnd = (editorState) => {
  const content = editorState.getCurrentContent();
  const blockMap = content.getBlockMap();
  const key = blockMap.last().getKey();
  const length = blockMap.last().getLength();

  const selection = new SelectionState({
    anchorKey: key,
    anchorOffset: length,
    focusKey: key,
    focusOffset: length,
  });

  return EditorState.acceptSelection(editorState, selection);
};

export const isTextEditorBlocksDifferent = (editorState, currentEditorState) => {
  const currentEditorStateBlockMap = currentEditorState.getCurrentContent().getBlockMap().toJS();
  const editorStateBlockMap = editorState.getCurrentContent().getBlockMap().toJS();

  return Object.keys(currentEditorStateBlockMap).some(
    (key) => currentEditorStateBlockMap[key].type !== editorStateBlockMap[key].type,
  );
};

export const getAllFontFamilies = (cuts) => {
  const fontFamilies = new Set([]);
  cuts.forEach((cut) => {
    cut?.layers?.forEach((layer) => {
      if (layer?.type === layerTypes.GROUP) {
        layer.childLayers?.forEach((childLayer) => {
          if (childLayer.type === layerTypes.HTML) {
            const content = JSON.parse(childLayer?.content?.value);
            content.blocks.forEach((block) => {
              block.inlineStyleRanges.forEach((styleObj) => {
                if (styleObj.style.startsWith(FONT_FAMILY_STYLE_PREFIX)) {
                  const tempFontName = styleObj.style.split(FONT_FAMILY_STYLE_PREFIX)[1].replace('_', ' ');
                  fontFamilies.add(tempFontName.replaceAll('_', ' '));
                }
              });
            });
          }
        });
      }

      if (layer?.type === layerTypes.HTML) {
        const content = JSON.parse(layer?.content?.value);
        content.blocks.forEach((block) => {
          block.inlineStyleRanges.forEach((styleObj) => {
            if (styleObj.style.startsWith(FONT_FAMILY_STYLE_PREFIX)) {
              const tempFontName = styleObj.style.split(FONT_FAMILY_STYLE_PREFIX)[1].replace('_', ' ');
              fontFamilies.add(tempFontName.replaceAll('_', ' '));
            }
          });
        });
      }
    });
  });

  return fontFamilies;
};
