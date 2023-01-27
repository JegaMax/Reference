import styled from 'styled-components';

const StyledSettingsCard = styled.div`
  width: 100%;
  border-radius: 12px;
  background: var(--shade-900-85);
  backdrop-filter: blur(50px);
  box-shadow: 24px 32px 72px var(--black-18);
`;

const SettingsCard = ({ children, className }) => {
  return <StyledSettingsCard className={className}>{children}</StyledSettingsCard>;
};

export default SettingsCard;
