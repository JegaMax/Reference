import styled from 'styled-components';

const StyledSettingsWrapper = styled.div`
  padding: 0 92px;
  background: var(--shade-500-85);
`;

const Title = styled.h2`
  margin: 0 0 42px 0;
  padding: 0;
  font-family: Heebo;
  font-style: normal;
  font-weight: bold;
  font-size: 40px;
  line-height: 48px;
  letter-spacing: 0.01em;
  color: var(--white);
`;

const SettingsWrapper = ({ children }) => {
  return (
    <StyledSettingsWrapper>
      <Title>Workspace Settings</Title>
      {children}
    </StyledSettingsWrapper>
  );
};

export default SettingsWrapper;
