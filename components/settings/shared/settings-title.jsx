import styled from 'styled-components';

const StyledSettingsTitle = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin-right: 15px;
`;

const SettingsTitle = ({ className, title }) => {
  return <StyledSettingsTitle className={className}>{title}</StyledSettingsTitle>;
};

export default SettingsTitle;
