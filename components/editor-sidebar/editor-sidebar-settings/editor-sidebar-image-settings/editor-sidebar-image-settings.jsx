import produce from 'immer';
import { isNil, set } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { getArrowEventValue } from '../../../../utils/common';
import limit from '../../constants/limits';
import EditorSidebarSliderWithInput from '../../shared/editor-sidebar-slider-with-input';
import EditorSidebarLabel from '../../shared/elements/editor-sidebar-label';
import EditorSidebarSectionTitle from '../../shared/elements/editor-sidebar-section-title';
import EditorSidebarRowWrapper from '../../shared/structure/editor-sidebar-row-wrapper';
import EditorSidebarSectionTitleWrapper from '../../shared/structure/editor-sidebar-section-title-wrapper';
import EditorSidebarSectionWrapper from '../../shared/structure/editor-sidebar-section-wrapper';

const EditorSidebarImageSettings = ({
  layer,
  parentLayer,
  handleLayerChange,
}) => {
  const permissionForFullScreen = layer.settings.layerSettings.permissionForFullScreen;
  const isActiveLayerLocked = layer.settings.generalSettings.locked;
  const [currentRadius, setCurrentRadius] = useState(Number(layer.settings.generalSettings.round));

  useEffect(() => setCurrentRadius(Number(layer.settings.generalSettings.round)), [
    layer.settings.generalSettings.round,
  ]);

  const onRadiusChange = useCallback(
    (value) => {
      if (isActiveLayerLocked) {
        return;
      }

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'settings.generalSettings.round', Number(value));
            });

            return nextState;
          }

          return cl;
        });

        handleLayerChange({ field: 'childLayers', value: updatedLayers });
        return;
      }

      handleLayerChange({ field: 'settings.generalSettings.round', value: Number(value) });
    },
    [handleLayerChange, isActiveLayerLocked, layer._id, parentLayer?._id, parentLayer?.childLayers],
  );

  const onRadiusInputArrowDown = useCallback(
    (event) => {
      if (isActiveLayerLocked) {
        return;
      }
      if (
        (Number(currentRadius) === limit.round && event.key === 'ArrowUp') ||
        (Number(currentRadius) === 0 && event.key === 'ArrowDown')
      ) {
        return;
      }

      const value = getArrowEventValue(event) + Number(currentRadius);

      if (!isNil(parentLayer?._id) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'settings.generalSettings.round', value);
            });

            return nextState;
          }

          return cl;
        });

        setCurrentRadius(value);
        handleLayerChange({ field: 'childLayers', value: updatedLayers });
        return;
      }

      setCurrentRadius(value);
      handleLayerChange({ field: 'settings.generalSettings.round', value });
    },
    [currentRadius, handleLayerChange, isActiveLayerLocked, layer._id, parentLayer?._id, parentLayer?.childLayers],
  );

  return (
    <EditorSidebarSectionWrapper>
      <EditorSidebarSectionTitleWrapper>
        <EditorSidebarSectionTitle text={'Image'} />
      </EditorSidebarSectionTitleWrapper>
      <EditorSidebarRowWrapper>
        <EditorSidebarLabel text={'Radius'} />

        <EditorSidebarSliderWithInput
          min={0}
          max={limit.round}
          step={1}
          value={currentRadius}
          sign={'%'}
          isDisabled={permissionForFullScreen || isActiveLayerLocked}
          onChange={onRadiusChange}
          onInputArrowDown={onRadiusInputArrowDown}
        />
      </EditorSidebarRowWrapper>
    </EditorSidebarSectionWrapper>
  );
};

export default memo(EditorSidebarImageSettings);
