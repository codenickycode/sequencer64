import { useEffect, useRef } from 'react';

export const useDisablePassiveHack = (event, func, fwdRef) => {
  const defaultRef = useRef(null);
  const ref = fwdRef ? fwdRef : defaultRef;

  useEffect(() => {
    let keepRef = ref;
    if (keepRef.current)
      keepRef.current.addEventListener(event, func, {
        passive: false,
      });
    return () => {
      if (keepRef.current) keepRef.current.removeEventListener(event, func);
    };
  }, [event, func, ref]);

  return ref;
};
