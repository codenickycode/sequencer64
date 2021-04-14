import { MODES } from 'App/reducers/editorSlice';
import { ANALYZER_MODES } from 'App/reducers/screenSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const VisualPanel = () => {
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const mode = useSelector((state) => state.editor.mode);

  let visualPanelClasses = 'visualPanel';
  if (!splitSamplePanel) {
    visualPanelClasses += ' overGrid';
    if (analyzerOn && mode === MODES.INIT)
      visualPanelClasses += ' overGrid show';
  }
  const memo = useMemo(() => {
    return (
      <div id='visualPanel' className={visualPanelClasses}>
        <Info />
        <Analyzer />
      </div>
    );
  }, [visualPanelClasses]);
  return memo;
};

const Info = () => {
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const transportState = useSelector((state) => state.tone.transportState);
  const mode = useSelector((state) => state.editor.mode);
  const tapRecording = mode === MODES.TAP_RECORD;
  const tapping = mode === MODES.TAP;
  let showInfo =
    splitSamplePanel && (mode === MODES.INIT || tapping || tapRecording);
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
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const analyzerMode = useSelector((state) => state.screen.analyzer.mode);
  const scaleX = analyzerMode === ANALYZER_MODES.WAVE ? 0.2 : 1;
  const scaleY = analyzerMode === ANALYZER_MODES.RIPPLE ? 1 : 0;
  const blur = analyzerMode === ANALYZER_MODES.BARS ? 0 : 50;

  const memo = useMemo(() => {
    const grid = [];
    for (let i = 0; i < 16; i++) {
      grid.push(i);
    }
    return (
      <div className={'analyzer ' + analyzerMode}>
        {grid.map((i) => {
          return (
            <div
              key={`freq-${i + 3}`}
              className='freq'
              data-scalex={scaleX}
              data-scaley={scaleY}
              data-blur={blur}
              data-i={i}
              style={{ '--order': i }}
            />
          );
        })}
      </div>
    );
  }, [analyzerMode, blur, scaleX, scaleY]);
  return analyzerOn ? memo : null;
};
