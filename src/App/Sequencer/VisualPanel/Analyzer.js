import { MODES } from 'App/reducers/editorSlice';
import { startAnalyzer } from 'App/reducers/functions/animations';
import { ANALYZER_MODES } from 'App/reducers/screenSlice';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const Analyzer = () => {
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const mode = useSelector((state) => state.editor.mode);
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  if (analyzerOn) startAnalyzer();

  const analyzerMode = useSelector((state) => state.screen.analyzer.mode);
  const scaleX = analyzerMode === ANALYZER_MODES.WAVE ? 0.2 : 1;
  const scaleY = analyzerMode === ANALYZER_MODES.RIPPLE ? 1 : 0;
  const blur = analyzerMode === ANALYZER_MODES.BARS ? 0 : 50;

  const editMode =
    mode !== MODES.INIT && mode !== MODES.TAP && mode !== MODES.TAP_RECORD;
  const hideOverGrid = !splitSamplePanel && !analyzerOn;
  const memo = useMemo(() => {
    const grid = [];
    for (let i = 0; i < 16; i++) {
      grid.push(i);
    }

    let analyzerClasses = 'analyzer ' + analyzerMode;
    if (!splitSamplePanel) {
      analyzerClasses += ' bg3q';
      if (editMode) analyzerClasses += ' hide';
    }
    return (
      <div className={analyzerClasses}>
        {grid.map((i) => {
          return (
            <div
              key={`freq-${i + 3}`}
              className='freq'
              data-scalex={scaleX}
              data-scaley={scaleY}
              data-blur={blur}
              data-i={i}
            />
          );
        })}
      </div>
    );
  }, [analyzerMode, blur, editMode, scaleX, scaleY, splitSamplePanel]);
  return hideOverGrid ? null : memo;
};
