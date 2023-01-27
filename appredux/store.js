import api from './services/api';
import reducer, { RootState } from './rootReducer';
import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(api.middleware),
  devTools: process.env.NODE_ENV === 'development' ? { traceLimit: 30, actionsBlacklist: ['/*Api/'] } : false,
});

// Optional
setupListeners(store.dispatch);
// By using module.hot API for reloading,
// we can re-import the new version of the root reducer
// function whenever it's been recompiled, and tell the store
// to use the new version instead.
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', async () => {
    const newRootReducer = (await import('./rootReducer')).default;
    store.replaceReducer(newRootReducer);
  });
}

export default store;
