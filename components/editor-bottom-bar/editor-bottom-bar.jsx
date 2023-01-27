import { memo } from 'react';

// Components
import { ButtonsGroup, EditorBottomBarWrapper } from './shared/index';
import EditorSlideList from '../editor-slide-list/editor-slide-list';
import EditorLayers from './editor-layers/editor-layers';
import EditorSlideDelete from './editor-slide-delete/editor-slide-delete';
import EditorSlideDuplicate from './editor-slide-duplicate/editor-slide-duplicate';
import EditorZoom from './editor-zoom/editor-zoom';
import EditorSlideDuration from './editor-slide-duration/editor-slide-duration';
import EditorUndoRedo from './editor-undo-redo/editor-undo-redo';

const EditorBottomBar = ({ handleLayerClick }) => {
  return (
    <EditorBottomBarWrapper>
      <ButtonsGroup>
        <EditorLayers handleLayerClick={handleLayerClick} />

        <EditorUndoRedo />

        <EditorZoom />
      </ButtonsGroup>

      <ButtonsGroup>
        <EditorSlideList />
      </ButtonsGroup>

      <ButtonsGroup>
        <EditorSlideDuration />

        <EditorSlideDuplicate />

        <EditorSlideDelete />
      </ButtonsGroup>
    </EditorBottomBarWrapper>
  );
};

export default memo(EditorBottomBar);
