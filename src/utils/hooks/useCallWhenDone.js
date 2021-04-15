import { useCallback, useRef } from 'react';

export const useCallWhenDone = () => {
  const timerRef = useRef(null);
  const callWhenDone = (func, timeout) => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(func, timeout);
  };
  return useCallback(callWhenDone, []);
};
