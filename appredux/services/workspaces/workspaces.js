import api from '../api';
import {
  memberSortOrder
} from './interface';

export const workspacesApi = api.injectEndpoints({
  endpoints: (builder) => ({
    workspacesList: builder.query({
      query: () => 'workspace',
      providesTags: [{ type: 'Workspaces', id: 'LIST' }],
      keepUnusedDataFor: 86400,
      transformResponse: (response) => response?.workspaces,
    }),

    getWorkspace: builder.query({
      query: (workspaceId) => `workspace/${workspaceId}`,
      providesTags: (_, __, id) => [{ type: 'Workspaces', id }],
      keepUnusedDataFor: 60,
      transformResponse: (response) => response?.workspace,
    }),
    updateWorkspaceGeneralSettings: builder.mutation({
      query: (body) => ({
        url: 'workspace/update/general',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Workspaces', id: result?._id },
        { type: 'Workspaces', id: 'LIST' },
      ],
    }),
    updateWorkspaceSeoSettings: builder.mutation({
      query: (body) => ({
        url: 'workspace/update/seo',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Workspaces', id: result?._id }],
    }),
    deleteWorkspaceSeoImage: builder.mutation({
      query: (body) => ({
        url: 'workspace/seo/image',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: (result, _, { logo }) => {
        if (logo) {
          return [
            { type: 'Workspaces', id: result?._id },
            { type: 'Workspaces', id: 'LIST' },
          ];
        }
        return [{ type: 'Workspaces', id: result?._id }];
      },
    }),
    createWorkspace: builder.mutation({
      query: (body) => ({
        url: 'workspace/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Workspaces', id: 'LIST' }],
      transformResponse: (response) => response?.workspace,
    }),
    createCustomDomain: builder.mutation({
      query: ({ domainName }) => ({
        url: 'domain/create',
        method: 'POST',
        body: { domainName },
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Workspaces', id: workspaceId }],
    }),
    deleteCustomDomain: builder.mutation({
      query: ({ domainId }) => ({
        url: `domain/remove/${domainId}`,
        method: 'PUT',
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Workspaces', id: workspaceId }],
    }),
    getAnalyticsTrackingAccountId: builder.query({
      query: () => 'workspace/google-analytics',
      keepUnusedDataFor: 86400,
      providesTags: (_, __, id) => [{ type: 'GA', id }],
      transformResponse: (response) =>
        response?.googleAnalyticsData?.data?.trackingAccountId,
    }),
    addAnalyticsTrackingAccountId: builder.mutation({
      query: (body) => ({
        url: 'workspace/google-analytics/save',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'GA', id: result?._id },
        { type: 'Workspaces', id: result?._id },
      ],
    }),
    getWorkspaceSnippets: builder.query({
      query: () => 'snippet/list',
      keepUnusedDataFor: 86400,
      providesTags: (_, __, id) => [{ type: 'Snippets', id }],
    }),
    saveWorkspaceCustomSnippet: builder.mutation({
      query: (body) => ({
        url: 'snippet/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Snippets', id: result?.workspace },
        { type: 'Workspaces', id: result?.workspace },
      ],
    }),
    deleteWorkspaceCustomSnippet: builder.mutation({
      query: ({ snippetId }) => ({
        url: `snippet/${snippetId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { workspaceId }) => [
        { type: 'Snippets', id: workspaceId },
        { type: 'Workspaces', id: workspaceId },
      ],
    }),
    getWorkspaceMembers: builder.query({
      query: ({ offset, limit, sortOptions }) => ({
        url: `workspace/users/list?offset=${offset}&limit=${limit}&${sortOptions}`,
      }),
      providesTags: (_, __, { workspaceId }) => [{ type: 'Members', id: workspaceId }],
      transformResponse: (response) =>
        response?.users.sort((a, b) => memberSortOrder.indexOf(a.status) - memberSortOrder.indexOf(b.status)),
    }),
    inviteWorkspaceMembers: builder.mutation({
      query: ({ users }) => ({
        url: 'workspace/users/add',
        method: 'POST',
        body: { users },
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Members', id: workspaceId }],
    }),
    updateWorkspaceMemberRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: 'workspace/users/update-role',
        method: 'PUT',
        body: { userId, role },
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Members', id: workspaceId }],
    }),
    removeWorkspaceMember: builder.mutation({
      query: ({ id }) => ({
        url: `workspace/user/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Members', id: workspaceId }],
    }),
    acceptInvitation: builder.mutation({
      query: (token) => ({
        url: 'workspace/users/accept',
        method: 'PUT',
        body: { token },
      }),
      invalidatesTags: [{ type: 'Workspaces', id: 'LIST' }],
    }),
    getTeam: builder.query({
      query: (teamId) => ({
        url: `workspace/team/${teamId}`,
      }),
      providesTags: [{ type: 'Team', id: 'LIST' }],
    }),
    updateGoogleSignIn: builder.mutation({
      query: (googleSignInAppId) => ({
        url: 'workspace/update/google-sign-in',
        method: 'PUT',
        body: { googleSignInAppId },
      }),
      invalidatesTags: (result) => [{ type: 'Workspaces', id: result?._id }],
    }),
    generateApiKey: builder.mutation({
      query: () => `workspace/api-key`,
      invalidatesTags: (result) => [{ type: 'Workspaces', id: result?._id }],
    }),
    initializeSitemap: builder.mutation({
      query: (body) => ({
        url: `workspace/sitemap/init`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Workspaces', id: result?._id }],
    }),
    updateSitemap: builder.mutation({
      query: (body) => ({
        url: `workspace/sitemap/update`,
        method: 'POST',
        body,
      }),
    }),
    updateRssMeta: builder.mutation({
      query: (body) => ({
        url: `workspace/rss/update`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => [{ type: 'Workspaces', id: result?._id }],
    }),
    getWorkspaceUser: builder.query({
      query: (id) => `workspace/user/${id}`,
      transformResponse: (response) => response?.user,
    }),
    updateWorkspaceFontStyles: builder.mutation({
      query: (body) => ({
        url: `workspace/styles/update`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Workspaces', id: workspaceId }],
    }),
    createWorkspaceColorPalette: builder.mutation({
      query: (body) => ({
        url: `workspace/color-palette/create`,
        method: 'POST',
        body,
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Workspaces', id: workspaceId }],
    }),
    deleleWorkspaceColorPalette: builder.mutation({
      query: ({ paletteId }) => ({
        url: `workspace/color-palette/delete/${paletteId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Workspaces', id: workspaceId }],
    }),
    updateWorkspaceColorPalette: builder.mutation({
      query: ({ paletteId, name, addColors, removeColors }) => ({
        url: `workspace/color-palette/update`,
        method: 'PUT',
        body: { paletteId, name, addColors, removeColors },
      }),
      invalidatesTags: (_, __, { workspaceId }) => [{ type: 'Workspaces', id: workspaceId }],
    }),
  }),
});

export const {
  useWorkspacesListQuery,
  useGetWorkspaceQuery,
  useCreateWorkspaceMutation,
  useUpdateWorkspaceGeneralSettingsMutation,
  useUpdateWorkspaceSeoSettingsMutation,
  useDeleteWorkspaceSeoImageMutation,
  useCreateCustomDomainMutation,
  useDeleteCustomDomainMutation,
  useGetAnalyticsTrackingAccountIdQuery,
  useAddAnalyticsTrackingAccountIdMutation,
  useGetWorkspaceSnippetsQuery,
  useSaveWorkspaceCustomSnippetMutation,
  useDeleteWorkspaceCustomSnippetMutation,
  useGetWorkspaceMembersQuery,
  useInviteWorkspaceMembersMutation,
  useUpdateWorkspaceMemberRoleMutation,
  useRemoveWorkspaceMemberMutation,
  useAcceptInvitationMutation,
  useGetTeamQuery,
  useUpdateGoogleSignInMutation,
  useGenerateApiKeyMutation,
  useInitializeSitemapMutation,
  useUpdateSitemapMutation,
  useUpdateRssMetaMutation,
  useGetWorkspaceUserQuery,
  useLazyGetWorkspaceUserQuery,
  useUpdateWorkspaceFontStylesMutation,
  useCreateWorkspaceColorPaletteMutation,
  useDeleleWorkspaceColorPaletteMutation,
  useUpdateWorkspaceColorPaletteMutation,
} = workspacesApi;
