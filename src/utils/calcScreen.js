import store from 'App/store';
import { setLandscape } from 'App/reducers/appSlice';

export const setWidthAndHeight = () => {
  let vw = document.documentElement.clientWidth;
  let vh = document.documentElement.clientHeight;
  document.documentElement.style.setProperty('--100vw', `${vw}px`);
  document.documentElement.style.setProperty('--100vh', `${vh}px`);
  document.documentElement.style.setProperty('--10vh', `${vh * 0.1}px`);
  document.documentElement.style.setProperty('--15vh', `${vh * 0.15}px`);
  store.dispatch(setLandscape(vw > vh));
};
