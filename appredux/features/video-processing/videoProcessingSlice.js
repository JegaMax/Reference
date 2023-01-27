import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { videoProcessingUrls } from '../../../config/urls';
import api from '../../../utils/api';
import { addMediaName, addUploadedMedia } from '../media/mediaSlice';

const initialState = {
  processingRecord: null,
  isProcessing: false,
  simulationPercentage: null,
  fileSize: null,
  temporaryProgress: null,
};

const videoProcessingSlice = createSlice({
  name: 'videoProcessing',
  initialState,
  reducers: {
    toggleVideoProcessingLoader(state, action) {
      state.isProcessing = action.payload;
    },
    setVideoProcessing(state, action) {
      state.processingRecord = action.payload;
    },
    setOriginalVideo(state, action) {
      state.originalVideo = action.payload;
    },
    clearVideoProcessing() {
      return initialState;
    },
    setSimulationPercentage(state, action) {
      state.simulationPercentage = action.payload;
    },
    setFileSize(state, action) {
      state.fileSize = action.payload;
    },
    setTemporaryProgress(state, action) {
      state.temporaryProgress = action.payload;
    },
  },
});

export const fetchVideoProcessing = () => async (dispatch, getState) => {
  const state = getState();
  const { videoProcessing: { processingRecord } = {} } = state;
  /** Return in case of missing/non-populated state */
  if (!processingRecord) {
    return;
  }

  try {
    const response = await api.get(videoProcessingUrls.getVideoProcessing(processingRecord._id));
    batch(() => {
      dispatch(setVideoProcessing(response?.data));
    });
  } catch (error) {
    console.error(error);
    dispatch(clearVideoProcessing());
  }
};

export const finishVideoProcessing = () => async (dispatch, getState) => {
  const { videoProcessing: { processingRecord, originalVideo } = {} } = getState();
  /** Return in case of missing/non-populated state */
  if (!processingRecord || !originalVideo) {
    return;
  }
  const videoTitle = originalVideo?.name;
  const thumbnailTitle = originalVideo?.thumbnail?.name;

  return batch(() => {
    dispatch(addMediaName(videoTitle || ''));
    dispatch(addMediaName(thumbnailTitle || ''));
    dispatch(addUploadedMedia(originalVideo));
    dispatch(clearVideoProcessing());
  });
};

export const {
  setFileSize,
  setOriginalVideo,
  setVideoProcessing,
  setTemporaryProgress,
  clearVideoProcessing,
  setSimulationPercentage,
  toggleVideoProcessingLoader,
} = videoProcessingSlice.actions;

export default videoProcessingSlice.reducer;
