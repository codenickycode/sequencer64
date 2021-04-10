import React from 'react';
import * as Tone from 'tone';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import { LoginPage } from 'App/Login/LoginPage';
import { SequencerPage } from 'App/Sequencer/Sequencer';
import { StatusBar } from 'App/StatusBar/StatusBar';
import ErrorBoundary from 'App/ErrorBoundary/ErrorBoundary';
import { Subscriptions } from 'App/Subscriptions';
import { KitProvider } from 'App/shared/KitProvider';
import { Provider } from 'react-redux';
import store from 'App/store';
import { setLog, setOnline } from 'App/reducers/appSlice';
import { setWidthAndHeight } from 'utils/calcScreen';
import { startTone } from './reducers/thunks/toneThunks';
import { ChangeKit } from './Sequencer/MainSection/ChangeKit';
import { LoadSave } from './Sequencer/LoadSave/LoadSave';
import { PATHS } from 'utils/useGoTo';

export default function App() {
  // console.log('rendering: App');
  return (
    <BrowserRouter basename='/'>
      <ErrorBoundary>
        <Provider store={store}>
          <KitProvider>
            <Route path='/' exact render={() => <Redirect to={PATHS.BASE} />} />
            <Route path='/sequencer/:shared' component={SequencerPage} />
            <Route path={PATHS.CHANGE_KIT} component={ChangeKit} />
            <Route path={PATHS.LOAD} render={() => <LoadSave tab='load' />} />
            <Route path={PATHS.SAVE} render={() => <LoadSave tab='save' />} />
            <Route path={PATHS.LOGIN} component={LoginPage} />
            <div id='themesPortal' />
            <div id='fullScreenPortal' />
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
  store.dispatch(startTone());
  document.removeEventListener('touchstart', initialClick);
  document.removeEventListener('mousedown', initialClick);
};
document.addEventListener('touchstart', initialClick);
document.addEventListener('mousedown', initialClick);

Tone.getDestination().volume.value = -12;

window.addEventListener('resize', handleResize);
window.addEventListener('orientationchange', afterResize);
window.addEventListener('blur', () => {
  window.addEventListener('focus', redraw);
});

let resizeTimer;
function handleResize() {
  clearTimeout(resizeTimer);
  document.body.style.display = 'none';
  resizeTimer = setTimeout(afterResize, 350);
}

function afterResize() {
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

window.log = (message) => store.dispatch(setLog(message));

window.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
