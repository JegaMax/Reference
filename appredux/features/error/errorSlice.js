import { isNil } from 'lodash';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  error: null,
};

const isActionWithError = (action) => !isNil(action?.payload?.error);

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    catchErrors(state, action) {
      state.error = action.payload;
    },
    clearErrors(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isActionWithError,
      // `action` will be inferred as a RejectedAction due to isRejectedAction being defined as a type guard
      (state, action) => {
        state.error = action.payload.error;
      },
    );
  },
});
export const { catchErrors, clearErrors } = errorSlice.actions;
export default errorSlice.reducer;
