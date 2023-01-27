import CreateFolderModal from '../../../../components/create-folder-modal';
import styled from 'styled-components';
import { Folder } from './../../../icons';
import QuaternaryButton from '../../../buttons/quaternary-button';
import { useCallback, useState } from 'react';

const Wrapper = styled.div`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  flex: 1 1 0%;
  padding: ${({ customPadding }) => customPadding ?? '90px 10% 36px'};
  width: 100%;
`;

const EmptyListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Image = styled(Folder)`
  margin: 0 0 24px;
`;

const Text = styled.p`
  font-family: Heebo;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: var(--white);
  max-width: 340px;
  text-align: center;
  margin: 0 auto 16px;
`;

const EmptyFolderList = ({ customPadding, nestedFolder, parentFolder }) => {
  const [isCreateNewFolderModalOpen, setCreateNewFolderModal] = useState(false);
  const onCreateNewFolder = () => setCreateNewFolderModal(true);
  const onClose = useCallback(() => setCreateNewFolderModal(false), []);

  return (
    <Wrapper customPadding={customPadding}>
      <EmptyListWrapper>
        <Image />
        {nestedFolder ? (
          <Text>
            This folder is empty.
            <br />
            Move your Stories here and stay organized!
          </Text>
        ) : (
          <Text>
            Stay organized.
            <br />
            Create your first folder.
          </Text>
        )}

        {!nestedFolder && (
          <>
            <QuaternaryButton isDisabled={false} text={'New folder'} onClick={onCreateNewFolder} />
            <CreateFolderModal
              parentFolder={parentFolder}
              isCreateFolderModalOpen={isCreateNewFolderModalOpen}
              onClose={onClose}
            />
          </>
        )}
      </EmptyListWrapper>
    </Wrapper>
  );
};

export default EmptyFolderList;
