import axios from 'axios';
import qs from 'qs';
import { toast } from 'react-toastify';
import { environment } from '../config/environment';
import { catchErrors } from 'appredux/features/error/errorSlice';
import { DEFAULT_TOAST_CONFIG } from '../config/constants';

const api = axios.create({
  baseURL: environment.host,
});

const attachInterceptors = (store) => {
  // Request interceptor for API calls
  api.interceptors.request.use(
    (config) => {
      // Get token from local storage
      const value = localStorage.getItem('accessToken');
      config.headers = {
        Authorization: `Bearer ${value}`,
        ...config.headers,
      };
      return config;
    },
    (error) => {
      Promise.reject(error);
    },
  );

  api.interceptors.request.use(
    (config) => {
      /* Disable pending requests */

      // removePending(config); // Check previous requests to cancel before the request starts
      // addPending(config); // Add current request to pending
      // other code before request
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  api.interceptors.response.use(
    (response) => {
      /* Disable pending requests */
      // removePending(response.config); // Remove this request at the end of the request
      return response;
    },
    (error) => {
      if (axios.isCancel(error)) {
        // Repeated request handle
        console.info('repeated request: ' + error.message);
      } else {
        const errorMsg = getErrorMessage(error);

        toast.info(errorMsg, DEFAULT_TOAST_CONFIG);
        // Do we need reducer ?
        store.dispatch(catchErrors(error));
      }
      return Promise.reject(error);
    },
  );
};

// Declare a Map to store the identification and cancellation functions for each request
const pending = new Map();
/**
 * Add Request
 * @param {Object} config
 */
const addPending = (config) => {
  const url = [config.method, config.url, qs.stringify(config.params)].join('&');
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!pending.has(url)) {
        // If the current request does not exist in pending, add it
        pending.set(url, cancel);
      }
    });
};

/**
 * Remove Request
 * @param {Object} config
 */
const removePending = (config) => {
  const url = [config.method, config.url, qs.stringify(config.params)].join('&');

  if (pending.has(url)) {
    // If the current request identity exists in pending, you need to cancel the current request and remove it
    const cancel = pending.get(url);
    cancel(url);
    pending.delete(url);
  }
};

/**
 * Empty requests in pending (called on route jumps)
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url);
  }
  pending.clear();
};

export const checkPending = ({
  method,
  url,
  params,
}) => {
  const request = [method.toLowerCase(), url, qs.stringify(params)].join('&');

  return pending.has(request);
};

export const getErrorMessage = (error) => {
  const errorType = error.response?.data?.errors?.[0]?.title;
  const errorMessage = error.response?.data?.errors?.[0]?.detail;

  if (process.env.NODE_ENV === 'development') {
    return errorMessage;
  }

  switch (errorType) {
    case 'InvalidCredentials':
      return 'Your session has ended. Please login again.';
    default:
      return 'Whoops. Something went wrong. We are working on it.';
  }
};

export { attachInterceptors };
export default api;
