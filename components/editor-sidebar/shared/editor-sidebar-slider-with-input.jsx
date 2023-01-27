import { useEffect, useState } from 'react';
import EditorSidebarSignInput from './elements/editor-sidebar-sign-input';
import EditorSidebarSlider from './elements/editor-sidebar-slider';
import EditorSidebarHalfColumn from './structure/editor-sidebar-half-column';
import EditorSidebarValuesWrapper from './structure/editor-sidebar-values-wrapper';

const EditorSidebarSliderWithInput = ({
  min,
  max,
  step,
  value,
  sign,
  isDisabled,
  onChange,
  onInputArrowDown,
}) => {
  const [localValue, setLocalValue] = useState(+value);

  useEffect(() => {
    setLocalValue((v) => (v === value ? v : value));
  }, [value]);

  const getValue = (value, min, max) => {
    if (isNaN(value)) {
      return min;
    }
    if (+value > max) {
      return value % 10;
    }
    if (+value < min) {
      return min;
    }

    return +value;
  };

  const shouldArrowsFire = (event, min, max) => {
    if (isDisabled) {
      return false;
    }
    const value = +event.target.value;
    if (isNaN(value)) {
      return false;
    }
    if (event.key === 'ArrowUp') {
      return !(value > max - 1);
    }
    if (event.key === 'ArrowDown') {
      return !(value < min + 1);
    }

    return true;
  };

  const changeValue = (value) => {
    setLocalValue(value);
    onChange(value);
  };

  const onInputValueChange = (event) => {
    event.stopPropagation();

    if (isDisabled) {
      return;
    }

    const newValue = getValue(Number(event.target.value), min, max);

    changeValue(newValue);
  };

  const onSliderValueChange = (inputParam) => {
    if (isDisabled) {
      return;
    }

    const newValue = getValue(+inputParam, min, max);

    changeValue(newValue);
  };

  const onArrowDown = (event) => {
    event.stopPropagation();

    if (isDisabled) {
      return;
    }
    if (shouldArrowsFire(event, min, max)) {
      onInputArrowDown(event);
    }
  };

  return (
    <EditorSidebarValuesWrapper>
      <EditorSidebarHalfColumn>
        <EditorSidebarSlider
          isDisabled={isDisabled}
          min={min}
          max={max}
          step={step}
          value={+localValue}
          onChange={onSliderValueChange}
        />
      </EditorSidebarHalfColumn>

      <EditorSidebarHalfColumn>
        <EditorSidebarSignInput
          isDisabled={isDisabled}
          value={localValue}
          sign={sign}
          onKeyDown={onArrowDown}
          onChange={onInputValueChange}
        />
      </EditorSidebarHalfColumn>
    </EditorSidebarValuesWrapper>
  );
};

export default EditorSidebarSliderWithInput;
