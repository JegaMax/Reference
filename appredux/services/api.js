import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from '../../config/environment';

const prepareHeaders = (headers, { getState }) => {
  const token = (getState()).auth.token?.accessToken;

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return headers;
};

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${environment.host}`,
    prepareHeaders,
  }),
  endpoints: () => ({}),
  tagTypes: [
    'Articles',
    'Folder',
    'Gifs',
    'Workspaces',
    'GA',
    'Snippets',
    'Members',
    'Team',
    'WorkspaceFonts',
    'GoogleFonts',
    'Stories',
    'Tags',
    'Templates',
    'Widgets',
    'Presets',
  ],
});

export default api;
