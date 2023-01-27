import { skipToken } from '@reduxjs/toolkit/dist/query';
import ColorPicker from 'components/color-picker';
import { DotsIcon } from 'components/icons';
import InlineEditor from 'components/inline-editor';
import MessageModal from 'components/message-modal';
import { useAppSelector } from 'hooks';
import { IColorType } from 'interfaces/colors';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast, Zoom } from 'react-toastify';
import { RoleName } from 'appredux/services/workspaces/interface';
import {
  useCreateWorkspaceColorPaletteMutation,
  useDeleleWorkspaceColorPaletteMutation, useGetWorkspaceQuery, useUpdateWorkspaceColorPaletteMutation
} from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import { preventDefault } from 'utils/common';
import { v4 } from 'uuid';
import { Delete } from '../../icons';
import { MoveableTooltip } from '../../tooltip';
import DomainsSettingsStyled from '../custom-domains-settings/custom-domains-settings-styled';
import SettingsCard from '../shared/settings-card';
import SettingsColumn from '../shared/settings-column';
import SettingsLabel from '../shared/settings-label';
import SettingsPlusBtnSM from '../shared/settings-plus-btn-sm';
import SettingsPlus from '../shared/settings-plus-circle';
import SettingsRow from '../shared/settings-row';
import SettingsTitle from '../shared/settings-title';
import Styled from './styled-color-palette';

const ColorPaletteWrapper = styled.div`
  padding: 14px 41px 18px 12px;
  margin-bottom: 34px;
`;

const ColorSettingPaletteSectionWrapper = styled.div`
  display: flex;
  min-width: 0;
  max-width: 100%;
  align-items: start;
  white-space: nowrap;
  justify-content: flex-start;
  color: var(--white);
  cursor: pointer;
  position: relative;
  border-radius: 6px;
  flex-wrap: wrap;
  border-radius: 6px;
  gap: 31px 77px;
`;

const Title = styled(SettingsTitle)`
  margin: 0 0 14px;
`;

const StyledColorWrapper = styled.div`
  margin-left: 13px;
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  width: 328px;
  gap: 12px;
`;

const ColorPaletteItemWrapper = styled.div`
  background: var(--shade-700);
  position: relative;
  border-radius: 8px;
`;

const StyledColorItem = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 8px;
`;

const CreateNewPaletteWrapper = styled(DomainsSettingsStyled.DomainPlusTitleWrapper)`
  &&& {
    align-items: center;
    cursor: pointer;
  }
`;

const CustomLabel = styled(SettingsLabel)`
  &&& {
    margin: 0;
    cursor: pointer;
  }
`;

const OverrideSettingsCard = styled(SettingsCard)`
  z-index: 1;
  position: relative;
  backdrop-filter: none;
`;

const attachReference = (
  paletteId,
  ref,
) => (instance) => {
  if (instance) {
    if (ref.current) {
      ref.current[paletteId] = instance;
      return;
    }

    ref.current = {
      [paletteId]: instance,
    };
  }
};

const ColorSettings = ({ isInModal = false }) => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const refreshTimeout = useRef(null);
  const [isNewPaletteExist, setIsNewPaletteExist] = useState(false);
  const [isCurrentTargetTextSelected, setCurrentTargetTextSelected] = useState(false);

  const { isWorkspaceAdmin, colorPalettes } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
      colorPalettes: workspace?.colorPalettes,
    }),
  });

  const [createWorkspaceColorPalette] = useCreateWorkspaceColorPaletteMutation();
  const [deleleWorkspaceColorPalette] = useDeleleWorkspaceColorPaletteMutation();
  const [updateWorkspaceColorPalette] = useUpdateWorkspaceColorPaletteMutation();

  const colorPickerPositionRef = useRef(null);
  const containerRef = useRef(null);

  // Palette name
  const [inputActiveId, setInputActiveId] = useState(null);
  const [paletteName, setPaletteName] = useState('');
  const [oldName, setOldName] = useState('');

  // Dropdown menu
  const [isDropdownMenuVisible, setDropdownMenuVisible] = useState(null);

  // Delete icon
  const [isDeleteIconVisible, setDeleteIconVisible] = useState(null);

  // Active color
  const [activeColor, setActiveColor] = useState(null);

  // Color picker positions
  const [absoluteRightPosition, setAbsoluteRightPosition] = useState(null);
  const [absoluteTopPosition, setAbsoluteTopPosition] = useState(null);

  // Initial color picker after color creation visible
  const [isColorPickerVisible, setColorPickerVisible] = useState(null);

  const [selectedColorPaletteId, setSelectedColorPaletteId] = useState(null);

  // Admin lock tooltip
  const [showTooltip, setShowTooltip] = useState(false);

  // Delete modal
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(null);

  // Add color with delay
  const [delayedColorAdd, setDelayedColorAdd] = useState(null);
  const [isSavingActive, setSavingActive] = useState(false);

  const toggleInputState = useCallback(
    (id, name) => async (state) => {
      if (state) {
        setInputActiveId(id);
        setPaletteName(name);
        setOldName(name);
      }
    },
    [],
  );

  const onBlurCallback = useCallback(async () => {
    if (paletteName && oldName !== paletteName && inputActiveId && selectedWorkspaceId) {
      try {
        await updateWorkspaceColorPalette({
          paletteId: inputActiveId,
          workspaceId: selectedWorkspaceId,
          name: paletteName,
        }).unwrap();
      } catch (err) {
        console.error(err);
      }
    }

    setInputActiveId(null);
    setPaletteName('');
    setOldName('');
  }, [inputActiveId, oldName, paletteName, selectedWorkspaceId, updateWorkspaceColorPalette]);

  const handleMouseEnterInColorBlock = (_id) => () => setDeleteIconVisible(_id);
  const handleMouseLeaveColorBlock = () => setDeleteIconVisible(null);

  const handleColorPickerUpdatePosition = useCallback(
    (_id) => () => {
      if (!isInModal) {
        const containerBounds = containerRef.current?.getBoundingClientRect();
        const triggerBounds = colorPickerPositionRef?.current?.[_id]?.getBoundingClientRect();

        if (triggerBounds && containerBounds) {
          const deltaTop = ((triggerBounds.top - containerBounds.top) * 100) / containerBounds.height;
          const deltaX = containerBounds.right - (triggerBounds.right + triggerBounds.width * 5.66);
          const deltaRight = (deltaX * 100) / containerBounds.width;

          setAbsoluteRightPosition(deltaRight);
          setAbsoluteTopPosition(deltaTop);
        }

        return;
      }

      const containerBounds = containerRef.current?.getBoundingClientRect();
      const triggerBounds = colorPickerPositionRef?.current?.[_id]?.getBoundingClientRect();

      if (triggerBounds && containerBounds) {
        const top = triggerBounds.top - 300;
        const left = triggerBounds.left;

        setAbsoluteRightPosition(left);
        setAbsoluteTopPosition(top < 0 ? triggerBounds.top + 44 : top);
      }
    },
    [isInModal],
  );

  const addNewColor = useCallback(
    (_id) => async () => {
      if (isSavingActive) {
        setDelayedColorAdd(_id);
        return;
      }

      if (refreshTimeout.current !== null) {
        clearTimeout(refreshTimeout.current);
        refreshTimeout.current = null;
      }

      setColorPickerVisible(null);

      if (selectedWorkspaceId) {
        try {
          const color = { _id: v4(), color: 'rgba(255, 255, 255, 1)' };
          handleColorPickerUpdatePosition(`${_id}-plus`)();

          await updateWorkspaceColorPalette({
            paletteId: _id,
            workspaceId: selectedWorkspaceId,
            addColors: [color],
          }).unwrap();

          setActiveColor(color);
          setSelectedColorPaletteId(_id);
          setColorPickerVisible(_id);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [handleColorPickerUpdatePosition, isSavingActive, selectedWorkspaceId, updateWorkspaceColorPalette],
  );

  const onColorDelete = (colorId, paletteId) => () => {
    if (selectedWorkspaceId) {
      updateWorkspaceColorPalette({
        paletteId,
        workspaceId: selectedWorkspaceId,
        removeColors: [
          {
            _id: colorId,
          },
        ],
      });
    }
  };

  const onDropdownTriggerClick = (_id) => () => setDropdownMenuVisible((prev) => (prev === _id ? null : _id));
  const closeDropdownMenu = useCallback(() => setDropdownMenuVisible(null), []);

  const handleColorChange = (prop, value) => {
    setActiveColor((prev) => {
      if (prev) {
        return { ...prev, color: value };
      }

      return prev;
    });
  };

  const handleColorUpdate = (_id, colorId) => (prop, value) => {
    const updatedColor = { _id: colorId, color: value.toString() };

    setActiveColor(updatedColor);
    setSelectedColorPaletteId(_id);
  };

  const saveActiveColor = useCallback(async () => {
    if (activeColor && selectedWorkspaceId && selectedColorPaletteId) {
      setSavingActive(true);
      try {
        await updateWorkspaceColorPalette({
          paletteId: selectedColorPaletteId,
          workspaceId: selectedWorkspaceId,
          addColors: [activeColor],
          removeColors: [activeColor],
        }).unwrap();
      } catch (err) {
        console.error(err);
      }

      refreshTimeout.current = setTimeout(() => {
        setActiveColor(null);
        setSelectedColorPaletteId(null);
      }, 100);

      setSavingActive(false);
    }
  }, [activeColor, selectedColorPaletteId, selectedWorkspaceId, updateWorkspaceColorPalette]);

  const onDeleteColorPaletteClick = (colorPaletteId, colorPaletteName) => () => {
    setSelectedColorPaletteId(colorPaletteId);
    setDeleteModalOpen(colorPaletteName);
  };

  const onCloseDeleteModal = useCallback(() => {
    setDeleteModalOpen(null);
    setSelectedColorPaletteId(null);
  }, []);

  const onAcceptDeleteColorPalette = useCallback(async () => {
    if (selectedColorPaletteId && selectedWorkspaceId) {
      await deleleWorkspaceColorPalette({
        paletteId: selectedColorPaletteId,
        workspaceId: selectedWorkspaceId,
      }).unwrap();

      toast.info(`Your color palette has been deleted successfully.`, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        transition: Zoom,
      });

      onCloseDeleteModal();
    }
  }, [deleleWorkspaceColorPalette, onCloseDeleteModal, selectedColorPaletteId, selectedWorkspaceId]);

  const handleCreateNewPalette = () => {
    if (selectedWorkspaceId) {
      createWorkspaceColorPalette({
        name: 'Untitled Palette',
        workspaceId: selectedWorkspaceId,
      });

      setIsNewPaletteExist(true);
    }
  };

  useEffect(() => {
    if (!isSavingActive && delayedColorAdd) {
      addNewColor(delayedColorAdd)();
      setDelayedColorAdd(null);
    }
  }, [isSavingActive, delayedColorAdd, addNewColor]);

  useEffect(() => {
    if (colorPalettes && isNewPaletteExist) {
      const newPalette = colorPalettes[colorPalettes.length - 1];
      setPaletteName(newPalette.name);
      setInputActiveId(newPalette._id);
      setIsNewPaletteExist(false);
      setCurrentTargetTextSelected(true);
    }
  }, [colorPalettes?.length]);

  return (
    <>
      <OverrideSettingsCard isInModal={isInModal}>
        <ColorPaletteWrapper
          ref={containerRef}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SettingsColumn padding="12px 12px 0 12px">
            <SettingsRow>
              <Title title={'Brand colors'} />
            </SettingsRow>

            <ColorSettingPaletteSectionWrapper>
              {colorPalettes?.map((colorPalette, i) => {
                return (
                  <ColorPaletteItemWrapper key={`${colorPalette._id}-${i}`}>
                    <Styled.ColorPaletteWrapper id={colorPalette._id}>
                      <OutsideClickHandler display="flex" onOutsideClick={closeDropdownMenu}>
                        <SettingsColumn padding="2px 5px 12px">
                          <SettingsRow>
                            <Styled.ColorPaletteTitle className="title" isActive={inputActiveId === colorPalette._id}>
                              <InlineEditor
                                placeholder={'Untitled Palette'}
                                open={inputActiveId === colorPalette._id}
                                value={inputActiveId === colorPalette._id ? paletteName : colorPalette.name}
                                setOpen={toggleInputState(colorPalette._id, colorPalette.name)}
                                onChange={setPaletteName}
                                onBlurCallback={onBlurCallback}
                                isCurrentTargetTextSelected={isCurrentTargetTextSelected}
                                setCurrentTargetTextSelected={setCurrentTargetTextSelected}
                              />
                            </Styled.ColorPaletteTitle>
                          </SettingsRow>

                          <SettingsRow>
                            <StyledColorWrapper>
                              {colorPalette.colors.map(({ _id, color: dbColor }, i) => {
                                return (
                                  <StyledColorItem
                                    key={`color-${_id}-${i}`}
                                    onMouseEnter={handleMouseEnterInColorBlock(_id)}
                                    onMouseLeave={handleMouseLeaveColorBlock}
                                    ref={attachReference(_id, colorPickerPositionRef)}
                                    onClick={handleColorPickerUpdatePosition(_id)}
                                  >
                                    <ColorPicker
                                      lightenBorder
                                      targetSelector="color-picker-modal-settings"
                                      size={40}
                                      colorType={IColorType.FillColor}
                                      isDisabled={false}
                                      defaultLeftColor={'#000'}
                                      leftColor={activeColor?._id === _id ? activeColor.color : dbColor}
                                      isPresetHidden={true}
                                      isFavoritesHidden={true}
                                      isBrandColorsHidden={true}
                                      absoluteRightPosition={absoluteRightPosition ?? 0}
                                      absoluteTopPosition={absoluteTopPosition ?? 0}
                                      translateY={-102}
                                      handleColorChange={handleColorUpdate(colorPalette._id, _id)}
                                      onClose={saveActiveColor}
                                      {...(isInModal ? { zIndex: 10000 } : {})}
                                    />
                                    <Styled.ColorMenuOuterWrapper isMenuVisible={isDeleteIconVisible === _id}>
                                      <Styled.ColorMenuWrapper>
                                        <Styled.ColorMenuTrigger onClick={onColorDelete(_id, colorPalette?._id)}>
                                          <Delete color="#FFF" />
                                        </Styled.ColorMenuTrigger>
                                      </Styled.ColorMenuWrapper>
                                    </Styled.ColorMenuOuterWrapper>
                                  </StyledColorItem>
                                );
                              })}

                              {colorPalette.colors.length < 12 && (
                                <SettingsPlusBtnSM
                                  isDisabled={!!delayedColorAdd}
                                  $ref={attachReference(`${colorPalette._id}-plus`, colorPickerPositionRef)}
                                  onClick={addNewColor(colorPalette._id)}
                                />
                              )}
                            </StyledColorWrapper>

                            <ColorPicker
                              lightenBorder
                              targetSelector="color-picker-modal-settings"
                              size={0}
                              colorType={IColorType.FillColor}
                              isDisabled={false}
                              defaultLeftColor={'#000'}
                              leftColor={activeColor?.color ?? '#FFF'}
                              isPresetHidden={true}
                              isFavoritesHidden={true}
                              isBrandColorsHidden={true}
                              absoluteRightPosition={absoluteRightPosition ?? 0}
                              absoluteTopPosition={absoluteTopPosition ?? 0}
                              translateY={-102}
                              isColorPickerOpen={isColorPickerVisible === colorPalette._id}
                              handleColorChange={handleColorChange}
                              onClose={saveActiveColor}
                              {...(isInModal ? { zIndex: 10000 } : {})}
                            />
                          </SettingsRow>
                        </SettingsColumn>
                        <Styled.MenuOuterWrapper isMenuVisible={isDropdownMenuVisible === colorPalette._id}>
                          <Styled.MenuWrapper>
                            <Styled.MenuTrigger onClick={onDropdownTriggerClick(colorPalette._id)}>
                              <DotsIcon />
                            </Styled.MenuTrigger>
                            <Styled.DropdownWrapper
                              isMenuVisible={isDropdownMenuVisible === colorPalette._id}
                              onClick={preventDefault}
                            >
                              <Styled.DropdownItem
                                onClick={onDeleteColorPaletteClick(colorPalette._id, colorPalette.name)}
                              >
                                Delete
                              </Styled.DropdownItem>
                            </Styled.DropdownWrapper>
                          </Styled.MenuWrapper>
                        </Styled.MenuOuterWrapper>
                      </OutsideClickHandler>
                    </Styled.ColorPaletteWrapper>
                  </ColorPaletteItemWrapper>
                );
              })}
            </ColorSettingPaletteSectionWrapper>

            {isInModal ? (
              createPortal(<div id="color-picker-modal-settings" />, document.body)
            ) : (
              <div id="color-picker-modal-settings" />
            )}

            <SettingsColumn padding="20px 0 0 0">
              <SettingsRow>
                <CreateNewPaletteWrapper onClick={handleCreateNewPalette}>
                  <SettingsPlus />
                  <CustomLabel label="Add new palette" />
                </CreateNewPaletteWrapper>
              </SettingsRow>
            </SettingsColumn>
          </SettingsColumn>
        </ColorPaletteWrapper>
      </OverrideSettingsCard>

      {isDeleteModalOpen && (
        <MessageModal
          isOpen={!!isDeleteModalOpen}
          message={'Are you sure you want to delete this color palette?'}
          shouldCloseOnOverlayClick={true}
          itemName={isDeleteModalOpen}
          onCancel={onCloseDeleteModal}
          onAccept={onAcceptDeleteColorPalette}
        />
      )}
      {!isWorkspaceAdmin &&
        createPortal(
          <MoveableTooltip
            showTooltip={showTooltip}
            text="Contact your Workspace admin in order to modify Workspace settings"
          />,
          document.body,
        )}
    </>
  );
};

export default memo(ColorSettings);
