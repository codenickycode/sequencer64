export const useEventListener = () => {
  const eventListener = (elementId, event, func) => {
    const element = document.getElementById(elementId);
    const callback = (e) => {
      e.stopPropagation();
      func();
      element.removeEventListener(event, callback);
    };
    element.addEventListener(event, callback);
  };

  return eventListener;
};
