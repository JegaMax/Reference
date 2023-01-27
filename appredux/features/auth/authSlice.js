import { createSelector, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { dpaApi } from '../../../appredux/services/dpa/dpa';
import { authApi } from '../../services/auth/auth';

const initialState = {
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('iat');
      localStorage.removeItem('exp');

      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authApi.endpoints.login.matchFulfilled, dpaApi.endpoints.claimToken.matchFulfilled),
      (state, { payload }) => {
        state.token = payload.token;
        state.user = payload.user;
      },
    );
    builder.addMatcher(authApi.endpoints.authenticate.matchFulfilled, (state, { meta, payload }) => {
      const requestArgs = meta?.arg?.originalArgs;
      if (requestArgs) {
        state.token = requestArgs;
        state.user = payload;
      }
    });
    builder.addMatcher(authApi.endpoints.selectWorkspace.matchFulfilled, (state, { meta }) => {
      const requestArgs = meta?.arg?.originalArgs;
      if (requestArgs && state.user) {
        state.user.selectedWorkspaceId = requestArgs;
      }
    });
    builder.addMatcher(authApi.endpoints.selectTeam.matchFulfilled, (state, { meta }) => {
      const requestArgs = meta?.arg?.originalArgs;
      if (state.user) {
        state.user.selectedTeamId = requestArgs;
      }
    });
    builder.addMatcher(authApi.endpoints.updateTutorialField.matchFulfilled, (state, { meta }) => {
      const requestArgs = meta?.arg?.originalArgs;
      if (requestArgs && state.user) {
        const { type } = requestArgs;
        state.user[type] = true;
      }
    });
    builder.addMatcher(authApi.endpoints.addFavouriteColor.matchFulfilled, (state, { payload }) => {
      if (state.user) {
        state.user.favouriteColors = payload;
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

export const isUserAuthenticated = createSelector(
  (state) => state.auth.user,
  (user) => !!user,
);

export const selectDPAProvider = createSelector(
  (state) => state.auth.user,
  (user) => user?.provider === 'dpa',
);
