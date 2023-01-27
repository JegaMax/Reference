import { useRef } from 'react';
import styled, { css } from 'styled-components';

import SettingsPlusBtnSM from '../settings-plus-btn-sm';

const StyledSettingsImageInput = styled.div`
  ${({ nonVisible }) =>
    nonVisible &&
    css`
      opacity: 0;
      position: absolute;
      top: 0;
      left: 0;
    `}
  svg > * {
    fill: var(--shade-100);
  }
`;

const HiddenInput = styled.input`
  display: none;
`;


const SettingsImageInput = ({
  acceptedFileTypes,
  onClick,
  isDisabled,
  nonVisible,
}) => {
  const hiddenInputRef = useRef(null);

  return (
    <StyledSettingsImageInput nonVisible={nonVisible}>
      <SettingsPlusBtnSM
        isDisabled={isDisabled}
        onClick={() => {
          if (hiddenInputRef.current && !isDisabled) {
            hiddenInputRef.current.click();
          }
        }}
      />
      <HiddenInput accept={acceptedFileTypes} type="file" ref={hiddenInputRef} onChange={onClick} />
    </StyledSettingsImageInput>
  );
};

export default SettingsImageInput;
