import styled from 'styled-components';
import Plus from '../../icons/plus';

const StyledSettingsInfo = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--shade-100);
`;

const SettingsPlusCircle = () => {
  return (
    <StyledSettingsInfo>
      <Plus />
    </StyledSettingsInfo>
  );
};

export default SettingsPlusCircle;
