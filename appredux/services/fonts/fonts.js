import { normalizeUserFontShape } from '../../../utils/fontUtils';
import api from '../api';

const mapWorkspaceFonts = (input) => {
  const output = [];

  input.forEach((font) => {
    const existingFontFamily = output.find((parsedFont) => parsedFont.family === font.family);
    if (existingFontFamily) {
      existingFontFamily.variants.push(font.subFamilyName.toLowerCase());
      existingFontFamily.paths[String(font.weight)] = font.url;
      existingFontFamily.weight.push(+font.weight);
      return;
    }

    output.push(normalizeUserFontShape(font));
  });

  return output;
};

export const fontsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    workspaceFontsList: builder.query({
      query: () => 'font/workspace',
      providesTags: (result) => {
        if (result) {
          const fonts = [...result.map(({ _id: id }) => ({ type: 'WorkspaceFonts', id }))];
          return [...fonts, { type: 'WorkspaceFonts', id: 'LIST' }];
        }

        return [{ type: 'WorkspaceFonts', id: 'LIST' }];
      },
      transformResponse: mapWorkspaceFonts,
      keepUnusedDataFor: 86400,
    }),
    googleFontsList: builder.query({
      query: () => 'font/google',
      providesTags: [{ type: 'GoogleFonts', id: 'LIST' }],
      keepUnusedDataFor: 86400,
    }),
    addWorkspaceFont: builder.mutation({
      query: (formData) => ({
        url: 'font/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: [{ type: 'WorkspaceFonts', id: 'LIST' }],
      transformResponse: (response) => normalizeUserFontShape(response),
    }),
    removeWorkspaceFont: builder.mutation({
      query: (id) => ({
        url: `font/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, id) => [{ type: 'WorkspaceFonts', id }],
    }),
  }),
});

export const {
  useWorkspaceFontsListQuery,
  useAddWorkspaceFontMutation,
  useRemoveWorkspaceFontMutation,
  useGoogleFontsListQuery,
} = fontsApi;
