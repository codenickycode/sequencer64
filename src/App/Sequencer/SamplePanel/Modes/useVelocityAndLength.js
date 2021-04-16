import { useRef } from 'react';
import { useSetTrueForCallback } from '../../../../utils/hooks/useSetTrueForCallback';
import { usePVL } from './usePVL';

export const useVelocityAndLength = () => {
  const pvl = usePVL();
  const { setValue, dispatchModAll, ...state } = pvl;

  const setMouseDispatchModAll = useSetTrueForCallback(dispatchModAll);

  const sliderRef = useRef(null);

  const setSliderValue = (e) => {
    if (!sliderRef.current) return;
    const newVal = getSliderValue(e, sliderRef.current);
    setValue(newVal);
  };
  const endFunc = (e) => {
    if (!state.editAll) return;
    if (e.type === 'mouseup') setMouseDispatchModAll(true);
    else dispatchModAll();
  };

  const styles = {};
  styles.slider = { transform: `scaleX(${state.value.toFixed(2)})` };
  styles.thumb = { transform: `translateX(${parseInt(state.value * 100)}%)` };

  return { sliderRef, setSliderValue, endFunc, styles, state };
};

const getSliderValue = (e, slider) => {
  let newX;
  if (e.touches) newX = e.touches[0].clientX;
  else newX = e.clientX;
  const { left, width } = slider.getBoundingClientRect();
  let newVal = (newX - left) / width;
  if (newVal < 0.05) newVal = 0.05;
  if (newVal > 1) newVal = 1;
  newVal = Math.round(newVal * 100) / 100;
  return newVal;
};
