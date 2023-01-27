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

const PosterImageWrapper = styled.div`
  width: 100%;
  padding-top: calc(696 / 928 * 100%);
  position: relative;
`;

const Content = styled.div`
  background: var(--white);
  position: relative;
  z-index: 1;
  padding: 14px 12px;
`;

const UserName = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: var(--social-fb);
  margin: 0 0 2px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const UserNameSpacing = styled.div`
  min-height: 20px;
`;

const TimeAgo = styled.div`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 8px;
  line-height: 16px;
  color: var(--social-fb-text);
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

const PosterImageLandscape = ({ image, userName, onClick }) => {
  const [isLoading, setLoading] = useState(true);
  const loadImage = () => setLoading(false);

  const { Spinner, spinnerProps } = useSpinner({ disableOverlay: true, spinnerType: 'DotLoader', size: 10, margin: 5 });
  return (
    <PortraitWrapper onClick={onClick}>
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
      </PosterImageWrapper>

      <Content>
        {userName ? <UserName>{userName}</UserName> : <UserName>Zazu</UserName>}

        <TimeAgo>a few seconds ago</TimeAgo>
      </Content>
    </PortraitWrapper>
  );
};

export default memo(PosterImageLandscape);
