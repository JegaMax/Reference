import Modal from 'react-modal';
import styled from 'styled-components';
import { PrimaryButton, SecondaryButton } from '../buttons';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const MessageContainer = styled.div`
  flex-grow: 10;
  display: flex;
  flex-direction: column;
  margin: 0 0 21px;
`;

const Message = styled.h1`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: var(--white);
  letter-spacing: 0.01em;
  margin: 0;
  white-space: pre-wrap;
`;

const SubMessage = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 8px 0 0;
`;

const ButtonContainer = styled.div`
  flex-grow: 1;
  align-self: flex-end;
  width: 100%;
`;

const AcceptButton = styled(PrimaryButton)`
  width: 100%;
  max-width: 100%;
  margin-bottom: 12px;
  & {
    max-width: 100%;
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
    padding: '32px 24px',
    maxWidth: '280px',
    borderRadius: '8px',
    border: 'none',
    boxShadow: '24px 32px 72px var(--black-18)',
    display: 'flex',
    background: 'var(--shade-900-85)',
  },
};

const CancelButton = styled(SecondaryButton)`
  width: 100%;
  justify-content: center;
`;

const MessageModal = ({
  isOpen,
  onCancel,
  onAccept,
  message,
  itemName,
  description,
  acceptButtonText = itemName ? `Delete ${itemName}` : 'Accept',
  cancelButtonText = 'Cancel',
  shouldCloseOnOverlayClick,
}) => {
  return (
    <Modal
      closeTimeoutMS={300}
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={onCancel}
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      ariaHideApp={false}
    >
      <ModalContainer>
        <MessageContainer>
          <Message>{message}</Message>

          {description && <SubMessage>{description}</SubMessage>}
        </MessageContainer>
        <ButtonContainer>
          {onAccept && <AcceptButton text={acceptButtonText} onClick={onAccept} />}

          {onCancel && <CancelButton text={cancelButtonText} onClick={onCancel} />}
        </ButtonContainer>
      </ModalContainer>
    </Modal>
  );
};

export default MessageModal;
