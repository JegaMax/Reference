import api from '../api';

export const storiesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    analyticsStories: builder.query({
      query: (storiesIds) => ({ url: 'story/analytics/stories', method: 'POST', body: { storiesIds } }),
      transformResponse: ({ stories }) => stories,
    }),
    hasPublishedStories: builder.query({
      query: () => ({ url: 'story/has-published-stories' }),
      keepUnusedDataFor: 0,
    }),
    storyList: builder.query({
      query: ({ query, offset, limit, teamId, forcePersonal, folder }) =>
        `story${`?offset=${offset}&limit=${limit}&${query}${teamId ? `&team=${teamId}` : ''}${
          forcePersonal ? `&personal=true` : ''
        }${folder ? `&folder=${folder}` : ''}`}`,
      providesTags: (result) => {
        if (result) {
          const stories = [...result.stories.map(({ _id: id }) => ({ type: 'Stories', id }))];
          return [...stories, { type: 'Stories', id: 'LIST' }];
        }

        return [{ type: 'Stories', id: 'LIST' }];
      },
      keepUnusedDataFor: 86400,
    }),
    movePersonalStories: builder.mutation({
      query: (body) => ({
        url: 'story/move',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { storiesIds, folderId }) => {
        const invalidationArray = [
          { type: 'Stories', id: 'LIST' },
          { type: 'Folder', id: 'LIST' },
          ...storiesIds.map((id) => ({ type: 'Stories', id })),
        ];

        if (folderId) {
          invalidationArray.push({ type: 'Folder', id: folderId });
        }

        return invalidationArray;
      },
    }),
    moveTeamStories: builder.mutation({
      query: (body) => ({
        url: 'story/team/move',
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, __, { storiesIds, folderId }) => {
        const invalidationArray = [
          { type: 'Stories', id: 'LIST' },
          { type: 'Folder', id: 'LIST' },
          ...storiesIds.map((id) => ({ type: 'Stories', id })),
        ];

        if (folderId) {
          invalidationArray.push({ type: 'Folder', id: folderId });
        }

        return invalidationArray;
      },
    }),
    duplicateStory: builder.mutation({
      query: (storyId) => ({
        url: 'story/duplicate',
        method: 'POST',
        body: { storyId },
      }),
      invalidatesTags: [{ type: 'Stories', id: 'LIST' }],
    }),
    deleteStory: builder.mutation({
      query: (storyId) => ({
        url: `story/${storyId}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Stories', id: 'LIST' }, { type: 'Folder', id: 'LIST' }, { type: 'Widgets' }],
    }),
  }),
});

export const {
  useAnalyticsStoriesQuery,
  useHasPublishedStoriesQuery,
  useStoryListQuery,
  useMovePersonalStoriesMutation,
  useMoveTeamStoriesMutation,
  useDuplicateStoryMutation,
  useDeleteStoryMutation,
} = storiesApi;
