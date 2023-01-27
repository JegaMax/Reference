import { useAppSelector } from 'hooks';
import { layerTypes } from 'interfaces/layer-types';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import presets from '../constants/editor-modal-swipe-up-presets';
import SwipeUp from './swipe-up';

import {
  createNewLayer,
  deleteLayer,
  selectSingleUseLayer,
  setActiveLayerPropsArray
} from 'appredux/features/amp-story/ampStorySlice';

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
  gap: 12px;
  jsutify-content: space-between;
  align-items: start;
  padding: 10px 22px 22px 22px;
  max-height: 235px;
`;

// const UploadedIconWrapper = styled.div`
//   width: 1.5em;
//   height: 1.5em;
//   border-radius: 50%;
//   overflow: hidden;
//   margin-right: 0.5em;
// `;

// const UploadedIcon = styled.img`
//   object-fit: cover;
//   width: 100%;
//   height: 100%;
// `;

const WidgetEditorSwipeUpPresets = () => {
  const dispatch = useDispatch();
  const currentSingleUseLayer = useAppSelector(selectSingleUseLayer);
  const activeSlidePosition = useAppSelector((state) => state.ampStory.present.activeSlidePosition);

  const onSelectPreset = async (currentPreset) => {
    if (currentPreset) {
      if (currentSingleUseLayer) {
        dispatch(
          deleteLayer({
            slidePosition: activeSlidePosition,
            layerPositions: [currentSingleUseLayer.position],
          }),
        );
      }

      dispatch(createNewLayer({ type: layerTypes.OUTLINK }));
      const updates = [
        {
          field: 'settings.ctaLayerSettings.linkTitle',
          value: 'Swipe up',
        },
        {
          field: 'settings.ctaLayerSettings.fontColor',
          value: currentPreset.config.color,
        },
        {
          field: 'settings.layerSettings.shapeStyles.fillColor.leftColor',
          value: currentPreset.config.background,
        },
      ];

      // if (currentPreset?.config?.logo) {
      //   updates.push(
      //     {
      //       field: 'content.image.url',
      //       value: currentPreset.config.logo,
      //     },
      //     {
      //       field: 'content.image.name',
      //       value: 'logo',
      //     },
      //     {
      //       field: 'content.image.id',
      //       value: generateId(),
      //     },
      //   );
      // }

      dispatch(setActiveLayerPropsArray(updates));
    }
  };

  return (
    <>
      <StyledLabelWrapper>
        <StyledLabel>Swipe Up</StyledLabel>
      </StyledLabelWrapper>
      <PresetsWrapper>
        {presets.map((preset) => (
          <SwipeUp key={preset.id} preset={preset} onSelectPreset={onSelectPreset} />
        ))}
      </PresetsWrapper>
    </>
  );
};

export default memo(WidgetEditorSwipeUpPresets);
