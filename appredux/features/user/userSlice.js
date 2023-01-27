import { createSlice } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import { toast } from 'react-toastify';
import { DEFAULT_TOAST_CONFIG } from '../../../config/constants';
import { FORGOTTEN_PASSWORD } from '../../../config/main-page-paths';
import { userUrls } from '../../../config/urls';
import api from '../../../utils/api';
import { loadingFinished, loadingStarted } from '../loader/loaderSlice';

const initialState = {
  user: null,
  showChangePassword: false,
  isPasswordChanged: false,
  authErrors: null,
  tempEmail: '',
  isSignUpSuccessful: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
    },
    loginFailed: (state) => {
      state.user = false;
    },
    setError: (state, action) => {
      state.authErrors = action.payload;
    },
    clearErrors: (state) => {
      state.authErrors = null;
    },
    logout: (state) => {
      state.user = false;
      localStorage.removeItem('token');
    },
    updateUser: (state, action) => {
      const { value, field } = action.payload;
      (state.user)[field] = value;
    },
    setTempEmail: (state, action) => {
      state.tempEmail = action.payload;
    },
    clearTempEmail: (state) => {
      state.tempEmail = '';
    },
    setShowChangePassword: (state, action) => {
      state.showChangePassword = action.payload;
    },
    setIsPasswordChanged: (state, action) => {
      state.isPasswordChanged = action.payload;
    },
    updateSelectedWorkspace: (state, action) => {
      if (state.user) {
        state.user.selectedWorkspaceId = action.payload;
      }
    },
    updateSelectedTeam: (state, action) => {
      if (state.user) {
        state.user.selectedTeamId = action.payload;
      }
    },
    setIsSignUpSuccessful: (state, action) => {
      state.isSignUpSuccessful = action.payload;
    },
  },
});

// Action
export const {
  loginSuccess,
  loginFailed,
  logout,
  setError,
  updateUser,
  clearErrors,
  setTempEmail,
  clearTempEmail,
  setShowChangePassword,
  setIsPasswordChanged,
  updateSelectedWorkspace,
  updateSelectedTeam,
  setIsSignUpSuccessful,
} = userSlice.actions;
export default userSlice.reducer;

// Thunk
export const signUp = (signUpPayload) => async (dispatch) => {
  batch(() => {
    dispatch(loadingStarted());
    dispatch(setError(null));
  });

  const payload = {
    ...signUpPayload,
    blocked: false,
    paid: true,
    instagramExportAllowed: true,
    privacyPolicy: true,
  };
  try {
    await api.post(userUrls.signUp, payload);
    dispatch(setIsSignUpSuccessful(true));
  } catch (err) {
    console.error(err);
  } finally {
    dispatch(loadingFinished());
  }
};

export const resendVerificationEmail = () => async (dispatch, getState) => {
  const state = getState();
  const error = state.user.authErrors?.find((error) => error.path === 'isVerified');

  if (error) {
    dispatch(loadingStarted());
    try {
      await api.post(userUrls.sendVerificationEmail, {
        verificationToken: error?.verificationToken,
      });
      toast.info(`Verification email has been sent.`, DEFAULT_TOAST_CONFIG);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(loadingFinished());
    }
  }
};

export const login = (loginPayload) => async (dispatch, getState) => {
  const state = getState();
  const tempEmail = state.user.tempEmail;
  batch(() => {
    if (tempEmail) {
      dispatch(clearTempEmail());
    }
    dispatch(loadingStarted());
    dispatch(setError(null));
  });
  try {
    const loginResult = await api.post(userUrls.login, loginPayload);
    localStorage.setItem('token', loginResult?.data?.token?.accessToken);
    dispatch(loginSuccess(loginResult?.data?.user));
  } catch (err) {
    batch(() => {
      const isVerifiedError = err?.response?.data?.errors?.find((error) => error?.path === 'isVerified');
      if (isVerifiedError) {
        dispatch(setTempEmail(loginPayload.email));
      }
      dispatch(setError(err?.response?.data?.errors ?? err?.response?.data));
      dispatch(loginFailed());
    });
  } finally {
    dispatch(loadingFinished());
  }
};

export const authUser = () => async (dispatch) => {
  const token = localStorage.getItem('token');
  if (!token) {
    dispatch(loginFailed());
    return;
  }
  try {
    dispatch(loadingStarted());
    const authResponse = await api.get(userUrls.auth);
    dispatch(loginSuccess(authResponse?.data));
  } catch (err) {
    dispatch(loginFailed());
  } finally {
    dispatch(loadingFinished());
  }
};

export const forgotPassword = (email, history) => async (dispatch) => {
  batch(() => {
    dispatch(loadingStarted());
    dispatch(setError(null));
  });
  try {
    await api.post(userUrls.forgotPassword, { email });
    dispatch(setTempEmail(email));
    history.push(`${FORGOTTEN_PASSWORD}-code`);
  } catch (err) {
    dispatch(setError(err.response?.data?.errors?.[0]));
  } finally {
    dispatch(loadingFinished());
  }
};

export const forgotPasswordCode = (token, history) => async (dispatch) => {
  batch(() => {
    dispatch(loadingStarted());
    dispatch(setError(null));
  });
  try {
    const { data } = await api.get(userUrls.forgotPasswordToken(token));
    history.push(`${FORGOTTEN_PASSWORD}-confirm`, { data, token });
  } catch (err) {
    dispatch(setError(err?.response?.data?.errors[0]));
  } finally {
    dispatch(loadingFinished());
  }
};

export const resetPassword = (
  resetPasswordPayload,
  history,
) => async (dispatch) => {
  try {
    dispatch(loadingStarted());
    await api.post(userUrls.resetPassword, resetPasswordPayload);
    history.push('/');
  } catch (err) {
    dispatch(setError(err?.response?.data?.message));
  } finally {
    dispatch(loadingFinished());
  }
  dispatch(clearTempEmail());
};
