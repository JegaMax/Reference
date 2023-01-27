import { skipToken } from '@reduxjs/toolkit/dist/query';
import { ScaleWrapper } from 'components/editor-slide-list/editor-slide-list-element/editor-slide-list-element';
import Layer from 'components/story-editor/layer';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { batch } from 'react-redux';
import { updateStoryConfig } from 'appredux/features/amp-story/ampStorySlice';
import { toggleTemplateSavedNotificationVisibility } from 'appredux/features/editor/helpers/helpersSlice';
import { replaceTemporaryMediaInStory } from 'appredux/features/media/mediaSlice';
import { selectTemplateType, toggleSaveTemplateModal } from 'appredux/features/templates/templatesSlice';
import { TemplateType, useSaveTemplateMutation } from 'appredux/services/templates/templates';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import { falseFunction } from 'utils/commonUtils';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getNewBackground } from '../../../utils/colorUtils';
import { SecondaryButton } from '../../buttons';
import { BackButton } from '../../export-modal/shared/elements';
import InlineEditor from '../../inline-editor';
import { ModalHeaderWrapper, ModalWrapper } from '../../shared/modal';
import Styled from './template-modal-styles';

const miniEditorHeight = 248;

const getSaveButtonText = (type) => {
  if (type === TemplateType.Team) {
    return 'Save as team template';
  }

  if (type === TemplateType.Global) {
    return 'Save as global template';
  }

  return 'Save as template';
};

const getSelectButtonText = ({
  selectedSlides,
  ampStorySlides,
}) => {
  if (selectedSlides?.length === ampStorySlides?.length) {
    return 'Deselect all artboards';
  }

  if (
    selectedSlides &&
    ampStorySlides &&
    selectedSlides?.length > 0 &&
    selectedSlides?.length !== ampStorySlides?.length
  ) {
    return `Deselect ${selectedSlides.length} artboards`;
  }

  return `Select all artboards`;
};

const TemplateModal = () => {
  const dispatch = useAppDispatch();

  const emptyRef = useRef();
  const storyId = useAppSelector((state) => state.ampStory.present?._id);
  const storyTitle = useAppSelector((state) => state.ampStory.present?.title);
  const ampStorySlides = useAppSelector((state) => state.ampStory.present?.cuts);
  const ampStoryInitialWidth = useAppSelector((state) => state.ampStory.present?.initialWidth);
  const ampStoryInitialHeight = useAppSelector((state) => state.ampStory.present?.initialHeight);

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);

  const { team } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      team: workspace?.teams?.[0],
    }),
  });

  const templateType = useAppSelector((state) => state.templates.templateType);

  const [templateName, setTemplateName] = useState(storyTitle);
  const [selectedSlides, setSelectedSlides] = useState([...Array(ampStorySlides?.length).keys()]);
  const [activeEditor, setActiveEditor] = useState(false);
  const [savingStarted, setSavingStarted] = useState(false);

  const dimensionsRatio = useMemo(() => (Number(ampStoryInitialWidth) / Number(ampStoryInitialHeight)).toFixed(2), [
    ampStoryInitialWidth,
    ampStoryInitialHeight,
  ]);
  const miniEditorWidth = useMemo(() => miniEditorHeight * Number(dimensionsRatio), [dimensionsRatio]);
  const saveButtonText = useMemo(() => getSaveButtonText(templateType), [templateType]);
  const selectButtonText = useMemo(
    () =>
      getSelectButtonText({
        selectedSlides,
        ampStorySlides,
      }),
    [selectedSlides, ampStorySlides],
  );

  const [saveTemplate] = useSaveTemplateMutation();

  const onSelectButtonClick = useCallback(() => {
    if (ampStorySlides) {
      if (selectedSlides?.length) {
        setSelectedSlides([]);
        return;
      }
      setSelectedSlides([...Array(ampStorySlides?.length).keys()]);
    }
  }, [ampStorySlides, selectedSlides?.length]);

  const onCloseModal = useCallback(() => {
    batch(() => {
      dispatch(toggleSaveTemplateModal(false));
      dispatch(selectTemplateType(null));
    });
  }, [dispatch]);

  const onSelectSlides = useCallback(
    (position) => () => {
      const index = selectedSlides.indexOf(position);

      if (index > -1) {
        const selectedSlidesCopy = [...selectedSlides];
        selectedSlidesCopy.splice(index, 1);
        setSelectedSlides(selectedSlidesCopy);
        return;
      }

      setSelectedSlides([...selectedSlides, position]);
    },
    [selectedSlides],
  );

  const onSave = useCallback(async () => {
    if (!templateType || !selectedSlides) {
      return;
    }

    setSavingStarted(true);

    dispatch(replaceTemporaryMediaInStory());
    await dispatch(updateStoryConfig());

    try {
      const teamId = templateType === TemplateType.Team ? team?._id : null;

      await saveTemplate({
        type: templateType,
        storyId,
        selectedSlides,
        title: templateName.toString(),
        teamId,
      }).unwrap();
    } catch (e) {
      console.error(e);
    } finally {
      setSavingStarted(false);
    }

    dispatch(toggleTemplateSavedNotificationVisibility(true));
    onCloseModal();
  }, [dispatch, onCloseModal, saveTemplate, storyId, selectedSlides, team?._id, templateName, templateType]);

  const onBlurCallback = useCallback(() => {
    if (templateName === '') {
      setTemplateName('Untitled');
    }
  }, [templateName]);

  const onTemplateTitleChange = useCallback((value) => setTemplateName(value), []);

  return (
    <Styled.StyledModalExportOuterWrapper>
      <OutsideClickHandler display="flex" onOutsideClick={onCloseModal}>
        <ModalWrapper>
          <ModalHeaderWrapper>
            <BackButton onClick={onCloseModal} />

            <Styled.TemplateName isActive={activeEditor}>
              <InlineEditor
                open={activeEditor}
                setOpen={setActiveEditor}
                onChange={onTemplateTitleChange}
                onBlurCallback={onBlurCallback}
                placeholder={templateName.toString()}
                value={templateName}
              />
            </Styled.TemplateName>

            <Styled.PublishButton
              isDisabled={selectedSlides.length === 0 || savingStarted}
              onClick={onSave}
              text={saveButtonText}
            />
          </ModalHeaderWrapper>

          <Styled.StyledModalBodyWrapper>
            <Styled.SlidesWrapper>
              {ampStorySlides?.map((slide) => {
                const isActiveSlide = selectedSlides?.includes(slide.position);
                return (
                  <Styled.ContainerBackgroundWrapper key={`slide-select-${slide.position}`}>
                    <Styled.ContainerBackground
                      activeSlide={isActiveSlide}
                      onClick={onSelectSlides(slide.position)}
                      cursor="pointer"
                    >
                      <Styled.Container
                        containerHeight={miniEditorHeight}
                        containerWidth={miniEditorWidth}
                        style={{
                          background: getNewBackground(slide.backgroundColor),
                        }}
                      >
                        <ScaleWrapper
                          width={ampStoryInitialWidth}
                          height={ampStoryInitialHeight}
                          containerWidth={miniEditorWidth}
                          containerHeight={miniEditorHeight}
                        >
                          {slide?.layers
                            ?.filter((layer) => !layer.settings.layerSettings.isLayerHidden)
                            ?.map((layer) => {
                              return (
                                <Layer
                                  key={`${slide.position}-${layer._id}-${layer.position}`}
                                  layer={layer}
                                  activeLayer={false}
                                  keepRatio={false}
                                  editorWidth={ampStoryInitialWidth}
                                  editorHeight={ampStoryInitialHeight}
                                  slidePosition={slide.position}
                                  areAnimationsRunning={false}
                                  isActive={false}
                                  handleLayerClick={falseFunction}
                                  handleLayerChange={falseFunction}
                                  handleBatchLayerChange={falseFunction}
                                  ctaLayerRef={emptyRef}
                                  isTextReadOnly
                                />
                              );
                            })}
                        </ScaleWrapper>

                        {isActiveSlide && (
                          <>
                            <Styled.ActiveSlideMask />
                            <Styled.StyledChecked zIndex={1000} />
                          </>
                        )}
                      </Styled.Container>
                    </Styled.ContainerBackground>
                    <Styled.SlideNumbers>{slide.position + 1}</Styled.SlideNumbers>
                  </Styled.ContainerBackgroundWrapper>
                );
              })}
            </Styled.SlidesWrapper>

            <Styled.SelectButtonWrapper>
              <SecondaryButton text={selectButtonText} onClick={onSelectButtonClick} />
            </Styled.SelectButtonWrapper>
          </Styled.StyledModalBodyWrapper>
        </ModalWrapper>
      </OutsideClickHandler>
    </Styled.StyledModalExportOuterWrapper>
  );
};

export default memo(TemplateModal);
