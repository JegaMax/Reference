import React, { memo } from 'react';

const Smartphone = () => {
  return (
    <svg width="12" height="20" viewBox="0 0 12 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.57143 0H9.42857C10.8857 0 12 1.3 12 3V17C12 18.7 10.8857 20 9.42857 20H2.57143C1.11429 20 0 18.7 0 17V3C0 1.3 1.11429 0 2.57143 0ZM6 18.5C6.69036 18.5 7.25 17.9404 7.25 17.25C7.25 16.5596 6.69036 16 6 16C5.30964 16 4.75 16.5596 4.75 17.25C4.75 17.9404 5.30964 18.5 6 18.5Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(Smartphone);
