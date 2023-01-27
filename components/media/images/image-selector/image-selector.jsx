import { useCallback, useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';

import { useSpinner } from '../../../../hooks';
import { layerTypes } from '../../../../interfaces/layer-types';
import { createNewLayer, replaceMedia } from '../../../../appredux/features/amp-story/ampStorySlice';

import styled from 'styled-components';
import { toggleReplaceModal } from '../../../../appredux/features/editor/helpers/helpersSlice';
import {
  clearLoadedImages,
  loadUnsplashImages,
  resetOffset,
  selectImage,
  setOffset
} from '../../../../appredux/features/editor/image/imageSlice';
import generateId from '../../../../utils/generateId';
import { selectMediaType } from '../../../editor-modals/interfaces';
import Image from '../../shared/image';
import ImageColumn from '../../shared/image-column';
import ImageWrapper from '../../shared/image-wrapper';
import ImagesWrapper from '../../shared/images-wrapper';
import LoaderWrapper from '../../shared/loader-wrapper';
import NoResults from '../../shared/no-results';
import SelectorContentWrapper from '../../shared/selector-content-wrapper';
import StyledInfiniteScroll from '../../shared/styled-infinite-scroll';
import UnsplashSearch from '../../shared/unsplash-search';

const StyledSelectorContentWrapper = styled(SelectorContentWrapper)`
  height: calc(100% - 48px);
`;

const TitleWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  right: 0px;
  width: 100%;
  height: 35%;
  background: linear-gradient(rgba(3, 3, 3, 0) 0%, rgb(6, 6, 6) 76.04%);
  color: #fff;
  border-radius: 0px 0px 2px 2px;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
`;

const CustomLink = styled.a`
  text-decoration: none;
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 1.5;
  margin: 0px 0px 3px 5px;
  letter-spacing: 0.01em;
  color: rgb(255, 255, 255);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-decoration: none;
`;

const ImageSelector = ({
  searchValue,
  debouncedSearchValue,
  selectType = selectMediaType.CREATE_LAYER,
  onSearchChange,
}) => {
  const dispatch = useDispatch();
  const images = useSelector((state) => state.image.images);
  const imagesFirstColumn = images.slice(0, images.length / 2);
  const imagesSecondColumn = images.slice(images.length / 2);
  const offset = useSelector((state) => state.image.model.offset);
  const [isLoading, setIsLoading] = useState(true);

  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'SyncLoader',
    size: 10,
  });

  const createMediaLayer = useCallback(
    (img, temporaryImage) => {
      batch(() => {
        dispatch(createNewLayer({ type: layerTypes.IMAGE, media: temporaryImage, temporaryId: temporaryImage.id }));
        dispatch(selectImage(img, temporaryImage));
      });
    },
    [dispatch],
  );

  const replaceMediaLayer = useCallback(
    (img, temporaryImage) => {
      batch(() => {
        dispatch(replaceMedia(temporaryImage));
        dispatch(selectImage(img, temporaryImage));
        dispatch(toggleReplaceModal());
      });
    },
    [dispatch],
  );

  const onImageSelect = useCallback(
    (img) => {
      const temporaryImage = {
        id: generateId(),
        url: img.urls.regular,
        name: `${img.id}.jpg` || '',
        width: img.width,
        height: img.height,
      };

      if (selectType === selectMediaType.CREATE_LAYER) {
        createMediaLayer(img, temporaryImage);
      }

      if (selectType === selectMediaType.REPLACE_MEDIA) {
        replaceMediaLayer(img, temporaryImage);
      }
    },
    [createMediaLayer, replaceMediaLayer, selectType],
  );

  const loadImages = useCallback(async () => {
    setIsLoading(true);
    await dispatch(loadUnsplashImages(debouncedSearchValue));
    setIsLoading(false);
  }, [debouncedSearchValue, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(resetOffset());
    };
  }, [dispatch]);

  useEffect(() => {
    batch(() => {
      dispatch(resetOffset());
      dispatch(clearLoadedImages());
      loadImages();
    });
  }, [debouncedSearchValue, dispatch, loadImages]);

  useEffect(() => {
    if (offset) {
      loadImages();
    }
  }, [dispatch, offset, loadImages]);

  return (
    <>
      <UnsplashSearch value={searchValue} placeholder={'Search Unsplash'} onChange={onSearchChange} />
      <StyledSelectorContentWrapper id={'image-list-container'}>
        {images.length < 1 && !isLoading && <NoResults text={'No Images found.<br/> Try again.'} />}
        {isLoading && (
          <LoaderWrapper>
            <Spinner {...spinnerProps} isVisible={true} />
          </LoaderWrapper>
        )}
        {images.length > 0 && (
          <StyledInfiniteScroll
            dataLength={images.length}
            hasMore={true}
            next={() => dispatch(setOffset())}
            loader={<></>}
            scrollableTarget={'image-list-container'}
          >
            <ImagesWrapper>
              <ImageColumn>
                {imagesFirstColumn.map((image) => (
                  <ImageWrapper key={image.id} id={image.id}>
                    <Image alt="image" image={image} onClick={onImageSelect} />
                    <TitleWrapper>
                      <CustomLink href={image?.user?.links?.html} target="_blank">
                        by {image?.user?.name} on Unsplash
                      </CustomLink>
                    </TitleWrapper>
                  </ImageWrapper>
                ))}
              </ImageColumn>
              <ImageColumn>
                {imagesSecondColumn.map((image) => (
                  <ImageWrapper key={image.id} id={image.id}>
                    <Image alt="image" image={image} onClick={onImageSelect} />
                    <TitleWrapper>
                      <CustomLink href={image?.user?.links?.html} target="_blank">
                        by {image?.user?.name} on Unsplash
                      </CustomLink>
                    </TitleWrapper>
                  </ImageWrapper>
                ))}
              </ImageColumn>
            </ImagesWrapper>
          </StyledInfiniteScroll>
        )}
      </StyledSelectorContentWrapper>
    </>
  );
};

export default ImageSelector;
