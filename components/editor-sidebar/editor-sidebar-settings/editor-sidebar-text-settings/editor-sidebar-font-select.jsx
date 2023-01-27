import { useAppDispatch, useAppSelector } from 'hooks';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import OutsideClickHandler from 'react-outside-click-handler';
import { setLoadedFontsCount } from 'appredux/features/editor/helpers/helpersSlice';
import styled from 'styled-components';
import Search from '../../../shared/search';
import SelectStyled from './../../../shared/select-styled';
import FontOption from './font-option/font-option';

const SelectDropdownInnerContentWrapper = styled(InfiniteScroll)`
  display: flex;
  flex-flow: row wrap;
  flex: 1;
  max-width: 100%;
  overflow-x: hidden;
`;

const SearchWrapper = styled.div`
  padding: 12px 12px 0;
`;

const StyledSearch = styled(Search)`
  background: var(--shade-500);
`;

const StyledSelectDropdownWrapper = styled(SelectStyled.SelectDropdownWrapper)`
  display: block;
  z-index: ${({ isOpen }) => (isOpen ? 1 : -10)};
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  pointer-events: ${({ isOpen }) => (isOpen ? 'auto' : 'none')};
`;

const SelectDropdownContentWrapper = styled(SelectStyled.SelectDropdownContentWrapper)`
  height: 272px;
  flex: 0;
`;

const EditorSidebarFontSelect = ({
  isDisabled,
  selectOption,
  optionsObject,
  placeholder,
  onSelect,
  searchValue,
  onSearchChange,
  widgetScrollIdentifier,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useAppDispatch();
  const loadedFontsNumber = useAppSelector((state) => state.helpers.loadedFontsCount);
  const optionsObjectKeys = Object.keys(optionsObject);
  const normalizedOptions = useMemo(
    () =>
      optionsObjectKeys.map((key) => {
        if (key === 'google') {
          return optionsObject[key]?.options?.slice(0, loadedFontsNumber);
        }
        return optionsObject[key]?.options;
      }),
    [optionsObject, optionsObjectKeys, loadedFontsNumber],
  );

  const optionsTitle = useMemo(
    () =>
      optionsObjectKeys.map((key) => {
        const title = optionsObject[key]?.title;
        if (title) {
          return title;
        }
        return '';
      }),
    [optionsObject, optionsObjectKeys],
  );

  const onScrollEnd = useCallback(async () => {
    dispatch(setLoadedFontsCount(loadedFontsNumber + 5));
  }, [loadedFontsNumber, dispatch]);

  const onOpenDropdown = () => {
    if (isDisabled) {
      return;
    }
    setIsDropdownOpen(!isDropdownOpen);
  };

  const onSelectFont = useCallback(
    (font) => () => {
      onSelect(font.value);
      setIsDropdownOpen(false);
    },
    [onSelect],
  );

  return (
    <SelectStyled.SelectWrapper>
      <OutsideClickHandler onOutsideClick={() => setIsDropdownOpen(false)}>
        <SelectStyled.SelectDropdownTrigger isDisabled={isDisabled} isFocused={isDropdownOpen} onClick={onOpenDropdown}>
          <SelectStyled.SelectDropdownTriggerValue fontFamily={selectOption}>
            {selectOption}
          </SelectStyled.SelectDropdownTriggerValue>
          <SelectStyled.SelectDropdownIcon />
        </SelectStyled.SelectDropdownTrigger>

        <StyledSelectDropdownWrapper isOpen={isDropdownOpen} isLarge ref={dropdownRef}>
          <SearchWrapper>
            <StyledSearch placeholder={placeholder} value={searchValue} onChange={onSearchChange} />
          </SearchWrapper>
          <SelectDropdownContentWrapper
            id={widgetScrollIdentifier ? `scrollableDiv-${widgetScrollIdentifier}` : 'scrollableDiv'}
          >
            <SelectDropdownInnerContentWrapper
              next={onScrollEnd}
              hasMore={true}
              loader={<></>}
              dataLength={loadedFontsNumber}
              scrollableTarget={widgetScrollIdentifier ? `scrollableDiv-${widgetScrollIdentifier}` : 'scrollableDiv'}
            >
              {normalizedOptions?.map((option, index) => {
                if (option?.length > 0) {
                  const title = optionsTitle[index];
                  return (
                    <SelectStyled.OptionSection key={`section-${index}`}>
                      {title.length > 0 && <SelectStyled.OptionSectionTitle>{title}</SelectStyled.OptionSectionTitle>}
                      {option.map((subOption, innerIndex) => {
                        return (
                          <FontOption
                            key={`font-option-${subOption.name}-${innerIndex}`}
                            font={subOption}
                            isSelected={selectOption === subOption.name}
                            onClick={onSelectFont(subOption)}
                          />
                        );
                      })}
                    </SelectStyled.OptionSection>
                  );
                }
              })}
            </SelectDropdownInnerContentWrapper>
          </SelectDropdownContentWrapper>
        </StyledSelectDropdownWrapper>
      </OutsideClickHandler>
    </SelectStyled.SelectWrapper>
  );
};

export default memo(EditorSidebarFontSelect);
