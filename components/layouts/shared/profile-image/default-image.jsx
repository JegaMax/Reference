import React, { memo } from 'react';

import styled from 'styled-components';
import { useAppSelector } from 'hooks';

const DefaultImageBorder = styled.div`
  border: 1.5px solid var(--shade-300);
  box-sizing: border-box;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const DefaultImageFill = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  background: var(--shade-300);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DefaultImageLetter = styled.div`
  color: white;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
`;

const DefaultImage = () => {
  const userFirstLetter = useAppSelector((state) => state.auth.user?.username.charAt(0).toUpperCase());

  return (
    <DefaultImageBorder>
      <DefaultImageFill>
        <DefaultImageLetter>{userFirstLetter}</DefaultImageLetter>
      </DefaultImageFill>
    </DefaultImageBorder>
  );
};

export default memo(DefaultImage);
