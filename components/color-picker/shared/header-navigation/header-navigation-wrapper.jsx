import React from 'react';
import styled from 'styled-components';

const StyledHeaderNavigationWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 18px;
`;

const HeaderNavigationWrapper = ({ children }) => {
  return <StyledHeaderNavigationWrapper>{children}</StyledHeaderNavigationWrapper>;
};

export default HeaderNavigationWrapper;
