import api from '../../../utils/api';

import { createSlice } from '@reduxjs/toolkit';
import { storyUrls } from '../../../config/urls';
import { pick } from 'lodash';
import { combineStoryAndTemplate } from '../../../utils/templateUtils';
import { loadStory } from '../amp-story/ampStorySlice';
import { replaceTemporaryMediaInStory } from '../media/mediaSlice';

const initialState = {
  isSaveTemplateModalOpen: false,
};

const templatesSlice = createSlice({
  name: 'templates',
  initialState,
  reducers: {
    selectTemplateType: (state, action) => {
      state.templateType = action.payload;
    },
    toggleSaveTemplateModal: (state, action) => {
      state.isSaveTemplateModalOpen = action.payload;
    },
  },
});

export const { selectTemplateType, toggleSaveTemplateModal } = templatesSlice.actions;
export default templatesSlice.reducer;

export const applyTemplate = (template, selectedSlides) => async (
  dispatch,
  getState,
) => {
  dispatch(replaceTemporaryMediaInStory());

  const state = getState();
  const currentAmpStory = state.ampStory.present;
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;

  if (!template) {
    return;
  }

  if (!selectedSlides || selectedSlides?.length === 0) {
    selectedSlides = [...Array(template.cuts?.length).keys()];
  }
  // Get only required fields from template
  const currentTemplate = pick(template, ['cuts', 'fonts', 'storyFonts', 'googleFonts', 'initialHeight']);
  const updatedAmpStory = combineStoryAndTemplate(
    currentAmpStory,
    currentTemplate,
    activeSlidePosition,
    selectedSlides,
  );

  await api.put(storyUrls.updateStoryConfig, {
    ampStory: updatedAmpStory,
  });

  const scale = Number(currentAmpStory.initialHeight) / Number(currentTemplate.initialHeight);
  const zoomPercent = state.helpers.zoomPercent;
  const scaleIndexes = updatedAmpStory?.cuts?.filter((cut) => cut?.isTemplateSlide).map((cut) => cut?.position);

  dispatch(
    loadStory(
      { storyId: currentAmpStory._id, activeSlidePosition, scale: zoomPercent, slideScaling: scale, scaleIndexes },
      false,
      false,
      false,
      true,
    ),
  );
};
