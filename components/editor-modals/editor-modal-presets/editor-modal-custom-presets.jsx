import { cloneDeep } from 'lodash';
import { memo, useEffect } from 'react';
import { batch, useDispatch } from 'react-redux';
import { addGoogleFont } from 'appredux/features/amp-story/ampStorySlice';
import { toggleGroupLayer } from 'appredux/features/editor/helpers/groupLayerHelperSlice';
import { pasteLayer, setLayerCopies, setLayerCopyCounter } from 'appredux/features/editor/helpers/helpersSlice';
import { useGoogleFontsListQuery } from 'appredux/services/fonts/fonts';
import styled from 'styled-components';
import { normalizeLayers } from 'utils/editorUtils';
import { loadFonts } from 'utils/textEditorUtils';
import presets from '../constants/editor-modal-custom-presets';
import Preset from './preset';

const StyledLabelWrapper = styled.div`
  border: 1px solid var(--shade-500);
  margin-top: 10px;
  position: relative;
  margin-bottom: 18px;
`;

const StyledLabel = styled.span`
  font-size: 12px;
  font-family: Heebo;
  color: var(--shade-100);
  position: absolute;
  background-color: var(--shade-800);
  padding: 0 7px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PresetsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 34px 12px;
  justify-content: space-between;
  align-items: start;
  padding: 10px 22px 22px 22px;
  max-height: 235px;
`;

const WidgetEditorCustomPresets = () => {
  const dispatch = useDispatch();
  const { data: googleFonts, isLoading, isSuccess } = useGoogleFontsListQuery();

  const onSelectPreset = (index) => () => {
    const currentPreset = presets[index];

    if (currentPreset.layer) {
      const layer = cloneDeep(currentPreset.layer);
      const slide = {
        layers: [layer],
      };
      const selectedFont = googleFonts?.find((gf) => gf.family === currentPreset?.styles?.fontFamily);

      const normalizedSlide = normalizeLayers(slide);
      batch(() => {
        dispatch(setLayerCopies({ layerCopies: normalizedSlide.layers, zoomPercent: 100 }));
        dispatch(setLayerCopyCounter(0));
      });
      batch(() => {
        dispatch(pasteLayer(true));
        dispatch(toggleGroupLayer(true));
        dispatch(
          addGoogleFont({
            ...selectedFont,
            style: 'normal',
          }),
        );
      });

      setTimeout(() => {
        document.getElementById('link-input')?.focus();
      });
    }
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      const families = presets.map((preset) => preset?.styles?.fontFamily);
      const fonts = googleFonts?.filter((gf) => families.includes(gf.family));

      if (fonts && fonts?.length > 0) {
        loadFonts(fonts);
      }
    }
  }, [googleFonts, isLoading, isSuccess]);

  return (
    <>
      <StyledLabelWrapper>
        <StyledLabel>Custom</StyledLabel>
      </StyledLabelWrapper>
      <PresetsWrapper>
        {presets.map((preset, index) => (
          <Preset key={preset.id} preset={preset} onClick={onSelectPreset(index)} />
        ))}
      </PresetsWrapper>
    </>
  );
};

export default memo(WidgetEditorCustomPresets);
