import { memo, ReactNode } from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: ${({ $isActive }) => ($isActive ? 'var(--primary-10)' : 'transparent')};
  color: ${({ $isActive }) => ($isActive ? 'var(--primary)' : 'var(--shade-300)')};
  border-radius: 6px;
  width: 32px;
  height: 32px;
  border: none;
  outline: none;
  cursor: pointer;
  transition: background 0.12s ease;
  ${({ $isActive, $isDisabled }) =>
    !$isActive &&
    !$isDisabled &&
    css`
      &:hover {
        background: var(--shade-500-85);
      }
    `}
`;

const EditorSidebarButtonWithIcon = ({
  isDisabled,
  isActive,
  children,
  onClick,
}) => {
  return (
    <Button $isDisabled={isDisabled} $isActive={isActive} type="button" onClick={onClick}>
      {children}
    </Button>
  );
};

EditorSidebarButtonWithIcon.defaultProps = {
  isActive: false,
};

export default memo(EditorSidebarButtonWithIcon);
