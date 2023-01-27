import styled, { css } from 'styled-components';
import { ChevronLeft, ChevronRight } from '../../../icons';

// const SliderArrowButton = ({ children }) => {
//   return <>{children}</>;
// };

const Button = styled.button`
  display: inline-flex;
  width: 24px;
  height: 24px;
  align-items: center;
  justify-content: center;
  background: none;
  color: ${({ isDisabled }) => (isDisabled ? 'var(--shade-300)' : 'var(--white)')};
  outline: none;
  border: none;
  cursor: pointer;
  & + & {
    margin-left: 8px;
  }
  ${({ $rotate }) =>
    $rotate &&
    css`
      transform: rotate(90deg);
    `}
`;

const ArrowButtonLeft = ({ isDisabled, onClick }) => {
  return (
    <Button isDisabled={isDisabled} onClick={onClick}>
      <ChevronLeft />
    </Button>
  );
};

const ArrowButtonRight = ({ isDisabled, onClick, rotate }) => {
  return (
    <Button isDisabled={isDisabled} onClick={onClick} $rotate={rotate}>
      <ChevronRight />
    </Button>
  );
};

export {
  ArrowButtonLeft,
  ArrowButtonRight
}
