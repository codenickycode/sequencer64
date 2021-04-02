import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import cuid from 'cuid';

export const Button = ({
  fwdRef,
  id,
  classes = '',
  disabled = false,
  onClick,
  type,
  ariaLabel = '',
  children,
}) => {
  const ref = useRef(null);
  const [pressed, setPressed] = useState(false);

  const onTouchStart = () => {
    if (!disabled) setPressed(true);
  };

  const onTouchEnd = () => setPressed(false);

  return (
    <button
      ref={fwdRef || ref}
      type={type || 'button'}
      id={id || cuid.slug()}
      className={classes + (pressed ? ' pressed btn' : ' btn')}
      disabled={disabled}
      ariaLabel={ariaLabel}
      onTouchStart={onTouchStart}
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
