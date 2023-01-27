import { memo } from 'react';

const StoryEmbeddedIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="22"
      height="17"
      viewBox="0 0 22 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 8.25L16.8144 13.4356L15.5183 12.1394L19.4077 8.25L15.5183 4.36058L16.8144 3.06442L22 8.25ZM2.59233 8.25L6.48175 12.1394L5.18558 13.4356L0 8.25L5.18558 3.06442L6.48083 4.36058L2.59233 8.25ZM8.97233 16.5H7.02167L13.0277 0H14.9783L8.97233 16.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(StoryEmbeddedIcon);
