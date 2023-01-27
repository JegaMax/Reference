import { memo } from 'react';
import { COLORS } from '../../config/constants';

const RoundPencil = ({ className, circleColor, pencilColor }) => {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0" y="0" width="18" height="18" rx="9" fill={circleColor} />
      <path
        transform="translate(5, 5)"
        d="M6.84083 2.82249L3.23894 7.48042C3.07364 7.69194 2.83003 7.81092 2.56902 7.81533L1.13349 7.83296C1.05519 7.83296 0.989934 7.78007 0.972533 7.70516L0.646275 6.2906C0.589724 6.0306 0.646275 5.76179 0.811579 5.55467L3.36509 2.24961C3.40859 2.19673 3.4869 2.18836 3.5391 2.22758L4.61357 3.08249C4.68318 3.13977 4.77888 3.17062 4.87893 3.1574C5.09209 3.13096 5.23564 2.93706 5.21389 2.72995C5.20084 2.62419 5.14864 2.53605 5.07904 2.46995C5.05728 2.45232 4.03501 1.63267 4.03501 1.63267C3.96976 1.57979 3.95671 1.48284 4.00891 1.41718L4.41347 0.892336C4.78758 0.412001 5.44009 0.367934 5.96646 0.786574L6.57112 1.26691C6.81908 1.46081 6.98438 1.7164 7.04093 1.98521C7.10619 2.2809 7.03658 2.57131 6.84083 2.82249Z"
        fill={pencilColor}
      />
    </svg>
  );
};

RoundPencil.defaultProps = {
  circleColor: COLORS.SHADE_100,
  pencilColor: COLORS.SHADE_900,
};

export default memo(RoundPencil);
