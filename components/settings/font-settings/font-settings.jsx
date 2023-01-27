import { skipToken } from '@reduxjs/toolkit/dist/query';
import { memo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAddWorkspaceFontMutation, useWorkspaceFontsListQuery } from 'appredux/services/fonts/fonts';
import { RoleName } from 'appredux/services/workspaces/interface';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import { useAppSelector } from '../../../hooks';
import { MoveableTooltip } from '../../tooltip';
import SettingsColumn from '../shared/settings-column';
import SettingsRow from '../shared/settings-row';
import SettingsSectionTitle from '../shared/settings-section-title';
import SettingsTitle from '../shared/settings-title';
import AddFontButton from './add-font-button';
import FontField from './font-field';
import FontStylesModule from './font-styles-module';

const Title = styled(SettingsTitle)`
  margin: 0 0 14px;
`;

const FontSettingsWrapper = styled.div`
  padding: 7px 41px 14px 12px;
  margin-bottom: 28px;
`;

const OverrideSettingsCard = styled.div`
  width: 100%;
  border-radius: 12px;
  background: var(--shade-900-85);
  backdrop-filter: blur(50px);
  box-shadow: 24px 32px 72px var(--black-18);

  z-index: 1;
  position: relative;
`;

const FontSettings = () => {
  const containerRef = useRef(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);
  const isFontStyleModalOpenState = useAppSelector((state) => state.helpers.isFontStyleModalOpenState);

  const { isWorkspaceAdmin } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
    }),
  });

  const { data: workspaceFonts } = useWorkspaceFontsListQuery(selectedWorkspaceId ?? skipToken);
  const [addWorkspaceFont] = useAddWorkspaceFontMutation();

  const onFontUpload = async (event) => {
    const files = event?.target?.files;
    const filesArray = Array.from(files ?? []);

    for await (const file of filesArray) {
      const formData = new FormData();
      formData.append('file', file);
      addWorkspaceFont(formData);
    }
  };

  return (
    <>
      <OverrideSettingsCard ref={containerRef}>
        <FontSettingsWrapper onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          <SettingsColumn>
            <SettingsRow>
              <Title title={'Fonts'} />
            </SettingsRow>
            <SettingsRow gap="42px">
              <SettingsColumn flexBasis={'auto'} minWidth={'286px'} padding="0">
                <SettingsSectionTitle text={'Text styles'} />
                <FontStylesModule parentRef={containerRef} />
              </SettingsColumn>
              <SettingsColumn flexBasis={'auto'} minWidth={'286px'} padding="0">
                <SettingsSectionTitle text={'Brand fonts'} />
                {workspaceFonts?.map((font) => {
                  return <FontField key={font._id} font={font} />;
                })}

                <AddFontButton isDisabled={!isWorkspaceAdmin} onClick={onFontUpload} />
              </SettingsColumn>
            </SettingsRow>
          </SettingsColumn>
        </FontSettingsWrapper>
      </OverrideSettingsCard>

      {!isWorkspaceAdmin &&
        createPortal(
          <MoveableTooltip
            showTooltip={showTooltip}
            text="Contact your Workspace admin in order to modify Workspace settings"
          />,
          document.body,
        )}
    </>
  );
};

export default memo(FontSettings);
