import api from '../api';

export const tagsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    tagsList: builder.query({
      query: () => 'tag',
      providesTags: (result, __, id) => {
        if (result) {
          const tags = [...result.map(({ _id: id }) => ({ type: 'Tags', id }))];
          return [...tags, { type: 'Tags', id }];
        }

        return [{ type: 'Tags', id }];
      },
    }),
    createTag: builder.mutation({
      query: ({ name }) => ({
        url: 'tag/create',
        method: 'POST',
        body: { name },
      }),
      invalidatesTags: (_, __, { workspaceId: id }) => [{ type: 'Tags', id }],
    }),
  }),
});

export const { useTagsListQuery, useCreateTagMutation, usePrefetch } = tagsApi;
