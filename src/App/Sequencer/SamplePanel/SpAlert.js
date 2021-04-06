import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { PointDownIcon, PointUpIcon } from 'assets/icons';

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
    const up = spAlert.match(/Tap/);
    const Icon = up ? PointUpIcon : PointDownIcon;
    return spAlert ? (
      <div className='spAlertWrapper'>
        <div id='spAlert' className={classes}>
          <span className='dummy' />
          <p className='alert'>{spAlert}</p>
          {!landscape && <Icon addClass={up ? 'up' : ''} />}
          <span className='dummy' />
        </div>
      </div>
    ) : null;
  }, [classes, landscape, message]);
  return spAlertMemo;
};
