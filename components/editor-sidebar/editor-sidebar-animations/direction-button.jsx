import ArrowUp from 'components/icons/arrow-up';
import { memo } from 'react';
import styled, { css } from 'styled-components';

export const Direction = {
  top : "TOP",
  right: "RIGHT",
  bottom: "BOTTOM",
  left: "LEFT",
}

const getRotation = (direction) => {
  if (direction === Direction.top) {
    return 0;
  }

  if (direction === Direction.right) {
    return 90;
  }

  if (direction === Direction.bottom) {
    return 180;
  }

  if (direction === Direction.left) {
    return 270;
  }
};

const Container = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 225ms ease;
  &:hover {
    backdrop-filter: blur(50px);
    background-color: var(--primary-10);
    > svg {
      color: var(--primary);
    }
  }
  ${({ isActive }) =>
    isActive &&
    css`
      backdrop-filter: blur(50px);
      background-color: var(--primary-10);
      > svg {
        color: var(--primary);
      }
    `}
`;

const Button = styled(ArrowUp)`
  width: 24px;
  height: 24px;
  color: var(--shade-300);
  transition: fill 225ms ease, color 225ms ease;
  transform: rotate(${({ direction }) => getRotation(direction)}deg);
`;

const DirectionButton = ({ direction, onClick, isActive }) => {
  const onDirectionChange = () => onClick(direction);

  return (
    <Container onClick={onDirectionChange} isActive={isActive}>
      <Button direction={direction} />
    </Container>
  );
};

export default memo(DirectionButton);
