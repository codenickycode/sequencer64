import { useCallback, useEffect, useRef } from 'react';

export const useDisablePassiveHack = (event, func, fwdRef) => {
  const defaultRef = useRef(null);
  const ref = fwdRef ? fwdRef : defaultRef;

  const touchStartFunc = useCallback(
    (e) => {
      if (ref) {
        if (!ref.current.hasAttribute('disabled')) func(e);
      }
    },
    [func, ref]
  );

  useEffect(() => {
    let keepRef = ref;
    if (keepRef.current)
      keepRef.current.addEventListener(event, touchStartFunc, {
        passive: false,
      });
    return () => {
      if (keepRef.current)
        keepRef.current.removeEventListener(event, touchStartFunc);
    };
  }, [event, func, ref, touchStartFunc]);

  return ref;
};
