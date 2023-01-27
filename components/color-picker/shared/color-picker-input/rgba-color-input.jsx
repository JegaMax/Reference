import { memo, useEffect, useState } from 'react';
import ColorInputsWrapper from './../structure/color-inputs-wrapper';
import ColorInput from './color-input';

const RgbaColorInput = ({ color, handleColorChange }) => {
  const [rgbaColor, setRgbaColor] = useState(color);

  useEffect(() => {
    setRgbaColor(color);
  }, [color]);

  const isValidInput = (value) => value >= 0 && value <= 255;

  const handleRgbaColorChange = (event, field) => {
    const { value } = event.target;
    const newValue = Math.round(value);

    const newColor = { ...rgbaColor, [field]: newValue };

    if (isValidInput(newValue)) {
      setRgbaColor(newColor);
      handleColorChange(newColor);
    }
  };

  return (
    <ColorInputsWrapper>
      <ColorInput type={'number'} value={rgbaColor.r} onChange={(e) => handleRgbaColorChange(e, 'r')} />
      <ColorInput type={'number'} value={rgbaColor.g} onChange={(e) => handleRgbaColorChange(e, 'g')} />
      <ColorInput type={'number'} value={rgbaColor.b} onChange={(e) => handleRgbaColorChange(e, 'b')} />
    </ColorInputsWrapper>
  );
};

export default memo(RgbaColorInput);
