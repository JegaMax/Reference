import { memo, useCallback, useEffect, useState } from 'react';
import EditorSidebarSignInput from './elements/editor-sidebar-sign-input';
import EditorSidebarHalfColumn from './structure/editor-sidebar-half-column';
import EditorSidebarValuesWrapper from './structure/editor-sidebar-values-wrapper';

const EditorSidebarKnobWithInput = ({
  isDisabled,
  angle,
  min,
  max,
  step,
  value,
  sign,
  onKnobMouseDown,
  onChange,
  roundValue,
}) => {
  const [localValue, setLocalValue] = useState(value);
  const [knobPosition, setKnobPosition] = useState(value);
  const changeAngle = useCallback(
    (value) => {
      if (isDisabled) {
        return;
      }

      let newValue = value.toString().replace(/[^0-9-]+/g, '');

      const pattern = /([-])?([0-9]+)([-])?/g;
      const matches = newValue.toString().match(pattern);

      if (matches) {
        newValue = matches[0] === '-0' || matches[0].endsWith('-') ? '-' : +matches[0];
      }

      if (typeof +newValue === 'number' && +value > max) {
        newValue = max;
      }
      if (typeof +newValue === 'number' && +value < min) {
        newValue = min;
      }

      setLocalValue(newValue);
      if (typeof newValue === 'number') {
        onChange(+newValue);
        setKnobPosition(+newValue);
      }
    },
    [isDisabled, max, min, onChange],
  );

  const onAngleInputChange = useCallback((event) => changeAngle(event.target.value), [
    changeAngle,
  ]);

  const onArrowDownCalculations = useCallback(
    (event, max, min, step) => {
      event.stopPropagation();

      let value = Math.round(+(event.target).value);

      if (event.key === 'ArrowUp') {
        value = value === max ? value * -step : value + step;
        if (roundValue) {
          value = Math.floor(value / 10) * 10;
        }
        changeAngle(value);
      }
      if (event.key === 'ArrowDown') {
        value = value === min ? value * -step : value - step;
        if (roundValue) {
          value = Math.ceil(value / 10) * 10;
        }
        changeAngle(value);
      }
    },
    [changeAngle, roundValue],
  );

  const onArrowDown = useCallback(
    (event) => onArrowDownCalculations(event, max, min, step),
    [onArrowDownCalculations, min, max, step],
  );

  useEffect(() => {
    if (value !== localValue && !(value === 0 && localValue === '') && !(localValue === '-')) {
      setKnobPosition(value);
    }
  }, [localValue, value]);

  // Changing sidebar rotation value, if the value is changed from layer handle
  useEffect(() => {
    setLocalValue(value);
    if (typeof value === 'number') {
      setKnobPosition(+value);
    }
  }, [value]);

  return (
    <EditorSidebarValuesWrapper>
      {/* <EditorSidebarHalfColumn justifyContent={'flex-end'}>
        <EditorSidebarKnob
          isDisabled={isDisabled}
          angle={angle}
          min={min}
          max={max}
          step={step}
          value={knobPosition}
          onMouseDownHandler={onKnobMouseDown}
          onChange={changeAngle}
        />
      </EditorSidebarHalfColumn> */}

      <EditorSidebarHalfColumn>
        <EditorSidebarSignInput
          isDisabled={isDisabled}
          value={localValue}
          sign={sign}
          onKeyDown={onArrowDown}
          onChange={onAngleInputChange}
        />
      </EditorSidebarHalfColumn>
    </EditorSidebarValuesWrapper>
  );
};

export default memo(EditorSidebarKnobWithInput);
