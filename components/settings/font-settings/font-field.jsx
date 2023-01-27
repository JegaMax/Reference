import MessageModal from '../../message-modal';
import styled from 'styled-components';
import { Delete } from '../../icons';
import { RoleName } from 'appredux/services/workspaces/interface';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useAppSelector } from '../../../hooks';
import { useGetWorkspaceQuery } from 'appredux/services/workspaces/workspaces';
import { useRemoveWorkspaceFontMutation } from 'appredux/services/fonts/fonts';
import { useState } from 'react';

const FieldWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 0 15px;
`;

const Field = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap;
  overflow: hidden;
  background: var(--shade-700);
  border-radius: 6px;
  padding: 2px 10px;
  color: var(--white);
  font-family: ${({ $fontFamily }) => ($fontFamily ? `"${$fontFamily}"` : 'Heebo')};
  font-weight: ${({ $fontWeight }) => $fontWeight};
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.01em;
  flex: 1;
  height: 33px;
  margin-right: 10px;
`;

const FontName = styled.div`
  max-width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border-radius: 6px;
  transition: 0.12s ease;
  border: none;
  outline: none;
  background: transparent;
  height: 24px;
  width: 24px;
  ${({ isDisabled }) =>
    !isDisabled &&
    `
   &:hover {
    background: var(--shade-500-85);
  }
  `}
  &:focus {
    outline: none;
  }
`;

const DeleteIcon = styled(Delete)`
  width: 14px;
`;

const FontField = ({ font }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [removeWorkspaceFont] = useRemoveWorkspaceFontMutation();

  const selectedWorkspaceId = useAppSelector((state) => state.auth.user?.selectedWorkspaceId);
  const userId = useAppSelector((state) => state.auth.user?._id);

  const { isWorkspaceAdmin } = useGetWorkspaceQuery(selectedWorkspaceId ?? skipToken, {
    selectFromResult: ({ data: workspace }) => ({
      isWorkspaceAdmin: workspace?.users?.find((u) => u._id === userId)?.role.name !== RoleName.user,
    }),
  });

  const toggleShowModal = () => {
    if (isWorkspaceAdmin) {
      setShowDeleteModal(!showDeleteModal);
    }
  };

  const onDeleteFont = (id) => () => {
    removeWorkspaceFont(id);
    setShowDeleteModal(false);
  };

  return (
    <FieldWrapper>
      <Field $fontFamily={font.family} $fontWeight={font.weight}>
        <FontName>{font.family}</FontName>
      </Field>
      <Button isDisabled={!isWorkspaceAdmin} onClick={toggleShowModal}>
        <DeleteIcon />
      </Button>

      <MessageModal
        isOpen={showDeleteModal}
        message={'Are you sure you want to delete\nthe custom font?'}
        description={
          'This will permanently delete this custom font. All previously created Stories containing this font will replace it with a default font.'
        }
        acceptButtonText={`Delete ${font.family}`}
        onAccept={onDeleteFont(font._id)}
        onCancel={toggleShowModal}
      />
    </FieldWrapper>
  );
};

export default FontField;
