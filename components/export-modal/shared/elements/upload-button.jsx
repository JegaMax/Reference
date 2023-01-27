import React from 'react';
import styled from 'styled-components';

const Button = styled.label`
  display: block;
  padding: 8.5px 12px 7.5px;
  background: var(--shade-100);
  box-shadow: 0px 4px 12px var(--black-16);
  border-radius: 6px;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: var(--shade-900);
  width: 100%;
  transition: 0.12s ease;
  border: none;
  outline: none;
  text-align: center;
  align-self: flex-end;
  &:hover,
  &:focus {
    background: var(--shade-300);
  }
`;

const Input = styled.input`
  display: none;
`;

const UploadButton = ({ value, onChange }) => {
  return (
    <Button>
      Upload Image <Input accept=".jpg, .jpeg, .png" type="file" value={value} onChange={onChange} />
    </Button>
  );
};

export default UploadButton;
