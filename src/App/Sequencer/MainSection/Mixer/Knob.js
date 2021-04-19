import React from 'react';

export const Knob = ({ value = 50 }) => (
  <svg viewBox='0 0 100 50' xmlns='http://www.w3.org/2000/svg'>
    <path
      className='arc'
      d='M10 3 A20 20, 0, 1 0, 90 3'
      stroke='currentColor'
      strokeLinecap='round'
      strokeDashoffset={126 - value * 1.25}
      strokeWidth='2'
      fill='none'
    />
    <path
      className='arc-hide'
      d='M5 2 A20 20, 0, 0 0, 95 2'
      stroke='currentColor'
      strokeWidth='1'
      fill='none'
    />
  </svg>
);
