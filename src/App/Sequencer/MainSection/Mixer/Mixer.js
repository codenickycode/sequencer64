import cuid from 'cuid';
import React from 'react';
import { Portal } from 'App/shared/Portal';
import { getGrid } from 'utils/getGrid';
import { Button } from 'App/shared/Button';

export const Mixer = () => {
  const grid = getGrid(9);
  return (
    <Portal targetId='overGridPortal'>
      <div id='mixer' className='mixer'>
        <div className='mixSamples'>
          {grid.map((i) => {
            return <MixSample key={cuid.slug()} i={i} />;
          })}
        </div>
      </div>
    </Portal>
  );
};

const MixSample = ({ i }) => {
  const id = `mixSample${i}`;
  return (
    <div id={id} className='mixSample'>
      <Button />
      <div className={`mixSampleBorder border${i}`} />
    </div>
  );
};
