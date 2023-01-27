import Styled from 'components/templates/template-modal/template-modal-styles';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

const Container = styled.div`
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  opacity: ${({ isInitialized }) => (isInitialized ? 1 : 0)};
  cursor: pointer;

  transition: opacity 500ms ease;
  will-change: opacity;

  .swiper {
    width: 100%;
    height: calc(100% - 24px);
  }

  .swiper-slide {
    width: 100% !important;
    height: 100% !important;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    overflow: hidden;
    border-radius: 8px;
  }
`;

const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  max-height: 248px;
  object-fit: cover;
  border: 2px solid transparent;
  border-radius: 8px;
  ${({ isSelected }) =>
    isSelected &&
    `
      border-color: var(--primary);
    `}
`;

const Title = styled.h4`
  margin: 6px 0 0 0;
  padding: 0 6px;
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const BorderRadiusWrapper = styled.div`
  border-radius: 8px;
  position: relative;
  overflow: hidden;
`;

SwiperCore.use([Autoplay]);

const Carousel = ({ template, isSelected, onSelect, skipTitle }) => {
  const [swiperInitialized, setSwiperInitialized] = useState(false);
  const swiperRef = useRef();
  const onInit = (Swiper) => {
    swiperRef.current = Swiper;
    Swiper.params.autoplay = {
      delay: 1000,
      waitForTransition: true,
    };

    setSwiperInitialized(true);
  };

  const handleMouseEnter = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.start();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleSelect = () => {
    onSelect(template._id);
  };

  const hasSlidesCovers = useMemo(() => template.cuts?.every((slide) => slide.cover?.url && slide.cover?._id), [
    template,
  ]);

  useEffect(() => {
    if (!hasSlidesCovers && !swiperInitialized) {
      setSwiperInitialized(true);
    }
  }, [hasSlidesCovers, swiperInitialized]);

  if (!hasSlidesCovers && (template.posterPortrait3x4Url || template.cover?.url)) {
    return (
      <Container isInitialized={swiperInitialized} onClick={handleSelect}>
        <BorderRadiusWrapper>
          <Image src={template.posterPortrait3x4Url || template.cover?.url} isSelected={isSelected} />
          {isSelected && (
            <>
              <Styled.ActiveSlideMask />
              <Styled.StyledChecked zIndex={1000} />
            </>
          )}
        </BorderRadiusWrapper>
        <Title>{template.title}</Title>
      </Container>
    );
  }

  if (hasSlidesCovers) {
    return (
      <Container
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleSelect}
        isInitialized={swiperInitialized}
      >
        <Swiper
          spaceBetween={26}
          allowTouchMove={false}
          observeParents
          speed={1000}
          onInit={onInit}
          className={'swiper'}
        >
          {template?.cuts?.map((cut, index) => (
            <SwiperSlide key={`${cut.cover._id} - ${index}`}>
              <Image src={cut.cover?.url} isSelected={isSelected} />
              {isSelected && (
                <>
                  <Styled.ActiveSlideMask />
                  <Styled.StyledChecked zIndex={1000} />
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        {!skipTitle && <Title>{template.title}</Title>}
      </Container>
    );
  }

  return <></>;
};

export default memo(Carousel);
