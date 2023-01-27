import PageTitle from '../shared/page-title/page-title';
import PageTitleWrapper from '../shared/page-title/page-title-wrapper';
import qs from 'qs';
import React, { useMemo } from 'react';
import StoriesSection from './shared/elements/stories-section/stories-section';
import { EmptyStoryList, NoStoriesFound } from './shared/elements';
import { isEmpty } from 'lodash';
import { StoriesWrapper } from './shared/structure';
import { useAppSelector, useSpinner } from '../../hooks';
import { useLocation } from 'react-router-dom';
import { useStoryListQuery } from '../../appredux/services/stories/stories';

const sectionTitleLink = {
  text: 'Recent',
  url: '/my-stories',
};

const AllStories = () => {
  const location = useLocation();
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);

  const searchParams = useMemo(() => {
    return qs.parse(location.search.slice(1));
  }, [location]);
  const query = useMemo(() => {
    let query = '';
    if (searchParams) {
      Object.keys(searchParams).forEach((key) => (query += `search[${key}]=${searchParams?.[key] ?? ''}&`));
    }

    return query;
  }, [searchParams]);

  const { data, isLoading } = useStoryListQuery(
    { query, workspaceId: selectedWorkspaceId ?? '' },
    { skip: !selectedWorkspaceId },
  );
  const { Spinner, spinnerProps } = useSpinner();

  if (isLoading) {
    return <Spinner {...spinnerProps} isVisible={true} />;
  }

  return (
    <StoriesWrapper>
      <PageTitleWrapper>
        <PageTitle text="My Stories" />
      </PageTitleWrapper>

      {data?.stories?.length === 0 && isEmpty(searchParams) && <EmptyStoryList />}

      {data?.stories?.length === 0 && !isEmpty(searchParams) && <NoStoriesFound />}

      {data?.stories && data?.stories?.length > 0 && (
        <StoriesSection stories={data?.stories} linkHeader={sectionTitleLink} header="All stories" />
      )}
    </StoriesWrapper>
  );
};

export default AllStories;
