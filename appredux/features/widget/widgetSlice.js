import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isCreateWidgetModalOpen: false,
};

const widgetSlice = createSlice({
  name: 'widgets',
  initialState,
  reducers: {
    toggleCreateWidgetModal: (state, action) => {
      state.isCreateWidgetModalOpen = action.payload;
    },
  },
});

export const { toggleCreateWidgetModal } = widgetSlice.actions;
export default widgetSlice.reducer;
