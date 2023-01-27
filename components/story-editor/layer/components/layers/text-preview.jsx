import { textExportingOptions } from 'config/constants';
import { stateToHTML } from 'draft-js-export-html';
import { memo, useMemo } from 'react';
import styled from 'styled-components';
import { rawContentToEditorState } from 'utils/textEditorUtils';
import { EditorContainer } from './text-layer';

const TextWrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  p,
  span {
    word-break: break-word;
  }
  p {
    margin: 0;
  }
`;

const TextPreview = ({ editorWidth, editorHeight, shadow, layer }) => {
  const viewWidth = useMemo(() => Number(editorWidth) / 100, [editorWidth]);
  const viewHeight = useMemo(() => Number(editorHeight) / 100, [editorHeight]);

  const state = useMemo(() => {
    const editorState = layer?.settings?.editorState || rawContentToEditorState(layer?.content?.value);

    return stateToHTML(editorState.getCurrentContent(), textExportingOptions);
  }, [layer.content.value, layer.settings.editorState]);

  return (
    <EditorContainer
      viewWidth={viewWidth}
      viewHeight={viewHeight}
      style={{
        textShadow: Number(shadow) !== 0 ? `1px 1px ${shadow / 10}px rgba(0,0,0,0.75)` : 'none',
      }}
    >
      <TextWrapper dangerouslySetInnerHTML={{ __html: state }} />
    </EditorContainer>
  );
};

export default memo(TextPreview);
