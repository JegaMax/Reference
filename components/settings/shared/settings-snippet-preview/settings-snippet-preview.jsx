import styled from 'styled-components';
import SettingsInfoTitle from '../settings-info-title';
import SettingsInputWithLabel from '../settings-input-with-label';
import SettingsRow from '../settings-row';
import SettingsTextareaWithLabel from '../settings-textarea-with-label';

const SnippetInfoTitle = styled(SettingsInfoTitle)`
  margin-bottom: 15px;
`;

const PreviewWrapper = styled.div`
  width: 100% !important;
`;

const PreviewRow = styled.div`
  width: 100%;
  &:not(:last-of-type) {
    margin-bottom: 17px;
  }
`;


const SettingsSnippetPreview = ({ snippet, handleClick }) => {
  return (
    <>
      <SettingsRow>
        <SnippetInfoTitle title={snippet.name} onClick={handleClick} />
      </SettingsRow>

      <SettingsRow>
        <PreviewWrapper>
          <PreviewRow>
            <SettingsInputWithLabel label={'<head> code'} value={snippet.headCode} isReadOnly={true} />
          </PreviewRow>

          <PreviewRow>
            <SettingsTextareaWithLabel label={'<body> code'} value={snippet.bodyCode} isReadOnly={true} />
          </PreviewRow>
        </PreviewWrapper>
      </SettingsRow>
    </>
  );
};

export default SettingsSnippetPreview;
