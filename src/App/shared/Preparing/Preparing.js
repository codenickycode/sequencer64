import React, { useMemo } from 'react';
import { getGrid } from 'utils/getGrid';
import { Button } from '../Button';
import { Portal } from '../Portal';

export const Preparing = ({
  message = 'preparing...',
  targetId = 'preparingPortal',
  cancel,
}) => {
  const grid = useMemo(() => getGrid(9), []);
  return (
    <Portal targetId={targetId}>
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
          <span className='prepMsg'>{message}</span>
        </p>
        {cancel && <Button onClick={cancel}>cancel</Button>}
      </div>
    </Portal>
  );
};
