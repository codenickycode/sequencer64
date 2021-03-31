import React from 'react';

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
    <div id='error-page' className='page transition show flex-col'>
      <h1>Oops!</h1>
      <h2>Something went wrong :(</h2>

      <button className='btn' onClick={returnHome}>
        Return home
      </button>
    </div>
  );
}
