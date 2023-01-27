import { memo } from 'react';
import styled from 'styled-components';

import trashImg from './assets/images/color-picker/trash.svg';

const StyledResetColor = styled.img`
  margin-right: 9px;
  cursor: pointer;
`;

const ResetColor = ({ onClick }) => {
  return <StyledResetColor src={trashImg} onClick={onClick} />;
};

export default memo(ResetColor);
