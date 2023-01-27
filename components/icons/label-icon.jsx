import { memo } from 'react';

const LabelIcon = ({ className, onClick, style }) => {
  return (
    <svg
      style={style}
      className={className}
      onClick={onClick}
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.27308 13.7478C6.89418 13.7489 6.53062 13.5982 6.26357 13.3294L0.668423 7.73566C0.373189 7.4414 0.221834 7.03249 0.254338 6.61692L0.611308 1.92919C0.662296 1.22359 1.22488 0.663136 1.93067 0.614825L6.6184 0.257855C6.65553 0.250001 6.69194 0.250001 6.72906 0.250001C7.10721 0.249548 7.46986 0.400163 7.73643 0.668371L13.3316 6.26138C13.5995 6.52917 13.75 6.89245 13.75 7.27125C13.75 7.65004 13.5995 8.01332 13.3316 8.28111L8.2826 13.3294C8.01546 13.5981 7.65195 13.7487 7.27308 13.7478ZM4.24384 2.81447C3.59759 2.81466 3.03204 3.24886 2.86493 3.87313C2.69782 4.49739 2.97082 5.15606 3.53055 5.47908C4.09027 5.80209 4.79717 5.7089 5.25406 5.25187L5.25906 5.24758L5.26406 5.24259L5.25834 5.24758C5.66417 4.83818 5.78402 4.22491 5.56217 3.69284C5.34032 3.16078 4.8203 2.8143 4.24384 2.81447Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(LabelIcon);
