import { DEFAULT_TOAST_CONFIG } from 'config/constants';
import { useAppDispatch, useSpinner } from 'hooks';
import produce from 'immer';
import { isNil, set } from 'lodash';
import { memo, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { deleteGradientLayer, healGradientLayer } from 'appredux/features/amp-story/ampStorySlice';
import styled from 'styled-components';
import api from 'utils/api';
import { generateGradientData } from 'utils/editorUtils';

const GradientWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  > span {
    align-self: center;
    margin: 0 auto;
  }

  svg {
    object-fit: fill;
    width: 100%;
    height: 100%;
    filter: ${({ shadow }) =>
      Number(shadow) > 0
        ? `drop-shadow(0px 0px ${Number(shadow) / 10}px rgba(0,0,0,0.9)) !important;`
        : 'none !important;'};
  }
`;

const GradientLayer = ({ layer, parentLayer, isPreview, handleBatchLayerChange }) => {
  const dispatch = useAppDispatch();
  const gradientRef = useRef(null);

  const { Spinner, spinnerProps } = useSpinner({ disableOverlay: true, size: 14 });
  const [gradientFixed, setGradientFixed] = useState(isPreview || !isNil(layer.content.gradient?.input));

  // Backward compatible
  useEffect(() => {
    if (!isPreview && !gradientFixed && layer.content?.gradient?.url) {
      const rebuildGradientData = async () => {
        if (layer.content?.gradient?.url) {
          try {
            const { data } = await api.get(layer.content.gradient?.url);
            const { parsedShape: input } = generateGradientData(data);
            dispatch(healGradientLayer(layer._id, input));
          } catch (err) {
            dispatch(deleteGradientLayer(layer._id));
            toast.info('Failed to load gradient. Please try again', DEFAULT_TOAST_CONFIG);
            console.error(err);
          } finally {
            setGradientFixed(true);
          }
        }
      };

      rebuildGradientData();
    }
  }, [dispatch, gradientFixed, handleBatchLayerChange, isPreview, layer]);

  useEffect(() => {
    if (!gradientFixed) {
      return;
    }

    if (gradientRef.current && layer.content?.gradient?.input && layer.content?.gradient?.colors) {
      Object.keys(layer.content?.gradient?.colors).map((colorIndex) => {
        layer.content?.gradient?.colors[colorIndex].stopId.forEach((id) => {
          if (id) {
            const element = (gradientRef.current).querySelector(`[id="${id}"]`);

            if (element && layer.content?.gradient?.colors?.[colorIndex]?.color) {
              (element).style.stopColor = layer.content.gradient.colors[colorIndex].color;
            }
          }
        });
      });
    }
  }, [gradientFixed, layer.content?.gradient?.colors, layer.content.gradient?.input]);

  useEffect(() => {
    if (!gradientFixed || isPreview) {
      return;
    }

    if (
      !isPreview &&
      gradientFixed &&
      (gradientRef.current.children[0]?.outerHTML !== layer.content?.gradient?.input || !layer.content?.gradient?.input)
    ) {
      if (!isNil(parentLayer) && layer._id !== parentLayer?._id) {
        const updatedLayers = parentLayer?.childLayers?.map((cl) => {
          if (cl._id === layer._id) {
            const nextState = produce(cl, (draftState) => {
              set(draftState, 'content.gradient.input', gradientRef.current.children[0]?.outerHTML);
            });

            return nextState;
          }

          return cl;
        });

        handleBatchLayerChange([{ field: 'childLayers', value: updatedLayers }]);
        return;
      }

      handleBatchLayerChange([{ field: 'content.gradient.input', value: gradientRef.current.children[0]?.outerHTML }]);
    }
  }, [
    gradientFixed,
    handleBatchLayerChange,
    isPreview,
    layer._id,
    layer.content?.gradient?.input,
    parentLayer,
    parentLayer?._id,
    parentLayer?.childLayers,
  ]);

  if (!gradientFixed) {
    return (
      <GradientWrapper>
        <Spinner {...spinnerProps} isVisible />
      </GradientWrapper>
    );
  }

  return (
    <GradientWrapper
      id={`layer-${layer?._id}`}
      shadow={layer?.settings?.generalSettings?.shadow}
      ref={gradientRef}
      dangerouslySetInnerHTML={{ __html: layer.content?.gradient?.input ?? '' }}
    />
  );
};

export default memo(GradientLayer);
