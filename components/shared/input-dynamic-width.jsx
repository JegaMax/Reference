import { memo, useCallback, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

const InputWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  position: relative;
  background: var(--shade-700-85);
  border-radius: 6px;
  border: 1px solid transparent;
  margin: 0;
  padding: 5.5px 12px;
  width: 100%;
  box-sizing: border-box;
  ${({ isFocused }) =>
    isFocused &&
    css`
      border: 1px solid var(--primary);
    `}
  ${({ isDisabled, isFocused, isReadOnly }) =>
    !isDisabled &&
    !isFocused &&
    !isReadOnly &&
    css`
      &:hover {
        border: 1px solid var(--shade-300);
      }
    `}
`;

const InputElement = styled.input`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  width: 100%;
  max-width: 100%;
  background: transparent;
  border: none;
  color: ${({ $hasError }) => ($hasError ? 'var(--warning)' : 'var(--white)')};
  padding: 0;
  &:-internal-autofill-selected,
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-text-fill-color: ${({ $hasError }) => ($hasError ? 'var(--warning)' : 'var(--white)')};
    -webkit-box-shadow: 0 0 0 1000px transparent inset;
    border: none !important;
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
  &:focus {
    outline: none;
    border: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  &[type='number'] {
    -moz-appearance: textfield;
  }
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      color: var(--shade-300);
    `};
`;

const Prefix = styled.span`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-300);
`;

const InputDynamicWidth = ({
  id,
  className,
  isDisabled,
  isReadOnly,
  autoFocus,
  value,
  type,
  name,
  prefix,
  placeholder,
  autoComplete,
  hasError,
  children,
  onKeyDown,
  onChange,
  onClick,
  onBlur,
}) => {
  const inputRef = useRef(null);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const prefixRef = useRef(null);

  const resizeInput = useCallback((element) => {
    if (value?.toString().length > 0) {
      return (element.style.width = `calc(${element?.value.length}ch + 4px)`);
    }
    return (element.style.width = `100%`);
  }, []);

  const onInputWrapperClick = () => {
    if (inputRef?.current) {
      inputRef?.current.focus();
    }

    onClick && onClick();
  };

  useEffect(() => {
    if (inputRef?.current) {
      resizeInput(inputRef?.current);
    }
  }, [resizeInput, value]);

  const onSetFocus = (isFocused) => () => {
    if (isDisabled || isReadOnly) {
      return;
    }
    const element = inputRef?.current;
    const elementType = element?.type;
    if (element && element?.type !== 'text') {
      element.type = 'text';
    }
    element?.setSelectionRange(element.value.length, element.value.length);
    if (element && typeof elementType !== 'undefined' && element.type !== elementType) {
      element.type = elementType;
    }
    setIsInputFocused(isFocused);
  };

  const onInputBlur = () => {
    onSetFocus(false)();
    onBlur?.();
  };

  const onDoubleClick = () => {
    const element = inputRef?.current;

    element?.select();
  };

  useEffect(() => {
    if (prefixRef?.current && inputRef?.current) {
      const prefixElement = prefixRef.current;
      inputRef.current.style.maxWidth = `calc(100% - ${prefixElement.offsetWidth}px)`;
    }
  }, [prefixRef?.current, prefixRef?.current]);

  return (
    <InputWrapper
      className={className}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isFocused={isInputFocused}
      onClick={onInputWrapperClick}
      onDoubleClick={onDoubleClick}
    >
      {prefix && <Prefix ref={prefixRef}>{prefix}</Prefix>}
      <InputElement
        id={id}
        value={value}
        type={type}
        name={name}
        isDisabled={isDisabled}
        disabled={isDisabled}
        ref={inputRef}
        placeholder={placeholder}
        autoComplete={autoComplete}
        $hasError={hasError}
        onKeyDown={onKeyDown}
        onFocus={onSetFocus(true)}
        onBlur={onInputBlur}
        onChange={onChange}
        autoFocus={autoFocus}
      />
      {children}
    </InputWrapper>
  );
};

InputDynamicWidth.defaultProps = {
  type: 'text',
  value: '',
};

export default memo(InputDynamicWidth);
