import React from 'react';
import styled from 'styled-components';
import { RoundPlus } from '../icons';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  background: transparent;
  padding: 5px 0;
  border: none;
  width: auto;
  &:focus {
    outline: none;
  }
`;

const Icon = styled(RoundPlus)`
  width: 18px;
  height: 18px;
`;

const Text = styled.span`
  display: inline-block;
  padding-left: 6px;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const AddButton = ({ className, text, onClick }) => {
  return (
    <Button className={className} onClick={onClick}>
      <Icon />
      <Text>{text}</Text>
    </Button>
  );
};

AddButton.defaultProps = {
  text: 'Add',
};

export default AddButton;
