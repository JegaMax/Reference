import React, { memo, useCallback } from 'react';
import styled, { css } from 'styled-components';

const SidebarHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
  padding: 24px 18px 15px;
  border-bottom: 1px solid var(--shade-700-85);
`;

const SidebarHeaderItemWrapper = styled.div`
  display: inline-block;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  margin: 0 6px;
  cursor: pointer;
  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--white);
    `}
`;

const EditorSidebarHeader = ({ activeTab, tabs, onTabClick }) => {
  const onTabSelect = useCallback(
    (tab) => () => {
      if (onTabClick) {
        onTabClick(tab);
      }
    },
    [onTabClick],
  );

  return (
    <SidebarHeaderWrapper>
      {tabs.map((tab) => {
        return (
          <SidebarHeaderItemWrapper key={tab} isActive={tab === activeTab} onClick={onTabSelect(tab)}>
            {tab}
          </SidebarHeaderItemWrapper>
        );
      })}
    </SidebarHeaderWrapper>
  );
};

export default memo(EditorSidebarHeader);
