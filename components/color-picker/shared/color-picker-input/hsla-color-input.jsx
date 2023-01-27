import { memo, useEffect, useState } from 'react';
import ColorInput from './color-input';


import isEqual from 'lodash/isEqual';
import { hslaToRgba, rgbaToHsla } from '../../../../utils/parseColors';
import ColorInputsWrapper from '../structure/color-inputs-wrapper';

const HslaColorInput = ({ color, handleColorChange }) => {
  const [hslaColor, setHslaColor] = useState(rgbaToHsla(color));
  const [isManuallyChanged, setIsManuallyChanged] = useState(false);

  useEffect(() => {
    !isManuallyChanged && setHslaColor(rgbaToHsla(color));
    setIsManuallyChanged(false);
  }, [color]);

  const isValidInput = (field, value) =>
    field === 'h' ? value >= 0 && value <= 360 : value >= 0 && value <= 100;

  const handleHslaColorChange = (event, field) => {
    const { value } = event.target;
    const newValue = Math.round(value);

    const newColor = { ...hslaColor, [field]: newValue };
    if (isValidInput(field, value)) {
      setHslaColor(newColor);
      setIsManuallyChanged(true);
      handleColorChange(hslaToRgba(newColor));
    }
  };

  return (
    <ColorInputsWrapper>
      <ColorInput type={'number'} value={hslaColor.h} onChange={(e) => handleHslaColorChange(e, 'h')} />
      <ColorInput type={'number'} value={hslaColor.s} onChange={(e) => handleHslaColorChange(e, 's')} />
      <ColorInput type={'number'} value={hslaColor.l} onChange={(e) => handleHslaColorChange(e, 'l')} />
    </ColorInputsWrapper>
  );
};

export default memo(HslaColorInput, (props, nextProps) => {
  return isEqual(props.color, nextProps.color);
});
