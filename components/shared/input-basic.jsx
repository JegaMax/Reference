import React from 'react';
import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
`;

const InputElement = styled.input`
  display: block;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  padding: 5.5px 12px;
  letter-spacing: 0.01em;
  width: 100%;
  max-width: 100%;
  background: var(--shade-700-85);
  border-radius: 6px;
  border: none;
  border: 1px solid transparent;
  color: ${({ $hasError }) => ($hasError ? 'var(--warning)' : 'var(--white)')};
  &:-internal-autofill-selected,
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: var(--white) !important;
    -webkit-box-shadow: 0 0 0 1000px var(--shade-700) inset;
    border: 1px solid var(--shade-700) !important;
  }
  @-moz-document url-prefix() {
    & {
      filter: none;
    }
  }
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--shade-300);
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: var(--shade-300);
    opacity: 1;
  }
  &:hover:not(:focus),
  &:-webkit-autofill:hover:not(:focus) {
    outline: none;
    border: 1px solid var(--shade-300) !important;
  }
  &:focus,
  &:focus:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:focus:hover {
    outline: none;
    border: 1px solid var(--primary) !important;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
  ${({ isReadOnly }) => isReadOnly && `cursor: default;`}
  ${({ isDisabled, isReadOnly }) =>
    !isDisabled &&
    !isReadOnly &&
    css`
      &:hover {
        border: 1px solid var(--shade-300);
      }
    `}
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      color: var(--shade-300);
    `};
`;

const InputBasic = ({
  id,
  className,
  type = 'text',
  name,
  value,
  size,
  placeholder,
  isDisabled,
  isReadOnly,
  autoFocus,
  autoComplete,
  hasError,
  onKeyDown,
  onChange,
  onClick,
  onBlur,
  onFocus,
}) => {
  return (
    <InputWrapper className={className}>
      <InputElement
        size={size}
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        isDisabled={isDisabled}
        $hasError={hasError}
        {...(isReadOnly ? { defaultValue: value, key: value } : { value })}
        isReadOnly={isReadOnly}
        readOnly={isReadOnly}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onClick={onClick}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
      />
    </InputWrapper>
  );
};

export default InputBasic;
