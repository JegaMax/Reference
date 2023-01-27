import { BackButton } from 'components/export-modal/shared/elements';
import { ModalHeaderWrapper, ModalWrapper } from 'components/shared/modal';
import ProgressIndicator from 'components/shared/progress-indicator';
import Carousel from 'components/templates/carousel/carousel';
import { DEFAULT_EDITOR_FRAME_SIZE, DEFAULT_TOAST_CONFIG } from 'config/constants';
import { useAppDispatch, useAppSelector, useSpinner } from 'hooks';
import { memo, useCallback, useEffect, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { toast } from 'react-toastify';
import { loadStory } from 'appredux/features/amp-story/ampStorySlice';
import { useConvertArticleMutation } from 'appredux/services/articles/articles';
import { TemplateType, useGetTemplatesQuery } from 'appredux/services/templates/templates';
import styled from 'styled-components';
import Styled from '../templates/template-modal/template-modal-styles';

const ModalTitle = styled.div`
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 22px;
  letter-spacing: 0.01em;
  color: var(--white);
`;

const LoadingImage = styled.img``;

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  max-width: 348px;
  margin: auto;
`;

const LoadingText = styled.div`
  font-family: 'Heebo';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.01em;
  color: var(--white);
  white-space: pre;
  margin-bottom: 42px;
`;


const ConversionModal = ({ onClose, selectedArticle }) => {
  const { Spinner, spinnerProps } = useSpinner({
    color: '#f6522b',
    backgroundColor: 'rgba(20, 20, 31, 0.85)',
  });

  const dispatch = useAppDispatch();
  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const isExportModalOpen = useAppSelector((state) => state.export.isExportModalOpen);

  const { data, isLoading: areTemplatesLoading } = useGetTemplatesQuery({
    type: TemplateType.Team,
    workspaceId: selectedWorkspaceId ?? '',
  });

  const [convertArticle, { isUninitialized, isError }] = useConvertArticleMutation();

  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const onSelectTemplate = useCallback(
    (id) => {
      if (id === selectedTemplate) {
        setSelectedTemplate(null);
        return;
      }
      setSelectedTemplate(id);
    },
    [selectedTemplate],
  );

  const onConvertStory = useCallback(async () => {
    if (selectedTemplate) {
      const { _id: storyId } = await convertArticle({
        templateId: selectedTemplate,
        articleId: selectedArticle,
        editorDefaultDimensions: {
          width: DEFAULT_EDITOR_FRAME_SIZE.WIDTH,
          height: DEFAULT_EDITOR_FRAME_SIZE.HEIGHT,
        },
      }).unwrap();
      dispatch(loadStory({ storyId }, true, true, true));
    }
  }, [convertArticle, dispatch, selectedArticle, selectedTemplate]);

  useEffect(() => {
    if (isExportModalOpen) {
      onClose();
    }
  }, [isExportModalOpen, onClose]);

  useEffect(() => {
    if (isError) {
      toast.info('Something went wrong', DEFAULT_TOAST_CONFIG);
      onClose();
    }
  }, [isError, onClose]);

  if (areTemplatesLoading) {
    return <Spinner {...spinnerProps} isVisible />;
  }

  if (!data?.templates?.length) {
    return (
      <Styled.StyledModalExportOuterWrapper>
        <OutsideClickHandler display="flex" onOutsideClick={onClose}>
          <ModalWrapper>
            <ModalHeaderWrapper>
              <BackButton onClick={onClose} />
              <ModalTitle>Pick your template</ModalTitle>
              <Styled.PublishButton
                isDisabled={!selectedTemplate}
                onClick={onConvertStory}
                text={'Convert into Story'}
              />
            </ModalHeaderWrapper>
            <Styled.StyledModalBodyWrapper>
              <LoadingWrapper>
                <LoadingImage src={'/assets/images/empty-templates.svg'} />
                <LoadingText>
                  {`To start converting web article into Stories,\ncreate some Team templates in Zazu Story\neditor.`}
                </LoadingText>
              </LoadingWrapper>
            </Styled.StyledModalBodyWrapper>
          </ModalWrapper>
        </OutsideClickHandler>
      </Styled.StyledModalExportOuterWrapper>
    );
  }

  if (!isUninitialized) {
    return (
      <Styled.StyledModalExportOuterWrapper>
        <ModalWrapper>
          <Styled.StyledModalBodyWrapper>
            <LoadingWrapper>
              <LoadingImage src={'/assets/images/conversion.svg'} />
              <LoadingText>
                {`Your article is being converted into a Story.\nThis should only take a few seconds.`}
              </LoadingText>
              <ProgressIndicator />
            </LoadingWrapper>
          </Styled.StyledModalBodyWrapper>
        </ModalWrapper>
      </Styled.StyledModalExportOuterWrapper>
    );
  }

  return (
    <Styled.StyledModalExportOuterWrapper>
      <OutsideClickHandler display="flex" onOutsideClick={onClose}>
        <ModalWrapper>
          <ModalHeaderWrapper>
            <BackButton onClick={onClose} />
            <ModalTitle>Pick your template</ModalTitle>
            <Styled.PublishButton isDisabled={!selectedTemplate} onClick={onConvertStory} text={'Convert into Story'} />
          </ModalHeaderWrapper>

          <Styled.StyledModalBodyWrapper>
            <Styled.SlidesWrapper>
              {data?.templates?.map((template) => (
                <Carousel
                  template={template}
                  key={template._id}
                  onSelect={onSelectTemplate}
                  isSelected={template._id === selectedTemplate}
                />
              ))}
            </Styled.SlidesWrapper>
          </Styled.StyledModalBodyWrapper>
        </ModalWrapper>
      </OutsideClickHandler>
    </Styled.StyledModalExportOuterWrapper>
  );
};

export default memo(ConversionModal);
