import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

const HeaderContainer = styled.div`
  background: var(--shade-900-85);
  min-height: var(--header-height);
  display: flex;
  align-items: center;
  padding: 0 40px;
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
`;

const StyledLink = styled(Link)`
  margin: 0 32px 0 4px;
  color: var(--white);
`;

const StoryTitle = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: #ffffff;
  margin: 0 2px 0 16px;
  padding: 6px 6px 4px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0);
  box-sizing: border-box;
  backdrop-filter: blur(50px);
  border-radius: 6px;
  input {
    padding: 0;
  }
  &:hover {
    background: var(--shade-700-85);
    border-color: rgba(255, 255, 255, 0.2);
  }
  ${(props) =>
    props.isActive &&
    `
    border-color: var(--primary);                
    &:hover {
      border-color: var(--primary);
    }
  `}
`;

const PrimaryButtonWrapper = styled.div`
  position: relative;
  margin: 0 0 0 20px;
`;

const ButtonWithIconWrapper = styled.div`
  margin: ${({ margin }) => margin ?? '0 4px'};
`;

const ButtonWithIcon = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 32px;
  width: 32px;
  padding: 0;
  border-radius: 6px;
  background: none;
  outline: none;
  border: none;
  transition: 0.12s ease;
  ${({ isHovered, isDisabled }) =>
    isHovered &&
    !isDisabled &&
    css`
      background: var(--shade-500-85);
    `}
  ${({ isDisabled }) =>
    isDisabled
      ? css`
      & svg > * {
        fill: var(--shade-300-85);
        }
      }
    `
      : css`
        &:hover {
          background: var(--shade-500-85);
        }
        & svg > * {
          fill: var(--shade-100-85);
          }
        }
        cursor: pointer;
      `}
`;

const BackButtonLabel = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: var(--white);
  margin-left: 16px;
  cursor: pointer;
`;

const BackButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export default {
  StyledLink,
  StoryTitle,
  RightColumn,
  ButtonWithIcon,
  HeaderContainer,
  BackButtonLabel,
  BackButtonWrapper,
  ButtonWithIconWrapper,
  PrimaryButtonWrapper,
};
