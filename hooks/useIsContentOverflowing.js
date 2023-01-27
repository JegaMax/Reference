import { useEffect, useState } from 'react';

const useIsContentOverflowing = ({ element }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  // This will rerender when element prop is changed which is exactly what we need
  useEffect(() => {
    setIsOverflowing((element)?.scrollHeight > (element)?.clientHeight);
  });

  return isOverflowing;
};

export default useIsContentOverflowing;
