import * as React from "react";

function landscapePosterIcon(props) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 16 16"
      height="1em"
      width="1em"
      {...props}
    >
      <path d="M1 4.5a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H2a1 1 0 01-1-1v-6zm-1 6a2 2 0 002 2h12a2 2 0 002-2v-6a2 2 0 00-2-2H2a2 2 0 00-2 2v6z" />
      <path d="M14 7.5a1 1 0 10-2 0 1 1 0 002 0z" />
    </svg>
  );
}

export default landscapePosterIcon;