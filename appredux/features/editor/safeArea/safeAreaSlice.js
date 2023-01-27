import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isActive: false,
};

const safeAreaSlice = createSlice({
  name: 'safeArea',
  initialState,
  reducers: {
    toggleSafeArea(state) {
      state.isActive = !state.isActive;
    },
  },
});

export const { toggleSafeArea } = safeAreaSlice.actions;
export default safeAreaSlice.reducer;
