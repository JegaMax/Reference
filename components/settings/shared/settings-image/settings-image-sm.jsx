import styled from 'styled-components';
import { DeleteSM } from '../../../icons';

const SettingsImage = styled.img`
  position: absolute;
  object-fit: cover;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  margin: auto;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid var(--shade-300-85);
  background: var(--shade-700);
  box-sizing: border-box;
  border-radius: 8px;
`;

export const SettingsImageDeleteBtn = styled.div`
  width: 20px;
  height: 20px;
  background: var(--shade-300);
  box-shadow: 24px 32px 72px var(--black-18);
  border-radius: 50%;
  position: absolute;
  opacity: 0;
  top: -13%;
  left: 66%;
  cursor: pointer;
  display:flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease;
  svg > * {
    fill: var(--white);
    }
  }
  @supports((-webkit-backdrop-filter: blur(50px)) or (backdrop-filter: blur(50px)) or (-moz-backdrop-filter: blur(50px))){
    background: transparent;
    backdrop-filter: blur(50px);
  }
`;

const SettingsImageWrapper = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: default;
  &:hover {
    > ${SettingsImageDeleteBtn} {
      opacity: 1;
    }
  }
`;

const SettingsImageSM = ({ image, onClick }) => {
  return (
    <SettingsImageWrapper>
      <SettingsImage src={image} />
      <SettingsImageDeleteBtn onClick={onClick}>
        <DeleteSM />
      </SettingsImageDeleteBtn>
    </SettingsImageWrapper>
  );
};

export default SettingsImageSM;
