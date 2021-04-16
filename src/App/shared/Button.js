import React, { useMemo, useRef, useState } from 'react';
import cuid from 'cuid';
import { useTouchAndMouse } from 'utils/hooks/useTouchAndMouse';
import { useSelector } from 'react-redux';

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

export const TransportBtn = ({ id, onClick, Icon, show }) => {
  const transportDisabled = useTransportDisabled();
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

const useTransportDisabled = () => {
  const countIn = useSelector((state) => state.tone.countIn);
  const loadingSamples = useSelector((state) => state.tone.loadingSamples);

  const countingIn = countIn !== '';
  const transportDisabled = loadingSamples || countingIn;

  return transportDisabled;
};
