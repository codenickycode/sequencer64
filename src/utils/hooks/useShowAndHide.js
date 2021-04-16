import { useCallback, useEffect, useState } from 'react';

export const useShowAndHideClass = (baseClasses = '', timeout = 0, trigger1, trigger2) => {
  const [classes, setClasses] = useState(baseClasses);

  const showAndHide = useCallback(
    (trigger) => {
      if (!trigger) return;
      setClasses(baseClasses + ' show');
      setTimeout(() => setClasses(baseClasses), timeout);
    },
    [baseClasses, timeout]
  );

  useEffect(() => showAndHide(trigger1), [baseClasses, showAndHide, timeout, trigger1]);
  useEffect(() => showAndHide(trigger2), [baseClasses, showAndHide, timeout, trigger2]);

  return classes;
};

export const useFlashState = (timeout) => {
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (flash) setTimeout(() => setFlash(false), timeout);
  }, [flash, timeout]);
  return [flash, setFlash];
};

export const useAddAndRemoveClass = (
  baseClasses = '',
  addClasses = '',
  trigger = true,
  timeout = 0
) => {
  const [classes, setClasses] = useState(baseClasses);
  useEffect(() => {
    if (!trigger) return;
    setClasses(baseClasses + ' ' + addClasses);
    setTimeout(() => setClasses(baseClasses), timeout);
  }, [addClasses, baseClasses, timeout, trigger]);
  return classes;
};

export const useShowAndHideText = (baseText = '') => {
  const [text, setText] = useState(baseText);
  const showAndHideText = (newText, timeout) => {
    setText(newText);
    setTimeout(() => setText(''), timeout);
  };
  return { text, showAndHideText };
};
