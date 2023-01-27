import styled from 'styled-components';

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  color: var(--shade-900);
  border: 1px solid transparent;
  letter-spacing: 0.01em;
  cursor: pointer;
  filter: drop-shadow(0px 4px 12px var(--black-16));
  background: ${({ isDisabled }) => (isDisabled ? 'var(--shade-100-20)' : 'var(--shade-100)')};
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

const SecondaryButton = ({ className, text, isDisabled, sizeType, onClick }) => {
  return (
    <Button className={className} isDisabled={isDisabled} sizeType={sizeType} onClick={onClick}>
      {text}
    </Button>
  );
};

SecondaryButton.defaultProps = {
  sizeType: 'medium',
};

export default SecondaryButton;
