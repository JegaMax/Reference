import styled, { css } from 'styled-components';
import Pipette from '../../../icons/pipette';
import { LINEAR, RADIAL, SOLID } from '../../constants/types';
import HeaderNavigationTab from './header-navigation-tab';
import HeaderNavigationWrapper from './header-navigation-wrapper';

const StyledPipetteWrapper = styled.div`
  margin-left: auto;

  padding: 4px;
  transition: background 0.12s ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  ${({ isActive }) =>
    isActive &&
    css`
      &:hover {
        background: #2e2e38;
        cursor: pointer;
      }
    `}
  svg {
    color: #ababba;
  }

  ${({ isActive }) =>
    !isActive &&
    css`
      & svg {
        color: #505062;
      }
      &:hover ${StyledAlertWrapper} {
        opacity: 1;
        pointer-events: auto;
        visibility: visible;
      }
    `}
`;

const StyledAlertWrapper = styled.div`
  background-color: #ababba;
  border-radius: 6px;
  padding: 7px 8px;
  position: absolute;
  top: -10px;
  right: -215px;
  z-index: 100;
  width: 200px;
  opacity: 0;
  pointer-events: none;
  visibility: hidden;
`;

const StyledAlerdMessage = styled.span`
  font-family: Heebo;
  font-size: 12px;
  line-height: 18px;
  color: #14141f;
`;

const HeaderNavigation = ({
  activeType,
  handleNavigationTabClick,
  handlePipetteColorChange,
  isEyeDropperSupported,
  isWithGradient,
}) => {
  const isNavTabActive = (type, activeType) => type === activeType;

  return (
    <HeaderNavigationWrapper>
      <HeaderNavigationTab isActive={isNavTabActive(SOLID, activeType)} onClick={() => handleNavigationTabClick(SOLID)}>
        Solid
      </HeaderNavigationTab>
      {isWithGradient && (
        <>
          <HeaderNavigationTab
            isActive={isNavTabActive(LINEAR, activeType)}
            onClick={() => handleNavigationTabClick(LINEAR)}
          >
            Linear
          </HeaderNavigationTab>
          <HeaderNavigationTab
            isActive={isNavTabActive(RADIAL, activeType)}
            onClick={() => handleNavigationTabClick(RADIAL)}
          >
            Radial
          </HeaderNavigationTab>
        </>
      )}
      <StyledPipetteWrapper onClick={handlePipetteColorChange} isActive={isEyeDropperSupported()}>
        <Pipette />
        <StyledAlertWrapper>
          <StyledAlerdMessage>The color pipette is only available by using Zazu on Google Chrome.</StyledAlerdMessage>
        </StyledAlertWrapper>
      </StyledPipetteWrapper>
    </HeaderNavigationWrapper>
  );
};

export default HeaderNavigation;
