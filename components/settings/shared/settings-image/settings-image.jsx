import styled from 'styled-components';

import SettingsImageInput from './settings-image-input';
import SettingsImageSM, { SettingsImageDeleteBtn } from './settings-image-sm';

import { useSpinner } from '../../../../hooks';

const LoaderWrapper = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  border-radius: 8px;
  position: relative;
  align-items: center;
  box-sizing: border-box;
  justify-content: center;
  background: var(--shade-700);
  border: 1px solid var(--shade-300-85);
`;

const SettingsImageWrapper = styled.span`
  position: relative;
  &:hover {
    ${SettingsImageDeleteBtn} {
      opacity: 1;
      z-index: 9999;
    }
  }
`;

const SettingsImage = ({
  image,
  isLoading,
  isDisabled,
  handleImageClick,
  handleInputClick,
}) => {
  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'ClipLoader',
    size: 12,
  });

  if (isLoading) {
    return (
      <LoaderWrapper>
        <Spinner {...spinnerProps} isVisible={true} />
      </LoaderWrapper>
    );
  }

  return (
    <>
      {image ? (
        <SettingsImageWrapper>
          <SettingsImageSM image={image} onClick={handleImageClick} />
          <SettingsImageInput
            isDisabled={isDisabled}
            acceptedFileTypes={'image/*'}
            onClick={handleInputClick}
            nonVisible
          />
        </SettingsImageWrapper>
      ) : (
        <SettingsImageInput isDisabled={isDisabled} acceptedFileTypes={'image/*'} onClick={handleInputClick} />
      )}
    </>
  );
};

export default SettingsImage;
