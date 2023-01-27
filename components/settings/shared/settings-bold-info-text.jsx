import styled from 'styled-components';

const StyledSettingsBoldInfoText = styled.span`
  font-weight: 800;
`;


const SettingsBoldInfoText = ({ children }) => {
  return <StyledSettingsBoldInfoText>{children}</StyledSettingsBoldInfoText>;
};

export default SettingsBoldInfoText;
