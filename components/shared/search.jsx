import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
// Images
import clearImage from './images/editor-modal/Clear.svg';
import searchImage from './images/editor-modal/Search.svg';
// Styles
import { useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const Form = styled.form`
  display: block;
`;

const InputWrapper = styled.div`
  position: relative;
  padding: 5px 30px;
  min-height: 30px;
  background: var(--shade-700-85);
  border-radius: 6px;
  transition: 0.12s ease;
  border: 1px solid ${({ hasBorder, isFocused }) =>
    hasBorder && isFocused ? `var(--primary)` : `var(--shade-700-85)`};
  ${({ hasBorder, isFocused }) =>
    hasBorder &&
    !isFocused &&
    `
    &:hover{ 
      border-color: var(--white-20); 
    }`}
  }
`;

const SearchIcon = styled.img`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  pointer-events: none;
`;

const ClearIcon = styled.img`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
`;

const Input = styled.input`
  color: var(--white);
  font-family: Heebo;
  font-size: 12px;
  line-height: 1.5;
  padding: 1px 0;
  max-width: 100%;
  border-radius: 4px;
  background: transparent;
  border: none;
  &:focus,
  &:active {
    outline: none;
    border: none;
  }
  ${({ value }) =>
    value.length > 0 &&
    css`
      text-align: center;
      background: var(--shade-300-85);
    `};
  ::placeholder,
  ::-webkit-input-placeholder {
    color: var(--shade-300);
    opacity: 1;
  }
  :-ms-input-placeholder {
    color: var(--shade-300);
    opacity: 1;
  }
`;

const HiddenInputSpan = styled.span`
  position: absolute;
  opacity: 0;
  z-index: -100;
  white-space: pre;
  font-family: Heebo;
  font-size: 12px;
  line-height: 1.5;
`;

const Search = ({
  className,
  hasBorder,
  value,
  placeholder,
  onChange,
  onClear,
  onFocus,
  clearCallback,
}) => {
  const inputRef = useRef(null);
  const spanRef = useRef(null);
  const [width, setWidth] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const location = useLocation();
  const searchRedirect = useMemo(() => location.state, []);

  useEffect(() => {
    if (spanRef?.current?.offsetWidth) {
      setWidth(spanRef.current.offsetWidth);
    }
  }, [value]);

  const onSubmitSearch = useCallback((event) => {
    event.preventDefault();
  }, []);

  const onInputWrapperClick = useCallback(() => {
    if (inputRef?.current) {
      inputRef?.current.focus();
      setIsFocused(true);
    }
  }, []);

  const onInputChange = useCallback(
    (event) => {
      onChange(event.target.value);
      searchRedirect && event.target.value === '' && clearCallback?.();
    },
    [onChange, searchRedirect, clearCallback],
  );

  const onClearInput = useCallback(() => {
    if (onClear) {
      onClear();
      return;
    }
    onChange('');
    searchRedirect && clearCallback?.();
  }, [onChange, onClear, searchRedirect, clearCallback]);

  const onBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  useEffect(() => {
    if (value) {
      onInputWrapperClick();
    }
  }, [onInputWrapperClick, value]);

  return (
    <Form onSubmit={onSubmitSearch}>
      <InputWrapper isFocused={isFocused} hasBorder={hasBorder} className={className} onClick={onInputWrapperClick}>
        <SearchIcon src={searchImage} alt="search-icon" />
        <HiddenInputSpan ref={spanRef}>{value.length > 0 ? value : placeholder}</HiddenInputSpan>
        <Input
          type="text"
          placeholder={placeholder}
          name="title"
          ref={inputRef}
          value={value}
          style={{ width: width + 16 }}
          autoComplete="off"
          onChange={onInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
        />
        {value.length > 0 && <ClearIcon src={clearImage} alt="search-icon" onClick={onClearInput} />}
      </InputWrapper>
    </Form>
  );
};

Search.defaultProps = {
  placeholder: 'Search',
};

export default memo(Search);
