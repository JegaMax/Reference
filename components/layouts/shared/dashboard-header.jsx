import DefaultImage from './profile-image/default-image';
import OutsideClickHandler from 'react-outside-click-handler';
import ProfileMenu from '../../profile/profile-menu/profile-menu';
import StorySearch from './story-search/story-search';
import styled from 'styled-components';
import { createStory } from 'appredux/features/amp-story/ampStorySlice';
import { defaultStoryName } from 'config/constants';
import { memo, useCallback, useEffect, useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../../buttons';
import { selectDPAProvider } from 'appredux/features/auth/authSlice';
import { toggleCreateWidgetModal } from 'appredux/features/widget/widgetSlice';
import { useAppSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelectTeamMutation } from 'appredux/services/auth/auth';

const Spacer = styled.div`
  margin-right: 46px;
`;

const StyledDashboardHeader = styled.div`
  // High DPI display issues
  top: -1px;
  height: 96px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  z-index: 4;
  will-change: background-color, box-shadow, backdrop-filter;
  background-color: ${({ isScrolled }) => (isScrolled ? 'var(--shade-500-85)' : 'transparent')};
  box-shadow: ${({ isScrolled }) => (isScrolled ? '24px 32px 72px var(--black-18)' : 'none')};
  transition: background-color 225ms ease, box-shadow 225ms ease, backdrop-filter 225ms ease;
  backdrop-filter: ${({ isScrolled }) => `blur(${isScrolled ? '50px' : '0'})`};
`;

const DefaultImageWrapper = styled.div``;

const ProfileMenuWrapper = styled.div`
  margin-left: 16px;
  position: relative;
`;

const MenuButton = styled(PrimaryButton)`
  margin-left: 20px;
`;

const DashboardHeader = ({ withStorySearch, carouselVersion, hasNoHeader }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  const [isClicked, setIsClicked] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuVisible, setIsProfileMenuVisible] = useState(false);
  const selectedTeamId = useAppSelector((state) => state.auth.user?.selectedTeamId);
  const isDpaProvider = useAppSelector(selectDPAProvider);

  const [selectTeam] = useSelectTeamMutation();

  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY === 0 && isScrolled) {
      setIsScrolled(false);
    }
    if (currentScrollY > 0 && !isScrolled) {
      setIsScrolled(true);
    }
  }, [isScrolled]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (pathname) {
      handleScroll();
    }
  }, [pathname, handleScroll]);

  const handleCreateStory = useCallback(async () => {
    if (isClicked) {
      return;
    }

    setIsClicked(true);

    if (selectedTeamId) {
      // Remove team
      await selectTeam(null).unwrap();
    }

    dispatch(createStory(defaultStoryName, history));
  }, [dispatch, selectTeam, selectedTeamId, history, isClicked]);

  const handleCreateWidget = useCallback(() => {
    dispatch(toggleCreateWidgetModal(true));
  }, [dispatch]);

  const toggleProfileMenu = () => {
    setIsProfileMenuVisible(!isProfileMenuVisible);
  };

  const hideProfileMenu = () => {
    setIsProfileMenuVisible(false);
  };

  return (
    <StyledDashboardHeader isScrolled={isScrolled}>
      {withStorySearch && <StorySearch isHidden={isScrolled} />}
      {!hasNoHeader && carouselVersion && <SecondaryButton text={'Create Carousel'} onClick={handleCreateWidget} />}
      {!hasNoHeader && !carouselVersion && <MenuButton text={'Create New Story'} onClick={handleCreateStory} />}

      <OutsideClickHandler onOutsideClick={hideProfileMenu}>
        <ProfileMenuWrapper>
          <DefaultImageWrapper onClick={toggleProfileMenu}>
            <DefaultImage />
          </DefaultImageWrapper>

          {isProfileMenuVisible && <ProfileMenu hasNoHeader={hasNoHeader} />}
        </ProfileMenuWrapper>
      </OutsideClickHandler>
      <Spacer />
    </StyledDashboardHeader>
  );
};

export default memo(DashboardHeader);
