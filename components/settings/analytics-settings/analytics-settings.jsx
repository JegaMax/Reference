import { skipToken } from '@reduxjs/toolkit/dist/query';
import ToggleSwitch from 'components/shared/toggle-switch';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { RoleName } from 'appredux/services/workspaces/interface';
import {
  useAddAnalyticsTrackingAccountIdMutation,
  useDeleteWorkspaceCustomSnippetMutation,
  useGetAnalyticsTrackingAccountIdQuery,
  useGetWorkspaceQuery,
  useGetWorkspaceSnippetsQuery,
  useSaveWorkspaceCustomSnippetMutation,
  useUpdateWorkspaceGeneralSettingsMutation
} from 'appredux/services/workspaces/workspaces';
import styled, { css } from 'styled-components';
import { googleAnalyticsRegex } from '../../../config/constants';
import { useAppSelector } from '../../../hooks';
import snippetValidator from '../../../utils/snippetValidator';
import { PrimaryButton } from '../../buttons';
import { DeleteSM } from '../../icons';
import MessageModal from '../../message-modal';
import InputBasic from '../../shared/input-basic';
import { MoveableTooltip } from '../../tooltip';
import SettingsBoldInfoText from '../shared/settings-bold-info-text';
import SettingsCard from '../shared/settings-card';
import SettingsColumn from '../shared/settings-column';
import SettingsInfo from '../shared/settings-info';
import SettingsInfoText from '../shared/settings-info-text';
import SettingsInfoTitle from '../shared/settings-info-title';
import SettingsInputWithLabel from '../shared/settings-input-with-label';
import SettingsLabel from '../shared/settings-label';
import SettingsPlus from '../shared/settings-plus-circle';
import SettingsRow from '../shared/settings-row';
import SettingsSnippetPreview from '../shared/settings-snippet-preview';
import SettingsSnippetStatus from '../shared/settings-snippet-status';
import SettingsTextareaWithLabel from '../shared/settings-textarea-with-label';
import SettingsTitle from '../shared/settings-title';

const AnalyticsSettingsTitleRowWrapper = styled.div`
  margin-bottom: 15px;
`;

const AnalyticsSettingsWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding: 14px 41px 18px 12px;
  margin-bottom: 28px;
`;

const SnippetPlusTitleWrapper = styled.div`
  display: flex;
  margin-top: 13px;
  > div {
    margin-right: 6px;
  }
`;

const SnippetInfoWrapper = styled.div`
  display: flex;
  margin: 23px 0 0 0;
  > label {
    margin-right: 13px;
  }
`;

const SnippetInfoTitle = styled(SettingsInfoTitle)`
  margin-bottom: 15px;
`;

const FormWrapper = styled.div`
  width: 100%;
`;

const FormRow = styled.div`
  &:not(:last-of-type) {
    margin-bottom: 17px;
  }
`;

const SettingsSnippetDeleteWrapper = styled.div`
  align-self: center;
  margin-left: 7px;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  transition: 0.12s ease;
  margin-right: 4px;
  &:hover {
    background: var(--shade-500-85);
  }
`;

const SettingsSnippetSubmitBtn = styled(PrimaryButton)`
  font-size: 14px;
  line-height: 20px;
  font-weight: 500;
  padding: 6px 89px;
  margin-top: 17px;
`;

const SnippetListElement = styled(InputBasic)`
  max-width: 228px;
`;

const SettingsRowWrapper = styled.div`
  margin-right: -1px;
  width: calc(100% + 1px);
  min-height: 167px;
  position: relative;
`;

const SnippetSettingsRow = styled.div`
  position: relative;
  width: calc(100% + 1px);
  padding-right: 10px;
  margin-bottom: 9px;
  ${({ isActive }) =>
    isActive &&
    css`
      &::before {
        content: '';
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6.5px 7px 6.5px 0;
        border-color: transparent var(--shade-900) transparent transparent;
        z-index: 2;
      }
      &::after {
        content: '';
        position: absolute;
        right: 1px;
        top: 50%;
        transform: translateY(-50%);
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6.5px 7px 6.5px 0;
        border-color: transparent var(--white) transparent transparent;
        z-index: 1;
      }
    `}
`;

const Border = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 1px;
  height: calc(100% - 10px);
  background: var(--white);
`;

const initialSnippetState = {
  name: '',
  bodyCode: '',
  headCode: '',
};

const AnalyticsSettings = () => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const { isWorkspaceAdmin, isGoogleAnalyticsEnabled } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
      isGoogleAnalyticsEnabled: workspace?.isGoogleAnalyticsEnabled ?? false,
    }),
  });

  const { data: initialTrackingAccountId } = useGetAnalyticsTrackingAccountIdQuery(selectedWorkspaceId ?? skipToken);
  const [saveAnalytics] = useAddAnalyticsTrackingAccountIdMutation();
  const [toggleIsAnalyticsEnabled] = useUpdateWorkspaceGeneralSettingsMutation();

  const { data: initialCustomSnippets } = useGetWorkspaceSnippetsQuery(selectedWorkspaceId ?? skipToken);
  const [saveSnippet] = useSaveWorkspaceCustomSnippetMutation();
  const [deleteSnippet] = useDeleteWorkspaceCustomSnippetMutation();

  const [snippet, setSnippet] = useState(initialSnippetState);
  const [snippets, setSnippets] = useState([]);
  const [shouldShowInfo, setShouldShowInfo] = useState(false);
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const [shouldShowPreview, setShouldShowPreview] = useState(false);
  const [isDeleteSnippetModalOpen, setIsDeleteSnippetModalOpen] = useState(false);
  const [trackingAccountId, setTrackingAccountId] = useState(initialTrackingAccountId);
  const [errors, setErrors] = useState({
    name: '',
    bodyCode: '',
    headCode: '',
    trackingAccountId: '',
  });
  const [activeSnippetId, setActiveSnippetId] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const areFormsOpened = shouldShowInfo || shouldShowForm || shouldShowPreview;

  const isSubmitDisabled = useMemo(() => {
    return Boolean(
      errors.name || errors.bodyCode || errors.headCode || !snippet.name || !snippet.bodyCode || !snippet.headCode,
    );
  }, [errors, snippet]);

  useEffect(() => {
    setSnippets(initialCustomSnippets ?? []);
  }, [initialCustomSnippets]);

  useEffect(() => {
    setTrackingAccountId((v) => (v !== initialTrackingAccountId ? initialTrackingAccountId : v));
  }, [initialTrackingAccountId]);

  const isValid = (trackingAccountId) => {
    if (googleAnalyticsRegex.test(trackingAccountId) || trackingAccountId === '') {
      return null;
    }

    return 'Please enter a valid Google Analytics ID';
  };

  const handleUpdateAnalyticsSettingsDebounced = useCallback(
    debounce(async (trackingAccountId) => {
      const error = isValid(trackingAccountId);
      if (error) {
        setErrors({ ...errors, trackingAccountId });
        return;
      }

      if (selectedWorkspaceId) {
        saveAnalytics({ workspaceId: selectedWorkspaceId, googleAnalytics: { trackingAccountId } });
      }
    }, 1000),
    [],
  );

  const handleGAChange = (e) => {
    const { value } = e.target;

    errors.trackingAccountId && setErrors({ ...errors, trackingAccountId: '' });

    setTrackingAccountId(value);
    handleUpdateAnalyticsSettingsDebounced(value);
  };

  const toggleInfo = (show) => setShouldShowInfo(show);
  const toggleForm = (show) => setShouldShowForm(show);
  const togglePreview = (show) => setShouldShowPreview(show);

  const handleSnippetChange = (e) => {
    const { name, value } = e.target;

    setErrors({ ...errors, [name]: '' });
    setSnippet((prevSnippet) => ({
      ...prevSnippet,
      [name]: value,
    }));
  };

  const handleCloseForm = () => {
    setSnippet(initialSnippetState);
    toggleForm(false);
    setActiveSnippetId(null);
  };

  const handleOpenPreview = (snippet) => {
    setSnippet(snippet);
    setActiveSnippetId(snippet?._id || null);
    togglePreview(true);
    toggleInfo(false);
    toggleForm(false);
  };

  const handleClosePreview = () => {
    setSnippet(initialSnippetState);
    togglePreview(false);
    setActiveSnippetId(null);
  };

  const handleSnippetFormSubmit = async () => {
    const validator = snippetValidator(snippet);

    validator.validate();
    if (!validator.isValid()) {
      setErrors(validator.getErrors());
      return;
    }

    saveSnippet(snippet);
    handleCloseForm();
  };

  const deleteSnippetFromList = (id) => {
    setSnippets(snippets.filter((snippet) => snippet._id != id));
  };

  const handleSnippetDelete = async (id) => {
    if (selectedWorkspaceId && id) {
      try {
        deleteSnippet({ workspaceId: selectedWorkspaceId, snippetId: id });
        deleteSnippetFromList(id);

        handleClosePreview();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onCancelDeleteSnippet = () => setIsDeleteSnippetModalOpen(false);
  const onAcceptDeleteSnippet = () => {
    handleSnippetDelete(snippet._id);
    setIsDeleteSnippetModalOpen(false);
  };

  const toggleAnalytics = useCallback(() => {
    toggleIsAnalyticsEnabled({
      isGoogleAnalyticsEnabled: !isGoogleAnalyticsEnabled,
    });
  }, [isGoogleAnalyticsEnabled, toggleIsAnalyticsEnabled]);

  return (
    <>
      <SettingsCard>
        <AnalyticsSettingsWrapper onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
          <SettingsColumn
            flexBasis={areFormsOpened ? 'auto' : '100%'}
            flexGrow={'1'}
            flexShrink={'1'}
            maxWidth={areFormsOpened ? '324px' : '100%'}
            minWidth={'280px'}
          >
            <SettingsRow>
              <AnalyticsSettingsTitleRowWrapper>
                <SettingsTitle title={'Analytics'} />
              </AnalyticsSettingsTitleRowWrapper>
            </SettingsRow>
            <SettingsRowWrapper>
              <SettingsRow margin="0 0 16px 0" alignItems="center" disableCursor={!isWorkspaceAdmin}>
                <SettingsLabel customMargin={'0 16px 0 0'} label={'Google Analytics tracking'} />
                <ToggleSwitch isOn={isGoogleAnalyticsEnabled} onClick={toggleAnalytics} />
              </SettingsRow>
              <SettingsRow>
                {isGoogleAnalyticsEnabled && (
                  <SettingsInputWithLabel
                    error={errors.trackingAccountId}
                    label={'Connect your own Google Analytics'}
                    placeholder={'e.g. UA-97508922-1'}
                    value={trackingAccountId ?? ''}
                    name={'trackingAccountId'}
                    onChange={handleGAChange}
                    isDisabled={!isWorkspaceAdmin}
                  />
                )}
              </SettingsRow>
              <SettingsRow>
                <SnippetInfoWrapper>
                  <SettingsLabel label={'Custom code snippet'} />
                  <SettingsInfo
                    onClick={() => {
                      if (!shouldShowInfo) {
                        handleCloseForm();
                        handleClosePreview();
                        setActiveSnippetId(null);
                      }
                      toggleInfo(!shouldShowInfo);
                    }}
                  />
                </SnippetInfoWrapper>
              </SettingsRow>

              {shouldShowForm && (
                <SnippetSettingsRow isActive={true}>
                  <SettingsRow>
                    <SettingsInputWithLabel
                      name={'name'}
                      autoFocus={true}
                      error={errors.name}
                      placeholder={'Set a name for your snippet'}
                      value={snippet.name}
                      onChange={handleSnippetChange}
                    />
                    <SettingsSnippetDeleteWrapper onClick={handleCloseForm}>
                      <DeleteSM />
                    </SettingsSnippetDeleteWrapper>
                  </SettingsRow>
                </SnippetSettingsRow>
              )}

              {snippets && (
                <>
                  {snippets.map((snippet) => (
                    <SnippetSettingsRow key={`snippet-${snippet._id}`} isActive={activeSnippetId === snippet._id}>
                      <SettingsRow>
                        <SnippetListElement
                          value={snippet.name}
                          isReadOnly={true}
                          onClick={() => handleOpenPreview(snippet)}
                        />
                        <SettingsSnippetDeleteWrapper
                          onClick={() => {
                            if (isWorkspaceAdmin) {
                              setIsDeleteSnippetModalOpen(true);
                              setSnippet(snippet);
                            }
                          }}
                        >
                          <DeleteSM />
                        </SettingsSnippetDeleteWrapper>
                        <SettingsSnippetStatus status={snippet.status} canExpand={!areFormsOpened} />
                      </SettingsRow>
                    </SnippetSettingsRow>
                  ))}
                  <MessageModal
                    isOpen={isDeleteSnippetModalOpen}
                    message={'Are you sure you want to delete the snippet?'}
                    description={
                      'This will permanently delete this custom snippet. All previously exported stories with this snippet remain unaffected.'
                    }
                    shouldCloseOnOverlayClick={true}
                    onCancel={onCancelDeleteSnippet}
                    onAccept={onAcceptDeleteSnippet}
                  />
                </>
              )}

              {!shouldShowForm && (
                <SettingsRow>
                  <SnippetPlusTitleWrapper
                    onClick={() => {
                      if (isWorkspaceAdmin) {
                        toggleForm(true);
                        toggleInfo(false);
                        setActiveSnippetId(null);
                        handleClosePreview();
                      }
                    }}
                  >
                    <SettingsPlus />
                    <SettingsLabel label={snippets ? 'Add new snippet' : 'Create your first snippet'} />
                  </SnippetPlusTitleWrapper>
                </SettingsRow>
              )}
              {areFormsOpened && <Border />}
            </SettingsRowWrapper>
          </SettingsColumn>

          {shouldShowInfo && (
            <SettingsColumn flexBasis={'0'} flexGrow={'1'} flexShrink={'1'} minWidth={'150px'}>
              <SettingsRow>
                <SnippetInfoTitle title={'What are custom code snippets?'} onClick={() => toggleInfo(false)} />
              </SettingsRow>
              <SettingsRow>
                <SettingsInfoText>
                  Custom code snippets allow you to modify the code of your Web Story and add valuable components such
                  as external trackers or any other custom modifications that you want to enable. All custom code
                  snippets you create first need to be <SettingsBoldInfoText>validated by us</SettingsBoldInfoText> to
                  take effect. A validated code snippet automatically
                  <SettingsBoldInfoText> applies to all Web Stories</SettingsBoldInfoText> that are published after the
                  validation. Click on the “+” to start the process.
                  <br />
                  <br />
                  <SettingsBoldInfoText>Careful</SettingsBoldInfoText>: Your custom code snippet may cause issues with
                  regards to the AMP Validation of a Webstory.
                </SettingsInfoText>
              </SettingsRow>
            </SettingsColumn>
          )}

          {shouldShowForm && (
            <SettingsColumn flexBasis={'auto'} flexGrow={'1'} flexShrink={'1'} minWidth={'250px'}>
              <SettingsRow>
                <SnippetInfoTitle title={'Create a custom code snippet'} withCloseBtn={false} />
              </SettingsRow>

              <SettingsRow>
                <FormWrapper>
                  <FormRow>
                    <SettingsInputWithLabel
                      name={'headCode'}
                      error={errors.headCode}
                      label={'<head> code'}
                      placeholder={'Insert <head> code'}
                      value={snippet.headCode}
                      onChange={handleSnippetChange}
                    />
                  </FormRow>

                  <FormRow>
                    <SettingsTextareaWithLabel
                      name={'bodyCode'}
                      error={errors.bodyCode}
                      label={'<body> code'}
                      placeholder={'Insert <body> code'}
                      value={snippet.bodyCode}
                      onChange={handleSnippetChange}
                    />
                  </FormRow>
                </FormWrapper>
              </SettingsRow>
              <SettingsRow justifyContent={'flex-end'}>
                <SettingsSnippetSubmitBtn
                  text={'Submit'}
                  onClick={handleSnippetFormSubmit}
                  sizeType={'medium'}
                  isDisabled={isSubmitDisabled}
                />
              </SettingsRow>
            </SettingsColumn>
          )}

          {shouldShowPreview && (
            <SettingsColumn flexBasis={'auto'} flexGrow={'1'} flexShrink={'1'} minWidth={'250px'}>
              <SettingsSnippetPreview snippet={snippet} handleClick={handleClosePreview} />
            </SettingsColumn>
          )}
        </AnalyticsSettingsWrapper>
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

export default AnalyticsSettings;
