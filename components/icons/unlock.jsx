
const UnlockIcon = ({ onClick }) => {
  return (
    <svg width="10" height="14" viewBox="0 0 10 14" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClick}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 6.00046V3C6.5 2.17157 5.82843 1.5 5 1.5C4.17157 1.5 3.5 2.17157 3.5 3V3.25C3.5 3.66421 3.16421 4 2.75 4C2.33579 4 2 3.66421 2 3.25V3C2 1.34315 3.34315 0 5 0C6.65685 0 8 1.34315 8 3V6.05075C8.65006 6.11469 9.08762 6.2592 9.41421 6.58579C10 7.17157 10 8.11438 10 10C10 11.8856 10 12.8284 9.41421 13.4142C8.82843 14 7.88562 14 6 14H4C2.11438 14 1.17157 14 0.585786 13.4142C0 12.8284 0 11.8856 0 10C0 8.11438 0 7.17157 0.585786 6.58579C1.17157 6 2.11438 6 4 6H6C6.17459 6 6.34111 6 6.5 6.00046Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default UnlockIcon;
