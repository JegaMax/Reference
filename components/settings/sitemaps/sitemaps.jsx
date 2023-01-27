import DomainsSettingsStyled from '../custom-domains-settings/custom-domains-settings-styled';
import React, { ChangeEvent, memo, useCallback, useEffect, useMemo, useState } from 'react';
import Select from 'components/shared/select';
import SettingsCard from '../shared/settings-card';
import SettingsColumn from '../shared/settings-column';
import SettingsInputWithLabel from '../shared/settings-input-with-label';
import SettingsLabel from '../shared/settings-label';
import SettingsPencil from '../shared/settings-pencil-circle';
import SettingsPlus from '../shared/settings-plus-circle';
import SettingsRow from '../shared/settings-row';
import SettingsTitle from '../shared/settings-title';
import styled, { css, keyframes } from 'styled-components';
import { generateEmbededIframe } from 'utils/commonUtils';
import { HoverTooltip, MoveableTooltip } from 'components/tooltip';
import { PrimaryButton } from 'components/buttons';
import { RoleName } from 'appredux/services/workspaces/interface';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppSelector } from 'hooks';
import {
  useGetWorkspaceQuery,
  useInitializeSitemapMutation,
  useUpdateWorkspaceSeoSettingsMutation,
  useUpdateSitemapMutation,
  useUpdateRssMetaMutation,
} from 'appredux/services/workspaces/workspaces';
import { startCase } from 'lodash';

const REQUIRED_KEYS = ['isInitialized', 'title', 'description', 'link'];

const SelectWrapper = styled.div`
  max-width: 152px;
  width: 152px;
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const SelectLabel = styled.p`
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0 0 8px 0;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 14px 41px 18px 12px;
  margin-bottom: 28px;
`;

const TitleWrapper = styled.div`
  margin-bottom: 15px;
`;

const RelativeWrapper = styled.div`
  position: relative;
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

const TooltipTitle = styled.h2`
  margin: 0;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--shade-900);
`;

const TooltipBody = styled.p`
  font-family: 'Heebo';
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-900);
  margin: 24px 0 0 0;
`;

const TooltipTip = styled.span`
  margin: 0;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-900);
`;

const Divider = styled.div`
  width: 45px;
  height: 1px;
  background: var(--white-10);
  margin: 23px 0;
`;

const Sitemaps = () => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const {
    isWorkspaceAdmin,
    sitemapInitialized,
    newsInitialized,
    rssFeed,
    wsPublication,
    customDomain,
    customCDN,
  } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
      sitemapInitialized: workspace?.sitemapInitialized,
      rssFeed: workspace?.rssFeed,
      newsInitialized: workspace?.newssitemap?.isInitialized,
      wsPublication: workspace?.newssitemap?.publication,
      customDomain: workspace?.domainSettings?.domainList?.[0],
      customCDN: workspace?.customCDN,
    }),
  });

  const [updateSeoData, { isLoading: isUpdateLoading }] = useUpdateWorkspaceSeoSettingsMutation();
  const [updateSitemap, { isLoading: isUpdateSitemapLoading }] = useUpdateSitemapMutation();
  const [initSitemap, { isLoading: isInitLoading }] = useInitializeSitemapMutation();
  const [updateRssMeta, { isLoading: isUpdateRssMetaLoading }] = useUpdateRssMetaMutation();

  const [showTooltip, setShowTooltip] = useState(false);
  const [sitemapCopied, setSitemapCopied] = useState(false);
  const [newsCopied, setNewsCopied] = useState(false);
  const [rssCopied, setRssCopied] = useState(false);

  const [createNewsSitemap, setCreateNewsSitemap] = useState(false);
  const [editNewsSitemap, setEditNewsSitemap] = useState(false);

  const [additionalRssFields, setAdditionalRssFields] = useState([]);
  const [createRss, setCreateRss] = useState(false);
  const [editRss, setEditRss] = useState(false);
  const [rssChannel, setRssChannel] = useState({
    title: '',
    description: '',
    link: '',
  });
  const [customFields, setCustomFields] = useState({});

  const [publication, setPublication] = useState(wsPublication ?? '');

  const sitemapUrl = useMemo(() => {
    if (customCDN?.isEnabled && customCDN?.cdns?.length) {
      const cdn = customCDN?.cdns?.[0];
      const url = `https://${cdn}/${selectedWorkspaceId}/sitemap.xml`;

      if (customCDN?.mask) {
        return url.replace(new RegExp(customCDN.mask), '');
      }

      return url;
    }

    return `https://${customDomain?.domainName}/${selectedWorkspaceId}/sitemap.xml`;
  }, [customCDN?.cdns, customCDN?.isEnabled, customCDN?.mask, customDomain?.domainName, selectedWorkspaceId]);

  const newsUrl = useMemo(() => {
    if (customCDN?.isEnabled && customCDN?.cdns?.length) {
      const cdn = customCDN?.cdns?.[0];
      const url = `https://${cdn}/${selectedWorkspaceId}/newssitemap.xml`;

      if (customCDN?.mask) {
        return url.replace(new RegExp(customCDN.mask), '');
      }

      return url;
    }

    return `https://${customDomain?.domainName}/${selectedWorkspaceId}/newssitemap.xml`;
  }, [customCDN?.cdns, customCDN?.isEnabled, customCDN?.mask, customDomain?.domainName, selectedWorkspaceId]);

  const rssUrl = useMemo(() => {
    if (customCDN?.isEnabled && customCDN?.cdns?.length) {
      const cdn = customCDN?.cdns?.[0];
      const url = `https://${cdn}/${selectedWorkspaceId}/rssfeed.xml`;

      if (customCDN?.mask) {
        return url.replace(new RegExp(customCDN.mask), '');
      }

      return url;
    }

    return `https://${customDomain?.domainName}/${selectedWorkspaceId}/rssfeed.xml`;
  }, [customCDN?.cdns, customCDN?.isEnabled, customCDN?.mask, customDomain?.domainName, selectedWorkspaceId]);

  const copyToClipboard = useCallback(
    (type) => () => {
      if (navigator.clipboard && window.isSecureContext) {
        if (type === 'sitemap') {
          navigator.clipboard.writeText(sitemapUrl);
          setSitemapCopied(true);
          return;
        }

        if (type === 'newssitemap') {
          navigator.clipboard.writeText(newsUrl);
          setNewsCopied(true);
          return;
        }

        navigator.clipboard.writeText(rssUrl);
        setRssCopied(true);
        return;
      }

      const textArea = document.createElement('textarea');

      if (type === 'sitemap') {
        textArea.value = generateEmbededIframe(sitemapUrl);
      } else if (type === 'newssitemap') {
        textArea.value = newsUrl;
      } else {
        textArea.value = rssUrl;
      }

      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();

      if (type === 'sitemap') {
        setSitemapCopied(true);
        return;
      }
      if (type === 'newssitemap') {
        setNewsCopied(true);
        return;
      }

      setRssCopied(true);
    },
    [newsUrl, rssUrl, sitemapUrl],
  );

  const handlePublicationNameChange = (e) => {
    const { value } = e.target;

    setPublication(value);
  };

  const handleRssChannelChange = (e) => {
    const { value, name } = e.target;

    setRssChannel((c) => ({ ...c, [name]: value }));
  };

  const handleCustomFieldsChange = (e) => {
    const { value, name } = e.target;

    setCustomFields((c) => ({ ...c, [name]: value }));
  };

  const handleStandartSitemapInitialization = async () => {
    try {
      await initSitemap({ type: 'sitemap' }).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewsInitialization = async (isUpdate = false) => {
    if (isUpdate) {
      try {
        await updateSeoData({ publication }).unwrap();

        await updateSitemap({ type: 'newssitemap' }).unwrap();

        setEditNewsSitemap(false);
      } catch (err) {
        console.error(err);
      }

      return;
    }

    try {
      await updateSeoData({ publication }).unwrap();

      await initSitemap({ type: 'newssitemap' }).unwrap();

      setCreateNewsSitemap(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleRssInitialization = async (isUpdate = false) => {
    if (isUpdate) {
      try {
        await updateRssMeta({ ...rssChannel, ...customFields }).unwrap();

        await updateSitemap({ type: 'rssfeed' }).unwrap();

        setEditRss(false);
      } catch (err) {
        console.error(err);
      }

      return;
    }

    try {
      await updateRssMeta({ ...rssChannel, ...customFields }).unwrap();

      await initSitemap({ type: 'rssfeed' }).unwrap();

      setCreateRss(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddRssTag = () => {
    if (additionalRssFields.length) {
      const firstElm = additionalRssFields[0];
      if (firstElm) {
        setCustomFields((c) => ({ ...c, [firstElm]: '' }));
        setAdditionalRssFields((v) => v.filter((elm) => elm !== firstElm));
      }
    }
  };

  const handleRssTagSelection = (currentKey) => (option) => {
    const oldOptionValue = customFields[currentKey];
    const newCustomFields = { ...customFields };
    delete newCustomFields[currentKey];
    newCustomFields[option] = oldOptionValue;

    setCustomFields(newCustomFields);
    const newAdditionalFields = additionalRssFields.filter((arf) => arf !== option);
    setAdditionalRssFields([...newAdditionalFields, currentKey]);
  };

  const isGenerateRssButtonDisabled = useMemo(() => Object.values({ ...rssChannel, ...customFields }).some((v) => !v), [
    rssChannel,
    customFields,
  ]);

  const rssSelectOptions = useMemo(() => additionalRssFields.map((af) => ({ name: startCase(af), value: af })), [
    additionalRssFields,
  ]);

  useEffect(() => {
    if (sitemapCopied) {
      setTimeout(() => setSitemapCopied(false), 1200);
    }

    if (newsCopied) {
      setTimeout(() => setNewsCopied(false), 1200);
    }

    if (rssCopied) {
      setTimeout(() => setRssCopied(false), 1200);
    }
  }, [newsCopied, rssCopied, sitemapCopied]);

  useEffect(() => {
    setPublication((v) => (v !== wsPublication && wsPublication ? wsPublication : v));
  }, [wsPublication]);

  useEffect(() => {
    if (rssFeed) {
      setAdditionalRssFields(
        Object.keys(rssFeed).filter((key) => !REQUIRED_KEYS.includes(key) && rssFeed[key] === null),
      );
      setRssChannel((c) => ({
        title: rssFeed?.title ?? c.title,
        description: rssFeed?.description ?? c.description,
        link: rssFeed?.link ?? c.link,
      }));
      setCustomFields((c) => ({
        ...c,
        ...(rssFeed?.copyright ? { copyright: rssFeed?.copyright } : {}),
        ...(rssFeed?.managingEditor ? { managingEditor: rssFeed?.managingEditor } : {}),
        ...(rssFeed?.language ? { language: rssFeed?.language } : {}),
      }));
    }
  }, [rssFeed]);

  if ((!customCDN?.isEnabled || !customCDN?.cdns?.length) && !customDomain) {
    return null;
  }

  return (
    <>
      <SettingsCard>
        <Container onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          <SettingsColumn flexBasis="100%" flexGrow="1" flexShrink="0" maxWidth="100%" minWidth="100%">
            <TitleWrapper>
              <SettingsRow>
                <SettingsTitle title={'Sitemaps'} />
                <HoverTooltip
                  content={
                    <>
                      <TooltipTitle>What are sitemaps?</TooltipTitle>
                      <TooltipBody>
                        Sitemaps are files containing the details of your Stories published with Zazu. Search engines
                        like Google read these files to crawl your Stories more efficiently.
                      </TooltipBody>
                      <TooltipBody>
                        <TooltipTip>Tip:</TooltipTip> Submit regularly your Sitemaps to the Google Search Console to
                        make sure Google craws your latests Stories.
                      </TooltipBody>
                    </>
                  }
                />
              </SettingsRow>
            </TitleWrapper>
            {sitemapInitialized && (
              <SettingsRow>
                <RelativeWrapper>
                  <SettingsInputWithLabel
                    label={'Standard sitemap XML'}
                    size={sitemapUrl?.length}
                    value={sitemapUrl}
                    onClick={copyToClipboard('sitemap')}
                    isReadOnly
                    canCopy
                  />
                  <Tooltip isVisible={sitemapCopied}>Copied</Tooltip>
                </RelativeWrapper>
              </SettingsRow>
            )}
            {!sitemapInitialized && (
              <>
                <SettingsRow>
                  <SettingsLabel customMargin={'0 0 12px 0'} label={'Standard sitemap XML'} />
                </SettingsRow>
                <SettingsRow>
                  <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={handleStandartSitemapInitialization}>
                    <SettingsPlus />
                    <SettingsLabel label="Generate sitemap" />
                  </DomainsSettingsStyled.DomainPlusTitleWrapper>
                </SettingsRow>
              </>
            )}
            <Divider />
            {!newsInitialized && (
              <>
                <SettingsRow>
                  <SettingsLabel customMargin={'0 0 12px 0'} label={'Google News sitemap XML'} />
                </SettingsRow>

                {!createNewsSitemap && (
                  <SettingsRow>
                    <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={() => setCreateNewsSitemap(true)}>
                      <SettingsPlus />
                      <SettingsLabel label="Generate sitemap" />
                    </DomainsSettingsStyled.DomainPlusTitleWrapper>
                  </SettingsRow>
                )}
                {createNewsSitemap && (
                  <>
                    <SettingsRow>
                      <SettingsInputWithLabel
                        label="Publication name"
                        placeholder="Google News publication name"
                        name="publication"
                        value={publication}
                        onChange={handlePublicationNameChange}
                      />
                    </SettingsRow>
                    <SettingsRow margin="12px 0 0 0">
                      <PrimaryButton
                        text="Generate sitemap"
                        isDisabled={!publication}
                        onClick={handleNewsInitialization}
                        isLoading={isUpdateLoading || isInitLoading}
                        loader
                      />
                    </SettingsRow>
                  </>
                )}
              </>
            )}
            {newsInitialized && (
              <>
                {!editNewsSitemap && (
                  <>
                    <SettingsRow>
                      <RelativeWrapper>
                        <SettingsInputWithLabel
                          label={'Google News sitemap XML'}
                          size={newsUrl?.length + 1}
                          value={newsUrl}
                          onClick={copyToClipboard('newssitemap')}
                          isReadOnly
                          canCopy
                        />
                        <Tooltip isVisible={newsCopied}>Copied</Tooltip>
                      </RelativeWrapper>
                    </SettingsRow>
                    <SettingsRow margin="12px 0 0 0">
                      <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={() => setEditNewsSitemap(true)}>
                        <SettingsPencil />
                        <SettingsLabel label="Edit" />
                      </DomainsSettingsStyled.DomainPlusTitleWrapper>
                    </SettingsRow>
                  </>
                )}
                {editNewsSitemap && (
                  <>
                    <SettingsRow>
                      <SettingsInputWithLabel
                        label="Publication name"
                        placeholder="Google News publication name"
                        name="publication"
                        value={publication}
                        onChange={handlePublicationNameChange}
                      />
                    </SettingsRow>
                    <SettingsRow margin="12px 0 0 0">
                      <PrimaryButton
                        text="Generate sitemap"
                        isDisabled={!publication}
                        onClick={() => handleNewsInitialization(true)}
                        isLoading={isUpdateLoading || isUpdateSitemapLoading}
                        loader
                      />
                    </SettingsRow>
                  </>
                )}
              </>
            )}
            <Divider />

            {!rssFeed?.isInitialized && (
              <>
                <SettingsRow>
                  <SettingsLabel customMargin={'0 0 12px 0'} label={'Sitemap RSS feed'} />
                </SettingsRow>

                {!createRss && (
                  <SettingsRow>
                    <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={() => setCreateRss(true)}>
                      <SettingsPlus />
                      <SettingsLabel label="Generate sitemap" />
                    </DomainsSettingsStyled.DomainPlusTitleWrapper>
                  </SettingsRow>
                )}
                {createRss && (
                  <>
                    <SettingsRow>
                      <SettingsInputWithLabel
                        label="Title"
                        placeholder="Title of your channel"
                        name="title"
                        value={rssChannel.title}
                        onChange={handleRssChannelChange}
                      />
                    </SettingsRow>
                    <SettingsRow margin="12px 0 0 0">
                      <SettingsInputWithLabel
                        label="Description"
                        placeholder="Description of your channel"
                        name="description"
                        value={rssChannel.description}
                        onChange={handleRssChannelChange}
                        size={72}
                      />
                    </SettingsRow>
                    <SettingsRow margin="12px 0 0 0">
                      <SettingsInputWithLabel
                        label="Link"
                        placeholder="URL of your website's home page"
                        name="link"
                        value={rssChannel.link}
                        onChange={handleRssChannelChange}
                      />
                    </SettingsRow>
                    {Object.keys(customFields).map((cf, index) => (
                      <SettingsRow margin="12px 0 0 0" key={`${cf} - ${index}`}>
                        <SelectWrapper>
                          <SelectLabel>Type</SelectLabel>
                          <Select
                            dropdownWidth="152px"
                            maxDropdownWidthPX={152}
                            selectOption={startCase(cf)}
                            options={rssSelectOptions}
                            onSelect={handleRssTagSelection(cf)}
                            dropdownTriggerStyles={'padding: 6px 12px 5px;'}
                          />
                        </SelectWrapper>
                        <SettingsInputWithLabel
                          label="Value"
                          placeholder="Enter the value here"
                          name={cf}
                          value={customFields[cf]}
                          onChange={handleCustomFieldsChange}
                        />
                      </SettingsRow>
                    ))}
                    {additionalRssFields.length && (
                      <SettingsRow margin="12px 0 0 0">
                        <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={handleAddRssTag}>
                          <SettingsPlus />
                          <SettingsLabel label="Add RSS tag" />
                        </DomainsSettingsStyled.DomainPlusTitleWrapper>
                      </SettingsRow>
                    )}
                    <SettingsRow margin="12px 0 0 0">
                      <PrimaryButton
                        text="Generate sitemap"
                        isDisabled={isGenerateRssButtonDisabled}
                        onClick={handleRssInitialization}
                        isLoading={isUpdateRssMetaLoading || isInitLoading}
                        loader
                      />
                    </SettingsRow>
                  </>
                )}
              </>
            )}
            {rssFeed?.isInitialized && (
              <>
                {!editRss && (
                  <>
                    <SettingsRow>
                      <RelativeWrapper>
                        <SettingsInputWithLabel
                          label={'Sitemap RSS feed'}
                          size={rssUrl?.length}
                          value={rssUrl}
                          onClick={copyToClipboard('rss')}
                          isReadOnly
                          canCopy
                        />
                        <Tooltip isVisible={rssCopied}>Copied</Tooltip>
                      </RelativeWrapper>
                    </SettingsRow>
                    <SettingsRow margin="12px 0 0 0">
                      <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={() => setEditRss(true)}>
                        <SettingsPencil />
                        <SettingsLabel label="Edit" />
                      </DomainsSettingsStyled.DomainPlusTitleWrapper>
                    </SettingsRow>
                  </>
                )}
                {editRss && (
                  <>
                    <SettingsRow>
                      <SettingsInputWithLabel
                        label="Title"
                        placeholder="Title of your channel"
                        name="title"
                        value={rssChannel.title}
                        onChange={handleRssChannelChange}
                      />
                    </SettingsRow>
                    <SettingsRow margin="12px 0 0 0">
                      <SettingsInputWithLabel
                        label="Description"
                        placeholder="Description of your channel"
                        name="description"
                        value={rssChannel.description}
                        onChange={handleRssChannelChange}
                        size={72}
                      />
                    </SettingsRow>
                    <SettingsRow margin="12px 0 0 0">
                      <SettingsInputWithLabel
                        label="Link"
                        placeholder="URL of your website's home page"
                        name="link"
                        value={rssChannel.link}
                        onChange={handleRssChannelChange}
                      />
                    </SettingsRow>
                    {Object.keys(customFields).map((cf, index) => (
                      <SettingsRow margin="12px 0 0 0" key={`${cf} - ${index}`}>
                        <SelectWrapper>
                          <SelectLabel>Type</SelectLabel>
                          <Select
                            dropdownWidth="152px"
                            maxDropdownWidthPX={152}
                            selectOption={startCase(cf)}
                            options={rssSelectOptions}
                            onSelect={handleRssTagSelection(cf)}
                            dropdownTriggerStyles={'padding: 6px 12px 5px;'}
                          />
                        </SelectWrapper>
                        <SettingsInputWithLabel
                          label="Value"
                          placeholder="Enter the value here"
                          name={cf}
                          value={customFields[cf]}
                          onChange={handleCustomFieldsChange}
                        />
                      </SettingsRow>
                    ))}
                    {additionalRssFields.length ? (
                      <SettingsRow margin="12px 0 0 0">
                        <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={handleAddRssTag}>
                          <SettingsPlus />
                          <SettingsLabel label="Add RSS tag" />
                        </DomainsSettingsStyled.DomainPlusTitleWrapper>
                      </SettingsRow>
                    ) : (
                      <></>
                    )}
                    <SettingsRow margin="12px 0 0 0">
                      <PrimaryButton
                        text="Generate sitemap"
                        isDisabled={isGenerateRssButtonDisabled}
                        onClick={() => handleRssInitialization(true)}
                        isLoading={isUpdateRssMetaLoading || isUpdateSitemapLoading}
                        loader
                      />
                    </SettingsRow>
                  </>
                )}
              </>
            )}
          </SettingsColumn>
        </Container>
      </SettingsCard>
      {!isWorkspaceAdmin && (
        <MoveableTooltip
          showTooltip={showTooltip}
          text="Contact your Workspace admin in order to modify Workspace settings"
        />
      )}
    </>
  );
};

export default memo(Sitemaps);
