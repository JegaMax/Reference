import { useState, useCallback, useMemo, useEffect, useRef } from 'react';
class EyeDropper {
  open;
}

const anySignal = (signals) => {
  const controller = new AbortController();
  const onAbort = () => {
    controller.abort();
    for (const signal of signals) {
      signal.removeEventListener('abort', onAbort);
    }
  };
  for (const signal of signals) {
    if (signal.aborted) {
      onAbort();
      break;
    }
    signal.addEventListener('abort', onAbort);
  }
  return controller.signal;
};

const isSupported = () => typeof window !== 'undefined' && 'EyeDropper' in window;

const resolveError = () => {
  const error = 'The color pipette is only available by using Zazu on Google Chrome.';

  return Promise.reject(new Error(error));
};

const createInstance = () => (isSupported() ? new EyeDropper() : {});

const bindFunc = (instance) => {
  if (!isSupported()) {
    return resolveError;
  }

  return EyeDropper.prototype.open.bind(instance);
};

const useIsSupported = () => {
  const [supported, setSupported] = useState(Boolean);
  useEffect(() => {
    setSupported(isSupported());
  }, []);
  return useCallback(() => !!supported, [supported]);
};

const useIsMounted = () => {
  const ref = useRef();
  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);
  return useCallback(() => !!ref?.current, []);
};

const createHelpers = () => {
  const dropper = createInstance();
  const open = bindFunc(dropper);
  return { open };
};

export const useEyeDropper = () => {
  const { open: openPicker } = useMemo(() => createHelpers(), []);
  const mounted = useIsMounted();
  const isSupported = useIsSupported();
  const controller = useRef();
  const hasController = () => typeof controller.current !== 'undefined';
  const close = useCallback(() => {
    if (!hasController()) {
      return;
    }
    controller?.current?.abort();
  }, []);

  const open = useCallback(
    async (options = {}) => {
      close();
      const { signal, ...rest } = options;
      const newController = new AbortController();
      controller.current = newController;
      const unionSignal =
        typeof signal !== 'undefined' ? anySignal([signal, newController.signal]) : newController.signal;
      try {
        const results = await openPicker({ ...rest, signal: unionSignal });
        return results;
      } catch (e) {
        if (!mounted()) {
          e.canceled = true;
        }
        throw e;
      }
    },
    [controller, mounted, close, openPicker],
  );

  useEffect(() => close, [close]);
  return { open, close, isSupported };
};
