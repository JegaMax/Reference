import { createSlice } from '@reduxjs/toolkit';
import { castDraft } from 'immer';

const initialState = {
  selectedTags: [],
};

const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    setSelectedTags: (state, action) => {
      state.selectedTags = castDraft(action.payload);
    },
    clearSelectedTags: () => {
      return initialState;
    },
  },
});

export const { setSelectedTags, clearSelectedTags } = tagsSlice.actions;
export default tagsSlice.reducer;
