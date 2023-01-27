import api from '../api';

export const dpaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    claimToken: builder.mutation({
      query: (code) => `dpa/claim-token/${code}`,
    }),
  }),
});

export const { useClaimTokenMutation } = dpaApi;
