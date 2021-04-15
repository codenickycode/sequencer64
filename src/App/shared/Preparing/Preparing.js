import React from 'react';
import { Portal } from '../Portal';

export const Preparing = () => {
  let grid = [];
  for (let i = 0; i < 9; i++) {
    grid.push(i);
  }
  return (
    <Portal targetId='preparingPortal'>
      <div id='preparing' className='preparing'>
        <h1 className='prepHeader'>Sequencer64</h1>
        <div className='prepGrid'>
          {grid.map((i) => (
            <div key={`preparing-cell-${i}`} className='prepCell'>
              <div className={`prepBgColor prepBg${i}`} />
            </div>
          ))}
        </div>
        <p className='prepMsgContainer'>
          <span className='prepMsg'>preparing...</span>
        </p>
      </div>
    </Portal>
  );
};
