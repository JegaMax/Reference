import { EditorState, Modifier, RichUtils } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import { useAppDispatch, useAppSelector } from 'hooks';
import produce from 'immer';
import { isNil, set } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IColorType } from '../../interfaces/colors';
import { layerTypes } from '../../interfaces/layer-types';
import { toggleLayerFullScreen } from '../../appredux/features/editor/image/imageSlice';
import { disableSizeInputs } from '../../appredux/features/editor/layer-setting/layerSettingSlice';
import { toggleSplitVideoModal } from '../../appredux/features/media/mediaSlice';
import { stopPropagation } from '../../utils/common';
import { rotateRect } from '../../utils/commonUtils';
import { hexToRgb, rgbaToHexa } from '../../utils/parseColors';
import { IconButton } from '../buttons';
import ColorPicker from '../color-picker/color-picker';
import OutlinkColorPicker from '../editor-sidebar/editor-sidebar-settings/editor-sidebar-outlink-settings/outlink-color-picker';
import Styled from './editor-layer-menu-styled';

import {
  selectActiveLayer,
  selectActiveSlide, setActiveLayerPosition, setActiveLayerProps, unGroup
} from '../../appredux/features/amp-story/ampStorySlice';
import {
  handleCroppedLayer, setIsCroppingMode, toggleLayerMenuBoldFlag, toggleReplaceModal
} from '../../appredux/features/editor/helpers/helpersSlice';

import {
  doesTextHaveBlockStyle, doesTextHaveStyle, editorStateToRawContent, getActiveFontColor, getCurrentSelectionStyles, reverseTextSelection, selectAllText
} from '../../utils/textEditorUtils';
import {
  BoldSM, CenterAlign, Crop, FullscreenSM, JustifyAlign, LeftAlign, LockSM, ReplaceSM, RightAlign, SplitVideo, ToggleLockSize, UngroupSM, UnlockSM
} from '../icons';

import { batch, useSelector } from 'react-redux';
import {
  defaultTextFontColor, FONT_COLOR_STYLE_PREFIX,
  textExportingOptions, TEXT_BLOCK_STYLES, TEXT_INLINE_STYLES
} from '../../config/constants';
import useReorderLayers from './shared/useReorderLayers';

const constantOffsetTop = 5;
const rotatorOffset = 30;

const alignTextStates = ['left', 'center', 'right', 'justify'];

const TOPMOST_MENU_POSITION = -46;
const colorPickerBoxSize = 18;

const getFontAlignStateIcon = (editorState) => {
  if (doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_LEFT, editorState)) {
    return <LeftAlign />;
  }
  if (doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_RIGHT, editorState)) {
    return <RightAlign />;
  }
  if (doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_JUSTIFY, editorState)) {
    return <JustifyAlign />;
  }

  return <CenterAlign />;
};

const EditorLayerMenu = ({
  layer,
  parentLayer,
  handleBatchLayerChange,
  offsetCorrections,
}) => {
  const dispatch = useAppDispatch();
  const selectedChildLayer = useAppSelector((state) => state.groupLayerHelper.selectedChildLayer);

  const [container, setContainer] = useState(null);

  const isCroppingModeActive = useAppSelector((state) => state.helpers.isCroppingMode);
  const croppedLayer = useAppSelector((state) => state.helpers.croppedLayer);
  const isReplaceModalActive = useAppSelector((state) => state.helpers.showReplaceModal);
  const isSplitModalActive = useAppSelector((state) => state.media.showSplitVideoModal);
  const isGroupLayerActive = useAppSelector((state) => state.groupLayerHelper.isGroupLayerActive);
  const activeLayer = useSelector(selectActiveLayer);
  const activeSlide = useSelector(selectActiveSlide);
  const { reorder } = useReorderLayers();

  const existingFullScreenLayer = activeSlide?.layers.find(
    (layer) => layer.settings.layerSettings.fullscreen === true,
  );

  const ref = useRef(null);

  const isLayerLocked = layer?.settings.layerSettings?.locked;
  const locked = layer?.settings?.generalSettings?.locked;
  const angle = layer?.settings?.generalSettings?.rotate;
  const offsetX = layer?.settings?.generalSettings?.offsetX;
  const offsetY = layer?.settings?.generalSettings?.offsetY;
  const width = layer?.settings?.layerSettings?.width;
  const height = layer?.settings?.layerSettings?.height;
  const thickness =
    layer?.settings?.layerSettings?.shapeStyles?.relativeThickness ??
    layer?.settings?.layerSettings?.shapeStyles?.thickness;
  const isActiveLayerLocked = layer?.settings.generalSettings.locked;
  const gradientSvgColors = layer?.content?.gradient?.colors;
  const isFullscreen = layer?.settings?.layerSettings?.fullscreen;
  const layerType = layer?.type;

  const activeFontColor = useMemo(
    () => layer?.settings.editorState && getActiveFontColor(layer?.settings.editorState),
    [layer?.settings.editorState],
  );

  const rotatedRect = useMemo(() => rotateRect(angle, +offsetX, +offsetY, width, height, thickness), [
    angle,
    height,
    offsetX,
    offsetY,
    thickness,
    width,
  ]);

  useEffect(() => {
    const caretElements = document.querySelectorAll('.public-DraftEditor-content');

    if (caretElements) {
      caretElements.forEach((el) => {
        if (el.style && activeFontColor && el.style.caretColor !== activeFontColor) {
          el.style.caretColor = activeFontColor;
        }
      });
    }
  }, [activeFontColor]);

  const activeLayerIsBold = useMemo(
    () =>
      doesTextHaveStyle(TEXT_INLINE_STYLES.BOLD, layer?.settings.editorState) ||
      doesTextHaveStyle('FONT_WEIGHT_700', layer?.settings.editorState),
    [layer?.settings.editorState],
  );
  const aboveMenuPosition = useMemo(() => {
    // if (isGroupLayerActive && !selectedChildLayer) {
    //   return layer.settings.generalSettings.offsetY - (container?.height ?? 0) - constantOffsetTop;
    // }

    if (isGroupLayerActive && !selectedChildLayer) {
      return (
        layer.settings.generalSettings.offsetY -
        (container?.height ?? 0) -
        constantOffsetTop -
        (angle >= 145 || angle <= -145 ? rotatorOffset : 0)
      );
    }

    return (
      Math.min(rotatedRect[0][1], rotatedRect[1][1], rotatedRect[2][1], rotatedRect[3][1]) -
      (container?.height ?? 0) -
      constantOffsetTop -
      (angle >= 145 || angle <= -145 ? rotatorOffset : 0) +
      (isCroppingModeActive ? croppedLayer?.settings?.cropSettings?.frame?.translate[1] ?? 0 : 0)
    );
  }, [
    angle,
    container?.height,
    croppedLayer?.settings?.cropSettings?.frame?.translate,
    isCroppingModeActive,
    isGroupLayerActive,
    layer.settings.generalSettings.offsetY,
    rotatedRect,
    selectedChildLayer,
  ]);

  const leftMenuPosition = useMemo(() => {
    if (isGroupLayerActive && !selectedChildLayer) {
      return (
        layer.settings.generalSettings.offsetX +
        (Math.max(rotatedRect[0][0], rotatedRect[1][0], rotatedRect[2][0], rotatedRect[3][0]) -
          Math.min(rotatedRect[0][0], rotatedRect[1][0], rotatedRect[2][0], rotatedRect[3][0])) /
          2 -
        (container?.width ?? 0) / 2
      );
    }

    return (
      (Math.min(rotatedRect[0][0], rotatedRect[1][0], rotatedRect[2][0], rotatedRect[3][0]) +
        Math.max(rotatedRect[0][0], rotatedRect[1][0], rotatedRect[2][0], rotatedRect[3][0])) /
        2 -
      (container?.width ?? 0) / 2 +
      (isCroppingModeActive ? croppedLayer?.settings?.cropSettings?.frame?.translate[0] ?? 0 : 0)
    );
  }, [
    container?.width,
    croppedLayer?.settings?.cropSettings?.frame?.translate,
    isCroppingModeActive,
    isGroupLayerActive,
    layer.settings.generalSettings.offsetX,
    rotatedRect,
    selectedChildLayer,
  ]);

  const belowMenuPosition = useMemo(() => {
    return aboveMenuPosition + layer.settings.layerSettings.height + (container?.height ?? 0) + rotatorOffset + 12;
  }, [aboveMenuPosition, container?.height, layer.settings.layerSettings.height]);

  const isMenuOverHeader = useMemo(() => aboveMenuPosition < TOPMOST_MENU_POSITION, [aboveMenuPosition]);
  const containerOffsetTop = useMemo(() => (isMenuOverHeader ? belowMenuPosition : aboveMenuPosition), [
    isMenuOverHeader,
    belowMenuPosition,
    aboveMenuPosition,
  ]);

  const alignmentItemIcon = useMemo(() => {
    if (layer.settings.editorState) {
      return getFontAlignStateIcon(layer?.settings.editorState);
    }
  }, [layer?.settings.editorState]);

  const isAlignmentActive = useMemo(
    () =>
      doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_LEFT, layer?.settings?.editorState) ||
      doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_RIGHT, layer?.settings?.editorState) ||
      doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_CENTER, layer?.settings?.editorState) ||
      doesTextHaveBlockStyle(TEXT_BLOCK_STYLES.ALIGN_JUSTIFY, layer?.settings?.editorState),
    [layer?.settings?.editorState],
  );

  const handleFullscreen = (event) => {
    event.stopPropagation();

    if (isFullscreen) {
      dispatch(toggleLayerFullScreen(false));
      reorder(activeLayer.position, activeSlide.layers.length - 1);
    } else {
      if (existingFullScreenLayer) {
        // Toggle background layer from full screen to normal size
        batch(() => {
          dispatch(setActiveLayerPosition(0));
          dispatch(toggleLayerFullScreen(false));
        });
      }

      // Toggle active layer to background
      batch(() => {
        dispatch(setActiveLayerPosition(activeLayer.position));
        dispatch(toggleLayerFullScreen(true));
      });

      reorder(activeLayer.position, 0);

      const oldFullScreenLayer = activeSlide.layers.find((layer) => layer._id === existingFullScreenLayer?._id);
      if (oldFullScreenLayer) {
        reorder(oldFullScreenLayer?.position + 1, activeSlide.layers.length - 1);
      }
    }
  };

  const handleReplaceMedia = (event) => {
    event.stopPropagation();
    dispatch(toggleReplaceModal());
  };

  const handleLayerToggleLock = (event) => {
    event.stopPropagation();

    if (layerType === layerTypes.GROUP && (layer?.childLayers?.length ?? -1) > 0) {
      const updatedLayers = layer?.childLayers?.map((cl) => {
        const nextState = produce(cl, (draftState) => {
          set(draftState, 'settings.generalSettings.locked', !locked);
        });

        return nextState;
      });

      handleBatchLayerChange([
        { field: `childLayers`, value: updatedLayers },
        { field: 'settings.generalSettings.locked', value: !locked },
      ]);
      return;
    }

    dispatch(setActiveLayerProps({ field: 'settings.generalSettings.locked', value: !locked }));
  };

  const handleSplitVideo = (event) => {
    event.stopPropagation();
    dispatch(toggleSplitVideoModal());
  };

  const handleUngroup = (event) => {
    event.stopPropagation();
    dispatch(unGroup());
  };

  const handleCroppingModeEnter = (event) => {
    event.stopPropagation();
    if (isCroppingModeActive) {
      dispatch(handleCroppedLayer());
      return;
    }
    dispatch(setIsCroppingMode(true));
  };

  const getNextAlignTextState = () => {
    const activeIndex = alignTextStates.map((item) => doesTextHaveBlockStyle(item, layer?.settings.editorState));
    const currentIndex = activeIndex.indexOf(true);
    const nextIndex = (currentIndex + 1) % alignTextStates.length;
    const nextItem = alignTextStates[nextIndex];

    return nextItem;
  };

  const onChangeBlockStyle = (event) => {
    event.stopPropagation();

    if (isActiveLayerLocked || !layer?.settings.editorState) {
      return;
    }

    const nextState = getNextAlignTextState();
    const editorState = RichUtils.toggleBlockType(layer?.settings.editorState, nextState);
    const newEditorState = EditorState.set(editorState, { undoStack: [], redoStack: [], allowUndo: false });
    const rawState = editorStateToRawContent(newEditorState);
    const contentState = newEditorState.getCurrentContent();
    const html = stateToHTML(contentState, textExportingOptions);

    if (!isNil(parentLayer)) {
      const updatedLayers = parentLayer?.childLayers?.map((cl) => {
        if (cl?._id === layer?._id) {
          const nextState = produce(cl, (draftState) => {
            set(draftState, `content.html`, html);
            set(draftState, `content.value`, rawState);
            set(draftState, `settings.editorState`, newEditorState);
          });

          return nextState;
        }

        return cl;
      });

      handleBatchLayerChange([{ field: `childLayers`, value: updatedLayers }]);
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
  };

  const getEditorStateAndSelection = useCallback(() => {
    let editorState = layer?.settings.editorState;
    let selection = editorState?.getSelection();

    if (editorState && selection?.getStartOffset() === selection?.getEndOffset()) {
      selection = selectAllText(editorState);
      editorState = EditorState.acceptSelection(editorState, selection);
    }

    return {
      selection,
      editorState,
    };
  }, [layer?.settings.editorState]);

  const onToggleLockSize = useCallback(
    (event) => {
      event.stopPropagation();
      if (isActiveLayerLocked) {
        return;
      }
      dispatch(disableSizeInputs());
    },
    [dispatch, isActiveLayerLocked],
  );

  const createInlineStyles = useCallback((prefix, value) => {
    return [
      {
        style: `${prefix}${value}`,
        prefix,
      },
    ];
  }, []);

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

      if (!isNil(parentLayer)) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl?._id === layer?._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, `content.html`, html);
              set(draftState, `content.value`, rawState);
              set(draftState, `settings.editorState`, newEditorState);
            });

            return nextState;
          }

          return cl;
        });

        handleBatchLayerChange([{ field: `childLayers`, value: updatedLayers }]);
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
    [isActiveLayerLocked, getEditorStateAndSelection, handleBatchLayerChange, parentLayer, layer?._id],
  );

  const toggleBoldFlag = useCallback(() => {
    dispatch(toggleLayerMenuBoldFlag(!activeLayerIsBold));
  }, [activeLayerIsBold, dispatch]);

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

  const handleGradientColorChange = useCallback(
    (el) => (_, c) => {
      const newColor = rgbaToHexa(c.toString());

      const newColors = produce(gradientSvgColors, (draftState) => {
        set(draftState, `${el}.color`, newColor);
      });

      if (!isNil(parentLayer)) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl?._id === layer?._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, `content.gradient.colors`, newColors);
            });

            return nextState;
          }

          return cl;
        });

        handleBatchLayerChange([{ field: `childLayers`, value: updatedLayers }]);
        return;
      }

      handleBatchLayerChange([{ field: 'content.gradient.colors', value: newColors }]);
    },
    [gradientSvgColors, handleBatchLayerChange, parentLayer, layer?._id],
  );

  useEffect(() => {
    if (ref.current && !isNil(layer)) {
      setContainer(ref?.current?.getBoundingClientRect());
    }
  }, [layer]);

  if (!isFinite(containerOffsetTop) || !isFinite(leftMenuPosition)) {
    return null;
  }

  if (isActiveLayerLocked) {
    return (
      <Styled.Container
        className={'editor-layer-menu'}
        ref={ref}
        isMenuOverHeader={isMenuOverHeader}
        top={containerOffsetTop}
        left={leftMenuPosition}
        isContainerVisible={!isNil(container)}
        onClick={stopPropagation}
        isCtaLayer={layer && (layerType === layerTypes.OUTLINK || layerType === layerTypes.CTA_LINK)}
        layerTextContentLength={
          layer &&
          (layerType === layerTypes.OUTLINK || layerType === layerTypes.CTA_LINK) &&
          (layer?.settings?.ctaLayerSettings?.linkTitle?.length ?? false)
        }
      >
        <IconButton
          padding={'0'}
          background={'transparent'}
          isBackdropActive={false}
          isBoxShadowActive={false}
          onMouseDown={handleLayerToggleLock}
          isActive={locked}
        >
          {locked ? <LockSM /> : <UnlockSM />}
        </IconButton>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container
      className={'editor-layer-menu'}
      ref={ref}
      isMenuOverHeader={offsetCorrections?.[0] ? false : isMenuOverHeader}
      top={containerOffsetTop + (offsetCorrections?.[0] ? offsetCorrections[0] : 0)}
      left={leftMenuPosition + (offsetCorrections?.[1] ? offsetCorrections[1] : 0)}
      isContainerVisible={!isNil(container)}
      onClick={stopPropagation}
      isCtaLayer={layer && (layerType === layerTypes.OUTLINK || layerType === layerTypes.CTA_LINK)}
      layerTextContentLength={
        layer &&
        (layerType === layerTypes.OUTLINK || layerType === layerTypes.CTA_LINK) &&
        (layer?.settings?.ctaLayerSettings?.linkTitle?.length ?? false)
      }
    >
      {(layerType === layerTypes.OUTLINK || layerType === layerTypes.SHAPE) && (
        <OutlinkColorPicker
          layer={layer}
          parentLayer={parentLayer}
          handleBatchLayerChange={handleBatchLayerChange}
          size={20}
        />
      )}

      {layerType === layerTypes.SHAPE && !selectedChildLayer && (
        <IconButton
          padding={'0'}
          background={'transparent'}
          isBackdropActive={false}
          isBoxShadowActive={false}
          onMouseDown={onToggleLockSize}
          isActive={isLayerLocked}
        >
          <ToggleLockSize />
        </IconButton>
      )}

      {layerType === layerTypes.GRADIENTS &&
        !isNil(gradientSvgColors) &&
        Object.keys(gradientSvgColors)?.map((el, index) =>
          index === 0 ? (
            <div onMouseDown={stopPropagation} key={`${el} - ${index}`}>
              <ColorPicker
                key={index}
                size={colorPickerBoxSize}
                isDisabled={layer?.settings.generalSettings.locked}
                colorType={IColorType.FillColor}
                leftColor={hexToRgb(gradientSvgColors?.[el]?.color)}
                defaultLeftColor={hexToRgb(gradientSvgColors?.[el]?.color)}
                handleColorChange={handleGradientColorChange(el)}
              />
            </div>
          ) : null,
        )}

      {layerType === layerTypes.HTML && (
        <>
          {activeFontColor && (
            <div onMouseDown={stopPropagation}>
              <ColorPicker
                size={colorPickerBoxSize}
                colorType={IColorType.FillColor}
                isDisabled={isActiveLayerLocked}
                defaultLeftColor={defaultTextFontColor}
                leftColor={activeFontColor}
                handleColorChange={onFontColorChange}
              />
            </div>
          )}
          <IconButton
            padding={'0'}
            background={'transparent'}
            isBackdropActive={false}
            isBoxShadowActive={false}
            onMouseDown={toggleBoldFlag}
            isActive={activeLayerIsBold}
          >
            <BoldSM />
          </IconButton>
          <IconButton
            padding={'0'}
            background={'transparent'}
            isBackdropActive={false}
            isBoxShadowActive={false}
            onMouseDown={onChangeBlockStyle}
            isActive={isAlignmentActive}
          >
            {alignmentItemIcon}
          </IconButton>
        </>
      )}
      {(layerType === layerTypes.IMAGE || layerType === layerTypes.VIDEO) && !selectedChildLayer && (
        <>
          <IconButton
            padding={'0'}
            background={'transparent'}
            isBackdropActive={false}
            isBoxShadowActive={false}
            onMouseDown={handleFullscreen}
            isActive={isFullscreen}
          >
            <FullscreenSM />
          </IconButton>
          <IconButton
            padding={'0'}
            background={'transparent'}
            isBackdropActive={false}
            isBoxShadowActive={false}
            onMouseDown={handleReplaceMedia}
            isActive={isReplaceModalActive}
          >
            <ReplaceSM />
          </IconButton>
        </>
      )}
      {!isFullscreen &&
        (layerType === layerTypes.IMAGE ||
          layerType === layerTypes.VIDEO ||
          layerType === layerTypes.STICKERS ||
          layerType === layerTypes.GIFS) && (
          <IconButton
            padding={'0'}
            background={'transparent'}
            isBackdropActive={false}
            isBoxShadowActive={false}
            onMouseDown={handleCroppingModeEnter}
            isActive={isCroppingModeActive}
            $stroke
          >
            <Crop />
          </IconButton>
        )}
      {layerType === layerTypes.VIDEO && (
        <IconButton
          padding={'0'}
          background={'transparent'}
          isBackdropActive={false}
          isBoxShadowActive={false}
          onMouseDown={handleSplitVideo}
          isActive={isSplitModalActive}
        >
          <SplitVideo />
        </IconButton>
      )}

      {layerType === layerTypes.GROUP && !locked && (
        <IconButton
          padding={'0'}
          background={'transparent'}
          isBackdropActive={false}
          isBoxShadowActive={false}
          onMouseDown={handleUngroup}
        >
          <UngroupSM />
        </IconButton>
      )}

      {!selectedChildLayer && (
        <IconButton
          padding={'0'}
          background={'transparent'}
          isBackdropActive={false}
          isBoxShadowActive={false}
          onMouseDown={handleLayerToggleLock}
          isActive={locked}
        >
          {locked ? <LockSM /> : <UnlockSM />}
        </IconButton>
      )}
    </Styled.Container>
  );
};

export default memo(EditorLayerMenu);
