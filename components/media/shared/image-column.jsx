import React, { ReactNode } from 'react';
import styled from 'styled-components';

const StyledImagesColumn = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  line-height: 1;
  padding: 0 8px;
  box-sizing: border-box;
`;

const ImagesColumn = ({ id, className, children }) => {
  return (
    <StyledImagesColumn id={id} className={className}>
      {children}
    </StyledImagesColumn>
  );
};

export default ImagesColumn;
