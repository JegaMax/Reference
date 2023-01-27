import { memo } from 'react';

import CustomColor from './custom-color';
import CustomColorsLabel from './custom-colors-label';
import CustomColorsWrapper from './custom-colors-wrapper';

import { toRGBObject } from '../../../../utils/parseColors';

import { presetColors } from '../../../../utils/builders';

const PresetColors = ({ selectedColor, handleColorChange }) => {
  return (
    <>
      <CustomColorsLabel title={'Preset'} />

      {presetColors.map((colorRow, index) => (
        <CustomColorsWrapper key={`preset-color-row-${index}`}>
          {colorRow.map((color, index) => (
            <CustomColor
              selectedColor={selectedColor}
              key={`preset-color-${index}`}
              color={color}
              handleClick={() => handleColorChange(toRGBObject(color))}
            />
          ))}
        </CustomColorsWrapper>
      ))}
    </>
  );
};

export default memo(PresetColors);
