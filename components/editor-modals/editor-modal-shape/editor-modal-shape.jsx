import api from '../../../utils/api';
import EditorModalContentWrapper from '../shared/editor-modal-content-wrapper/editor-modal-content-wrapper';
import EditorModalLabel from '../shared/editor-modal-label/editor-modal-label';
import EditorModalLabelsWrapper from '../shared/editor-modal-labels-wrapper/editor-modal-labels-wrapper';
import EditorModalWrapper from '../shared/editor-modal-wrapper/editor-modal-wrapper';
import generateId from '../../../utils/generateId';
import OutsideClickHandler from 'react-outside-click-handler';
import React, { useCallback, useEffect } from 'react';
import Shape from '../../shape';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { onOutsideClickModal } from '../../../appredux/features/editor-modal/editorModalSlice';
import { createNewLayer } from '../../../appredux/features/amp-story/ampStorySlice';
import { generateGradientData } from '../../../utils/editorUtils';
import { layerTypes } from '../../../interfaces/layer-types';
import { shapes } from '../../../utils/builders';
import { useLazyGetGradientsQuery } from '../../../appredux/services/gradients/gradients';
import { useState } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

const VirtuosoContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 98px);
  grid-auto-rows: 98px;
  row-gap: 20px;
  padding: 0 17px 0 20px;
  justify-content: space-between;
`;

const EditorModalContentShapesWrapper = styled(EditorModalContentWrapper)`
  margin-top: -13px;
`;

const StyledVirtuoso = styled(VirtuosoGrid)`
  width: 100%;
  height: 100%;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  &:hover {
    scrollbar-width: thin;
    scrollbar-color: var(--shade-300-85) transparent;
  }
  &:hover::-webkit-scrollbar {
    width: 3px;
    border-radius: 2px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
  }
`;

const EditorModalShapeLabelWrapper = styled(EditorModalLabelsWrapper)`
  margin-bottom: 29px;
`;

const defaultParams = {
  offset: '',
};

const EditorModalShape = () => {
  const dispatch = useDispatch();
  const [gradientsActive, setGradientsActive] = useState(false);
  const [gradients, setGradients] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [offset, setOffset] = useState('');

  const onSelectShape = useCallback(
    async (index, gradientSvg) => {
      if (gradientSvg?.url) {
        const { data } = await api.get(gradientSvg.url);
        const svgData = generateGradientData(data);
        const id = generateId();

        dispatch(
          createNewLayer({
            type: layerTypes.GRADIENTS,
            colorObject: svgData?.colorObject,
            value: gradientSvg?.url,
            temporaryId: id,
            shape: svgData?.parsedShape,
          }),
        );

        return;
      }

      dispatch(createNewLayer({ type: layerTypes.SHAPE, shape: shapes[index].type }));
    },
    [dispatch],
  );

  const [fetchGradients, { data, isLoading, isFetching, isUninitialized }] = useLazyGetGradientsQuery();

  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchGradients({ offset, limit: 20 }, true);
    }
  }, [hasMore, fetchGradients, offset]);

  useEffect(() => {
    fetchGradients(defaultParams, true);
  }, [fetchGradients]);

  useEffect(() => {
    if (!isLoading && !isFetching && !isUninitialized && data) {
      const { contents, hasMore, offset } = data;

      setGradients((c) => [...c, ...contents]);
      setHasMore(hasMore);
      setOffset(offset);
    }
  }, [data, isFetching, isLoading, isUninitialized]);

  return (
    <OutsideClickHandler onOutsideClick={(event) => dispatch(onOutsideClickModal(event, layerTypes.SHAPE))}>
      <EditorModalWrapper>
        <EditorModalShapeLabelWrapper>
          <EditorModalLabel text={'Shapes'} isActive={!gradientsActive} onClick={() => setGradientsActive(false)} />
          <EditorModalLabel text={'Gradients'} isActive={gradientsActive} onClick={() => setGradientsActive(true)} />
        </EditorModalShapeLabelWrapper>

        {!gradientsActive && (
          <EditorModalContentShapesWrapper>
            {shapes.map((shape, index) => (
              <Shape
                key={`shape-${shape.id}`}
                type={layerTypes.SHAPE}
                shape={shape}
                shapeIndex={index}
                onSelectShape={onSelectShape}
              />
            ))}
          </EditorModalContentShapesWrapper>
        )}
        {gradientsActive && (
          <StyledVirtuoso
            totalCount={gradients.length}
            endReached={loadMore}
            overscan={500}
            itemContent={(index) => (
              <Shape
                type={layerTypes.GRADIENTS}
                shapeIndex={index}
                gradient={gradients[index]}
                onSelectShape={onSelectShape}
              />
            )}
            components={{
              List: VirtuosoContainer,
            }}
          />
        )}
      </EditorModalWrapper>
    </OutsideClickHandler>
  );
};

export default EditorModalShape;
