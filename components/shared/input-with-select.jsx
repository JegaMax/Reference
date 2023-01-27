import { useCallback, useEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled, { css } from 'styled-components';
import { useIsContentOverflowing } from '../../hooks';
import ChevronDownIcon from '../icons/chevron-down';

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
  padding: 5.5px 30px 5.5px 12px;
  letter-spacing: 0.01em;
  width: 100%;
  max-width: 100%;
  background: var(--shade-700-85);
  border-radius: 6px;
  border: none;
  border: ${({ isActive }) => (isActive ? '1px solid var(--primary)' : '1px solid transparent')};
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

const SelectDropdownIconWrapper = styled.div`
  transform: translateY(-50%);
  color: ${({ isDisabled }) => (isDisabled ? 'var(--shade-300)' : 'var(--white)')};
  display: flex;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: ${({ isActive }) => (isActive ? 'var(--shade-500-85)' : 'transparent')};
  border-radius: 2px;
  right: 8px;
  transition: 0.12s ease;
  &:hover {
    background: var(--shade-500-85);
  }
  ${({ isDisabled }) => isDisabled && `pointer-events: none;`}
`;

const SelectDropdownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: calc(100% + 8px);
  overflow: hidden;
  ${({ dropdownPosition }) =>
    dropdownPosition === 'left'
      ? css`
          left: 0;
          right: auto;
        `
      : `left: auto; right: 0;`}
  width: ${({ dropdownWidth }) => (dropdownWidth ? dropdownWidth : '100%')};
  max-height: ${({ isLarge, $dropdownHeight }) => ($dropdownHeight ? $dropdownHeight : isLarge ? '360px' : '300px')};
  background: var(--shade-700);
  border: 1px solid var(--shade-500-85);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 6px;
  z-index: ${({ $zIndex }) => ($zIndex ? $zIndex : 1)};
`;

const SelectDropdownContentWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  max-width: 100%;
  overflow: auto;
  margin-top: 12px;
  padding: ${({ isOverflowing }) => (isOverflowing ? '0 9px 10px 12px' : '0 12px 10px')};
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  &:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--shade-300-85) transparent;
  }
  &:hover::-webkit-scrollbar {
    width: 3px;
    border-radius: 2px;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
  }
`;

const SelectOption = styled.div`
  width: 100%;
  flex-basis: 100%;
  font-family: Heebo;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: #ababba;
  padding: 3px 8px;
  border-radius: 6px;
  transition: 0.12s ease;
  cursor: pointer;
  margin-bottom: 4px;
  &:hover {
    background: var(--primary);
    color: #14141f;
  }
  ${({ isSelected }) =>
    isSelected &&
    css`
      background: var(--primary);
      color: #14141f;
    `}
`;

const InputWithSelect = ({
  id,
  className,
  type = 'text',
  name,
  value,
  placeholder,
  isDisabled,
  isReadOnly,
  autoFocus,
  autoComplete,
  dropdownHeight,
  dropdownZIndex,
  dropdownPosition,
  dropdownWidth,
  options,
  hasError,
  onClick,
  onKeyDown,
  onChange,
  onBlur,
  onSelect,
}) => {
  const dropdownRef = useRef(null);
  const selectionRef = useRef(null);
  const isOverflowing = useIsContentOverflowing({ element: dropdownRef.current });
  const inputRef = useRef(null);

  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState(false);

  const onDropdownTriggerClick = useCallback(() => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  }, [isDropdownMenuOpen]);

  const onOutsideSelectClick = useCallback(() => {
    inputRef.current?.blur();
    setIsDropdownMenuOpen(false);
  }, [inputRef]);

  const onOptionSelect = useCallback(
    (option) => () => {
      if (isDisabled) {
        return;
      }
      onSelect(option.value);
      setIsDropdownMenuOpen(false);
    },
    [isDisabled, onSelect],
  );

  const onClickHandler = () => {
    onClick && onClick();
    if (inputRef && inputRef.current) {
      inputRef.current.select();
    }
  };
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.blur();
    }
  }, []);

  useEffect(() => {
    if (dropdownRef.current && selectionRef.current && isDropdownMenuOpen) {
      const innerMenu = dropdownRef.current?.children?.[0];
      const top = selectionRef.current.offsetTop - innerMenu.offsetHeight / 2;

      innerMenu.scroll({ top, behavior: 'auto' });
    }
  }, [isDropdownMenuOpen]);

  return (
    <InputWrapper className={className}>
      <InputElement
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        isDisabled={isDisabled}
        $hasError={hasError}
        isActive={isDropdownMenuOpen}
        {...(isReadOnly ? { defaultValue: value } : { value })}
        isReadOnly={isReadOnly}
        readOnly={isReadOnly}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        onClick={onClickHandler}
        onKeyDown={onKeyDown}
        onChange={onChange}
        onBlur={onBlur}
        ref={inputRef}
      />

      <OutsideClickHandler onOutsideClick={onOutsideSelectClick}>
        <SelectDropdownIconWrapper
          isActive={isDropdownMenuOpen}
          isDisabled={isDisabled}
          onClick={onDropdownTriggerClick}
        >
          <ChevronDownIcon />
        </SelectDropdownIconWrapper>

        {isDropdownMenuOpen && (
          <SelectDropdownWrapper
            $dropdownHeight={dropdownHeight}
            dropdownWidth={dropdownWidth}
            dropdownPosition={dropdownPosition}
            $zIndex={dropdownZIndex}
            ref={dropdownRef}
          >
            <SelectDropdownContentWrapper isOverflowing={isOverflowing}>
              {options.map((option) => (
                <SelectOption
                  key={option.name}
                  isSelected={value.toString() === option.name?.toString()}
                  onClick={onOptionSelect(option)}
                  {...(value.toString() === option.name?.toString() ? { ref: selectionRef } : {})}
                >
                  {option.name}
                </SelectOption>
              ))}
            </SelectDropdownContentWrapper>
          </SelectDropdownWrapper>
        )}
      </OutsideClickHandler>
    </InputWrapper>
  );
};

export default InputWithSelect;
