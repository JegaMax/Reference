import { memo } from 'react';

const DotsIcon = ({ className }) => {
  return (
    <svg className={className} width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7 0.5C6.175 0.5 5.5 1.175 5.5 2C5.5 2.825 6.175 3.5 7 3.5C7.825 3.5 8.5 2.825 8.5 2C8.5 1.175 7.825 0.5 7 0.5ZM1.75 0.5C0.925 0.5 0.25 1.175 0.25 2C0.25 2.825 0.925 3.5 1.75 3.5C2.575 3.5 3.25 2.825 3.25 2C3.25 1.175 2.575 0.5 1.75 0.5ZM12.25 0.5C11.425 0.5 10.75 1.175 10.75 2C10.75 2.825 11.425 3.5 12.25 3.5C13.075 3.5 13.75 2.825 13.75 2C13.75 1.175 13.075 0.5 12.25 0.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(DotsIcon);
