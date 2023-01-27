import { batch, useDispatch, useSelector } from 'react-redux';
import {
  reorderLayers,
  selectActiveLayer,
  selectActiveSlide,
  setActiveLayerPosition,
  setActiveLayerPropsInStore,
  setSelectedLayerNumbers,
} from 'appredux/features/amp-story/ampStorySlice';
import { layerTypes } from '../../../interfaces/layer-types';

import { incrementStoryChangedCount } from 'appredux/features/editor/helpers/helpersSlice';
import { EditorState } from 'draft-js';

const useReorderLayers = () => {
  const dispatch = useDispatch();
  const activeLayer = useSelector(selectActiveLayer);
  const activeSlide = useSelector(selectActiveSlide);

  const reorder = (source = 0, destination = 0) => {
    if (activeLayer?.position > -1) {
      batch(() => {
        if (activeLayer?.type === layerTypes.HTML) {
          if (activeLayer) {
            dispatch(
              setActiveLayerPropsInStore({
                field: 'settings.editorState',
                value: EditorState.moveFocusToEnd(activeLayer.settings.editorState),
                activeSlidePosition: activeSlide.position,
                activeLayerPosition: activeLayer.position,
              }),
            );
          }
        }
        dispatch(
          reorderLayers({
            sourceLayerId: source,
            destinationLayerId: destination,
            activeSlidePosition: activeSlide.position,
          }),
        );
        dispatch(setSelectedLayerNumbers([destination]));
        dispatch(incrementStoryChangedCount(true));
        dispatch(setActiveLayerPosition(destination));
      });
    }
  };

  return { reorder };
};

export default useReorderLayers;
