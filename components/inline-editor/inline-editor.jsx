import isNil from 'lodash/isNil';
import { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const OverflowSection = styled.section`
  min-width: 0;
  max-width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InlineEditorContainer = styled.div`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const InlineInput = styled.input`
  background: transparent;
  border: none;
  box-shadow: unset;
  outline: none;
  min-width: 100px;
  color: ${(props) => props.color};

  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  padding-left: 0;
  padding-right: 0;

  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
`;

const InlineEditor = ({
  value,
  onChange,
  onKeyDown,
  onBlurCallback,
  color = '#fff',
  open,
  setOpen,
  name,
  type,
  placeholder,
  limits,
  className,
  isCurrentTargetTextSelected,
  setCurrentTargetTextSelected,
}) => {
  const childRef = useRef(null);
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && (isEditing === true || open === true)) {
      childRef?.current?.focus();
    }
  }, [isEditing, childRef, open]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ['Escape', 'Tab'];
    const enterKey = 'Enter';
    const allKeys = [...keys, enterKey];
    if ((type === 'textarea' && keys.indexOf(key) > -1) || (type !== 'textarea' && allKeys.indexOf(key) > -1)) {
      if (!isNil(setOpen) && !isNil(open)) {
        onBlur();
        return setOpen(false);
      }
      onBlur();
      setEditing(false);
    }

    onKeyDown && onKeyDown(event);
  };

  const onPaste = (event) => {
    const clipboardData = event.clipboardData.getData('Text');
    const clipboardNumber = Number(clipboardData);

    if (typeof clipboardData === 'number' && !isNaN(clipboardNumber) && limits) {
      setTimeout(() => {
        if (Number(`${value}${clipboardNumber}`) > limits.upperBound) {
          return onChange(limits.upperBound);
        }
        if (Number(`${value}${clipboardNumber}`) < limits.lowerBound) {
          return onChange(limits.lowerBound);
        }
      });
    }
  };

  const onBlur = () => {
    if (!isNil(limits) && typeof value === 'number') {
      if (value < limits.lowerBound) {
        onChange(limits.lowerBound);
      }
      if (value > limits.upperBound) {
        onChange(limits.upperBound);
      }
      if (value >= limits.lowerBound && value <= limits.upperBound) {
        onChange(value);
      }
    }

    if (onBlurCallback) {
      onBlurCallback();
    }

    if (!isNil(setOpen) && !isNil(open)) {
      return setOpen(false);
    }

    setEditing(false);
  };

  const onClick = () => {
    if (setCurrentTargetTextSelected && isCurrentTargetTextSelected) {
      setCurrentTargetTextSelected(false);
    }

    if (!isNil(setOpen) && !isNil(open)) {
      return setOpen(true);
    }
    setEditing(true);
  };

  const onInputChange = (event) => {
    if (typeof value === 'number' && isNaN(+event.target.value) && limits) {
      return onChange(value);
    }
    if (isNaN(value) && limits) {
      return onChange(limits.upperBound);
    }
    if (typeof value === 'number' && limits && limits.upperBound < +event.target.value) {
      return onChange(limits.upperBound);
    }
    if (typeof value === 'number') {
      return onChange(+event.target.value);
    }

    onChange(event.target.value);
  };

  return (
    <OverflowSection className={className}>
      {isEditing || open ? (
        <div onBlur={onBlur} onKeyDown={(e) => handleKeyDown(e, type)}>
          <InlineInput
            name={name}
            ref={childRef}
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={onInputChange}
            size={value?.toString()?.length > 0 ? value?.toString()?.length : 1}
            color={color}
            onPaste={onPaste}
            onFocus={isCurrentTargetTextSelected ? (e) => e.currentTarget.select() : undefined}
          />
        </div>
      ) : (
        <InlineEditorContainer onClick={onClick}>
          <span>{value || placeholder || 'Editable content'}</span>
        </InlineEditorContainer>
      )}
    </OverflowSection>
  );
};

export default memo(InlineEditor);
