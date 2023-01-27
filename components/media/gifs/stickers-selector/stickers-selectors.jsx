import { useCallback, useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { gifSearchTypes } from '../../../../config/constants';
import { useSpinner } from '../../../../hooks';
import { layerTypes } from '../../../../interfaces/layer-types';
import { createNewLayer } from '../../../../appredux/features/amp-story/ampStorySlice';
import {
  loadGifs as loadStickers,
  resetGifs as resetStickers,
  selectGif as selectSticker
} from '../../../../appredux/features/editor/gif/gifsSlice';
import generateId from '../../../../utils/generateId';
import Image from '../../shared/image';
import ImageColumn from '../../shared/image-column';
import ImageWrapper from '../../shared/image-wrapper';
import ImagesWrapper from '../../shared/images-wrapper';
import LoaderWrapper from '../../shared/loader-wrapper';
import NoResults from '../../shared/no-results';
import SelectorContentWrapper from '../../shared/selector-content-wrapper';
import StyledInfiniteScroll from '../../shared/styled-infinite-scroll';
import UnsplashSearch from '../../shared/unsplash-search';

const limit = 20;
const searchType = gifSearchTypes.stickers;

const StickersSelector = ({ searchValue, debouncedSearchValue, onSearchChange }) => {
  const dispatch = useDispatch();
  const stickers = useSelector((state) => state.gif.gifs);

  const stickersFirstColumn = stickers.slice(0, stickers.length / 2);
  const stickersSecondColumn = stickers.slice(stickers.length / 2, stickers.length);

  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'SyncLoader',
    size: 10,
  });

  const fetchStickers = useCallback(
    async (newOffset) => {
      setIsLoading(true);
      await dispatch(loadStickers(debouncedSearchValue, newOffset, searchType));
      setIsLoading(false);
    },
    [debouncedSearchValue, dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(resetStickers());
    };
  }, [dispatch]);

  useEffect(() => {
    const newOffset = 0;
    setOffset(newOffset);

    batch(() => {
      dispatch(resetStickers());
      fetchStickers(newOffset);
    });
  }, [dispatch, debouncedSearchValue, fetchStickers]);

  const onStickerSelect = (sticker) => {
    const temporarySticker = {
      id: generateId(),
      url: sticker.images.original.url,
      name: sticker.slug || sticker.images.original.url.split('').pop(),
      width: sticker.images.original.width,
      height: sticker.images.original.height,
    };

    batch(() => {
      dispatch(
        createNewLayer({ type: layerTypes.STICKERS, media: temporarySticker, temporaryId: temporarySticker.id }),
      );
      dispatch(selectSticker(sticker, temporarySticker));
    });
  };

  const loadMoreStickers = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchStickers(newOffset);
  };

  return (
    <>
      <UnsplashSearch value={searchValue} placeholder={'Search Stickers'} onChange={onSearchChange} />
      <SelectorContentWrapper id={'stickers-list-container'}>
        {stickers.length < 1 && !isLoading && <NoResults text={'No Stickers found.<br/> Try again.'} />}

        {isLoading && (
          <LoaderWrapper>
            <Spinner {...spinnerProps} isVisible={true} />
          </LoaderWrapper>
        )}

        {stickers.length > 0 && (
          <StyledInfiniteScroll
            dataLength={stickers.length}
            next={loadMoreStickers}
            hasMore={true}
            loader={<></>}
            scrollableTarget={'stickers-list-container'}
          >
            <ImagesWrapper>
              <ImageColumn>
                {stickersFirstColumn.map((sticker) => (
                  <ImageWrapper key={sticker.id}>
                    <Image alt="sticker" onClick={onStickerSelect} gif={sticker} isSticker />
                  </ImageWrapper>
                ))}
              </ImageColumn>

              <ImageColumn>
                {stickersSecondColumn.map((sticker) => (
                  <ImageWrapper key={sticker.id}>
                    <Image alt="sticker" onClick={onStickerSelect} gif={sticker} isSticker />
                  </ImageWrapper>
                ))}
              </ImageColumn>
            </ImagesWrapper>
          </StyledInfiniteScroll>
        )}
      </SelectorContentWrapper>
    </>
  );
};

export default StickersSelector;
