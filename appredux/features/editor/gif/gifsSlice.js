import { batch } from 'react-redux';

import { createSlice } from '@reduxjs/toolkit';

import { gifsUrls } from '../../../../config/urls';
import { layerTypes } from '../../../../interfaces/layer-types';
import api from '../../../../utils/api';
import { concatMediaArrays, getPendingMediaContent } from '../../../../utils/mediaUtils';
import { updateStoryConfig } from '../../amp-story/ampStorySlice';
import { addMediaName } from '../../media/mediaSlice';
import { addPendingMedia, toggleIsMediaUploading } from '../helpers/helpersSlice';


const initialState = {
  gifs: [],
  searchTitle: '',
  isTrendSearch: true,
  isGifsActive: true,
};

const gifsSlice = createSlice({
  name: 'gifs',
  initialState,
  reducers: {
    addGifs(state, action) {
      state.gifs = concatMediaArrays(state.gifs, action.payload);
    },
    resetGifs(state) {
      state.gifs = [];
    },
    toggleGifsActive(state) {
      state.isGifsActive = !state.isGifsActive;
    },
    setIsTrendSearch(state, action) {
      state.isTrendSearch = action.payload;
    },
    setSearchTitle(state, action) {
      state.searchTitle = action.payload;
    },
  },
});

export const { addGifs, resetGifs, setSearchTitle, toggleGifsActive, setIsTrendSearch } = gifsSlice.actions;
export default gifsSlice.reducer;

export const loadGifs = (title = '', offset, searchType) => async (dispatch) => {
  try {
    const gifsResponse = await api.get(gifsUrls.getGifs(searchType, offset, title));

    batch(() => {
      dispatch(setSearchTitle(title));
      dispatch(setIsTrendSearch(!title));
      dispatch(addGifs(gifsResponse?.data));
    });
  } catch (err) {
    // TODO !!!
    console.error(err);
  }
};

export const selectGif = (gif, temporaryGif) => async (dispatch, getState) => {
  batch(() => {
    dispatch(toggleIsMediaUploading(true));
  });

  const storyId = getState().ampStory.present._id;
  try {
    const uploadGifResponse = await api.post(gifsUrls.uploadGif, {
      fileName: `${gif.slug}.webp`,
      url: `${gif.images.original.webp}/download`,
    });

    const pendingMedia = getPendingMediaContent(layerTypes.IMAGE, uploadGifResponse.data);

    batch(() => {
      dispatch(addPendingMedia({ storyId, temporaryId: temporaryGif.id, pendingMedia }));
      dispatch(toggleIsMediaUploading(false));
      dispatch(addMediaName(temporaryGif.name));
    });
    dispatch(updateStoryConfig());
  } catch (err) {
    // TODO !!!
    console.error(err);
    return;
  }
};
