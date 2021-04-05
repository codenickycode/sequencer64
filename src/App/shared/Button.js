import React, { useRef, useState } from 'react';
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
  const [pressed, setPressed] = useState(false);

  const handleTouchStart = () => {
    if (!disabled) setPressed(true);
    if (onTouchStart) onTouchStart();
  };

  const onTouchEnd = () => setPressed(false);

  return (
    <button
      ref={fwdRef || ref}
      type={type || 'button'}
      id={id || cuid.slug()}
      className={(pressed ? 'pressed btn ' : 'btn ') + classes}
      disabled={disabled}
      aria-label={ariaLabel}
      onTouchStart={handleTouchStart}
      onTouchEnd={onTouchEnd}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const ScrollLeft = ({ fwdRef, onClick }) => {
  return (
    <Button fwdRef={fwdRef} classes='scroll-left' onClick={onClick}>
      <div className=''>
        <ChevronLeftIcon />
      </div>
    </Button>
  );
};

export const ScrollRight = ({ fwdRef, onClick }) => {
  return (
    <Button fwdRef={fwdRef} classes='scroll-right' onClick={onClick}>
      <div className=''>
        <ChevronRightIcon />
      </div>
    </Button>
  );
};
