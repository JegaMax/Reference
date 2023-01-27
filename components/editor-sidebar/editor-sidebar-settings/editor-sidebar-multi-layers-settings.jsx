import { useCallback, useMemo, useState } from 'react';
import { batch } from 'react-redux';
import {
  setMultiAngle,
  setMultiHeight,
  setMultiWidth,
  setMultiX,
  setMultiY
} from 'appredux/features/editor/helpers/groupLayerHelperSlice';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import {
  selectSelectedLayers,
  setFilteredActiveLayerPropsArrayInStore
} from '../../../appredux/features/amp-story/ampStorySlice';
import {
  setSelectedLayersChangeCounter,
  toggleLayoutSettings
} from '../../../appredux/features/editor/helpers/helpersSlice';
import { getArrowEventValue } from '../../../utils/common';
import EditorSidebarKnobWithInput from '../shared/editor-sidebar-knob-with-input';
import EditorSidebarSliderWithInput from '../shared/editor-sidebar-slider-with-input';
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

const StyledEditorSidebarSectionTitleWrapper = styled(EditorSidebarSectionTitleWrapper)`
  ${({ isSectionHidden }) =>
    !isSectionHidden &&
    css`
      margin: 0 0 8px;
    `}
`;

const EditorSidebarMultiLayersSettings = () => {
  const dispatch = useAppDispatch();
  const selectedLayers = useAppSelector(selectSelectedLayers);
  const isLayoutSettingsToggledOn = useAppSelector((state) => state.helpers.isLayoutSettingsToggledOn);

  const [positionX, setPositionX] = useState('');
  const [positionY, setPositionY] = useState('');
  const [sizeW, setSizeW] = useState('');
  const [sizeH, setSizeH] = useState('');
  const [rotate, setRotate] = useState(0);

  const editorWidth = useAppSelector((state) => state.ampStory.present.initialWidth);
  const viewWidth = useMemo(() => Number(editorWidth) / 100, [editorWidth]);
  const isLayoutSettingsDisabled = useMemo(() => {
    return selectedLayers?.every((layer) => layer?.settings?.generalSettings.locked);
  }, [selectedLayers]);

  const onPositionUpdate = useCallback(
    (type, value) => {
      if (type === 'x') {
        dispatch(setMultiX(typeof value === 'number' ? value : Number(positionX ?? 0)));
        return;
      }

      dispatch(setMultiY(typeof value === 'number' ? value : Number(positionY ?? 0)));
    },
    [dispatch, positionX, positionY],
  );

  const onPositionKeyDown = useCallback(
    (type) => (event) => {
      event.stopPropagation();

      if (event.code === 'ArrowUp') {
        const value = type === 'x' ? (isNaN(+positionX) ? 1 : +positionX + 1) : isNaN(+positionY) ? 1 : +positionY + 1;
        onPositionUpdate(type, value);
      }

      if (event.code === 'ArrowDown') {
        const value = type === 'x' ? (isNaN(+positionX) ? 1 : +positionX - 1) : isNaN(+positionY) ? 1 : +positionY - 1;
        onPositionUpdate(type, value);
      }

      if (
        event.code === 'Enter' &&
        ((type === 'x' && typeof positionX === 'number') || (type === 'y' && typeof positionY === 'number'))
      ) {
        onPositionUpdate(type);
      }
    },
    [onPositionUpdate, positionX, positionY],
  );

  const onXPositionChange = useCallback((event) => {
    event.stopPropagation();

    setPositionX(Number(event.target.value ?? ''));
  }, []);

  const onYPositionChange = useCallback((event) => {
    event.stopPropagation();

    setPositionY(Number(event.target.value ?? ''));
  }, []);

  const onSizeUpdate = useCallback(
    (type, value) => {
      if (type === 'width') {
        dispatch(setMultiWidth(typeof value === 'number' ? value : +sizeW));
        return;
      }

      dispatch(setMultiHeight(typeof value === 'number' ? value : +sizeH));
      // let fieldsFieldsUpdate = [];
      // selectedLayers?.forEach((layer) => {
      //   if (!layer.settings.generalSettings.locked) {
      //     const sizeProportion = layer.settings.layerSettings.width / layer.settings.layerSettings.height;
      //     let newWidth = layer.settings.layerSettings.width;
      //     let newHeight = layer.settings.layerSettings.height;
      //     const { cropSettings } = layer.settings;

      //     if (type === 'width') {
      //       newWidth = typeof value === 'number' ? value : +sizeW;

      //       if (isMediaLayer(layer.type) || layer.type === layerTypes.GRADIENTS) {
      //         newHeight = newWidth / sizeProportion;
      //       }
      //     }

      //     if (type === 'height' && layer.type !== layerTypes.HTML) {
      //       newHeight = typeof value === 'number' ? value : +sizeH;

      //       if (isMediaLayer(layer.type) || layer.type === layerTypes.GRADIENTS) {
      //         newWidth = newHeight * sizeProportion;
      //       }
      //     }

      //     if (layer.type === layerTypes.HTML && type === 'width') {
      //       const textBlock = document.createElement('div');
      //       textBlock.classList.add('removeable-text-block');
      //       textBlock.innerHTML = `<style>.removeable-text-block p{margin: 0;}</style>` + layer.content.html;
      //       textBlock.style.cssText = `
      //           font-size: calc(2.6 * ${viewWidth}px);
      //           width: ${type === 'width' ? newWidth + 'px' : 'auto'};
      //           height: auto;
      //           position: fixed; top: 0;
      //           white-space: pre-wrap;
      //           line-height: 0;
      //           overflow-wrap: break-word`;
      //       const size = getNodeSize(textBlock);
      //       newHeight = size.height;
      //       newWidth = size.width;
      //     }

      //     let newOriginalWidth = null;
      //     let newOriginalHeight = null;
      //     let mappedClip = null;

      //     if (cropSettings) {
      //       const parsedClip = parseClip(cropSettings.frame.clipStyle);
      //       const cropProportion = cropSettings?.originalWidth / cropSettings?.originalHeight;
      //       const croppedWidth = cropSettings.originalWidth - parsedClip[1] - parsedClip[3];
      //       const croppedWidthProportion = croppedWidth / +newWidth;

      //       newOriginalWidth = +cropSettings.originalWidth / croppedWidthProportion;
      //       newOriginalHeight = newOriginalWidth / cropProportion;

      //       mappedClip = parsedClip.map((elm) => `${elm / croppedWidthProportion}px`);
      //     }

      //     fields = [
      //       ...fields,
      //       {
      //         position: layer.position,
      //         field: 'settings.layerSettings.width',
      //         value: newWidth,
      //       },
      //       {
      //         position: layer.position,
      //         field: 'settings.layerSettings.height',
      //         value: newHeight,
      //       },
      //       ...(cropSettings
      //         ? [
      //             {
      //               position: layer.position,
      //               field: 'settings.cropSettings.originalWidth',
      //               value: newOriginalWidth,
      //             },
      //             {
      //               position: layer.position,
      //               field: 'settings.cropSettings.originalHeight',
      //               value: newOriginalHeight,
      //             },
      //             {
      //               position: layer.position,
      //               field: 'settings.cropSettings.frame.clipStyle',
      //               value: `inset(${mappedClip?.join(' ')})`,
      //             },
      //           ]
      //         : []),
      //     ];
      //   }
      // });
      // batch(() => {
      //   dispatch(setFilteredActiveLayerPropsArrayInStore(fields));
      //   dispatch(setSelectedLayersChangeCounter());
      // });
    },
    [dispatch, sizeH, sizeW],
  );

  const onKeyDownSizeChange = useCallback(
    (type) => (event) => {
      event.stopPropagation();

      if (event.code === 'ArrowUp') {
        const value = type === 'height' ? (isNaN(+sizeH) ? 1 : +sizeH + 1) : isNaN(+sizeW) ? 1 : +sizeW + 1;
        onSizeUpdate(type, value);
      }

      if (event.code === 'ArrowDown') {
        const value = type === 'height' ? (isNaN(+sizeH) ? 1 : +sizeH - 1) : isNaN(+sizeW) ? 1 : +sizeW - 1;
        if (value > 0) {
          onSizeUpdate(type, value);
        }
      }

      if (
        event.code === 'Enter' &&
        ((type === 'height' && typeof sizeH === 'number') || (type === 'width' && typeof sizeW === 'number'))
      ) {
        onSizeUpdate(type);
      }
    },
    [sizeH, sizeW, onSizeUpdate],
  );

  const onWidthChange = useCallback((event) => {
    event.stopPropagation();

    if (event.target.value === '') {
      return setSizeW('');
    }

    if (typeof +event.target.value === 'number' && +event.target.value > 0) {
      setSizeW(Number(event.target.value));
    }
  }, []);

  const onHeightChange = useCallback((event) => {
    event.stopPropagation();

    if (event.target.value === '') {
      return setSizeH('');
    }

    if (typeof +event.target.value === 'number' && +event.target.value > 0) {
      setSizeH(Number(event.target.value));
    }
  }, []);

  const onLayoutSettingsToggle = () => dispatch(toggleLayoutSettings(!isLayoutSettingsToggledOn));

  const onRotateChange = useCallback(
    (value) => {
      dispatch(setMultiAngle(+value ?? 0));
      setRotate(+value);
      // let fieldsFieldsUpdate = [];
      // selectedLayers?.forEach((layer) => {
      //   if (!layer.settings.generalSettings.locked) {
      //     fields = [
      //       ...fields,
      //       {
      //         position: layer.position,
      //         field: 'settings.generalSettings.rotate',
      //         value: +value ?? 0,
      //       },
      //     ];
      //   }
      // });
      // batch(() => {
      //   dispatch(setFilteredActiveLayerPropsArrayInStore(fields));
      //   dispatch(setSelectedLayersChangeCounter());
      // });
    },
    [dispatch],
  );

  const currentOpacity = useMemo(() => {
    let dynamicValue = selectedLayers?.map((layer) => +layer?.settings?.generalSettings?.opacity);
    dynamicValue = dynamicValue && dynamicValue?.length > 0 ? dynamicValue : [100];

    return Math.max(...dynamicValue, 0);
  }, [selectedLayers]);

  const onOpacityChange = useCallback(
    (value) => {
      let fields = [];
      selectedLayers?.forEach((layer) => {
        fields = [...fields, { position: layer.position, field: 'settings.generalSettings.opacity', value: value }];
      });

      batch(() => {
        dispatch(setFilteredActiveLayerPropsArrayInStore(fields));
        dispatch(setSelectedLayersChangeCounter());
      });
    },
    [dispatch, selectedLayers],
  );

  const onOpacityInputArrowDown = useCallback(
    (event) => {
      const value = getArrowEventValue(event) + Number(currentOpacity);
      onOpacityChange(value);
    },
    [currentOpacity, onOpacityChange],
  );

  const currentShadow = useMemo(() => {
    let dynamicValue = selectedLayers?.map((layer) => +layer?.settings?.generalSettings?.shadow);
    dynamicValue = dynamicValue && dynamicValue?.length > 0 ? dynamicValue : [0];

    return Math.max(...dynamicValue, 0);
  }, [selectedLayers]);

  const onShadowChange = useCallback(
    (value) => {
      let fields = [];
      selectedLayers?.forEach((layer) => {
        fields = [...fields, { position: layer.position, field: 'settings.generalSettings.shadow', value: value }];
      });

      batch(() => {
        dispatch(setFilteredActiveLayerPropsArrayInStore(fields));
        dispatch(setSelectedLayersChangeCounter());
      });
    },
    [dispatch, selectedLayers],
  );

  const onShadowInputArrowDown = useCallback(
    (event) => {
      const value = getArrowEventValue(event) + Number(currentShadow);
      onShadowChange(value);
    },
    [currentShadow, onShadowChange],
  );

  return (
    <>
      <EditorSidebarSectionWrapper>
        <StyledEditorSidebarSectionTitleWrapper isSectionHidden={isLayoutSettingsToggledOn}>
          <EditorSidebarSectionTitle text={'Layout'} />

          <LayoutTrigger isOpen={isLayoutSettingsToggledOn} toggle={onLayoutSettingsToggle} />
        </StyledEditorSidebarSectionTitleWrapper>
        {isLayoutSettingsToggledOn && (
          <>
            <EditorSidebarRowWrapper>
              <EditorSidebarLabel text={'Position'} />

              <EditorSidebarValuesWrapper>
                <EditorSidebarHalfColumn>
                  <EditorSidebarLayoutInput
                    isDisabled={isLayoutSettingsDisabled}
                    sign={'X'}
                    type={'number'}
                    value={positionX}
                    onChange={onXPositionChange}
                    onKeyDown={onPositionKeyDown('x')}
                  />
                </EditorSidebarHalfColumn>

                <EditorSidebarHalfColumn>
                  <EditorSidebarLayoutInput
                    isDisabled={isLayoutSettingsDisabled}
                    sign={'Y'}
                    type={'number'}
                    value={positionY}
                    onChange={onYPositionChange}
                    onKeyDown={onPositionKeyDown('y')}
                  />
                </EditorSidebarHalfColumn>
              </EditorSidebarValuesWrapper>
            </EditorSidebarRowWrapper>

            <EditorSidebarRowWrapper>
              <EditorSidebarLabelWrapper>
                <EditorSidebarLabel text={'Size'} />
              </EditorSidebarLabelWrapper>

              <EditorSidebarValuesWrapper>
                <EditorSidebarHalfColumn>
                  <EditorSidebarLayoutInput
                    isDisabled={isLayoutSettingsDisabled}
                    sign={'W'}
                    type={'number'}
                    value={sizeW}
                    onChange={onWidthChange}
                    onKeyDown={onKeyDownSizeChange('width')}
                  />
                </EditorSidebarHalfColumn>

                <EditorSidebarHalfColumn>
                  <EditorSidebarLayoutInput
                    isDisabled={isLayoutSettingsDisabled}
                    sign={'H'}
                    type={'number'}
                    value={sizeH}
                    onChange={onHeightChange}
                    onKeyDown={onKeyDownSizeChange('height')}
                  />
                </EditorSidebarHalfColumn>
              </EditorSidebarValuesWrapper>
            </EditorSidebarRowWrapper>

            <EditorSidebarRowWrapper>
              <EditorSidebarLabelWrapper>
                <EditorSidebarLabel text={'Rotate'} />
              </EditorSidebarLabelWrapper>

              <EditorSidebarKnobWithInput
                isDisabled={isLayoutSettingsDisabled}
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

      <EditorSidebarSectionWrapper>
        <EditorSidebarSectionTitleWrapper>
          <EditorSidebarSectionTitle text={'Effects'} />
        </EditorSidebarSectionTitleWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabelWrapper>
            <EditorSidebarLabel text={'Opacity'} />
          </EditorSidebarLabelWrapper>

          <EditorSidebarSliderWithInput
            isDisabled={false}
            min={0}
            max={100}
            step={1}
            value={currentOpacity}
            sign={'%'}
            onChange={onOpacityChange}
            onInputArrowDown={onOpacityInputArrowDown}
          />
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabelWrapper>
            <EditorSidebarLabel text={'Shadow'} />
          </EditorSidebarLabelWrapper>

          <EditorSidebarSliderWithInput
            isDisabled={false}
            min={0}
            max={100}
            step={1}
            value={currentShadow}
            sign={'%'}
            onChange={onShadowChange}
            onInputArrowDown={onShadowInputArrowDown}
          />
        </EditorSidebarRowWrapper>
      </EditorSidebarSectionWrapper>
    </>
  );
};

export default EditorSidebarMultiLayersSettings;
