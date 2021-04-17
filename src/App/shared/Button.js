import React, { useRef, useState } from 'react';
import cuid from 'cuid';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';

export const Button = ({
  fwdRef,
  id,
  classes = '',
  disabled = false,
  startFunc,
  onClick,
  type,
  ariaLabel = '',
  children,
}) => {
  const defaultRef = useRef(null);
  const ref = fwdRef || defaultRef;

  const [pressed, setPressed] = useState('');

  const handleTouchStart = (e) => {
    if (startFunc) startFunc(e);
    setPressed(' pressed');
  };
  const handleTouchEnd = (e) => {
    setPressed('');
  };

  const { onTouchStart, onMouseDown } = useTouchAndMouse(handleTouchStart);

  return (
    <button
      ref={ref}
      type={type || 'button'}
      id={id || cuid.slug()}
      className={'btn ' + classes + pressed}
      disabled={disabled}
      aria-label={ariaLabel}
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
      onTouchEnd={handleTouchEnd}
      onMouseUp={handleTouchEnd}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
