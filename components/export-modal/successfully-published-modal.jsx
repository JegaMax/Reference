import OutsideClickHandler from 'react-outside-click-handler';
import Select from '../shared/select';
import styled, { css, keyframes } from 'styled-components';
import { defaultDomain } from '../../config/constants';
import { environment } from '../../config/environment';
import { generateEmbededIframe } from '../../utils/commonUtils';
import { ModalPublishedOuterWrapper, SuccessModalInnerWrapper } from './shared/structure';
import { ModalWrapper } from './../shared/modal';
import { setIsPublishedModalOpen } from './../../appredux/features/export/exportSlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { StoryEmbeddedIcon, StoryLinkIcon, StoryShowcaseIcon } from 'components/icons';
import { SuccessGif, SuccessText } from './shared/elements';
import { useAppDispatch, useAppSelector } from 'hooks';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useGetSuccessGifQuery } from 'appredux/services/gifs/gifs';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';

const Divider = styled.div`
  width: calc(100% - 20px);
  height: 2px;
  background: var(--shade-500);
  margin: 26px 10px 38px;
`;

const ButtonWrapper = styled.div`
  position: relative;
  margin: 24px 0 14px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  padding: 24px 0;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InfoText = styled.p`
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin: 0;
`;

const InputColumn = styled.div`
  position: relative;
  width: ${({ $width }) => ($width ? $width : '100%')};
  padding: 0 4px;
`;

const Button = styled.button`
  padding: 8px 20px;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: 0.01em;
  border: 1px solid transparent;
  border-radius: 6px;
  box-shadow: 0px 4px 12px var(--black-16);
  width: 100%;
  cursor: pointer;
`;

const CopyLinkButton = styled(Button)`
  background: var(--primary);
  color: var(--shade-900);
  border-color: var(--primary);
  width: 200px;
  font-size: 16px;
  line-height: 22px;
`;

const appearing = keyframes`
  0% {
    opacity: 1;
    z-index: 1;
    transform: translate(-50%, 0%);
  }

  20%{
    opacity: 1;
    transform: translate(-50%, -200%);
  }

  80%{
    opacity: 1;
  }

  100%{
    opacity: 0;
    z-index: -1;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tooltip = styled.div`
  z-index: -1;
  font-family: Heebo;
  font-size: 12px;
  position: absolute;
  background-color: var(--shade-900);
  border-radius: 22px;
  color: var(--white);
  line-height: 1;
  padding: 5px 12px;
  bottom: 0;
  margin: 0 auto;
  text-align: center;
  opacity: 0;
  left: 50%;
  transform: translate(-50%, -180%);
  white-space: nowrap;
  ${({ isVisible }) =>
    isVisible &&
    css`
      z-index: -1;
      animation-name: ${appearing};
      animation-duration: 1s;
      animation-iteration-count: 1;
      animation-timing-function: ease-in-out;
    `}
`;

const Pills = styled.div`
  display: flex;
  margin: 26px;
  gap: 72px;
`;

const LinkPill = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
`;

const PillIcon = styled.div`
  height: 42px;
  width: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--shade-100);
  border-radius: 50%;
  margin-bottom: 24px;
`;

const PillText = styled.div`
  position: absolute;
  bottom: 0;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--white);
  white-space: nowrap;
`;

const Tips = styled.a`
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  text-decoration-line: underline;
  color: var(--shade-100);
  margin: 0 auto;
`;

const SuccessfullyPublishedModal = () => {
  const dispatch = useAppDispatch();
  const bucketKey = useAppSelector((state) => state.export.bucketKey);
  const extendedAccessKey = useAppSelector((state) => state.export.extendedAccessKey);
  const hasAccessControl = useAppSelector((state) => state.ampStory.present.hasAccessControl);
  const domain = useAppSelector((state) => state.export.domain);
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);

  const { wsDomains, customCDN } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      wsDomains: workspace?.domainSettings?.domainList,
      customCDN: workspace?.customCDN,
    }),
  });

  const { data: randomGif } = useGetSuccessGifQuery();

  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const [isEmbedCopied, setIsEmbedCopied] = useState(false);
  const [isShowcaseCopied, setIsShowcaseCopied] = useState(false);

  const [selectedDomain, setSelectedDomain] = useState(domain);
  const storyLink = useMemo(() => {
    if (bucketKey && selectedDomain !== defaultDomain) {
      const url = `https://${selectedDomain}/${bucketKey}`;
      if (customCDN?.mask) {
        return url.replace(new RegExp(customCDN.mask), '');
      }

      return url;
    }

    return `${environment.defaultStoriesHost}/${bucketKey}`;
  }, [bucketKey, selectedDomain, customCDN?.mask]);

  const showcaseLink = useMemo(() => {
    if (!extendedAccessKey) {
      return null;
    }

    if (extendedAccessKey && selectedDomain !== defaultDomain) {
      return `https://${selectedDomain}/${extendedAccessKey}`;
    }

    return `${environment.defaultStoriesHost}/${extendedAccessKey}`;
  }, [selectedDomain, extendedAccessKey]);

  const domainOptions = useMemo(() => {
    const domains = wsDomains?.map((domain) => {
      return {
        name: domain.domainName,
        value: domain.domainName,
      };
    });

    if (!domains?.length) {
      return [{ name: defaultDomain, value: defaultDomain }];
    }

    return domains;
  }, [wsDomains]);

  const onDomainChange = useCallback((domain) => {
    setSelectedDomain(domain);
  }, []);

  const copyToClipboard = useCallback(
    (isEmbedCode, isShowcase) => () => {
      if (navigator.clipboard && window.isSecureContext) {
        if (isEmbedCode) {
          navigator.clipboard.writeText(generateEmbededIframe(storyLink));
          setIsEmbedCopied(true);
          return;
        }

        if (isShowcase && showcaseLink) {
          navigator.clipboard.writeText(showcaseLink);
          setIsShowcaseCopied(true);
          return;
        }

        navigator.clipboard.writeText(storyLink);
        setIsLinkCopied(true);
        return;
      }

      const textArea = document.createElement('textarea');
      if (isEmbedCode) {
        textArea.value = generateEmbededIframe(storyLink);
      } else if (isShowcase && showcaseLink) {
        textArea.value = showcaseLink;
      } else {
        textArea.value = storyLink;
      }

      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      if (isEmbedCode) {
        setIsEmbedCopied(true);
        return;
      }
      if (isShowcase) {
        setIsShowcaseCopied(true);
      }
      setIsLinkCopied(true);
    },
    [showcaseLink, storyLink],
  );

  const onOpenStory = useCallback(() => {
    window.open(storyLink, '_blank');
  }, [storyLink]);

  useEffect(() => {
    if (isLinkCopied) {
      setTimeout(() => setIsLinkCopied(false), 1200);
    }

    if (isEmbedCopied) {
      setTimeout(() => setIsEmbedCopied(false), 1200);
    }

    if (isShowcaseCopied) {
      setTimeout(() => setIsShowcaseCopied(false), 1200);
    }
  }, [isLinkCopied, isEmbedCopied, isShowcaseCopied]);

  const onClosePublishedModal = useCallback(() => dispatch(setIsPublishedModalOpen(false)), [dispatch]);

  return (
    <ModalPublishedOuterWrapper childrenWidth={572}>
      <OutsideClickHandler display="flex" onOutsideClick={onClosePublishedModal}>
        <ModalWrapper>
          <SuccessModalInnerWrapper>
            <HeaderWrapper>
              <SuccessGif src={randomGif?.images?.fixed_height_small?.url ?? ''} />
              <SuccessText width="452px" text="Your story was successfully published!" />
              <ButtonWrapper>
                <CopyLinkButton onClick={onOpenStory}>Check it out</CopyLinkButton>
              </ButtonWrapper>
              {(!customCDN?.isEnabled || customCDN?.cdns?.length === 0) && (
                <InputColumn $width={'150px'}>
                  <Select
                    dropdownHeight={'150px'}
                    shouldExpandToWidestOption
                    maxDropdownWidthPX={342}
                    selectOption={selectedDomain}
                    options={domainOptions}
                    onSelect={onDomainChange}
                  />
                </InputColumn>
              )}
            </HeaderWrapper>
            <Divider />
            <Body>
              <InfoText>Find the best way to show your Story: </InfoText>
              <Pills>
                <LinkPill onClick={copyToClipboard()}>
                  <Tooltip isVisible={isLinkCopied}>Copied</Tooltip>
                  <PillIcon>
                    <StoryLinkIcon />
                  </PillIcon>
                  <PillText>Direct URL</PillText>
                </LinkPill>
                <LinkPill onClick={copyToClipboard(true)}>
                  <Tooltip isVisible={isEmbedCopied}>Copied</Tooltip>
                  <PillIcon>
                    <StoryEmbeddedIcon />
                  </PillIcon>
                  <PillText>Embed code</PillText>
                </LinkPill>
                {hasAccessControl && extendedAccessKey && (
                  <LinkPill onClick={copyToClipboard(false, true)}>
                    <Tooltip isVisible={isShowcaseCopied}>Copied</Tooltip>
                    <PillIcon>
                      <StoryShowcaseIcon />
                    </PillIcon>
                    <PillText>News Showcase</PillText>
                  </LinkPill>
                )}
              </Pills>
              <Tips href="https://help.zazuapp.co/en/article/show-your-story-on-your-website-yraebd/" target="_blank">
                Find tips to display your Story
              </Tips>
            </Body>
          </SuccessModalInnerWrapper>
        </ModalWrapper>
      </OutsideClickHandler>
    </ModalPublishedOuterWrapper>
  );
};

export default SuccessfullyPublishedModal;
