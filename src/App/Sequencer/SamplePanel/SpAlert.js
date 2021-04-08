import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { PointDownIcon, PointUpIcon, PointLeftIcon } from 'assets/icons';

export const SpAlert = () => {
  const message = useSelector((state) => state.editor.spAlert.message);
  const [classes, setClasses] = useState('spAlert');
  const landscape = useSelector((state) => state.app.landscape);

  useEffect(() => {
    let onTimer;
    let fadeTimer;
    if (message) {
      setClasses('spAlert fadeOut fadeOut2');
      onTimer = setTimeout(() => {
        setClasses('spAlert');
      }, 1000);
      fadeTimer = setTimeout(() => {
        setClasses('spAlert fadeOut2');
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
    const pointToGrid = spAlert.match(/cell/);
    const dir = pointToGrid ? (landscape ? 'left' : 'up') : 'down';
    const Icon =
      dir === 'up'
        ? PointUpIcon
        : dir === 'left'
        ? PointLeftIcon
        : PointDownIcon;
    return spAlert ? (
      <div className='spAlertWrapper'>
        <div id='spAlert' className={classes}>
          <span className='dummy' />
          {dir === 'left' && <Icon addClass='left' />}
          <p className='alert'>{spAlert}</p>
          {dir !== 'left' && <Icon addClass={dir === 'up' ? 'up' : ''} />}
          <span className='dummy' />
        </div>
      </div>
    ) : null;
  }, [classes, landscape, message]);
  return spAlertMemo;
};
