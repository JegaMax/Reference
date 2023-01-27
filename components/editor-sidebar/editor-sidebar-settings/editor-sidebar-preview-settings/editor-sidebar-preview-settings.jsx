import React, { useCallback, useEffect, useState } from 'react';
// Redux
import { useDispatch } from 'react-redux';
import { setDeviceSize } from '../../../../appredux/features/editor/helpers/helpersSlice';
// Components
import EditorSidebarSectionWrapper from '../../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarLabel from '../../shared/elements/editor-sidebar-label';
import EditorSidebarValuesWrapper from '../../shared/structure/editor-sidebar-values-wrapper';
import EditorSidebarRowWrapper from '../../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarButtonWithIcon from '../../shared/elements/editor-sidebar-button-with-icon';
import EditorSidebarDescriptionText from '../../shared/elements/editor-sidebar-description-text';
import EditorSidebarQr from '../../shared/elements/editor-sidebar-qr';
////// There is an icon for computer type
import { Smartphone } from '../../../icons';
import EditorSidebarButtonWrapper from '../../shared/structure/editor-sidebar-button-wrapper';
import Select from '../../../shared/select';
// Constants
import {
  // There is a constant for computer type
  EDITOR_SIDEBAR_DEVICE_TYPE_SMARTPHONE,
  SMARTPHONE_DEVICES_OPTIONS,
} from '../../constants/editor-sidebar-devices';
import { getIframeDeviceSize } from '../../../../utils/editorUtils';
import EditorSidebarSectionTitle from '../../shared/elements/editor-sidebar-section-title';

const EditorSidebarPreviewSettings = () => {
  const dispatch = useDispatch();
  const [activeDeviceType, setActiveDeviceType] = useState(EDITOR_SIDEBAR_DEVICE_TYPE_SMARTPHONE);
  const [activeDevice, setActiveDevice] = useState(SMARTPHONE_DEVICES_OPTIONS[0]);

  const onDeviceTypeSelect = useCallback(
    (type) => () => {
      setActiveDeviceType(type);
    },
    [],
  );

  const onDeviceSelect = useCallback(
    (device) => {
      setActiveDevice(device);

      dispatch(setDeviceSize(getIframeDeviceSize(device)));
      return;
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(setDeviceSize(getIframeDeviceSize()));

    return () => {
      dispatch(setDeviceSize(getIframeDeviceSize()));
    };
  }, [dispatch]);

  return (
    <>
      <EditorSidebarSectionWrapper>
        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Device'} />

          <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
            <EditorSidebarButtonWrapper>
              <EditorSidebarButtonWithIcon
                isActive={activeDeviceType === EDITOR_SIDEBAR_DEVICE_TYPE_SMARTPHONE}
                onClick={onDeviceTypeSelect(EDITOR_SIDEBAR_DEVICE_TYPE_SMARTPHONE)}
              >
                <Smartphone />
              </EditorSidebarButtonWithIcon>
            </EditorSidebarButtonWrapper>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>

        {activeDeviceType === EDITOR_SIDEBAR_DEVICE_TYPE_SMARTPHONE && (
          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Size'} />

            <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
              <Select selectOption={activeDevice.name} options={SMARTPHONE_DEVICES_OPTIONS} onSelect={onDeviceSelect} />
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>
        )}
      </EditorSidebarSectionWrapper>
      <div style={{ padding: '28px 24px 0' }}>
        <EditorSidebarSectionTitle text={'Device Preview'} />
        <EditorSidebarDescriptionText text={'Scan the Code to preview your Story directly on your mobile device:'} />
        <EditorSidebarQr />
        <EditorSidebarDescriptionText
          customMargin={'16px 0 0 0'}
          text={
            'Web Stories are responsive. Your Story design therefore may vary depending on the size of your screen.'
          }
        />
      </div>
    </>
  );
};

export default EditorSidebarPreviewSettings;
