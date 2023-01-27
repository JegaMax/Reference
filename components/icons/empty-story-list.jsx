import { memo } from 'react';
import { COLORS } from '../../config/constants';

const EmptyStoryList = ({ className, mainColor, secondaryColor }) => {
  return (
    <svg
      className={className}
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="24" width="72" height="120" rx="12" fill={mainColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M103.443 107.946C109.993 107.783 113.843 107.126 116.484 104.485C119.999 100.971 119.999 95.3137 119.999 84V36C119.999 24.6863 119.999 19.0294 116.484 15.5147C113.843 12.8739 109.993 12.2173 103.443 12.054C103.999 15.4193 103.999 19.8828 103.999 26V94C103.999 100.117 103.999 104.581 103.443 107.946Z"
        fill={secondaryColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5556 12.054C16 15.4193 16 19.8828 16 26V94C16 100.117 16 104.581 16.5556 107.946C10.0055 107.783 6.15548 107.126 3.51472 104.485C0 100.971 0 95.3137 0 84V36C0 24.6863 0 19.0294 3.51472 15.5147C6.15548 12.8739 10.0055 12.2173 16.5556 12.054Z"
        fill={secondaryColor}
      />
    </svg>
  );
};

EmptyStoryList.defaultProps = {
  mainColor: COLORS.SHADE_100,
  secondaryColor: COLORS.SHADE_300,
};

export default memo(EmptyStoryList);
