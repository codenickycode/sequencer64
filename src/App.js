import React from 'react';
import * as Tone from 'tone';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { LoginPage } from './features/Login/LoginPage';
import { SequencerPage } from './features/Sequencer/Sequencer';
import { StatusBar } from './features/StatusBar/StatusBar';
import ErrorBoundary from './ErrorBoundary';
import ErrorHandler from './features/ErrorHandler';

export default function App() {
  // console.log('rendering: App');
  return (
    <BrowserRouter basename='/'>
      <ErrorBoundary>
        <Switch>
          <Route
            path='/'
            exact
            render={() => <Redirect to='/sequencer/session' />}
          />
          <Route path='/sequencer/:shared' render={() => <SequencerPage />} />
          <Route path='/login' component={LoginPage} />
          <Route path='/error/' component={ErrorHandler} />
        </Switch>
        <StatusBar />
      </ErrorBoundary>
    </BrowserRouter>
  );
}

const initialClick = async () => {
  await Tone.start();
  console.log('audio ready');
  document.removeEventListener('click', initialClick);
};
document.addEventListener('click', initialClick);

Tone.getDestination().volume.value = -12;

window.addEventListener('orientationchange', resize);
window.addEventListener('blur', () => {
  window.addEventListener('focus', resize);
});

function resize() {
  document.body.style.display = 'none';
  setTimeout(function () {
    document.body.style.display = 'initial';
  }, 10);
  window.removeEventListener('focus', resize);
}
