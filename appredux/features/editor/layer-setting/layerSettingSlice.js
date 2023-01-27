import { createSlice } from '@reduxjs/toolkit';
import { debounce } from 'lodash';
import { layerTypes } from '../../../../interfaces/layer-types';
import { setProportion } from '../../../../utils/commonUtils';
import { setActiveLayerProps, setActiveLayerPropsArray } from '../../amp-story/ampStorySlice';
import { setEditorLayerMenuVisibilityDebouncedAction, toggleEditorLayerMenuVisibility } from '../helpers/helpersSlice';

const initialState = {
  sizeProportion: 1,
  counter: 0,
};

const layerSettingSlice = createSlice({
  name: 'layerSetting',
  initialState,
  reducers: {
    setSizeProportionInStore(state, action) {
      state.sizeProportion = action.payload;
    },
    incrementCounter(state) {
      state.counter++;
    },
    resetCounter(state) {
      state.counter = 0;
    },
  },
});

export const { resetCounter, incrementCounter, setSizeProportionInStore } = layerSettingSlice.actions;
export default layerSettingSlice.reducer;

export const inputLayerPosition = ({ value, type }) => (dispatch) => {
  dispatch(
    setActiveLayerProps({
      field: `settings.generalSettings.${type}`,
      value: Number(value),
    }),
  );
};

export const changeLayerSize = ({ value, type }) => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;
  const activeLayer = state.ampStory.present.cuts[activeSlidePosition ?? -1].layers[activeLayerPosition ?? -1];
  const isLocked = activeLayer.settings.layerSettings.locked;
  const sizeProportion = state.layerSetting.sizeProportion;

  let width =
    type === 'width'
      ? value
      : isLocked
      ? Math.ceil(value / sizeProportion)
      : Number(activeLayer.settings.layerSettings.width);
  let height =
    type === 'height'
      ? value
      : isLocked && activeLayer.type !== layerTypes.HTML
      ? Math.ceil(value * sizeProportion)
      : Number(activeLayer.settings.layerSettings.height);

  if (isLocked) {
    height = height >= 10000 ? 10000 : height === 0 ? value : height;
    width = width >= 10000 ? 10000 : width === 0 ? value : width;
  }

  dispatch(
    setActiveLayerPropsArray([
      {
        field: `settings.layerSettings.width`,
        value: Number(width),
      },
      {
        field: `settings.layerSettings.height`,
        value: Number(height),
      },
    ]),
  );
};

export const setArrowEvents = ({ event, type }) => (dispatch) => {
  if (event.keyCode === 38 || event.keyCode === 40) {
    event.target.value =
      event.keyCode === 38 ? Math.round(+event.target.value) + 1 : Math.round(+event.target.value) - 1;
    if (type === 'offsetX' || type === 'offsetY') {
      dispatch(inputLayerPosition({ value: event.target.value, type }));
    } else if (type === 'width' || type === 'height') {
      dispatch(changeLayerSize({ value: event.target.value, type }));
    } else {
      dispatch(changeSettings({ value: event.target.value, type }));
    }
  }
};

export const disableSizeInputs = () => (dispatch, getState) => {
  const state = getState();
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;
  const activeLayer = state.ampStory.present.cuts[activeSlidePosition ?? -1].layers[activeLayerPosition ?? -1];

  if (activeLayer.type === layerTypes.HTML) {
    return;
  }

  const value = !activeLayer.settings.layerSettings.locked;

  dispatch(
    setActiveLayerProps({
      field: 'settings.layerSettings.locked',
      value,
    }),
  );
};

export const changeSettings = ({ value, type }) => (dispatch, getState) => {
  const state = getState();
  const isEditorLayerMenuVisible = state.helpers.isEditorLayerMenuVisible;

  if (value === '') {
    value = 0;
  }

  if (type === 'rotate' && isEditorLayerMenuVisible) {
    dispatch(toggleEditorLayerMenuVisibility(false));
  }

  const field = `settings.generalSettings[${type}]`;
  dispatch(setEditorLayerMenuVisibilityDebouncedAction(true));
  setActiveLayerPropsDebounced(dispatch, { field, value });
};

export const setSizeProportionWithParams = (size) => (
  dispatch,
  getState,
) => {
  const sizeProportion = getState().layerSetting?.sizeProportion;
  const newSizeProportion = setProportion(size.width, size.height);

  if (sizeProportion !== newSizeProportion) {
    dispatch(setSizeProportionInStore(newSizeProportion));
  }
};

export const setSizeProportion = () => (dispatch, getState) => {
  const state = getState();
  const sizeProportion = state.layerSetting.sizeProportion;
  const activeSlidePosition = state.ampStory.present.activeSlidePosition;
  const activeLayerPosition = state.ampStory.present.activeLayerPosition;
  const activeLayer = state.ampStory.present.cuts[activeSlidePosition ?? -1]?.layers[activeLayerPosition ?? -1];

  const width = activeLayer?.settings.layerSettings.width;
  const height = activeLayer?.settings.layerSettings.height;

  const newSizeProportion = setProportion(width, height);
  if (sizeProportion !== newSizeProportion) {
    dispatch(setSizeProportionInStore(newSizeProportion));
  }
};

const setActiveLayerPropsDebounced = debounce(
  (dispatch, inputObject) => dispatch(setActiveLayerProps(inputObject)),
  300,
  { leading: false, trailing: true },
);

export const setActiveLayerPropsDebouncedAction = (args) => (dispatch) => {
  setActiveLayerPropsDebounced(dispatch, args);
};

const setActiveLayerPropsArrayDebounced = debounce(
  (dispatch, inputArray) => dispatch(setActiveLayerPropsArray(inputArray)),
  300,
  { leading: false, trailing: true },
);

export const setActiveLayerPropsArrayDebouncedAction = (args) => (dispatch) => {
  setActiveLayerPropsArrayDebounced(dispatch, args);
};
