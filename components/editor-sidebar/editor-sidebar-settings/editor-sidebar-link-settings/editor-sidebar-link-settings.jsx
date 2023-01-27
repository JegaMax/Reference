import { Delete } from 'components/icons';
import SettingsPlusBtnSM from 'components/settings/shared/settings-plus-btn-sm';
import InputBasic from 'components/shared/input-basic';
import { MoveableTooltip } from 'components/tooltip';
import { useDebounce, useDidUpdateEffect } from 'hooks';
import { memo, useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import ToggleSwitch from '../../../shared/toggle-switch';
import EditorSidebarLabel from '../../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../../shared/elements/editor-sidebar-section-title';
import EditorSidebarRowWrapper from '../../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../../shared/structure/editor-sidebar-values-wrapper';
import EditorSidebarOutlinkMediaModal from '../editor-sidebar-outlink-settings/editor-sidebar-outlink-media-modal';

const StyledEditorSidebarSectionTitleWrapper = styled(EditorSidebarSectionTitleWrapper)`
  ${({ isSectionHidden }) =>
    isSectionHidden &&
    css`
      margin: 0 0 8px;
    `}
`;

const IconImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const IconImageWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  cursor: pointer;
  border: 1px solid rgba(80, 80, 98, 0.85);
  border-radius: 6px;
  overflow: hidden;
`;

const DeleteButton = styled.button`
  outline: none;
  border: none;
  padding: 0;
  background: none;
  margin-right: 9px;
  cursor: pointer;
`;

const EditorSidebarLinkSettings = ({ layer, handleBatchLayerChange }) => {
  const [isLinkEnabled, setLinkEnabled] = useState(layer.settings.linkSettings.isEnabled);
  const [link, setLink] = useState(layer.settings.linkSettings.link);
  const [text, setText] = useState(layer.settings.linkSettings.text);
  const [icon, setIcon] = useState(layer.settings.linkSettings.icon);
  const [isSelectIconModalOpen, setSelectIconModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const isLinkEnabledDebounced = useDebounce(isLinkEnabled, 100);
  const linkDebounced = useDebounce(link, 750);
  const textDebounced = useDebounce(text, 750);

  const toggleLinkEnabled = useCallback(() => {
    if (layer.settings.layerSettings.fullscreen || layer.settings.generalSettings.locked) {
      return;
    }

    setLinkEnabled((prev) => !prev);
  }, [layer.settings.generalSettings.locked, layer.settings.layerSettings.fullscreen]);
  const handleLink = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = e.target.value;

    if (value.length > 30) {
      return;
    }

    setLink(value);
  }, []);

  const handleText = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    const value = e.target.value;

    if (value.length > 30) {
      return;
    }

    setText(value);
  }, []);

  const removeIcon = useCallback(() => setIcon(null), []);
  const toggleSelectIconModal = useCallback(() => setSelectIconModalOpen((prev) => !prev), []);
  const selectIcon = useCallback((url) => {
    setIcon(url);
    setSelectIconModalOpen(false);
  }, []);

  const onMouseEnter = useCallback(() => setShowTooltip(true), []);
  const onMouseLeave = useCallback(() => setShowTooltip(false), []);

  useDidUpdateEffect(() => {
    const changes = [
      { field: 'settings.linkSettings.isEnabled', value: isLinkEnabledDebounced },
      { field: 'settings.linkSettings.link', value: linkDebounced },
      { field: 'settings.linkSettings.text', value: textDebounced },
      { field: 'settings.linkSettings.icon', value: icon },
    ];

    handleBatchLayerChange(changes);
  }, [isLinkEnabledDebounced, linkDebounced, textDebounced, icon]);

  useEffect(() => {
    if (layer.settings.layerSettings.fullscreen && isLinkEnabled) {
      setLinkEnabled(false);
    }
  }, [isLinkEnabled, layer.settings.layerSettings.fullscreen]);

  return (
    <>
      <EditorSidebarSectionWrapper
        isDisabled={layer.settings.layerSettings.fullscreen || layer.settings.generalSettings.locked}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <StyledEditorSidebarSectionTitleWrapper isSectionHidden={!isLinkEnabled}>
          <EditorSidebarSectionTitle text={'Link'} />
          <ToggleSwitch isOn={isLinkEnabled} onClick={toggleLinkEnabled} />
        </StyledEditorSidebarSectionTitleWrapper>
        {isLinkEnabled && (
          <>
            <EditorSidebarRowWrapper>
              <EditorSidebarLabel text={'Link to'} />
              <EditorSidebarValuesWrapper>
                <InputBasic
                  id={'link-input'}
                  isDisabled={layer.settings.generalSettings.locked}
                  value={link}
                  placeholder="https://zazuapp.co/"
                  onChange={handleLink}
                />
              </EditorSidebarValuesWrapper>
            </EditorSidebarRowWrapper>
            <EditorSidebarRowWrapper>
              <EditorSidebarLabel text={'Tooltip'} />

              <EditorSidebarValuesWrapper>
                <InputBasic
                  isDisabled={layer.settings.generalSettings.locked}
                  value={text}
                  placeholder="Click here"
                  onChange={handleText}
                />
              </EditorSidebarValuesWrapper>
            </EditorSidebarRowWrapper>
            <EditorSidebarRowWrapper>
              <EditorSidebarLabel text={'Icon'} />

              <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
                {icon ? (
                  <>
                    <DeleteButton type="button" onClick={removeIcon}>
                      <Delete width={'16px'} height={'16px'} />
                    </DeleteButton>

                    <IconImageWrapper onClick={toggleSelectIconModal}>
                      <IconImage src={icon} alt="button icon" />
                    </IconImageWrapper>
                  </>
                ) : (
                  <SettingsPlusBtnSM size="32px" onClick={toggleSelectIconModal} />
                )}
              </EditorSidebarValuesWrapper>
            </EditorSidebarRowWrapper>
          </>
        )}
      </EditorSidebarSectionWrapper>
      <EditorSidebarOutlinkMediaModal
        isOpen={isSelectIconModalOpen}
        onClose={toggleSelectIconModal}
        selectCallback={selectIcon}
      />

      {layer.settings.layerSettings.fullscreen && (
        <MoveableTooltip
          showTooltip={showTooltip}
          text={'Links can’t be added to full-screen images and videos'}
          position="left"
          width={335}
        />
      )}
    </>
  );
};

export default memo(EditorSidebarLinkSettings);
