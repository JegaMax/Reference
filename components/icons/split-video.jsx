import { memo } from 'react';

const SplitVideo = ({ className }) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.22806 14.0964C2.37257 14.1939 2.56807 14.249 2.77233 14.25H7.6875V13.2H6.66667V12.15H7.6875V5.85H6.66667V4.8H7.6875V3.75H2.77233C2.34611 3.75 2 3.9831 2 4.2708V13.7292C2.00163 13.8671 2.08355 13.999 2.22806 14.0964ZM5.11111 13.2H3.55556V12.15H5.11111V13.2ZM5.11111 5.85H3.55556V4.8H5.11111V5.85Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.3125 3.75V4.8H11.3333V5.85H10.3125V12.15H11.3333V13.2H10.3125V14.25H15.2277C15.4324 14.25 15.6287 14.1951 15.7735 14.0975C15.9183 13.9998 15.9998 13.8674 16 13.7292V4.2708C15.9984 4.13292 15.9165 4.00102 15.7719 3.90357C15.6274 3.80612 15.4319 3.75096 15.2277 3.75H10.3125ZM14.4444 13.2H12.8889V12.15H14.4444V13.2ZM14.4444 5.85H12.8889V4.8H14.4444V5.85Z"
        fill="currentColor"
      />
      <rect x="8.5625" y="2" width="0.875" height="14" rx="0.4375" fill="currentColor" />
    </svg>
  );
};

export default memo(SplitVideo);
