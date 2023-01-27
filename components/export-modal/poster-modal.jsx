import { memo, useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import OutsideClickHandler from 'react-outside-click-handler';
import { useDispatch, useSelector } from 'react-redux';
import { posterTypes } from '../../config/constants';
import { setIsPosterModalOpen, setPosterType } from '../../appredux/features/export/exportSlice';
import { ModalBodyWrapper, ModalHeaderWrapper, ModalWrapper } from './../shared/modal';
import { BackButton, HeaderTitle, PosterType, SectionTitle } from './shared/elements';
import { PosterImageLandscape, PosterImagePortrait, PosterImageSquare } from './shared/elements/poster-image-preview';
import { ModalPosterOuterWrapper, PosterSection, PosterSectionsWrapper } from './shared/structure';
import styled from 'styled-components';
import { setImageCrops } from '../../appredux/features/editor/helpers/helpersSlice';
import { getAspectRatio, getCroppedImg } from './helpers/cropperHelpers';
import SavePosterButton from './shared/elements/save-poster-button';
import UploadButton from './shared/elements/upload-button';
import CropperWrapper from './shared/structure/cropper-wrapper';

const PosterModalTitle = styled(HeaderTitle)`
  margin: auto;
`;

const readFile = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
};

const PosterModal = ({
  postersSrcs,
  originalPostersSrcs,
  updatePostersSrcs,
  updateOriginalPostersSrcs,
}) => {
  const dispatch = useDispatch();
  // Current type of selected poster (Portrait, Landscape, ...)
  const posterType = useSelector((state) => state.export.posterType);
  // Object containing the position of different poster crops.
  const imageCrops = useSelector((state) => state.helpers.imageCrops);

  const [imageCropsLocal, setImageCropsLocal] = useState(imageCrops);

  const [isSaving, setIsSaving] = useState(false);
  const [croppedImageSrcs, setCroppedImageSrcs] = useState(postersSrcs);

  const poster = originalPostersSrcs[posterType.toLowerCase()];

  const crop = imageCropsLocal[posterType.toLowerCase()];

  const setCrop = (location) =>
    setImageCropsLocal((prevState) => {
      return {
        ...prevState,
        [posterType.toLocaleLowerCase()]: location,
      };
    });

  const showCroppedImage = useCallback(async (croppedAreaPixels, poster, posterType) => {
    const img = await getCroppedImg(poster, croppedAreaPixels, 0);

    setCroppedImageSrcs((prevImageSrcs) => ({
      ...prevImageSrcs,
      [posterType.toLocaleLowerCase()]: img,
    }));
  }, []);

  // Cropping completed
  const onCropComplete = useCallback(
    (_, croppedAreaPixels) => {
      dispatch(setImageCrops(imageCropsLocal));
      showCroppedImage(croppedAreaPixels, poster, posterType);
    },
    [showCroppedImage, poster, posterType, dispatch, imageCropsLocal],
  );

  // Upload handler
  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageDataUrl = (await readFile(file));

      setCroppedImageSrcs({ portrait: imageDataUrl, landscape: imageDataUrl, square: imageDataUrl });
      updateOriginalPostersSrcs({ portrait: imageDataUrl, landscape: imageDataUrl, square: imageDataUrl });
    }
  };

  // Utils
  const onClosePosterModal = useCallback(() => {
    if (!isSaving) {
      dispatch(setIsPosterModalOpen(false));
    }
  }, [dispatch, isSaving]);
  const onPosterTypeSelect = useCallback((type) => () => dispatch(setPosterType(type)), [dispatch]);

  // Todo
  const onSavePoster = async () => {
    setIsSaving(true);
    await updatePostersSrcs(croppedImageSrcs);
    dispatch(setIsPosterModalOpen(false));
  };

  return (
    <ModalPosterOuterWrapper>
      <OutsideClickHandler display="flex" onOutsideClick={onClosePosterModal}>
        <ModalWrapper>
          <ModalHeaderWrapper>
            <BackButton onClick={onClosePosterModal} />

            <PosterModalTitle text="Poster images" />
          </ModalHeaderWrapper>

          <ModalBodyWrapper>
            <PosterSectionsWrapper>
              <PosterSection width={31}>
                <SectionTitle text="Format" />

                <PosterType
                  isSelected={posterType === posterTypes.portrait}
                  type={posterTypes.portrait}
                  onClick={onPosterTypeSelect(posterTypes.portrait)}
                />

                <PosterType
                  isSelected={posterType === posterTypes.landscape}
                  type={posterTypes.landscape}
                  onClick={onPosterTypeSelect(posterTypes.landscape)}
                />

                <PosterType
                  isSelected={posterType === posterTypes.square}
                  type={posterTypes.square}
                  onClick={onPosterTypeSelect(posterTypes.square)}
                />
              </PosterSection>

              <PosterSection width={38}>
                <SectionTitle text="Crop" />

                <CropperWrapper>
                  <Cropper
                    image={poster}
                    crop={crop}
                    aspect={getAspectRatio(posterType)}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                  />
                </CropperWrapper>

                <UploadButton value={''} onChange={onFileChange} />
              </PosterSection>

              <PosterSection width={31}>
                <SectionTitle text="Preview" />

                {/* Previews */}

                {posterType === posterTypes.portrait && <PosterImagePortrait image={croppedImageSrcs.portrait} />}

                {posterType === posterTypes.landscape && <PosterImageLandscape image={croppedImageSrcs.landscape} />}

                {posterType === posterTypes.square && <PosterImageSquare image={croppedImageSrcs.square} />}

                <SavePosterButton isSaving={isSaving} onClick={onSavePoster} />
              </PosterSection>
            </PosterSectionsWrapper>
          </ModalBodyWrapper>
        </ModalWrapper>
      </OutsideClickHandler>
    </ModalPosterOuterWrapper>
  );
};

export default memo(PosterModal);
