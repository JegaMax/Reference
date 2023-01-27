import styled from 'styled-components';

const StyledSettingsLabel = styled.label`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  ${({ customMargin }) => (customMargin ? `margin: ${customMargin};` : 'margin-bottom: 8px;')}
`;


const SettingsLabel = ({ label, className, customMargin }) => {
  return (
    <StyledSettingsLabel className={className} customMargin={customMargin}>
      {label}
    </StyledSettingsLabel>
  );
};

export default SettingsLabel;
