import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export const StatusBar = () => {
  const message = useSelector((state) => state.app.status.message);
  const ref = useRef(null);

  useEffect(() => {
    let onTimer;
    let fadeTimer;
    if (message) {
      if (ref.current) ref.current.classList.add('fade-out', 'fade-out-2');
      onTimer = setTimeout(() => {
        if (ref.current) ref.current.classList.remove('fade-out');
      }, 1000);
      fadeTimer = setTimeout(() => {
        if (ref.current) ref.current.classList.remove('fade-out-2');
      }, 500);
    }
    return () => {
      clearTimeout(onTimer);
      clearTimeout(fadeTimer);
    };
  }, [message]);

  const index = message.indexOf('#');
  const status = message.substr(index + 1);

  // console.log('rendering: StatusBar');
  return (
    <div className='status-bar'>
      <p ref={ref} className='status' id='status'>
        {status}
      </p>
    </div>
  );
};
