import SidebarHeader from './header';
import SidebarNavigation from './navigation';
import SidebarFooter from './footer';

import styled from 'styled-components';

const StyledDashboardSidebar = styled.div`
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  position: sticky;
  flex-direction: column;
  backdrop-filter: blur(50px);
  border-radius: 0;
  background: var(--shade-900-85);
  box-shadow: 24px 32px 72px var(--black-18);
  z-index: 3;
`;

const DashboardSidebar = () => {
  return (
    <StyledDashboardSidebar>
      <SidebarHeader />
      <SidebarNavigation />
      <SidebarFooter />
    </StyledDashboardSidebar>
  );
};

export default DashboardSidebar;
