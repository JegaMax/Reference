import { skipToken } from '@reduxjs/toolkit/dist/query';
import ChevronDownIcon from 'components/icons/chevron-down';
import { memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import {
  collapseMyFolders,
  collapseTeamFolders,
  expandMyFolders,
  expandTeamFolders
} from 'appredux/features/navigation/navigationSlice';
import { useFoldersListQuery } from 'appredux/services/folders/folders';
import { WorkspaceTypes } from 'appredux/services/workspaces/interface';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import styled, { css } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { CogWheelIcon, ConversionIcon, HomeIcon, InsightsIcon, StoriesIcon, Teams, Widget } from '../../../icons';
import DropTarget from './drop-target';
import Element from './element';
import LinkElement from './link-element';
import NavigationFoldersTreeRecursive from './navigation-folders-tree-recursive';

const StyledSidebarNavigation = styled.div`
  padding: 0 32px 0 8px;
  height: 100%;
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 42px;
  overflow: auto;
  scrollbar-width: none;
  > * {
    min-width: 280px;
  }
  &::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border-radius: 12px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
    border-radius: 20px;
    transition: background 0.12s ease;
  }
  &::-webkit-scrollbar-corner {
    background: transparent;
  }
  &:hover {
    scrollbar-width: thin;
    scrollbar-height: thin;
    scrollbar-color: var(--shade-300-85) transparent;
  }
  &:hover::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    border-radius: 2px;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: var(--shade-300-85);
  }
`;

const DropdownIconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  margin-right: 6px;
`;

const DropdownIcon = styled(ChevronDownIcon)`
  width: 14px;
  height: 14px;
  transition: transform 225ms ease;
  transform: rotate(${({ isMenuOpen }) => (isMenuOpen ? `0` : '-90')}deg);
`;

const FoldersWrapper = styled.div`
  overflow: hidden;
  height: 0;
  max-width: 280px;
  ${({ isMenuOpen }) =>
    isMenuOpen &&
    css`
      overflow: visible;
      max-width: unset;
      height: max-content;
      margin-bottom: 8px;
    `}
`;

const SidebarNavigation = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const isMyFoldersExpanded = useAppSelector((state) => state.navigation.isMyFoldersExpanded);
  const isTeamFoldersExpanded = useAppSelector((state) => state.navigation.isTeamFoldersExpanded);

  const {
    isTrialWorkspace,
    trialRemainingDays,
    isStoryConversionEnabled,
    isGoogleAnalyticsEnabled,
    defaultTeamId,
  } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => {
      let trialRemainingDays = null;

      const trialEndsAtString = workspace?.trialEndsAt;
      const isGoogleAnalyticsEnabled = workspace?.isGoogleAnalyticsEnabled;

      if (trialEndsAtString) {
        const createdAt = new Date();
        const trialEndsAt = new Date(trialEndsAtString);
        const differenceInTime = trialEndsAt.getTime() - createdAt.getTime();
        const daysLeft = differenceInTime / (1000 * 3600 * 24);

        trialRemainingDays = daysLeft >= 0 ? daysLeft : 0;
      }

      return {
        trialRemainingDays,
        isTrialWorkspace: workspace?.type === WorkspaceTypes.TRIAL,
        isStoryConversionEnabled: workspace?.isStoryConversionEnabled,
        isGoogleAnalyticsEnabled,
        defaultTeamId: workspace?.teams?.[0]?._id,
      };
    },
  });

  const { data: folders } = useFoldersListQuery(
    { workspaceId: selectedWorkspaceId ?? '', getAll: true },
    { skip: !selectedWorkspaceId },
  );

  const isLinkDisabled = useMemo(
    () => isTrialWorkspace && typeof trialRemainingDays === 'number' && trialRemainingDays === 0,
    [trialRemainingDays, isTrialWorkspace],
  );

  const { teamFolders, personalFolders } = useMemo(
    () =>
      folders?.reduce(
        (acc, folder) => {
          if (folder.team) {
            acc.teamFolders.push(folder);
          } else {
            acc.personalFolders.push(folder);
          }

          return acc;
        },
        { teamFolders: [], personalFolders: [] },
      ) ?? { teamFolders: [], personalFolders: [] },
    [folders],
  );

  const handleMyStoriesFoldersMenuState = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isMyFoldersExpanded) {
      dispatch(collapseMyFolders());
      return;
    }

    dispatch(expandMyFolders());
  };

  const handleTeamsFoldersMenuState = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (isTeamFoldersExpanded) {
      dispatch(collapseTeamFolders());
      return;
    }

    dispatch(expandTeamFolders());
  };

  return (
    <StyledSidebarNavigation>
      {/* When replacing with LinkElement add exact={true} */}
      <Element title={'Dashboard'} isDisabled={true}>
        <HomeIcon />
      </Element>
      <DropTarget
        isLinkDisabled={isLinkDisabled}
        removePadding={!!personalFolders?.length}
        disableTopLevelActive={location.pathname.includes('folder')}
        to="/my-stories"
        title="My Stories"
      >
        {!!personalFolders?.length && (
          <DropdownIconWrapper onClick={handleMyStoriesFoldersMenuState}>
            <DropdownIcon isMenuOpen={isMyFoldersExpanded} />
          </DropdownIconWrapper>
        )}
        <StoriesIcon />
      </DropTarget>
      <FoldersWrapper isMenuOpen={isMyFoldersExpanded}>
        {personalFolders && <NavigationFoldersTreeRecursive folders={personalFolders} />}
      </FoldersWrapper>
      <LinkElement isDisabled={isLinkDisabled} to={'/my-carousels'} title={'Story Carousel'}>
        <Widget />
      </LinkElement>

      <DropTarget
        isLinkDisabled={isLinkDisabled}
        removePadding={!!teamFolders?.length}
        disableTopLevelActive={location.pathname.includes('folder')}
        to={'/teams'}
        title={'Teams'}
        teamId={defaultTeamId}
      >
        {!!teamFolders?.length && (
          <DropdownIconWrapper onClick={handleTeamsFoldersMenuState}>
            <DropdownIcon isMenuOpen={isTeamFoldersExpanded} />
          </DropdownIconWrapper>
        )}
        <Teams />
      </DropTarget>
      <FoldersWrapper isMenuOpen={isTeamFoldersExpanded}>
        {teamFolders && <NavigationFoldersTreeRecursive folders={teamFolders} teamId={defaultTeamId} />}
      </FoldersWrapper>
      {isStoryConversionEnabled && (
        <LinkElement isDisabled={isLinkDisabled} to={'/story-conversion'} title={'Story Conversion'}>
          <ConversionIcon />
        </LinkElement>
      )}
      {isGoogleAnalyticsEnabled && (
        <LinkElement isDisabled={isLinkDisabled} to={'/insights'} title={'Insights'}>
          <InsightsIcon />
        </LinkElement>
      )}
      <LinkElement isDisabled={isLinkDisabled} to={'/settings'} title={'Settings'}>
        <CogWheelIcon />
      </LinkElement>
      {/* <Element title={'Discover'} isDisabled={true}>
          <CompassIcon />
        </Element> */}
    </StyledSidebarNavigation>
  );
};

export default memo(SidebarNavigation);
