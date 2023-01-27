import React from 'react';
import { NavLink } from 'react-router-dom';

import styled from 'styled-components';

const activeClassName = 'settings-tab-active';

const StyledNavLink = styled(NavLink).attrs({ activeClassName })`
  padding: 2px 0;
  cursor: pointer;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
  margin-right: 21px;
  font-family: Heebo;
  font-style: normal;
  text-decoration: none;
  letter-spacing: 0.01em;
  color: var(--shade-100-85);
  &.${activeClassName} {
    color: var(--white);
  }
`;

const SettingsTabNavLink = ({ to, title }) => {
  return <StyledNavLink to={to}>{title}</StyledNavLink>;
};

export default SettingsTabNavLink;
