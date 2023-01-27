import styled from 'styled-components';
import { WarningIcon } from '../icons';

const ErrorWrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 8px 0 0;
`;

const ErrorText = styled.span`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 10px;
  line-height: 1;
  letter-spacing: 0.01em;
  color: var(--warning);
  margin: 0 0 0 5px;
`;

const ErrorIcon = styled(WarningIcon)`
  width: 15px;
  height: 15px;
  color: var(--warning);
`;

const Error = ({ text }) => {
  return (
    <ErrorWrapper>
      <ErrorIcon />
      <ErrorText>{text}</ErrorText>
    </ErrorWrapper>
  );
};

export default Error;
