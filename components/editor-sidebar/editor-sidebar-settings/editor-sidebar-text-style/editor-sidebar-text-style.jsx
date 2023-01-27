import { skipToken } from '@reduxjs/toolkit/dist/query';
import EditorSidebarSectionTitle from 'components/editor-sidebar/shared/elements/editor-sidebar-section-title';
import EditorSidebarColumn from 'components/editor-sidebar/shared/structure/editor-sidebar-column';
import EditorSidebarRowWrapper from 'components/editor-sidebar/shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from 'components/editor-sidebar/shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from 'components/editor-sidebar/shared/structure/editor-sidebar-section-wrapper';
import {
  BOLD,
  FONT_STYLE_BOLD,
  FONT_STYLE_ITALIC,
  FONT_STYLE_UNDERLINE,
  HEADLINE,
  ITALIC,
  SMALL_TEXT,
  SUBHEADLINE,
  TEXT,
  TITLE,
  UNDERLINE
} from 'components/settings/font-settings/shared/constants';
import {
  FONT_FAMILY_STYLE_PREFIX,
  FONT_SIZE_STYLE_PREFIX,
  FONT_TYPE,
  FONT_WEIGHT_STYLE_PREFIX,
  textExportingOptions,
  TEXT_INLINE_STYLES
} from 'config/constants';
import { EditorState, Modifier } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useAppDispatch, useAppSelector } from 'hooks';
import produce from 'immer';
import { isNil, set } from 'lodash';
import { memo, useCallback, useEffect, useMemo } from 'react';
import { addGoogleFont, addStoryFont } from 'appredux/features/amp-story/ampStorySlice';
import { setCurrentTextPresetLabel } from 'appredux/features/editor/helpers/helpersSlice';
import { useGoogleFontsListQuery, useWorkspaceFontsListQuery } from 'appredux/services/fonts/fonts';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import {
  doesTextHaveStyle,
  editorStateToRawContent,
  getActiveFontFamily,
  getActiveFontSize,
  getCurrentSelectionStyles,
  loadFontFamily,
  reverseTextSelection,
  selectAllText
} from 'utils/textEditorUtils';
import Select from '../../../shared/select';

const options = [
  { value: 'title', name: TITLE, fontFamily: 'Heebo', fontSize: 24, fontWeight: 500 },
  { value: 'headLine', name: HEADLINE, fontFamily: 'Heebo', fontSize: 18, fontWeight: 500 },
  { value: 'subHeadline', name: SUBHEADLINE, fontFamily: 'Heebo', fontSize: 14, fontWeight: 400 },
  { value: 'normalText', name: TEXT, fontFamily: 'Heebo', fontSize: 12, fontWeight: 400 },
  { value: 'smallText', name: SMALL_TEXT, fontFamily: 'Heebo', fontSize: 10, fontWeight: 400 },
];

const getEditorStateAndSelection = (currentEditorState) => {
  let editorState = currentEditorState;
  let selection = editorState?.getSelection();

  if (editorState && selection?.getStartOffset() === selection?.getEndOffset()) {
    selection = selectAllText(editorState);
    editorState = EditorState.acceptSelection(editorState, selection);
  }

  return {
    selection,
    editorState,
  };
};

const createInlineStyles = (prefix, value) => [
  {
    style: `${prefix}${value}`,
    prefix,
  },
];

const changeFontSize = (selectedFontSize) => {
  const textSize = selectedFontSize;
  const valueFloat = parseFloat(textSize.toString());
  const newTextSize = valueFloat < 5 ? 5 : valueFloat > 300 ? 300 : valueFloat;
  const selectedTextSize = Math.round(typeof selectedFontSize === 'number' ? selectedFontSize : newTextSize);
  const inlineStyles = createInlineStyles(FONT_SIZE_STYLE_PREFIX, selectedTextSize);

  return inlineStyles;
};

const EditorSidebarTextStyle = ({ layer, parentLayer, handleBatchLayerChange }) => {
  const dispatch = useAppDispatch();

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const storyUploadedFonts = useAppSelector((state) => state.ampStory.present.fonts);
  const storyGoogleFonts = useAppSelector((state) => state.ampStory.present.googleFonts);
  const textPresetLabel = useAppSelector((state) => state.helpers.currentTextPresetLabel);

  const { data: googleFonts } = useGoogleFontsListQuery();
  const { data: workspaceFonts } = useWorkspaceFontsListQuery(selectedWorkspaceId ?? skipToken);
  const { presets } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      presets: workspace?.stylePresets,
    }),
  });

  const isActiveLayerLocked = layer?.settings.generalSettings.locked;

  const activeLayerHasUnderline = useMemo(
    () => doesTextHaveStyle(TEXT_INLINE_STYLES.UNDERLINE, layer?.settings.editorState),
    [layer?.settings.editorState],
  );

  const activeLayerHasItalic = useMemo(
    () => doesTextHaveStyle(TEXT_INLINE_STYLES.ITALIC, layer?.settings.editorState),
    [layer?.settings.editorState],
  );

  const onChangeInlineStyle = useCallback(
    (inlineStyles) => {
      if (isActiveLayerLocked || !layer?.settings?.editorState) {
        return;
      }

      let { editorState, selection } = getEditorStateAndSelection(layer?.settings.editorState);

      if (!editorState || !selection) {
        return;
      }

      let contentState = editorState.getCurrentContent();

      if (selection.getIsBackward()) {
        selection = reverseTextSelection(selection);
        editorState = EditorState.acceptSelection(editorState, selection);
      }

      const currentSelectionStyles = getCurrentSelectionStyles(editorState);

      const allInlineStyles = Object.values(inlineStyles).map((item) => {
        return item.style;
      });

      const hasBold = allInlineStyles.includes(BOLD);
      const hasItalic = allInlineStyles.includes(ITALIC);
      const hasUnderline = allInlineStyles.includes(UNDERLINE);

      inlineStyles.forEach((inlineStyle) => {
        if (!selection) {
          return;
        }

        const similarStyles = currentSelectionStyles.filter((style) => style.startsWith(inlineStyle.prefix));
        // If the target new layer does not have bold, italic or underline will be removed
        if (!hasBold) {
          similarStyles.push(BOLD);
        }
        if (!hasItalic) {
          similarStyles.push(ITALIC);
        }
        if (!hasUnderline) {
          similarStyles.push(UNDERLINE);
        }
        if (similarStyles.length > 0) {
          similarStyles.forEach((similarStyle) => {
            if (!selection) {
              return;
            }
            contentState = Modifier.removeInlineStyle(contentState, selection, similarStyle);
          });
        }
        contentState = Modifier.applyInlineStyle(contentState, selection, inlineStyle.style);
      });

      editorState = EditorState.push(editorState, contentState, 'change-inline-style');
      const newEditorState = EditorState.set(editorState, { undoStack: [], redoStack: [], allowUndo: false });
      const rawState = editorStateToRawContent(newEditorState);
      const html = stateToHTML(contentState, textExportingOptions);

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'content.html', html);
              set(draftState, 'content.value', rawState);
              set(draftState, 'settings.editorState', newEditorState);
            });

            return nextState;
          }

          return cl;
        });

        handleBatchLayerChange([{ field: 'childLayers', value: updatedLayers }]);
        return;
      }

      handleBatchLayerChange([
        { field: 'content.html', value: html },
        { field: 'content.value', value: rawState },
        {
          field: 'settings.editorState',
          value: newEditorState,
        },
      ]);
    },
    [
      isActiveLayerLocked,
      layer?.settings.editorState,
      layer._id,
      parentLayer?._id,
      parentLayer?.childLayers,
      handleBatchLayerChange,
    ],
  );

  const changeFontStyles = useCallback(
    (selectedFontFamily, fontWeight, style) => {
      const fontFamily = selectedFontFamily.replaceAll('_', ' ');
      const existingFont = [...storyUploadedFonts, ...storyGoogleFonts].find(
        (storyFont) => storyFont.family === fontFamily,
      );
      let selectedFont = existingFont;

      if (!existingFont) {
        selectedFont = [...(workspaceFonts ?? []), ...(googleFonts ?? [])].find(
          (storyFont) => storyFont.family === fontFamily,
        );

        loadFontFamily(selectedFont);
        if (selectedFont?.fontType === FONT_TYPE.GOOGLE_FONT) {
          dispatch(
            addGoogleFont({
              ...selectedFont,
              style: 'normal',
            }),
          );
        } else if (selectedFont?.fontType === FONT_TYPE.USER_FONT) {
          dispatch(
            addStoryFont({
              ...selectedFont,
              style: 'normal',
            }),
          );
        }
      }

      if (selectedFont) {
        const preparedOption = selectedFontFamily.replaceAll(' ', '_');
        const inlineStyles = [
          { style: `${FONT_FAMILY_STYLE_PREFIX}${preparedOption}`, prefix: FONT_FAMILY_STYLE_PREFIX },
        ];

        if (style?.includes(FONT_STYLE_BOLD)) {
          const hasBoldOption = selectedFont?.weight?.find((w) => w === 700);

          if (hasBoldOption) {
            inlineStyles.push({ style: `${FONT_WEIGHT_STYLE_PREFIX}700`, prefix: FONT_WEIGHT_STYLE_PREFIX });
          }

          inlineStyles.push({ style: TEXT_INLINE_STYLES.BOLD, prefix: FONT_WEIGHT_STYLE_PREFIX });
        } else {
          inlineStyles.push({ style: `${FONT_WEIGHT_STYLE_PREFIX}${fontWeight}`, prefix: FONT_WEIGHT_STYLE_PREFIX });
        }

        if (style?.includes(FONT_STYLE_ITALIC)) {
          inlineStyles.push({ style: ITALIC, prefix: ITALIC });
        }

        if (style?.includes(FONT_STYLE_UNDERLINE)) {
          inlineStyles.push({ style: UNDERLINE, prefix: UNDERLINE });
        }

        return inlineStyles;
      }
    },
    [dispatch, googleFonts, storyGoogleFonts, storyUploadedFonts, workspaceFonts],
  );

  const onTextStyleChange = useCallback(
    (option) => {
      if (presets) {
        const preset = presets[option];
        const inlineStylesArr = changeFontStyles(preset.fontFamily, preset.weight, preset.style);
        const fontSizeInlineStyles = changeFontSize(preset.size);

        inlineStylesArr?.push(...fontSizeInlineStyles);

        if (inlineStylesArr) {
          onChangeInlineStyle(inlineStylesArr);
        }
      }
    },
    [presets, changeFontStyles, onChangeInlineStyle],
  );

  useEffect(() => {
    if (layer?.settings.editorState && presets) {
      const fontFamily = getActiveFontFamily(layer?.settings.editorState);
      const fontSize = getActiveFontSize(layer?.settings.editorState);

      const fontWeightStyle = layer?.settings.editorState
        .getCurrentInlineStyle()
        .find((font) => font.startsWith(FONT_WEIGHT_STYLE_PREFIX));
      const fontWeight = fontWeightStyle ? fontWeightStyle.split(FONT_WEIGHT_STYLE_PREFIX)[1] : 400;

      const { title, headLine, subHeadline, normalText, smallText } = presets;

      if (
        title.fontFamily === fontFamily &&
        title.size === fontSize &&
        (title.weight.toString() === fontWeight || title.style?.includes(fontWeight.toString().toLowerCase())) &&
        title.style?.includes(FONT_STYLE_ITALIC) === activeLayerHasItalic &&
        title.style?.includes(FONT_STYLE_UNDERLINE) === activeLayerHasUnderline
      ) {
        dispatch(setCurrentTextPresetLabel(TITLE));
        return;
      }
      if (
        headLine.fontFamily === fontFamily &&
        headLine.size === fontSize &&
        (headLine.weight.toString() === fontWeight || headLine.style?.includes(fontWeight.toString().toLowerCase())) &&
        headLine.style?.includes(FONT_STYLE_ITALIC) === activeLayerHasItalic &&
        headLine.style?.includes(FONT_STYLE_UNDERLINE) === activeLayerHasUnderline
      ) {
        dispatch(setCurrentTextPresetLabel(HEADLINE));
        return;
      }
      if (
        subHeadline.fontFamily === fontFamily &&
        subHeadline.size === fontSize &&
        (subHeadline.weight.toString() === fontWeight ||
          subHeadline.style?.includes(fontWeight.toString().toLowerCase())) &&
        subHeadline.style?.includes(FONT_STYLE_ITALIC) === activeLayerHasItalic &&
        subHeadline.style?.includes(FONT_STYLE_UNDERLINE) === activeLayerHasUnderline
      ) {
        dispatch(setCurrentTextPresetLabel(SUBHEADLINE));
        return;
      }
      if (
        normalText.fontFamily === fontFamily &&
        normalText.size === fontSize &&
        (normalText.weight.toString() === fontWeight ||
          normalText.style?.includes(fontWeight.toString().toLowerCase())) &&
        normalText.style?.includes(FONT_STYLE_ITALIC) === activeLayerHasItalic &&
        normalText.style?.includes(FONT_STYLE_UNDERLINE) === activeLayerHasUnderline
      ) {
        dispatch(setCurrentTextPresetLabel(TEXT));
        return;
      }
      if (
        smallText.fontFamily === fontFamily &&
        smallText.size === fontSize &&
        (smallText.weight.toString() === fontWeight ||
          smallText.style?.includes(fontWeight.toString().toLowerCase())) &&
        smallText.style?.includes(FONT_STYLE_ITALIC) === activeLayerHasItalic &&
        smallText.style?.includes(FONT_STYLE_UNDERLINE) === activeLayerHasUnderline
      ) {
        dispatch(setCurrentTextPresetLabel(SMALL_TEXT));
        return;
      } else {
        dispatch(setCurrentTextPresetLabel(''));
        return;
      }
    }
  }, [activeLayerHasItalic, activeLayerHasUnderline, dispatch, layer?.settings.editorState, presets]);

  return (
    <EditorSidebarSectionWrapper>
      <EditorSidebarSectionTitleWrapper>
        <EditorSidebarSectionTitle text={'Text style'} />
      </EditorSidebarSectionTitleWrapper>
      <EditorSidebarRowWrapper>
        <EditorSidebarColumn>
          <Select
            isDisabled={isActiveLayerLocked}
            selectOption={textPresetLabel}
            options={options}
            onSelect={onTextStyleChange}
          />
        </EditorSidebarColumn>
      </EditorSidebarRowWrapper>
    </EditorSidebarSectionWrapper>
  );
};

export default memo(EditorSidebarTextStyle);
