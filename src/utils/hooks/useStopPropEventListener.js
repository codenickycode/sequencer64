import { useRef } from 'react';

export const useStopPropEventListener = () => {
  const removeElRef = useRef(null);
  const eventListener = (elementId, event, func) => {
    const element = document.getElementById(elementId);
    const callback = (e) => {
      e.stopPropagation();
      func();
      removeElRef.current();
    };
    element.addEventListener(event, callback);
    removeElRef.current = () => element.removeEventListener(event, callback);
  };
  return { eventListener, removeElRef };
};
