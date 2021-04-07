import React, { useCallback, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import cuid from 'cuid';
import { useTouchAndMouse } from 'utils/useTouchAndMouse';

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

  const handleTouchStart = (e) => {
    if (onTouchStart) onTouchStart(e);
  };

  const { touchStart, mouseDown } = useTouchAndMouse(handleTouchStart);

  return (
    <button
      ref={ref}
      type={type || 'button'}
      id={id || cuid.slug()}
      className={'btn ' + classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onTouchStart={touchStart}
      onMouseDown={mouseDown}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const ScrollLeft = ({ fwdRef, onClick }) => {
  return (
    <Button fwdRef={fwdRef} classes='scrollLeft' onClick={onClick}>
      <div className=''>
        <ChevronLeftIcon />
      </div>
    </Button>
  );
};

export const ScrollRight = ({ fwdRef, onClick }) => {
  return (
    <Button fwdRef={fwdRef} classes='scrollRight' onClick={onClick}>
      <div className=''>
        <ChevronRightIcon />
      </div>
    </Button>
  );
};
