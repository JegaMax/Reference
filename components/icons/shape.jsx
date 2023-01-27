import { memo } from 'react';

const ShapeIcon = ({ className }) => {
  return (
    <svg
      className={className}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25 11C25 14.7278 22.4503 17.8601 18.9996 18.7481C19.0001 18.5364 19 18.3195 19 18.0975V18.0971V17.9029C19.0001 16.5814 19.0001 15.4418 18.9055 14.5114C18.8051 13.525 18.5821 12.5544 17.9889 11.6666C17.5511 11.0114 16.9886 10.4489 16.3335 10.0112C15.4456 9.41795 14.4751 9.19489 13.4886 9.09454C12.5583 8.9999 11.4186 8.99995 10.0971 9L10 9.00001L9.90292 9C9.68074 8.99999 9.46371 8.99998 9.25195 9.00043C10.1399 5.54976 13.2722 3 17 3C21.4183 3 25 6.58172 25 11ZM3.67412 12.7777C3 13.7866 3 15.1911 3 18C3 20.8089 3 22.2134 3.67412 23.2223C3.96596 23.659 4.34096 24.034 4.77772 24.3259C5.78661 25 7.19108 25 10 25C12.8089 25 14.2134 25 15.2223 24.3259C15.659 24.034 16.034 23.659 16.3259 23.2223C17 22.2134 17 20.8089 17 18C17 15.1911 17 13.7866 16.3259 12.7777C16.034 12.341 15.659 11.966 15.2223 11.6741C14.2134 11 12.8089 11 10 11C7.19108 11 5.78661 11 4.77772 11.6741C4.34096 11.966 3.96596 12.341 3.67412 12.7777Z"
        fill="currentColor"
      />
    </svg>
  );
};

export default memo(ShapeIcon);
