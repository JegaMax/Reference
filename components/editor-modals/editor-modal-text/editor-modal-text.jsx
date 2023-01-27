import { useCallback, useState, memo, useRef } from 'react';
import styled from 'styled-components';
import FontStylesModule from 'components/settings/font-settings/font-styles-module';
import { onOutsideClickModal } from 'appredux/features/editor-modal/editorModalSlice';
import { layerTypes } from 'interfaces/layer-types';
import Modal from 'react-modal';
import OutsideClickHandler from 'react-outside-click-handler';
import { FontSettings } from 'components/settings/font-settings';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setFontStyleModalState } from 'appredux/features/editor/helpers/helpersSlice';

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 260px;
  max-height: 520px;
  padding: 0;
  z-index: 2;
  background: var(--shade-900-85);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 12px;
  left: calc(100% + 8px);
  top: 0px;
  padding: 22px 24px;
  box-sizing: border-box;
  & * {
    box-sizing: inherit;
  }
`;

const Title = styled.h3`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;

const StyledLink = styled.p`
  color: var(--shade-100);
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  font-family: Heebo;
  cursor: pointer;
  padding: 12px 0;
  border: 1px solid var(--shade-100);
  border-radius: 8px;
  width: 100%;
  text-align: center;
  margin: 0;
  &:hover {
    color: var(--shade-100-85);
  }
`;

const customStyles = {
  overlay: {
    backgroundColor: 'var(--shade-500-85)',
    zIndex: 9999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '12px',
    border: 'none',
    boxShadow: '24px 32px 72px var(--black-18)',
    display: 'flex',
    background: 'var(--shade-900-95)',
    overflow: 'visible',
    maxWidth: '936px',
  },
};

const EditorModalText = () => {
  const dispatch = useAppDispatch();
  const offsetTop = useAppSelector((state) => state.editorModal.offsetTop);

  const ref = useRef(null);

  const [isFontStyleModalOpen, setFontStyleModalOpen] = useState(false);
  const [height, setHeight] = useState(464);

  const onOutsideClick = useCallback(
    (event) => {
      if (isFontStyleModalOpen === false) {
        dispatch(onOutsideClickModal(event, layerTypes.TEXT));
      }
    },
    [dispatch, isFontStyleModalOpen],
  );

  const handleModalState = useCallback(() => {
    setFontStyleModalOpen(!isFontStyleModalOpen);
    dispatch(setFontStyleModalState(!isFontStyleModalOpen));
  }, [dispatch, isFontStyleModalOpen]);

  const onModalCloseHandler = () => {
    setFontStyleModalOpen(false);
  };

  return (
    <>
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <ModalWrapper style={{ top: `${offsetTop}px`, height: `${height}px` }} ref={ref}>
          <Title>Text Styles</Title>
          <FontStylesModule isModalShownInEditor={true} />
          <LinkWrapper>
            <StyledLink onClick={handleModalState}>Edit text styles</StyledLink>
          </LinkWrapper>
        </ModalWrapper>
      </OutsideClickHandler>

      <Modal
        id={'font-style-settings-modal'}
        closeTimeoutMS={300}
        isOpen={isFontStyleModalOpen}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        ariaHideApp={false}
      >
        <OutsideClickHandler onOutsideClick={onModalCloseHandler}>
          <FontSettings />
        </OutsideClickHandler>
      </Modal>
    </>
  );
};

export default memo(EditorModalText);
