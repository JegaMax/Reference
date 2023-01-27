import { skipToken } from '@reduxjs/toolkit/dist/query';
import debounce from 'lodash/debounce';
import { memo, useCallback, useEffect, useState } from 'react';
import { RoleName } from 'appredux/services/workspaces/interface';
import {
  useDeleteWorkspaceSeoImageMutation,
  useGetWorkspaceQuery,
  useUpdateWorkspaceGeneralSettingsMutation
} from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import { useAppSelector, useDidUpdateEffect } from '../../../hooks';
import { MoveableTooltip } from '../../tooltip';
import SettingsCard from '../shared/settings-card';
import SettingsColumn from '../shared/settings-column';
import SettingsImage from '../shared/settings-image';
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

const WorkspaceSettings = () => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const { title, logoUrl, isWorkspaceAdmin } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      title: workspace?.title ?? '',
      logoUrl: workspace?.logoUrl ?? '',
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
    }),
  });

  const [showTooltip, setShowTooltip] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(title);

  const [updateGeneralSettings, { isLoading }] = useUpdateWorkspaceGeneralSettingsMutation();
  const [deleteSeoImage, { isLoading: isDeletingInProgress }] = useDeleteWorkspaceSeoImageMutation();

  const handleUpdateSettingsDebounced = useCallback(
    debounce((data) => {
      updateGeneralSettings(data);
    }, 1000),
    [],
  );

  useEffect(() => {
    setWorkspaceName((n) => (n !== title ? title : n));
  }, [title]);

  useDidUpdateEffect(() => {
    if (workspaceName !== title) {
      handleUpdateSettingsDebounced({ title: workspaceName });
    }
  }, [workspaceName]);

  const handleImageUpdate = async (e, field) => {
    if (e?.target?.files?.length) {
      const formData = new FormData();
      const file = e.target.files[0];

      formData.append(field, file);

      updateGeneralSettings(formData);
    }
  };

  const handleImageDelete = async (value) => deleteSeoImage({ logo: value });
  const handleWorkspaceNameChange = (e) => setWorkspaceName(e.target.value);

  return (
    <>
      <SettingsCard>
        <SeoSettingsWrapper onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          <SettingsColumn flexGrow={'1'} flexShrink={'1'} flexBasis={'auto'} maxWidth={'324px'} minWidth={'252px'}>
            <SeoSettingsTitleRowWrapper>
              <SettingsRow>
                <SettingsTitle title={'General'} />
              </SettingsRow>
            </SeoSettingsTitleRowWrapper>
            <SettingsRow>
              <SettingsInputWithLabel
                label={'Workspace name'}
                placeholder={'e.g. Zazu'}
                value={workspaceName}
                onChange={handleWorkspaceNameChange}
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
                <SettingsLabel label={'Workspace logo'} />
                <SettingsImage
                  image={logoUrl}
                  isLoading={isLoading || isDeletingInProgress}
                  handleImageClick={() => handleImageDelete(logoUrl)}
                  handleInputClick={(e) => handleImageUpdate(e, 'logo')}
                  isDisabled={!isWorkspaceAdmin}
                />
              </ImageRowWrapper>
            </SettingsRow>
          </IconsColumn>
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

export default memo(WorkspaceSettings);
