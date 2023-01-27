import { layerTypes } from '../interfaces/layer-types';
import { defaultGradientModel } from './builders';

const changeColorToGradient = (layer) => {
  if (layer.type === layerTypes.SHAPE || layer.type === layerTypes.CTA_LINK || layerTypes.OUTLINK) {
    ['fillColor', 'borderColor' ].forEach((key) => {
      if (typeof layer.settings.layerSettings.shapeStyles[key] === 'string') {
        const model = { ...defaultGradientModel(key) };
        model.colorType = key;
        model.leftColor = layer.settings.layerSettings.shapeStyles[key];
        layer.settings.layerSettings.shapeStyles[key] = model;
      }
    });
  }
};

export { changeColorToGradient };

