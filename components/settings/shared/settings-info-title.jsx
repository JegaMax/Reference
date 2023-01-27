import styled from 'styled-components';
import SettingsTitle from '../shared/settings-title';

import Times from '../../icons/times';

const StyledCloseButton = styled.div`
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  svg > * {
    fill: var(--shade-100);
  }
  &:hover {
    border-radius: 50%;
    background: #21212c;
  }
`;

const InfoTitleWrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: space-between;
`;

const SettingsInfoTitle = ({ className, withCloseBtn, title, onClick }) => {
  return (
    <InfoTitleWrapper className={className}>
      <SettingsTitle title={title} />

      {withCloseBtn && (
        <StyledCloseButton onClick={onClick}>
          <Times />
        </StyledCloseButton>
      )}
    </InfoTitleWrapper>
  );
};

SettingsInfoTitle.defaultProps = {
  withCloseBtn: true,
};

export default SettingsInfoTitle;
