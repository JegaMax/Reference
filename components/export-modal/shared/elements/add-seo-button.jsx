import React from 'react';
import styled from 'styled-components';
// import { Plus } from '../../../icons';
import plus from 'components/icons/plus';

const AddButtonWrapper = styled.button`
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  outline: none;
  background: transparent;
`;

const AddButtonIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--shade-100);
  margin-right: 6px;
  width: 18px;
  height: 18px;
`;

const AddButtonIcon = styled(plus)`
    width: 6.43px
    height: 6.43px
    color: var(--shade-900);
`;

const AddButtonLabel = styled.span`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const AddSeoButton = ({ onClick }) => {
  return (
    <AddButtonWrapper onClick={onClick}>
      <AddButtonIconWrapper>
        <AddButtonIcon />
      </AddButtonIconWrapper>

      <AddButtonLabel>Add</AddButtonLabel>
    </AddButtonWrapper>
  );
};

export default AddSeoButton;
