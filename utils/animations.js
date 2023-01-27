export const updateLayerAnimations = (layer) => {
  if (layer.settings.animateInDuration === undefined) {
    layer.settings.animateInDuration = (layer.settings )?.animateDuration ?? 0;

    if ((layer.settings ).animateDuration !== undefined) {
      delete (layer.settings ).animateDuration;
    }
  }

  if (layer.settings.animateInDelay === undefined) {
    layer.settings.animateInDelay = (layer.settings )?.animateDelay ?? 0;

    if ((layer.settings ).animateDelay !== undefined) {
      delete (layer.settings ).animateDelay;
    }
  }

  if (layer.settings.animateOut === undefined) {
    layer.settings.animateOut = '';
  }
  if (layer.settings.animateOutDelay === undefined) {
    layer.settings.animateOutDelay = (layer.settings.animateInDuration ?? 0) + (layer.settings.animateInDelay ?? 0);
  }
  if (layer.settings.animateOutDuration === undefined) {
    layer.settings.animateOutDuration = 2;
  }
};
