import store from 'App/store';
import { setScreen } from 'App/reducers/appSlice';

export const setWidthAndHeight = () => {
  let vw = document.documentElement.clientWidth;
  let vh = document.documentElement.clientHeight;
  document.documentElement.style.setProperty('--100vw', `${vw}px`);
  document.documentElement.style.setProperty('--100vh', `${vh}px`);
  document.documentElement.style.setProperty('--10vh', `${vh / 10}px`);
  store.dispatch(setScreen({ width: vw, height: vh }));
};
