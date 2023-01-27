import HideSourceIcon from '@mui/icons-material/HideSource';
import { useAppSelector } from 'hooks';
import path from 'path';
import { memo, useCallback, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { batch, useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { layerTypes } from '../../../interfaces/layer-types';
import { toggleSafeArea } from '../../../appredux/features/editor/safeArea/safeAreaSlice';
import { calculateNewActiveLayer } from '../../../utils/editorUtils';
import CtaLinkIcon from '@mui/icons-material/Link';
import Group from '../../icons/group';
import ImageIcon from '../../icons/image';
import LockIcon from '../../icons/lock';
import ShapeIcon from '../../icons/shape';
import ShowIcon from '../../icons/show';
import TextIcon from '../../icons/text';
import UnlockIcon from '../../icons/unlock';
import VideoIcon from '../../icons/video';
import ToggleSwitch from '../../shared/toggle-switch';
import Styled from './editor-layers-menu-styled';

// Redux
import produce from 'immer';
import { isNil, set } from 'lodash';
import { selectChildLayer } from 'appredux/features/editor/helpers/groupLayerHelperSlice';
import {
  makeSelectPropFromActiveLayer, reorderLayers,
  selectActiveSlide, selectSelectedLayers, setActiveLayerPosition, setActiveLayerProps,
  setActiveLayerPropsArray, setFilteredActiveLayerPropsArrayInStore, setSelectedLayerNumbers
} from '../../../appredux/features/amp-story/ampStorySlice';
import {
  incrementStoryChangedCount,
  setSelectedLayersChangeCounter
} from '../../../appredux/features/editor/helpers/helpersSlice';

const GroupIcon = styled(Group)`
  width: 15px;
  height: 15px;
`;

const GroupWrapper = styled.div`
  overflow: hidden;
  height: 0;
  max-width: 280px;
  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      overflow: visible;
      max-width: unset;
      height: max-content;
      margin-bottom: 8px;
    `}
`;

const EditorLayersMenu = ({ handleLayerClick }) => {
  const dispatch = useDispatch();
  const selectPropFromActiveLayer = useMemo(makeSelectPropFromActiveLayer, []);

  const activeSlide = useAppSelector(selectActiveSlide);
  const position = useAppSelector((state) => selectPropFromActiveLayer(state, 'position'));
  const isTitleDirty = useAppSelector((state) => selectPropFromActiveLayer(state, 'isTitleDirty'));
  const selectedLayers = useAppSelector(selectSelectedLayers);
  const isSocialMarginsVisible = useAppSelector((state) => state.safeArea.isActive);
  const selectedLayerNumbers = useAppSelector((state) => state.ampStory.present.selectedLayerNumbers);
  const selectedChildLayer = useAppSelector((state) => state.groupLayerHelper.selectedChildLayer);

  const [isGroupMenuOpen, setGroupMenuOpen] = useState(new Set([]));
  const [isSocialMarginsHovered, setIsSocialMarginsHovered] = useState(false);
  const [titleEditMode, setTitleEditMode] = useState(null);

  const sortedLayers = useMemo(() => {
    if (activeSlide) {
      return [...activeSlide?.layers].sort((layer, compareLayer) => compareLayer.position - layer.position);
    }
    return [];
  }, [activeSlide]);

  const layerIcons = {
    'cta-link': CtaLinkIcon,
    outlink: CtaLinkIcon,
    gifs: ImageIcon,
    image: ImageIcon,
    shape: ShapeIcon,
    text: TextIcon,
    video: VideoIcon,
    gradient: ShapeIcon,
    group: GroupIcon,
  };

  const getLayerType = useCallback(
    (type) =>
      type === layerTypes.HTML || type === layerTypes.TEXT ? 'text text-tab' : `${type} ${type}-tab`,
    [],
  );

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) {
        return;
      }

      if (result.destination.index === result.source.index) {
        return;
      }

      const destination =
        result.destination.index === 0 &&
        (sortedLayers[0].type === layerTypes.CTA_LINK || sortedLayers[0].type === layerTypes.OUTLINK)
          ? 1
          : result.destination?.index || 0;

      const endPosition = sortedLayers.length - 1;
      const newActiveLayerPosition = calculateNewActiveLayer(result.source.index, destination, position, endPosition);

      batch(() => {
        dispatch(
          reorderLayers({
            sourceLayerId: endPosition - result.source.index,
            destinationLayerId: endPosition - destination,
            activeSlidePosition: activeSlide.position,
          }),
        );
        dispatch(setSelectedLayerNumbers([newActiveLayerPosition]));
        dispatch(incrementStoryChangedCount());
        dispatch(setActiveLayerPosition(newActiveLayerPosition));
      });
    },
    [sortedLayers, position, dispatch, activeSlide?.position],
  );

  const onSelectLayer = useCallback(
    (layer, childLayer) => () => {
      // if (
      //   layer.type === layerTypes.GROUP &&
      //   !isNil(selectedLayerNumbers) &&
      //   !selectedLayerNumbers.includes(layer.position)
      // ) {
      //   return;
      // }
      setTitleEditMode(null);
      dispatch(selectChildLayer(childLayer || null));
      handleLayerClick(layer.position);
    },
    [dispatch, handleLayerClick],
  );

  const handleToggleLock = useCallback(
    (isActive, layer) => (event) => {
      event.stopPropagation();

      const newLockedStatus = !layer?.settings?.generalSettings?.locked;

      if (layer.type === layerTypes.GROUP && (layer?.childLayers?.length ?? 0) > 0) {
        const updatedLayers = layer?.childLayers?.map((cl) => {
          const nextState = produce(cl, (draftState) => {
            set(draftState, 'settings.generalSettings.locked', newLockedStatus);
          });

          return nextState;
        });

        batch(() => {
          dispatch(onSelectLayer(layer));
          dispatch(
            setActiveLayerPropsArray([
              { field: `childLayers`, value: updatedLayers },
              { field: 'settings.generalSettings.locked', value: newLockedStatus },
            ]),
          );
        });
      } else {
        batch(() => {
          dispatch(onSelectLayer(layer));
          dispatch(setActiveLayerProps({ field: 'settings.generalSettings.locked', value: newLockedStatus }));
        });
      }

      if (selectedLayers && selectedLayers?.length > 1 && selectedLayerNumbers?.includes(layer?.position)) {
        const currentLayerIndex = selectedLayers?.findIndex(
          (selectedLayer) => selectedLayer?.position === layer?.position,
        );

        const currentLayer = selectedLayers[currentLayerIndex];
        const fields = [
          {
            position: currentLayer.position,
            field: 'settings.generalSettings.locked',
            value: !currentLayer.settings.generalSettings.locked,
          },
        ];
        batch(() => {
          dispatch(setFilteredActiveLayerPropsArrayInStore(fields));
          dispatch(setSelectedLayersChangeCounter());
        });
      }
    },
    [dispatch, onSelectLayer, selectedLayerNumbers, selectedLayers],
  );

  const handleShowHideLayer = useCallback(
    (layer, parentLayer) => (event) => {
      event.stopPropagation();

      const newVisabilityStatus = !layer?.settings?.layerSettings?.isLayerHidden;

      if (!isNil(parentLayer)) {
        const updatedLayers = parentLayer?.childLayers?.map((child) => {
          if (child._id === layer._id) {
            return {
              ...child,
              settings: {
                ...child.settings,
                layerSettings: {
                  ...child.settings.layerSettings,
                  isLayerHidden: newVisabilityStatus,
                },
              },
            };
          }

          return child;
        });
        batch(() => {
          dispatch(onSelectLayer(parentLayer, layer));
          dispatch(setActiveLayerProps({ field: 'childLayers', value: updatedLayers }));
        });
        return;
      }

      batch(() => {
        dispatch(onSelectLayer(layer));
        dispatch(setActiveLayerProps({ field: 'settings.layerSettings.isLayerHidden', value: newVisabilityStatus }));
      });
    },
    [dispatch, onSelectLayer],
  );

  const onSocialMarginsToggle = useCallback(() => {
    dispatch(toggleSafeArea());
  }, [dispatch]);

  const onSocialMarginHover = useCallback(() => {
    setIsSocialMarginsHovered(!isSocialMarginsHovered);
  }, [isSocialMarginsHovered]);

  const onToggleEditModeState = useCallback(
    (layer) => (event) => {
      event.stopPropagation();

      setTitleEditMode((prev) => (prev === layer._id ? null : layer._id));
    },
    [],
  );

  const handleEditTitleModeClose = useCallback(() => setTitleEditMode(null), []);

  const handleTitleChange = useCallback(
    (parentLayer) => (event) => {
      if (parentLayer) {
        const updatedLayers = parentLayer?.childLayers?.map((child) => {
          if (child._id === selectedChildLayer?._id) {
            return { ...child, title: event.target.value, isTitleDirty: true };
          }
          return child;
        });

        dispatch(setActiveLayerProps({ field: 'childLayers', value: updatedLayers }));
        return;
      }

      if (!isTitleDirty) {
        batch(() => {
          dispatch(setActiveLayerProps({ field: 'title', value: event.target.value }));
          dispatch(setActiveLayerProps({ field: 'isTitleDirty', value: true }));
        });
        return;
      }
      dispatch(setActiveLayerProps({ field: 'title', value: event.target.value }));
    },
    [dispatch, isTitleDirty, selectedChildLayer?._id],
  );

  const handleTitleFocus = (event) => event.target.select();

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        handleEditTitleModeClose();
      }
    },
    [handleEditTitleModeClose],
  );

  const handleGroupMenuState = (layerId) => (e) => {
    e.preventDefault();
    e.stopPropagation();

    setGroupMenuOpen((prev) =>
      prev.has(layerId) ? new Set([...prev].filter((x) => x !== layerId)) : new Set(prev).add(layerId),
    );
  };

  return (
    <Styled.LayersMenuWrapper>
      <Styled.LayersWrapper>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="scroll-layers">
            {(provided) => (
              <div style={{ opacity: '1' }} {...provided.droppableProps} ref={provided.innerRef}>
                {sortedLayers?.map((layer, index) => {
                  const isActive = selectedLayerNumbers?.includes(layer?.position) && !selectedChildLayer;

                  const Icon =
                    layer.type !== layerTypes.GRADIENTS
                      ? layerIcons[getLayerType(layer.type).split(' ')[0]]
                      : layerIcons.gradient;
                  const isLocked = layer?.settings?.generalSettings?.locked;
                  const isHidden = layer?.settings?.layerSettings?.isLayerHidden;
                  const layerName =
                    layer.content.originalName && !layer.isTitleDirty
                      ? path.basename(layer.content.originalName, path.extname(layer.content.originalName))
                      : layer.title;
                  const isGroup = layer.type === 'group';

                  return (
                    <Draggable
                      index={index}
                      key={`${layer.position}-${layer._id}`}
                      draggableId={`${layer.position}-${layer._id}`}
                      isDragDisabled={layer.type === layerTypes.CTA_LINK || layer.type === layerTypes.OUTLINK}
                    >
                      {(provided, snapshot) => {
                        const rawTransform = provided.draggableProps.style?.transform;

                        let transform = rawTransform;

                        if (rawTransform && snapshot.isDragging) {
                          const parsedTransform = rawTransform.match(
                            /translate\((-?\d+(?:\.\d*)?)px, (-?\d+(?:\.\d*)?)px\)/,
                          );
                          if (parsedTransform) {
                            // let x = +parsedTransform[1];
                            let y = +parsedTransform[2];

                            // The height of the whole list
                            const height = (sortedLayers.length + 1) * 24 + 19;

                            // Current element max offset top
                            const topOffset = -1 * (index * 24 + 16 + index * 4);

                            // Current element max offset bottom
                            const bottomOffset = height - (index + 1) * 24 - index * 4;

                            // Active layer corrections
                            // if (isActive && x > 10) {
                            //   x = 10;
                            // }

                            // Active layer corrections
                            // if (isActive && x < -12) {
                            //   x = -12;
                            // }

                            // if (x > 70) {
                            //   x = 70;
                            // }

                            // if (x < -36) {
                            //   x = -36;
                            // }

                            // Active layer corrections
                            if (isActive && y < topOffset + 4) {
                              y = topOffset + 4;
                            }

                            if (y < topOffset) {
                              y = topOffset;
                            }

                            if (y > bottomOffset) {
                              y = bottomOffset;
                            }

                            transform = `translate(0px, ${y}px)`;
                          }
                        }

                        const style = {
                          ...provided.draggableProps.style,
                          transform,
                        };

                        return (
                          <div
                            key={`${layer?._id}-${layer?.position}-${layer?.type}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={style}
                          >
                            <Styled.LayerItem
                              isActive={isActive}
                              isGroup={isGroup}
                              data-test={layer.position}
                              onClick={onSelectLayer(layer)}
                              onDoubleClick={onToggleEditModeState(layer)}
                            >
                              {isGroup && (
                                <Styled.DropdownIconWrapper onClick={handleGroupMenuState(layer._id)}>
                                  <Styled.DropdownIcon
                                    isMenuOpen={isGroupMenuOpen.has(layer._id)}
                                    isActive={isActive}
                                  />
                                </Styled.DropdownIconWrapper>
                              )}

                              <Styled.LayerItemImageWrapper isGreyedOut={isHidden}>
                                <Icon />
                              </Styled.LayerItemImageWrapper>
                              <>
                                {titleEditMode === layer._id ? (
                                  <div style={{ display: 'flex' }}>
                                    <Styled.LayerTitleInput
                                      autoFocus
                                      value={layerName}
                                      onChange={handleTitleChange()}
                                      onFocus={handleTitleFocus}
                                      onKeyDown={handleKeyDown}
                                      onBlur={handleEditTitleModeClose}
                                    />
                                  </div>
                                ) : (
                                  <Styled.LayerItemName
                                    capitalize={!layer.content.originalName}
                                    isActive={isActive}
                                    isGreyedOut={isHidden}
                                  >
                                    {layerName}
                                  </Styled.LayerItemName>
                                )}
                              </>

                              <div style={{ display: 'flex' }}>
                                {!isLocked && (
                                  <Styled.LayerItemButtonWrapper
                                    isActive={isHidden}
                                    onClick={handleShowHideLayer(layer)}
                                  >
                                    {isHidden ? <HideSourceIcon /> : <ShowIcon />}
                                  </Styled.LayerItemButtonWrapper>
                                )}

                                <Styled.LayerItemButtonWrapper
                                  isActive={isLocked}
                                  onClick={handleToggleLock(isActive, layer)}
                                >
                                  {isLocked ? <LockIcon /> : <UnlockIcon />}
                                </Styled.LayerItemButtonWrapper>
                              </div>
                            </Styled.LayerItem>
                            {layer?.type === layerTypes.GROUP && layer?.childLayers?.length > 0 ? (
                              <GroupWrapper isMenuOpen={isGroupMenuOpen.has(layer._id)}>
                                {/* Layer Item Childs */}
                                {[...layer.childLayers]
                                  ?.sort(
                                    (childLayer, compareChildLayer) =>
                                      compareChildLayer?.position - childLayer?.position,
                                  )
                                  ?.map((child) => {
                                    const isChildActive = selectedChildLayer?._id === child._id;
                                    // const isChildLocked = child?.settings?.generalSettings?.locked;
                                    const IconChild =
                                      child.type !== layerTypes.GRADIENTS
                                        ? layerIcons[getLayerType(child.type).split(' ')[0]]
                                        : layerIcons.gradient;

                                    const isChildHidden = child?.settings?.layerSettings?.isLayerHidden;

                                    return (
                                      <div
                                        key={`${child?._id}-${child?.position}-${child?.type}`}
                                        style={{ marginLeft: '20px' }}
                                      >
                                        <Styled.LayerItem
                                          isActive={isChildActive}
                                          isGroup={false}
                                          data-test={child.position}
                                          onClick={onSelectLayer(layer, child)}
                                          onDoubleClick={onToggleEditModeState(child)}
                                        >
                                          <Styled.LayerItemImageWrapper isGreyedOut={isChildHidden}>
                                            <IconChild />
                                          </Styled.LayerItemImageWrapper>
                                          <>
                                            {titleEditMode === child._id ? (
                                              <div style={{ display: 'flex' }}>
                                                <Styled.LayerTitleInput
                                                  autoFocus
                                                  value={child.title}
                                                  onChange={handleTitleChange(layer)}
                                                  onFocus={handleTitleFocus}
                                                  onKeyDown={handleKeyDown}
                                                  onBlur={handleEditTitleModeClose}
                                                />
                                              </div>
                                            ) : (
                                              <Styled.LayerItemName
                                                capitalize={!child.content.originalName}
                                                isActive={isChildActive}
                                                isGreyedOut={isChildHidden}
                                              >
                                                {child.title}
                                              </Styled.LayerItemName>
                                            )}
                                          </>
                                          <div style={{ display: 'flex' }}>
                                            {!isLocked && (
                                              <Styled.LayerItemButtonWrapper
                                                isActive={isChildHidden}
                                                onClick={handleShowHideLayer(child, layer)}
                                              >
                                                {isChildHidden ? <HideSourceIcon /> : <ShowIcon />}
                                              </Styled.LayerItemButtonWrapper>
                                            )}
                                          </div>
                                        </Styled.LayerItem>
                                      </div>
                                    );
                                  })}
                              </GroupWrapper>
                            ) : (
                              <></>
                            )}
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </Styled.LayersWrapper>

      <Styled.SocialMarginsWrapper>
        <Styled.SocialMarginsItem
          onMouseEnter={onSocialMarginHover}
          onMouseLeave={onSocialMarginHover}
          onClick={onSocialMarginsToggle}
        >
          <Styled.SocialMarginLabel>Social Margins</Styled.SocialMarginLabel>

          <ToggleSwitch isHovered={isSocialMarginsHovered} isOn={isSocialMarginsVisible} />
        </Styled.SocialMarginsItem>
      </Styled.SocialMarginsWrapper>
    </Styled.LayersMenuWrapper>
  );
};

export default memo(EditorLayersMenu);
