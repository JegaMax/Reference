import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { RgbaColorPicker } from 'react-colorful';
import OutsideClickHandler from 'react-outside-click-handler';

import { columnType, defaultBackgroundColor, defaultRightColor } from '../../config/constants';
import { useEyeDropper, useToggle } from '../../hooks';
import { hexToRgb, toRGBObject, toRGBString } from '../../utils/parseColors';
import Select from '../shared/select';
import { colorModeOptions, HEX, HSLA, RGBA } from './constants/colorMode';
import { SOLID } from './constants/types';
import ColorPickerPortal from './portal/color-picker-portal';
import ColorPickerBlock from './shared/color-picker-block';
import ColorInputWrapper from './shared/color-picker-input/color-input-wrapper';
import HexColorInput from './shared/color-picker-input/hex-color-input';
import HslaColorInput from './shared/color-picker-input/hsla-color-input';
import RgbaColorInput from './shared/color-picker-input/rgba-color-input';
import BrandColors from './shared/custom-colors/brand-colors';
import FavouriteColors from './shared/custom-colors/favourite-colors';
import PresetColors from './shared/custom-colors/preset-colors';
import GradientColorPreview from './shared/gradient-picker/gradient-color-preview';
import GradientPickerWrapper from './shared/gradient-picker/gradient-picker-wrapper';
import GradientSlider from './shared/gradient-picker/gradient-slider';
import HeaderNavigation from './shared/header-navigation';
import ResetColor from './shared/reset-color';
import ColorPickerColumn from './shared/structure/color-picker-column';
import ColorPickerOuterWrapper from './shared/structure/color-picker-outer-wrapper';
import ColorPickerWrapper from './shared/structure/color-picker-wrapper';
import ColorTypeSelectWrapper from './shared/structure/color-type-select-wrapper';

const ColorPicker = ({
  colorType,
  isDisabled,
  leftColor,
  type = SOLID,
  size,
  className,
  isPresetHidden,
  isFavoritesHidden,
  isBrandColorsHidden,
  isColorPickerOpen,
  defaultLeftColor,
  leftColorPercent,
  rightColorPercent,
  absoluteRightPosition,
  absoluteTopPosition,
  translateY,
  isWithGradient = false,
  rightColor = defaultRightColor,
  handleColorReset,
  handleColorChange,
  bulletFocused,
  targetSelector,
  onClose,
  zIndex,
  lightenBorder,
}) => {
  const [selectedType, setSelectedType] = useState(type);
  const [activeColor, setActiveColor] = useState('leftColor');
  const [colorMode, setColorMode] = useState(HEX);
  const [selectedColor, setSelectedColor] = useState({
    leftColor: toRGBObject(leftColor),
    rightColor: toRGBObject(rightColor),
  });
  const [selectedLeftColorPercent, setSelectedLeftColorPercent] = useState(leftColorPercent || 0);
  const [selectedRightColorPercent, setSelectedRightColorPercent] = useState(rightColorPercent || 100);
  const [brandColorsSettingsOpen, setBrandColorsSettingsOpen] = useState(false);
  const selectedLeftColorStringified = toRGBString(selectedColor.leftColor);
  const selectedRightColorStringified = toRGBString(selectedColor.rightColor);
  const selectedModeOptionName = useMemo(() => {
    const option = colorModeOptions.find((modeOption) => modeOption.value === colorMode);
    return option?.name || '';
  }, [colorMode]);
  const gradientBackgroundColor = `linear-gradient(90deg, ${selectedLeftColorStringified} ${selectedLeftColorPercent}%, ${selectedRightColorStringified} ${selectedRightColorPercent}%)`;
  const { isShown, toggle, setHide } = useToggle(false);
  const { open, isSupported, close } = useEyeDropper();
  const isNavTabActive = (type) => type === selectedType;

  const isChanged = defaultLeftColor !== leftColor || !isNavTabActive(SOLID);

  useEffect(() => {
    if (!isShown) {
      setSelectedColor({
        leftColor: toRGBObject(leftColor),
        rightColor: toRGBObject(rightColor),
      });
    }
  }, [leftColor, rightColor, isShown]);

  useEffect(() => {
    if (isColorPickerOpen) {
      toggle();
    }
  }, [isColorPickerOpen, toggle]);

  const changeActiveColorPercent = useCallback(
    (percent, newActiveColor) => {
      if (activeColor !== newActiveColor) {
        setActiveColor(newActiveColor);
      }

      handleColorChange(`${newActiveColor}Percent`, percent);
    },
    [activeColor, handleColorChange],
  );

  const handleGradientPercentagesChange = useCallback(
    (values) => {
      if (values[0] !== selectedLeftColorPercent) {
        setSelectedLeftColorPercent(values[0]);
        changeActiveColorPercent(values[0], 'leftColor');
      }

      if (values[1] !== selectedRightColorPercent) {
        setSelectedRightColorPercent(values[1]);
        changeActiveColorPercent(values[1], 'rightColor');
      }
    },
    [changeActiveColorPercent, selectedLeftColorPercent, selectedRightColorPercent],
  );

  const handleColorModeSelect = (mode) => setColorMode(mode);

  const handleNavigationTabChange = useCallback(
    (type) => {
      if (type === SOLID) {
        setActiveColor('leftColor');
      }
      setSelectedType(type);
      handleColorChange('type', type);
    },
    [handleColorChange],
  );

  const changeColor = useCallback(
    (color) => {
      setSelectedColor((currentSelectedColor) => {
        return {
          ...currentSelectedColor,
          [activeColor]: color,
        };
      });
      if (isNaN(color.a)) {
        color.a = 1;
      }
      handleColorChange(activeColor, toRGBString(color));
    },
    [activeColor, handleColorChange],
  );

  const handleSelectedColorChange = useCallback(
    (newColor) => {
      if (activeColor === 'leftColor' && defaultBackgroundColor === leftColor) {
        changeColor({ ...newColor, a: 1 });
        return;
      }
      changeColor(newColor);
    },
    [activeColor, changeColor, leftColor],
  );

  const handleCustomColorSelect = useCallback(
    (color) => {
      let newColor = color;
      if (selectedColor[activeColor]?.a !== 0) {
        newColor = {
          ...newColor,
          a: selectedColor[activeColor]?.a,
        };
      }
      changeColor(newColor);
    },
    [activeColor, changeColor, selectedColor],
  );

  const handleResetColorClick = useCallback(() => {
    setSelectedColor({
      leftColor: toRGBObject(defaultLeftColor),
      rightColor: toRGBObject(defaultRightColor),
    });
    setSelectedType(SOLID);
    setActiveColor('leftColor');
    setSelectedLeftColorPercent(0);
    setSelectedRightColorPercent(100);
    handleColorReset && handleColorReset();
  }, [defaultLeftColor, handleColorReset]);

  const onColorPickerBlockClick = useCallback(() => {
    if (isDisabled) {
      return;
    }
    toggle();
  }, [isDisabled, toggle]);

  const setLeftColor = useCallback(() => setActiveColor('leftColor'), []);
  const setRightColor = useCallback(() => setActiveColor('rightColor'), []);

  const handlePipetteColorChange = async () => {
    if (isSupported()) {
      try {
        const selectedColor = await open();
        const rgbColor = hexToRgb(selectedColor.sRGBHex);
        changeColor(toRGBObject(rgbColor));
      } catch (err) {
        console.error(err);
        close();
      }
    }
  };

  const handleOutsideClick = async () => {
    if (brandColorsSettingsOpen) {
      return;
    }

    if (onClose) {
      await onClose();
    }

    setHide();
  };

  return (
    <ColorPickerOuterWrapper>
      {isChanged && handleColorReset && <ResetColor onClick={handleResetColorClick} />}

      <ColorPickerBlock
        bulletFocused={bulletFocused}
        isPickerOpen={isShown}
        lightenBorder={lightenBorder}
        type={type}
        size={size}
        colorType={colorType}
        color={selectedColor}
        defaultLeftColor={defaultLeftColor}
        leftColorPercent={selectedLeftColorPercent}
        rightColorPercent={selectedRightColorPercent}
        onClick={onColorPickerBlockClick}
      />

      {isShown && (
        <ColorPickerPortal targetSelector={targetSelector || 'color-picker-modal'}>
          <OutsideClickHandler onOutsideClick={handleOutsideClick}>
            <ColorPickerWrapper
              zIndex={zIndex}
              absoluteRightPosition={absoluteRightPosition}
              translateY={translateY}
              absoluteTopPosition={absoluteTopPosition}
              className={className}
            >
              <HeaderNavigation
                activeType={selectedType}
                handleNavigationTabClick={handleNavigationTabChange}
                handlePipetteColorChange={handlePipetteColorChange}
                isEyeDropperSupported={isSupported}
                isWithGradient={isWithGradient}
              />
              {isWithGradient && !isNavTabActive(SOLID) && (
                <>
                  <GradientSlider
                    value={[selectedLeftColorPercent, selectedRightColorPercent]}
                    onChange={handleGradientPercentagesChange}
                    gradientBackgroundColor={gradientBackgroundColor}
                    onLeftHandleClick={setLeftColor}
                    onRightHandleClick={setRightColor}
                  />

                  <GradientPickerWrapper>
                    <GradientColorPreview
                      isActive={activeColor === 'leftColor'}
                      color={selectedLeftColorStringified}
                      onClick={setLeftColor}
                    />
                    <GradientColorPreview
                      isActive={activeColor === 'rightColor'}
                      color={selectedRightColorStringified}
                      onClick={setRightColor}
                    />
                  </GradientPickerWrapper>
                </>
              )}

              <div className="custom-color-picker">
                <RgbaColorPicker color={selectedColor[activeColor]} onChange={handleSelectedColorChange} />
              </div>

              <ColorInputWrapper>
                <ColorTypeSelectWrapper>
                  <Select
                    dropdownWidth="65px"
                    selectOption={selectedModeOptionName}
                    options={colorModeOptions}
                    onSelect={handleColorModeSelect}
                  />
                </ColorTypeSelectWrapper>
                {colorMode === HEX && (
                  <ColorPickerColumn type={columnType.HALF}>
                    <HexColorInput color={selectedColor[activeColor]} handleColorChange={handleSelectedColorChange} />
                  </ColorPickerColumn>
                )}
                {colorMode === RGBA && (
                  <ColorPickerColumn type={columnType.TWO_THIRDS} flexGrow="1">
                    <RgbaColorInput color={selectedColor[activeColor]} handleColorChange={handleSelectedColorChange} />
                  </ColorPickerColumn>
                )}
                {colorMode === HSLA && (
                  <ColorPickerColumn type={columnType.TWO_THIRDS} flexGrow="1">
                    <HslaColorInput color={selectedColor[activeColor]} handleColorChange={handleSelectedColorChange} />
                  </ColorPickerColumn>
                )}
              </ColorInputWrapper>

              {!isBrandColorsHidden ? (
                <BrandColors
                  setBrandColorsSettingsOpen={setBrandColorsSettingsOpen}
                  selectedColor={leftColor}
                  color={selectedColor[activeColor]}
                  handleColorChange={handleCustomColorSelect}
                  brandColorsSettingsOpen={brandColorsSettingsOpen}
                />
              ) : (
                <></>
              )}

              {!isFavoritesHidden ? (
                <FavouriteColors
                  selectedColor={leftColor}
                  color={selectedColor[activeColor]}
                  handleColorChange={handleCustomColorSelect}
                />
              ) : (
                <></>
              )}

              {!isPresetHidden ? (
                <PresetColors selectedColor={leftColor} handleColorChange={handleCustomColorSelect} />
              ) : (
                <></>
              )}
            </ColorPickerWrapper>
          </OutsideClickHandler>
        </ColorPickerPortal>
      )}
    </ColorPickerOuterWrapper>
  );
};

export default memo(ColorPicker);
