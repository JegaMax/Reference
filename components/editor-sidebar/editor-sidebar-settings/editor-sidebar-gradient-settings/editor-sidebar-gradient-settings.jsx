import produce from 'immer';
import { isNil, set } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { IColorType } from '../../../../interfaces/colors';
import { hexToRgb, rgbaToHexa } from '../../../../utils/parseColors';
import ColorPicker from '../../../color-picker';
import EditorSidebarLabel from '../../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../../shared/elements/editor-sidebar-section-title';
import EditorSidebarHalfColumn from '../../shared/structure/editor-sidebar-half-column';
import EditorSidebarRowWrapper from '../../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../../shared/structure/editor-sidebar-section-wrapper';
import EditorSidebarValuesWrapper from '../../shared/structure/editor-sidebar-values-wrapper';

const EditorSidebarGradientSettings = ({ layer, parentLayer, handleBatchLayerChange }) => {
  const [gradientSvgColors, setGradientSvgColors] = useState(layer?.content?.gradient?.colors);

  const handleColorChange = useCallback(
    (el) => (_, c) => {
      const newColor = rgbaToHexa(c.toString());

      const newColors = produce(gradientSvgColors, (draftState) => {
        set(draftState, `${el}.color`, newColor);
      });

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, `content.gradient.colors`, newColors);
            });

            return nextState;
          }

          return cl;
        });

        setGradientSvgColors(newColors);
        handleBatchLayerChange([{ field: `childLayers`, value: updatedLayers }]);
        return;
      }

      setGradientSvgColors(newColors);
      handleBatchLayerChange([{ field: 'content.gradient.colors', value: newColors }]);
    },
    [gradientSvgColors, handleBatchLayerChange, layer._id, parentLayer?._id, parentLayer?.childLayers],
  );

  useEffect(() => {
    setGradientSvgColors(layer?.content?.gradient?.colors);
  }, [layer?.content?.gradient?.colors]);

  return (
    <EditorSidebarSectionWrapper>
      <EditorSidebarSectionTitleWrapper>
        <EditorSidebarSectionTitle text={'Gradient'} />
      </EditorSidebarSectionTitleWrapper>
      <EditorSidebarRowWrapper alignItems={'flex-start'}>
        <EditorSidebarLabel text={'Color'} paddingTop={'6px'} />

        <EditorSidebarValuesWrapper>
          <EditorSidebarHalfColumn justifyContent={'flex-end'} flexWrap={'wrap'} width={'auto'}>
            {Object.keys(gradientSvgColors ?? {})?.map((el, index) => {
              return (
                <ColorPicker
                  key={index}
                  isDisabled={layer?.settings.generalSettings.locked}
                  colorType={IColorType.FillColor}
                  leftColor={hexToRgb(gradientSvgColors?.[el]?.color ?? '')}
                  defaultLeftColor={hexToRgb(gradientSvgColors?.[el]?.color ?? '')}
                  handleColorChange={handleColorChange(el)}
                />
              );
            })}
          </EditorSidebarHalfColumn>
        </EditorSidebarValuesWrapper>
      </EditorSidebarRowWrapper>
    </EditorSidebarSectionWrapper>
  );
};

export default memo(EditorSidebarGradientSettings);
