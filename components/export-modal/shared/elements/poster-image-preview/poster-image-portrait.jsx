import { memo, useState } from 'react';
import styled from 'styled-components';
import { useSpinner } from '../../../../../hooks';

const PortraitWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  width: 158px;
  padding-top: calc(928 / 696 * 100%);
  border-radius: 4px;
  overflow: hidden;
  margin: 0 0 16px;
  cursor: pointer;
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
  width: 24px;
  height: 24px;
  box-shadow: 0px 0px 4px var(--black-10);
  border-radius: 2px;
  z-index: 1;
  position: absolute;
  top: 12px;
  left: 12px;
`;

const UserImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  color: var(--white);
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  padding: 0 12px 15px;
`;

const UserName = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  margin: 0 0 4px;
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

const PosterImagePortrait = ({ image, userName, userImageSrc, storyTitle, onClick }) => {
  const [isLoading, setLoading] = useState(true);
  const loadImage = () => setLoading(false);

  const { Spinner, spinnerProps } = useSpinner({ disableOverlay: true, spinnerType: 'DotLoader', size: 10, margin: 5 });
  return (
    <PortraitWrapper onClick={onClick}>
      <UserImageWrapper>{userImageSrc && <UserImage src={userImageSrc} alt="User" />}</UserImageWrapper>
      <SpinnerWrapper>
        <Spinner {...spinnerProps} {...{ size: 10, margin: 5 }} isVisible={isLoading || false} />
      </SpinnerWrapper>
      <PosterImage
        id={'poster-preview'}
        src={image}
        alt="Poster"
        style={{ visibility: isLoading ? 'hidden' : 'visible' }}
        onLoad={loadImage}
      />

      <Content>
        {userName ? <UserName>{userName}</UserName> : <UserName>Zazu</UserName>}

        <Text>{storyTitle}</Text>

        <TimeAgo>TimeAgo</TimeAgo>
      </Content>
    </PortraitWrapper>
  );
};

export default memo(PosterImagePortrait);
