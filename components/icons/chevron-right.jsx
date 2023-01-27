import { memo } from 'react';

const ChevronRight = ({ className, onClick, style }) => {
  return (
    <svg
      style={style}
      className={className}
      width="8"
      height="14"
      viewBox="0 0 8 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
    >
      <path
        d="M7.5002 6.29999L1.9002 0.599988C1.5002 0.199988 0.900195 0.199988 0.500196 0.599988C0.100195 0.999988 0.100195 1.59999 0.500196 1.99999L5.4002 6.89999L0.500196 11.8C0.300196 12 0.200195 12.2 0.200195 12.5C0.200195 13.1 0.600195 13.5 1.2002 13.5C1.5002 13.5 1.7002 13.4 1.9002 13.2L7.6002 7.49999C7.9002 7.29999 7.9002 6.69999 7.5002 6.29999Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(ChevronRight);
