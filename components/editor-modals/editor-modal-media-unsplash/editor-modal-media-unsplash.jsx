import React, { useState } from 'react';
import EditorModalWrapper from '../shared/editor-modal-wrapper/editor-modal-wrapper';
import EditorModalLabel from '../shared/editor-modal-label/editor-modal-label';
import { useDispatch } from 'react-redux';
import { onOutsideClickModal } from '../../../appredux/features/editor-modal/editorModalSlice';
import EditorModalLabelsWrapper from '../shared/editor-modal-labels-wrapper/editor-modal-labels-wrapper';
import OutsideClickHandler from 'react-outside-click-handler';
import ImageSelector from '../../media/images/image-selector';
import { layerTypes } from '../../../interfaces/layer-types';
import {
  EDITOR_MODAL_UNSPLASH_TAB_GIFS,
  EDITOR_MODAL_UNSPLASH_TAB_IMAGES,
  EDITOR_MODAL_UNSPLASH_TAB_STICKERS,
} from '../constants/editor-modal-media-unsplash-tabs';
import GifsSelector from '../../media/gifs/gifs-selector';
import StickersSelector from '../../media/gifs/stickers-selector/stickers-selectors';
import { useDebounceSearch } from '../../../hooks';

const EditorModalMediaUnsplash = () => {
  const dispatch = useDispatch();
  const tabNames = [
    EDITOR_MODAL_UNSPLASH_TAB_IMAGES,
    EDITOR_MODAL_UNSPLASH_TAB_GIFS,
    EDITOR_MODAL_UNSPLASH_TAB_STICKERS,
  ];
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const [searchValue, debouncedSearchValue, onSearchChange] = useDebounceSearch();

  return (
    <OutsideClickHandler onOutsideClick={(event) => dispatch(onOutsideClickModal(event, layerTypes.IMAGE))}>
      <EditorModalWrapper>
        <EditorModalLabelsWrapper>
          {tabNames.map((tabName) => (
            <EditorModalLabel
              key={tabName}
              text={tabName}
              isActive={tabName === activeTab}
              onClick={() => setActiveTab(tabName)}
            />
          ))}
        </EditorModalLabelsWrapper>

        {activeTab === EDITOR_MODAL_UNSPLASH_TAB_IMAGES && (
          <ImageSelector
            searchValue={searchValue}
            debouncedSearchValue={debouncedSearchValue}
            onSearchChange={onSearchChange}
          />
        )}
        {activeTab === EDITOR_MODAL_UNSPLASH_TAB_GIFS && (
          <GifsSelector
            searchValue={searchValue}
            debouncedSearchValue={debouncedSearchValue}
            onSearchChange={onSearchChange}
          />
        )}
        {activeTab === EDITOR_MODAL_UNSPLASH_TAB_STICKERS && (
          <StickersSelector
            searchValue={searchValue}
            debouncedSearchValue={debouncedSearchValue}
            onSearchChange={onSearchChange}
          />
        )}
      </EditorModalWrapper>
    </OutsideClickHandler>
  );
};

export default EditorModalMediaUnsplash;
