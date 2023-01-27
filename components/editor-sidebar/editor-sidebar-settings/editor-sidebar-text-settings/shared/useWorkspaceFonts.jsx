import { useMemo } from 'react';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppSelector } from 'hooks';
import { useGoogleFontsListQuery, useWorkspaceFontsListQuery } from 'appredux/services/fonts/fonts';
import { getFontOptionName } from 'utils/textEditorUtils';

const useWorkspaceFonts = (searchFont = '') => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const { data: workspaceFonts } = useWorkspaceFontsListQuery(selectedWorkspaceId ?? skipToken);
  const { data: googleFonts } = useGoogleFontsListQuery();

  const filteredFonts = useMemo(() => {
    const filteredUserFonts = workspaceFonts
      ?.filter((font) => font.family.toLowerCase().includes(searchFont.toLowerCase()))
      ?.map((font) => ({ name: font.family, value: getFontOptionName(font.family, false), fontData: font }));

    const filteredGoogleFonts = googleFonts
      ?.filter((font) => font.family.toLowerCase().includes(searchFont.toLowerCase()))
      ?.map((font) => ({ name: font.family, value: getFontOptionName(font.family, false), fontData: font }));

    return {
      user: {
        title: 'Brand fonts',
        options: filteredUserFonts,
      },
      google: {
        options: filteredGoogleFonts,
      },
    };
  }, [searchFont, googleFonts, workspaceFonts]);

  return filteredFonts;
};

export default useWorkspaceFonts;
