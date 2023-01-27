import { skipToken } from '@reduxjs/toolkit/dist/query';
import debounce from 'lodash/debounce';
import { memo, useCallback, useEffect, useState } from 'react';
import { RoleName } from 'appredux/services/workspaces/interface';
import {
  useDeleteWorkspaceSeoImageMutation,
  useGetWorkspaceQuery,
  useUpdateWorkspaceSeoSettingsMutation
} from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import { useAppSelector, useDidUpdateEffect, useToggle } from '../../../hooks';
import { MoveableTooltip } from '../../tooltip';
import SettingsCard from '../shared/settings-card';
import SettingsColumn from '../shared/settings-column';
import SettingsImage from '../shared/settings-image';
import SettingsInfo from '../shared/settings-info';
import SettingsInfoText from '../shared/settings-info-text';
import SettingsInfoTitle from '../shared/settings-info-title';
import SettingsInputWithLabel from '../shared/settings-input-with-label';
import SettingsLabel from '../shared/settings-label';
import SettingsRow from '../shared/settings-row';
import SettingsTitle from '../shared/settings-title';

const IconsColumn = styled(SettingsColumn)`
  margin-right: max(10px, 5%);
`;

const SeoSettingsTitleRowWrapper = styled.div`
  margin-bottom: 15px;
`;

const ImageRowWrapper = styled.div`
  margin-top: 34px;
  &:not(:last-of-type) {
    margin-right: 20px;
  }
`;

const SeoSettingsWrapper = styled.div`
  display: flex;
  padding: 14px 41px 18px 12px;
  flex-wrap: wrap;
  margin-bottom: 28px;
`;

const SeoHintTitle = styled(SettingsInfoTitle)`
  padding-left: 24px;
  margin-bottom: 15px;
`;

const SeoHintText = styled(SettingsInfoText)`
  padding-left: 24px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);
    height: calc(100% - 8px);
    width: 1px;
    background: var(--white);
  }
`;

const SeoSettings = () => {
  const { isShown, toggle, setHide } = useToggle(false);

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const { favIconLogo, publisherName, publisherLogoUrl, isWorkspaceAdmin } = useGetWorkspaceQuery(
    selectedWorkspaceId ?? skipToken,
    {
      selectFromResult: ({ data: workspace }) => ({
        favIconLogo: workspace?.favIconLogo ?? '',
        publisherName: workspace?.publisher ?? '',
        publisherLogoUrl: workspace?.publisherLogoUrl ?? '',
        isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
      }),
    },
  );

  const [isLoading, setIsLoading] = useState({
    favicon: false,
    publisherLogo: false,
  });
  const [publisher, setPublisher] = useState(publisherName);
  const [showTooltip, setShowTooltip] = useState(false);

  const [updateSeoSettings] = useUpdateWorkspaceSeoSettingsMutation();
  const [deleteWorkspaceSeoImage] = useDeleteWorkspaceSeoImageMutation();

  const handleUpdateSeoSettingsDebounced = useCallback(
    debounce((data) => {
      updateSeoSettings(data);
    }, 1000),
    [],
  );

  useEffect(() => {
    setPublisher((p) => (p !== publisherName ? publisherName : p));
  }, [publisherName]);

  useDidUpdateEffect(() => {
    if (publisher !== publisherName) {
      handleUpdateSeoSettingsDebounced({ publisher });
    }
  }, [publisher]);

  const changeIsLoading = (field, loading) => {
    setIsLoading((prevIsLoading) => {
      return { ...prevIsLoading, [field]: loading };
    });
  };

  const handleImageUpdate = async (e, field) => {
    if (e?.target?.files?.length) {
      changeIsLoading(field, true);
      const formData = new FormData();
      const file = e.target.files[0];

      formData.append(field, file);
      await updateSeoSettings(formData).unwrap();
      changeIsLoading(field, false);
    }
  };

  const handleImageDelete = async (field, value) => {
    changeIsLoading(field, true);
    await deleteWorkspaceSeoImage({ [field]: value }).unwrap();
    changeIsLoading(field, false);
  };

  const handlePublisherNameChange = (e) => {
    setPublisher(e.target.value);
  };

  return (
    <>
      <SettingsCard>
        <SeoSettingsWrapper onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          <SettingsColumn flexGrow={'1'} flexShrink={'1'} flexBasis={'auto'} maxWidth={'324px'} minWidth={'252px'}>
            <SeoSettingsTitleRowWrapper>
              <SettingsRow>
                <SettingsTitle title={'SEO'} />
                <SettingsInfo onClick={toggle} />
              </SettingsRow>
            </SeoSettingsTitleRowWrapper>
            <SettingsRow>
              <SettingsInputWithLabel
                label={'Publisher name'}
                placeholder={'e.g. Zazu'}
                value={publisher}
                onChange={handlePublisherNameChange}
                isDisabled={!isWorkspaceAdmin}
              />
            </SettingsRow>
          </SettingsColumn>

          <IconsColumn
            flexBasis={'auto'}
            flexGrow={'1'}
            flexShrink={'1'}
            maxWidth={'200px'}
            justifyContent={'space-between'}
            minWidth={'150px'}
          >
            <SettingsRow justifyContent={'space-between'}>
              <ImageRowWrapper>
                <SettingsLabel label={'Publisher logo'} />
                <SettingsImage
                  image={publisherLogoUrl}
                  isLoading={isLoading.publisherLogo}
                  handleImageClick={() => handleImageDelete('publisherLogo', publisherLogoUrl)}
                  handleInputClick={(e) => handleImageUpdate(e, 'publisherLogo')}
                  isDisabled={!isWorkspaceAdmin}
                />
              </ImageRowWrapper>
              <ImageRowWrapper>
                <SettingsLabel label={'Favicon'} />
                <SettingsImage
                  image={favIconLogo}
                  isLoading={isLoading.favicon}
                  handleImageClick={() => handleImageDelete('favicon', favIconLogo)}
                  handleInputClick={(e) => handleImageUpdate(e, 'favicon')}
                  isDisabled={!isWorkspaceAdmin}
                />
              </ImageRowWrapper>
            </SettingsRow>
          </IconsColumn>

          {isShown && (
            <SettingsColumn flexBasis={'0'} flexGrow={'1'} flexShrink={'1'} minWidth={'150px'}>
              <SettingsRow>
                <SeoHintTitle title={'What is SEO'} onClick={setHide} />
              </SettingsRow>

              <SettingsRow>
                <SeoHintText>
                  SEO stands for Search Engine Optimization. Define your name, logo and favicon to help users to better
                  find your WebStory on Google and directly relate it to your brand.
                </SeoHintText>
              </SettingsRow>
            </SettingsColumn>
          )}
        </SeoSettingsWrapper>
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

export default memo(SeoSettings);
