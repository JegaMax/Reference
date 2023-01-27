import { memo } from 'react';
import Folder from './folder';

const TreeRecursive = ({ folders, folderId, selectedFolderId, setSelectedFolderId }) => {
  return (
    <>
      {folders.map((folder) => (
        <Folder
          key={folder._id}
          item={folder}
          setSelectedFolderId={setSelectedFolderId}
          selectedFolderId={selectedFolderId}
          folderId={folderId}
        />
      ))}
    </>
  );
};

export default memo(TreeRecursive);
