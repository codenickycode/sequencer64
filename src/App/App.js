import React from 'react';
import * as Tone from 'tone';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'App/ErrorBoundary/ErrorBoundary';
import { Subscriptions } from 'App/Subscriptions';
import { KitProvider } from 'App/shared/KitProvider';
import { Provider } from 'react-redux';
import store from 'App/store';
import { setLog, setOnline } from 'App/reducers/appSlice';
import { setWidthAndHeight } from 'utils/calcScreen';
import { startTone } from './reducers/thunks/toneThunks';
import { AppContent } from './AppContent';

export default function App() {
  // console.log('rendering: App');

  return (
    <BrowserRouter basename='/'>
      <ErrorBoundary>
        <Provider store={store}>
          <KitProvider>
            <AppContent />
            <Subscriptions />
          </KitProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

window.log = (message) => store.dispatch(setLog(message));
window.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

window.addEventListener('online', () => store.dispatch(setOnline(true)));
window.addEventListener('offline', () => store.dispatch(setOnline(false)));

const initialClick = async () => {
  store.dispatch(startTone());
  document.removeEventListener('touchstart', initialClick);
  document.removeEventListener('mousedown', initialClick);
};
document.addEventListener('touchstart', initialClick);
document.addEventListener('mousedown', initialClick);

Tone.getDestination().volume.value = -12;

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', afterRotate);
window.addEventListener('blur', () => {
  window.addEventListener('focus', redraw);
});

let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  document.body.style.display = 'none';
  resizeTimer = setTimeout(redraw, 350);
}

function afterRotate() {
  redraw();
  window.location.reload();
}

function redraw() {
  document.body.style.display = 'none';
  setTimeout(function () {
    document.body.style.display = 'initial';
    setWidthAndHeight();
  }, 100);
  window.removeEventListener('focus', redraw);
}
setWidthAndHeight();
