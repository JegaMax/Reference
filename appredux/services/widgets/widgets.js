import api from '../api';

// import {
//   PaginatedResponse
// } from './interface';

export const widgetsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // widgetsList: builder.query<PaginatedResponse({
    //   query: () => 'widget/list',
    //   providesTags: (response) => {
    //     if (response) {
    //       const providedTags = [...response?.data?.map(({ _id: id }) => ({ type: 'Widgets', id }))];
    //       return [...providedTags, { type: 'Widgets', id: 'LIST' }];
    //     }

    //     return [{ type: 'Widgets', id: 'LIST' }];
    //   },
    // }),
    getWidget: builder.query({
      query: (id) => `widget/${id}`,
      providesTags: (_, __, id) => [{ type: 'Widgets', id }],
    }),
    createWidget: builder.mutation({
      query: (body) => ({
        url: 'widget/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Widgets', id: 'LIST' }],
    }),
    deleteWidget: builder.mutation({
      query: (id) => ({
        url: `widget/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'Widgets', id }],
    }),
    duplicateWidget: builder.mutation({
      query: (widgetId) => ({
        url: 'widget/duplicate',
        method: 'POST',
        body: { widgetId },
      }),
      invalidatesTags: [{ type: 'Widgets', id: 'LIST' }],
    }),
    updateWidgetMetadata: builder.mutation({
      query: (body) => ({
        url: 'widget/metadata/update',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Widgets', id: result?._id }],
    }),
    updateTags: builder.mutation({
      query: (body) => ({
        url: 'widget/tags/update',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (widget) => [{ type: 'Widgets', id: widget?._id }],
    }),
    getPresets: builder.query({
      query: () => `widget/presets/list`,
      keepUnusedDataFor: 86400,
      providesTags: (presets) => {
        if (presets) {
          const tags = [...presets.map(({ _id: id }) => ({ type: 'Presets', id }))];
          return [...tags, { type: 'Presets', id: 'LIST' }];
        }

        return [{ type: 'Presets', id: 'LIST' }];
      },
    }),
    publishWidget: builder.mutation({
      query: (body) => ({
        url: 'widget/publisher/data',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Widgets', id }],
    }),
  }),
});

export const {
  useWidgetsListQuery,
  useGetWidgetQuery,
  useCreateWidgetMutation,
  useDeleteWidgetMutation,
  useDuplicateWidgetMutation,
  useUpdateWidgetMetadataMutation,
  useUpdateTagsMutation,
  useGetPresetsQuery,
  usePublishWidgetMutation,
  usePrefetch,
} = widgetsApi;
