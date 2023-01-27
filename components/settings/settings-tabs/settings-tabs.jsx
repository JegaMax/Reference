import Section from '../../layouts/shared/section-title';
import SettingsTabNavLink from './settings-tab-navlink';
import styled from 'styled-components';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppSelector } from 'hooks';
import { RoleName } from 'appredux/services/workspaces/interface';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';

const StyledSettingsTabs = styled.div`
  margin-bottom: 10px;
`;

const SettingsTabs = () => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const { isStoryConversionEnabled } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      isStoryConversionEnabled: workspace?.isStoryConversionEnabled,
    }),
  });

  return (
    <Section.Wrapper>
      <StyledSettingsTabs>
        <SettingsTabNavLink to={'/settings/workspace'} title={'Workspace'} />
        <SettingsTabNavLink to={'/settings/publishing'} title={'Publishing'} />
        <SettingsTabNavLink to={'/settings/branding'} title={'Branding'} />
        <SettingsTabNavLink to={'/settings/members'} title={'Members'} />
        {isStoryConversionEnabled && <SettingsTabNavLink to={'/settings/api'} title={'API'} />}
      </StyledSettingsTabs>
    </Section.Wrapper>
  );
};

export default SettingsTabs;
