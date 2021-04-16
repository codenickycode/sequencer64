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
        console.log('component unmounted');
      }
    },
    [baseClasses, timeout]
  );

  useEffect(() => showAndHide(trigger1), [baseClasses, showAndHide, timeout, trigger1]);
  useEffect(() => showAndHide(trigger2), [baseClasses, showAndHide, timeout, trigger2]);

  return classes;
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
    try {
      setTimeout(() => setClasses(baseClasses), timeout);
    } catch (e) {
      console.log('component unmounted');
    }
  }, [addClasses, baseClasses, timeout, trigger]);
  return classes;
};

export const useShowAndHideText = (baseText = '') => {
  const [text, setText] = useState(baseText);
  const showAndHideText = (newText, timeout) => {
    setText(newText);
    try {
      setTimeout(() => setText(''), timeout);
    } catch (e) {
      console.log('component unmounted');
    }
  };
  return { text, showAndHideText };
};
