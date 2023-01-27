import React from 'react';
import notFoundImage from './images/editor-modal/no-results';
import styled from 'styled-components';

const NoResultsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: stretch;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const Image = styled.img`
  width: 64px;
  height: 64px;
  margin: -25% 0 8px;
`;

const Text = styled.p`
  margin: 0;
  max-width: 80px;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
`;

const NoResults = ({ text }) => {
  return (
    <NoResultsWrapper>
      <Image src={notFoundImage} alt={'not found'} />
      <Text dangerouslySetInnerHTML={{ __html: text }} />
    </NoResultsWrapper>
  );
};

export default NoResults;
