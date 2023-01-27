import { memo } from 'react';

const Crop = ({ className }) => {
  return (
    <svg
      className={className}
      width="25"
      height="25"
      viewBox="-2 -2 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.57583 2.5835L5.5 11.3335C5.5 11.6429 5.62292 11.9397 5.84171 12.1585C6.0605 12.3772 6.35725 12.5002 6.66667 12.5002H15.4167"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.58301 5.57583L11.333 5.5C11.6424 5.5 11.9392 5.62292 12.158 5.84171C12.3768 6.0605 12.4997 6.35725 12.4997 6.66667V15.4167"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default memo(Crop);
