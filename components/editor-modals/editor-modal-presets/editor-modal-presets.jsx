import { memo, useCallback, useLayoutEffect, useRef, useState } from 'react';

import styled from 'styled-components';

import { layerTypes } from 'interfaces/layer-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { onOutsideClickModal } from 'appredux/features/editor-modal/editorModalSlice';
import EditorModalCustomPresets from './editor-modal-custom-presets';
import EditorModalPresetsHeader from './editor-modal-presets-header';
import EditorModalSwipeupPresets from './editor-modal-swipeup-presets';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 260px;
  padding: 0;
  z-index: 2;
  overflow: hidden;
  background: var(--shade-900-85);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 12px;
  left: calc(100% + 8px);
  top: 0px;
  box-sizing: border-box;
  & * {
    box-sizing: inherit;
  }
`;

const WidgetFooter = styled.div`
  padding: 12px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled.a`
  font-size: 12px;
  color: var(--shade-100);
  font-family: Heebo;
  &:hover {
    color: var(--shade-100-85);
  }
`;

const ScrollContainer = styled.div`
  overflow: overlay;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    width: 2px;
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

const EditorModalPresets = () => {
  const offsetTop = useSelector((state) => state.editorModal.offsetTop);
  const ref = useRef(null);
  const [height, setHeight] = useState(464);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (ref?.current) {
      const elementDimensions = ref?.current?.getBoundingClientRect();

      if (window.innerHeight - 24 - 50 - elementDimensions.top - 10 < 464) {
        setHeight(window.innerHeight - 22 - 50 - elementDimensions.top);
        return;
      }

      setHeight(window.innerHeight - elementDimensions.top - 10);
    }
  }, [setHeight, offsetTop]);

  const onOutsideClick = useCallback(
    (event) => dispatch(onOutsideClickModal(event, layerTypes.OUTLINK)),
    [dispatch],
  );

  return (
    <OutsideClickHandler onOutsideClick={onOutsideClick}>
      <ModalWrapper style={{ top: `${offsetTop}px`, maxHeight: `${height}px` }} ref={ref}>
        <EditorModalPresetsHeader />
        <ScrollContainer>
          <EditorModalSwipeupPresets />
          <EditorModalCustomPresets />
        </ScrollContainer>
        <WidgetFooter>
          <StyledLink
            href="https://help.zazuapp.co/en/article/add-and-edit-a-call-to-action-di92fx/#3-swipe-up-cta-vs-custom-cta"
            target="_blank"
          >
            Learn about Swipe Up vs Custom buttons
          </StyledLink>
        </WidgetFooter>
      </ModalWrapper>
    </OutsideClickHandler>
  );
};

export default memo(EditorModalPresets);
