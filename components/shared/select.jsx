import { Fragment, memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import styled, { css } from 'styled-components';
import { useIsContentOverflowing } from '../../hooks';
import ChevronDownIcon from '../icons/chevron-down';
import Divider from './divider';

const typedMemo = memo;

const SelectWrapper = styled.div`
  width: 100%;
  position: relative;
`;

const SelectDropdownIcon = styled(ChevronDownIcon)`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  color: var(--white);
`;

const SelectDropdownTriggerValue = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--white);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const SelectDropdownTrigger = styled.div`
  background: var(--shade-700-85);
  border: ${({ isFocused }) => (isFocused ? '1px solid var(--shade-300-85);' : '1px solid transparent')};
  border-radius: 6px;
  padding: 7px 24px 7px 12px;
  cursor: pointer;
  min-height: 34px;
  &:hover,
  &:focus {
    border: 1px solid var(--shade-300-85);
  }
  ${({ styles }) => styles}
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
      & ${SelectDropdownIcon} {
        color: var(--shade-300);
      }
      & ${SelectDropdownTriggerValue} {
        color: var(--shade-300);
      }
    `}
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
  font-family: Heebo;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  width: ${({ dropdownWidth, widestOptionWidth, shouldExpandToWidestOption }) => {
    if (shouldExpandToWidestOption && widestOptionWidth) {
      return `${widestOptionWidth + 24}px`;
    } else {
      return dropdownWidth ? dropdownWidth : '100%';
    }
  }};
  ${({ maxDropdownWidthPX }) =>
    maxDropdownWidthPX &&
    css`
      max-width: ${maxDropdownWidthPX}px;
    `}
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
  font-family: ${(props) => (props.fontFamily ? props.fontFamily : 'Heebo')};
  font-size: ${(props) => (props.fontSize ? `${props.fontSize}px` : '12px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '')};
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  padding: 3px 8px;
  border-radius: 6px;
  transition: 0.12s ease;
  cursor: pointer;
  margin-bottom: 4px;
  ${({ optionEllipsis, widestOptionWidth, maxDropdownWidthPX }) => {
    if (
      optionEllipsis ||
      (widestOptionWidth !== undefined &&
        maxDropdownWidthPX !== undefined &&
        maxDropdownWidthPX - widestOptionWidth < 0)
    ) {
      return css`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      `;
    }
  }}
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

const Select = ({
  id,
  dropdownHeight,
  dropdownZIndex,
  dropdownPosition,
  dropdownWidth,
  maxDropdownWidthPX,
  dropdownTriggerStyles,
  isDisabled,
  selectOption,
  selectOptionId,
  options,
  onSelect,
  optionEllipsis,
  shouldExpandToWidestOption,
  children,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const innerDropdownRef = useRef(null);
  const selectionRef = useRef(null);
  const isOverflowing = useIsContentOverflowing({ element: dropdownRef.current });
  const [widestOptionWidth, setWidestOptionWidth] = useState(-1);

  const onOpenDropdown = () => {
    if (isDisabled || !options.length) {
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  useLayoutEffect(() => {
    if (shouldExpandToWidestOption && innerDropdownRef.current && isDropdownOpen && widestOptionWidth === -1) {
      setWidestOptionWidth(innerDropdownRef.current?.scrollWidth);
    }
  }, [shouldExpandToWidestOption, isDropdownOpen, widestOptionWidth]);

  useEffect(() => {
    if (innerDropdownRef.current && selectionRef.current && isDropdownOpen) {
      const top = selectionRef.current.offsetTop - innerDropdownRef.current.offsetHeight / 2;

      innerDropdownRef.current.scroll({ top, behavior: 'auto' });
    }
  }, [isDropdownOpen]);

  return (
    <SelectWrapper>
      <OutsideClickHandler onOutsideClick={() => setIsDropdownOpen(false)}>
        <SelectDropdownTrigger
          styles={dropdownTriggerStyles}
          isDisabled={isDisabled}
          isFocused={isDropdownOpen}
          onClick={onOpenDropdown}
          className={isDropdownOpen ? 'select-trigger active' : 'select-trigger'}
        >
          <SelectDropdownTriggerValue>{selectOption}</SelectDropdownTriggerValue>
          <SelectDropdownIcon />
        </SelectDropdownTrigger>

        {isDropdownOpen && (
          <SelectDropdownWrapper
            $dropdownHeight={dropdownHeight}
            dropdownWidth={dropdownWidth}
            maxDropdownWidthPX={maxDropdownWidthPX}
            widestOptionWidth={widestOptionWidth}
            shouldExpandToWidestOption={shouldExpandToWidestOption}
            dropdownPosition={dropdownPosition}
            $zIndex={dropdownZIndex}
            isLarge={Boolean(children)}
            ref={dropdownRef}
          >
            <SelectDropdownContentWrapper isOverflowing={isOverflowing} ref={innerDropdownRef}>
              {options.map((option, index) => {
                const dropdownOptionId = (option.value);

                return (
                  <Fragment key={`${option?.value} - ${index}`}>
                    {option.topDivider && <Divider outerMargin={24} />}
                    <SelectOption
                      key={option.name}
                      optionEllipsis={optionEllipsis}
                      maxDropdownWidthPX={maxDropdownWidthPX}
                      widestOptionWidth={widestOptionWidth}
                      isSelected={
                        selectOptionId ? selectOptionId === dropdownOptionId.toString() : selectOption === option.name
                      }
                      {...(selectOption === option.name ? { ref: selectionRef } : {})}
                      fontFamily={option.fontFamily}
                      fontSize={option.fontSize}
                      fontWeight={option.fontWeight}
                      onClick={() => {
                        onSelect(option.value);
                        setIsDropdownOpen(false);
                      }}
                    >
                      {option.name}
                    </SelectOption>
                    {option.bottomDivider && <Divider outerMargin={24} />}
                  </Fragment>
                );
              })}
            </SelectDropdownContentWrapper>
            {children}
          </SelectDropdownWrapper>
        )}
      </OutsideClickHandler>
    </SelectWrapper>
  );
};

Select.defaultProps = {
  dropdownPosition: 'left',
};

export default typedMemo(Select);
