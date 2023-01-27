import isNil from 'lodash/isNil';
import { memo } from 'react';
import styled, { css } from 'styled-components';
import { useSpinner } from '../../hooks';

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  width: fit-content;
  min-width: 0;
  max-width: fit-content;

  position: relative;
  transition: padding 300ms;
  transition-timing-function: ease-in-out;

  background: var(--primary);
  box-shadow: 0px 4px 12px var(--black-16);
  border-radius: 6px;
  border: 1px solid var(--primary);
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--shade-900);
  outline: none;
  ${({ sizeType }) =>
    sizeType === 'small'
      ? `
    font-size: 10px;
    line-height: 14px;
    border-radius: 4px;
    padding: 5.5px 8px 4.5px;
    `
      : `
    font-size: 12px;
    line-height: 16px;
    border-radius: 6px;
    padding: 8.5px 12px 7.5px;
    `}
  ${({ isDisabled }) =>
    isDisabled &&
    css`
      background: var(--primary-20);
      cursor: default;
      pointer-events: none;
      border: 1px solid transparent;
    `}
  ${({ isLoading }) =>
    isLoading &&
    css`
      padding-left: 2rem !important;
    `};
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  line-height: 0;
  transition: opacity 300ms ease-in-out;
  transition-delay: 150ms;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const Icon = styled.img`
  margin-right: 5px;
`;

const PrimaryButton = ({
  className,
  text,
  type,
  sizeType,
  onClick,
  iconPath,
  isDisabled,
  loader = false,
  isLoading = false,
}) => {
  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'ClipLoader',
    size: 12,
    color: '#14141f',
  });

  const onButtonClick = () => {
    if (!isDisabled && !isNil(onClick)) {
      onClick();
    }
  };

  return (
    <Button
      className={className}
      onClick={onButtonClick}
      sizeType={sizeType}
      isDisabled={isDisabled}
      isLoading={isLoading}
      type={type ?? 'button'}
    >
      {iconPath && <Icon src={iconPath} />}
      {loader && (
        <SpinnerWrapper isVisible={isLoading}>
          <Spinner {...spinnerProps} isVisible={isLoading} />
        </SpinnerWrapper>
      )}
      {text}
    </Button>
  );
};

PrimaryButton.defaultProps = {
  sizeType: 'medium',
};

export default memo(PrimaryButton);
