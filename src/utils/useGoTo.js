import { useHistory } from 'react-router';

export const PATHS = {
  BASE: '/sequencer/session',
  LOAD: '/sequencer/session/load',
  SAVE: '/sequencer/session/save',
  CHANGE_KIT: '/sequencer/session/kits',
  LOGIN: '/sequencer/session/login',
};

export const useGoTo = () => {
  const history = useHistory();
  const goTo = (path, cb) => {
    history.push(path);
    if (cb) cb();
  };
  return goTo;
};
