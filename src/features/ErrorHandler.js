import React from 'react';
import { Page } from '.';
import { ReactComponent as ErrorSVG } from '../img/error.svg';

export default function ErrorHandler() {
  const errors = [];
  for (let [k, v] of Object.entries(localStorage)) {
    errors.push([k, v]);
  }

  const returnHome = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <Page id='error-page' className='page transition show flex-col'>
      <h1>Oops!</h1>
      <h2>Something went wrong :(</h2>
      <ErrorSVG />
      <button className='btn' onClick={returnHome}>
        Return home
      </button>
    </Page>
  );
}
