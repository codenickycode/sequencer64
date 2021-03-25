import React, { useRef, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
import { pressDown, pressUp } from '../utils/press';

export const Button = ({
  fwdRef,
  id,
  classes,
  disabled = false,
  onClick,
  children,
}) => {
  const ref = useRef(null);
  return (
    <button
      ref={fwdRef || ref}
      id={id}
      className={classes + ' btn'}
      disabled={disabled}
      onTouchStart={() => pressDown(ref)}
      onTouchEnd={() => pressUp(ref)}
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
