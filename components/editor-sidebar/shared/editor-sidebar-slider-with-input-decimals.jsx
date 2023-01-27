import { useCallback, useEffect, useState } from 'react';
import EditorSidebarSignInput from './elements/editor-sidebar-sign-input';
import EditorSidebarSlider from './elements/editor-sidebar-slider';
import EditorSidebarHalfColumn from './structure/editor-sidebar-half-column';
import EditorSidebarValuesWrapper from './structure/editor-sidebar-values-wrapper';

const EditorSidebarSliderWithInputDecimals = ({
  min,
  max,
  step,
  value,
  sign,
  isDisabled,
  onChange,
  onInputArrowDown,
  sliderMinValue = min,
}) => {
  const [localValue, setLocalValue] = useState(+value);

  useEffect(() => {
    setLocalValue((v) => (v === value ? v : value));
  }, [value]);

  const getValue = useCallback((value, min, max) => {
    if (typeof value === 'string' && value !== '.') {
      return min;
    }

    const newValue = +value;
    if (newValue > max) {
      return newValue % 10;
    }
    if (newValue < min) {
      return min;
    }

    return newValue;
  }, []);

  const shouldArrowsFire = useCallback(
    (event, min, max) => {
      if (isDisabled) {
        return false;
      }

      const value = +(event.target).value;
      if (isNaN(value)) {
        return false;
      }
      if (event.key === 'ArrowUp') {
        return !(value >= max);
      }
      if (event.key === 'ArrowDown') {
        return !(value <= min);
      }

      return true;
    },
    [isDisabled],
  );

  const onSliderValueChange = useCallback(
    (inputParam) => {
      if (isDisabled) {
        return;
      }

      const newValue = getValue(+inputParam, min, max);

      setLocalValue(newValue);
      onChange(newValue);
    },
    [getValue, isDisabled, max, min, onChange],
  );

  const onValueChange = useCallback(
    (inputParam) => {
      if (isDisabled) {
        return;
      }

      let value = inputParam?.target.value || '';
      if (/^\d*\.?\d{0,1}$/.test(value)) {
        value = +inputParam?.target?.value > max ? max : inputParam?.target?.value;
        setLocalValue(value);
        onChange(+value);
      }

      if (isNaN(+value) || +value < min || (typeof value === 'string' && value.length === 0)) {
        onChange(sliderMinValue);
      }

      return;
    },
    [isDisabled, max, min, onChange, sliderMinValue],
  );

  const onArrowDown = useCallback(
    (event) => {
      if (isDisabled) {
        return;
      }
      if (shouldArrowsFire(event, sliderMinValue, max)) {
        onInputArrowDown(event);
      }
    },
    [isDisabled, max, onInputArrowDown, shouldArrowsFire, sliderMinValue],
  );

  const onBlur = useCallback(() => {
    if (isNaN(+localValue) || +localValue < min || (typeof localValue === 'string' && localValue.length === 0)) {
      setLocalValue(sliderMinValue);
      onChange(sliderMinValue);
    }
  }, [localValue, min, onChange, sliderMinValue]);

  return (
    <EditorSidebarValuesWrapper>
      <EditorSidebarHalfColumn>
        <EditorSidebarSlider
          isDisabled={isDisabled}
          min={sliderMinValue}
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
          onChange={onValueChange}
          onBlur={onBlur}
        />
      </EditorSidebarHalfColumn>
    </EditorSidebarValuesWrapper>
  );
};

export default EditorSidebarSliderWithInputDecimals;
