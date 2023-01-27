import { useEffect, useRef } from 'react';

const useDidUpdateEffect = (fn, deps = []) => {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }

    didMountRef.current = true;
  }, [fn]);
};

export default useDidUpdateEffect;
