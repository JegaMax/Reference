import styled from 'styled-components';
import Replace from '../../icons/replace';

const StyledSettingsInfo = styled.div`
  width: 18px;
  height: 18px;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  background: var(--shade-100);
`;

const SettingsReplaceCircle = () => {
  return (
    <StyledSettingsInfo>
      <Replace />
    </StyledSettingsInfo>
  );
};

export default SettingsReplaceCircle;
