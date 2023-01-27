import Menu, { Item as MenuItem, SubMenu } from 'rc-menu';
import { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { useAppSelector } from '../../hooks';
import { selectHasAutoAdvancedOnAnySlide } from '../../appredux/features/amp-story/ampStorySlice';
import { setFrameSizeAndZoomPercent } from '../../appredux/features/editor/helpers/helpersSlice';
import { Infinite } from '../icons';
import { MoveableTooltip } from '../tooltip';
import {
  publishWebStory,
  saveStoryAndOpenPublishAsWebStory,
  socialExportStory
} from './../../appredux/features/export/exportSlice';

const StyledInfinite = styled(Infinite)`
  width: 16px;
`;

const StyledMenu = styled(Menu)`
  margin: 0;
  background: none;
  border: none;
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      pointer-events: none;
    `}

  &&& {
    .context-menu {
      background: red;
    }
  }
`;

const StyledSubMenu = styled(SubMenu)`
  &&& {
    border: none;
    border-radius: 8px;
    transition: background-color 200ms ease;
    &.rc-menu-submenu-selected {
      background-color: unset;
    }
    &.rc-menu-submenu-active {
      background-color: var(--shade-500-85);
      backdrop-filter: blur(50px);
    }
    &.rc-menu-submenu-open {
      background-color: var(--primary-10);
      backdrop-filter: blur(50px);
      svg,
      svg > * {
        fill: var(--primary);
      }
    }
    > div {
      background: none;
      padding: 0;
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &&&& {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-radius: 6px;
    background: none;
    margin: 0 12px 4px 12px;
    padding: 3px 8px;
    font-family: Heebo;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.01em;
    color: ${({ $isDisabled }) => ($isDisabled ? 'var(--shade-300)' : 'var(--shade-100)')};
    cursor: pointer;
    transition: background-color 200ms ease, color 200ms ease;
    ${({ $isDisabled }) =>
      !$isDisabled &&
      css`
        &.rc-menu-item-active {
          background-color: var(--primary);
          color: var(--shade-900);
          > span {
            color: var(--shade-900-85);
          }
        }
      `}
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const ExportMenu = ({ isDisabled, children, isConversionMenu, offset = 0 }) => {
  const dispatch = useDispatch();
  const fitZoom = useAppSelector((state) => state.helpers.fitZoomPercent);
  const hasAutoAdvancedOnAnySlide = useAppSelector(selectHasAutoAdvancedOnAnySlide);
  const [showTooltip, setShowTooltip] = useState(false);

  const onMouseEnter = () => {
    if (hasAutoAdvancedOnAnySlide && !showTooltip) {
      setShowTooltip(true);
    }
  };

  const onMouseLeave = () => {
    if (hasAutoAdvancedOnAnySlide && showTooltip) {
      setShowTooltip(false);
    }
  };

  const onPublishWebStory = () => {
    if (isConversionMenu) {
      dispatch(publishWebStory());
      return;
    }

    dispatch(setFrameSizeAndZoomPercent(fitZoom));
    dispatch(saveStoryAndOpenPublishAsWebStory());
  };

  const onSocialMediaExportClick = () => {
    if (!hasAutoAdvancedOnAnySlide) {
      dispatch(socialExportStory());
    }
  };

  return (
    <>
      <StyledMenu $isDisabled={isDisabled} triggerSubMenuAction="click" mode="horizontal" openAnimation="slide-up">
        <StyledSubMenu
          popupClassName={`export-menu ${isConversionMenu ? 'conversion' : ''}`}
          popupOffset={[offset, 20]}
          title={children}
          key="1"
        >
          <StyledMenuItem onClick={onPublishWebStory}>Publish as web story</StyledMenuItem>
          <StyledMenuItem
            $isDisabled={hasAutoAdvancedOnAnySlide}
            onClick={onSocialMediaExportClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            Export for social media
          </StyledMenuItem>
        </StyledSubMenu>
      </StyledMenu>

      <MoveableTooltip inverted width={370} position="left" showTooltip={showTooltip}>
        Some of your artboards have Auto-advance ( <StyledInfinite /> ) disabled.
      </MoveableTooltip>
    </>
  );
};

export default memo(ExportMenu);
