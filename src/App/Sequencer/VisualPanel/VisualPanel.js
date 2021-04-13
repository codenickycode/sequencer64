import { MODES } from 'App/reducers/editorSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const VisualPanel = () => {
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const analyzerOn = useSelector((state) => state.screen.analyzerOn);
  const mode = useSelector((state) => state.editor.mode);

  let visualPanelClasses = 'visualPanel';
  if (!splitSamplePanel) {
    visualPanelClasses += ' overGrid';
    if (analyzerOn && !mode) visualPanelClasses += ' overGrid show';
  }
  const memo = useMemo(() => {
    return (
      <div id='visualPanel' className={visualPanelClasses}>
        <Info analyzerOn={analyzerOn} />
        <Analyzer analyzerOn={analyzerOn} />
      </div>
    );
  }, [analyzerOn, visualPanelClasses]);
  return memo;
};

const Info = () => {
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const analyzerOn = useSelector((state) => state.screen.analyzerOn);
  const transportState = useSelector((state) => state.tone.transportState);
  const mode = useSelector((state) => state.editor.mode);
  const tapRecording = mode === MODES.TAP_RECORD;
  const tapping = mode === MODES.TAP;
  let showInfo = splitSamplePanel && (!mode || tapping || tapRecording);
  if (transportState === 'started' && analyzerOn) showInfo = false;
  return (
    <div className={showInfo ? 'overlay show' : 'overlay'}>
      {tapping && <p>Tap to play samples</p>}
      {tapRecording && <p>Tap to record samples</p>}
      {!tapping && !tapRecording && <p>Select a sample to edit</p>}
    </div>
  );
};

const Analyzer = () => {
  const analyzerOn = useSelector((state) => state.screen.analyzerOn);

  const memo = useMemo(() => {
    const grid = [];
    for (let i = 0; i < 16; i++) {
      grid.push(i);
    }
    return (
      <div className='analyzer'>
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
    );
  }, []);
  return analyzerOn ? memo : null;
};
