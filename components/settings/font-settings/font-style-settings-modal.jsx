import EditorSidebarFontSelect from 'components/editor-sidebar/editor-sidebar-settings/editor-sidebar-text-settings/editor-sidebar-font-select';
import useWorkspaceFonts from 'components/editor-sidebar/editor-sidebar-settings/editor-sidebar-text-settings/shared/useWorkspaceFonts';
import EditorSidebarButtonWithIcon from 'components/editor-sidebar/shared/elements/editor-sidebar-button-with-icon';
import EditorSidebarLabel from 'components/editor-sidebar/shared/elements/editor-sidebar-label';
import EditorSidebarButtonWrapper from 'components/editor-sidebar/shared/structure/editor-sidebar-button-wrapper';
import EditorSidebarValuesWrapper from 'components/editor-sidebar/shared/structure/editor-sidebar-values-wrapper';
import { Bold, Italic, Underline } from 'components/icons';
import InputWithSelect from 'components/shared/input-with-select';
import Select from 'components/shared/select';
import { defaultFontWeightConfig, fontSizes } from 'config/constants';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { defaultFontWeights } from 'utils/fontUtils';
import { getFontWeights } from 'utils/textEditorUtils';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  padding: 24px;
  position: absolute;
  top: 4px;
  right: -275px;
  background: var(--shade-900);
  border: 2px solid var(--shade-700-85);
  border-radius: 12px;
  max-width: 263px;
`;

const StyledLabel = styled.div`
  color: var(--white);
  width: 100%;
  text-align: left;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 21px;
`;

const StyledRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  width: 100%;
  margin: 7px 0;
`;

const StyledRowLabel = styled.div`
  display: flex;
  align-items: center;
  color: var(--shade-100);
  font-family: Heebo;
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

const StyledDropdownWrapper = styled.div`
  width: 152px;
`;

const StyledDropdownSizeWrapper = styled.div`
  width: 72px;
`;

const Label = styled.span``;

const StyledStylesWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const FontStyleSettingsModal = ({
  title,
  isOpen,
  font,
  selectedWeight,
  selectedSize,
  activeInlineStyles,
  isWorkspaceAdmin,
  handleFontFamilySelect,
  handleFontWeightSelect,
  handleFontSizeChange,
  handleInlineStyleChange,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [fontSize, setFontSize] = useState(selectedSize ?? 0);

  const filteredFonts = useWorkspaceFonts(searchTerm);
  const fontWeights = useMemo(() => {
    if (font) {
      return getFontWeights(font.weight);
    }

    return defaultFontWeights;
  }, [font]);

  const activeFontWeight = useMemo(() => defaultFontWeightConfig[Number(selectedWeight)], [selectedWeight]);

  const fontSizesOptions = useMemo(
    () =>
      fontSizes.map((fontSize) => ({
        name: fontSize,
        value: fontSize,
      })),
    [],
  );

  const { isBold, isItalic, isUnderline } = useMemo(
    () => ({
      isBold: activeInlineStyles?.includes('bold'),
      isItalic: activeInlineStyles?.includes('italic'),
      isUnderline: activeInlineStyles?.includes('underline'),
    }),
    [activeInlineStyles],
  );

  const onFontSizeChange = useCallback((event) => {
    let valueString = event.target.value;

    if (valueString.length > 1 && valueString[0] === '0') {
      valueString = valueString.substr(1, valueString.length - 1);
    }

    if (/^\d*\.?\d*$/.test(valueString) && event) {
      setFontSize(+valueString);
    }
  }, []);
  const onFontSizeUpdate = useCallback(
    (option) => {
      const value = parseFloat(fontSize.toString());
      const newTextSize = value < 5 ? 5 : value > 300 ? 300 : value;
      const selectedTextSize = Math.round(typeof option === 'number' ? option : newTextSize);

      if (selectedTextSize !== selectedSize) {
        setFontSize(selectedTextSize);
        handleFontSizeChange(selectedTextSize);
      }
    },
    [fontSize, selectedSize, handleFontSizeChange],
  );
  const onFontSizeKeyDown = useCallback(
    (event) => {
      event.stopPropagation();
      let value = parseFloat((event.target)?.value);
      value = Number.isNaN(value) ? fontSize ?? 5 : Math.round(value);

      if (event.code === 'ArrowUp') {
        const stylesValue = value + 1 > 300 ? 300 : value + 1;
        setFontSize(+stylesValue);
        return;
      }

      if (event.code === 'ArrowDown') {
        const stylesValue = value - 1 < 5 ? 5 : value - 1;
        setFontSize(+stylesValue);
        return;
      }

      if (event.code === 'Enter') {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }
    },
    [fontSize],
  );

  useEffect(() => {
    if (selectedSize) {
      setFontSize(+selectedSize);
    }
  }, [selectedSize]);

  if (isOpen) {
    return (
      <Wrapper>
        <StyledLabel>
          Select <Label>{title}</Label> style
        </StyledLabel>
        <StyledRow>
          <StyledRowLabel>Font</StyledRowLabel>
          <StyledDropdownWrapper>
            <EditorSidebarFontSelect
              isDisabled={!isWorkspaceAdmin}
              searchValue={searchTerm}
              selectOption={font?.family ?? ''}
              optionsObject={filteredFonts }
              onSearchChange={setSearchTerm}
              onSelect={handleFontFamilySelect}
            />
          </StyledDropdownWrapper>
        </StyledRow>
        <StyledRow>
          <StyledRowLabel>Weight</StyledRowLabel>
          <StyledDropdownWrapper>
            <Select
              isDisabled={!isWorkspaceAdmin}
              selectOption={activeFontWeight}
              options={fontWeights}
              onSelect={handleFontWeightSelect}
            />
          </StyledDropdownWrapper>
        </StyledRow>
        <StyledRow>
          <StyledRowLabel>Size</StyledRowLabel>
          <StyledDropdownSizeWrapper>
            <InputWithSelect
              isDisabled={!isWorkspaceAdmin}
              value={fontSize}
              options={fontSizesOptions}
              onChange={onFontSizeChange}
              onSelect={onFontSizeUpdate}
              onKeyDown={onFontSizeKeyDown}
              onBlur={onFontSizeUpdate}
            />
          </StyledDropdownSizeWrapper>
        </StyledRow>
        <StyledRow>
          <StyledStylesWrapper>
            <EditorSidebarLabel text={'Style'} />

            <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
              <EditorSidebarButtonWrapper>
                <EditorSidebarButtonWithIcon
                  isDisabled={!isWorkspaceAdmin}
                  isActive={isBold}
                  onClick={() => handleInlineStyleChange('bold')}
                >
                  <Bold />
                </EditorSidebarButtonWithIcon>
              </EditorSidebarButtonWrapper>

              <EditorSidebarButtonWrapper>
                <EditorSidebarButtonWithIcon
                  isDisabled={!isWorkspaceAdmin}
                  isActive={isItalic}
                  onClick={() => handleInlineStyleChange('italic')}
                >
                  <Italic />
                </EditorSidebarButtonWithIcon>
              </EditorSidebarButtonWrapper>

              <EditorSidebarButtonWrapper>
                <EditorSidebarButtonWithIcon
                  isDisabled={!isWorkspaceAdmin}
                  isActive={isUnderline}
                  onClick={() => handleInlineStyleChange('underline')}
                >
                  <Underline />
                </EditorSidebarButtonWithIcon>
              </EditorSidebarButtonWrapper>
            </EditorSidebarValuesWrapper>
          </StyledStylesWrapper>
        </StyledRow>
      </Wrapper>
    );
  }

  return null;
};

export default FontStyleSettingsModal;
