import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { RoleName } from 'appredux/services/workspaces/interface';
import {
  useCreateCustomDomainMutation,
  useDeleteCustomDomainMutation,
  useGetWorkspaceQuery
} from 'appredux/services/workspaces/workspaces';
import { DEFAULT_TOAST_CONFIG, domainNameRegex } from '../../../config/constants';
import { useAppSelector } from '../../../hooks';
import { DeleteSM, WarningIcon } from '../../icons';
import MessageModal from '../../message-modal';
import { MoveableTooltip } from '../../tooltip';
import SettingsBoldInfoText from '../shared/settings-bold-info-text';
import SettingsCard from '../shared/settings-card';
import SettingsColumn from '../shared/settings-column';
import SettingsInfo from '../shared/settings-info';
import SettingsInfoText from '../shared/settings-info-text';
import SettingsInfoTitle from '../shared/settings-info-title';
import SettingsLabel from '../shared/settings-label';
import SettingsPlus from '../shared/settings-plus-circle';
import SettingsRow from '../shared/settings-row';
import DomainsSettingsStyled from './custom-domains-settings-styled';

const CustomDomainsSettings = () => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const { domains, isWorkspaceAdmin, customCDN } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      domains: workspace?.domainSettings.domainList ?? [],
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
      customCDN: workspace?.customCDN,
    }),
  });

  const [domain, setDomain] = useState(null);
  const [domainName, setDomainName] = useState('');
  const [shouldShowForm, setShouldShowForm] = useState(false);
  const [shouldShowInfo, setShouldShowInfo] = useState(false);
  const [isDeleteDomainModalOpen, setIsDeleteDomainModalOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const [createCustomDomain, { isError, isSuccess }] = useCreateCustomDomainMutation();
  const [deleteCustomDomain, { isSuccess: isDeleteSuccess }] = useDeleteCustomDomainMutation();

  const areFormsOpened = shouldShowInfo || shouldShowForm;
  const isTooltipEnabled = !isWorkspaceAdmin || customCDN?.isEnabled;
  const tooltipMessage = useMemo(
    () =>
      customCDN?.isEnabled
        ? 'Contact us via our live chat or via email in order to modify your custom domain'
        : 'Contact your Workspace admin in order to modify Workspace settings',
    [customCDN?.isEnabled],
  );

  const isSubmitDisabled = useMemo(() => !domainNameRegex.test(domainName), [domainName]);

  const toggleInfo = (show) => setShouldShowInfo(show);
  const toggleForm = (show) => setShouldShowForm(show);

  const handleMouseEnter = () => setShowTooltip(true);
  const handleMouseLeave = () => setShowTooltip(false);

  const hideForm = useCallback(() => {
    toggleForm(false);
    setDomainName('');
  }, []);

  const handleDomainChange = (e) => setDomainName(e.target.value);
  const handleDomainCreate = () => {
    if (selectedWorkspaceId) {
      createCustomDomain({ workspaceId: selectedWorkspaceId, domainName });
    }
  };
  const closeDeleteDomainModal = () => {
    setIsDeleteDomainModalOpen(false);
    setDomain(null);
  };
  const onAcceptDeleteDomain = async () => {
    if (selectedWorkspaceId && domain?._id) {
      deleteCustomDomain({
        domainId: domain._id,
        workspaceId: selectedWorkspaceId,
      });
      closeDeleteDomainModal();
    }
  };
  const handleAddDomainClick = () => {
    if (isWorkspaceAdmin) {
      toggleInfo(false);
      toggleForm(true);
    }
  };
  const handleResetFormClick = () => {
    hideForm();
  };
  const handleDeleteDomainClick = (domain) => {
    if (isWorkspaceAdmin) {
      setDomain(domain);
      setIsDeleteDomainModalOpen(true);
    }
  };
  const handleShowSettingsInfoClick = () => !shouldShowForm && toggleInfo(!shouldShowInfo);

  useEffect(() => {
    if (isSuccess) {
      toast.info('Your custom domain has been added successfully.', DEFAULT_TOAST_CONFIG);
      hideForm();
    }
  }, [hideForm, isSuccess]);

  useEffect(() => {
    if (isDeleteSuccess) {
      toast.info('Your custom domain has been deleted.', DEFAULT_TOAST_CONFIG);
    }
  }, [isDeleteSuccess]);

  return (
    <>
      <SettingsCard>
        <DomainsSettingsStyled.DomainsSettingsWrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <SettingsColumn
            flexBasis={areFormsOpened ? 'auto' : '100%'}
            flexGrow={'1'}
            flexShrink={'1'}
            maxWidth={areFormsOpened ? '324px' : '100%'}
            minWidth={'280px'}
          >
            <SettingsRow>
              <DomainsSettingsStyled.Title title={'Custom Domains'} />
              {!customCDN?.isEnabled && <SettingsInfo onClick={handleShowSettingsInfoClick} />}
            </SettingsRow>

            {customCDN?.isEnabled && customCDN?.cdns?.length ? (
              <DomainsSettingsStyled.DomainsRowWrapper minHeight="0px">
                <DomainsSettingsStyled.DomainsInputElement value={customCDN?.cdns?.[0]} isReadOnly={true} />
              </DomainsSettingsStyled.DomainsRowWrapper>
            ) : (
              <DomainsSettingsStyled.DomainsRowWrapper minHeight={shouldShowForm ? '110px' : '0px'}>
                {domains?.map((domain) => (
                  <DomainsSettingsStyled.DomainsSettingsRow key={`domain-${domain._id}`}>
                    <SettingsRow>
                      <DomainsSettingsStyled.DomainsInputElement
                        isDisabled={!isWorkspaceAdmin}
                        value={domain.domainName}
                        isReadOnly={true}
                      />
                      <DomainsSettingsStyled.DomainDeleteWrapper
                        isDisabled={!isWorkspaceAdmin}
                        onClick={() => handleDeleteDomainClick(domain)}
                      >
                        <DeleteSM />
                      </DomainsSettingsStyled.DomainDeleteWrapper>
                    </SettingsRow>
                  </DomainsSettingsStyled.DomainsSettingsRow>
                ))}

                <MessageModal
                  isOpen={isDeleteDomainModalOpen}
                  message={'Are you sure you want to delete the custom domain?'}
                  description={
                    'This will permanently delete this custom domain. All previously exported stories under this domain remain unaffected.'
                  }
                  acceptButtonText={`Delete ${domain?.domainName}`}
                  shouldCloseOnOverlayClick={true}
                  onCancel={closeDeleteDomainModal}
                  onAccept={onAcceptDeleteDomain}
                />

                {!shouldShowForm && (
                  <SettingsRow>
                    <DomainsSettingsStyled.DomainPlusTitleWrapper onClick={handleAddDomainClick}>
                      <SettingsPlus />
                      <SettingsLabel
                        label={(domains?.length ?? -1) > 0 ? 'Add new domain' : 'Create my first domain'}
                      />
                    </DomainsSettingsStyled.DomainPlusTitleWrapper>
                  </SettingsRow>
                )}

                {shouldShowForm && (
                  <>
                    <DomainsSettingsStyled.DomainsSettingsRow isActive={true}>
                      <SettingsRow>
                        <DomainsSettingsStyled.DomainsInputElement
                          autoFocus={true}
                          value={domainName}
                          onChange={handleDomainChange}
                        />

                        <DomainsSettingsStyled.DomainDeleteWrapper onClick={handleResetFormClick}>
                          <DeleteSM />
                        </DomainsSettingsStyled.DomainDeleteWrapper>
                      </SettingsRow>
                    </DomainsSettingsStyled.DomainsSettingsRow>
                    <DomainsSettingsStyled.DomainSubmitBtn
                      sizeType={'medium'}
                      text={'Add new domain'}
                      onClick={handleDomainCreate}
                      isDisabled={isSubmitDisabled}
                    />
                  </>
                )}

                {areFormsOpened && <DomainsSettingsStyled.Border />}
              </DomainsSettingsStyled.DomainsRowWrapper>
            )}
          </SettingsColumn>

          {shouldShowForm && (
            <>
              <SettingsColumn flexBasis={'30%'} flexGrow={'1'} flexShrink={'1'} minWidth={'150px'} maxWidth={'462px'}>
                <SettingsRow>
                  <SettingsInfoTitle title={'Create a custom domain'} withCloseBtn={false} />
                </SettingsRow>
                <SettingsRow>
                  <SettingsInfoText>
                    <DomainsSettingsStyled.SettingsInfoTextList>
                      <li>Step 1: Login to your DNS (Domain Name System) manager.</li>
                      <li>
                        Step 2: Add a new <SettingsBoldInfoText>CNAME</SettingsBoldInfoText> DNS entry for your
                        sub-domain with the value <SettingsBoldInfoText>custom-domain.zazuapp.co</SettingsBoldInfoText>.
                        Please note that the validation may take a few hours to apply.
                      </li>
                      <li>Step 3: Enter the sub-domain name in the field on the left and click "Verify domain".</li>
                    </DomainsSettingsStyled.SettingsInfoTextList>
                  </SettingsInfoText>
                </SettingsRow>
                {isError && (
                  <SettingsRow>
                    <DomainsSettingsStyled.DomainErrorIconWrapper>
                      <WarningIcon />
                    </DomainsSettingsStyled.DomainErrorIconWrapper>
                    <DomainsSettingsStyled.DomainError>
                      It seems that your domain has not been verified. Please follow the steps above and try again.
                    </DomainsSettingsStyled.DomainError>
                  </SettingsRow>
                )}
              </SettingsColumn>
              <SettingsColumn flexBasis={'0'} flexGrow={'1'} flexShrink={'1'} minWidth={'50px'} alignItems={'flex-end'}>
                {/* <DomainHelpLink href={'https://google.com'} target={'_blank'} rel={'noopener noreferrer'}>
                Need help?
              </DomainHelpLink> */}
              </SettingsColumn>
            </>
          )}

          {shouldShowInfo && (
            <SettingsColumn flexBasis={'0'} flexGrow={'1'} flexShrink={'1'} minWidth={'150px'}>
              <SettingsRow>
                <DomainsSettingsStyled.SnippetInfoTitle
                  title={'What are custom domains?'}
                  onClick={() => toggleInfo(false)}
                />
              </SettingsRow>
              <SettingsRow>
                <SettingsInfoText>
                  Custom domains allow you to publish your Web Story on your own sub-domain (for example
                  stories.yourdomain.com) instead of stories.zazuapp.co to better engage with your users and optimize
                  your SEO performance. Use them to have your Web Stories appear in Google Search results under your own
                  brand name.
                </SettingsInfoText>
              </SettingsRow>
            </SettingsColumn>
          )}
        </DomainsSettingsStyled.DomainsSettingsWrapper>
      </SettingsCard>
      {isTooltipEnabled && <MoveableTooltip showTooltip={showTooltip} text={tooltipMessage} />}
    </>
  );
};

export default CustomDomainsSettings;
