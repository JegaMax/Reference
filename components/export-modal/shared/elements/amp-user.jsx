import React from 'react';
import styled from 'styled-components';

const AmpUserWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: 0 0 16px;
`;

const UserImageWrapper = styled.div`
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: 1px solid var(--shade-700-85);
  overflow: hidden;
`;

const UserImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const UserContent = styled.div`
  padding: 0 0 0 8px;
`;

const Text = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0 0 2px;
`;

const UserName = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--white);
`;

const AmpUser = ({ userName, userImageSrc }) => {
  return (
    <AmpUserWrapper>
      <UserImageWrapper>
        <UserImage src={userImageSrc} alt="Avatar" />
      </UserImageWrapper>

      <UserContent>
        <Text>Published by</Text>
        {userName ? <UserName>{userName}</UserName> : <UserName>Zazu</UserName>}
      </UserContent>
    </AmpUserWrapper>
  );
};

export default AmpUser;
