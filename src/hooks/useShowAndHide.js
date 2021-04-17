import { useCallback, useEffect, useState } from 'react';

export const useShowAndHideClass = (baseClasses = '', timeout = 0, trigger1, trigger2) => {
  const [classes, setClasses] = useState(baseClasses);

  const showAndHide = useCallback(
    (trigger) => {
      if (!trigger) return;
      setClasses(baseClasses + ' show');
      try {
        setTimeout(() => setClasses(baseClasses), timeout);
      } catch (e) {
        // component unmounted
      }
    },
    [baseClasses, timeout]
  );

  useEffect(() => showAndHide(trigger1), [baseClasses, showAndHide, timeout, trigger1]);
  useEffect(() => showAndHide(trigger2), [baseClasses, showAndHide, timeout, trigger2]);

  return classes;
};

export const vanillaShowAndHideClass = (id, classToAdd, timeout) => {
  const element = document.getElementById(id);
  if (element) element.classList.add(classToAdd);
  setTimeout(() => {
    if (element) element.classList.remove(classToAdd);
  }, timeout);
};

export const useAddAndRemoveClass = (baseClasses = '', addClasses = '', timeout = 0) => {
  const [classes, setClasses] = useState(baseClasses);
  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    if (!trigger) return;
    setClasses(baseClasses + ' ' + addClasses);
    setTrigger(false);
    try {
      setTimeout(() => setClasses(baseClasses), timeout);
    } catch (e) {
      // component unmounted
    }
  }, [addClasses, baseClasses, timeout, trigger]);
  return [classes, () => setTrigger(true)];
};

export const useShowAndHideText = (baseText = '') => {
  const [text, setText] = useState(baseText);
  const showAndHideText = (newText, timeout) => {
    setText(newText);
    try {
      setTimeout(() => setText(''), timeout);
    } catch (e) {
      // component unmounted
    }
  };
  return [text, showAndHideText];
};
