import React from 'react';
import folderIcon from './images/editor-modal/folder.svg';
import styled from 'styled-components';

const DragAndDropContentWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  border: 2px dashed var(--shade-300);
  border-radius: 12px;
  padding: 20px;
  margin: 0 20px;
`;

const DragAndDropImage = styled.img`
  margin-bottom: 13px;
`;

const DragAndDropText = styled.p`
  margin: 0;
  font-family: Heebo;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  color: var(--shade-100);
  max-width: 106px;
  flex-basis: 100%;
`;

const DragAndDropEmptyContent = () => {
  return (
    <DragAndDropContentWrapper>
      <div>
        <DragAndDropImage src={folderIcon} alt="Folder" />

        <DragAndDropText>Drop your files here or browse.</DragAndDropText>
      </div>
    </DragAndDropContentWrapper>
  );
};

export default DragAndDropEmptyContent;
