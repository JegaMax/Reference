import { memo } from 'react';

const Times = ({ className }) => {
  return (
    <svg className={className} width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.21395 5.87142L6.18091 6.90446L3.63422 4.35777L1.39137 6.60063L0.43567 5.64493L2.67852 3.40207L0.325184 1.04873L1.35822 0.0156954L3.71156 2.36904L5.94889 0.131705L6.90459 1.0874L4.66726 3.32473L7.21395 5.87142Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(Times);
