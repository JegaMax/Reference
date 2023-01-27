import { useState } from 'react';

const useMoveableTooltip = () => {
  const [tooltip, setTooltip] = useState({
    show: false,
    text: '',
  });

  const onMouseEnter = (title) => () => {
    if (title) {
      setTooltip({
        show: true,
        text: title,
      });
    }
  };

  const onMouseLeave = (title) => () => {
    if (title) {
      setTooltip((t) => ({
        ...t,
        show: false,
      }));
    }
  };

  return {
    tooltip,
    onMouseEnter,
    onMouseLeave,
  };
};

export default useMoveableTooltip;
