import useReorderLayers from 'components/editor-layer-menu/shared/useReorderLayers';
import produce from 'immer';
import { isNil, set } from 'lodash';
import { useCallback, useMemo } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { selectChildLayer } from 'appredux/features/editor/helpers/groupLayerHelperSlice';
import { layerTypes } from '../../interfaces/layer-types';
import {
  createNewGroup,
  lockLayers,
  makeSelectPropFromActiveLayer,
  selectActiveLayer,
  selectActiveSlide,
  selectSelectedLayers,
  setActiveLayerPosition,
  setActiveLayerProps,
  setActiveLayerPropsArray,
  unGroup,
} from '../../appredux/features/amp-story/ampStorySlice';
import {
  copyLayer,
  cutLayer,
  deleteLayerAction,
  duplicateLayerAction,
  pasteLayer,
  setIsCroppingMode,
  toggleReplaceModal,
} from '../../appredux/features/editor/helpers/helpersSlice';
import { toggleLayerFullScreen } from '../../appredux/features/editor/image/imageSlice';
import { toggleSplitVideoModal } from '../../appredux/features/media/mediaSlice';
import { isMediaLayer } from '../../utils/editorUtils';
import getDefaultModifierKey, { DEFAULT_KEY } from '../../utils/getKeyboardModifierKey';
import {
  ArrowDown,
  ArrowDownCircle,
  ArrowFromBottom,
  ArrowFromTop,
  ArrowUp,
  CirclePlus,
  Crop,
  Delete,
  DuplicateSlide,
  FullscreenSM,
  Group,
  Hide,
  ReplaceIcon,
  Scissor,
  Show,
  SplitVideo,
  Ungroup,
} from '../icons';
import LockIcon from '../icons/lock';
import UnlockIcon from '../icons/unlock';
import EditorContextMenuStyled from './editor-context-menu-styled';

const EditorContextMenu = ({ top, left, onClose, menuRef }) => {
  const dispatch = useDispatch();
  const selectPropFromActiveLayer = useMemo(makeSelectPropFromActiveLayer, []);
  const locked = useSelector((state) => selectPropFromActiveLayer(state, 'settings.generalSettings.locked'));
  const isFullscreen = useSelector((state) =>
    selectPropFromActiveLayer(state, 'settings.layerSettings.fullscreen'),
  );
  const isLayerHidden = useSelector((state) =>
    selectPropFromActiveLayer(state, 'settings.layerSettings.isLayerHidden'),
  );
  const copyLayerToClipboard = useSelector((state) => state.helpers.copiedLayers);
  const isOpen = useSelector((state) => state.helpers.isEditorContextMenuOpen);
  const defaultButtonText = getDefaultModifierKey() === DEFAULT_KEY.CONTROL ? 'Ctrl' : 'Cmd';
  const deleteButtonText = defaultButtonText === 'Ctrl' ? 'Delete' : 'Backspace';
  const activeSlide = useSelector(selectActiveSlide);
  const activeLayer = useSelector(selectActiveLayer);
  const cannotReorderLayer = typeof activeLayer?.position === 'undefined' ? true : activeLayer?.position === -1;
  const isCroppingMode = useSelector((state) => state.helpers.isCroppingMode);
  const selectedChildLayer = useSelector((state) => state.groupLayerHelper.selectedChildLayer);
  const selectedLayers = useSelector(selectSelectedLayers);
  const { reorder } = useReorderLayers();

  const isMultiselectLocked = useMemo(
    () => selectedLayers?.some((layer) => layer.settings.generalSettings.locked),
    [selectedLayers],
  );

  const hasGroupInMultiSelection = useMemo(
    () => selectedLayers?.some((layer) => layer.type === layerTypes.GROUP),
    [selectedLayers],
  );

  const isDisabled = useMemo(() => {
    return !(selectedLayers?.length > 0);
  }, [selectedLayers]);

  const sortedLayers = useMemo(() => {
    if (activeSlide) {
      return [...activeSlide?.layers].sort((layer, compareLayer) => compareLayer.position - layer.position);
    }
    return [];
  }, [activeSlide]);

  const existingFullScreenLayerMemoized = useMemo(
    () => activeSlide?.layers.find((layer) => layer.settings.layerSettings.fullscreen === true),
    [activeSlide?.layers],
  );

  const canSendBackward = useMemo(() => {
    if (existingFullScreenLayerMemoized?._id === activeLayer?._id) {
      return false;
    }

    return (
      (!existingFullScreenLayerMemoized && activeLayer?.position !== 0) ||
      (existingFullScreenLayerMemoized && activeLayer?.position !== 1)
    );
  }, [activeLayer?._id, activeLayer?.position, existingFullScreenLayerMemoized]);

  const canBringForward =
    sortedLayers.length > 0
      ? existingFullScreenLayerMemoized?._id !== activeLayer?._id &&
        activeLayer?.position !== sortedLayers?.length - 1 &&
        !(
          (sortedLayers[0].type === layerTypes.CTA_LINK || sortedLayers[0].type === layerTypes.OUTLINK) &&
          activeLayer?.position + 1 === sortedLayers.length - 1
        )
      : false;

  const canCopyLayer =
    !cannotReorderLayer && !(activeLayer?.type === layerTypes.CTA_LINK || activeLayer?.type === layerTypes.OUTLINK);
  const canReplace = activeLayer?.type === layerTypes.IMAGE || activeLayer?.type === layerTypes.VIDEO;

  const onBringForward = (event) => {
    event.stopPropagation();
    if (canBringForward && activeLayer) {
      reorder(activeLayer.position, activeLayer.position + 1);
      onClose();
    }
  };

  const onBringToFront = (event) => {
    event.stopPropagation();
    if (
      canBringForward &&
      activeLayer &&
      (sortedLayers[0].type === layerTypes.CTA_LINK || sortedLayers[0].type === layerTypes.OUTLINK)
    ) {
      reorder(activeLayer.position, sortedLayers.length - 2);
      onClose();
      return;
    }
    if (canBringForward && activeLayer && sortedLayers?.length) {
      reorder(activeLayer.position, sortedLayers.length - 1);
      onClose();
    }
  };

  const onSendBackward = (event) => {
    event.stopPropagation();
    if (canSendBackward && activeLayer) {
      reorder(activeLayer.position, activeLayer.position - 1);
      onClose();
    }
  };

  const onSendToBack = (event) => {
    event.stopPropagation();
    if (canSendBackward && activeLayer && sortedLayers?.length) {
      if (existingFullScreenLayerMemoized) {
        reorder(activeLayer.position, 1);
      } else {
        reorder(activeLayer.position, 0);
      }
      onClose();
    }
  };

  const onCutLayer = (event) => {
    event.stopPropagation();

    if (!isDisabled) {
      dispatch(cutLayer());
      onClose();
    }
  };

  const onCopyLayer = (event) => {
    event.stopPropagation();

    if (!isDisabled) {
      dispatch(copyLayer());
      onClose();
    }
  };

  const onPasteLayer = (event) => {
    event.stopPropagation();
    dispatch(pasteLayer());
    onClose();
  };

  const onDuplicateLayer = (event) => {
    event.stopPropagation();
    if (!isDisabled) {
      dispatch(duplicateLayerAction());
      onClose();
    }
  };

  const onDeleteLayer = (event) => {
    event.stopPropagation();
    if (!isDisabled) {
      dispatch(deleteLayerAction());
      onClose();
    }
  };

  const onLockLayer = (event) => {
    event.stopPropagation();

    if (isNil(activeLayer) && selectedLayers?.length > 1) {
      dispatch(lockLayers(!isMultiselectLocked));
      return;
    }

    if (activeLayer.type === layerTypes.GROUP && activeLayer?.childLayers?.length > 0) {
      const updatedLayers = activeLayer?.childLayers?.map((cl) => {
        const nextState = produce(cl, (draftState) => {
          set(draftState, 'settings.generalSettings.locked', !locked);
        });

        return nextState;
      });

      dispatch(
        setActiveLayerPropsArray([
          { field: `childLayers`, value: updatedLayers },
          { field: 'settings.generalSettings.locked', value: !locked },
        ]),
      );

      onClose();
      return;
    }

    dispatch(setActiveLayerProps({ field: 'settings.generalSettings.locked', value: !locked }));
    onClose();
  };

  const onCroppingModeEnter = (event) => {
    event.stopPropagation();
    dispatch(setIsCroppingMode(true));
  };

  const onReplaceMedia = (event) => {
    event.stopPropagation();
    dispatch(toggleReplaceModal());
  };

  const onSplitVideo = (event) => {
    event.stopPropagation();
    dispatch(toggleSplitVideoModal());
  };

  const handleFullscreen = (event) => {
    event.stopPropagation();

    if (isFullscreen) {
      dispatch(toggleLayerFullScreen(false));
      reorder(activeLayer.position, sortedLayers.length - 1);
      return;
    }

    if (existingFullScreenLayerMemoized) {
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

    const oldFullScreenLayer = activeSlide.layers.find(
      (layer) => layer._id === existingFullScreenLayerMemoized?._id,
    );
    if (oldFullScreenLayer) {
      reorder(oldFullScreenLayer?.position + 1, activeSlide.layers.length - 1);
    }
  };

  const onShowHideLayer = (event) => {
    event.stopPropagation();

    if (activeLayer.type === layerTypes.GROUP && activeLayer?.childLayers?.length > 0) {
      let newChild = null;
      const updatedLayers = activeLayer?.childLayers?.map((cl) => {
        if (cl._id === selectedChildLayer?._id) {
          const nextState = produce(cl, (draftState) => {
            set(draftState, 'settings.layerSettings.isLayerHidden', !cl.settings.layerSettings.isLayerHidden);
          });

          newChild = nextState;
          return nextState;
        }

        return cl;
      });

      dispatch(setActiveLayerProps({ field: `childLayers`, value: updatedLayers }));
      dispatch(selectChildLayer(newChild));
      return;
    }

    dispatch(setActiveLayerProps({ field: 'settings.layerSettings.isLayerHidden', value: !isLayerHidden }));
  };

  const onGroup = useCallback(
    (event) => {
      event.stopPropagation();

      dispatch(createNewGroup());
      onClose();
    },
    [dispatch, onClose],
  );

  const onUngroup = useCallback(
    (event) => {
      event.stopPropagation();

      if (locked) {
        return;
      }

      dispatch(unGroup());
      onClose();
    },
    [dispatch, locked, onClose],
  );

  if (locked || isMultiselectLocked) {
    return (
      <EditorContextMenuStyled.Wrapper
        isOpen={isOpen}
        style={{
          top,
          left,
        }}
        ref={menuRef}
      >
        <EditorContextMenuStyled.MenuItem $isDisabled={false} onMouseDown={onLockLayer}>
          <EditorContextMenuStyled.MenuItemIcon>
            {locked || isMultiselectLocked ? <UnlockIcon /> : <LockIcon />}
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>
            {locked || isMultiselectLocked ? 'Unlock' : 'Lock'}
          </EditorContextMenuStyled.MenuItemLabel>
        </EditorContextMenuStyled.MenuItem>
      </EditorContextMenuStyled.Wrapper>
    );
  }

  if (selectedChildLayer && activeLayer.type === layerTypes.GROUP) {
    return (
      <EditorContextMenuStyled.Wrapper
        isOpen={isOpen}
        style={{
          top,
          left,
        }}
        ref={menuRef}
      >
        <EditorContextMenuStyled.MenuItem onMouseDown={onShowHideLayer}>
          <EditorContextMenuStyled.MenuItemIcon>
            {selectedChildLayer.settings.layerSettings.isLayerHidden ? <Show /> : <Hide />}
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>
            {selectedChildLayer.settings.layerSettings.isLayerHidden ? 'Show' : 'Hide'}
          </EditorContextMenuStyled.MenuItemLabel>
        </EditorContextMenuStyled.MenuItem>
      </EditorContextMenuStyled.Wrapper>
    );
  }

  return (
    <EditorContextMenuStyled.Wrapper
      isOpen={isOpen}
      style={{
        top,
        left,
      }}
      ref={menuRef}
    >
      {canReplace && (
        <EditorContextMenuStyled.MenuItem $isDisabled={!canReplace} onMouseDown={onReplaceMedia}>
          <EditorContextMenuStyled.MenuItemIcon>
            <ReplaceIcon />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>Replace</EditorContextMenuStyled.MenuItemLabel>
        </EditorContextMenuStyled.MenuItem>
      )}
      {!(cannotReorderLayer || isCroppingMode || !isMediaLayer(activeLayer?.type)) && !isFullscreen && (
        <EditorContextMenuStyled.MenuItem
          $isDisabled={cannotReorderLayer || isCroppingMode || !isMediaLayer(activeLayer?.type)}
          onMouseDown={onCroppingModeEnter}
        >
          <EditorContextMenuStyled.MenuItemIcon>
            <Crop />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>Crop</EditorContextMenuStyled.MenuItemLabel>
        </EditorContextMenuStyled.MenuItem>
      )}
      {activeLayer?.type === layerTypes.VIDEO && (
        <EditorContextMenuStyled.MenuItem
          $isDisabled={activeLayer?.type !== layerTypes.VIDEO}
          onMouseDown={onSplitVideo}
        >
          <EditorContextMenuStyled.MenuItemIcon>
            <SplitVideo />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>Split (Beta)</EditorContextMenuStyled.MenuItemLabel>
        </EditorContextMenuStyled.MenuItem>
      )}
      {!isDisabled && (activeLayer?.type === layerTypes.VIDEO || activeLayer?.type === layerTypes.IMAGE) && (
        <EditorContextMenuStyled.MenuItem $isDisabled={isDisabled} onMouseDown={handleFullscreen}>
          <EditorContextMenuStyled.MenuItemIcon>
            <FullscreenSM />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>
            {isFullscreen ? 'Remove background' : 'Set as background'}
          </EditorContextMenuStyled.MenuItemLabel>
        </EditorContextMenuStyled.MenuItem>
      )}
      {!isDisabled && (
        <EditorContextMenuStyled.MenuItem $isDisabled={isDisabled} onMouseDown={onCutLayer}>
          <EditorContextMenuStyled.MenuItemIcon>
            <Scissor />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>Cut</EditorContextMenuStyled.MenuItemLabel>

          <EditorContextMenuStyled.MenuItemShortcut>{defaultButtonText}+X</EditorContextMenuStyled.MenuItemShortcut>
        </EditorContextMenuStyled.MenuItem>
      )}
      {!isDisabled && (
        <EditorContextMenuStyled.MenuItem $isDisabled={isDisabled} onMouseDown={onCopyLayer}>
          <EditorContextMenuStyled.MenuItemIcon>
            <CirclePlus />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>Copy</EditorContextMenuStyled.MenuItemLabel>

          <EditorContextMenuStyled.MenuItemShortcut>{defaultButtonText}+C</EditorContextMenuStyled.MenuItemShortcut>
        </EditorContextMenuStyled.MenuItem>
      )}
      {/* In case there is no selected layer and nothing in the clipboard show disabled paste as context menu */}
      {(copyLayerToClipboard?.layerCopies?.length || (!activeLayer && !copyLayerToClipboard?.layerCopies?.length)) && (
        <EditorContextMenuStyled.MenuItem
          $isDisabled={!copyLayerToClipboard?.layerCopies?.length}
          onMouseDown={onPasteLayer}
        >
          <EditorContextMenuStyled.MenuItemIcon>
            <ArrowDownCircle />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>Paste</EditorContextMenuStyled.MenuItemLabel>

          <EditorContextMenuStyled.MenuItemShortcut>{defaultButtonText}+V</EditorContextMenuStyled.MenuItemShortcut>
        </EditorContextMenuStyled.MenuItem>
      )}
      {canCopyLayer && (
        <EditorContextMenuStyled.MenuItem $isDisabled={!canCopyLayer} onMouseDown={onDuplicateLayer}>
          <EditorContextMenuStyled.MenuItemIcon>
            <DuplicateSlide color={'currentColor'} width={'18px'} height={'18px'} />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>Duplicate</EditorContextMenuStyled.MenuItemLabel>

          <EditorContextMenuStyled.MenuItemShortcut>{defaultButtonText}+D</EditorContextMenuStyled.MenuItemShortcut>
        </EditorContextMenuStyled.MenuItem>
      )}
      {!cannotReorderLayer && (
        <EditorContextMenuStyled.MenuItem $isDisabled={cannotReorderLayer} onMouseDown={onLockLayer}>
          <EditorContextMenuStyled.MenuItemIcon>
            {locked ? <UnlockIcon /> : <LockIcon />}
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>{locked ? 'Unlock' : 'Lock'}</EditorContextMenuStyled.MenuItemLabel>
        </EditorContextMenuStyled.MenuItem>
      )}

      {activeLayer && (
        <EditorContextMenuStyled.MenuItem onMouseDown={onShowHideLayer}>
          <EditorContextMenuStyled.MenuItemIcon>
            {isLayerHidden ? <Show /> : <Hide />}
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>
            {isLayerHidden ? 'Show' : 'Hide'}
          </EditorContextMenuStyled.MenuItemLabel>
        </EditorContextMenuStyled.MenuItem>
      )}

      {!isDisabled && (
        <EditorContextMenuStyled.MenuItem $isDisabled={isDisabled} onMouseDown={onDeleteLayer}>
          <EditorContextMenuStyled.MenuItemIcon>
            <Delete color={'currentColor'} width={'18px'} height={'18px'} />
          </EditorContextMenuStyled.MenuItemIcon>

          <EditorContextMenuStyled.MenuItemLabel>Delete</EditorContextMenuStyled.MenuItemLabel>

          <EditorContextMenuStyled.MenuItemShortcut>{deleteButtonText}</EditorContextMenuStyled.MenuItemShortcut>
        </EditorContextMenuStyled.MenuItem>
      )}
      {activeLayer?.type === layerTypes.GROUP && !locked && (
        <>
          <EditorContextMenuStyled.Splitter />
          <EditorContextMenuStyled.MenuItem onMouseDown={onUngroup}>
            <EditorContextMenuStyled.MenuItemIcon>
              <Ungroup />
            </EditorContextMenuStyled.MenuItemIcon>

            <EditorContextMenuStyled.MenuItemLabel>Ungroup</EditorContextMenuStyled.MenuItemLabel>
            <EditorContextMenuStyled.MenuItemShortcut>
              {defaultButtonText}+Shift+G
            </EditorContextMenuStyled.MenuItemShortcut>
          </EditorContextMenuStyled.MenuItem>
        </>
      )}
      {selectedLayers?.length > 1 && !hasGroupInMultiSelection && (
        <>
          <EditorContextMenuStyled.Splitter />

          <EditorContextMenuStyled.MenuItem onMouseDown={onGroup}>
            <EditorContextMenuStyled.MenuItemIcon>
              <Group />
            </EditorContextMenuStyled.MenuItemIcon>

            <EditorContextMenuStyled.MenuItemLabel>Group</EditorContextMenuStyled.MenuItemLabel>
            <EditorContextMenuStyled.MenuItemShortcut>{defaultButtonText}+G</EditorContextMenuStyled.MenuItemShortcut>
          </EditorContextMenuStyled.MenuItem>
        </>
      )}
      {activeLayer?.type !== layerTypes.OUTLINK && activeLayer?.type !== layerTypes.CTA_LINK && (
        <>
          {(!(cannotReorderLayer || !canBringForward) || !(cannotReorderLayer || !canSendBackward)) && (
            <EditorContextMenuStyled.Splitter />
          )}

          {!(cannotReorderLayer || !canBringForward) && (
            <>
              <EditorContextMenuStyled.MenuItem
                $isDisabled={cannotReorderLayer || !canBringForward}
                onMouseDown={onBringForward}
              >
                <EditorContextMenuStyled.MenuItemIcon>
                  <ArrowUp />
                </EditorContextMenuStyled.MenuItemIcon>

                <EditorContextMenuStyled.MenuItemLabel>Bring forward</EditorContextMenuStyled.MenuItemLabel>
              </EditorContextMenuStyled.MenuItem>
              <EditorContextMenuStyled.MenuItem
                $isDisabled={cannotReorderLayer || !canBringForward}
                onMouseDown={onBringToFront}
              >
                <EditorContextMenuStyled.MenuItemIcon>
                  <ArrowFromBottom />
                </EditorContextMenuStyled.MenuItemIcon>

                <EditorContextMenuStyled.MenuItemLabel>Bring to front</EditorContextMenuStyled.MenuItemLabel>
              </EditorContextMenuStyled.MenuItem>
            </>
          )}

          {!(cannotReorderLayer || !canSendBackward) && (
            <>
              <EditorContextMenuStyled.MenuItem
                $isDisabled={cannotReorderLayer || !canSendBackward}
                onMouseDown={onSendBackward}
              >
                <EditorContextMenuStyled.MenuItemIcon>
                  <ArrowDown />
                </EditorContextMenuStyled.MenuItemIcon>

                <EditorContextMenuStyled.MenuItemLabel>Send backward</EditorContextMenuStyled.MenuItemLabel>
              </EditorContextMenuStyled.MenuItem>
              <EditorContextMenuStyled.MenuItem
                $isDisabled={cannotReorderLayer || !canSendBackward}
                onMouseDown={onSendToBack}
              >
                <EditorContextMenuStyled.MenuItemIcon>
                  <ArrowFromTop />
                </EditorContextMenuStyled.MenuItemIcon>

                <EditorContextMenuStyled.MenuItemLabel>Send to back</EditorContextMenuStyled.MenuItemLabel>
              </EditorContextMenuStyled.MenuItem>
            </>
          )}
        </>
      )}
    </EditorContextMenuStyled.Wrapper>
  );
};

export default EditorContextMenu;
