import { ChevronRight } from 'components/icons';
import { memo } from 'react';
import styled, { css } from 'styled-components';

export const SpeedSteps = {
  firstSpeed : 1,
  secondSpeed : 2,
  thirdSpeed : 3,
  fourthSpeed : 4,
}

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

const Button = styled(ChevronRight)`
  width: 5px;
  height: 10px;
  color: var(--shade-300);
  transition: fill 225ms ease, color 225ms ease;
`;

const SpeedButton = ({ speedStep, onClick, isActive }) => {
  const onSpeedChange = () => onClick(speedStep);

  return (
    <Container onClick={onSpeedChange} isActive={isActive}>
      {[...Array(speedStep).keys()].map((keyIndex) => (
        <Button key={keyIndex} />
      ))}
    </Container>
  );
};

export default memo(SpeedButton);
