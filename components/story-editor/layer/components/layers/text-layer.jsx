import {
  DefaultDraftBlockRenderMap, Editor, EditorState, getDefaultKeyBinding, KeyBindingUtil, Modifier, RichUtils
} from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useAppDispatch, useAppSelector } from 'hooks';
import produce from 'immer';
import { isNil, set } from 'lodash';
import isEqual from 'lodash/isEqual';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ActionCreators } from 'redux-undo';
import { restoreScaling } from 'appredux/features/amp-story/ampStorySlice';
import styled from 'styled-components';
import { editorCustomStyleMap, textExportingOptions } from '../../../../../config/constants';
import { getObjectDiff } from '../../../../../utils/common';
import {
  editorStateToRawContent,
  getBlockStyle,
  getCustomStyleFn,
  getFontOptionName,
  selectAllText
} from '../../../../../utils/textEditorUtils';

export const EditorContainer = styled.div`
  div.align-right {
    text-align: right;
  }
  div.align-center {
    text-align: center;
  }
  div.align-left {
    text-align: left;
  }
  div.align-justify {
    text-align: justify;
  }
  /* If you change this calculation, then it needs to be updated in EditorSidebarMultiLayersSettings */
  font-size: ${({ viewWidth }) => `calc(2.6 * ${viewWidth}px)`};
`;

const TextLayer = ({
  layer,
  parentLayer,
  isActive,
  isReadOnly,
  editorWidth,
  editorHeight,
  handleBatchLayerChange,
  handleHeightUpdate,
  currentHeight,
}) => {
  const dispatch = useAppDispatch();

  const editorRef = useRef(null);
  const textEditorHeight = ((editorRef.current )?.editor)?.clientHeight;

  const fonts = useAppSelector((state) => state.ampStory.present.fonts);
  const googleFonts = useAppSelector((state) => state.ampStory.present.googleFonts);
  const isScalingActive = useAppSelector((state) => state.ampStory.present.isScalingActive);

  const [currentEditorState, setCurrentEditorState] = useState(layer.settings.editorState);
  const [lastInlineStyle, setLastInlineStyle] = useState();
  const currentEditorInlineStyles = currentEditorState.getCurrentInlineStyle();
  const editorInlineStyles = layer.settings.editorState.getCurrentInlineStyle();
  const editorState = useMemo(() => layer.settings.editorState, [layer.settings.editorState]);

  const [shouldUpdateFromProps, setShouldUpdateFromProps] = useState(false);

  const onEditorStateChange = useCallback(
    (innerEditorState) => {
      if (!isActive) {
        return;
      }
      const newEditorState = EditorState.set(innerEditorState, { undoStack: [], redoStack: [], allowUndo: false });
      const editorHeight = ((editorRef.current )?.editor)?.clientHeight;
      const hasDifferentHeight = Math.abs(editorHeight - currentHeight) > 1;

      if (hasDifferentHeight) {
        handleHeightUpdate(Math.trunc(editorHeight), layer._id, false);
      }

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

              // TODO
              // 27.09.2022 Removed because the height was getting lost with each update
              // test and check for further changes...

              // if (hasDifferentHeight) {
              //   set(draftState, 'settings.layerSettings.height', editorHeight);
              // }
              if (!layer.isTitleDirty) {
                set(draftState, 'title', contentState.getPlainText('\u0001'));
              }
            });

            return nextState;
          }

          return cl;
        });

        setCurrentEditorState(newEditorState);
        handleBatchLayerChange([
          { field: 'childLayers', value: updatedLayers },
          { field: 'isStale', value: true },
        ]);
        return;
      }

      handleBatchLayerChange([
        { field: 'content.html', value: html },
        { field: 'content.value', value: rawState },
        { field: 'settings.editorState', value: newEditorState },
        ...(hasDifferentHeight ? [{ field: 'settings.layerSettings.height', value: editorHeight }] : []),
        ...(!layer.isTitleDirty ? [{ field: 'title', value: contentState.getPlainText('\u0001') }] : []),
      ]);

      setCurrentEditorState(newEditorState);
    },
    [
      isActive,
      currentHeight,
      parentLayer?._id,
      parentLayer?.childLayers,
      layer._id,
      layer.isTitleDirty,
      handleBatchLayerChange,
      handleHeightUpdate,
    ],
  );

  const customStyleMap = useMemo(() => {
    const fontsStyleMap = {};

    googleFonts.forEach((googleFont) => {
      fontsStyleMap[getFontOptionName(googleFont.family)] = {
        fontFamily: googleFont.family,
      };
    });

    fonts.forEach((userFont) => {
      fontsStyleMap[getFontOptionName(userFont.family)] = {
        fontFamily: userFont.family,
      };
    });

    return { ...editorCustomStyleMap, ...fontsStyleMap };
  }, [fonts, googleFonts]);

  const handleKeyCommand = useCallback(
    (command, lastEditorState) => {
      const currentTextLength = lastEditorState.getCurrentContent().getPlainText(' ').length;
      const selectionState = lastEditorState.getSelection();

      if (command === 'split-block' && selectionState.getAnchorOffset() === 0) {
        onEditorStateChange(RichUtils.insertSoftNewline(currentEditorState));
        return 'handled';
      }

      // Prevents actions if you try to spam backspace on an empty text
      if (
        command === 'backspace' &&
        currentTextLength === 0 &&
        selectionState.getAnchorOffset() === 0 &&
        selectionState.getFocusOffset() === 0 &&
        currentEditorInlineStyles.toJS().length > 0
      ) {
        setLastInlineStyle(currentEditorInlineStyles);
        return 'handled';
      }

      if (command === 'cmd-undo') {
        dispatch(ActionCreators.undo());
        return 'handled';
      }

      if (command === 'cmd-redo') {
        dispatch(ActionCreators.redo());
        return 'handled';
      }

      if (lastEditorState.getCurrentInlineStyle().toJS().length > 0) {
        setLastInlineStyle(lastEditorState.getCurrentInlineStyle());
      }

      return 'not-handled';
    },
    [currentEditorInlineStyles, currentEditorState, dispatch, onEditorStateChange],
  );

  const handleBeforeInput = useCallback(
    (chars, lastEditorState) => {
      const currentText = lastEditorState.getCurrentContent().getPlainText(' ');
      const currentTextLength = currentText.trim().length;
      const stylesLength = lastEditorState.getCurrentInlineStyle().toJS().length;

      if ((currentTextLength < 1 && chars) || stylesLength < 1) {
        const contentState = lastEditorState.getCurrentContent();
        const selectionState = lastEditorState.getSelection().merge({
          focusOffset: 1,
        });
        const newContentState = Modifier.replaceText(contentState, selectionState, chars, lastInlineStyle);
        const newEditorState = EditorState.set(lastEditorState, { currentContent: newContentState });
        onEditorStateChange(EditorState.moveFocusToEnd(newEditorState));

        return 'handled';
      }
      return 'not-handled';
    },
    [lastInlineStyle, onEditorStateChange],
  );

  const handleEditorContainerKeyDown = (e) => e.stopPropagation();

  const keyBindingFn = useCallback((event) => {
    if (
      (event.key === 'z' && KeyBindingUtil.hasCommandModifier(event) && event.shiftKey) ||
      (event.key === 'y' &&
        KeyBindingUtil.hasCommandModifier(event) &&
        event.key === 'y' &&
        KeyBindingUtil.hasCommandModifier(event))
    ) {
      setShouldUpdateFromProps(true);
      return 'cmd-redo';
    }

    if (event.key === 'z' && KeyBindingUtil.hasCommandModifier(event) && !event.shiftKey) {
      setShouldUpdateFromProps(true);
      return 'cmd-undo';
    }

    return getDefaultKeyBinding(event);
  }, []);

  const viewWidth = useMemo(() => Number(editorWidth) / 100, [editorWidth]);
  const viewHeight = useMemo(() => Number(editorHeight) / 100, [editorHeight]);

  const handlePastedText = useCallback(
    (text, html, editorState) => {
      if (editorState?.getCurrentContent().getPlainText(' ')) {
        return 'not-handled';
      }
      const anchorOffset = editorState?.getSelection()?.getAnchorOffset();
      const focusOffset = editorState?.getSelection()?.getFocusOffset();
      if (editorState && anchorOffset === 0 && anchorOffset === focusOffset) {
        const newContent = Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), text);
        let newEditorState = EditorState.push(editorState, newContent, 'insert-characters');
        const selection = selectAllText(newEditorState);
        newEditorState = EditorState.acceptSelection(newEditorState, selection);

        if (lastInlineStyle) {
          lastInlineStyle.toJS().forEach((style) => {
            newEditorState = RichUtils.toggleInlineStyle(newEditorState, style);
          });
        }

        onEditorStateChange(EditorState.moveFocusToEnd(newEditorState));
        return 'handled';
      }
      return 'not-handled';
    },
    [lastInlineStyle, onEditorStateChange],
  );

  const blockRenderMap = DefaultDraftBlockRenderMap.set('br', { element: 'br' });
  // const blocksFromHTML = convertFromHTML(testString, getSafeBodyFromHTML, blockRenderMap);

  const lastBlockLength = useMemo(
    () => (currentEditorState)?.getCurrentContent()?.getLastBlock()?.getLength(),
    [currentEditorState],
  );

  useEffect(() => {
    if (
      !isReadOnly &&
      shouldUpdateFromProps &&
      getObjectDiff(editorState.getCurrentContent().toJS(), currentEditorState.getCurrentContent().toJS()).length > 0
    ) {
      setShouldUpdateFromProps(false);
      return setCurrentEditorState(EditorState.moveFocusToEnd(editorState));
    }
    if (
      (!isEqual(currentEditorInlineStyles, editorInlineStyles) &&
        currentEditorState.getCurrentContent().getPlainText(' ').length > 1) ||
      isReadOnly
    ) {
      return setCurrentEditorState(EditorState.acceptSelection(editorState, editorState.getSelection()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUpdateFromProps, currentEditorInlineStyles, editorInlineStyles, editorState, isReadOnly]);

  useEffect(() => {
    if (lastBlockLength === 0) {
      const rootParent = (editorRef?.current )?.editor;
      const allSpans = rootParent?.querySelectorAll('span[data-offset-key] > br');
      if (allSpans && allSpans.length > 0) {
        const regularBlockElement = rootParent?.querySelector(
          'span[data-offset-key] > span[data-text]',
        );
        allSpans.forEach((emptySpan) => {
          if (emptySpan?.parentElement && regularBlockElement?.parentElement) {
            emptySpan.parentElement.style.cssText = regularBlockElement.parentElement.style.cssText;
          }
        });
      }
    }
  }, [lastBlockLength]);

  useEffect(() => {
    const asyncHeightSetter = async () => {
      if (!textEditorHeight) {
        return;
      }

      if (isScalingActive) {
        await new Promise((res) => setTimeout(res, 200));
        dispatch(restoreScaling());
        return;
      }

      if (Math.abs(textEditorHeight - currentHeight) > 1) {
        handleHeightUpdate(Math.trunc(textEditorHeight), layer._id, false);
      }
    };

    asyncHeightSetter();
  }, [dispatch, currentHeight, handleHeightUpdate, isScalingActive, layer._id, textEditorHeight]);

  useEffect(() => {
    if (isReadOnly) {
      editorRef.current?.blur();
      setCurrentEditorState(EditorState.set(currentEditorState, { undoStack: [], redoStack: [], allowUndo: false }));
    }
    if (!isReadOnly) {
      editorRef.current?.focus();
      onEditorStateChange(EditorState.moveFocusToEnd(currentEditorState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isReadOnly]);

  // console.log(textEditorHeight);

  return (
    <EditorContainer
      viewWidth={viewWidth}
      viewHeight={viewHeight}
      onKeyDown={handleEditorContainerKeyDown}
      style={{
        textShadow:
          Number(layer.settings.generalSettings.shadow) !== 0
            ? `1px 1px ${layer.settings.generalSettings.shadow / 10}px rgba(0,0,0,0.75)`
            : 'none',
      }}
    >
      <Editor
        blockRenderMap={blockRenderMap}
        ref={editorRef}
        readOnly={isReadOnly}
        stripPastedStyles={true}
        handleKeyCommand={handleKeyCommand}
        handleBeforeInput={handleBeforeInput}
        blockStyleFn={getBlockStyle}
        customStyleFn={getCustomStyleFn}
        editorState={currentEditorState}
        customStyleMap={customStyleMap}
        keyBindingFn={keyBindingFn}
        onChange={onEditorStateChange}
        handlePastedText={handlePastedText}
      />
    </EditorContainer>
  );
};

export default memo(TextLayer);
