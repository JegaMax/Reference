import Carousel from 'components/templates/carousel/carousel';
import LoaderWrapper from '../../media/shared/loader-wrapper';
import MessageModal from '../../message-modal';
import NoResults from '../../media/shared/no-results';
import SelectorContentWrapper from '../../media/shared/selector-content-wrapper';
import TitleOverlay from 'components/shared/title-overlay';
import { applyTemplate } from 'appredux/features/templates/templatesSlice';
import { ListItemsStyled } from '../../shared/list-item';
import { memo, useCallback, useState } from 'react';
import { MoveableTooltip } from '../../tooltip';
import TemplatesWrapper from '../shared/templates-wrapper';
import { useAppDispatch, useAppSelector, useMoveableTooltip, useSpinner } from '../../../hooks';
import { USER_ROLES } from '../../../config/constants';

import {
  TemplateType,
  useDeleteGlobalTemplateMutation,
  useDeleteTemplateMutation,
  useGetTemplateMutation,
  useGetTemplatesQuery,
} from 'appredux/services/templates/templates';
import { normalizeLayers } from 'utils/editorUtils';

const deleteMessage = `Are you sure you want to delete the selected template?`;

const TemplateSelector = ({
  templateType,
  isDeleteModalOpen,
  setDeleteModalOpen,
  setSelectedTemplate,
}) => {
  const { tooltip, onMouseEnter, onMouseLeave } = useMoveableTooltip();
  const { Spinner, spinnerProps } = useSpinner({
    disableOverlay: true,
    spinnerType: 'SyncLoader',
    size: 10,
  });

  const dispatch = useAppDispatch();
  const userRoleName = useAppSelector((state) => state.auth?.user?.role?.name);
  const selectedWorkspaceId = useAppSelector((state) => state.auth?.user?.selectedWorkspaceId);

  const [templateIdToBeDeleted, setTemplateIdToBeDeleted] = useState(undefined);

  const { data, isLoading, isSuccess, isFetching } = useGetTemplatesQuery({
    type: templateType,
    workspaceId: selectedWorkspaceId ?? '',
  });

  const [selectTemplate] = useGetTemplateMutation();
  const [deleteTemplate] = useDeleteTemplateMutation();
  const [deleteGlobalTemplate] = useDeleteGlobalTemplateMutation();

  const onSelectTemplate = useCallback(
    async (id) => {
      const templateDetails = await selectTemplate(id).unwrap();
      const normalizedSlides = templateDetails?.cuts.map((slide) => normalizeLayers(slide, undefined, true));
      const template = { ...templateDetails, cuts: normalizedSlides };

      if (template?.cuts?.length > 1) {
        setSelectedTemplate(template);
        return;
      }

      dispatch(applyTemplate(template));
    },
    [dispatch, selectTemplate, setSelectedTemplate],
  );

  const toggleDeleteTemplateModal = useCallback(
    (id) => () => {
      setTemplateIdToBeDeleted(id);
      setDeleteModalOpen(!isDeleteModalOpen);
    },
    [isDeleteModalOpen, setDeleteModalOpen],
  );

  const onDeleteTemplate = useCallback(async () => {
    if (templateIdToBeDeleted) {
      if (templateType === TemplateType.Global) {
        deleteGlobalTemplate(templateIdToBeDeleted);
      } else {
        deleteTemplate(templateIdToBeDeleted);
      }
    }

    setTemplateIdToBeDeleted(undefined);
    setDeleteModalOpen(false);
  }, [deleteGlobalTemplate, deleteTemplate, setDeleteModalOpen, templateIdToBeDeleted, templateType]);

  const hasDeleteButton =
    (userRoleName === USER_ROLES.ADMIN && templateType === TemplateType.Global) || templateType !== TemplateType.Global;

  return (
    <>
      <SelectorContentWrapper id="user-templates-container">
        {isSuccess && !isFetching && !data?.totalCount && <NoResults text={'No templates found.'} />}
        {(isLoading || isFetching) && (
          <LoaderWrapper>
            <Spinner {...spinnerProps} isVisible={true} />
          </LoaderWrapper>
        )}
        {isSuccess && !isLoading && !isFetching && !!data?.totalCount && (
          <TemplatesWrapper>
            {data?.templates?.map((template, index) => (
              <ListItemsStyled.StyledListItemWrapper
                key={`${template._id} - ${index}`}
                position="relative"
                onMouseEnter={onMouseEnter(template?.title)}
                onMouseLeave={onMouseLeave(template?.title)}
              >
                {hasDeleteButton && <ListItemsStyled.DeleteButton onClick={toggleDeleteTemplateModal(template._id)} />}
                <Carousel
                  template={template}
                  key={template._id}
                  onSelect={onSelectTemplate}
                  isSelected={false}
                  skipTitle
                />
                {templateType !== TemplateType.Global && <TitleOverlay title={template?.title} />}
              </ListItemsStyled.StyledListItemWrapper>
            ))}
          </TemplatesWrapper>
        )}
        {templateType !== TemplateType.Global && (
          <MoveableTooltip showTooltip={tooltip.show} text={tooltip.text} inverted />
        )}
      </SelectorContentWrapper>
      <MessageModal
        isOpen={isDeleteModalOpen}
        message={deleteMessage}
        shouldCloseOnOverlayClick={true}
        onCancel={toggleDeleteTemplateModal()}
        onAccept={onDeleteTemplate}
      />
    </>
  );
};

export default memo(TemplateSelector);
