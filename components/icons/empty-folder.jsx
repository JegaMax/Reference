import { memo } from 'react';

const EmptyFolder = ({ className, secondaryColor }) => {
  return (
    <svg
      className={className}
      width="84"
      height="84"
      viewBox="0 0 84 84"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 21C21 15.3431 21 12.5147 22.7574 10.7574C24.5147 9 27.3431 9 33 9H51C56.6569 9 59.4853 9 61.2426 10.7574C63 12.5147 63 15.3431 63 21V63C63 68.6569 63 71.4853 61.2426 73.2426C59.4853 75 56.6569 75 51 75H33C27.3431 75 24.5147 75 22.7574 73.2426C21 71.4853 21 68.6569 21 63V21ZM9 24C9 22.3431 10.3431 21 12 21C13.6569 21 15 22.3431 15 24V60C15 61.6569 13.6569 63 12 63C10.3431 63 9 61.6569 9 60V24ZM72 21C70.3431 21 69 22.3431 69 24V60C69 61.6569 70.3431 63 72 63C73.6569 63 75 61.6569 75 60V24C75 22.3431 73.6569 21 72 21Z"
        fill={secondaryColor}
      />
    </svg>
  );
};

export default memo(EmptyFolder);
