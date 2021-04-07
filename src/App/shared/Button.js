import React, { useCallback, useEffect, useRef } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import cuid from 'cuid';

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

  const handleTouchStart = useCallback(
    (e) => {
      e.preventDefault();
      if (onTouchStart) onTouchStart();
      if (onClick) onClick();
    },
    [onClick, onTouchStart]
  );

  // disable passive eventListener hack
  useEffect(() => {
    let keepRef = ref;
    if (keepRef.current)
      keepRef.current.addEventListener('touchstart', handleTouchStart, {
        passive: false,
      });
    return () => {
      if (keepRef.current)
        keepRef.current.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleTouchStart, ref]);

  return (
    <button
      ref={ref}
      type={type || 'button'}
      id={id || cuid.slug()}
      className={'btn ' + classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onMouseDown={handleTouchStart}
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
