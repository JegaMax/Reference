import produce from 'immer';
import { isNil, set } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { blackRGBA, defaultShapeLeftColor } from '../../../../config/constants';
import { useAppSelector } from '../../../../hooks';
import { IColorType } from '../../../../interfaces/colors';
import { layerTypes } from '../../../../interfaces/layer-types';
import { getArrowEventValue } from '../../../../utils/common';
import ColorPicker from '../../../color-picker';
import Select from '../../../shared/select';
import limit from '../../constants/limits';
import EditorSidebarSliderWithInput from '../../shared/editor-sidebar-slider-with-input';
import EditorSidebarLabel from '../../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../../shared/elements/editor-sidebar-section-title';
import EditorSidebarHalfColumn from '../../shared/structure/editor-sidebar-half-column';
import EditorSidebarRowWrapper from '../../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../../shared/structure/editor-sidebar-values-wrapper';

const EditorSidebarShapeSettings = ({
  layer,
  parentLayer,
  handleLayerChange,
  handleBatchLayerChange,
}) => {
  const zoomPercent = useAppSelector((state) => state.helpers.zoomPercent);
  const currentLayerShape = layer.content.shape;
  const isActiveLayerLocked = layer.settings.generalSettings.locked;
  const layerType = layer.type;
  const width = layer.settings.layerSettings.width;
  const height = layer.settings.layerSettings.height;
  const thickness = layer.settings.layerSettings.shapeStyles.thickness;
  const permissionForFullScreen = layer.settings.layerSettings.permissionForFullScreen;

  const [currentThickness, setCurrentThickness] = useState(thickness);
  const [currentRadius, setCurrentRadius] = useState(Number(layer.settings.generalSettings.round));
  const [currentFillColor, setCurrentFillColor] = useState(layer.settings.layerSettings.shapeStyles.fillColor);
  const [currentBorderColor, setCurrentBorderColor] = useState(layer.settings.layerSettings.shapeStyles.borderColor);

  useEffect(() => setCurrentThickness(thickness), [thickness]);

  useEffect(() => setCurrentRadius(Number(layer.settings.generalSettings.round)), [
    layer.settings.generalSettings.round,
  ]);

  useEffect(() => setCurrentFillColor(layer.settings.layerSettings.shapeStyles.fillColor), [
    layer.settings.layerSettings.shapeStyles.fillColor,
  ]);

  useEffect(() => setCurrentBorderColor(layer.settings.layerSettings.shapeStyles.borderColor), [
    layer.settings.layerSettings.shapeStyles.borderColor,
  ]);

  const thicknessOptions = useMemo(() => {
    const options = [];
    for (let iteration = 0; iteration <= limit.thickness; iteration++) {
      options.push(iteration);
    }
    return options.map((option) => ({ name: option, value: option }));
  }, []);

  const handleColorChange = useCallback(
    (prop, value, type) => {
      if (isActiveLayerLocked) {
        return;
      }

      if (!isNil(!parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, `settings.layerSettings.shapeStyles[${type}].${prop}`, value);
            });

            return nextState;
          }

          return cl;
        });

        handleLayerChange({ field: `childLayers`, value: updatedLayers });
        return;
      }

      handleLayerChange({ field: `settings.layerSettings.shapeStyles[${type}].${prop}`, value });
    },
    [handleLayerChange, isActiveLayerLocked, layer._id, parentLayer?._id, parentLayer?.childLayers],
  );

  const setShapeThickness = useCallback(
    (newValue, type) => {
      if (isActiveLayerLocked) {
        return;
      }

      if (newValue > limit[type] || newValue < 0) {
        return;
      }

      const currentThickness =
        +(layer.settings.layerSettings.shapeStyles.relativeThickness) ??
        layer.settings.layerSettings.shapeStyles.thickness;

      let offsetX = Number(layer.settings.generalSettings.offsetX);
      let offsetY = Number(layer.settings.generalSettings.offsetY);

      offsetX = offsetX - newValue + currentThickness;
      offsetY = offsetY - newValue + currentThickness;

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'settings.generalSettings.offsetX', offsetX);
              set(draftState, 'settings.generalSettings.offsetY', offsetY);
              set(draftState, `settings.layerSettings.shapeStyles.${type}`, newValue);
              set(draftState, 'settings.layerSettings.shapeStyles.relativeThickness', newValue * (zoomPercent / 100));
            });

            return nextState;
          }

          return cl;
        });

        if (updatedLayers && updatedLayers?.length > 0) {
          const {
            width: newWidth,
            height: newHeight,
            offsetX: newOffsetX,
            offsetY: newOffsetY,
          } = updatedLayers?.reduce(
            (acc, currentLayer) => {
              const { settings, position } = currentLayer;
              const { offsetX: layerOffsetX, offsetY: layerOffsetY } = settings.generalSettings;
              const { height: layerHeight, width: layerWidth } = settings.layerSettings;

              if (+layerOffsetX < acc.offsetX) {
                acc.offsetX = Math.round(layerOffsetX);
              }

              if (+layerOffsetY < acc.offsetY) {
                acc.offsetY = Math.round(layerOffsetY);
              }

              if (+layerWidth + +layerOffsetX > acc.width) {
                acc.width = Math.round(+layerWidth + +layerOffsetX);
              }

              if (+layerHeight + +layerOffsetY > acc.height) {
                acc.height = Math.round(+layerHeight + +layerOffsetY);
              }

              if (position < acc.position) {
                acc.position = position;
              }

              return acc;
            },
            {
              width: 0,
              height: 0,
              offsetX: Number.POSITIVE_INFINITY,
              offsetY: Number.POSITIVE_INFINITY,
              position: Number.POSITIVE_INFINITY,
            },
          );

          handleBatchLayerChange([
            { field: 'isStale', value: true },
            { field: `childLayers`, value: updatedLayers },
            { field: 'settings.generalSettings.offsetX', value: newOffsetX },
            { field: 'settings.generalSettings.offsetY', value: newOffsetY },
            { field: 'settings.layerSettings.width', value: newWidth - newOffsetX },
            { field: 'settings.layerSettings.height', value: newHeight - newOffsetY },
          ]);
        }

        setCurrentThickness(newValue);
        return;
      }

      handleBatchLayerChange([
        { field: 'settings.generalSettings.offsetX', value: offsetX },
        { field: 'settings.generalSettings.offsetY', value: offsetY },
        { field: `settings.layerSettings.shapeStyles.${type}`, value: newValue },
        { field: `settings.layerSettings.shapeStyles.relativeThickness`, value: newValue * (zoomPercent / 100) },
      ]);
      setCurrentThickness(newValue);
    },

    [
      layer._id,
      parentLayer?.childLayers,
      parentLayer?._id,
      isActiveLayerLocked,
      zoomPercent,
      handleBatchLayerChange,
      layer.settings.generalSettings.offsetX,
      layer.settings.generalSettings.offsetY,
      layer.settings.layerSettings.shapeStyles.thickness,
      layer.settings.layerSettings.shapeStyles.relativeThickness,
    ],
  );

  const onThicknessChange = useCallback(
    (value) => {
      if (isActiveLayerLocked) {
        return;
      }
      setShapeThickness(value, 'thickness');
    },
    [isActiveLayerLocked, setShapeThickness],
  );

  const onRadiusChange = useCallback(
    (value) => {
      if (isActiveLayerLocked) {
        return;
      }

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'settings.generalSettings.round', Number(value));
            });

            return nextState;
          }

          return cl;
        });

        handleLayerChange({ field: `childLayers`, value: updatedLayers });
        return;
      }

      handleLayerChange({ field: 'settings.generalSettings.round', value: Number(value) });
    },
    [handleLayerChange, isActiveLayerLocked, layer._id, parentLayer?._id, parentLayer?.childLayers],
  );

  const onRadiusInputArrowDown = useCallback(
    (event) => {
      if (isActiveLayerLocked) {
        return;
      }
      if (
        (Number(currentRadius) === limit.round && event.key === 'ArrowUp') ||
        (Number(currentRadius) === 0 && event.key === 'ArrowDown')
      ) {
        return;
      }

      const value = getArrowEventValue(event) + Number(currentRadius);
      setCurrentRadius(value);

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'settings.generalSettings.round', Number(value));
            });

            return nextState;
          }

          return cl;
        });

        handleLayerChange({ field: `childLayers`, value: updatedLayers });
        return;
      }

      handleLayerChange({ field: 'settings.generalSettings.round', value });
    },
    [currentRadius, handleLayerChange, isActiveLayerLocked, layer._id, parentLayer?._id, parentLayer?.childLayers],
  );

  const onFillColorChange = (prop, value) => {
    if (isActiveLayerLocked) {
      return;
    }

    setCurrentFillColor((prevFillColor) => {
      return {
        ...prevFillColor,
        [prop]: value,
      };
    });
    handleColorChange(prop, value, IColorType.FillColor);
  };

  const onBorderColorChange = useCallback(
    (prop, value) => {
      if (isActiveLayerLocked) {
        return;
      }

      setCurrentBorderColor((prevBorderColor) => {
        return {
          ...prevBorderColor,
          [prop]: value,
        };
      });
      handleColorChange(prop, value, IColorType.BorderColor);
    },
    [handleColorChange, isActiveLayerLocked],
  );

  return (
    <EditorSidebarSectionWrapper>
      <EditorSidebarSectionTitleWrapper>
        <EditorSidebarSectionTitle text={'Shape'} />
      </EditorSidebarSectionTitleWrapper>
      <>
        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Color'} />

          <EditorSidebarValuesWrapper>
            <EditorSidebarHalfColumn justifyContent={'flex-end'}>
              <ColorPicker
                isWithGradient={true}
                type={currentFillColor.type}
                colorType={IColorType.FillColor}
                isDisabled={isActiveLayerLocked}
                leftColor={currentFillColor.leftColor}
                rightColor={currentFillColor.rightColor}
                defaultLeftColor={defaultShapeLeftColor}
                leftColorPercent={currentFillColor.leftColorPercent}
                rightColorPercent={currentFillColor.rightColorPercent}
                handleColorChange={onFillColorChange}
              />
            </EditorSidebarHalfColumn>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Radius'} />

          <EditorSidebarSliderWithInput
            min={0}
            max={limit.round}
            step={1}
            value={currentRadius}
            sign={'%'}
            isDisabled={
              ['circle', 'cloud', 'heart'].includes(currentLayerShape) ||
              layerType === layerTypes.HTML ||
              permissionForFullScreen ||
              isActiveLayerLocked
            }
            onChange={onRadiusChange}
            onInputArrowDown={onRadiusInputArrowDown}
          />
        </EditorSidebarRowWrapper>

        <EditorSidebarRowWrapper>
          <EditorSidebarLabel text={'Border'} />

          <EditorSidebarValuesWrapper>
            <EditorSidebarHalfColumn justifyContent={'flex-end'}>
              <ColorPicker
                isWithGradient={true}
                defaultLeftColor={blackRGBA}
                type={currentBorderColor.type}
                isDisabled={isActiveLayerLocked}
                colorType={IColorType.BorderColor}
                leftColor={currentBorderColor.leftColor}
                rightColor={currentBorderColor.rightColor}
                leftColorPercent={currentBorderColor.leftColorPercent}
                rightColorPercent={currentBorderColor.rightColorPercent}
                handleColorChange={onBorderColorChange}
              />
            </EditorSidebarHalfColumn>
            <EditorSidebarHalfColumn>
              <Select
                isDisabled={isActiveLayerLocked}
                selectOption={currentThickness}
                options={thicknessOptions}
                onSelect={onThicknessChange}
              />
            </EditorSidebarHalfColumn>
          </EditorSidebarValuesWrapper>
        </EditorSidebarRowWrapper>
      </>
    </EditorSidebarSectionWrapper>
  );
};

export default memo(EditorSidebarShapeSettings);
