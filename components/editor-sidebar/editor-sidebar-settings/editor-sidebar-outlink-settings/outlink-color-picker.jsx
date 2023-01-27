import produce from 'immer';
import { layerTypes } from 'interfaces/layer-types';
import { set } from 'lodash';
import { useEffect, useState } from 'react';
import { defaultCTAFillLeftColor } from '../../../../config/constants';
import { IColorType } from '../../../../interfaces/colors';
import { stopPropagation } from '../../../../utils/common';
import { getLinearRGBValue, getOutlinkColor } from '../../../../utils/parseColors';
import ColorPicker from '../../../color-picker';

const OutlinkColorPicker = ({ layer, size, handleBatchLayerChange, parentLayer }) => {
  const [currentFillColor, setCurrentFillColor] = useState(layer?.settings?.layerSettings?.shapeStyles?.fillColor);
  const isActiveLayerLocked = layer?.settings?.generalSettings?.locked;

  useEffect(() => {
    if (layer?.settings?.layerSettings?.shapeStyles?.fillColor) {
      setCurrentFillColor(layer?.settings?.layerSettings?.shapeStyles?.fillColor);
    }
  }, [layer?.settings?.layerSettings?.shapeStyles?.fillColor]);

  const onFillColorChange = (prop, value) => {
    if (isActiveLayerLocked) {
      return;
    }
    let newFontColor = null;
    const changes = [{ field: `settings.layerSettings.shapeStyles[${IColorType.FillColor}].${prop}`, value }];
    const fillColor = {
      ...layer?.settings?.layerSettings?.shapeStyles?.[IColorType.FillColor],
      [prop]: value,
    };

    const { r, g, b } = getOutlinkColor(fillColor);
    const linearR = getLinearRGBValue(r);
    const linearG = getLinearRGBValue(g);
    const linearB = getLinearRGBValue(b);
    newFontColor =
      0.2126 * linearR + 0.7152 * linearG + 0.0722 * linearB > 0.179 ? 'rgba(0, 0, 0, 1)' : 'rgba(255, 255, 255, 1)';

    changes.push({ field: 'settings.ctaLayerSettings.fontColor', value: newFontColor });

    setCurrentFillColor((prevFillColor) => {
      return {
        ...prevFillColor,
        [prop]: value,
      };
    });

    if (parentLayer && parentLayer?.type === layerTypes.GROUP) {
      const updatedLayers = parentLayer?.childLayers?.map((cl) => {
        if (cl._id === layer._id) {
          const nextState = produce(cl, (draftState) => {
            set(draftState, `settings.layerSettings.shapeStyles[${IColorType.FillColor}].${prop}`, value);
          });

          return nextState;
        }

        return cl;
      });
      handleBatchLayerChange([{ field: 'childLayers', value: updatedLayers }]);
      return;
    }

    handleBatchLayerChange(changes);
  };

  if (!currentFillColor) {
    return <></>;
  }

  return (
    <div onMouseDown={stopPropagation}>
      <ColorPicker
        isWithGradient={true}
        size={size}
        type={currentFillColor?.type}
        colorType={IColorType.FillColor}
        isDisabled={isActiveLayerLocked}
        leftColor={currentFillColor?.leftColor}
        rightColor={currentFillColor?.rightColor}
        defaultLeftColor={defaultCTAFillLeftColor}
        leftColorPercent={currentFillColor?.leftColorPercent}
        rightColorPercent={currentFillColor?.rightColorPercent}
        handleColorChange={onFillColorChange}
      />
    </div>
  );
};

export default OutlinkColorPicker;
