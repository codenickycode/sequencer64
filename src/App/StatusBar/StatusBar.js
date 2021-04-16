import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

export const StatusBar = () => {
  const { statusBarMessage, containerStyle, statusClasses } = useStatusBarState();
  return !statusBarMessage ? null : (
    <div className='statusBar' style={containerStyle}>
      <p id='status' className={statusClasses}>
        {statusBarMessage}
      </p>
    </div>
  );
};

const useStatusBarState = () => {
  const state = {};
  state.count = useSelector((state) => state.app.status.count);
  state.message = useSelector((state) => state.app.status.message);
  state.bpm = useSelector((state) => state.sequence.present.bpm);
  state.kitName = useSelector((state) => state.sequence.present.kit);
  state.sequenceName = useSelector((state) => state.sequence.present.name);
  state.vh = useSelector((state) => state.screen.dimensions.vh);
  state.landscape = useSelector((state) => state.screen.dimensions.landscape);

  const { containerStyle, statusClasses } = useStatusBarStyle(state);
  const statusBarMessage = useStatusBarMessage(state);

  return { statusBarMessage, containerStyle, statusClasses };
};

const useStatusBarStyle = ({ message, count, vh, landscape }) => {
  const [statusClasses, setStatusClasses] = useState('status');
  const [containerStyle, setContainerStyle] = useState({ top: 0 });

  useEffect(() => {
    let onTimer;
    let fadeTimer;
    if (message) {
      setStatusClasses('status fadeOut fadeOut2');
      if (message.match('Loading samples')) return;
      onTimer = setTimeout(() => {
        setStatusClasses('status');
      }, 1000);
      fadeTimer = setTimeout(() => {
        setStatusClasses('status fadeOut2');
      }, 500);
    }
    return () => {
      clearTimeout(onTimer);
      clearTimeout(fadeTimer);
    };
  }, [message, count]);

  useEffect(() => {
    if (landscape && vh >= 754) setContainerStyle({ bottom: vh * 0.1 });
  }, [landscape, vh]);

  return { containerStyle, statusClasses };
};

const useStatusBarMessage = ({ message, bpm, kitName, sequenceName }) => {
  const memo = useMemo(() => {
    let index, statusBarMessage;
    if (message) {
      index = message.indexOf('#');
      statusBarMessage = message.substr(index + 1);
    }

    if (statusBarMessage.match(/bpm/)) {
      statusBarMessage = statusBarMessage.substr(6) + bpm;
    } else if (statusBarMessage.match(/Error loading/)) {
      statusBarMessage = 'Error loading samples, reverting to default kit';
    } else if (statusBarMessage.match(/kit/)) {
      statusBarMessage += kitName;
    } else if (statusBarMessage.match(/sequence/)) {
      if (!statusBarMessage.match(/erase/)) statusBarMessage += sequenceName;
    }

    return statusBarMessage;
  }, [bpm, kitName, message, sequenceName]);

  return memo;
};
