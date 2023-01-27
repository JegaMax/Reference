import { skipToken } from '@reduxjs/toolkit/dist/query';
import { EditorState, Modifier, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useAppDispatch, useAppSelector } from 'hooks';
import isNil from 'lodash/isNil';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useGoogleFontsListQuery, useWorkspaceFontsListQuery } from 'appredux/services/fonts/fonts';
import { IColorType } from '../../../../interfaces/colors';
import { addGoogleFont, addStoryFont } from '../../../../appredux/features/amp-story/ampStorySlice';
import { subNumbers } from '../../../../utils/common';
import { defaultFontWeights } from '../../../../utils/fontUtils';
import ColorPicker from '../../../color-picker';
import { Bold, CenterAlign, Italic, JustifyAlign, LeftAlign, RightAlign, Underline } from '../../../icons';
import InputWithSelect from '../../../shared/input-with-select';
import Select from '../../../shared/select';
import EditorSidebarButtonWithIcon from '../../shared/elements/editor-sidebar-button-with-icon';
import EditorSidebarLabel from '../../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../../shared/elements/editor-sidebar-section-title';
import EditorSidebarButtonWrapper from '../../shared/structure/editor-sidebar-button-wrapper';
import EditorSidebarColumn from '../../shared/structure/editor-sidebar-column';
import EditorSidebarHalfColumn from '../../shared/structure/editor-sidebar-half-column';
import EditorSidebarRowWrapper from '../../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../../shared/structure/editor-sidebar-values-wrapper';
import EditorSidebarFontSelect from './editor-sidebar-font-select';

import produce from 'immer';
import { set } from 'lodash';
import { toggleLayerMenuBoldFlag } from 'appredux/features/editor/helpers/helpersSlice';
import {
  FONT_COLOR_STYLE_PREFIX,
  FONT_FAMILY_STYLE_PREFIX,
  FONT_SIZE_STYLE_PREFIX,
  FONT_SPACING_STYLE_PREFIX,
  FONT_TYPE,
  FONT_WEIGHT_STYLE_PREFIX,
  TEXT_BLOCK_STYLES,
  TEXT_INLINE_STYLES,
  defaultTextFontColor,
  fontSizes,
  textExportingOptions,
  textSpacings,
} from '../../../../config/constants';
import {
  doesTextHaveBlockStyle,
  doesTextHaveStyle,
  editorStateToRawContent,
  getActiveFontColor,
  getActiveFontFamily,
  getActiveFontSize,
  getActiveFontSpacing,
  getActiveFontWeight,
  getCurrentSelectionStyles,
  getDefaultFontWeight,
  getFontWeights,
  loadFontFamily,
  reverseTextSelection,
  selectAllText,
} from '../../../../utils/textEditorUtils';
import useWorkspaceFonts from './shared/useWorkspaceFonts';


const EditorSidebarTextSettings = ({
  layer,
  parentLayer,
  handleBatchLayerChange,
}) => {
  const dispatch = useAppDispatch();
  const { data: googleFonts } = useGoogleFontsListQuery();

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const layerMenuBoldFlag = useAppSelector((state) => state.helpers.layerMenuBoldFlag);

  // Fetch workspace specific fonts;
  const { data: workspaceFonts } = useWorkspaceFontsListQuery(selectedWorkspaceId ?? skipToken);

  const [searchFont, setSearchFont] = useState('');
  const createInlineStyles = useCallback((prefix, value) => {
    return [
      {
        style: `${prefix}${value}`,
        prefix,
      },
    ];
  }, []);

  const isActiveLayerLocked = layer?.settings.generalSettings.locked;
  const [currentEditorState, setCurrentEditorState] = useState(layer?.settings.editorState);

  const storyUploadedFonts = useAppSelector((state) => state.ampStory.present.fonts);
  const storyGoogleFonts = useAppSelector((state) => state.ampStory.present.googleFonts);
  const activeFontFamily = useMemo(() => {
    if (!currentEditorState) {
      return 'Heebo';
    }

    return getActiveFontFamily(currentEditorState);
  }, [currentEditorState]);
  const activeFontColor = useMemo(() => currentEditorState && getActiveFontColor(currentEditorState), [
    currentEditorState,
  ]);

  useEffect(() => {
    setCurrentEditorState(layer?.settings.editorState);
  }, [layer?.settings.editorState]);

  const filteredFonts = useWorkspaceFonts(searchFont);

  const fontSizesOptions = useMemo(
    () =>
      fontSizes.map((fontSize) => ({
        name: fontSize,
        value: fontSize,
      })),
    [],
  );

  const textSpacingsOptions = useMemo(
    () =>
      textSpacings.map((textSpacing) => ({
        name: textSpacing,
        value: textSpacing,
      })),
    [],
  );

  const fontWeights = useMemo(() => {
    const font = [...(workspaceFonts ?? []), ...(googleFonts ?? [])].find(
      (currentFont) => currentFont.family === activeFontFamily,
    );

    if (font) {
      return getFontWeights(font.weight);
    }

    return defaultFontWeights;
  }, [activeFontFamily, googleFonts, workspaceFonts]);

  const activeFontSize = useMemo(() => currentEditorState && getActiveFontSize(currentEditorState), [
    currentEditorState,
  ]);
  const activeFontSpacing = useMemo(() => currentEditorState && getActiveFontSpacing(currentEditorState), [
    currentEditorState,
  ]);

  const activeFontWeight = useMemo(() => {
    if (!currentEditorState) {
      return '400';
    }
    return getActiveFontWeight(currentEditorState, fontWeights);
  }, [currentEditorState, fontWeights]);
  const activeLayerIsBold = useMemo(() => {
    if ((activeFontWeight ) === 'Bold') {
      return true;
    }

    return doesTextHaveStyle(TEXT_INLINE_STYLES.BOLD, currentEditorState);
  }, [activeFontWeight, currentEditorState]);
  const activeLayerIsUnderline = useMemo(() => doesTextHaveStyle(TEXT_INLINE_STYLES.UNDERLINE, currentEditorState), [
    currentEditorState,
  ]);
  const activeLayerIsItalic = useMemo(() => doesTextHaveStyle(TEXT_INLINE_STYLES.ITALIC, currentEditorState), [
    currentEditorState,
  ]);
  const [lineHeight, setLineHeight] = useState(activeFontSpacing || 1.5);
  const [textSize, setTextSize] = useState(activeFontSize || 25);

  const getEditorStateAndSelection = useCallback(() => {
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
  }, [currentEditorState]);

  const onToggleInlineStyle = useCallback(
    (inlineStyle) => {
      if (isActiveLayerLocked) {
        return;
      }
      let { editorState } = getEditorStateAndSelection();

      if (!editorState) {
        return;
      }

      editorState = RichUtils.toggleInlineStyle(editorState, inlineStyle);
      const newEditorState = EditorState.set(editorState, { undoStack: [], redoStack: [], allowUndo: false });
      const rawState = editorStateToRawContent(newEditorState);
      const contentState = newEditorState.getCurrentContent();
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

        setCurrentEditorState(newEditorState);
        handleBatchLayerChange([{ field: 'childLayers', value: updatedLayers }]);
        return;
      }

      setCurrentEditorState(newEditorState);
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
      getEditorStateAndSelection,
      layer._id,
      parentLayer?._id,
      parentLayer?.childLayers,
      handleBatchLayerChange,
    ],
  );

  const onChangeInlineStyle = useCallback(
    (inlineStyles) => {
      if (isActiveLayerLocked) {
        return;
      }
      let { editorState, selection } = getEditorStateAndSelection();

      if (!editorState || !selection) {
        return;
      }

      let contentState = editorState.getCurrentContent();

      if (selection.getIsBackward()) {
        selection = reverseTextSelection(selection);
        editorState = EditorState.acceptSelection(editorState, selection);
      }

      const currentSelectionStyles = getCurrentSelectionStyles(editorState);
      inlineStyles.forEach((inlineStyle) => {
        if (!selection) {
          return;
        }
        const similarStyles = currentSelectionStyles.filter((style) => style.startsWith(inlineStyle.prefix));

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

        setCurrentEditorState(newEditorState);
        handleBatchLayerChange([{ field: 'childLayers', value: updatedLayers }]);
        return;
      }

      setCurrentEditorState(newEditorState);
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
      getEditorStateAndSelection,
      layer._id,
      parentLayer?._id,
      parentLayer?.childLayers,
      handleBatchLayerChange,
    ],
  );

  const onChangeBlockStyle = (blockType) => {
    if (isActiveLayerLocked || !currentEditorState) {
      return;
    }

    const editorState = RichUtils.toggleBlockType(currentEditorState, blockType);
    const newEditorState = EditorState.set(editorState, { undoStack: [], redoStack: [], allowUndo: false });
    const rawState = editorStateToRawContent(newEditorState);
    const contentState = newEditorState.getCurrentContent();
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

      setCurrentEditorState(newEditorState);
      handleBatchLayerChange([{ field: 'childLayers', value: updatedLayers }]);
      return;
    }

    setCurrentEditorState(newEditorState);
    handleBatchLayerChange([
      { field: 'content.html', value: html },
      { field: 'content.value', value: rawState },
      {
        field: 'settings.editorState',
        value: newEditorState,
      },
    ]);
  };

  const onFontColorChange = useCallback(
    (prop, value) => {
      if (isActiveLayerLocked) {
        return;
      }
      const inlineStyles = createInlineStyles(FONT_COLOR_STYLE_PREFIX, value);

      onChangeInlineStyle(inlineStyles);
    },
    [isActiveLayerLocked, onChangeInlineStyle, createInlineStyles],
  );

  const onFontSpacingUpdate = useCallback(
    (option) => {
      if (isActiveLayerLocked) {
        return;
      }
      const value = parseFloat(lineHeight.toString());
      const newLineHeight = value < 0.5 ? 0.5 : value > 6 ? 6 : value;
      const selectedLineHeight = typeof option === 'number' ? option : newLineHeight;

      setLineHeight(selectedLineHeight);

      const inlineStyles = createInlineStyles(
        FONT_SPACING_STYLE_PREFIX,
        selectedLineHeight.toString().replace('.', '_'),
      );

      onChangeInlineStyle(inlineStyles);
    },
    [isActiveLayerLocked, lineHeight, onChangeInlineStyle, createInlineStyles],
  );

  const onFontSizeUpdate = useCallback(
    (option) => {
      if (isActiveLayerLocked) {
        return;
      }
      const value = parseFloat(textSize.toString());
      const newTextSize = value < 5 ? 5 : value > 300 ? 300 : value;
      const selectedTextSize = Math.round(typeof option === 'number' ? option : newTextSize);
      const inlineStyles = createInlineStyles(FONT_SIZE_STYLE_PREFIX, selectedTextSize);

      setTextSize(selectedTextSize);
      onChangeInlineStyle(inlineStyles);
    },
    [isActiveLayerLocked, textSize, onChangeInlineStyle, createInlineStyles],
  );

  const onFontSizeKeyDown = useCallback(
    (event) => {
      event.stopPropagation();
      let value = parseFloat((event.target)?.value);
      value = Number.isNaN(value) ? activeFontSize ?? 5 : Math.round(value);
      let inlineStyles = createInlineStyles(FONT_SIZE_STYLE_PREFIX, value);

      if (event.code === 'ArrowUp') {
        const stylesValue = value + 1 > 300 ? 300 : value + 1;
        inlineStyles = createInlineStyles(FONT_SIZE_STYLE_PREFIX, stylesValue);
        setTextSize(stylesValue);
        onChangeInlineStyle(inlineStyles);
      }

      if (event.code === 'ArrowDown') {
        const stylesValue = value - 1 < 5 ? 5 : value - 1;
        inlineStyles = createInlineStyles(FONT_SIZE_STYLE_PREFIX, stylesValue);
        setTextSize(stylesValue);
        onChangeInlineStyle(inlineStyles);
      }

      if (Number(textSize) !== Number(activeFontSize) && event.code === 'Enter') {
        onChangeInlineStyle(inlineStyles);
      }
    },
    [createInlineStyles, textSize, activeFontSize, onChangeInlineStyle],
  );

  const onFontSizeChange = useCallback((event) => {
    let valueString = event.target.value;

    if (valueString.length > 1 && valueString[0] === '0') {
      valueString = valueString.substr(1, valueString.length - 1);
    }

    if (/^\d*\.?\d*$/.test(valueString) && event) {
      setTextSize(valueString);
    }
  }, []);

  const onFontSpacingChange = useCallback((event) => {
    let valueString = event.target.value;
    if (valueString.length > 1 && valueString[0] === '0') {
      valueString = valueString.substr(1, valueString.length - 1);
    }
    if (/^\d*\.?\d*$/.test(valueString)) {
      setLineHeight(valueString);
    }
  }, []);

  const onFontSpacingKeyDown = useCallback(
    (event) => {
      event.stopPropagation();
      let value = parseFloat((event.target).value);
      const currentFontSpacing = isNil(activeFontSpacing) ? 0.5 : +activeFontSpacing;
      value = Number.isNaN(value) ? currentFontSpacing : value;
      let inlineStyles = createInlineStyles(FONT_SPACING_STYLE_PREFIX, value);

      if (event.code === 'ArrowUp') {
        const stylesValue = value + 1 > 6 ? 6 : value + 1;
        inlineStyles = createInlineStyles(FONT_SPACING_STYLE_PREFIX, stylesValue);
        setLineHeight(stylesValue);
        onChangeInlineStyle(inlineStyles);
      }

      if (event.code === 'ArrowDown') {
        const stylesValue = value - 1 < 0.5 ? 0.5 : subNumbers(value, 1);
        inlineStyles = createInlineStyles(FONT_SPACING_STYLE_PREFIX, stylesValue);
        setLineHeight(stylesValue);
        onChangeInlineStyle(inlineStyles);
      }

      if (Number(lineHeight) !== Number(activeFontSpacing) && event.code === 'Enter') {
        onFontSpacingUpdate();
        onChangeInlineStyle(inlineStyles);
      }
    },
    [lineHeight, activeFontSpacing, onFontSpacingUpdate, onChangeInlineStyle, createInlineStyles],
  );

  const onFontWeightChange = useCallback(
    (option) => {
      if (isActiveLayerLocked) {
        return;
      }
      const inlineStyles = createInlineStyles(FONT_WEIGHT_STYLE_PREFIX, option);
      onChangeInlineStyle(inlineStyles);
    },
    [isActiveLayerLocked, onChangeInlineStyle, createInlineStyles],
  );

  const onFontFamilyChange = useCallback(
    (option) => {
      if (isActiveLayerLocked) {
        return;
      }

      const fontFamily = option.replaceAll('_', ' ');
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
        const preparedOption = option.replaceAll(' ', '_');
        const inlineStyles = [
          { style: `${FONT_FAMILY_STYLE_PREFIX}${preparedOption}`, prefix: FONT_FAMILY_STYLE_PREFIX },
        ];

        if (activeLayerIsBold) {
          const hasBoldOption = selectedFont?.weight?.find((w) => w === 700);

          if (hasBoldOption) {
            inlineStyles.push({ style: `${FONT_WEIGHT_STYLE_PREFIX}700`, prefix: FONT_WEIGHT_STYLE_PREFIX });
            onChangeInlineStyle(inlineStyles);
            return;
          }

          inlineStyles.push({ style: TEXT_INLINE_STYLES.BOLD, prefix: FONT_WEIGHT_STYLE_PREFIX });
          onChangeInlineStyle(inlineStyles);
          return;
        }

        const fontWeight = selectedFont?.weight ? getDefaultFontWeight(getFontWeights(selectedFont.weight)).value : 400;
        inlineStyles.push({ style: `${FONT_WEIGHT_STYLE_PREFIX}${fontWeight}`, prefix: FONT_WEIGHT_STYLE_PREFIX });
        onChangeInlineStyle(inlineStyles);
      }
    },
    [
      isActiveLayerLocked,
      storyUploadedFonts,
      storyGoogleFonts,
      workspaceFonts,
      googleFonts,
      dispatch,
      activeLayerIsBold,
      onChangeInlineStyle,
    ],
  );

  const toggleInlineBoldStyle = useCallback(() => {
    // First case font has bold option and it's applied
    if ((activeFontWeight ) === 'Bold') {
      const inlineStyles = createInlineStyles(FONT_WEIGHT_STYLE_PREFIX, 400);
      onChangeInlineStyle(inlineStyles);
      return;
    }
    // Second case default bold is applied
    if (doesTextHaveStyle(TEXT_INLINE_STYLES.BOLD, currentEditorState)) {
      onToggleInlineStyle(TEXT_INLINE_STYLES.BOLD);
      return;
    }
    // Third case apply font bold option
    if (fontWeights.some((font) => font.value === 700 || font.name.toLowerCase() === 'bold')) {
      onFontWeightChange(700);
      return;
    }
    // Apply default bold
    onToggleInlineStyle(TEXT_INLINE_STYLES.BOLD);
  }, [
    activeFontWeight,
    createInlineStyles,
    currentEditorState,
    fontWeights,
    onChangeInlineStyle,
    onFontWeightChange,
    onToggleInlineStyle,
  ]);

  useEffect(() => {
    if (layerMenuBoldFlag !== null) {
      toggleInlineBoldStyle();
      dispatch(toggleLayerMenuBoldFlag(null));
    }
  }, [dispatch, layerMenuBoldFlag, toggleInlineBoldStyle]);

  useEffect(() => {
    setLineHeight(activeFontSpacing || '1.5');
  }, [activeFontSpacing]);

  useEffect(() => {
    setTextSize(activeFontSize || '45');
  }, [activeFontSize]);

  return (
    <EditorSidebarSectionWrapper>
      <EditorSidebarSectionTitleWrapper>
        <EditorSidebarSectionTitle text={'Text'} />
      </EditorSidebarSectionTitleWrapper>
      <>
        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Font'} />

          <EditorSidebarValuesWrapper>
            <EditorSidebarColumn>
              <EditorSidebarFontSelect
                isDisabled={isActiveLayerLocked}
                searchValue={searchFont}
                selectOption={activeFontFamily}
                optionsObject={filteredFonts }
                onSearchChange={setSearchFont}
                onSelect={onFontFamilyChange}
              />
            </EditorSidebarColumn>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Weight'} />

          <EditorSidebarValuesWrapper>
            <EditorSidebarColumn>
              <Select
                isDisabled={isActiveLayerLocked}
                selectOption={activeFontWeight}
                options={fontWeights}
                onSelect={onFontWeightChange}
              />
            </EditorSidebarColumn>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Size'} />

          <EditorSidebarValuesWrapper>
            <EditorSidebarHalfColumn justifyContent={'flex-end'}>
              <InputWithSelect
                value={textSize}
                options={fontSizesOptions}
                isDisabled={isActiveLayerLocked}
                onBlur={onFontSizeUpdate}
                onChange={onFontSizeChange}
                onSelect={onFontSizeUpdate}
                onKeyDown={onFontSizeKeyDown}
              />
            </EditorSidebarHalfColumn>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Spacing'} />

          <EditorSidebarValuesWrapper>
            <EditorSidebarHalfColumn justifyContent={'flex-end'}>
              <InputWithSelect
                value={lineHeight}
                options={textSpacingsOptions}
                isDisabled={isActiveLayerLocked}
                onBlur={onFontSpacingUpdate}
                onChange={onFontSpacingChange}
                onSelect={onFontSpacingUpdate}
                onKeyDown={onFontSpacingKeyDown}
              />
            </EditorSidebarHalfColumn>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Color'} />

          <EditorSidebarValuesWrapper>
            <EditorSidebarHalfColumn justifyContent={'flex-end'}>
              {activeFontColor && (
                <ColorPicker
                  colorType={IColorType.FillColor}
                  isDisabled={isActiveLayerLocked}
                  defaultLeftColor={defaultTextFontColor}
                  leftColor={activeFontColor}
                  handleColorChange={onFontColorChange}
                />
              )}
            </EditorSidebarHalfColumn>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Align'} />

          <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
            <EditorSidebarButtonWrapper>
              <EditorSidebarButtonWithIcon
                isDisabled={isActiveLayerLocked}
                isActive={doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_LEFT, currentEditorState)}
                onClick={() => onChangeBlockStyle(TEXT_BLOCK_STYLES.ALIGN_LEFT)}
              >
                <LeftAlign />
              </EditorSidebarButtonWithIcon>
            </EditorSidebarButtonWrapper>

            <EditorSidebarButtonWrapper>
              <EditorSidebarButtonWithIcon
                isDisabled={isActiveLayerLocked}
                isActive={doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_CENTER, currentEditorState)}
                onClick={() => onChangeBlockStyle(TEXT_BLOCK_STYLES.ALIGN_CENTER)}
              >
                <CenterAlign />
              </EditorSidebarButtonWithIcon>
            </EditorSidebarButtonWrapper>

            <EditorSidebarButtonWrapper>
              <EditorSidebarButtonWithIcon
                isDisabled={isActiveLayerLocked}
                isActive={doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_RIGHT, currentEditorState)}
                onClick={() => onChangeBlockStyle(TEXT_BLOCK_STYLES.ALIGN_RIGHT)}
              >
                <RightAlign />
              </EditorSidebarButtonWithIcon>
            </EditorSidebarButtonWrapper>

            <EditorSidebarButtonWrapper>
              <EditorSidebarButtonWithIcon
                isDisabled={isActiveLayerLocked}
                isActive={doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_JUSTIFY, currentEditorState)}
                onClick={() => onChangeBlockStyle(TEXT_BLOCK_STYLES.ALIGN_JUSTIFY)}
              >
                <JustifyAlign />
              </EditorSidebarButtonWithIcon>
            </EditorSidebarButtonWrapper>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Style'} />

          <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
            <EditorSidebarButtonWrapper>
              <EditorSidebarButtonWithIcon
                isDisabled={isActiveLayerLocked}
                isActive={activeLayerIsBold}
                onClick={toggleInlineBoldStyle}
              >
                <Bold />
              </EditorSidebarButtonWithIcon>
            </EditorSidebarButtonWrapper>

            <EditorSidebarButtonWrapper>
              <EditorSidebarButtonWithIcon
                isDisabled={isActiveLayerLocked}
                isActive={activeLayerIsItalic}
                onClick={() => onToggleInlineStyle(TEXT_INLINE_STYLES.ITALIC)}
              >
                <Italic />
              </EditorSidebarButtonWithIcon>
            </EditorSidebarButtonWrapper>

            <EditorSidebarButtonWrapper>
              <EditorSidebarButtonWithIcon
                isDisabled={isActiveLayerLocked}
                isActive={activeLayerIsUnderline}
                onClick={() => onToggleInlineStyle(TEXT_INLINE_STYLES.UNDERLINE)}
              >
                <Underline />
              </EditorSidebarButtonWithIcon>
            </EditorSidebarButtonWrapper>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>
      </>
    </EditorSidebarSectionWrapper>
  );
};

export default memo(EditorSidebarTextSettings);
