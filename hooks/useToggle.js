import { useCallback, useState } from 'react';

const useToggle = (initialValue = false) => {
  const [isShown, setIsShown] = useState(initialValue);
  const toggle = useCallback(() => {
    setIsShown((isShown) => !isShown);
  }, []);
  const setShow = useCallback(() => {
    setIsShown(true);
  }, []);
  const setHide = useCallback(() => {
    setIsShown(false);
  }, []);
  return { isShown, toggle, setShow, setHide };
};

export default useToggle;
