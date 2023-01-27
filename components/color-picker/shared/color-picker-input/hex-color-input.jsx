import { memo, useCallback, useEffect, useState } from 'react';
import ColorInput from './color-input-dynamic-width';

import { hexToRgb, isHexColor, rgbaToHex, rgbaToHexa, toRGBObject, toRGBString } from '../../../../utils/parseColors';

import styled from 'styled-components';

const HexColorInputWrapper = styled.div`
  max-width: 100%;
`;

const HexColorInput = ({ color, handleColorChange }) => {
  const [hexColor, setHexColor] = useState(rgbaToHex(toRGBString(color)));
  const updateHexColor = useCallback(() => {
    const newHex = rgbaToHex(toRGBString(color));
    if (!isHexColor(newHex)) {
      return;
    }
    let hexALength = 9;
    let hexLength = 7;

    if (hexColor[0] !== '#' && isHexColor(hexColor) && hexColor === rgbaToHexa(toRGBString(color))) {
      hexALength = 8;
      hexLength = 6;
    }

    if (hexColor.length === hexALength) {
      setHexColor(rgbaToHexa(toRGBString(color)));
      return;
    }

    if (newHex.length === hexLength) {
      setHexColor(rgbaToHex(toRGBString(color)));
      return;
    }
  }, [color, hexColor]);

  useEffect(() => {
    updateHexColor();
  }, [color, updateHexColor]);

  const handleHexColorChange = useCallback(
    (event) => {
      const value = event.target.value.replace(/\s+/g, '');
      setHexColor(value);

      handleColorChange(toRGBObject(hexToRgb(value)));
    },
    [handleColorChange],
  );

  return (
    <HexColorInputWrapper>
      <ColorInput value={hexColor} onChange={handleHexColorChange} />
    </HexColorInputWrapper>
  );
};

export default memo(HexColorInput);
