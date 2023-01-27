import api from '../api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: 'user/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    authenticate: builder.query({
      query: (credentials) => ({
        url: 'user/authenticate',
        headers: {
          Authorization: `Bearer ${credentials.accessToken}`,
        },
      }),
    }),
    verifyEmail: builder.mutation({
      query: (credentials) => ({
        url: 'user/verify-email',
        method: 'PUT',
        body: credentials,
      }),
    }),
    resendVerificationEmail: builder.mutation({
      query: (credentials) => ({
        url: 'user/send-verification-email',
        method: 'POST',
        body: credentials,
      }),
    }),
    selectWorkspace: builder.mutation({
      query: (workspaceId) => ({
        url: 'user/update-workspace',
        method: 'PUT',
        body: { workspaceId },
      }),
    }),
    selectTeam: builder.mutation({
      query: (teamId) => ({
        url: 'user/update-team',
        method: 'PUT',
        body: { teamId },
      }),
    }),
    changePassword: builder.mutation({
      query: (password) => ({
        url: 'user/change/password',
        method: 'PUT',
        body: { password },
      }),
    }),
    updateTutorialField: builder.mutation({
      query: ({ userId, type }) => ({
        url: `user/tutorial-passed/${userId}`,
        method: 'PUT',
        body: { type },
      }),
    }),
    addFavouriteColor: builder.mutation({
      query: (color) => ({
        url: 'user/add/favourite-color',
        method: 'POST',
        body: { color },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useAuthenticateQuery,
  useVerifyEmailMutation,
  useResendVerificationEmailMutation,
  useSelectWorkspaceMutation,
  useSelectTeamMutation,
  useChangePasswordMutation,
  useUpdateTutorialFieldMutation,
  useAddFavouriteColorMutation,
} = authApi;
