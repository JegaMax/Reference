import Error from '../../shared/error';
import InputBasic from '../../shared/input-basic';
import SettingsLabel from './settings-label';
import styled from 'styled-components';
import { ChangeEvent, useMemo, useState } from 'react';
import { EyeIcon, DuplicateSlideSM } from 'components/icons';

const StyledSettingsInputWithLabel = styled.div`
  min-width: 228px;
  position: relative;
  ${({ canCopy }) =>
    canCopy &&
    `
    &&& {
      >div:last-child {
        top: unset;
        bottom: -8px;
        right: 6px;
      }
    }
  `}
`;

const StyledInput = styled(InputBasic)`
  & input {
    width: 100% !important;
  }
  ${({ canCopy }) =>
    canCopy &&
    `
    & input {
      padding-right: 32px;
    }
  `}
`;

const StyledEyeIconWrapper = styled.div`
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  svg {
    display: block;
  }
  * {
    color: var(--white);
    fill: var(--white);
  }
  ${({ isDisabled }) =>
    isDisabled &&
    `
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 19px;
      height: 1px;      
      background: var(--white);
      color: var(--white);
      top: 8px;
      left: 0px;
      z-index: 9999;
      transform: rotate(45deg);
    }
  `}

  ${({ removeEvents }) => removeEvents && `pointer-events: none !important;`}
`;

const StyledEyeIcon = styled(EyeIcon)``;

const StyledCopyIcon = styled(DuplicateSlideSM)``;

const SettingsInputWithLabel = ({
  name,
  label,
  value,
  error,
  className,
  autoFocus,
  isDisabled,
  isReadOnly,
  placeholder,
  onChange,
  onClick,
  hasReveal,
  size,
  canCopy,
}) => {
  const [reveal, setReveal] = useState(false);
  const handleReveal = () => setReveal((v) => !v);
  const type = useMemo(() => {
    if (hasReveal) {
      if (reveal) {
        return 'text';
      }
      return 'password';
    }

    return undefined;
  }, [hasReveal, reveal]);

  return (
    <StyledSettingsInputWithLabel canCopy={canCopy}>
      {label && <SettingsLabel label={label} />}
      <StyledInput
        className={className}
        onChange={onChange}
        onClick={onClick}
        name={name}
        value={value}
        placeholder={placeholder}
        hasError={Boolean(error)}
        autoFocus={autoFocus}
        isDisabled={isDisabled}
        isReadOnly={isReadOnly}
        type={type}
        size={size}
        canCopy={canCopy}
      />
      {hasReveal && (
        <StyledEyeIconWrapper isDisabled={reveal} onClick={handleReveal}>
          <StyledEyeIcon />
        </StyledEyeIconWrapper>
      )}
      {error && <Error text={error} />}
      {canCopy && (
        <StyledEyeIconWrapper removeEvents>
          <StyledCopyIcon />
        </StyledEyeIconWrapper>
      )}
    </StyledSettingsInputWithLabel>
  );
};

export default SettingsInputWithLabel;
