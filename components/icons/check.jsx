import { memo } from 'react';

const Check = ({ className }) => {
  return (
    <svg className={className} width="10" height="8" viewBox="0 0 10 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.4 7.19118L9.2 2.25C9.6 1.83824 9.6 1.22059 9.2 0.808823C8.8 0.397059 8.2 0.397059 7.8 0.808823L3.7 5.02941L2.2 3.48529C1.8 3.07353 1.2 3.07353 0.8 3.48529C0.4 3.89706 0.4 4.5147 0.8 4.92647L3 7.19118C3.4 7.60294 4 7.60294 4.4 7.19118Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(Check);
