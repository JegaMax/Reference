import styled from 'styled-components';
import { memo } from 'react';

const HeaderImage = styled.img`
  margin: 0 0 24px;
  height: 157px;
  max-width: 100%;
  object-fit: cover;
`;

const SuccessGif = ({ src }) => {
  return <HeaderImage src={src} alt="Success gif" />;
};

export default memo(SuccessGif);
