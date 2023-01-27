import { useAppDispatch, useAppSelector, useDidUpdateEffect } from 'hooks';
import { isNil } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { setHeight, setOffsetX, setOffsetY, setWidth } from 'appredux/features/editor/helpers/groupLayerHelperSlice';
import { toggleLayoutSettings } from 'appredux/features/editor/helpers/helpersSlice';
import styled, { css } from 'styled-components';
import lockImageActive from './images/editor-sidebar/lock-icon-active.svg';
import lockImage from './images/editor-sidebar/lock-icon.svg';
import { layerTypes } from '../../../interfaces/layer-types';
import { isMediaLayer } from '../../../utils/editorUtils';
import EditorSidebarKnobWithInput from '../shared/editor-sidebar-knob-with-input';
import EditorSidebarLabel from '../shared/elements/editor-sidebar-label';
import EditorSidebarLayoutInput from '../shared/elements/editor-sidebar-layout-input';
import EditorSidebarSectionTitle from '../shared/elements/editor-sidebar-section-title';
import EditorSidebarHalfColumn from '../shared/structure/editor-sidebar-half-column';
import EditorSidebarLabelWrapper from '../shared/structure/editor-sidebar-label-wrapper';
import EditorSidebarRowWrapper from '../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../shared/structure/editor-sidebar-values-wrapper';
import LayoutTrigger from './layout-trigger';

import {
  disableSizeInputs,
  setSizeProportionWithParams
} from '../../../appredux/features/editor/layer-setting/layerSettingSlice';

const LockImage = styled.img`
  padding: 0 4px;
  cursor: pointer;
`;

const StyledEditorSidebarSectionTitleWrapper = styled(EditorSidebarSectionTitleWrapper)`
  ${({ isSectionHidden }) =>
    !isSectionHidden &&
    css`
      margin: 0 0 8px;
    `}
`;

const EditorSidebarLayoutSettings = ({
  layer,
  keepRatio,
  handleLayerChange,
  handleBatchLayerChange,
}) => {
  const dispatch = useAppDispatch();

  const sizeProportion = useAppSelector((state) => state.layerSetting?.sizeProportion);
  const isCroppingMode = useAppSelector((state) => state.helpers.isCroppingMode);
  const isGroupLayerActive = useAppSelector((state) => state.groupLayerHelper.isGroupLayerActive);
  const selectedChildLayer = useAppSelector((state) => state.groupLayerHelper.selectedChildLayer);
  const isLayoutSettingsToggledOn = useAppSelector((state) => state.helpers.isLayoutSettingsToggledOn);

  // Size
  const [sizeW, setSizeW] = useState(Math.round(layer.settings.layerSettings?.width));
  const [sizeH, setSizeH] = useState(Math.round(layer.settings.layerSettings?.height));
  // Position
  const [positionX, setPositionX] = useState(Math.round(+layer.settings.generalSettings.offsetX));
  const [positionY, setPositionY] = useState(Math.round(+layer.settings.generalSettings.offsetY));
  // Layer Settings Locked

  const isLayerLocked = layer.settings.layerSettings?.locked;
  const isActiveLayerLocked = layer.settings.generalSettings.locked || !isNil(selectedChildLayer);
  const activeLayerType = layer.type;
  const rotate = Number(layer.settings.generalSettings.rotate);

  const onXPositionChange = useCallback(
    (event) => {
      event.stopPropagation();
      if (isActiveLayerLocked) {
        return;
      }
      setPositionX(Number(event.target.value));

      if (isGroupLayerActive) {
        return;
      }

      handleLayerChange({ field: 'settings.generalSettings.offsetX', value: Number(event.target.value) });
    },
    [handleLayerChange, isActiveLayerLocked, isGroupLayerActive],
  );

  const onYPositionChange = useCallback(
    (event) => {
      event.stopPropagation();

      if (isActiveLayerLocked) {
        return;
      }
      setPositionY(Number(event.target.value));
      if (isGroupLayerActive) {
        return;
      }
      handleLayerChange({ field: 'settings.generalSettings.offsetY', value: Number(event.target.value) });
    },
    [handleLayerChange, isActiveLayerLocked, isGroupLayerActive],
  );

  const changeDimensions = useCallback(
    (type, value) => {
      if (isGroupLayerActive) {
        const proportion = sizeW / sizeH;
        if (type === 'width') {
          setSizeW(value);
          setSizeH(Math.floor(value / proportion));
          return;
        }
        if (type === 'height') {
          setSizeH(value);
          setSizeW(Math.floor(value * proportion));
        }
        return;
      }

      let width = type === 'width' ? value : keepRatio ? Math.ceil(value / sizeProportion) : Number(sizeW);
      let height =
        type === 'height'
          ? value
          : keepRatio && layer.type !== layerTypes.HTML
          ? Math.ceil(value * sizeProportion)
          : Number(sizeH);

      if (keepRatio) {
        height = height >= 10000 ? 10000 : height === 0 ? value : height;
        width = width >= 10000 ? 10000 : width === 0 ? value : width;
      }

      setSizeH(height);
      setSizeW(width);

      handleBatchLayerChange([
        { field: 'settings.layerSettings.width', value: width },
        { field: 'settings.layerSettings.height', value: height },
      ]);

      if (!keepRatio) {
        dispatch(setSizeProportionWithParams({ width, height }));
      }
    },
    [dispatch, handleBatchLayerChange, isGroupLayerActive, keepRatio, layer.type, sizeH, sizeProportion, sizeW],
  );

  const onWidthChange = useCallback(
    (event) => {
      event.stopPropagation();

      if (isActiveLayerLocked) {
        return;
      }

      const value = +event.target.value;
      changeDimensions('width', value <= 0 ? 1 : value);
    },
    [changeDimensions, isActiveLayerLocked],
  );

  const onHeightChange = useCallback(
    (event) => {
      event.stopPropagation();

      if (isActiveLayerLocked) {
        return;
      }

      const value = +event.target.value;
      changeDimensions('height', value <= 0 ? 1 : value);
    },
    [changeDimensions, isActiveLayerLocked],
  );

  const onToggleLockSize = useCallback(() => {
    if (isActiveLayerLocked) {
      return;
    }
    dispatch(disableSizeInputs());
  }, [dispatch, isActiveLayerLocked]);

  const onRotateChange = useCallback(
    (value) => {
      if (isActiveLayerLocked) {
        return;
      }

      if (rotate !== value) {
        handleLayerChange({ field: 'settings.generalSettings.rotate', value: Number(value) });
      }
    },
    [isActiveLayerLocked, rotate, handleLayerChange],
  );

  const toggleLayout = () => dispatch(toggleLayoutSettings(!isLayoutSettingsToggledOn));

  useEffect(() => {
    setPositionX(Math.round(+layer.settings.generalSettings.offsetX));
  }, [layer.settings.generalSettings.offsetX]);

  useEffect(() => {
    setPositionY(Math.round(+layer.settings.generalSettings.offsetY));
  }, [layer.settings.generalSettings.offsetY]);

  useEffect(() => {
    setSizeW(Math.round(+layer.settings.layerSettings?.width));
  }, [layer.settings.layerSettings?.width]);

  useEffect(() => {
    setSizeH(Math.round(+layer.settings.layerSettings?.height));
  }, [layer.settings.layerSettings?.height]);

  useDidUpdateEffect(() => {
    if (isGroupLayerActive && sizeW !== layer.settings.layerSettings.width) {
      dispatch(setWidth(sizeW));
    }
  }, [dispatch, sizeW, isGroupLayerActive]);

  useDidUpdateEffect(() => {
    if (isGroupLayerActive && sizeH !== layer.settings.layerSettings.height) {
      dispatch(setHeight(sizeH));
    }
  }, [dispatch, sizeH, isGroupLayerActive]);

  useDidUpdateEffect(() => {
    if (isGroupLayerActive && positionX !== layer.settings.generalSettings.offsetX) {
      dispatch(setOffsetX(positionX));
    }
  }, [dispatch, positionX, isGroupLayerActive]);

  useDidUpdateEffect(() => {
    if (isGroupLayerActive && positionY !== layer.settings.generalSettings.offsetY) {
      dispatch(setOffsetY(positionY));
    }
  }, [dispatch, positionY, isGroupLayerActive]);

  return (
    <EditorSidebarSectionWrapper>
      <StyledEditorSidebarSectionTitleWrapper isSectionHidden={isLayoutSettingsToggledOn}>
        <EditorSidebarSectionTitle text={'Layout'} />

        <LayoutTrigger isOpen={isLayoutSettingsToggledOn} toggle={toggleLayout} />
      </StyledEditorSidebarSectionTitleWrapper>
      {isLayoutSettingsToggledOn && (
        <>
          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Position'} />

            <EditorSidebarValuesWrapper>
              <EditorSidebarHalfColumn>
                <EditorSidebarLayoutInput
                  isDisabled={isActiveLayerLocked || isGroupLayerActive}
                  sign={'X'}
                  type={'number'}
                  value={positionX}
                  onChange={onXPositionChange}
                />
              </EditorSidebarHalfColumn>

              <EditorSidebarHalfColumn>
                <EditorSidebarLayoutInput
                  isDisabled={isActiveLayerLocked || isGroupLayerActive}
                  sign={'Y'}
                  type={'number'}
                  value={positionY}
                  onChange={onYPositionChange}
                />
              </EditorSidebarHalfColumn>
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabelWrapper>
              <EditorSidebarLabel text={'Size'} />
              {!isMediaLayer(layer.type) &&
                activeLayerType !== layerTypes.HTML &&
                activeLayerType !== layerTypes.GRADIENTS &&
                !isGroupLayerActive &&
                (isLayerLocked ? (
                  <LockImage src={lockImageActive} alt="Locked" onClick={onToggleLockSize} />
                ) : (
                  <LockImage src={lockImage} alt="Unlocked" onClick={onToggleLockSize} />
                ))}
            </EditorSidebarLabelWrapper>

            <EditorSidebarValuesWrapper>
              <EditorSidebarHalfColumn>
                <EditorSidebarLayoutInput
                  isDisabled={isActiveLayerLocked || isGroupLayerActive}
                  sign={'W'}
                  type={'number'}
                  value={sizeW}
                  onChange={onWidthChange}
                />
              </EditorSidebarHalfColumn>

              <EditorSidebarHalfColumn>
                <EditorSidebarLayoutInput
                  isDisabled={isActiveLayerLocked || activeLayerType === layerTypes.HTML || isGroupLayerActive}
                  sign={'H'}
                  type={'number'}
                  value={sizeH}
                  onChange={onHeightChange}
                />
              </EditorSidebarHalfColumn>
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabelWrapper>
              <EditorSidebarLabel text={'Rotate'} />
            </EditorSidebarLabelWrapper>

            <EditorSidebarKnobWithInput
              isDisabled={isActiveLayerLocked || isCroppingMode || isGroupLayerActive}
              angle={180}
              min={-180}
              max={180}
              step={10}
              value={rotate}
              sign={'°'}
              onChange={onRotateChange}
              roundValue
            />
          </EditorSidebarRowWrapper>
        </>
      )}
    </EditorSidebarSectionWrapper>
  );
};

export default memo(EditorSidebarLayoutSettings);
