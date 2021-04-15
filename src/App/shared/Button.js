import React, { useMemo, useRef, useState } from 'react';
import cuid from 'cuid';
import { useTouchAndMouse } from 'utils/hooks/useTouchAndMouse';
import { useToneState } from 'App/reducers/useAbstractState/useToneState';

export const Button = ({
  fwdRef,
  id,
  classes = '',
  disabled = false,
  onTouchStart,
  onClick,
  type,
  ariaLabel = '',
  children,
}) => {
  const defaultRef = useRef(null);
  const ref = fwdRef || defaultRef;

  const [pressed, setPressed] = useState('');

  const handleTouchStart = (e) => {
    if (onTouchStart) onTouchStart(e);
    setPressed(' pressed');
  };
  const handleTouchEnd = (e) => {
    setPressed('');
  };

  const { touchStart, mouseDown } = useTouchAndMouse(handleTouchStart);

  return (
    <button
      ref={ref}
      type={type || 'button'}
      id={id || cuid.slug()}
      className={'btn ' + classes + pressed}
      disabled={disabled}
      aria-label={ariaLabel}
      onTouchStart={touchStart}
      onMouseDown={mouseDown}
      onTouchEnd={handleTouchEnd}
      onMouseUp={handleTouchEnd}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const TransportBtn = ({ id, onClick, Icon, show }) => {
  const { transportDisabled } = useToneState();
  const memo = useMemo(() => {
    return !show ? null : (
      <Button
        id={id}
        aria-label={id}
        classes='menuBtn'
        disabled={transportDisabled}
        onClick={onClick}
      >
        <Icon />
      </Button>
    );
  }, [id, onClick, show, transportDisabled]);
  return memo;
};
