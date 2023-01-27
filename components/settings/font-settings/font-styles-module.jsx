import { skipToken } from '@reduxjs/toolkit/dist/query';
import { layerTypes } from 'interfaces/layer-types';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { batch } from 'react-redux';
import { createNewLayer } from 'appredux/features/amp-story/ampStorySlice';
import { setCurrentTextPresetLabel } from 'appredux/features/editor/helpers/helpersSlice';
import { useGoogleFontsListQuery, useWorkspaceFontsListQuery } from 'appredux/services/fonts/fonts';
import { RoleName } from 'appredux/services/workspaces/interface';
import { useGetWorkspaceQuery, useUpdateWorkspaceFontStylesMutation } from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import { loadFontFamily } from 'utils/textEditorUtils';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import FontItem from './font-item';
import FontStyleSettingsModal from './font-style-settings-modal';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 328px;
  position: relative;
  z-index: 200;
  gap: 12px;
`;

export const getFormatedLabel = (label) => {
  switch (label) {
    case 'title':
      return 'Title';
    case 'headLine':
      return 'Headline';
    case 'subHeadline':
      return 'Subheadline';
    case 'normalText':
      return 'Normal text';
    case 'smallText':
      return 'Small text';
    default:
      return '';
  }
};

const FontStylesModule = ({ isModalShownInEditor, parentRef }) => {
  const dispatch = useAppDispatch();
  const [selectedPreset, setSelectedPreset] = useState(null);

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const { stylePresets, isWorkspaceAdmin } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      stylePresets: workspace?.stylePresets,
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
    }),
  });

  const { data: workspaceFonts } = useWorkspaceFontsListQuery(selectedWorkspaceId ?? skipToken);
  const { data: googleFonts } = useGoogleFontsListQuery();
  const [updateWorkspaceFontStyles] = useUpdateWorkspaceFontStylesMutation();

  const selectedFont = useMemo(() => {
    if (stylePresets && selectedPreset && stylePresets?.[selectedPreset]) {
      const selectedPresetFamily = stylePresets?.[selectedPreset]?.fontFamily;
      const font = [...(workspaceFonts ?? []), ...(googleFonts ?? [])]?.find((f) => f.family === selectedPresetFamily);
      return font;
    }

    return null;
  }, [googleFonts, selectedPreset, stylePresets, workspaceFonts]);

  const selectedWeight = useMemo(() => {
    if (stylePresets && selectedPreset && stylePresets?.[selectedPreset]) {
      return stylePresets?.[selectedPreset]?.weight;
    }

    return null;
  }, [selectedPreset, stylePresets]);

  const selectedSize = useMemo(() => {
    if (stylePresets && selectedPreset && stylePresets?.[selectedPreset]) {
      return stylePresets?.[selectedPreset]?.size;
    }

    return null;
  }, [selectedPreset, stylePresets]);

  const activeInlineStyles = useMemo(() => {
    if (stylePresets && selectedPreset && stylePresets?.[selectedPreset]) {
      return stylePresets?.[selectedPreset]?.style;
    }

    return null;
  }, [selectedPreset, stylePresets]);

  const onOutsideClick = useCallback(() => setSelectedPreset(null), []);
  const handleSelectPreset = useCallback(
    (preset) => {
      if (isModalShownInEditor && preset && stylePresets) {
        const type = layerTypes.HTML;
        batch(() => {
          dispatch(setCurrentTextPresetLabel(getFormatedLabel(preset)));
          dispatch(createNewLayer({ type, presetFontStyles: stylePresets[preset], googleFonts, workspaceFonts }));
        });

        return;
      }

      setSelectedPreset(preset);
    },
    [dispatch, googleFonts, isModalShownInEditor, stylePresets, workspaceFonts],
  );
  const onFontFamilyChange = useCallback(
    (option) => {
      const fontFamily = option.replaceAll('_', ' ');
      const font = [...(workspaceFonts ?? []), ...(googleFonts ?? [])]?.find((f) => f.family === fontFamily);
      if (font && selectedPreset && selectedWorkspaceId) {
        if (!font.weight.includes(selectedWeight ?? 0)) {
          try {
            updateWorkspaceFontStyles({
              workspaceId: selectedWorkspaceId,
              [selectedPreset]: {
                fontFamily,
                weight: 400,
              },
            });
          } catch (error) {
            console.error(error);
          }

          return;
        }

        if (font.weight.includes(700) && activeInlineStyles?.includes('bold')) {
          try {
            updateWorkspaceFontStyles({
              workspaceId: selectedWorkspaceId,
              [selectedPreset]: {
                fontFamily,
                weight: 700,
              },
            });
          } catch (error) {
            console.error(error);
          }

          return;
        }

        try {
          updateWorkspaceFontStyles({
            workspaceId: selectedWorkspaceId,
            [selectedPreset]: {
              fontFamily,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [
      activeInlineStyles,
      googleFonts,
      selectedPreset,
      selectedWeight,
      selectedWorkspaceId,
      updateWorkspaceFontStyles,
      workspaceFonts,
    ],
  );
  const onFontWeightChange = useCallback(
    (weight) => {
      if (selectedPreset && selectedWorkspaceId) {
        if (weight === 700) {
          try {
            updateWorkspaceFontStyles({
              workspaceId: selectedWorkspaceId,
              [selectedPreset]: {
                weight,
                style: [...(activeInlineStyles ?? []), 'bold'],
              },
            });
          } catch (error) {
            console.error(error);
          }

          return;
        }

        if (weight !== 700 && selectedFont?.weight.find((w) => w === 700)) {
          try {
            updateWorkspaceFontStyles({
              workspaceId: selectedWorkspaceId,
              [selectedPreset]: {
                weight,
                style: activeInlineStyles?.filter((s) => s !== 'bold'),
              },
            });
          } catch (error) {
            console.error(error);
          }

          return;
        }

        try {
          updateWorkspaceFontStyles({
            workspaceId: selectedWorkspaceId,
            [selectedPreset]: {
              weight,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [activeInlineStyles, selectedFont?.weight, selectedPreset, selectedWorkspaceId, updateWorkspaceFontStyles],
  );
  const onInlineStyleChange = useCallback(
    (style) => {
      if (selectedPreset) {
        if (style !== 'bold' && activeInlineStyles?.includes(style)) {
          try {
            updateWorkspaceFontStyles({
              workspaceId: selectedWorkspaceId,
              [selectedPreset]: {
                style: activeInlineStyles.filter((s) => s !== style),
              },
            });
          } catch (error) {
            console.error(error);
          }

          return;
        }

        if (style !== 'bold' && !activeInlineStyles?.includes(style)) {
          try {
            updateWorkspaceFontStyles({
              workspaceId: selectedWorkspaceId,
              [selectedPreset]: {
                style: [...(activeInlineStyles ?? []), style],
              },
            });
          } catch (error) {
            console.error(error);
          }

          return;
        }

        if (!activeInlineStyles?.includes(style)) {
          const doesFontHasBoldOption = selectedFont?.weight.find((w) => w === 700);
          if (doesFontHasBoldOption) {
            try {
              updateWorkspaceFontStyles({
                workspaceId: selectedWorkspaceId,
                [selectedPreset]: {
                  style: [...(activeInlineStyles ?? []), style],
                  weight: 700,
                },
              });
            } catch (error) {
              console.error(error);
            }

            return;
          }

          try {
            updateWorkspaceFontStyles({
              workspaceId: selectedWorkspaceId,
              [selectedPreset]: {
                style: [...(activeInlineStyles ?? []), style],
              },
            });
          } catch (error) {
            console.error(error);
          }
          return;
        }

        const doesFontHasBoldOption = selectedFont?.weight.find((w) => w === 700);
        if (doesFontHasBoldOption) {
          try {
            updateWorkspaceFontStyles({
              workspaceId: selectedWorkspaceId,
              [selectedPreset]: {
                style: activeInlineStyles?.filter((s) => s !== style),
                weight: 400,
              },
            });
          } catch (error) {
            console.error(error);
          }

          return;
        }

        try {
          updateWorkspaceFontStyles({
            workspaceId: selectedWorkspaceId,
            [selectedPreset]: {
              style: activeInlineStyles?.filter((s) => s !== style),
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [activeInlineStyles, selectedFont?.weight, selectedPreset, selectedWorkspaceId, updateWorkspaceFontStyles],
  );
  const onFontSizeChange = useCallback(
    (value) => {
      if (selectedPreset) {
        try {
          updateWorkspaceFontStyles({
            workspaceId: selectedWorkspaceId,
            [selectedPreset]: {
              size: value,
            },
          });
        } catch (error) {
          console.error(error);
        }
      }
    },
    [selectedPreset, selectedWorkspaceId, updateWorkspaceFontStyles],
  );

  // Load font presets
  useEffect(() => {
    if (stylePresets && Object.values(stylePresets)?.length > 0 && googleFonts && googleFonts?.length > 0) {
      Object.values(stylePresets).forEach((preset) => {
        const font = googleFonts?.find((gf) => gf.family === preset.fontFamily);
        if (font) {
          loadFontFamily(font);
        }
      });
    }
  }, [googleFonts, stylePresets]);

  useEffect(() => {
    if (parentRef?.current) {
      if (selectedPreset) {
        parentRef.current.style.zIndex = '2';
        return;
      }

      parentRef.current.style.zIndex = '1';
    }
  }, [parentRef, selectedPreset]);

  return (
    <Wrapper>
      {Object.keys(stylePresets ?? {})?.map((preset, index) =>
        stylePresets?.[preset] !== undefined ? (
          <FontItem
            key={`${preset}-${index}`}
            currentPreset={stylePresets[preset]}
            presetKey={preset}
            isModalShownInEditor={isModalShownInEditor}
            isActive={selectedPreset === preset}
            handleSelectPreset={handleSelectPreset}
          />
        ) : (
          <></>
        ),
      )}
      <OutsideClickHandler onOutsideClick={onOutsideClick}>
        <FontStyleSettingsModal
          isOpen={!!selectedPreset}
          title={getFormatedLabel(selectedPreset ?? '')}
          font={selectedFont}
          selectedWeight={selectedWeight}
          selectedSize={selectedSize}
          activeInlineStyles={activeInlineStyles}
          isWorkspaceAdmin={isWorkspaceAdmin}
          handleFontFamilySelect={onFontFamilyChange}
          handleFontWeightSelect={onFontWeightChange}
          handleFontSizeChange={onFontSizeChange}
          handleInlineStyleChange={onInlineStyleChange}
        />
      </OutsideClickHandler>
    </Wrapper>
  );
};

export default memo(FontStylesModule);
