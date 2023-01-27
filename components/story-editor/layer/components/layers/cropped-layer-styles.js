import ReactCrop from 'react-image-crop-fork';
import styled, { css } from 'styled-components';

const MediaWrapper = styled.div.attrs(({ width, height, borderRadius }) => ({
  style: {
    width,
    height,
    borderRadius,
  },
}))`
  ${({ isActive, inheritVisibility }) =>
    isActive
      ? css`
          visibility: ${inheritVisibility ? 'inherit' : 'visible'};
        `
      : css`
          visibility: hidden;
          z-index: -10;
          position: absolute !important;
        `}
  object-fit: cover;
  overflow: hidden;
  position: relative;
  video,
  img {
    position: absolute;
    object-fit: cover;
  }
`;

const BackgroundContainer = styled.div.attrs(({ width, height, filter, borderRadius }) => ({
  style: {
    width: width,
    height: height,
    filter: filter,
    borderRadius: borderRadius,
  },
}))`
  transform: translateZ(0);
  overflow: hidden;
`;


const Cropper = styled(ReactCrop)`
  .ReactCrop__rule-of-thirds-vt::before,
  .ReactCrop__rule-of-thirds-vt::after,
  .ReactCrop__rule-of-thirds-hz::before,
  .ReactCrop__rule-of-thirds-hz::after {
    background-color: var(--primary);
  }
  .ReactCrop__crop-selection {
    border-image-source: none;
    border: 1px solid var(--primary);
  }
  .ReactCrop__drag-handle::after {
    border-radius: 50%;
    width: 6px;
    height: 6px;
    background: var(--primary);
    border: none;
  }
  .ReactCrop__drag-handle.ord-nw {
    margin-left: -3px;
    margin-top: -3px;
  }
  .ReactCrop__drag-handle.ord-ne {
    margin-right: -3px;
    margin-top: -3px;
  }
  .ReactCrop__drag-handle.ord-se {
    margin-right: -3px;
    margin-bottom: -3px;
  }
  .ReactCrop__drag-handle.ord-sw {
    margin-bottom: -3px;
    margin-left: -3px;
  }
  .ReactCrop__drag-handle.ord-s {
    margin-bottom: -3px;
    margin-left: -8px;
    &::after {
      width: 16px;
      border-radius: 4px;
    }
  }
  .ReactCrop__drag-handle.ord-n {
    margin-left: -8px;
    margin-top: -3px;
    &::after {
      width: 16px;
      border-radius: 4px;
    }
  }
  .ReactCrop__drag-handle.ord-w {
    margin-left: -3px;
    margin-top: -8px;
    &::after {
      height: 18px;
      border-radius: 4px;
    }
  }
  .ReactCrop__drag-handle.ord-e {
    margin-right: -3px;
    margin-top: -8px;
    &::after {
      height: 18px;
      border-radius: 4px;
    }
  }
  .ReactCrop__image {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  * {
    min-width: 0 !important;
    min-height: 0 !important;
  }
  max-width: none;
  ${({ isActive }) =>
    isActive
      ? css`
          visibility: visible;
        `
      : css`
          visibility: hidden;
          z-index: -10;
          position: absolute !important;
        `}
  & > div:not([class]) {
    line-height: 0;
  }
`;

export default {
  BackgroundContainer,
  Cropper,
  MediaWrapper,
};
