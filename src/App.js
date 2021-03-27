import React, { useEffect } from 'react';
import * as Tone from 'tone';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { LoginPage } from './features/Login/LoginPage';
import { SequencerPage } from './features/Sequencer/Sequencer';
import { StatusBar } from './features/StatusBar/StatusBar';
import ErrorBoundary from './ErrorBoundary';
import ErrorHandler from './features/ErrorHandler';
import { useDispatch } from 'react-redux';
import { getUser } from './reducers/appSlice';

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    console.log('getting user');
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log('rendering: App');
  return (
    <Router>
      <ErrorBoundary>
        <Switch>
          <Route path='/' exact component={SequencerPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/error/' component={ErrorHandler} />
        </Switch>
        <StatusBar />
      </ErrorBoundary>
    </Router>
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
