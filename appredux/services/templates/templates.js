import api from '../api';

export const TemplateType = {
  Global : 'global',
  Team : 'team',
  Personal : 'personal',
}
export const templatesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getTemplates: builder.query({
      query: ({ type }) => `template/${type}`,
      providesTags: (result) => {
        if (result) {
          const templates = [...result.templates.map(({ _id: id }) => ({ type: 'Templates', id }))];
          return [...templates, { type: 'Templates', id: 'LIST' }];
        }

        return [{ type: 'Templates', id: 'LIST' }];
      },
    }),
    getTemplate: builder.mutation({
      query: (id) => ({
        url: `template/${id}`,
      }),
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `template/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Templates', id }],
    }),
    deleteGlobalTemplate: builder.mutation({
      query: (id) => ({
        url: `template/global/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Templates', id }],
    }),
    saveTemplate: builder.mutation({
      query: (body) => ({
        url: `template/save/${body.type}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Templates', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useGetTemplateMutation,
  useDeleteTemplateMutation,
  useDeleteGlobalTemplateMutation,
  useSaveTemplateMutation,
} = templatesApi;
