import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const StatusBar = () => {
  const count = useSelector((state) => state.app.status.count);
  const message = useSelector((state) => state.app.status.message);
  const bpm = useSelector((state) => state.sequence.present.bpm);
  const kitName = useSelector((state) => state.sequence.present.kit);
  const sequenceName = useSelector((state) => state.sequence.present.name);
  const vh = useSelector((state) => state.screen.dimensions.vh);
  const landscape = useSelector((state) => state.screen.dimensions.landscape);

  const [classes, setClasses] = useState('status');
  useEffect(() => {
    let onTimer;
    let fadeTimer;
    if (message) {
      setClasses('status fadeOut fadeOut2');
      if (message.match('Loading samples')) return;
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

    let statusBarStyle = { top: 0 };
    if (landscape && vh >= 754) statusBarStyle = { bottom: vh * 0.1 };
    return (
      <div className='statusBar' style={statusBarStyle}>
        <p className={classes} id='status'>
          {status}
        </p>
      </div>
    );
  }, [bpm, classes, kitName, landscape, message, sequenceName, vh]);
  return message ? memo : null;
};
