import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const StatusBar = () => {
  const count = useSelector((state) => state.app.status.count);
  const message = useSelector((state) => state.app.status.message);
  const bpm = useSelector((state) => state.sequence.present.bpm);
  const kitName = useSelector((state) => state.sequence.present.kit);
  const sequenceName = useSelector((state) => state.sequence.present.name);

  const [classes, setClasses] = useState('status');
  useEffect(() => {
    let onTimer;
    let fadeTimer;
    if (message) {
      setClasses('status fadeOut fadeOut2');
      onTimer = setTimeout(() => {
        setClasses('status');
      }, 1000);
      fadeTimer = setTimeout(() => {
        setClasses('status fadeOut2');
      }, 500);
    }
    return () => {
      clearTimeout(onTimer);
      clearTimeout(fadeTimer);
    };
  }, [message, count]);

  const memo = useMemo(() => {
    let index, status;
    if (message) {
      index = message.indexOf('#');
      status = message.substr(index + 1);
    }

    if (status.match(/bpm/)) {
      status = status.substr(6) + bpm;
    } else if (status.match(/Error loading/)) {
      status = 'Error loading samples, reverting to default kit';
    } else if (status.match(/kit/)) {
      status += kitName;
    } else if (status.match(/sequence/)) {
      if (!status.match(/erase/)) status += sequenceName;
    }
    // console.log('rendering: StatusBar');
    return (
      <div className='statusBar'>
        <p className={classes} id='status'>
          {status}
        </p>
      </div>
    );
  }, [bpm, classes, kitName, message, sequenceName]);
  return memo;
};
