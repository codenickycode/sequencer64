import React from 'react';
import * as Tone from 'tone';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from 'App/Login/LoginPage';
import { SequencerPage } from 'App/Sequencer/Sequencer';
import { StatusBar } from 'App/StatusBar/StatusBar';
import ErrorBoundary from 'App/ErrorBoundary/ErrorBoundary';
import ErrorHandler from 'App/ErrorBoundary/ErrorHandler';
import { Subscriptions } from 'App/Subscriptions';
import { KitProvider } from 'App/shared/KitProvider';
import { Provider } from 'react-redux';
import store from 'App/store';
import { setOnline } from 'App/reducers/appSlice';
import { setWidthAndHeight } from 'utils/calcScreen';
import debounce from 'utils/debounce';

export default function App() {
  // console.log('rendering: App');
  return (
    <BrowserRouter basename='/'>
      <ErrorBoundary>
        <Provider store={store}>
          <KitProvider>
            <div id='themesPortal' />
            <Switch>
              <Route
                path='/'
                exact
                render={() => <Redirect to='/sequencer/session' />}
              />
              <Route
                path='/sequencer/:shared'
                render={() => <SequencerPage />}
              />
              <Route path='/login' component={LoginPage} />
              <Route path='/error/' component={ErrorHandler} />
            </Switch>
            <StatusBar />
            <Subscriptions />
          </KitProvider>
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

window.addEventListener('online', () => store.dispatch(setOnline(true)));
window.addEventListener('offline', () => store.dispatch(setOnline(false)));

const initialClick = async () => {
  await Tone.start();
  console.log('audio ready');
  document.removeEventListener('click', initialClick);
};
document.addEventListener('click', initialClick);

Tone.getDestination().volume.value = -12;

window.addEventListener('resize', debounce(afterResize, 150));
window.addEventListener('orientationchange', afterResize);
window.addEventListener('blur', () => {
  window.addEventListener('focus', redraw);
});

function afterResize() {
  redraw();
  window.location.reload();
}

function redraw() {
  document.body.style.display = 'none';
  setTimeout(function () {
    document.body.style.display = 'initial';
    setWidthAndHeight();
  }, 10);
  window.removeEventListener('focus', redraw);
}
setWidthAndHeight();

document.addEventListener('gesturestart', function (e) {
  e.preventDefault();
  // special hack to prevent zoom-to-tabs gesture in safari
  document.body.style.zoom = 0.99;
});

document.addEventListener('gesturechange', function (e) {
  e.preventDefault();
  // special hack to prevent zoom-to-tabs gesture in safari
  document.body.style.zoom = 0.99;
});

document.addEventListener('gestureend', function (e) {
  e.preventDefault();
  // special hack to prevent zoom-to-tabs gesture in safari
  document.body.style.zoom = 0.99;
});
