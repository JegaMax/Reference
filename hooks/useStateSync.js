import { useCallback, useRef, useState } from 'react';

const isFunction = (setStateAction) => S =>
  typeof setStateAction === 'function';

const useStateSync = (initialState) => {
  const [state, setState] = useState(initialState);
  const ref = useRef(state);

  const dispatch = useCallback((setStateAction) => {
    ref.current = isFunction(setStateAction) ? setStateAction(ref.current) : setStateAction;

    setState(ref.current);
  }, []);

  const returnArray = [
    state,
    dispatch,
    ref,
  ];

  return returnArray;
};

export { useStateSync };

