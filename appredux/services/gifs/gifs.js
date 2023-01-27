import api from '../api';

export const gifsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getRandomGif: builder.query({
      query: () => 'gifs/random',
      providesTags: (response) => [{ type: 'Gifs', id: response?.id }],
      transformResponse: (response) => response?.[0],
      keepUnusedDataFor: 0,
    }),
    getSuccessGif: builder.query({
      query: () => 'gifs/success',
      providesTags: (response) => [{ type: 'Gifs', id: response?.id }],
      transformResponse: (response) => response?.[0],
      keepUnusedDataFor: 0,
    }),
  }),
});

export const { useGetRandomGifQuery, useGetSuccessGifQuery, usePrefetch } = gifsApi;
