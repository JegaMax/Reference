import { memo } from 'react';

const WarningIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0.5C3.875 0.5 0.5 3.875 0.5 8C0.5 12.125 3.875 15.5 8 15.5C12.125 15.5 15.5 12.125 15.5 8C15.5 3.875 12.125 0.5 8 0.5ZM8 11.75C7.55 11.75 7.25 11.45 7.25 11C7.25 10.55 7.55 10.25 8 10.25C8.45 10.25 8.75 10.55 8.75 11C8.75 11.45 8.45 11.75 8 11.75ZM8.75 8C8.75 8.45 8.45 8.75 8 8.75C7.55 8.75 7.25 8.45 7.25 8V5C7.25 4.55 7.55 4.25 8 4.25C8.45 4.25 8.75 4.55 8.75 5V8Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(WarningIcon);
