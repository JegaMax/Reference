import InviteMembersModal from '../../../../components/invite-members-modal/invite-members-modal';
import styled from 'styled-components';
import { MoveableTooltip } from '../../../tooltip';
import { QuaternaryButton } from '../../../buttons';
import { RoleName, WorkspaceTypes } from 'appredux/services/workspaces/interface';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppSelector, useMoveableTooltip, useToggle } from '../../../../hooks';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import { useMemo } from 'react';

const ButtonWrapper = styled.div`
  padding: 32px;
`;

const CustomQuaternaryButton = styled(QuaternaryButton)`
  width: 100%;
  padding: 7px 0 6px;
  font-size: 18px;
  line-height: 1.333333;
  cursor: pointer;
  transition: background-color 225ms ease, color 450ms ease;
  &:hover {
    color: var(--shade-900);
    background-color: var(--shade-100);
  }
`;

const InviteMemberWrapper = styled.div``;

const FooterWrapper = styled.div``;

const StyledBorder = styled.div`
  width: 100%;
  height: 100%;
  border-top: 2px solid var(--white-10);
  margin-bottom: 0px;
  justify-content: center;
`;

const TimeLeft = styled.div`
  padding: 17px 40px 20px;
  background: var(--shade-500);
`;

const TimeLeftText = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin: 0;
  text-align: center;
  &:not(:last-of-type) {
    margin-bottom: 12px;
  }
`;

const SidebarFooter = () => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const { trialRemainingDays, isTrialWorkspace, isWorkspaceAdmin } = useGetWorkspaceQuery(
    selectedWorkspaceId ?? skipToken,
    {
      selectFromResult: ({ data: workspace }) => {
        let trialRemainingDays;
        const trialEndsAtString = workspace?.trialEndsAt;
        if (trialEndsAtString) {
          const createdAt = new Date();
          const trialEndsAt = new Date(trialEndsAtString);
          const differenceInTime = trialEndsAt.getTime() - createdAt.getTime();
          const daysLeft = differenceInTime / (1000 * 3600 * 24);

          trialRemainingDays = daysLeft >= 0 ? daysLeft : 0;
        }

        let isTrialWorkspace = false;
        const workspaceType = workspace?.type;
        if (workspaceType) {
          isTrialWorkspace = workspaceType === WorkspaceTypes.TRIAL;
        }

        const isWorkspaceAdmin = workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user;

        return {
          trialRemainingDays,
          isTrialWorkspace,
          isWorkspaceAdmin,
        };
      },
    },
  );

  const isLinkDisabled = useMemo(
    () => isTrialWorkspace && typeof trialRemainingDays === 'number' && trialRemainingDays === 0,
    [trialRemainingDays, isTrialWorkspace],
  );

  const { tooltip, onMouseEnter, onMouseLeave } = useMoveableTooltip();
  const { isShown: isInviteModalShown, toggle: toggleInviteModal, setHide: setHideInviteModal } = useToggle(false);

  const onClick = () => {
    if (isWorkspaceAdmin && !isLinkDisabled) {
      toggleInviteModal();
    }
  };

  return (
    <>
      <FooterWrapper>
        <InviteMembersModal isOpen={isInviteModalShown} onCancel={setHideInviteModal} />
      </FooterWrapper>

      {isTrialWorkspace && typeof trialRemainingDays === 'number' && trialRemainingDays > 0 && (
        <TimeLeft>
          <TimeLeftText>Your Free Trial ends in {Math.round(trialRemainingDays)} days</TimeLeftText>
          <TimeLeftText>
            If you wish to extend or subscribe to our plans, please get in touch via our live chat!
          </TimeLeftText>
        </TimeLeft>
      )}
      <InviteMemberWrapper>
        <StyledBorder>
          <ButtonWrapper>
            <CustomQuaternaryButton
              isDisabled={!isWorkspaceAdmin || isLinkDisabled}
              onMouseEnter={onMouseEnter('Contact your Workspace admin in order to modify Workspace settings')}
              onMouseLeave={onMouseLeave('Contact your Workspace admin in order to modify Workspace settings')}
              onClick={onClick}
              text="Invite Member"
            />
            {!isWorkspaceAdmin && <MoveableTooltip showTooltip={tooltip.show} text={tooltip.text} />}
          </ButtonWrapper>
        </StyledBorder>
      </InviteMemberWrapper>
    </>
  );
};

export default SidebarFooter;
