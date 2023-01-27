import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authApi } from '../../../appredux/services/auth/auth';
import { templatesApi } from '../../../appredux/services/templates/templates';
import { workspacesApi } from '../../../appredux/services/workspaces/workspaces';

const initialState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    loadingStarted(state) {
      state.isLoading = true;
    },
    loadingFinished(state) {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // Loading started
    builder.addMatcher(
      isAnyOf(
        // Login
        authApi.endpoints.login.matchPending,
        // Verify Email
        authApi.endpoints.verifyEmail.matchPending,
        // Create Workspace
        workspacesApi.endpoints.createWorkspace.matchPending,
        // Create Template
        templatesApi.endpoints.saveTemplate.matchPending,
        // // Widget Metadata
        // widgetsApi.endpoints.updateWidgetMetadata.matchPending,
      ),
      (state) => {
        state.isLoading = true;
      },
    );
    // Loading finished
    builder.addMatcher(
      isAnyOf(
        // Login
        authApi.endpoints.login.matchFulfilled,
        authApi.endpoints.login.matchRejected,
        // Verify Email
        authApi.endpoints.verifyEmail.matchFulfilled,
        authApi.endpoints.verifyEmail.matchRejected,
        // Create Workspace
        workspacesApi.endpoints.createWorkspace.matchFulfilled,
        workspacesApi.endpoints.createWorkspace.matchRejected,
        // Create Template
        templatesApi.endpoints.saveTemplate.matchFulfilled,
        templatesApi.endpoints.saveTemplate.matchRejected,
        // // Widget Metadata
        // widgetsApi.endpoints.updateWidgetMetadata.matchFulfilled,
        // widgetsApi.endpoints.updateWidgetMetadata.matchRejected,
      ),
      (state) => {
        state.isLoading = false;
      },
    );
  },
});

export const { loadingStarted, loadingFinished } = loaderSlice.actions;
export default loaderSlice.reducer;
