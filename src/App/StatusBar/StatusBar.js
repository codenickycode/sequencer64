import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export const StatusBar = () => {
  const count = useSelector((state) => state.app.status.count);
  const message = useSelector((state) => state.app.status.message);
  const [classes, setClasses] = useState('status');

  useEffect(() => {
    let onTimer;
    let fadeTimer;
    if (message) {
      setClasses('status fade-out fade-out-2');
      onTimer = setTimeout(() => {
        setClasses('status');
      }, 1000);
      fadeTimer = setTimeout(() => {
        setClasses('status fade-out-2');
      }, 500);
    }
    return () => {
      clearTimeout(onTimer);
      clearTimeout(fadeTimer);
    };
  }, [message, count]);

  let index, status;
  if (message) {
    index = message.indexOf('#');
    status = message.substr(index + 1);
  }
  // console.log('rendering: StatusBar');
  return (
    <div className='status-bar'>
      <p className={classes} id='status'>
        {status}
      </p>
    </div>
  );
};
