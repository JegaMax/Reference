import { memo } from 'react';

const ExclamationMark = ({ className }) => {
  return (
    <svg
      className={className}
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.5 0.5C3.375 0.5 0 3.875 0 8C0 12.125 3.375 15.5 7.5 15.5C11.625 15.5 15 12.125 15 8C15 3.875 11.625 0.5 7.5 0.5ZM7.5 11.75C7.05 11.75 6.75 11.45 6.75 11C6.75 10.55 7.05 10.25 7.5 10.25C7.95 10.25 8.25 10.55 8.25 11C8.25 11.45 7.95 11.75 7.5 11.75ZM8.25 8C8.25 8.45 7.95 8.75 7.5 8.75C7.05 8.75 6.75 8.45 6.75 8V5C6.75 4.55 7.05 4.25 7.5 4.25C7.95 4.25 8.25 4.55 8.25 5V8Z"
        fill="#E73B64"
      />
    </svg>
  );
};

export default memo(ExclamationMark);
