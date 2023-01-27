import styled from 'styled-components';

const Button = styled.button`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  color: ${({ isDisabled }) => (isDisabled ? 'var(--shade-100-20)' : 'var(--shade-100)')};
  border: 1px solid ${({ isDisabled }) => (isDisabled ? 'var(--shade-100-20)' : 'var(--shade-100)')};
  letter-spacing: 0.01em;
  filter: drop-shadow(0px 4px 12px var(--black-16));
  background: none;
  cursor: pointer;
  ${({ isDisabled }) =>
    isDisabled &&
    `
      &&&&& {
        color: var(--shade-100-20);
        background: none;
        cursor: default;
      }
  `}
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
`;

const QuaternaryButton = ({
  className,
  text,
  isDisabled,
  sizeType,
  onClick,
  ...rest
}) => {
  return (
    <Button className={className} isDisabled={isDisabled} sizeType={sizeType} onClick={onClick} {...rest}>
      {text}
    </Button>
  );
};

QuaternaryButton.defaultProps = {
  sizeType: 'medium',
};

export default QuaternaryButton;
