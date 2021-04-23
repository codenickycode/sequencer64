import React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import ErrorBoundary from 'App/ErrorBoundary/ErrorBoundary';
import { Subscriptions } from 'App/Subscriptions';
import { Provider } from 'react-redux';
import store from 'App/store';
import { setLog } from 'App/reducers/appSlice';
import { StatusBar } from './StatusBar/StatusBar';
import { Preparing } from './shared/Preparing/Preparing';
import { SequencerPage } from './Sequencer/Sequencer';
import { ChangeKit } from './Sequencer/MainSection/ChangeKit/ChangeKit';
import { LoadSave } from './Sequencer/LoadSave/LoadSave';
import { LoginPage } from './Login/LoginPage';
import { InfoPage } from './Info/InfoPage';
import { MainMixer } from './Sequencer/MainSection/Mixer/MainMixer';
import { SampleMixer } from './Sequencer/MainSection/Mixer/SampleMixer';
import { PATHS } from 'hooks/useGoTo';

export default function App() {
  return (
    <BrowserRouter basename='/'>
      <ErrorBoundary>
        <Provider store={store}>
            <AppContent />
            <Subscriptions />
        </Provider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

const AppContent = () => {
  return (
    <>
      <Route path='/' exact render={() => <Redirect to={PATHS.BASE} />} />
      <Route path='/sequencer/:shared' component={SequencerPage} />
      <Route path={PATHS.CHANGE_KIT} component={ChangeKit} />
      <Route path={PATHS.GLOBAL_MIXER} component={MainMixer}/>
      <Route path={PATHS.SAMPLE_MIXER} component={SampleMixer}/>
      <Route path={PATHS.LOAD} render={() => <LoadSave tab='load' />} />
      <Route path={PATHS.SAVE} render={() => <LoadSave tab='save' />} />
      <Route path={PATHS.LOGIN} component={LoginPage} />
      <Route path={PATHS.INFO} component={InfoPage} />
      <StatusBar />
      <Preparing />
    </>
  );
};


window.log = (message) => store.dispatch(setLog(message));