import styled from 'styled-components';
import WorkspacesMenu from '../../../workspaces-menu/workspaces-menu';

const StyledSidebarHeader = styled.div`
  height: 96px;
  border-bottom: 1px solid var(--white-10);
  padding: 22px 54px 22px 40px;
  display: flex;
  align-items: center;
  > * {
    width: 100%;
    flex: 1;
  }
`;

const SidebarHeader = () => {
  return (
    <StyledSidebarHeader>
      <WorkspacesMenu />
    </StyledSidebarHeader>
  );
};

export default SidebarHeader;
