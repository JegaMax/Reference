import api from '../api';


export const gradientsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getGradients: builder.query({
      query: ({ offset, limit }) => `gradients?offset=${offset}&limit=${limit}`,
      keepUnusedDataFor: 43200,
    }),
  }),
});

export const { useGetGradientsQuery, useLazyGetGradientsQuery } = gradientsApi;
