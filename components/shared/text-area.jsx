import { memo, useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import styled, { css } from 'styled-components';

const TextAreaWrapper = styled.div`
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

const TextAreaElement = styled(TextareaAutosize)`
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
  padding: 0 6px 0 0;
  overflow: overlay;
  scrollbar-color: var(--shade-300-85) transparent;
  resize: none;
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
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      pointer-events: none;
      color: var(--shade-300);
    `}
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

const TextArea = ({
  id,
  className,
  isDisabled,
  isReadOnly,
  value = '',
  name,
  prefix,
  placeholder,
  hasError,
  children,
  onKeyDown,
  onChange,
  minRows = 1,
  maxRows = 3,
}) => {
  const [isTextareaFocused, setIsTextareaFocused] = useState(false);
  const textareaRef = useRef(null);
  const prefixRef = useRef(null);

  const onInputWrapperClick = () => {
    if (textareaRef?.current) {
      textareaRef?.current.focus();
    }
  };

  const onSetFocus = (isFocused) => () => {
    if (isDisabled || isReadOnly) {
      return;
    }
    setIsTextareaFocused(isFocused);
  };

  useEffect(() => {
    if (prefixRef?.current && textareaRef?.current) {
      const prefixElement = prefixRef?.current;
      textareaRef.current.style.maxWidth = `calc(100% - ${prefixElement.offsetWidth}px)`;
    }
  }, [prefixRef?.current, prefixRef?.current]);

  return (
    <TextAreaWrapper
      className={className}
      isDisabled={isDisabled}
      isReadOnly={isReadOnly}
      isFocused={isTextareaFocused}
      onClick={onInputWrapperClick}
    >
      {prefix && <Prefix ref={prefixRef}>{prefix}</Prefix>}
      <TextAreaElement
        minRows={minRows}
        maxRows={maxRows}
        id={id}
        value={value}
        name={name}
        $isDisabled={isDisabled}
        disabled={isDisabled}
        ref={textareaRef}
        placeholder={placeholder}
        $hasError={hasError}
        onKeyDown={onKeyDown}
        onFocus={onSetFocus(true)}
        onBlur={onSetFocus(false)}
        onChange={onChange}
      />
      {children}
    </TextAreaWrapper>
  );
};

export default memo(TextArea);
