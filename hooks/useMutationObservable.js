import { useEffect, useState } from 'react';

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
};

const useMutationObservable = (
  targetEl,
  callback,
  options = DEFAULT_OPTIONS,
) => {
  const [observer, setObserver] = useState(null);

  useEffect(() => {
    if (!callback) {
      return;
    }
    const obs = new MutationObserver(callback);
    setObserver(obs);
  }, [callback, options, setObserver]);

  useEffect(() => {
    if (!observer || !targetEl || !callback) {
      return;
    }
    const { config } = options;

    observer.observe(targetEl, config);
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [observer, targetEl, options, callback]);
};

export default useMutationObservable;
