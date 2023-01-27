import { memo } from 'react';


const ChevronLeft = ({ className }) => {
  return (
    <svg className={className} width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M2.6001 7.00039L7.5001 2.10039C7.9001 1.70039 7.9001 1.10039 7.5001 0.700391C7.1001 0.300391 6.5001 0.300391 6.1001 0.700391L0.400098 6.40039C9.76622e-05 6.80039 9.76622e-05 7.40039 0.400098 7.80039L6.1001 13.5004C6.3001 13.7004 6.5001 13.8004 6.8001 13.8004C7.1001 13.8004 7.3001 13.7004 7.5001 13.5004C7.9001 13.1004 7.9001 12.5004 7.5001 12.1004L2.6001 7.00039Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(ChevronLeft);
