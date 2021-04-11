import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const Analyzer = () => {
  const transportState = useSelector((state) => state.tone.transportState);
  const mode = useSelector((state) => state.editor.mode);
  const hideOverlay = transportState === 'started' || mode;
  const memo = useMemo(() => {
    return (
      <div className='analyzer'>
        <div className={hideOverlay ? 'overlay' : 'overlay show'}>
          <p>Select a sample to edit</p>
        </div>
        <div className='freqs'>
          {grid.map((i) => {
            return (
              <div
                key={`freq-${i + 3}`}
                className='freq'
                style={{ '--order': i }}
              />
            );
          })}
        </div>
      </div>
    );
  }, [hideOverlay]);
  return memo;
};

const grid = [];
for (let i = 0; i < 16; i++) {
  grid.push(i);
}
