import styled from 'styled-components';
import Info from '../../icons/info';

const StyledSettingsInfo = styled.div`
  cursor: pointer;
  svg > * {
    fill: var(--shade-100);
  }
`;
const SettingsInfo = ({ onClick }) => {
  return (
    <StyledSettingsInfo onClick={onClick}>
      <Info />
    </StyledSettingsInfo>
  );
};

export default SettingsInfo;
