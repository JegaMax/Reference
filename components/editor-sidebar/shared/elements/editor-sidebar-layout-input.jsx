import { memo } from 'react';
import InputDynamicWidth from '../../../shared/input-dynamic-width';
import styled from 'styled-components';

const StyledEditorSidebarInput = styled(InputDynamicWidth)`
  & {
    padding-right: 25px;
  }
`;

const SignWrapper = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-300);
  pointer-events: none;
`;

const EditorSidebarLayoutInput = ({
  isDisabled,
  value,
  type,
  sign,
  onKeyDown,
  onChange,
}) => {
  return (
    <StyledEditorSidebarInput
      isDisabled={isDisabled}
      type={type}
      value={value}
      onKeyDown={onKeyDown}
      onChange={onChange}
    >
      <SignWrapper>{sign}</SignWrapper>
    </StyledEditorSidebarInput>
  );
};

export default memo(EditorSidebarLayoutInput);
