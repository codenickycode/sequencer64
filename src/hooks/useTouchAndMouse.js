import { useRef, useState } from 'react';

// onTouchStart and onMouseDown are required on the target
// onMouseMove and onMouseUp are handled by document listener
// so out of bounds events are captured

export const useTouchAndMouse = (startFunc, moveFunc, endFunc) => {
  const [touching, setTouching] = useState(false);

  const onTouchStart = (e) => {
    setTouching(true);
    if (startFunc) startFunc(e);
  };

  const mouseDownRef = useRef(null);
  const onMouseDown = (e) => {
    if (touching) return;
    if (startFunc) startFunc(e);
    mouseDownRef.current = true;
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('mousemove', onMouseMove);
  };

  const onTouchMove = (e) => {
    if (moveFunc) moveFunc(e);
  };

  const onMouseMove = (e) => {
    if (touching) return;
    if (moveFunc && mouseDownRef.current) moveFunc(e);
  };

  const onTouchEnd = (e) => {
    if (endFunc) endFunc(e);
  };

  const onMouseUp = (e) => {
    if (touching) return;
    if (endFunc) endFunc(e);
    mouseDownRef.current = false;
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  };

  return {
    onTouchStart,
    onMouseDown,
    onTouchMove,
    onTouchEnd,
  };
};
