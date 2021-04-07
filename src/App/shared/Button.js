import React, { useRef } from 'react';
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
  const ref = useRef(null);

  const handleTouchStart = (e) => {
    e.preventDefault();
    if (onTouchStart) onTouchStart();
  };

  return (
    <button
      ref={fwdRef || ref}
      type={type || 'button'}
      id={id || cuid.slug()}
      className={'btn ' + classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onTouchStart={handleTouchStart}
      onMouseDown={handleTouchStart}
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
