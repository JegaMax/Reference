import React from 'react';
import styled from 'styled-components';
import InputDynamicWidth from './../../../shared/input-dynamic-width';

const ColorInputElement = styled(InputDynamicWidth)`
  padding: 7px 12px;
`;

const ColorInputDynamicWidth = ({
  className,
  isDisabled,
  value,
  type,
  placeholder,
  onKeyDown,
  onChange,
}) => {
  return (
    <ColorInputElement
      className={className}
      isDisabled={isDisabled}
      value={value}
      type={type}
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      onChange={onChange}
    />
  );
};

export default ColorInputDynamicWidth;
