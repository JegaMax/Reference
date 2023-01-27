import { layerTypes } from '../interfaces/layer-types';

export const renderDirections = (type) => {
  const isMedia =
    type === layerTypes.IMAGE || type === layerTypes.GIFS || type === layerTypes.STICKERS || type === layerTypes.VIDEO;

  const directions = [];
  if (isMedia) {
    directions.push('nw', 'ne', 'sw', 'se');
  }
  if (type === layerTypes.HTML) {
    directions.push('w', 'e');
  }
  if (!isMedia && type !== layerTypes.HTML) {
    directions.push('w', 'e', 'nw', 'ne', 'n', 's', 'sw', 'se');
  }

  return directions;
};

export const filterSnappedLayers = (ids) => (layer) => {
  if (layer.type === layerTypes.HTML && !ids.includes(layer._id)) {
    ids.push(layer._id);
  }
};
