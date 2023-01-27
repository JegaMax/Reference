import { NavLink } from 'react-router-dom';

import styled, { css } from 'styled-components';

const activeClassName = 'nav-element-active';

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  border-radius: 8px;
  padding: 6px 14px 6px ${({ $removeExtraPadding }) => ($removeExtraPadding ? '0' : '38px')};
  margin-bottom: 8px;
  text-decoration: none;
  ${({ $isDisabled }) =>
    $isDisabled &&
    css`
      pointer-events: none;
    `};
  svg > * {
    fill: ${({ $isDisabled }) => ($isDisabled ? 'var(--shade-300)' : 'var(--shade-100-85)')};
  }
  &:hover {
    background: var(--shade-500-85);
  }
  &.${activeClassName} {
    ${({ $disableTopLevelActive }) =>
      !$disableTopLevelActive &&
      css`
        background: var(--primary-10);
        svg > * {
          fill: var(--primary);
        }
        > div {
          color: var(--primary);
        }
      `}
  }
`;

const LinkElementTitle = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 1.333333;
  letter-spacing: 0.01em;
  margin-left: 14px;
  color: ${({ isDisabled }) => (isDisabled ? 'var(--shade-300)' : 'var(--shade-100)')};
`;

const LinkElement = ({
  isDisabled,
  removePadding,
  to,
  exact,
  title,
  children,
  disableTopLevelActive,
}) => {
  return (
    <StyledNavLink
      $isDisabled={isDisabled}
      $removeExtraPadding={removePadding}
      to={to}
      exact={exact}
      $disableTopLevelActive={disableTopLevelActive}
    >
      {children}
      <LinkElementTitle isDisabled={isDisabled}>{title}</LinkElementTitle>
    </StyledNavLink>
  );
};

export default LinkElement;
