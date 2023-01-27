import { memo } from 'react';

const Italic = () => {
  return (
    <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11 0.899994H5C4.4 0.899994 4 1.29999 4 1.89999C4 2.49999 4.4 2.89999 5 2.89999H6.5L3.3 10.9H1C0.4 10.9 0 11.3 0 11.9C0 12.5 0.4 12.9 1 12.9H4H7C7.6 12.9 8 12.5 8 11.9C8 11.3 7.6 10.9 7 10.9H5.5L8.7 2.89999H11C11.6 2.89999 12 2.49999 12 1.89999C12 1.29999 11.6 0.899994 11 0.899994Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(Italic);
