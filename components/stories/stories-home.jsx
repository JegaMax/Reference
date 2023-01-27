import FoldersSection from 'components/folders/folders-section';
import PageTitle from 'components/shared/page-title/page-title';
import PageTitleWrapper from 'components/shared/page-title/page-title-wrapper';
import StoriesSection from './shared/elements/stories-section/stories-section';
import { EmptyStoryList } from 'components/stories/shared/elements';
import { memo } from 'react';
import { StoriesWrapper } from './shared/structure';
import { useAppSelector } from 'hooks';
import { useFoldersListQuery } from 'appredux/services/folders/folders';
import { useStoryListQuery } from 'appredux/services/stories/stories';
import './../../css/story-swiper.css';
import 'swiper/swiper.min.css';

const STORIES_LIMIT = 6;

const StoriesHome = () => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);

  const { data: recentStories, isLoading: areStoriesLoading } = useStoryListQuery(
    { limit: STORIES_LIMIT, workspaceId: selectedWorkspaceId ?? '' },
    { skip: !selectedWorkspaceId },
  );

  const { data: rootFolders, isLoading: areFoldersLoading } = useFoldersListQuery(
    { workspaceId: selectedWorkspaceId ?? '' },
    {
      skip: !selectedWorkspaceId,
    },
  );

  return (
    <StoriesWrapper>
      <PageTitleWrapper>
        <PageTitle text="My Stories" />
      </PageTitleWrapper>
      {!areStoriesLoading && (!recentStories?.stories || recentStories.stories?.length === 0) && <EmptyStoryList />}
      {recentStories?.stories && recentStories?.stories?.length > 0 && (
        <StoriesSection stories={recentStories?.stories} headerButtonUrl="/my-stories/all" limitStories />
      )}
      {!areFoldersLoading && (
        <FoldersSection
          isEmptyState={recentStories?.stories?.length === 0}
          storiesLength={recentStories?.stories?.length}
          folders={rootFolders}
        />
      )}
    </StoriesWrapper>
  );
};

export default memo(StoriesHome);
