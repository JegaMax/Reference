import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled(Link)`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  color: ${({ $isDisabled }) => ($isDisabled ? 'var(--shade-100-20)' : 'var(--shade-100)')};
  border: 1px solid ${({ $isDisabled }) => ($isDisabled ? 'var(--shade-100-20)' : 'var(--shade-100)')};
  letter-spacing: 0.01em;
  filter: drop-shadow(0px 4px 12px var(--black-16));
  background: none;
  text-decoration: none;
  ${({ $sizeType }) =>
    $sizeType === 'small'
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

const QuaternaryLinkButton = ({ className, to, text, isDisabled, sizeType }) => {
  return (
    <Button className={className} to={to} $isDisabled={isDisabled} $sizeType={sizeType}>
      {text}
    </Button>
  );
};

QuaternaryLinkButton.defaultProps = {
  sizeType: 'medium',
};

export default QuaternaryLinkButton;
