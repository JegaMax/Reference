import { useAppDispatch, useAppSelector } from 'hooks';
import debounce from 'lodash/debounce';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { setLoadedFontName } from 'appredux/features/editor/helpers/helpersSlice';
import Styled from './font-option-styled';

const FontOption = ({ isSelected, font, onClick }) => {
  const [show, setShow] = useState(false);
  const name = useMemo(() => {
    return font.name.split(' ');
  }, [font]);
  const dispatch = useAppDispatch();
  const isFontLoaded = useAppSelector(
    (state) => Boolean(state.helpers.loadedFontNames.find((loadedFontName) => loadedFontName === font.name)),
    (prev, next) => prev === next,
  );

  const fontRequest = useCallback(async () => {
    try {
      const protocol = window.location.protocol;
      const fontUrl = font?.fontData?.file ?? '';
      const urlWithoutProtocol = fontUrl.replace(/^https?:\/\//i, '');
      const href = `url(${protocol}//${urlWithoutProtocol})`;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const fontFace = new FontFace(font.name, href);
      // wait for font to be loaded
      await fontFace.load();
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return document.fonts.add(fontFace);
    } catch (error) {
      console.error(error);
    }
  }, [font.fontData.file, font.name]);

  const debouncedShow = useCallback(
    debounce(() => {
      setShow(true);
    }, 500),
    [show],
  );

  const onFontLoad = useCallback(async () => {
    if (isFontLoaded) {
      setShow(true);
    } else {
      await fontRequest();
      debouncedShow();
      dispatch(setLoadedFontName(font.name));
    }
  }, [debouncedShow, dispatch, font.name, fontRequest, isFontLoaded]);

  useEffect(() => {
    onFontLoad();

    return () => {
      debouncedShow.cancel();
    };
  }, [onFontLoad, debouncedShow]);

  return (
    <Styled.SelectOption isSelected={isSelected} fontFamily={font.name} onClick={onClick}>
      {name.map((word, wordIndex) => {
        if (wordIndex === name.length - 1) {
          return (
            <Styled.OptionText key={`${font.name}-word-${word}-${wordIndex}`} show={show}>
              {word}
            </Styled.OptionText>
          );
        }
        return (
          <span key={`${font.name}-word-${word}-${wordIndex}`}>
            <Styled.OptionText show={show}>{word}</Styled.OptionText>{' '}
          </span>
        );
      })}
    </Styled.SelectOption>
  );
};

export default memo(FontOption);
