import { memo } from 'react';

const FullscreenSM = ({ className }) => (
  <svg className={className} width="24" height="24" viewBox="0 -0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12.5 16.75C12.5 16.3 12.2 16 11.75 16L9.05 16L16 9.05L16 11.75C16 12.2 16.3 12.5 16.75 12.5C17.2 12.5 17.5 12.2 17.5 11.75L17.5 7.25C17.5 6.8 17.2 6.5 16.75 6.5L12.25 6.5C11.8 6.5 11.5 6.8 11.5 7.25C11.5 7.7 11.8 8 12.25 8L14.95 8L8 14.95L8 12.25C8 11.8 7.7 11.5 7.25 11.5C6.8 11.5 6.5 11.8 6.5 12.25L6.5 16.75C6.5 17.2 6.8 17.5 7.25 17.5L11.75 17.5C12.2 17.5 12.5 17.2 12.5 16.75Z"
      fill="currentColor"
    />
  </svg>
);

export default memo(FullscreenSM);
