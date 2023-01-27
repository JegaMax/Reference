import { memo, useCallback, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { Transition } from 'react-transition-group';
import { TemplateType } from 'appredux/services/templates/templates';
import styled from 'styled-components';
import { useAppDispatch } from '../../../hooks';
import { layerTypes } from '../../../interfaces/layer-types';
import { onOutsideClickModal } from '../../../appredux/features/editor-modal/editorModalSlice';
import { TemplateSelector, TemplateSlidesSelector } from '../../templates';
import {
  EDITOR_MODAL_TEMPLATES_LIBRARY,
  EDITOR_MODAL_TEMPLATES_PERSONAL,
  EDITOR_MODAL_TEMPLATES_TEAM
} from '../constants/editor-modal-templates-tabs';
import EditorModalLabel from '../shared/editor-modal-label/editor-modal-label';
import EditorModalLabelsWrapper from '../shared/editor-modal-labels-wrapper/editor-modal-labels-wrapper';
import EditorModalWrapper from '../shared/editor-modal-wrapper/editor-modal-wrapper';
import EditorModalBackTo from './shared/editor-modal-back-to/editor-modal-back-to';
import EditorModalHeaderWrapper from './shared/editor-modal-header-wrapper/editor-modal-header-wrapper';

const StyledEditorModalLabelsWrapper = styled(EditorModalLabelsWrapper)`
  width: 50%;
`;

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const duration = 225;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
  display: 'flex',
  overflow: 'auto',
  height: '100%',
};

const mapTabsToTemplateType = {
  [EDITOR_MODAL_TEMPLATES_LIBRARY]: TemplateType.Global,
  [EDITOR_MODAL_TEMPLATES_PERSONAL]: TemplateType.Personal,
  [EDITOR_MODAL_TEMPLATES_TEAM]: TemplateType.Team,
};

const tabNames = [EDITOR_MODAL_TEMPLATES_LIBRARY, EDITOR_MODAL_TEMPLATES_PERSONAL, EDITOR_MODAL_TEMPLATES_TEAM];

const EditorModalTemplates = () => {
  const dispatch = useAppDispatch();

  const [templateType, setTemplateType] = useState(TemplateType.Global);
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const onTabClick = (tabName) => () => {
    setActiveTab(tabName);
    setTemplateType(mapTabsToTemplateType[tabName]);
  };

  const onOutsideClick = useCallback(
    (event) => dispatch(onOutsideClickModal(event, layerTypes.TEMPLATES)),
    [dispatch],
  );

  const onBackToButtonClick = useCallback(() => setSelectedTemplate(null), []);

  return (
    <OutsideClickHandler disabled={isDeleteModalOpen} onOutsideClick={onOutsideClick}>
      <EditorModalWrapper>
        <EditorModalHeaderWrapper isActive={!!selectedTemplate}>
          <StyledEditorModalLabelsWrapper>
            {tabNames.map((tabName) => {
              return (
                <EditorModalLabel
                  key={tabName}
                  text={tabName}
                  isActive={tabName === activeTab}
                  onClick={onTabClick(tabName)}
                />
              );
            })}
          </StyledEditorModalLabelsWrapper>

          <EditorModalBackTo text={activeTab} onClick={onBackToButtonClick} />
        </EditorModalHeaderWrapper>

        {!selectedTemplate && (
          <TemplateSelector
            templateType={templateType}
            isDeleteModalOpen={isDeleteModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            setSelectedTemplate={setSelectedTemplate}
          />
        )}

        {selectedTemplate !== null && (
          <Transition in={selectedTemplate !== null} timeout={duration}>
            {(state) => (
              <div style={{ ...defaultStyle, ...transitionStyles[state] }}>
                {selectedTemplate && (
                  <TemplateSlidesSelector
                    selectedTemplate={selectedTemplate}
                    setSelectedTemplate={setSelectedTemplate}
                  />
                )}
              </div>
            )}
          </Transition>
        )}
      </EditorModalWrapper>
    </OutsideClickHandler>
  );
};

export default memo(EditorModalTemplates);
