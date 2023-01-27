import { memo, useState } from 'react';
import styled from 'styled-components';
import { useSpinner } from '../../../../../hooks';

const PortraitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 158px;
  border-radius: 4px;
  overflow: hidden;
  margin: 0 0 16px;
  cursor: pointer;
`;

const PosterImageWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 12px;
  width: 100%;
  height: 158px;
  position: relative;
`;

const PosterImage = styled.img`
  object-fit: cover;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;
  width: calc(100% + 1px);
  height: calc(100% + 1px);
  z-index: 0;
`;

const UserImageWrapper = styled.div`
  width: 12px;
  height: 12px;
  box-shadow: 0px 0px 4px var(--black-10);
  border-radius: 2px;
  position: relative;
  z-index: 1;
`;

const UserImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  color: var(--white);
  position: relative;
  z-index: 1;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  background: var(--white);
  padding: 5px 12px;
`;

const UserName = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 9px;
  line-height: 18px;
  color: var(--black-0.1);
  margin: 0 0 0 8px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Text = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 16px;
  opacity: 0.75;
  margin: 0;
`;

const TimeAgo = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 16px;
  opacity: 0.75;
  margin: 0;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PosterImageSquare = ({ image, userName, userImageSrc, storyTitle, onClick }) => {
  const [isLoading, setLoading] = useState(true);
  const loadImage = () => setLoading(false);

  const { Spinner, spinnerProps } = useSpinner({ disableOverlay: true, spinnerType: 'DotLoader', size: 10, margin: 5 });
  return (
    <PortraitWrapper onClick={onClick}>
      <UserWrapper>
        <UserImageWrapper>{userImageSrc && <UserImage src={userImageSrc} alt="User" />}</UserImageWrapper>
        {userName ? <UserName>{userName}</UserName> : <UserName>Zazu</UserName>}
      </UserWrapper>

      <PosterImageWrapper>
        <SpinnerWrapper>
          <Spinner {...spinnerProps} {...{ size: 10, margin: 5 }} isVisible={isLoading || false} />
        </SpinnerWrapper>
        <PosterImage
          id="poster-preview"
          src={image}
          alt="Poster"
          onLoad={loadImage}
          style={{ visibility: isLoading ? 'hidden' : 'visible' }}
        />
        <Content>
          <Text>{storyTitle}</Text>

          <TimeAgo>TimeAgo</TimeAgo>
        </Content>
      </PosterImageWrapper>
    </PortraitWrapper>
  );
};

export default memo(PosterImageSquare);
