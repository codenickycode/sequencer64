import { MODES } from 'App/reducers/editorSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const Analyzer = () => {
  const splitSamplePanel = useSelector((state) => state.app.splitSamplePanel);
  const transportState = useSelector((state) => state.tone.transportState);
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;
  const analyzerOn = useSelector((state) => state.app.analyzerOn);

  let showOverlay = splitSamplePanel && (!mode || mode === MODES.TAP);
  if (transportState === 'started' && analyzerOn) showOverlay = false;

  const memo = useMemo(() => {
    return (
      <div
        id='analyzer'
        className={!splitSamplePanel ? 'analyzer overGrid' : 'analyzer'}
      >
        <div className={showOverlay ? 'overlay show' : 'overlay'}>
          {tapping ? (
            <p>Tap to play samples</p>
          ) : (
            <p>Select a sample to edit</p>
          )}
        </div>
        {analyzerOn && (
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
        )}
      </div>
    );
  }, [analyzerOn, showOverlay, splitSamplePanel, tapping]);
  return memo;
};

const grid = [];
for (let i = 0; i < 16; i++) {
  grid.push(i);
}
