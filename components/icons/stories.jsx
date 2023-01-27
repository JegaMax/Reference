import { memo } from 'react';

const Stories = ({ className, fillColor }) => {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7 9C7 6.17157 7 4.75736 7.87868 3.87868C8.75736 3 10.1716 3 13 3H15C17.8284 3 19.2426 3 20.1213 3.87868C21 4.75736 21 6.17157 21 9V19C21 21.8284 21 23.2426 20.1213 24.1213C19.2426 25 17.8284 25 15 25H13C10.1716 25 8.75736 25 7.87868 24.1213C7 23.2426 7 21.8284 7 19V9ZM3 8C3 7.44772 3.44772 7 4 7C4.55228 7 5 7.44772 5 8V20C5 20.5523 4.55228 21 4 21C3.44772 21 3 20.5523 3 20V8ZM24 7C23.4477 7 23 7.44772 23 8V20C23 20.5523 23.4477 21 24 21C24.5523 21 25 20.5523 25 20V8C25 7.44772 24.5523 7 24 7Z"
        fill={fillColor || 'currentColor'}
      />
    </svg>
  );
};

export default memo(Stories);
