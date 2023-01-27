import { STATUS_PUBLISHED } from '../../../config/constants';
import { isMediaLayer } from '../../../utils/editorUtils';

export const ActionTypes = {
  UPDATE_PAST_MEDIA_LAYERS: '@@redux-undo/UPDATE_PAST_MEDIA_LAYERS',
};

export const ActionCreators = {
  updatePastMediaLayers: () => {
    return {
      type: ActionTypes.UPDATE_PAST_MEDIA_LAYERS,
    };
  },
};

const enhancedUndoableAmpStoryReducer = (reducer) => (
  state,
  action,
) => {
  switch (action.type) {
    case ActionTypes.UPDATE_PAST_MEDIA_LAYERS: {
      const mediaLayers = [];
      state.present.cuts.forEach((cut) => {
        cut.layers.forEach((layer) => {
          if (isMediaLayer(layer.type)) {
            mediaLayers.push(layer);
          }
        });
      });
      const newPast = state.past.map((story) => ({
        ...story,
        status: STATUS_PUBLISHED,
        cuts: story.cuts.map((cut) => ({
          ...cut,
          layers: cut.layers.map((layer) => {
            if (isMediaLayer(layer.type)) {
              const presentLayer = mediaLayers.find((mediaLayer) => mediaLayer.temporaryId === layer.temporaryId);
              return {
                ...layer,
                content: presentLayer?.content ?? layer.content,
              };
            }
            return layer;
          }),
        })),
      }));
      return reducer(
        {
          ...state,
          past: !state.past.length ? state.past : newPast,
        },
        action,
      );
    }
    default:
      return reducer(state, action);
  }
};

export default enhancedUndoableAmpStoryReducer;
