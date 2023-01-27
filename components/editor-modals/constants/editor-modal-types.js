import EditorModalMediaUnsplash from '../editor-modal-media-unsplash/editor-modal-media-unsplash';
import EditorModalMediaUpload from '../editor-modal-media-upload/editor-modal-media-upload';
import EditorModalPresets from '../editor-modal-presets/editor-modal-presets';
import EditorModalShape from '../editor-modal-shape/editor-modal-shape';
import EditorModalTemplates from '../editor-modal-templates/editor-modal-templates';
import EditorModalText from '../editor-modal-text/editor-modal-text';
import {
  EDITOR_MODAL_HTML, EDITOR_MODAL_MEDIA_UNSPLASH,
  EDITOR_MODAL_MEDIA_UPLOAD, EDITOR_MODAL_OUTLINK, EDITOR_MODAL_SHAPE, EDITOR_MODAL_TEMPLATES
} from './editor-modal-type-names';

const MODAL_COMPONENTS = {
  [EDITOR_MODAL_SHAPE]: EditorModalShape,
  [EDITOR_MODAL_MEDIA_UNSPLASH]: EditorModalMediaUnsplash,
  [EDITOR_MODAL_MEDIA_UPLOAD]: EditorModalMediaUpload,
  [EDITOR_MODAL_TEMPLATES]: EditorModalTemplates,
  [EDITOR_MODAL_OUTLINK]: EditorModalPresets,
  [EDITOR_MODAL_HTML]: EditorModalText,
};

export default MODAL_COMPONENTS;
