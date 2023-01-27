import styled from 'styled-components';

const InfoText = styled.div`
  font-weight: 400;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  text-align: justify;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  width: 100%;
`;

const InfoTextWrapper = styled.div``;

const SettingsInfoText = ({ className, children }) => {
  return (
    <InfoTextWrapper className={className}>
      <InfoText>{children}</InfoText>
    </InfoTextWrapper>
  );
};

export default SettingsInfoText;
