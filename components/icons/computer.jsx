import React, { memo } from 'react';

const Computer = () => {
  return (
    <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17 0H3C1.3 0 0 1.3 0 3V11C0 12.7 1.3 14 3 14H9V16H5C4.4 16 4 16.4 4 17C4 17.6 4.4 18 5 18H15C15.6 18 16 17.6 16 17C16 16.4 15.6 16 15 16H11V14H17C18.7 14 20 12.7 20 11V3C20 1.3 18.7 0 17 0Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(Computer);
