import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { PointDownIcon } from '../../../../icons';

export const SpAlert = () => {
  const message = useSelector((state) => state.editor.spAlert.message);
  const [classes, setClasses] = useState('sp-alert');

  useEffect(() => {
    let onTimer;
    let fadeTimer;
    if (message) {
      setClasses('sp-alert fade-out fade-out-2');
      onTimer = setTimeout(() => {
        setClasses('sp-alert');
      }, 1000);
      fadeTimer = setTimeout(() => {
        setClasses('sp-alert fade-out-2');
      }, 500);
    }
    return () => {
      clearTimeout(onTimer);
      clearTimeout(fadeTimer);
    };
  }, [message]);

  const spAlertMemo = useMemo(() => {
    // console.log('rendering: SpAlert');

    const index = message.indexOf('#');
    const spAlert = message.substr(index + 1);

    return spAlert ? (
      <div className='sp-alert-wrapper'>
        <div id='sp-alert' className={classes}>
          <span className='menu-dummy' />
          <p className='alert'>{spAlert}</p>
          <PointDownIcon />
          <span className='menu-dummy' />
        </div>
      </div>
    ) : null;
  }, [classes, message]);
  return spAlertMemo;
};
