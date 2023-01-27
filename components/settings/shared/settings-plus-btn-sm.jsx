import styled from 'styled-components';

const Background = styled.div`
  width: ${({ size }) => (size ? size : '40px')};
  height: ${({ size }) => (size ? size : '40px')};
  position: relative;
  border: 1px solid var(--shade-300-85);
  background-color: var(--shade-700);
  box-sizing: border-box;
  border-radius: 8px;
  transition: background-color 0.12s ease;
  cursor: ${({ isDisabled }) => (isDisabled ? 'default' : 'pointer')};
  ${({ isDisabled }) =>
    !isDisabled &&
    `
  &:hover {    
    background-color: var(--shade-500);
  }
  `};
`;

const VerticalLine = styled.div`
  width: 1px;
  height: 43%;
  background: var(--shade-300-85);
  position: absolute;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HorizontalLine = styled.div`
  width: 43%;
  height: 1px;
  background: var(--shade-300-85);
  position: absolute;
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const SettingsPlusBtnSM = ({ className, size, onClick, isDisabled, $ref }) => {
  return (
    <Background ref={$ref} className={className} isDisabled={isDisabled} size={size} onClick={onClick}>
      <VerticalLine />
      <HorizontalLine />
    </Background>
  );
};

export default SettingsPlusBtnSM;
