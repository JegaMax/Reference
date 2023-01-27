import { memo } from 'react';

const DPAIcon = ({ className }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#4468dd"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C10.7173 0 9.48292 0.202953 8.32485 0.575368V23.4246C9.48292 23.797 10.7173 24 12 24C18.6276 24 24 18.6281 24 11.9997C24 5.37256 18.6276 0 12 0ZM12.4869 4.17694C16.5827 4.42946 19.8372 7.84148 19.8372 11.9997C19.8372 16.1585 16.5827 19.5705 12.4869 19.8231V4.17694ZM0 11.9997C0 8.36929 1.61487 5.11803 4.16209 2.91703V21.083C1.61487 18.882 0 15.6307 0 11.9997Z"
        fill="#4468dd"
      />
    </svg>
  );
};

export default memo(DPAIcon);
