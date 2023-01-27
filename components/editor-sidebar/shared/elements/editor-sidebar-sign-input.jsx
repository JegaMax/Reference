import { memo } from 'react';
import InputDynamicWidth from '../../../shared/input-dynamic-width';
import styled from 'styled-components';

const SignWrapper = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-300);
  margin-left: 2px;
  pointer-events: none;
  user-select: none;
`;

const EditorSidebarSignInput = ({ isDisabled, value, sign, onKeyDown, onChange, onBlur }) => {
  return (
    <InputDynamicWidth isDisabled={isDisabled} value={value} onKeyDown={onKeyDown} onChange={onChange} onBlur={onBlur}>
      <SignWrapper>{sign}</SignWrapper>
    </InputDynamicWidth>
  );
};

export default memo(EditorSidebarSignInput);
