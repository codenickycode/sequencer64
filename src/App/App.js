import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ErrorBoundary from 'App/ErrorBoundary/ErrorBoundary';
import { Subscriptions } from 'App/Subscriptions';
import { Provider } from 'react-redux';
import store from 'App/store';
import { setLog } from 'App/reducers/appSlice';
import { AppContent } from './AppContent';

export default function App() {
  // console.log('rendering: App');

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

window.log = (message) => store.dispatch(setLog(message));
window.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));