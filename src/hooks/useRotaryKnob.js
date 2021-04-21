import { setMainMixer } from 'App/reducers/sequenceSlice';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useRotaryKnob = (value, object) => {
  console.log('rendering useRotaryKnob');
  const min = object.min ?? 0;
  const max = object.max ?? 100;
  const snapback = object.snapback || false;
  const initialVal = object.initialVal ?? 50;

  const [rotaryValue, setRotaryValue] = useState(value);

  const prevYRef = useRef(null);

  const startFunc = (e) => {
    prevYRef.current = getY(e);
  };

  const moveFunc = (e) => {
    const newY = getY(e);
    let amount = getKnobAmount(newY, prevYRef.current);
    prevYRef.current = newY;
    setRotaryValue((value) => {
      let newVal = value + amount;
      if (newVal < min) newVal = min;
      if (newVal > max) newVal = max;
      return newVal;
    });
  };

  const endFunc = () => {
    if (snapback) setTimeout(() => setRotaryValue(initialVal), 0);
    prevYRef.current = null;
  };

  const reset = () => setRotaryValue(initialVal);

  return { rotaryValue, reset, startFunc, moveFunc, endFunc };
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
