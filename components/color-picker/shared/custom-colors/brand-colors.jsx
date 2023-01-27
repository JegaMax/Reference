import { createSelector } from '@reduxjs/toolkit';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppSelector } from 'hooks';
import { lazy, memo, Suspense, useCallback, useMemo, useState } from 'react';
import Modal from 'react-modal';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import styled from 'styled-components';
import { toRGBObject } from 'utils/parseColors';
import Select from '../../../shared/select';
import CustomColor from './custom-color';
import CustomColorsLabel from './custom-colors-label';

const StyledButton = styled.div`
  width: 100%;
  color: var(--shade-100);
  border-radius: 7px;
  padding: 9px 10px;
  text-align: center;
  font-size: 12px;
  border: 2px solid var(--shade-100);
  cursor: pointer;
  font-family: Heebo;
  line-height: 12px;
  font-weight: 500;
  &:hover {
    color: var(--shade-100-85);
    border-color: var(--shade-100-85);
  }
`;

const StyledButtonDropdown = styled(StyledButton)`
  margin: 5px auto 10px auto;
  padding: 7px 12px;
  width: 90%;
`;

const CustomColorsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: start;
  align-items: center;
  margin: 4px -2px 0;
  min-width: 100%;
  width: 100%;
`;

const BrandColorsWrapper = styled.div`
  display: flex;
  justiфъ-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledLabelWrapper = styled.div`
  width: 100%;
`;

const customStyles = {
  overlay: {
    backgroundColor: 'var(--shade-500-85)',
    zIndex: 9999,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '20px',
    borderRadius: '12px',
    border: 'none',
    boxShadow: '24px 32px 72px var(--black-18)',
    display: 'flex',
    background: 'var(--shade-900-95)',
    overflowY: 'overlay',
    overflowX: 'hidden',
    maxWidth: '969px',
    maxHeight: '80vh',
    position: 'absolute',
    outline: 'none',
  },
};

const ColorsWrapper = styled.div`
  margin: 12px -2px 0;
`;

const ColorSettings = lazy(() => import('components/settings/color-settings/color-settings'));

const BrandColors = ({
  handleColorChange,
  brandColorsSettingsOpen,
  setBrandColorsSettingsOpen,
}) => {
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const [selectedOptionId, setSelectedOptionId] = useState(null);

  const selectAndMapPalettes = useMemo(() => {
    const empty = [];

    return createSelector(
      (data) => data,
      (data) =>
        data?.colorPalettes?.map((palette) => ({
          value: palette._id,
          name: palette.name,
          colors: palette.colors,
        })) ?? empty,
    );
  }, []);

  const { colorPaletteOptions } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data }) => ({
      colorPaletteOptions: selectAndMapPalettes(data),
    }),
  });

  const selectedOption = useMemo(() => {
    if (selectedOptionId) {
      return colorPaletteOptions?.find((o) => o.value === selectedOptionId);
    }

    return colorPaletteOptions?.[0];
  }, [colorPaletteOptions, selectedOptionId]);

  const toggleModalState = useCallback(() => setBrandColorsSettingsOpen((prev) => !prev), [setBrandColorsSettingsOpen]);
  const onSelect = (option) => setSelectedOptionId(option);
  const onClose = useCallback(() => setBrandColorsSettingsOpen(false), [setBrandColorsSettingsOpen]);

  return (
    <>
      <BrandColorsWrapper>
        <StyledLabelWrapper>
          <CustomColorsLabel title={'Brand colors'} />
        </StyledLabelWrapper>

        <CustomColorsWrapper>
          {colorPaletteOptions?.length === 0 ? (
            <StyledButton onClick={toggleModalState}>Set your brand colors</StyledButton>
          ) : (
            <>
              <Select
                isDisabled={false}
                selectOption={selectedOption?.name || ''}
                selectOptionId={selectedOption?.value || ''}
                options={colorPaletteOptions ?? []}
                onSelect={onSelect}
              >
                <StyledButtonDropdown onClick={toggleModalState}>Edit your brand colors</StyledButtonDropdown>
              </Select>
              <ColorsWrapper>
                {selectedOption?.colors.map((colorPalette) => (
                  <CustomColor
                    key={`preset-color-row${colorPalette._id}`}
                    color={colorPalette.color}
                    handleClick={() => handleColorChange(toRGBObject(colorPalette.color))}
                  />
                ))}
              </ColorsWrapper>
            </>
          )}
        </CustomColorsWrapper>
      </BrandColorsWrapper>

      <Modal
        closeTimeoutMS={300}
        isOpen={brandColorsSettingsOpen}
        style={customStyles }
        className={'modal-scroll'}
        onRequestClose={onClose}
        shouldCloseOnOverlayClick={true}
        ariaHideApp={false}
      >
        <Suspense fallback={<></>}>
          <ColorSettings isInModal />
        </Suspense>
      </Modal>
    </>
  );
};

export default memo(BrandColors);
