import React, { MouseEventHandler } from 'react';
import { DeleteSM } from '../../icons';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  width: 20px;
  height: 20px;
  background: var(--shade-300);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 50%;
  position: absolute;
  opacity: 0;
  top: 0;
  right: 0;
  transform: translate(30%, -30%);
  cursor: pointer;
  display:flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  z-index: 2;
  svg > * {
    fill: var(--white);
    }
  }
  @supports((-webkit-backdrop-filter: blur(50px)) or (backdrop-filter: blur(50px)) or (-moz-backdrop-filter: blur(50px))){
    background: transparent;
    backdrop-filter: blur(50px);
  }
`;

const DeleteListItemButton = ({ className, onClick }) => {
  return (
    <ButtonWrapper className={className} onClick={onClick}>
      <DeleteSM />
    </ButtonWrapper>
  );
};

export default DeleteListItemButton;
