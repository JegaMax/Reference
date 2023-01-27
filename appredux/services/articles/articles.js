import api from '../api';

export const articlesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    articlesList: builder.query({
      query: () => 'article',
      providesTags: (result, __, id) => {
        if (result) {
          const articles = [...result.map(({ _id: id }) => ({ type: 'Articles', id }))];
          return [...articles, { type: 'Articles', id }];
        }

        return [{ type: 'Articles', id }];
      },
      transformResponse: (response) => response?.articles,
    }),
    convertArticle: builder.mutation({
      query: (body) => ({
        url: `article/convert`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, __, { articleId }) => [{ type: 'Articles', id: articleId }],
    }),
    deleteArticle: builder.mutation({
      query: (articleId) => ({
        url: `article/${articleId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, articleId) => [{ type: 'Articles', id: articleId }],
    }),
  }),
});

export const { useArticlesListQuery, useConvertArticleMutation, useDeleteArticleMutation } = articlesApi;
