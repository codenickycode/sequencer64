import { useEffect, useRef, useState } from 'react';

export const useRotaryKnob = (initialVal = 50) => {
  const [value, setValue] = useState(initialVal);
  useEffect(() => {
    setValue(initialVal);
  }, [initialVal]);

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
      if (newVal < 0) newVal = 0;
      if (newVal > 100) newVal = 100;
      return newVal;
    });
  };
  const endFunc = () => {
    prevYRef.current = null;
  };

  return { value, startFunc, moveFunc, endFunc };
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
