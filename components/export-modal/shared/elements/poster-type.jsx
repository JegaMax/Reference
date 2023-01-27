import { memo } from 'react';
import styled, { css } from 'styled-components';
import portraitPosterIcon from 'assets/images/poster-types/portrait';
import landscapePosterIcon from 'assets/images/poster-types/Landscape';
import squarePosterIcon from 'assets/images/poster-types/Square';
import { posterTypes } from '../../../../config/constants';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border: ${({ isSelected }) => (isSelected ? '1px solid var(--primary)' : '1px solid var(--shade-500-85)')};
  filter: drop-shadow(24px 32px 72px var(--black-18));
  backdrop-filter: blur(50px);
  border-radius: 6px;
  padding: 12px 11px;
  margin: 0 0 16px;
  cursor: pointer;
  ${({ isSelected }) =>
    isSelected &&
    css`
      background: var(--primary);
    `}
`;

const PosterIconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  background: var(--white-10);
`;

const PosterContentWrapper = styled.div`
  padding: 0 0 0 12px;
`;

const Type = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  letter-spacing: 0.01em;
  color: ${({ isSelected }) => (isSelected ? 'var(--shade-900)' : 'var(--white)')};
`;

const Size = styled.div`
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: ${({ isSelected }) => (isSelected ? 'var(--shade-900)' : 'var(--shade-300)')};
`;

const getPosterIcon = (type) => {
  switch (type) {
    case posterTypes.landscape:
      return landscapePosterIcon;
    case posterTypes.portrait:
      return portraitPosterIcon;
    case posterTypes.square:
      return squarePosterIcon;
  }
};

const getSizes = (type) => {
  switch (type) {
    case posterTypes.landscape:
      return '928 x 696';
    case posterTypes.portrait:
      return '696 x 928';
    case posterTypes.square:
      return '696 x 696';
  }
};

const PosterType = ({ isSelected, type, onClick }) => {
  return (
    <Wrapper isSelected={isSelected} onClick={onClick}>
      <PosterIconWrapper isSelected={isSelected}>
        <img src={getPosterIcon(type)} alt={type} />
      </PosterIconWrapper>

      <PosterContentWrapper>
        <Type isSelected={isSelected}>{type}</Type>
        <Size isSelected={isSelected}>{getSizes(type)}</Size>
      </PosterContentWrapper>
    </Wrapper>
  );
};

export default memo(PosterType);
