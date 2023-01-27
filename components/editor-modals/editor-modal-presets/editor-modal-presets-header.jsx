import EditorModalBackTo from 'components/editor-modals/editor-modal-templates/shared/editor-modal-back-to/editor-modal-back-to';
import EditorModalHeaderWrapper from 'components/editor-modals/editor-modal-templates/shared/editor-modal-header-wrapper/editor-modal-header-wrapper';
import EditorModalLabel from 'components/editor-modals/shared/editor-modal-label/editor-modal-label';
import EditorModalLabelsWrapper from 'components/editor-modals/shared/editor-modal-labels-wrapper/editor-modal-labels-wrapper';
import { memo, useCallback, useState } from 'react';
import styled from 'styled-components';
import { EDITOR_PRESETS_MODAL_BUTTONS } from '../constants/editor-modal-presets-tabs';

const StyledEditorModalLabelsWrapper = styled(EditorModalLabelsWrapper)`
  width: 50%;
`;

export const TemplateType = {
  Buttons : 'Buttons',
}

const tabNames = [EDITOR_PRESETS_MODAL_BUTTONS];

const WidgetEditorPresetsHeader = () => {
  const [activeTab, setActiveTab] = useState(tabNames[0]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const onTabClick = (tabName) => () => {
    setActiveTab(tabName);
  };

  const onBackToButtonClick = useCallback(() => setSelectedTemplate(null), []);

  return (
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
  );
};

export default memo(WidgetEditorPresetsHeader);
