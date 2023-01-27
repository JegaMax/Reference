import styled from 'styled-components';
import { SNIPPET_LIVE, SNIPPET_PENDING } from '../../../config/constants';
import CheckCircle from '../../icons/check-circle';
import WarningIcon from '../../icons/warning';


const handleColorType = (status) => {
  switch (status) {
    case SNIPPET_LIVE:
      return 'var(--success)';
    case SNIPPET_PENDING:
      return 'var(--shade-100)';
    default:
      return 'var(--warning)';
  }
};

const StyledSettingsSnippetStatus = styled.div`
  align-self: center;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const PendingText = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 18px;
  letter-spacing: 0.01em;
  display: none;
  margin-left: 5.5px;
  transition: display 1s ease;
  color: ${({ status }) => handleColorType(status)};
`;

const IconWrapper = styled.div`
  line-height: 0;
  svg > * {
    fill: ${({ status }) => handleColorType(status)};
  }
  &:hover ~ ${PendingText} {
    display: block;
    transition: display 1s ease;
  }
`;

const SettingsSnippetStatus = ({ status, canExpand }) => {
  const explanationText = {
    Rejected: '',
    Live: 'Your snippet is live',
    Pending: 'Your snippet is being reviewed by us (usually takes between 12-48 hours)',
  };

  return (
    <StyledSettingsSnippetStatus>
      <IconWrapper status={status}>{status === SNIPPET_LIVE ? <CheckCircle /> : <WarningIcon />}</IconWrapper>
      {canExpand && <PendingText status={status}>{status && explanationText[status]}</PendingText>}
    </StyledSettingsSnippetStatus>
  );
};

export default SettingsSnippetStatus;
