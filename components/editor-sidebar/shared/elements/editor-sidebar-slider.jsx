import React, { memo } from 'react';
import Slider from 'rc-slider';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  width: calc(100% - 3px);
`;

const EditorSidebarSlider = ({ isDisabled, min, max, step, value, onChange }) => {
  return (
    <SliderWrapper>
      <Slider
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        trackStyle={{
          backgroundColor: isDisabled ? 'var(--shade-500)' : 'var(--primary)',
          height: 4,
          transition: 'none',
        }}
        handleStyle={{
          height: 12,
          width: 12,
          backgroundColor: isDisabled ? 'var(--shade-300)' : 'var(--white)',
          border: 'none',
          marginTop: '-4px',
        }}
        railStyle={{ backgroundColor: isDisabled ? 'var(--shade-500-85)' : 'var(--shade-500-85)', height: 4 }}
      />
    </SliderWrapper>
  );
};

EditorSidebarSlider.defaultProps = {
  disabled: false,
};

export default memo(EditorSidebarSlider);
