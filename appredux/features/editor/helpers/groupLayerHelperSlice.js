import { createSlice } from '@reduxjs/toolkit';
import { ActionTypes } from 'redux-undo';

const isUndoOrRedo = (action) => action.type === ActionTypes.UNDO || action.type === ActionTypes.REDO;

const initialState = {
  isGroupLayerActive: false,
  selectedChildLayer: null,
  width: null,
  height: null,
  offsetX: null,
  offsetY: null,
  isTextLayerInEditMode: false,
  forceRebuild: false,
  forceRebuildMulti: false,
  multiWidth: null,
  multiHeight: null,
  multiX: null,
  multiY: null,
  offsetMultiX: null,
  offsetMultiY: null,
  multiAngle: null,
};

const groupLayerHelperSlice = createSlice({
  name: 'groupLayerHelper',
  initialState,
  reducers: {
    toggleGroupLayer: (state, action) => {
      state.isGroupLayerActive = action.payload;
      if (!action.payload) {
        state.selectedChildLayer = null;
      }
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setOffsetX: (state, action) => {
      state.offsetX = action.payload;
    },
    setOffsetY: (state, action) => {
      state.offsetY = action.payload;
    },
    selectChildLayer: (state, action) => {
      state.selectedChildLayer = action.payload;
    },
    toggleTextLayerEditMode: (state, action) => {
      state.isTextLayerInEditMode = action.payload;
    },
    toggleForceRebuild: (state, action) => {
      state.forceRebuild = action.payload;
    },
    toggleForceRebuildMulti: (state, action) => {
      state.forceRebuildMulti = action.payload;
    },
    setMultiWidth: (state, action) => {
      state.multiWidth = action.payload;
    },
    setMultiHeight: (state, action) => {
      state.multiHeight = action.payload;
    },
    setMultiX: (state, action) => {
      state.multiX = action.payload;
    },
    setMultiY: (state, action) => {
      state.multiY = action.payload;
    },
    setMultiOffsetX: (state, action) => {
      state.offsetMultiX = action.payload;
    },
    setMultiOffsetY: (state, action) => {
      state.offsetMultiY = action.payload;
    },
    setMultiAngle: (state, action) => {
      state.multiAngle = action.payload;
    },
    clearMulti: (state) => {
      state.multiWidth = null;
      state.multiHeight = null;
      state.multiX = null;
      state.multiY = null;
      state.multiAngle = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(isUndoOrRedo, (state) => {
      state.forceRebuild = true;
    });
    builder.addMatcher(isUndoOrRedo, (state) => {
      state.forceRebuildMulti = true;
    });
  },
});
export const {
  toggleGroupLayer,
  setWidth,
  setHeight,
  setOffsetX,
  setOffsetY,
  selectChildLayer,
  toggleTextLayerEditMode,
  toggleForceRebuild,
  toggleForceRebuildMulti,
  setMultiWidth,
  setMultiHeight,
  setMultiX,
  setMultiY,
  setMultiOffsetX,
  setMultiOffsetY,
  setMultiAngle,
  clearMulti,
} = groupLayerHelperSlice.actions;
export default groupLayerHelperSlice.reducer;
