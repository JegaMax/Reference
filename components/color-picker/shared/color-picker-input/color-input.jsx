import React from 'react';
import styled from 'styled-components';
import InputBasic from './../../../shared/input-basic';

const ColorInputElement = styled(InputBasic)`
  text-align: center;
  & > input {
    padding: 7px 9px;
    width: 100% !important;
  }
`;

const ColorInput = ({
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

export default ColorInput;
