import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { ctaDimensions } from '../../../../config/constants';
import { useAppSelector } from '../../../../hooks';
import { changeCtaImage, selectActiveLayer } from '../../../../appredux/features/amp-story/ampStorySlice';
import {
  toggleEditorLayerMenuVisibility,
  toggleSelectCtaImage
} from '../../../../appredux/features/editor/helpers/helpersSlice';
import { Delete } from '../../../icons';
import SettingsPlusBtnSM from '../../../settings/shared/settings-plus-btn-sm';
import InputBasic from '../../../shared/input-basic';
import ToggleSwitch from '../../../shared/toggle-switch';
import EditorSidebarLabel from '../../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../../shared/elements/editor-sidebar-section-title';
import EditorSidebarRowWrapper from '../../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../../shared/structure/editor-sidebar-values-wrapper';
import EditorSidebarOutlinkMediaModal from './editor-sidebar-outlink-media-modal';
import OutlinkColorPicker from './outlink-color-picker';

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

const EditorSidebarOutlinkSettings = ({
  layer,
  ctaLayerRef,
  handleLayerChange,
  handleBatchLayerChange,
}) => {
  const dispatch = useDispatch();
  const showSelectCtaImage = useAppSelector((state) => state.helpers.showSelectCtaImage);
  const editorHeight = useAppSelector((state) => state.ampStory.present.initialHeight);
  const editorWidth = useAppSelector((state) => state.ampStory.present.initialWidth);
  const activeLayer = useAppSelector(selectActiveLayer);
  const isActiveLayerLocked = layer.settings.generalSettings.locked;
  const withQueries = layer.settings?.ctaLayerSettings?.withQueries ?? false;

  const [link, setLink] = useState(layer.settings?.ctaLayerSettings?.link ?? '');
  const [linkTitle, setLinkTitle] = useState(layer.settings?.ctaLayerSettings?.linkTitle ?? '');

  useEffect(() => setLink(layer.settings?.ctaLayerSettings?.link ?? ''), [layer.settings?.ctaLayerSettings?.link]);

  useEffect(() => setLinkTitle(layer.settings?.ctaLayerSettings?.linkTitle ?? ''), [
    layer.settings?.ctaLayerSettings?.linkTitle,
  ]);

  const setLinkData = (field, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (field === 'linkTitle' && event.target.value.length > 30) {
      return;
    }
    if (field === 'linkTitle') {
      setLinkTitle(event.target.value);
    }
    if (field === 'link') {
      setLink(event.target.value);
    }
    handleLayerChange({ field: `settings.ctaLayerSettings[${field}]`, value: event.target.value });
  };

  const updateSettings = useCallback(() => {
    const thickness =
      layer.settings.layerSettings.shapeStyles.relativeThickness ?? layer.settings.layerSettings.shapeStyles.thickness;
    const ctaWidth = ctaLayerRef.current?.clientWidth;
    const ctaHeight = ctaLayerRef.current?.clientHeight;
    const newCtaHeight = ctaHeight > ctaDimensions.height * 2 ? ctaHeight - ctaDimensions.height : ctaHeight;
    const newOffsetX = (+editorWidth - (ctaWidth + thickness * 2)) / 2;
    const newOffsetY = +editorHeight - (newCtaHeight + thickness * 2) - +editorHeight * (2 / 100);

    handleBatchLayerChange([
      { field: 'settings.layerSettings.height', value: ctaHeight },
      { field: 'settings.layerSettings.width', value: ctaWidth },
      { field: 'settings.generalSettings.offsetX', value: newOffsetX },
      { field: 'settings.generalSettings.offsetY', value: newOffsetY },
    ]);
  }, [
    layer.settings.layerSettings.shapeStyles.relativeThickness,
    layer.settings.layerSettings.shapeStyles.thickness,
    ctaLayerRef,
    editorWidth,
    editorHeight,
  ]);

  useEffect(() => {
    if (
      activeLayer?.settings?.ctaLayerSettings?.linkTitle !== layer?.settings?.ctaLayerSettings?.linkTitle ||
      activeLayer?.settings?.layerSettings?.shapeStyles?.thickness !==
        layer?.settings?.layerSettings?.shapeStyles?.thickness
    ) {
      updateSettings();
      dispatch(toggleEditorLayerMenuVisibility(true));
    }
  }, [dispatch, updateSettings, layer?.settings?.layerSettings?.shapeStyles?.thickness, activeLayer]);

  const onLinkChange = (event) => {
    if (isActiveLayerLocked) {
      return;
    }
    setLinkData('link', event);
  };

  const onTitleChange = (event) => {
    setLinkData('linkTitle', event);
  };

  const onWithQueriesClick = () => {
    if (isActiveLayerLocked) {
      return;
    }
    handleLayerChange({ field: 'settings.ctaLayerSettings.withQueries', value: !withQueries });
  };

  const toggleMediaModal = () => {
    if (isActiveLayerLocked) {
      return;
    }
    dispatch(toggleSelectCtaImage());
  };

  const removeIcon = () => {
    if (isActiveLayerLocked) {
      return;
    }
    dispatch(changeCtaImage());
  };

  return (
    <>
      <EditorSidebarSectionWrapper>
        <EditorSidebarSectionTitleWrapper>
          <EditorSidebarSectionTitle text={'Button'} />
        </EditorSidebarSectionTitleWrapper>
        <>
          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Link to'} />

            <EditorSidebarValuesWrapper>
              <InputBasic
                isDisabled={isActiveLayerLocked || withQueries}
                value={link}
                placeholder={'https://zazuapp.co/'}
                onChange={onLinkChange}
              />
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Color'} />

            <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
              <OutlinkColorPicker layer={layer} handleBatchLayerChange={handleBatchLayerChange} />
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Icon'} />

            <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
              {layer.content.image.url ? (
                <>
                  <DeleteButton type="button" onClick={removeIcon}>
                    <Delete width={'16px'} height={'16px'} />
                  </DeleteButton>

                  <IconImageWrapper onClick={toggleMediaModal}>
                    <IconImage src={layer.content.image.url} alt="button icon" />
                  </IconImageWrapper>
                </>
              ) : (
                <SettingsPlusBtnSM size="32px" onClick={toggleMediaModal} />
              )}
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>
        </>
      </EditorSidebarSectionWrapper>

      <EditorSidebarSectionWrapper>
        <EditorSidebarSectionTitleWrapper>
          <EditorSidebarSectionTitle text={'Text'} />
        </EditorSidebarSectionTitleWrapper>
        <>
          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Title'} />

            <EditorSidebarValuesWrapper>
              <InputBasic isDisabled={isActiveLayerLocked} value={linkTitle} onChange={onTitleChange} />
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Source from URL'} />

            <ToggleSwitch size={'medium'} isOn={withQueries} onClick={onWithQueriesClick} />
          </EditorSidebarRowWrapper>
        </>
      </EditorSidebarSectionWrapper>

      <EditorSidebarOutlinkMediaModal isOpen={showSelectCtaImage} onClose={toggleMediaModal} />
    </>
  );
};

export default memo(EditorSidebarOutlinkSettings);
