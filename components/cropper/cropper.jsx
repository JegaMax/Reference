import { useAppDispatch } from 'hooks';
import { debounce } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Moveable from 'react-moveable';
import { setCroppedLayer } from 'appredux/features/editor/helpers/helpersSlice';
import styled from 'styled-components';
import { generateCroppedLayer, parseClip } from 'utils/croppingUtils';
import CustomGridLine from './custom-grid-line';

const PADDING = { left: 0, top: 0, right: 0, bottom: 0 };

// Cropping bug with floating 0
const parseZeros = (clipStyles) => {
  const clip = clipStyles?.map((clipValue) => {
    const numberValue = Number.parseFloat(clipValue);

    if (numberValue < 0.0001) {
      return '0px';
    }

    return clipValue;
  });

  return `inset(${clip.join(' ')})`;
};

const CropperContainer = styled.div`
  &&& {
    *[class^='moveable'] {
      min-width: unset !important;
      min-height: unset !important;
    }
    .moveable-control-box {
      pointer-events: auto;
    }
    .moveable-control {
      width: 12px;
      height: 12px;
      margin-top: -6px;
      margin-left: -6px;
      background: var(--primary);
      border-color: var(--primary);
      // Vertical handles
      &:nth-of-type(2n) {
        height: 18px;
        margin-left: -3px;
        width: 6px;
        border-radius: 4px;
        margin-top: -8px;
      }
      // Horizontal handles
      &:nth-of-type(4n) {
        height: 6px;
        width: 16px;
        margin-left: -8px;
        margin-top: -3px;
      }
    }
    .moveable-line {
      background: var(--primary);
    }
    // Remove clip bounds
    .moveable-bounds {
      visibility: hidden;
      opacity: 0;
    }
  }
`;

const TargetContainer = styled.div`
  pointer-events: auto;
  > video {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

const Target = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const OverlayContainer = styled.div`
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  > video {
    width: 100%;
    height: 100%;
    display: block;
    filter: brightness(0.5);
  }
`;

const Overlay = styled(Target)`
  filter: brightness(0.5);
`;

const DEFAULT_FRAME = {
  translate: [0, 0, 0, 0],
  clipStyle: 'inset',
};

const Cropper = ({ layer, videoComponent }) => {
  const dispatch = useAppDispatch();
  const [frame, setFrame] = useState(layer?.settings?.cropSettings?.frame ?? DEFAULT_FRAME);

  const initialOffset = useMemo(() => parseClip(layer.settings?.cropSettings?.frame?.clipStyle ?? ''), [
    layer.settings?.cropSettings?.frame?.clipStyle,
  ]);

  const debouncedSetCroppingLayer = useCallback(
    debounce((updatedLayer) => {
      dispatch(setCroppedLayer(updatedLayer));
    }, 75),
    [],
  );

  const onCropChange = useCallback(
    (frame) => {
      const updatedLayer = generateCroppedLayer(layer, frame);
      debouncedSetCroppingLayer(updatedLayer);
    },

    [layer, debouncedSetCroppingLayer],
  );

  const targetRef = useRef(null);
  const overlayRef = useRef(null);

  const targetStyles = useMemo(
    () => ({
      transform: `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`,
      clipPath: frame.clipStyle,
      width: `${layer?.settings?.cropSettings?.originalWidth}px`,
      height: `${layer.settings?.cropSettings?.originalHeight}px`,
    }),
    [
      frame.clipStyle,
      frame.translate,
      layer.settings?.cropSettings?.originalHeight,
      layer.settings?.cropSettings?.originalWidth,
    ],
  );
  const overlayStyles = useMemo(
    () => ({
      transform: `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`,
      width: `${layer.settings?.cropSettings?.originalWidth}px`,
      height: `${layer.settings?.cropSettings?.originalHeight}px`,
    }),
    [frame.translate, layer.settings?.cropSettings?.originalHeight, layer.settings?.cropSettings?.originalWidth],
  );

  const handleOnDragStart = useCallback(
    (event) => {
      event.set(frame.translate);
    },
    [frame.translate],
  );

  const handleDrag = useCallback((event) => {
    const { target, beforeTranslate } = event;

    target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    if (overlayRef.current) {
      overlayRef.current.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { lastEvent } = event;

    if (lastEvent) {
      setFrame((prev) => ({ ...prev, translate: lastEvent.beforeTranslate }));
    }
  }, []);

  const handleClip = useCallback((event) => {
    const clip = parseZeros(event.clipStyles);

    if (event.clipType === 'rect') {
      event.target.style.clip = clip;
    } else {
      event.target.style.clipPath = clip;
    }

    setFrame((prev) => ({ ...prev, clipStyle: clip }));
  }, []);

  const handleClipEnd = useCallback((e) => {
    const { lastEvent } = e;

    if (lastEvent) {
      const clip = parseZeros(lastEvent.clipStyles);

      setFrame((prev) => ({
        ...prev,
        clipStyle: clip,
      }));
    }
  }, []);

  useEffect(() => {
    onCropChange(frame);

    return () => {
      debouncedSetCroppingLayer.cancel();
    };
  }, [debouncedSetCroppingLayer, frame, onCropChange]);

  return (
    <CropperContainer
      style={{
        width: layer.settings?.cropSettings?.originalWidth,
        height: layer.settings?.cropSettings?.originalHeight,
        transform: `translate(${-initialOffset[3] - (layer?.settings?.cropSettings?.frame?.translate?.[0] ?? 0)}px, ${
          -initialOffset[0] - (layer?.settings?.cropSettings?.frame?.translate?.[1] ?? 0)
        }px)`,
      }}
    >
      <TargetContainer ref={targetRef} style={targetStyles}>
        {videoComponent ? (
          videoComponent
        ) : (
          <Target src={layer?.content?.value || layer?.content?.image?.url} alt="Croppable image" />
        )}
      </TargetContainer>

      <OverlayContainer ref={overlayRef} style={overlayStyles}>
        {videoComponent ? (
          videoComponent
        ) : (
          <Overlay src={layer?.content?.value || layer?.content?.image?.url} alt="Cropper overlay" />
        )}
      </OverlayContainer>
      <Moveable
        draggable
        clippable
        clipTargetBounds
        dragArea
        hideDefaultLines
        useResizeObserver
        ables={[CustomGridLine]}
        props={{ customGridLine: true, frame }}
        clipRelative={false}
        target={targetRef}
        throttleDrag={0}
        startDragRotate={0}
        throttleDragRotate={0}
        zoom={1}
        origin={false}
        padding={PADDING}
        clipArea={false}
        dragWithClip={false}
        defaultClipPath="inset"
        snapThreshold={5}
        onDragStart={handleOnDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClip={handleClip}
        onClipEnd={handleClipEnd}
      />
    </CropperContainer>
  );
};

export default memo(Cropper);
