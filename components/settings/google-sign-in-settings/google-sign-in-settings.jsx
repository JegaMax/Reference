import { skipToken } from '@reduxjs/toolkit/dist/query';
import { MoveableTooltip } from 'components/tooltip';
import { useAppSelector, useDidUpdateEffect, useToggle } from 'hooks';
import { debounce } from 'lodash';
import { memo, useCallback, useEffect, useState } from 'react';
import { RoleName } from 'appredux/services/workspaces/interface';
import { useGetWorkspaceQuery, useUpdateGoogleSignInMutation } from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import SettingsCard from '../shared/settings-card';
import SettingsColumn from '../shared/settings-column';
import SettingsInfo from '../shared/settings-info';
import SettingsInfoText from '../shared/settings-info-text';
import SettingsInfoTitle from '../shared/settings-info-title';
import SettingsInputWithLabel from '../shared/settings-input-with-label';
import SettingsRow from '../shared/settings-row';
import SettingsTitle from '../shared/settings-title';

const GoogleSignInSettingsWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  padding: 14px 41px 18px 12px;
  margin-bottom: 28px;
`;

const TitleRowWrapper = styled.div`
  margin-bottom: 15px;
`;

const TitleHint = styled(SettingsInfoTitle)`
  padding-left: 24px;
  margin-bottom: 15px;
`;

const HintText = styled(SettingsInfoText)`
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

const GoogleSignInSettings = () => {
  const { isShown, toggle, setHide } = useToggle(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [appId, setAppId] = useState('');

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const [updateGoogleSignIn] = useUpdateGoogleSignInMutation();

  const { isWorkspaceAdmin, googleSignInAppId, extendedAccess } = useGetWorkspaceQuery(
    selectedWorkspaceId ?? skipToken,
    {
      selectFromResult: ({ data: workspace }) => ({
        isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
        googleSignInAppId: workspace?.googleSignInAppId ?? '',
        extendedAccess: workspace?.extendedAccess,
      }),
    },
  );

  const handleUpdateGoogleSignInDebounced = useCallback(
    debounce((data) => {
      updateGoogleSignIn(data);
    }, 1000),
    [],
  );

  useEffect(() => {
    setAppId(googleSignInAppId);
  }, [googleSignInAppId]);

  useDidUpdateEffect(() => {
    if (appId !== googleSignInAppId) {
      handleUpdateGoogleSignInDebounced(appId);
    }
  }, [appId]);

  const handleGoogleSignInUpdate = async (e) => {
    const value = e.target.value || null;
    setAppId(value);
  };

  if (!extendedAccess?.isEnabled) {
    return <></>;
  }

  return (
    <>
      <SettingsCard>
        <GoogleSignInSettingsWrapper
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SettingsColumn flexGrow={'1'} flexShrink={'1'} flexBasis={'auto'} maxWidth={'324px'} minWidth={'252px'}>
            <TitleRowWrapper>
              <SettingsRow>
                <SettingsTitle title={'Google Extended Access'} />
                <SettingsInfo onClick={toggle} />
              </SettingsRow>
            </TitleRowWrapper>
            <SettingsRow>
              <SettingsInputWithLabel
                label={'Google API client ID'}
                placeholder={'e.g. 11111111111-xxxxxxxxxxx.apps.yourapp.com'}
                value={appId ?? ''}
                onChange={handleGoogleSignInUpdate}
                isDisabled={!isWorkspaceAdmin}
              />
            </SettingsRow>
          </SettingsColumn>

          {isShown && (
            <SettingsColumn flexBasis={'0'} flexGrow={'1'} flexShrink={'1'} minWidth={'150px'}>
              <SettingsRow>
                <TitleHint title={'What is Google Extended Access?'} onClick={setHide} />
              </SettingsRow>

              <SettingsRow>
                <HintText>
                  Google Extended Access is a feature that provides publishers with qualified leads to deepen user
                  engagement and build brand loyalty. By enabling Google Extended Access in your Stories, your users
                  will have the chance to sign-in to your website using their Google account directly from the Story.
                </HintText>
              </SettingsRow>
            </SettingsColumn>
          )}
        </GoogleSignInSettingsWrapper>
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

export default memo(GoogleSignInSettings);
