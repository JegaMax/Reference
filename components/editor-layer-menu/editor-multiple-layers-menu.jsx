import { layerTypes } from 'interfaces/layer-types';
import { isNil } from 'lodash';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../../hooks';
import { createNewGroup, lockLayers, selectSelectedLayers } from '../../appredux/features/amp-story/ampStorySlice';
import { duplicateLayerAction } from '../../appredux/features/editor/helpers/helpersSlice';
import { stopPropagation } from '../../utils/common';
import { rotateRect } from '../../utils/commonUtils';
import { IconButton } from '../buttons';
import { DuplicateSlideSM, GroupSM, LockSM, UnlockSM } from '../icons';
import Styled from './editor-layer-menu-styled';

const constantOffsetTop = 5;
const rotatorOffset = 30;
const TOPMOST_MENU_POSITION = -46;

const EditorMultipleLayersMenu = () => {
  const dispatch = useDispatch();
  const [container, setContainer] = useState(null);
  const selectedLayers = useAppSelector(selectSelectedLayers);

  const hasGroupLayer = useMemo(() => selectedLayers?.some((sl) => sl.type === layerTypes.GROUP), [selectedLayers]);

  const getLayerData = useCallback((layer) => {
    let angle = 0,
      offsetX = 0,
      offsetY = 0,
      height = 0,
      width = 0,
      thickness = 0;
    if (layer) {
      angle = +layer.settings.generalSettings.rotate;
      offsetX = layer.settings.generalSettings.offsetX;
      offsetY = layer.settings.generalSettings.offsetY;
      width = layer.settings.layerSettings.width;
      height = layer.settings.layerSettings.height;
      thickness =
        layer?.settings?.layerSettings?.shapeStyles?.relativeThickness ??
        layer?.settings?.layerSettings?.shapeStyles?.thickness;
    }
    return {
      angle,
      offsetX,
      offsetY,
      height,
      width,
      thickness,
    };
  }, []);

  const dimensions = useMemo(() => {
    const firstLayer = selectedLayers?.[0];
    const {
      angle: firstAngle,
      offsetX: firstOffsetX,
      offsetY: firstOffsetY,
      height: firstHeight,
      width: firstWidth,
      thickness: firstThickness,
    } = getLayerData(firstLayer);

    const currentRotatedRect = rotateRect(
      firstAngle,
      +firstOffsetX,
      +firstOffsetY,
      firstWidth,
      firstHeight,
      firstThickness,
    );

    let aboveMenuPosition =
      Math.min(currentRotatedRect[0][1], currentRotatedRect[1][1], currentRotatedRect[2][1], currentRotatedRect[3][1]) -
      (container?.height ?? 0) -
      constantOffsetTop -
      (firstAngle >= 145 || firstAngle <= -145 ? rotatorOffset : 0);

    let leftMenuPosition = Math.min(
      currentRotatedRect[0][0],
      currentRotatedRect[1][0],
      currentRotatedRect[2][0],
      currentRotatedRect[3][0],
    );

    let rightMenuPosition = Math.max(
      currentRotatedRect[0][0],
      currentRotatedRect[1][0],
      currentRotatedRect[2][0],
      currentRotatedRect[3][0],
    );

    selectedLayers?.forEach((layer) => {
      const { angle, offsetX, offsetY, height, width, thickness } = getLayerData(layer);

      const rotatedRect = rotateRect(angle, +offsetX, +offsetY, width, height, thickness);

      const newAboveMenuPosition =
        Math.min(rotatedRect[0][1], rotatedRect[1][1], rotatedRect[2][1], rotatedRect[3][1]) -
        (container?.height ?? 0) -
        constantOffsetTop -
        (angle >= 145 || angle <= -145 ? rotatorOffset : 0);

      aboveMenuPosition = newAboveMenuPosition > aboveMenuPosition ? aboveMenuPosition : newAboveMenuPosition;

      const newLeftMenuPosition = Math.min(rotatedRect[0][0], rotatedRect[1][0], rotatedRect[2][0], rotatedRect[3][0]);
      leftMenuPosition = newLeftMenuPosition > leftMenuPosition ? leftMenuPosition : newLeftMenuPosition;

      const newRightMenuPosition = Math.max(rotatedRect[0][0], rotatedRect[1][0], rotatedRect[2][0], rotatedRect[3][0]);
      rightMenuPosition = newRightMenuPosition > rightMenuPosition ? newRightMenuPosition : rightMenuPosition;
    });

    const offsetX = (leftMenuPosition + rightMenuPosition) / 2;

    return {
      offsetX: offsetX - (container?.width ?? 0) / 2,
      offsetY: aboveMenuPosition,
    };
  }, [container?.height, container?.width, getLayerData, selectedLayers]);

  const ref = useRef(null);

  const locked = useMemo(() => selectedLayers?.some((selectedLayer) => selectedLayer.settings.generalSettings.locked), [
    selectedLayers,
  ]);

  const belowMenuPosition = useMemo(() => {
    const currentDimensions = selectedLayers?.reduce(
      (acc, currentLayer) => {
        const data = getLayerData(currentLayer);
        if (data.offsetY < acc.minOffset) {
          acc.minOffset = data.offsetY;
        }

        if (data.offsetY > acc.maxOffset) {
          acc.maxOffset = data.offsetY;
          acc.height = data.height;
        }

        return acc;
      },
      { minOffset: Infinity, maxOffset: -Infinity, height: -Infinity },
    );

    if (currentDimensions) {
      const offset = currentDimensions.maxOffset - currentDimensions.minOffset;
      const finalHeight = currentDimensions.height + offset;
      return dimensions.offsetY + (finalHeight ?? 0) + (container?.height ?? 0) + rotatorOffset + 12;
    }

    return 0;
  }, [container?.height, dimensions.offsetY, getLayerData, selectedLayers]);

  const isMenuOverHeader = useMemo(() => dimensions?.offsetY < TOPMOST_MENU_POSITION, [dimensions?.offsetY]);

  const containerOffsetTop = useMemo(() => (isMenuOverHeader ? belowMenuPosition : dimensions?.offsetY), [
    isMenuOverHeader,
    belowMenuPosition,
    dimensions?.offsetY,
  ]);

  const handleLayerDuplicate = (event) => {
    event.stopPropagation();
    dispatch(duplicateLayerAction());
  };

  const handleLayerToggleLock = (event) => {
    event.stopPropagation();
    dispatch(lockLayers(!locked));
  };

  const handleGroupCreate = (event) => {
    event.stopPropagation();
    dispatch(createNewGroup());
  };

  useEffect(() => {
    if (ref.current) {
      setContainer(ref?.current?.getBoundingClientRect());
    }
  }, [locked]);

  if (locked) {
    return (
      <Styled.Container
        ref={ref}
        id="multiselect-layers-menu"
        isMenuOverHeader={isMenuOverHeader}
        top={containerOffsetTop}
        left={dimensions?.offsetX ?? 0}
        isContainerVisible={!isNil(container)}
        isCtaLayer={false}
        layerTextContentLength={0}
        onClick={stopPropagation}
      >
        <IconButton
          padding={'0'}
          background={'transparent'}
          isBackdropActive={false}
          isBoxShadowActive={false}
          onMouseDown={handleLayerToggleLock}
          isActive={locked}
        >
          {locked ? <LockSM /> : <UnlockSM />}
        </IconButton>
      </Styled.Container>
    );
  }

  return (
    <Styled.Container
      ref={ref}
      id="multiselect-layers-menu"
      isMenuOverHeader={isMenuOverHeader}
      top={containerOffsetTop}
      left={dimensions?.offsetX ?? 0}
      isContainerVisible={!isNil(container)}
      isCtaLayer={false}
      layerTextContentLength={0}
      onClick={stopPropagation}
    >
      {!hasGroupLayer && (
        <IconButton
          padding="0"
          background="transparent"
          isBackdropActive={false}
          isBoxShadowActive={false}
          onMouseDown={handleGroupCreate}
        >
          <GroupSM />
        </IconButton>
      )}
      <IconButton
        padding={'0'}
        background={'transparent'}
        isBackdropActive={false}
        isBoxShadowActive={false}
        onMouseDown={handleLayerDuplicate}
      >
        <DuplicateSlideSM />
      </IconButton>

      <IconButton
        padding={'0'}
        background={'transparent'}
        isBackdropActive={false}
        isBoxShadowActive={false}
        onMouseDown={handleLayerToggleLock}
        isActive={locked}
      >
        {locked ? <LockSM /> : <UnlockSM />}
      </IconButton>
    </Styled.Container>
  );
};

export default memo(EditorMultipleLayersMenu);
