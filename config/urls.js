export const storyUrls = {
  createStory: '/story/create',
  getStory: (id) => `/story/${id}`,
  updateStoryConfig: `/story/update`,
  updateMetadata: '/story/metadata/update',
  saveStoryChanges: `/story/save`,
  publishWebStory: '/story/publish',
  checkChanges: (id) => `/story/${id}/export/check`,
  uploadPosters: (id) => `/upload/story/${id}/poster`,
  socialExport: (id) => `/story/${id}/social-export`,
  updateStoryTags: `/story/tags/update`,
};

export const widgetUrls = {
  getWidgets: '/widget/list',
  createWidget: '/widget/create',
  getWidgetConfig: (id) => `/widget/${id}/config`,
  updateMetadata: '/widget/metadata/update',
  duplicateWidget: `/widget/duplicate`,
  deleteWidget: (id) => `/widget/${id}`,
  saveWidgetChanges: (id) => `/save/widget/${id}/changes`,
  updatePublishedData: () => `/widget/publisher/data`,
  getJSONData: (id) => `/widget/${id}/json`,
  getLastUserModified: (userId) => `workspace/user/${userId}`,
  updateStory: `/widget/update/story`,
};

export const gifsUrls = {
  getGifs: (searchType, offset, title) =>
    `${title ? '/gifs' : '/gifs/trending'}?searchType=${searchType}&offset=${offset}${title ? `&search=${title}` : ''}`,
  uploadGif: '/upload/remote/gif',
};

export const imageUrls = {
  images: (page, title) => `/images?&page=${page}${title ? `&search=${title}` : ''}`,
  uploadRemoteImage: '/upload/remote/image',
  /** Set flag userUploadedMedia query param when user upload image from his computer  */
  uploadImage: (workspaceId, userId) =>
    `/file/upload/image/${workspaceId}/${userId}?userUploadedMedia=true`,
};

export const videoUrls = {
  uploadVideo: (workspaceId, userId) => `/file/upload/video/${workspaceId}/${userId}`,
  splitVideo: '/file/video/split',
};

export const mediaUrls = {
  deleteMedia: (mediaId) => `/file/media/${mediaId}`,
};

export const uploadedMediaUrls = {
  getMedia: (workspaceId, userId, mediaType, limit, offset) =>
    `/file/workspace/${workspaceId}/user/${userId}/media?filter[type]=${mediaType}&sort[createdAt]=DESC&limit=${limit}&offset=${offset}`,
};

export const userUrls = {
  login: '/user/login',
  auth: `/user/authenticate`,
  logout: '/user/logout',
  signUp: '/user/register',
  forgotPassword: '/user/forgot/password',
  forgotPasswordToken: (token) => `/user/forgot/password/${token}`,
  resetPassword: '/user/reset/password',
  changePassword: '/user/change/password',
  addFavouriteColor: '/user/add/favourite-color',
  updateUser: '/user/update',
  addBugReport: '/user/report/log',
  deleteCustomSnippet: (id) => `/snippet/${id}`,
  verifyEmail: '/user/verify-email',
  sendVerificationEmail: '/user/send-verification-email',
  updateTutorialPassed: (userId) => `/user/tutorial-passed/${userId}`,
};

export const domainsUrls = {
  createDomain: '/domain/create',
  removeDomain: (id) => `/domain/remove/${id}`,
};

export const editorUrls = {
  updateAmp: '/amp',
};

export const templatesUrls = {
  getTemplates: (type) => `/template/${type}`,
  deleteUserTemplate: (id) => `/template/${id}`,
  getTemplate: (templateId) => `/template/${templateId}`,
  saveTemplate: (type) => `/template/save/${type}`,
  deleteGlobalTemplate: (id) => `/template/global/${id}`,
};

export const videoProcessingUrls = {
  getVideoProcessing: (id) => `/file/video-processing/${id}`,
};

export const workspacesUrls = {
  getWorkspaces: '/workspace',
  getWorkspace: (id) => `/workspace/${id}`,
  createWorkspace: '/workspace/create',
  selectWorkspace: '/user/update-workspace',
  updateSEO: '/workspace/update/seo',
  updateGeneralSettings: '/workspace/update/general',
  deleteSeoImg: '/workspace/seo/image',
  addAnalytics: '/workspace/google-analytics/save',
  getAnalytics: '/workspace/google-analytics',
  addCustomSnippet: '/snippet/create',
  getCustomSnippets: '/snippet/list',
  workspaceUsersList: (offset, limit, sortOptions) =>
    `/workspace/users/list?offset=${offset}&limit=${limit}&${sortOptions}`,
  selectTeam: '/user/update-team',
  addWorkspaceWUser: 'workspace/users/add',
  removeWorkspaceMember: (userId) => `/workspace/user/${userId}`,
  acceptInvitation: '/workspace/users/accept',
  updateMemberRole: '/workspace/users/update-role',
  getTeamUsers: () => `/workspace/team`,
};

export const folderUrls = {
  getUserFolders: (folderId, teamId) =>
    `/folder${
      teamId && folderId
        ? `?teamId=${teamId}&root=${folderId}`
        : teamId
        ? `?teamId=${teamId}`
        : folderId
        ? `?root=${folderId}`
        : ''
    }`,
  getFoldersAndStories: (folderId, query, limit) => {
    return `/shared/contents?contentType=["STORIES", "FOLDERS"]${folderId ? `&root=${folderId}` : ''}${
      query ? '&' + query : ''
    }${limit ? '&limit=' + limit : ''}`;
  },
  creareFolder: `/folder/create`,
  renameFolder: '/folder/rename',
  moveFolder: 'folder/move',
  deleteFolder: (folderId) => `/folder/${folderId}`,
};
