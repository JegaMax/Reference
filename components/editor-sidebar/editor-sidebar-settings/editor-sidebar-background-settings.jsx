import { memo, useCallback, useMemo } from 'react';
import { defaultResetBgLeftColor, defaultRightColor } from '../../../config/constants';

import { IColorType } from '../../../interfaces/colors';
import { gradientTypes } from '../../../interfaces/gradient-color';
import { toRGBObject, toRGBString } from '../../../utils/parseColors';
import ColorPicker from '../../color-picker';
import { LINEAR, RADIAL } from '../../color-picker/constants/types';
import EditorSidebarSliderWithInput from '../shared/editor-sidebar-slider-with-input';
import EditorSidebarLabel from '../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../shared/elements/editor-sidebar-section-title';
import EditorSidebarHalfColumn from '../shared/structure/editor-sidebar-half-column';
import EditorSidebarLabelWrapper from '../shared/structure/editor-sidebar-label-wrapper';
import EditorSidebarRowWrapper from '../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../shared/structure/editor-sidebar-values-wrapper';

const EditorSidebarBackgroundSettings = ({
  backgroundColor,
  handleSlideBackgroundColorChange,
}) => {
  const parsedBackgroundLeftColor = useMemo(() => toRGBObject(backgroundColor.leftColor), [backgroundColor.leftColor]);

  const parsedBackgroundRightColor = useMemo(() => toRGBObject(backgroundColor.rightColor), [
    backgroundColor.rightColor,
  ]);

  const colorType = useMemo(() => backgroundColor && backgroundColor?.type, [backgroundColor]);

  const opacity = useMemo(() => {
    if (parsedBackgroundLeftColor && parsedBackgroundLeftColor?.a) {
      return (parsedBackgroundLeftColor.a * 100).toFixed(0);
    }
    return 0;
  }, [parsedBackgroundLeftColor]);

  const handleColorChange = (prop, value) => {
    const newBgColor = {
      ...backgroundColor,
      [prop]: value,
    };
    handleSlideBackgroundColorChange(newBgColor);
  };

  const handleColorReset = () => {
    const newBgColor = {
      ...backgroundColor,
      type: gradientTypes.SOLID,
      leftPercent: 0,
      rightPercent: 100,
      rightColor: defaultRightColor,
      leftColor: defaultResetBgLeftColor,
    };
    handleSlideBackgroundColorChange(newBgColor);
  };

  const onOpacityChange = useCallback(
    (value) => {
      let newBgColor = { ...backgroundColor };
      if (colorType === RADIAL || colorType === LINEAR) {
        const rightColor = toRGBString({ ...parsedBackgroundRightColor, a: value / 100 });
        newBgColor = {
          ...newBgColor,
          rightColor,
        };
      }
      const leftColor = toRGBString({ ...parsedBackgroundLeftColor, a: value / 100 });
      newBgColor = {
        ...newBgColor,
        leftColor,
      };
      handleSlideBackgroundColorChange(newBgColor);
    },
    [
      colorType,
      parsedBackgroundLeftColor,
      backgroundColor,
      parsedBackgroundRightColor,
      handleSlideBackgroundColorChange,
    ],
  );

  const onOpacityInputArrowDown = useCallback(
    (event) => {
      let value = +event.target.value;
      if (event.key === 'ArrowUp') {
        value += 1;
      }
      if (event.key === 'ArrowDown') {
        value -= 1;
      }

      onOpacityChange(value);
    },
    [onOpacityChange],
  );

  return (
    <EditorSidebarSectionWrapper>
      <EditorSidebarSectionTitleWrapper>
        <EditorSidebarSectionTitle text={'Background'} />
      </EditorSidebarSectionTitleWrapper>

      <EditorSidebarRowWrapper>
        <EditorSidebarLabel text={'Color'} />

        <EditorSidebarValuesWrapper>
          <EditorSidebarHalfColumn justifyContent={'flex-end'}>
            {backgroundColor && (
              <ColorPicker
                colorType={IColorType.BgColor}
                isWithGradient={true}
                defaultLeftColor={defaultResetBgLeftColor}
                type={backgroundColor.type}
                leftColor={backgroundColor.leftColor}
                rightColor={backgroundColor.rightColor}
                leftColorPercent={backgroundColor.leftColorPercent}
                rightColorPercent={backgroundColor.rightColorPercent}
                handleColorChange={handleColorChange}
                handleColorReset={handleColorReset}
              />
            )}
          </EditorSidebarHalfColumn>
        </EditorSidebarValuesWrapper>
      </EditorSidebarRowWrapper>

      {backgroundColor && backgroundColor.leftColor !== defaultResetBgLeftColor && (
        <EditorSidebarRowWrapper>
          <EditorSidebarLabelWrapper>
            <EditorSidebarLabel text={'Opacity'} />
          </EditorSidebarLabelWrapper>

          <EditorSidebarSliderWithInput
            min={0}
            max={100}
            step={1}
            value={opacity}
            sign={'%'}
            onChange={onOpacityChange}
            onInputArrowDown={onOpacityInputArrowDown}
          />
        </EditorSidebarRowWrapper>
      )}
    </EditorSidebarSectionWrapper>
  );
};

export default memo(EditorSidebarBackgroundSettings);
