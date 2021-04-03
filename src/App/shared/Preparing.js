import React from 'react';

export const Preparing = () => {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid.push(i);
  }
  return (
    <div id='preparing' className='preparing'>
      <h1 className='header'>Sequencer64</h1>
      <div className='grid'>
        {grid.map((i) => (
          <div key={`preparing-cell-${i}`} className='cell'>
            <div className={`bg-color bg${i}`} />
          </div>
        ))}
      </div>
      <p className='messageContainer'>
        <span className='message'>preparing...</span>
      </p>
    </div>
  );
};
