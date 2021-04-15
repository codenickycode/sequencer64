import { startAnalyzer } from 'App/reducers/functions/animations';
import { ANALYZER_MODES } from 'App/reducers/screenSlice';
import { useEditorState } from 'App/reducers/useAbstractState/useEditorState';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getGrid } from 'utils/getGrid';

export const Analyzer = () => {
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const { editing } = useEditorState();

  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  if (analyzerOn) startAnalyzer();

  const analyzerMode = useSelector((state) => state.screen.analyzer.mode);
  const scaleX = analyzerMode === ANALYZER_MODES.WAVE ? 0.2 : 1;
  const scaleY = analyzerMode === ANALYZER_MODES.RIPPLE ? 1 : 0;
  const blur = analyzerMode === ANALYZER_MODES.BARS ? 0 : 50;

  const memo = useMemo(() => {
    const grid = getGrid(16);
    let analyzerClasses = 'analyzer ' + analyzerMode;
    if (!splitSamplePanel) {
      analyzerClasses += ' bg3q';
      if (editing || !analyzerOn) analyzerClasses += ' hide';
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
  }, [analyzerMode, analyzerOn, blur, editing, scaleX, scaleY, splitSamplePanel]);
  return memo;
};
