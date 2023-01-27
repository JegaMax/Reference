import api from '../api';

export const analyticsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    runReport: builder.query({
      query: (input) => ({ url: 'analytics/run-report', body: input, method: 'POST' }),
      keepUnusedDataFor: 43200,
    }),
  }),
});

export const { useRunReportQuery } = analyticsApi;
