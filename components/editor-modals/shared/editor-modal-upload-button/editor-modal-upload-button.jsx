import React, { useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';
import plusImage from './images/editor-modal/plus.svg';

const UploadButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${({ isDisabled }) => (isDisabled ? 'var(--primary-20)' : 'var(--primary)')};
  border-radius: 50%;
  width: 28px;
  height: 28px;
  border: none;
  outline: none;
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      pointer-events: none;
    `}
`;

const HiddenInput = styled.input`
  display: none;
`;

const EditorModalUploadButton = ({ isDisabled, acceptedFileTypes, onClick }) => {
  const hiddenInputRef = useRef(null);

  const onButtonClick = useCallback(() => {
    if (hiddenInputRef.current && !isDisabled) {
      hiddenInputRef.current.click();
    }
  }, [isDisabled]);

  return (
    <>
      <UploadButton isDisabled={isDisabled} type="button" onClick={onButtonClick}>
        <img src={plusImage} alt="Plus" />
      </UploadButton>
      <HiddenInput accept={acceptedFileTypes} type="file" ref={hiddenInputRef} onChange={onClick} />
    </>
  );
};

export default EditorModalUploadButton;
