import { EditorState, Modifier } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import produce from 'immer';
import { isNil, set } from 'lodash';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  defaultBackgroundColor,
  FONT_BG_COLOR_STYLE_PREFIX, textExportingOptions
} from '../../../config/constants';
import { IColorType } from '../../../interfaces/colors';
import { layerTypes } from '../../../interfaces/layer-types';
import { getArrowEventValue } from '../../../utils/common';
import {
  editorStateToRawContent,
  getActiveFontBgColor,
  getCurrentSelectionStyles,
  reverseTextSelection,
  selectAllText
} from '../../../utils/textEditorUtils';
import ColorPicker from '../../color-picker';
import EditorSidebarSliderWithInput from '../shared/editor-sidebar-slider-with-input';
import EditorSidebarLabel from '../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../shared/elements/editor-sidebar-section-title';
import EditorSidebarHalfColumn from '../shared/structure/editor-sidebar-half-column';
import EditorSidebarLabelWrapper from '../shared/structure/editor-sidebar-label-wrapper';
import EditorSidebarRowWrapper from '../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../shared/structure/editor-sidebar-values-wrapper';

const BackgroundLabelWrapper = styled(EditorSidebarLabelWrapper)`
  flex: 1 0 auto;
  width: auto;
`;

const EditorSidebarEffectsSettings = ({
  layer,
  parentLayer,
  handleLayerChange,
  handleBatchLayerChange,
}) => {
  const isActiveLayerLocked = layer.settings.generalSettings.locked;
  const activeLayerType = layer.type;
  const fullscreen = layer.settings.layerSettings?.fullscreen;
  const layerType = layer.type;
  const permissionForFullScreen = layer.settings.layerSettings?.permissionForFullScreen;
  const [currentEditorState, setCurrentEditorState] = useState(layer.settings.editorState);
  const [currentShadow, setCurrentShadow] = useState(Number(layer.settings.generalSettings.shadow));
  const [currentOpacity, setCurrentOpacity] = useState(Number(layer.settings.generalSettings.opacity));
  const activeFontBgColor = useMemo(() => getActiveFontBgColor(currentEditorState), [currentEditorState]);

  useEffect(() => {
    setCurrentEditorState(layer.settings.editorState);
  }, [layer.settings.editorState]);

  useEffect(() => {
    setCurrentShadow(Number(layer.settings.generalSettings.shadow));
  }, [layer.settings.generalSettings.shadow]);

  useEffect(() => {
    setCurrentOpacity(Number(layer.settings.generalSettings.opacity));
  }, [layer.settings.generalSettings.opacity, layer.settings.generalSettings.shadow]);

  const onOpacityChange = useCallback(
    (value) => {
      if (isActiveLayerLocked) {
        return;
      }

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'settings.generalSettings.opacity', value);
            });

            return nextState;
          }

          return cl;
        });

        setCurrentOpacity(value);
        handleLayerChange({ field: `childLayers`, value: updatedLayers });
        return;
      }

      setCurrentOpacity(value);
      handleLayerChange({ field: 'settings.generalSettings.opacity', value });
    },
    [handleLayerChange, isActiveLayerLocked, layer._id, parentLayer?._id, parentLayer?.childLayers],
  );

  const onShadowChange = useCallback(
    (value) => {
      if (isActiveLayerLocked) {
        return;
      }

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'settings.generalSettings.shadow', value);
            });

            return nextState;
          }

          return cl;
        });

        setCurrentShadow(value);
        handleLayerChange({ field: `childLayers`, value: updatedLayers });
        return;
      }

      setCurrentShadow(value);
      handleLayerChange({ field: 'settings.generalSettings.shadow', value });
    },
    [handleLayerChange, isActiveLayerLocked, layer._id, parentLayer?._id, parentLayer?.childLayers],
  );

  const onOpacityInputArrowDown = useCallback(
    (event) => {
      if (isActiveLayerLocked) {
        return;
      }

      const value = getArrowEventValue(event) + Number(currentOpacity);
      setCurrentOpacity(value);
      handleLayerChange({ field: 'settings.generalSettings.opacity', value });
    },
    [currentOpacity, handleLayerChange, isActiveLayerLocked],
  );

  const onShadowInputArrowDown = useCallback(
    (event) => {
      if (isActiveLayerLocked) {
        return;
      }

      const value = getArrowEventValue(event) + Number(currentShadow);
      setCurrentShadow(value);
      handleLayerChange({ field: 'settings.generalSettings.shadow', value });
    },
    [currentShadow, handleLayerChange, isActiveLayerLocked],
  );

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
      const rawState = editorStateToRawContent(editorState);
      const html = stateToHTML(contentState, textExportingOptions);

      setCurrentEditorState(editorState);

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'content.html', html);
              set(draftState, 'content.value', rawState);

              set(draftState, 'settings.editorState', editorState);
            });

            return nextState;
          }

          return cl;
        });

        handleLayerChange({ field: `childLayers`, value: updatedLayers });
        return;
      }

      handleBatchLayerChange([
        { field: 'content.html', value: html },
        { field: 'content.value', value: rawState },
        {
          field: 'settings.editorState',
          value: editorState,
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
      handleLayerChange,
    ],
  );

  const onFontBgColorChange = useCallback(
    (prop, value) => {
      if (isActiveLayerLocked) {
        return;
      }

      // const paddingValue = value === 'rgba(0, 0, 0, 0)' ? 0 : '0.45em';

      onChangeInlineStyle([
        { style: FONT_BG_COLOR_STYLE_PREFIX + value, prefix: FONT_BG_COLOR_STYLE_PREFIX },
        // { style: FONT_PADDING_BG_COLOR_STYLE_PREFIX + paddingValue, prefix: FONT_PADDING_BG_COLOR_STYLE_PREFIX },
      ]);
    },
    [isActiveLayerLocked, onChangeInlineStyle],
  );
  const onFontColorReset = () => {
    if (isActiveLayerLocked) {
      return;
    }
    onFontBgColorChange('leftColor', defaultBackgroundColor);
  };

  return (
    <EditorSidebarSectionWrapper>
      <EditorSidebarSectionTitleWrapper>
        <EditorSidebarSectionTitle text={'Effects'} />
      </EditorSidebarSectionTitleWrapper>
      {activeLayerType === layerTypes.HTML && (
        <EditorSidebarRowWrapper>
          <BackgroundLabelWrapper>
            <EditorSidebarLabel text={'Background color'} />
          </BackgroundLabelWrapper>

          <EditorSidebarValuesWrapper>
            <EditorSidebarHalfColumn justifyContent={'flex-end'}>
              {activeFontBgColor && (
                <ColorPicker
                  colorType={IColorType.BgColor}
                  isDisabled={isActiveLayerLocked}
                  defaultLeftColor={defaultBackgroundColor}
                  leftColor={activeFontBgColor}
                  handleColorChange={onFontBgColorChange}
                  handleColorReset={onFontColorReset}
                />
              )}
            </EditorSidebarHalfColumn>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>
      )}

      <EditorSidebarRowWrapper>
        <EditorSidebarLabelWrapper>
          <EditorSidebarLabel text={'Opacity'} />
        </EditorSidebarLabelWrapper>

        <EditorSidebarSliderWithInput
          isDisabled={isActiveLayerLocked}
          min={0}
          max={100}
          step={1}
          value={currentOpacity}
          sign={'%'}
          onChange={onOpacityChange}
          onInputArrowDown={onOpacityInputArrowDown}
        />
      </EditorSidebarRowWrapper>
      {!(
        (fullscreen && layerType !== layerTypes.SHAPE) ||
        permissionForFullScreen ||
        layerType === layerTypes.GIFS
      ) && (
        <EditorSidebarRowWrapper>
          <EditorSidebarLabelWrapper>
            <EditorSidebarLabel text={'Shadow'} />
          </EditorSidebarLabelWrapper>

          <EditorSidebarSliderWithInput
            isDisabled={isActiveLayerLocked}
            min={0}
            max={100}
            step={1}
            value={currentShadow}
            sign={'%'}
            onChange={onShadowChange}
            onInputArrowDown={onShadowInputArrowDown}
          />
        </EditorSidebarRowWrapper>
      )}
    </EditorSidebarSectionWrapper>
  );
};

export default EditorSidebarEffectsSettings;
