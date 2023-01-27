import { combineReducers } from '@reduxjs/toolkit';
import ampStoryReducer from './features/amp-story/ampStorySlice';
import authReducer from './features/auth/authSlice';
import editorModalReducer from './features/editor-modal/editorModalSlice';
import gifReducer from './features/editor/gif/gifsSlice';
import groupLayerHelperReducer from './features/editor/helpers/groupLayerHelperSlice';
import helpersReducer from './features/editor/helpers/helpersSlice';
import imageReducer from './features/editor/image/imageSlice';
import layerSettingReducer from './features/editor/layer-setting/layerSettingSlice';
import safeAreaReducer from './features/editor/safeArea/safeAreaSlice';
import errorReducer from './features/error/errorSlice';
import exportReducer from './features/export/exportSlice';
import loaderReducer from './features/loader/loaderSlice';
import mediaReducer from './features/media/mediaSlice';
import navigationReducer from './features/navigation/navigationSlice';
import tagsReducer from './features/tags/tagsSlice';
import templatesReducer from './features/templates/templatesSlice';
import userReducer from './features/user/userSlice';
import videoProcessingReducer from './features/video-processing/videoProcessingSlice';
import widgetReducer from './features/widget/widgetSlice';
import api from './services/api';

const appReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  loader: loaderReducer,
  ampStory: ampStoryReducer,
  helpers: helpersReducer,
  media: mediaReducer,
  safeArea: safeAreaReducer,
  gif: gifReducer,
  image: imageReducer,
  layerSetting: layerSettingReducer,
  editorModal: editorModalReducer,
  templates: templatesReducer,
  export: exportReducer,
  error: errorReducer,
  videoProcessing: videoProcessingReducer,
  tags: tagsReducer,
  widget: widgetReducer,
  navigation: navigationReducer,
  groupLayerHelper: groupLayerHelperReducer,

  // Api
  [api.reducerPath]: api.reducer,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
