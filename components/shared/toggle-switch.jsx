import { memo } from 'react';
import styled, { css } from 'styled-components';

const ToggleSwitchWrapper = styled.label`
  position: relative;
  display: inline-block;
  width: ${({ size }) => (size === 'small' ? '20px' : '30px')};
  height: ${({ size }) => (size === 'small' ? '12px' : '18px')};
  ${({ isClickable }) =>
    !isClickable &&
    css`
      pointer-events: none;
    `}
`;

const ToggleSwitchInput = styled.input`
  display: none;
`;

const Switch = styled.span`
  position: absolute;
  cursor: pointer;
  background-color: var(--shade-300-85);
  border-radius: 25px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transition: background-color 0.12s ease;
  &::before {
    position: absolute;
    content: '';
    left: ${({ size }) => (size === 'small' ? '1px' : '2px')};
    top: ${({ size }) => (size === 'small' ? '1px' : '2px')};
    width: ${({ size }) => (size === 'small' ? '10px' : '14px')};
    height: ${({ size }) => (size === 'small' ? '10px' : '14px')};
    background-color: var(--white);
    border-radius: 50%;
    transition: transform 0.12s ease;
    ${({ isOn }) =>
      isOn &&
      css`
        transform: translateX(calc(100% - 1px));
      `}
  }
  ${({ isOn }) =>
    isOn &&
    css`
      background-color: var(--primary);
    `}
  ${({ isHovered }) =>
    isHovered &&
    css`
      background: var(--shade-900);
    `}
`;

const ToggleSwitch = ({
  size = 'small',
  isHovered,
  isOn,
  onClick,
  className,
}) => {
  return (
    <ToggleSwitchWrapper size={size} isClickable={Boolean(onClick)} className={className}>
      <ToggleSwitchInput
        type="checkbox"
        {...(onClick ? { checked: isOn } : { defaultChecked: isOn })}
        onChange={onClick}
      />
      <Switch size={size} isOn={isOn} isHovered={isHovered} />
    </ToggleSwitchWrapper>
  );
};

export default memo(ToggleSwitch);
