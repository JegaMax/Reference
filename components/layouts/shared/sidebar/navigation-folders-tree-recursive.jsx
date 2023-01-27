import { memo } from 'react';
import styled from 'styled-components';
import Folder from './navigation-folder';

const Container = styled.div`
  padding-left: 40px;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const NavigationFoldersTreeRecursive = ({ folders, teamId }) => {
  return (
    <Container>
      {folders.map((folder) => (
        <Folder key={folder._id} folder={folder} teamId={teamId} />
      ))}
    </Container>
  );
};

export default memo(NavigationFoldersTreeRecursive);
