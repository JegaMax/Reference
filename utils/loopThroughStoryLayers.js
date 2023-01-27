
const loopThroughStoryLayers = (ampStory, callbacks, cutCallbacks) => {
  if (ampStory.cuts && ampStory.cuts.length) {
    for (let i = 0; i < ampStory.cuts.length; i++) {
      if (cutCallbacks?.length) {
        const cut = ampStory.cuts[i];
        cutCallbacks.forEach((cb) => {
          cb(cut);
        });
      }

      if (ampStory.cuts[i].layers && ampStory.cuts[i].layers.length) {
        for (let c = 0; c < ampStory.cuts[i].layers.length; c++) {
          const layer = ampStory.cuts[i].layers[c];
          if (layer.childLayers && layer.childLayers.length > 0) {
            for (let y = 0; y < layer.childLayers.length; y++) {
              const childLayer = layer.childLayers[y];

              callbacks.forEach((callback) => {
                callback(childLayer);
              });
            }
          }

          callbacks.forEach((callback) => {
            callback(layer);
          });
        }
      }
    }
    return ampStory;
  }
};

export default loopThroughStoryLayers;
