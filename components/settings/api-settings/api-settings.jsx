import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppSelector } from 'hooks';
import { memo, useState } from 'react';
import { RoleName } from 'appredux/services/workspaces/interface';
import { useGenerateApiKeyMutation, useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import { MoveableTooltip } from '../../tooltip';
import DomainsSettingsStyled from '../custom-domains-settings/custom-domains-settings-styled';
import SettingsCard from '../shared/settings-card';
import SettingsColumn from '../shared/settings-column';
import SettingsInfo from '../shared/settings-info';
import SettingsInfoText from '../shared/settings-info-text';
import SettingsInputWithLabel from '../shared/settings-input-with-label';
import SettingsLabel from '../shared/settings-label';
import SettingsPlus from '../shared/settings-plus-circle';
import SettingsReplace from '../shared/settings-replace-circle';
import SettingsRow from '../shared/settings-row';

const Spacer = styled.div`
  margin-bottom: 20px;
`;

const InputWrapper = styled.div`
  min-width: 400px;
`;

const StyledLink = styled.a`
  color: var(--primary);
`;

const ApiSettings = () => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const { apiKey, isWorkspaceAdmin } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      apiKey: workspace?.apiKey,
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
    }),
  });

  const [shouldShowInfo, setShouldShowInfo] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [generateApiKey] = useGenerateApiKeyMutation();

  const toggleInfo = (show) => setShouldShowInfo(show);

  const handleShowSettingsInfoClick = () => toggleInfo(!shouldShowInfo);
  const handleGenerateApiKey = () => generateApiKey();

  return (
    <>
      <SettingsCard>
        <DomainsSettingsStyled.DomainsSettingsWrapper
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SettingsColumn
            flexBasis={shouldShowInfo ? 'auto' : '100%'}
            flexGrow={'1'}
            flexShrink={'1'}
            maxWidth={shouldShowInfo ? '468px' : '100%'}
            minWidth={'400px'}
          >
            <SettingsRow>
              <DomainsSettingsStyled.Title title={'API key'} />
              <SettingsInfo onClick={handleShowSettingsInfoClick} />
            </SettingsRow>

            <DomainsSettingsStyled.DomainsRowWrapper minHeight="0px">
              {apiKey && (
                <>
                  <SettingsRow>
                    <InputWrapper>
                      <SettingsInputWithLabel hasReveal value={apiKey} isReadOnly />
                    </InputWrapper>
                  </SettingsRow>
                  <Spacer />
                </>
              )}
              <SettingsRow>
                <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={handleGenerateApiKey}>
                  {apiKey ? <SettingsReplace /> : <SettingsPlus />}
                  <SettingsLabel label={`Generate ${apiKey ? 'new' : ''} API key`} />
                </DomainsSettingsStyled.DomainPlusTitleWrapper>
              </SettingsRow>

              {shouldShowInfo && <DomainsSettingsStyled.Border />}
            </DomainsSettingsStyled.DomainsRowWrapper>
          </SettingsColumn>

          {shouldShowInfo && (
            <SettingsColumn flexBasis={'0'} flexGrow={'1'} flexShrink={'1'} minWidth={'150px'}>
              <SettingsRow>
                <DomainsSettingsStyled.SnippetInfoTitle
                  title={'What is an API key?'}
                  onClick={() => toggleInfo(false)}
                />
              </SettingsRow>
              <SettingsRow>
                <SettingsInfoText>
                  An API key is required by your IT team in order to use some specific features (for example: Story
                  Conversion). You can find more information on Zazu documentation page{' '}
                  <StyledLink href="https://docs.zazuapp.co" target="_blank">
                    https://docs.zazuapp.co
                  </StyledLink>
                  .
                </SettingsInfoText>
              </SettingsRow>
            </SettingsColumn>
          )}
        </DomainsSettingsStyled.DomainsSettingsWrapper>
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

export default memo(ApiSettings);
