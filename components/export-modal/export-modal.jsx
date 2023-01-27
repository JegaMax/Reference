import AmpUser from './shared/elements/amp-user';
import cutnutImage from './images/output-onlinepngtools.png';
import debounce from 'lodash/debounce';
import ExportMenu from 'components/export-menu/export-menu';
import InputBasic from '../shared/input-basic';
import landscapePosterImage from './images/landscape-poster.png';
import OutsideClickHandler from 'react-outside-click-handler';
import posterImage from './images/poster.png';
import PosterModal from './poster-modal';
import React, { memo, useMemo, useRef } from 'react';
import Select from '../shared/select';
import squarePosterImage from './images/square-poster.png';
import StoryIframe from './shared/elements/story-iframe';
import styled from 'styled-components';
import Tags from 'components/tags/tags';
import TextArea from '../shared/text-area';
import ToggleSwitch from '../shared/toggle-switch';
import { BackButton, HeaderTitle, InputLabel, SectionTitle } from './shared/elements';
import { batch } from 'react-redux';
import { defaultDomain, defaultStoryName, posterTypes, storyIds } from '../../config/constants';
import { HoverTooltip } from 'components/tooltip';
import { ModalBodyWrapper, ModalExportOuterWrapper, ModalHeaderWrapper, ModalWrapper } from './../shared/modal';
import { PosterImageLandscape, PosterImagePortrait, PosterImageSquare } from './shared/elements/poster-image-preview';
import { PrimaryButton, SecondaryButton } from '../buttons/index';
import { saveAmpStoryChanges, setAccessControl, setCustomDomain } from 'appredux/features/amp-story/ampStorySlice';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { startPreview, stopPreview } from '../../appredux/features/editor/helpers/helpersSlice';
import { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector, useDidUpdateEffect } from '../../hooks';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import { useHistory } from 'react-router-dom';
import { usePrefetch } from 'appredux/services/gifs/gifs';
import {
  setIsExportModalOpen,
  setPosterType,
  setIsPosterModalOpen,
  publishWebStory,
  updateMetadata,
  uploadPosters,
  setDomain,
} from './../../appredux/features/export/exportSlice';
import {
  FormSection,
  FormColumn,
  AmpColumn,
  SectionRow,
  SectionColumn,
  PublishButtonContainer,
} from './shared/structure';

const StyledSwitch = styled(ToggleSwitch)`
  margin: 0 0 -2px 12px;
`;

const Row = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const SecondaryButtonContainer = styled.div`
  min-height: 34px;
  margin-left: auto;
  margin-right: 16px;
`;

const StyledTooltip = styled.p`
  margin: 0;
  padding: 0;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--shade-900);
`;

const TooltipWrapper = styled.div`
  margin-left: 8px;
`;

const StyledCharactersCounter = styled.div`
  display: inline-block;
  font-size: 10px;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 6px 0;
`;

const aspectRation = 9 / 16;

const ExportModal = ({ conversion, modalTitle, customBackButton }) => {
  const dispatch = useAppDispatch();
  const { push } = useHistory();
  const username = useAppSelector((state) => state.auth.user?.username);
  const isPosterModalOpen = useAppSelector((state) => state.export.isPosterModalOpen);
  const isExportLoading = useAppSelector((state) => state.export.isExportLoading);
  const storyConfigId = useAppSelector((state) => state.ampStory.present.storyConfigId);
  const storyId = useAppSelector((state) => state.ampStory.present._id);
  const hasAccessControl = useAppSelector((state) => state.ampStory.present.hasAccessControl);
  const title = useAppSelector((state) => state.ampStory.present.title);
  const customDomain = useAppSelector((state) => state.ampStory.present.customDomain);
  const authorSEOName = useAppSelector((state) => state.ampStory.present?.authorSEO?.name);
  const description = useAppSelector((state) => state.ampStory.present.description);
  const storyStatus = useAppSelector((state) => state.ampStory.present?.status);
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const iframeWrapperRef = useRef(null);
  const ampColumnRef = useRef(null);
  const modalRef = useRef(null);
  const modalHeaderRef = useRef(null);
  const [iframeSize, setIframeSize] = useState({
    width: 0,
    height: 0,
  });

  const [customLoader, setCustomLoader] = useState(true);

  const {
    wsPublisher,
    wsPublisherLogo,
    wsDomains,
    googleSignInAppId,
    extendedAccess,
    customCDN,
  } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      wsPublisher: workspace?.publisher,
      wsPublisherLogo: workspace?.publisherLogoUrl,
      wsDomains: workspace?.domainSettings?.domainList,
      googleSignInAppId: workspace?.googleSignInAppId,
      extendedAccess: workspace?.extendedAccess,
      customCDN: workspace?.customCDN,
    }),
  });
  const prefetchGif = usePrefetch('getSuccessGif');

  const domainOptions = useMemo(() => {
    if (customCDN?.isEnabled && customCDN?.cdns?.length) {
      return customCDN?.cdns?.map((cdn) => ({ name: cdn, value: cdn }));
    }

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
  }, [wsDomains, customCDN]);

  const storyCover = useAppSelector((state) => state.ampStory.present.cover?.url);
  const posterPortrait3x4Url = useAppSelector((state) => state.ampStory.present.posterPortrait3x4Url);
  const posterPortrait1x1Url = useAppSelector((state) => state.ampStory.present.posterPortrait1x1Url);
  const posterLandscapeUrl = useAppSelector((state) => state.ampStory.present.posterLandscapeUrl);
  const [generalData, setGeneralData] = useState({
    title,
    url:
      customDomain ??
      (storyStatus === 'published' ? domainOptions[domainOptions.length - 1].value : domainOptions[0].value),
    slug: '',
  });
  const [seoData, setSeoData] = useState({
    description,
    hasMetaTags: false,
    metaTags: [],
    authorName: authorSEOName || username,
  });

  const [postersSrcs, setPostersSrcs] = useState({
    portrait: posterPortrait3x4Url || storyCover || posterImage,
    landscape: posterLandscapeUrl || storyCover || landscapePosterImage,
    square: posterPortrait1x1Url || storyCover || squarePosterImage,
  });

  const [originalPostersSrcs, setOriginalPostersSrcs] = useState({
    portrait: posterPortrait3x4Url || storyCover || posterImage,
    landscape: posterLandscapeUrl || storyCover || landscapePosterImage,
    square: posterPortrait1x1Url || storyCover || squarePosterImage,
  });

  const onUpdateMetadata = useCallback(
    debounce((dispatch, input) => {
      dispatch(updateMetadata(input));
    }, 1000),
    [],
  );

  const updatePostersSrcs = useCallback(
    async (imageSrcs) => {
      setPostersSrcs(imageSrcs);
      dispatch(uploadPosters(imageSrcs));
    },
    [dispatch],
  );

  const updateOriginalPostersSrcs = useCallback((imageSrcs) => setOriginalPostersSrcs(imageSrcs), []);

  // const [errors, setErrors] = useState({ title: '' });

  const onCloseExportModal = () => {
    if (!conversion) {
      dispatch(setIsExportModalOpen(false));
    }
  };

  const onPosterModalClick = (type) => () => {
    batch(() => {
      dispatch(setPosterType(type));
      dispatch(setIsPosterModalOpen(true));
    });
  };

  const onGeneralInputChange = (event) => {
    const name = event?.currentTarget?.name;
    const value = event?.currentTarget?.value;
    setGeneralData((prevGeneralData) => ({
      ...prevGeneralData,
      [name]: value,
    }));

    setCustomLoader(true);
  };

  const onUrlChange = (url) => {
    if (url === defaultDomain) {
      dispatch(setCustomDomain(null));
    } else {
      dispatch(setCustomDomain(url));
    }
    setGeneralData((prevGeneralData) => ({ ...prevGeneralData, url }));
    setCustomLoader(true);
  };

  const onSeoInputChange = (event) => {
    const name = event?.currentTarget?.name;
    const value = event?.currentTarget?.value;
    setSeoData((prevSeoData) => ({
      ...prevSeoData,
      [name]: value,
    }));
    setCustomLoader(true);
  };

  const onPublish = () => {
    dispatch(publishWebStory());
  };

  const onTitleBlur = () => {
    if (generalData?.title.length === 0) {
      dispatch(updateMetadata({ ...generalData, title: defaultStoryName }));
      setGeneralData((prevGeneralData) => ({ ...prevGeneralData, title: defaultStoryName }));
    }
  };

  const toggleAccessControl = useCallback(() => {
    dispatch(setAccessControl(!hasAccessControl));
    dispatch(saveAmpStoryChanges(true, true));
  }, [dispatch, hasAccessControl]);

  useEffect(() => {
    dispatch(startPreview(storyIds.exportModal));
    prefetchGif(undefined, { force: true });
    return () => {
      dispatch(stopPreview(storyIds.exportModal));
    };
  }, [dispatch, storyConfigId, prefetchGif]);

  useEffect(() => {
    if (!authorSEOName) {
      onUpdateMetadata(dispatch, { ...seoData, authorName: seoData?.authorName || username });
    }
  }, [authorSEOName, dispatch, onUpdateMetadata, seoData, username]);

  useDidUpdateEffect(() => {
    onUpdateMetadata(dispatch, generalData);
  }, [generalData]);

  useDidUpdateEffect(() => {
    onUpdateMetadata(dispatch, { ...seoData, authorName: seoData?.authorName || username });
  }, [seoData]);

  useEffect(() => {
    dispatch(setDomain(generalData.url));
  }, [dispatch, generalData.url]);

  const calculateIframeSize = useCallback(() => {
    if (iframeWrapperRef.current && modalRef.current && ampColumnRef.current && modalHeaderRef.current) {
      const ampColumn = ampColumnRef.current;
      const modalWrapper = modalRef.current;
      const height =
        modalWrapper?.clientHeight - iframeWrapperRef.current.offsetTop - 16 - modalHeaderRef.current?.clientHeight;
      const ampColumnStyles = getComputedStyle(ampColumn);
      const calcMaxWidth =
        (modalWrapper?.clientWidth * parseFloat(ampColumnStyles.maxWidth)) / 100 -
        parseFloat(ampColumnStyles.paddingLeft) -
        parseFloat(ampColumnStyles.paddingRight);

      const size = {
        height: height,
        width: height * aspectRation,
      };

      if (size.width > calcMaxWidth) {
        size.width = calcMaxWidth;
        size.height = calcMaxWidth / aspectRation;
      }

      setIframeSize(size);
    }
  }, []);

  useEffect(() => {
    calculateIframeSize();
    window.addEventListener('resize', calculateIframeSize);

    return () => {
      window.removeEventListener('resize', calculateIframeSize);
    };
  }, [calculateIframeSize]);

  useEffect(() => {
    if (!isExportLoading) {
      setTimeout(() => {
        setCustomLoader(false);
      }, 500);
    }

    if (isExportLoading) {
      setCustomLoader(true);
    }
  }, [isExportLoading]);

  return (
    <ModalExportOuterWrapper>
      <OutsideClickHandler display="flex" onOutsideClick={onCloseExportModal}>
        <ModalWrapper propRef={modalRef}>
          <ModalHeaderWrapper propRef={modalHeaderRef}>
            {customBackButton ? customBackButton : <BackButton onClick={onCloseExportModal} />}
            {modalTitle && <HeaderTitle text={modalTitle} />}

            {conversion && (
              <SecondaryButtonContainer>
                <SecondaryButton
                  text={'Edit Story'}
                  onClick={() => {
                    dispatch(setIsExportModalOpen(false));
                    push(`/story/${storyId}`);
                  }}
                />
              </SecondaryButtonContainer>
            )}

            {conversion ? (
              <ExportMenu offset={-160} isConversionMenu>
                <PrimaryButton text={'Publish'} />
              </ExportMenu>
            ) : (
              <PublishButtonContainer>
                <PrimaryButton
                  isDisabled={customLoader}
                  onClick={onPublish}
                  text={'Publish Story'}
                  loader
                  isLoading={customLoader}
                />
              </PublishButtonContainer>
            )}
          </ModalHeaderWrapper>

          <ModalBodyWrapper>
            <Row>
              <FormColumn>
                <FormSection>
                  <SectionColumn>
                    <SectionTitle text="General" />
                  </SectionColumn>

                  <SectionRow>
                    <SectionColumn width={'50%'}>
                      <InputLabel htmlFor="url" text="Domain" />
                      <Select
                        selectOption={generalData.url}
                        options={domainOptions}
                        onSelect={onUrlChange}
                        dropdownZIndex={4}
                      />
                    </SectionColumn>
                  </SectionRow>

                  <SectionRow>
                    <SectionColumn width={'100%'}>
                      <Row>
                        <InputLabel htmlFor="tags" text="Tags" />
                        <TooltipWrapper>
                          <HoverTooltip
                            offset={[12, -2]}
                            content={
                              <StyledTooltip>
                                Tags can be used to automatically populate Carousels with tagged Stories.
                              </StyledTooltip>
                            }
                          />
                        </TooltipWrapper>
                      </Row>
                      <Tags />
                    </SectionColumn>
                  </SectionRow>
                </FormSection>

                <FormSection>
                  <SectionColumn>
                    <SectionTitle text="SEO Performance" />
                  </SectionColumn>

                  <SectionRow>
                    <SectionColumn>
                      <InputLabel htmlFor="story-title" text="Title" />
                      <InputBasic
                        id="story-title"
                        name="title"
                        placeholder="Enter story title"
                        value={generalData.title}
                        // hasError={errors.title.length > 0}
                        hasError={false}
                        onChange={onGeneralInputChange}
                        onBlur={onTitleBlur}
                      />
                      {/* {errors.title.length > 0 && <Error text="Title should be between 10 and 70 characters long" />} */}
                      <StyledCharactersCounter>Character count - {generalData?.title?.length}</StyledCharactersCounter>
                    </SectionColumn>
                  </SectionRow>

                  <SectionRow>
                    <SectionColumn>
                      <InputLabel htmlFor="description" text="Description" />
                      <TextArea
                        id="description"
                        name="description"
                        value={seoData.description}
                        placeholder="Enter Story description"
                        onChange={onSeoInputChange}
                      />
                      <StyledCharactersCounter>
                        Character count - {seoData?.description?.length}
                      </StyledCharactersCounter>
                    </SectionColumn>
                  </SectionRow>

                  <SectionRow>
                    <SectionColumn>
                      <InputLabel htmlFor="author-name" text="Author" />
                      <InputBasic
                        id="author-name"
                        name="authorName"
                        placeholder="Enter Story author"
                        value={seoData.authorName}
                        hasError={false}
                        onChange={onSeoInputChange}
                      />
                    </SectionColumn>
                  </SectionRow>
                </FormSection>

                <FormSection>
                  <SectionColumn>
                    <SectionTitle text="Poster image preview" />
                  </SectionColumn>

                  <SectionRow>
                    <SectionColumn width="auto">
                      <PosterImagePortrait
                        userName={wsPublisher}
                        userImageSrc={wsPublisherLogo || cutnutImage}
                        storyTitle={generalData?.title}
                        image={postersSrcs[posterTypes.portrait.toLowerCase()]}
                        onClick={onPosterModalClick(posterTypes.portrait)}
                      />
                    </SectionColumn>

                    <SectionColumn width="auto">
                      <PosterImageLandscape
                        userName={wsPublisher}
                        userImageSrc={wsPublisherLogo || cutnutImage}
                        image={postersSrcs[posterTypes.landscape.toLowerCase()]}
                        onClick={onPosterModalClick(posterTypes.landscape)}
                      />
                    </SectionColumn>

                    <SectionColumn width="auto">
                      <PosterImageSquare
                        userName={wsPublisher}
                        userImageSrc={wsPublisherLogo || cutnutImage}
                        storyTitle={generalData?.title}
                        image={postersSrcs[posterTypes.square.toLowerCase()]}
                        onClick={onPosterModalClick(posterTypes.square)}
                      />
                    </SectionColumn>
                  </SectionRow>
                </FormSection>

                {extendedAccess?.isEnabled && googleSignInAppId && (
                  <FormSection>
                    <SectionColumn>
                      <SectionTitle text="Advanced" />
                    </SectionColumn>

                    <SectionRow>
                      <SectionColumn>
                        <InputLabel htmlFor="story-title" text="Enable Google Extended Access" />
                        <StyledSwitch isOn={hasAccessControl} onClick={toggleAccessControl} />
                      </SectionColumn>
                    </SectionRow>
                  </FormSection>
                )}
              </FormColumn>

              <AmpColumn propRef={ampColumnRef}>
                <AmpUser userName={wsPublisher ?? ''} userImageSrc={wsPublisherLogo || cutnutImage} />

                <StoryIframe size={iframeSize} propRef={iframeWrapperRef} />
                {/* <AmpValidationText isValid={true} text={'Your story is AMP validated'} /> */}
              </AmpColumn>
            </Row>
          </ModalBodyWrapper>
        </ModalWrapper>
        {isPosterModalOpen && (
          <PosterModal
            postersSrcs={postersSrcs}
            updatePostersSrcs={updatePostersSrcs}
            originalPostersSrcs={originalPostersSrcs}
            updateOriginalPostersSrcs={updateOriginalPostersSrcs}
          />
        )}
      </OutsideClickHandler>
    </ModalExportOuterWrapper>
  );
};

export default memo(ExportModal);
