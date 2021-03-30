import React from 'react';

export const Preparing = () => {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid.push(i);
  }
  return (
    <div className='preparing'>
      <div className='preparing-grid'>
        {grid.map((i) => (
          <div key={`preparing-cell-${i}`} className='preparing-cell'>
            <div className={`bg-color bg${i}`} />
          </div>
        ))}
      </div>
      <h1 className='preparing-header'>preparing...</h1>
    </div>
  );
};
