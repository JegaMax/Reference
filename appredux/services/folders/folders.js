import api from '../api';


const buildFoldersUrl = ({ folderId, teamId, getAll }) => {
  // Sidebar query
  if (getAll) {
    return `folder?getAll=true`;
  }

  // Teams section with nested folder
  if (teamId && folderId) {
    return `folder?teamId=${teamId}&root=${folderId}&populateStories=true`;
  }

  // Teams section
  if (teamId) {
    return `folder?teamId=${teamId}&populateStories=true`;
  }

  // My stories with nested folder
  if (folderId) {
    return `folder?root=${folderId}&populateStories=true`;
  }

  // My stories
  return 'folder?populateStories=true';
};

export const foldersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    foldersList: builder.query({
      query: buildFoldersUrl,
      providesTags: (result) => {
        if (result) {
          const folders = [...result.map(({ _id: id }) => ({ type: 'Folder', id }))];
          return [...folders, { type: 'Folder', id: 'LIST' }];
        }

        return [{ type: 'Folder', id: 'LIST' }];
      },
      transformResponse: (result) =>
        result?.folders?.sort((a, b) => a?.title.localeCompare(b?.title)),
    }),
    folder: builder.query({
      query: ({ folderId }) => `folder/${folderId}`,
      providesTags: (_, __, { folderId: id }) => [{ type: 'Folder', id }],
    }),
    createFolder: builder.mutation({
      query: (body) => ({
        url: 'folder/create',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result) => {
        if (result?.parent) {
          const parentId = ((result?.parent) )._id;
          return [
            { type: 'Folder', id: 'LIST' },
            { type: 'Folder', id: parentId },
          ];
        }
        return [{ type: 'Folder', id: 'LIST' }];
      },
    }),
    renameFolder: builder.mutation({
      query: (body) => ({
        url: 'folder/rename',
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result) => [
        { type: 'Folder', id: 'LIST' },
        { type: 'Folder', id: result?._id },
      ],
    }),
    moveFolder: builder.mutation({
      query: (body) => ({
        url: `folder/move`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: (result, __, { parentFolder }) => {
        const invalidationArray = [
          { type: 'Folder', id: 'LIST' },
          { type: 'Stories', id: 'LIST' },
          { type: 'Folder', id: result?._id },
        ];

        if (parentFolder) {
          invalidationArray.push({ type: 'Folder', id: parentFolder });
        }

        if (result?.parent) {
          const resultParentId = ((result.parent))._id;

          invalidationArray.push({ type: 'Folder', id: resultParentId });
        }

        return invalidationArray;
      },
    }),
    deleteFolder: builder.mutation({
      query: ({ folderId }) => ({
        url: `folder/${folderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, { folderId, parentFolder }) => {
        const invalidationArray = [
          { type: 'Folder', id: 'LIST' },
          { type: 'Stories', id: 'LIST' },
          { type: 'Folder', id: folderId },
        ];

        if (parentFolder) {
          invalidationArray.push({ type: 'Folder', id: parentFolder });
        }

        return invalidationArray;
      },
    }),
  }),
});

export const {
  useFoldersListQuery,
  useLazyFoldersListQuery,
  useFolderQuery,
  useLazyFolderQuery,
  useCreateFolderMutation,
  useRenameFolderMutation,
  useMoveFolderMutation,
  useDeleteFolderMutation,
} = foldersApi;
