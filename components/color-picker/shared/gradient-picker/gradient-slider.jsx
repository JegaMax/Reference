import React, { memo } from 'react';
import { Range } from 'rc-slider';
import GradientHandle from './gradient-handle';
import styled from 'styled-components';

const GradientSliderWrapper = styled.div`
  margin: 0 10px 8px 10px;
  padding: 0 4px;
`;

const GradientSlider = ({
  min,
  max,
  step,
  value,
  gradientBackgroundColor,
  onChange,
  onLeftHandleClick,
  onRightHandleClick,
}) => {
  return (
    <GradientSliderWrapper>
      <Range
        min={min}
        max={max}
        step={step}
        value={value}
        handle={(props) => <GradientHandle {...props} {...{ values: value, onLeftHandleClick, onRightHandleClick }} />}
        allowCross={false}
        onChange={onChange}
        trackStyle={[
          {
            background: gradientBackgroundColor,
            height: 4,
            transition: 'none',
          },
          {
            background: gradientBackgroundColor,
            height: 4,
            transition: 'none',
          },
        ]}
        handleStyle={[
          {
            height: 10,
            width: 10,
            backgroundColor: '#FFFFFF',
            border: 'none',
            marginTop: '-3px',
          },
          {
            height: 10,
            width: 10,
            backgroundColor: '#FFFFFF',
            border: 'none',
            marginTop: '-3px',
          },
        ]}
        railStyle={{ background: gradientBackgroundColor, height: 4 }}
      />
    </GradientSliderWrapper>
  );
};

GradientSlider.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
};

export default memo(GradientSlider);
