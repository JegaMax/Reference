import React from 'react';
import styled from 'styled-components';
import Check from '../icons/check';

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--white-20);
  box-sizing: border-box;
  backdrop-filter: blur(50px);
  border-radius: 4px;
  color: var(--primary);
  width: 18px;
  height: 18px;
`;

const Label = styled.span`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin-left: 8px;
`;

const Checkbox = ({ isChecked, label, onClick }) => {
  return (
    <Wrapper>
      <CheckboxWrapper onClick={onClick}>{isChecked && <Check />}</CheckboxWrapper>
      {label && <Label>{label}</Label>}
    </Wrapper>
  );
};

export default Checkbox;
