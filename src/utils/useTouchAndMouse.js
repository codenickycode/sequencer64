import { useState } from 'react';

export const useTouchAndMouse = (startFunc, moveFunc, endFunc) => {
  const [touching, setTouching] = useState(false);

  const touchStart = (e) => {
    setTouching(true);
    if (startFunc) startFunc(e);
  };

  const mouseDown = (e) => {
    if (touching) return;
    if (startFunc) startFunc(e);
  };

  const touchMove = (e) => {
    if (moveFunc) moveFunc(e);
  };

  const mouseMove = (e) => {
    if (touching) return;
    if (moveFunc) moveFunc(e);
  };

  const touchEnd = (e) => {
    if (endFunc) endFunc(e);
  };

  const mouseUp = (e) => {
    if (touching) return;
    if (endFunc) endFunc(e);
  };

  return {
    touchStart,
    mouseDown,
    touchMove,
    mouseMove,
    touchEnd,
    mouseUp,
  };
};
