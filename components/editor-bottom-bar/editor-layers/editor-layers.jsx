import { useEffect, useRef, useState } from 'react';
// Components
import { IconButton } from '../../buttons';
import { Layers } from '../../icons';
import { BottomBarButtonWrapper } from '../shared';
import EditorLayersMenu from './editor-layers-menu';
// Utils
import { stopPropagation } from '../../../utils/common';
import { layerButtonResizeObserver } from '../../../utils/resizeObservers';

const EditorLayers = ({ handleLayerClick }) => {
  const [isLayersMenuVisible, setIsLayersMenuVisible] = useState(false);
  const layerButtonRef = useRef(null);
  const onLayersMenuClick = () => setIsLayersMenuVisible(!isLayersMenuVisible);

  useEffect(() => {
    if (layerButtonRef?.current) {
      layerButtonResizeObserver.observe(layerButtonRef.current);
    }

    return () => {
      if (layerButtonRef?.current) {
        layerButtonResizeObserver.unobserve(layerButtonRef.current);
      }
    };
  }, []);

  return (
    <BottomBarButtonWrapper onClick={stopPropagation}>
      <IconButton onClick={onLayersMenuClick} buttonRef={layerButtonRef}>
        <Layers isActive={isLayersMenuVisible} />
      </IconButton>

      {isLayersMenuVisible && <EditorLayersMenu handleLayerClick={handleLayerClick} />}
    </BottomBarButtonWrapper>
  );
};

export default EditorLayers;
