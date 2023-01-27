import React from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { ModalPublishedOuterWrapper, SuccessModalInnerWrapper } from './shared/structure';
import { ModalWrapper } from './../shared/modal';
import { useDispatch } from 'react-redux';
import { setIsSocialMediaSuccessModalOpen } from './../../appredux/features/export/exportSlice';
import styled from 'styled-components';
import { SuccessImage, SuccessSubText, SuccessText } from './shared/elements';

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  padding: 8px 20px;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
  border-radius: 6px;
  box-shadow: 0px 4px 12px var(--black-16);
  width: 100%;
  background: var(--primary);
  color: var(--shade-900);
  border-color: var(--primary);
  max-width: 180px;
`;

const SocialMediaSuccessModal = () => {
  const dispatch = useDispatch();
  const onCloseSocialMediaModal = () => dispatch(setIsSocialMediaSuccessModalOpen(false));

  return (
    <ModalPublishedOuterWrapper>
      <OutsideClickHandler display="flex" onOutsideClick={onCloseSocialMediaModal}>
        <ModalWrapper>
          <SuccessModalInnerWrapper padding="65">
            <HeaderWrapper>
              <SuccessImage />
              <SuccessText width="170px" text="Your story was successfully sent via e-mail" />
            </HeaderWrapper>
            <BodyWrapper>
              <SuccessSubText
                width="182px"
                margin="0 0 29px"
                text="It can take a few minutes for the e-mail to arrive."
              />
              <Button onClick={onCloseSocialMediaModal}>Back to editor</Button>
            </BodyWrapper>
          </SuccessModalInnerWrapper>
        </ModalWrapper>
      </OutsideClickHandler>
    </ModalPublishedOuterWrapper>
  );
};

export default SocialMediaSuccessModal;
