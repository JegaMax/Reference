import styled from 'styled-components';
import Pencil from '../../icons/pencil';

const StyledSettingsInfo = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--shade-100);
  > svg {
    width: 6px;
    height: 7px;
  }
`;

const SettingsPencilCircle = () => {
  return (
    <StyledSettingsInfo>
      <Pencil />
    </StyledSettingsInfo>
  );
};

export default SettingsPencilCircle;
