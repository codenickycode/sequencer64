import { useEffect, useRef, useState } from 'react';

export const useRotaryKnob = (currentVal, properties) => {
  const min = properties.min ?? 0;
  const max = properties.max ?? 100;
  const snapback = properties.snapback || false;
  const initialVal = properties.initialVal ?? 50;

  const [value, setValue] = useState(currentVal);
  useEffect(() => {
    setValue(currentVal);
  }, [currentVal]);

  const prevYRef = useRef(null);

  const startFunc = (e) => {
    prevYRef.current = getY(e);
  };

  const moveFunc = (e) => {
    const newY = getY(e);
    let amount = getKnobAmount(newY, prevYRef.current);
    prevYRef.current = newY;
    setValue((value) => {
      let newVal = value + amount;
      if (newVal < min) newVal = min;
      if (newVal > max) newVal = max;
      return newVal;
    });
  };

  const endFunc = () => {
    if (snapback) setTimeout(() => setValue(initialVal), 0);
    prevYRef.current = null;
  };

  const reset = () => setValue(initialVal);

  return { value, reset, startFunc, moveFunc, endFunc };
};

const getY = (e) => {
  let y;
  if (e.touches) y = e.touches[0].clientY;
  else y = e.clientY;
  return y;
};

const getKnobAmount = (newY, prevY) => {
  let amount = prevY - newY;
  return amount;
};
