import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { blackRGBA, ctaDimensions, defaultCTAFillLeftColor, defaultCTATextColor } from '../../../../config/constants';
import { useAppSelector, useDidUpdateEffect } from '../../../../hooks';
import { IColorType } from '../../../../interfaces/colors';
import { selectActiveLayer } from '../../../../appredux/features/amp-story/ampStorySlice';
import { toggleEditorLayerMenuVisibility } from '../../../../appredux/features/editor/helpers/helpersSlice';
import { getArrowEventValue } from '../../../../utils/common';
import ColorPicker from '../../../color-picker';
import InputBasic from '../../../shared/input-basic';
import Select from '../../../shared/select';
import ToggleSwitch from '../../../shared/toggle-switch';
import limit from '../../constants/limits';
import EditorSidebarSliderWithInput from '../../shared/editor-sidebar-slider-with-input';
import EditorSidebarLabel from '../../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../../shared/elements/editor-sidebar-section-title';
import EditorSidebarHalfColumn from '../../shared/structure/editor-sidebar-half-column';
import EditorSidebarRowWrapper from '../../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../../shared/structure/editor-sidebar-values-wrapper';

const EditorSidebarCtaSettings = ({
  layer,
  ctaLayerRef,
  handleLayerChange,
  handleBatchLayerChange,
}) => {
  const dispatch = useDispatch();
  const layerScaling = useAppSelector((state) => state.helpers.zoomPercent / 100);
  const editorHeight = useAppSelector((state) => state.ampStory.present.initialHeight);
  const editorWidth = useAppSelector((state) => state.ampStory.present.initialWidth);
  const activeLayer = useAppSelector(selectActiveLayer);
  const isActiveLayerLocked = layer.settings.generalSettings.locked;

  const fontColor = layer.settings?.ctaLayerSettings?.fontColor ?? '#000000';
  const withQueries = layer.settings?.ctaLayerSettings?.withQueries ?? false;
  const thickness = layer.settings.layerSettings.shapeStyles.thickness;
  const round = Number(layer.settings.layerSettings.shapeStyles.round);

  const [link, setLink] = useState(layer.settings?.ctaLayerSettings?.link ?? '');
  const [linkTitle, setLinkTitle] = useState(layer.settings?.ctaLayerSettings?.linkTitle ?? '');
  const [currentFillColor, setCurrentFillColor] = useState(layer.settings.layerSettings.shapeStyles.fillColor);
  const [currentBorderColor, setCurrentBorderColor] = useState(layer.settings.layerSettings.shapeStyles.borderColor);

  useEffect(() => setLink(layer.settings?.ctaLayerSettings?.link ?? ''), [layer.settings?.ctaLayerSettings?.link]);

  useEffect(() => setLinkTitle(layer.settings?.ctaLayerSettings?.linkTitle ?? ''), [
    layer.settings?.ctaLayerSettings?.linkTitle,
  ]);

  useEffect(() => setCurrentFillColor(layer.settings.layerSettings.shapeStyles.fillColor), [
    layer.settings.layerSettings.shapeStyles.fillColor,
  ]);

  useEffect(() => setCurrentBorderColor(layer.settings.layerSettings.shapeStyles.borderColor), [
    layer.settings.layerSettings.shapeStyles.borderColor,
  ]);

  useEffect(() => {
    setCurrentRound(+layer.settings.layerSettings.shapeStyles.round);
  }, [layer.settings.layerSettings.shapeStyles.round]);

  const thicknessOptions = useMemo(() => {
    const options = [];
    for (let iteration = 0; iteration <= limit.thickness; iteration++) {
      options.push(iteration);
    }
    return options.map((option) => ({ name: option, value: option }));
  }, []);

  const [currentThickness, setCurrentThickness] = useState(thickness);
  const [currentRound, setCurrentRound] = useState(round);

  const setLinkData = (field, event) => {
    event.preventDefault();
    event.stopPropagation();

    if (field === 'linkTitle' && event.target.value.length > 30) {
      return;
    }
    if (field === 'linkTitle') {
      setLinkTitle(event.target.value);
    }
    if (field === 'link') {
      setLink(event.target.value);
    }
    handleLayerChange({ field: `settings.ctaLayerSettings[${field}]`, value: event.target.value });
  };

  const setCtaThickness = (newValue) => {
    if (newValue > limit['thickness'] || newValue < -1) {
      return;
    }

    handleBatchLayerChange([
      { field: 'settings.layerSettings.shapeStyles.thickness', value: newValue },
      { field: 'settings.layerSettings.shapeStyles.relativeThickness', value: newValue * layerScaling },
    ]);
  };

  const updateSettings = useCallback(() => {
    const thickness =
      layer.settings.layerSettings.shapeStyles.relativeThickness ?? layer.settings.layerSettings.shapeStyles.thickness;
    const ctaWidth = ctaLayerRef.current?.clientWidth;
    const ctaHeight = ctaLayerRef.current?.clientHeight;
    const newCtaHeight = ctaHeight > ctaDimensions.height * 2 ? ctaHeight - ctaDimensions.height : ctaHeight;
    const newOffsetX = (+editorWidth - (ctaWidth + thickness * 2)) / 2;
    const newOffsetY = +editorHeight - (newCtaHeight + thickness * 2) - +editorHeight * (2 / 100);

    handleBatchLayerChange([
      { field: 'settings.layerSettings.height', value: ctaHeight },
      { field: 'settings.layerSettings.width', value: ctaWidth },
      { field: 'settings.generalSettings.offsetX', value: newOffsetX },
      { field: 'settings.generalSettings.offsetY', value: newOffsetY },
    ]);
  }, [
    ctaLayerRef.current,
    editorHeight,
    editorWidth,
    layer.settings.layerSettings.shapeStyles.thickness,
    layer.settings.layerSettings.shapeStyles.relativeThickness,
  ]);

  useEffect(() => {
    if (
      activeLayer?.settings?.ctaLayerSettings?.linkTitle !== layer?.settings?.ctaLayerSettings?.linkTitle ||
      activeLayer?.settings?.layerSettings?.shapeStyles?.thickness !==
        layer?.settings?.layerSettings?.shapeStyles?.thickness
    ) {
      updateSettings();
      dispatch(toggleEditorLayerMenuVisibility(true));
    }
  }, [dispatch, updateSettings, layer?.settings?.layerSettings?.shapeStyles?.thickness, activeLayer]);

  const setCtaRound = useCallback(
    (newValue) => {
      if (newValue > limit['round'] || newValue < 0) {
        return;
      }

      setCurrentRound(newValue);
      handleLayerChange({ field: 'settings.layerSettings.shapeStyles.round', value: newValue.toString() });
    },
    [handleLayerChange],
  );

  const handleColorChange = (prop, value, type) =>
    handleLayerChange({ field: `settings.layerSettings.shapeStyles[${type}].${prop}`, value });

  const onFontColorChange = (prop, value) =>
    handleLayerChange({ field: 'settings.ctaLayerSettings.fontColor', value });

  const onBorderRadiusChange = (value) => {
    if (isActiveLayerLocked) {
      return;
    }
    setCtaRound(value);
  };

  const onBorderRadiusInputArrowDown = useCallback(
    (event) => {
      if (isActiveLayerLocked) {
        return;
      }
      if (
        (Number(currentRound) === limit.round && event.key === 'ArrowUp') ||
        (Number(currentRound) === 0 && event.key === 'ArrowDown')
      ) {
        return;
      }

      const value = getArrowEventValue(event) + Number(currentRound);
      setCtaRound(value);
    },
    [isActiveLayerLocked, currentRound, setCtaRound],
  );

  const onThicknessChange = (value) => {
    if (isActiveLayerLocked) {
      return;
    }
    setCtaThickness(value);
  };

  const onLinkChange = (event) => {
    if (isActiveLayerLocked) {
      return;
    }
    setLinkData('link', event);
  };

  const onTitleChange = (event) => {
    setLinkData('linkTitle', event);
  };

  const onWithQueriesClick = () =>
    handleLayerChange({ field: 'settings.ctaLayerSettings.withQueries', value: !withQueries });

  const onFillColorChange = (prop, value) => {
    if (isActiveLayerLocked) {
      return;
    }

    setCurrentFillColor((prevFillColor) => {
      return {
        ...prevFillColor,
        [prop]: value,
      };
    });
    handleColorChange(prop, value, IColorType.FillColor);
  };

  const onBorderColorChange = (prop, value) => {
    if (isActiveLayerLocked) {
      return;
    }

    setCurrentBorderColor((prevBorderColor) => {
      return {
        ...prevBorderColor,
        [prop]: value,
      };
    });
    handleColorChange(prop, value, IColorType.BorderColor);
  };

  useDidUpdateEffect(() => {
    setCurrentThickness(thickness);
  }, [thickness]);

  return (
    <>
      <EditorSidebarSectionWrapper>
        <EditorSidebarSectionTitleWrapper>
          <EditorSidebarSectionTitle text={'Button'} />
        </EditorSidebarSectionTitleWrapper>
        <>
          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Link to'} />

            <EditorSidebarValuesWrapper>
              <InputBasic
                isDisabled={isActiveLayerLocked || withQueries}
                value={link}
                placeholder={'https://zazuapp.co/'}
                onChange={onLinkChange}
              />
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Color'} />

            <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
              <ColorPicker
                isWithGradient={true}
                type={currentFillColor.type}
                colorType={IColorType.FillColor}
                isDisabled={isActiveLayerLocked}
                leftColor={currentFillColor.leftColor}
                rightColor={currentFillColor.rightColor}
                defaultLeftColor={defaultCTAFillLeftColor}
                leftColorPercent={currentFillColor.leftColorPercent}
                rightColorPercent={currentFillColor.rightColorPercent}
                handleColorChange={onFillColorChange}
              />
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Radius'} />

            <EditorSidebarSliderWithInput
              isDisabled={isActiveLayerLocked}
              min={0}
              max={limit?.round}
              step={1}
              value={currentRound}
              sign={'%'}
              onChange={onBorderRadiusChange}
              onInputArrowDown={onBorderRadiusInputArrowDown}
            />
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Border'} />

            <EditorSidebarValuesWrapper>
              <EditorSidebarHalfColumn justifyContent="flex-end">
                <ColorPicker
                  defaultLeftColor={blackRGBA}
                  type={currentBorderColor.type}
                  isDisabled={isActiveLayerLocked}
                  colorType={IColorType.BorderColor}
                  leftColor={currentBorderColor.leftColor}
                  rightColor={currentBorderColor.rightColor}
                  leftColorPercent={currentBorderColor.leftColorPercent}
                  rightColorPercent={currentBorderColor.rightColorPercent}
                  handleColorChange={onBorderColorChange}
                />
              </EditorSidebarHalfColumn>
              <EditorSidebarHalfColumn>
                <Select
                  options={thicknessOptions}
                  isDisabled={isActiveLayerLocked}
                  selectOption={currentThickness}
                  onSelect={onThicknessChange}
                />
              </EditorSidebarHalfColumn>
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>
        </>
      </EditorSidebarSectionWrapper>

      <EditorSidebarSectionWrapper>
        <EditorSidebarSectionTitleWrapper>
          <EditorSidebarSectionTitle text={'Text'} />
        </EditorSidebarSectionTitleWrapper>
        <>
          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Title'} />

            <EditorSidebarValuesWrapper>
              <InputBasic isDisabled={isActiveLayerLocked} value={linkTitle} onChange={onTitleChange} />
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Color'} />

            <EditorSidebarValuesWrapper justifyContent={'flex-end'}>
              <ColorPicker
                leftColor={fontColor}
                colorType={IColorType.FillColor}
                isDisabled={isActiveLayerLocked}
                defaultLeftColor={defaultCTATextColor}
                handleColorChange={onFontColorChange}
              />
            </EditorSidebarValuesWrapper>
          </EditorSidebarRowWrapper>

          <EditorSidebarRowWrapper>
            <EditorSidebarLabel text={'Source from URL'} />

            <ToggleSwitch size={'medium'} isOn={withQueries} onClick={onWithQueriesClick} />
          </EditorSidebarRowWrapper>
        </>
      </EditorSidebarSectionWrapper>
    </>
  );
};

export default memo(EditorSidebarCtaSettings);
