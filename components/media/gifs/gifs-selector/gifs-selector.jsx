import { useCallback, useEffect, useState } from 'react';
import { batch, useDispatch, useSelector } from 'react-redux';
import { gifSearchTypes } from '../../../../config/constants';
import { useSpinner } from '../../../../hooks';
import { layerTypes } from '../../../../interfaces/layer-types';
import { createNewLayer } from '../../../../appredux/features/amp-story/ampStorySlice';
import { loadGifs, resetGifs, selectGif } from '../../../../appredux/features/editor/gif/gifsSlice';
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
const searchType = gifSearchTypes.gifs;

const GifsSelector = ({ searchValue, debouncedSearchValue, onSearchChange }) => {
  const dispatch = useDispatch();
  const gifs = useSelector((state) => state.gif.gifs);

  const gifsFirstColumn = gifs.slice(0, gifs.length / 2);
  const gifsSecondColumn = gifs.slice(gifs.length / 2, gifs.length);

  const [offset, setOffset] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'SyncLoader',
    size: 10,
  });

  const fetchGifs = useCallback(
    async (newOffset) => {
      setIsLoading(true);
      await dispatch(loadGifs(debouncedSearchValue, newOffset, searchType));
      setIsLoading(false);
    },
    [debouncedSearchValue, dispatch],
  );

  useEffect(() => {
    return () => {
      dispatch(resetGifs());
    };
  }, [dispatch]);

  useEffect(() => {
    const newOffset = 0;
    setOffset(newOffset);

    batch(() => {
      dispatch(resetGifs());
      fetchGifs(newOffset);
    });
  }, [dispatch, debouncedSearchValue, fetchGifs]);

  const onGifSelect = useCallback(
    (gif) => {
      const temporaryGif = {
        id: generateId(),
        url: gif.images.original.webp,
        name: gif.slug || gif.images.original.webp.split('').pop(),
        width: gif.images.original.width,
        height: gif.images.original.height,
      };

      batch(() => {
        dispatch(createNewLayer({ type: layerTypes.GIFS, media: temporaryGif, temporaryId: temporaryGif.id }));
        dispatch(selectGif(gif, temporaryGif));
      });
    },
    [dispatch],
  );

  const loadMoreGifs = () => {
    const newOffset = offset + limit;
    setOffset(newOffset);
    fetchGifs(newOffset);
  };

  return (
    <>
      <UnsplashSearch value={searchValue} placeholder={'Search Giphy'} onChange={onSearchChange} />
      <SelectorContentWrapper id={'gif-list-container'}>
        {gifs.length < 1 && !isLoading && <NoResults text={'No Gifs found.<br/> Try again.'} />}

        {isLoading && (
          <LoaderWrapper>
            <Spinner {...spinnerProps} isVisible={true} />
          </LoaderWrapper>
        )}

        {gifs.length > 0 && (
          <StyledInfiniteScroll
            dataLength={gifs.length}
            next={loadMoreGifs}
            hasMore={true}
            loader={<></>}
            scrollableTarget={'gif-list-container'}
          >
            <ImagesWrapper>
              <ImageColumn>
                {gifsFirstColumn.map((gif) => (
                  <ImageWrapper key={gif.id}>
                    <Image alt="gif" onClick={onGifSelect} gif={gif} />
                  </ImageWrapper>
                ))}
              </ImageColumn>

              <ImageColumn>
                {gifsSecondColumn.map((gif) => (
                  <ImageWrapper key={gif.id}>
                    <Image alt="gif" onClick={onGifSelect} gif={gif} />
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
export default GifsSelector;
