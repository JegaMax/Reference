import { createSelector, createSlice } from '@reduxjs/toolkit';
import { get, isNil } from 'lodash';

const initialState = {
  isMyFoldersExpanded: false,
  isTeamFoldersExpanded: false,
};

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    expandMyFolders: (state) => {
      state.isMyFoldersExpanded = true;
    },
    collapseMyFolders: (state) => {
      state.isMyFoldersExpanded = false;
    },
    expandTeamFolders: (state) => {
      state.isTeamFoldersExpanded = true;
    },
    collapseTeamFolders: (state) => {
      state.isTeamFoldersExpanded = false;
    },
    expandFolder: (state, action) => {
      if (isNil(state[action.payload])) {
        state[action.payload] = true;
      }
    },
    collapseFolder: (state, action) => {
      if (!isNil(state[action.payload])) {
        delete state[action.payload];
      }
    },
    expandRecursively: (state, action) => {
      const folder = action.payload;
      if (folder.team) {
        state.isTeamFoldersExpanded = true;
      } else {
        state.isMyFoldersExpanded = true;
      }

      folder.ancestors?.forEach((ancestor) => {
        state[ancestor._id] = true;
      });
    },
  },
});

export const {
  expandMyFolders,
  collapseMyFolders,
  expandTeamFolders,
  collapseTeamFolders,
  expandFolder,
  collapseFolder,
  expandRecursively,
} = navigationSlice.actions;
export default navigationSlice.reducer;

export const makeSelectCurrentFolderState = () =>
  createSelector(
    (state) => state.navigation,
    (_, folderId) => folderId,
    (navigation, folderId) => get(navigation, folderId),
  );
