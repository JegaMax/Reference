import { memo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createNewLayer } from '../../appredux/features/amp-story/ampStorySlice';
import { closeModal, openModal } from '../../appredux/features/editor-modal/editorModalSlice';
import Styled from './layer-menu-styled';

import { useDispatch, useSelector } from 'react-redux';
import { toolbarResizeObserver } from '../../utils/resizeObservers';
/* eslint-disable @typescript-eslint/no-var-requires */

const LayerMenu = () => {
  const dispatch = useDispatch();

  const [_, updateRef] = useState(0);
  const layersMenuConfig = useSelector((state) => state.helpers.layersMenuConfig);
  const isModalOpen = useSelector((state) => state.editorModal.isOpen);
  const modalType = useSelector((state) => state.editorModal.modalType);
  const layerItemRef = useRef([]);
  const layerMenuWrapperRef = useRef(null);

  useEffect(() => {
    if (layerMenuWrapperRef?.current) {
      toolbarResizeObserver.observe(layerMenuWrapperRef.current);
    }

    return () => {
      if (layerMenuWrapperRef?.current) {
        toolbarResizeObserver.unobserve(layerMenuWrapperRef.current);
      }
    };
  }, []);

  const onMenuItemClick = (
    title,
    itemModalType,
    offsetTop,
  ) => () => {
    if (isModalOpen && modalType === itemModalType) {
      return dispatch(closeModal());
    }

    if (itemModalType) {
      return dispatch(openModal(itemModalType, offsetTop));
    }

    return dispatch(createNewLayer({ type: title }));
  };

  // useEffect(() => {
  //   dispatch(setLayersMenuConfig({ condition: videoCutLimited, index: 2 }));
  // }, [dispatch, videoCutLimited]);

  const getMenuIcon = (currentItem) => {
    if (currentItem?.classes?.locked) {
      return currentItem.imageDisabledSrc;
    }

    return modalType?.toLocaleLowerCase().includes(currentItem.name)
      ? currentItem.imageActiveSrc
      : currentItem.imageSrc;
  };

  // Refresh offsets
  useLayoutEffect(() => {
    updateRef((v) => v + 1);
  }, []);

  return (
    // Check if the output is satisfying enough
    <Styled.NewLayerMenuWrapper>
      {layersMenuConfig.map((layerMenuItem, index) => {
        const offsetTop = layerItemRef?.current[index]?.offsetTop;
        return (
          <Styled.LayerItem
            key={layerMenuItem.name}
            isActive={modalType === layerMenuItem.modalType}
            isLocked={layerMenuItem?.classes?.locked}
            ref={(element) => (layerItemRef.current[index] = element)}
            onClick={onMenuItemClick(layerMenuItem.name, layerMenuItem?.modalType, offsetTop)}
          >
            <Styled.StyledDiv>
              <img
                id={layerMenuItem.name}
                src={require(`./images/toolbar_icons/${getMenuIcon(layerMenuItem)}`).default}
                alt="Toolbar-icon"
              />
              <span
                style={{
                  pointerEvents: 'none',
                  position: 'absolute',
                  top: '50%',
                  left: 40,
                  transform: 'translateY(-50%)',
                  fontFamily: 'Heebo',
                  fontWeight: 'normal',
                  fontSize: '12px',
                  lineHeight: '18px',
                  color: 'var(--shade-100)',
                  padding: '7px 12px',
                  background: 'var(--shade-900)',
                  borderRadius: '6px',
                  backdropFilter: 'blur(50px)',
                  boxShadow: '24px 32px 72px rgba(0, 0, 0, 0.18)',
                  zIndex: 999,
                }}
              >
                {layerMenuItem.matTooltip}
              </span>
            </Styled.StyledDiv>
          </Styled.LayerItem>
        );
      })}
    </Styled.NewLayerMenuWrapper>
  );
};

export default memo(LayerMenu);
