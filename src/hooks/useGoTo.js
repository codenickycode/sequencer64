import { useHistory, useLocation } from 'react-router';

export const PATHS = {
  BASE: '/sequencer/session',
  LOAD: '/sequencer/session/load',
  SAVE: '/sequencer/session/save',
  LOGIN: '/sequencer/session/login',
  CHANGE_KIT: '/sequencer/session/kits',
  FX: '/sequencer/session/fx',
};

export const useGoTo = () => {
  const history = useHistory();
  const goToFunc = (path, cb) => {
    history.push(path);
    document.getElementById('root').scrollTop = 0;
    if (!cb || typeof cb !== 'function') return;
    cb();
  };
  const goTo = {};
  goTo.base = (cb) => goToFunc(PATHS.BASE, cb);
  goTo.load = (cb) => goToFunc(PATHS.LOAD, cb);
  goTo.save = (cb) => goToFunc(PATHS.SAVE, cb);
  goTo.login = (cb) => goToFunc(PATHS.LOGIN, cb);
  goTo.changeKit = (cb) => goToFunc(PATHS.CHANGE_KIT, cb);
  goTo.fx = (cb) => goToFunc(PATHS.FX, cb);

  return goTo;
};

export const useCurrentPath = () => {
  const path = {};
  const pathname = useLocation().pathname;
  path.selectingKit = pathname === PATHS.CHANGE_KIT;
  path.fx = pathname === PATHS.FX;

  return path;
};
