import { memo } from 'react';

import DashboardColumn from './shared/dashboard-column';
import DashboardHeader from './shared/dashboard-header';
import DashboardWrapper from './shared/dashboard-wrapper';
import DashboardSidebar from './shared/sidebar';

const DashboardLayout = ({
  hasNoHeader,
  withHeaderSearchStory,
  carouselVersion,
  children,
}) => (
  <DashboardWrapper>
    <DashboardColumn maxWidth={'320px'}>
      <DashboardSidebar />
    </DashboardColumn>

    <DashboardColumn direction={'column'} maxWidth={'calc(100% - 320px)'}>
      <DashboardHeader
        withStorySearch={withHeaderSearchStory}
        carouselVersion={carouselVersion}
        hasNoHeader={hasNoHeader}
      />
      {children}
    </DashboardColumn>
  </DashboardWrapper>
);

export default memo(DashboardLayout);
