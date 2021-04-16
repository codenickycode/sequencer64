import { startAnalyzer } from 'App/reducers/functions/animations';
import { ANALYZER_MODES } from 'App/reducers/screenSlice';
import { areWeEditing } from 'App/reducers/useAbstractState/useEditorState';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getGrid } from 'utils/getGrid';

export const Analyzer = () => {
  const state = useAnalyzerState();
  const { classes, data } = useAnalyzerStyle(state);

  const grid = useMemo(() => getGrid(16), []);

  const memo = useMemo(() => {
    return (
      <div className={classes.analyzer}>
        {grid.map((i) => {
          return (
            <div
              key={`freq-${i + 3}`}
              className='freq'
              data-scalex={data.scaleX}
              data-scaley={data.scaleY}
              data-blur={data.blur}
              data-i={i}
            />
          );
        })}
      </div>
    );
  }, [classes.analyzer, data.blur, data.scaleX, data.scaleY, grid]);
  return memo;
};

const useAnalyzerState = () => {
  const state = {};
  state.splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  state.editorMode = useSelector((state) => state.editor.mode);
  state.editing = areWeEditing(state.editorMode);
  state.analyzerMode = useSelector((state) => state.screen.analyzer.mode);
  state.analyzerOn = useSelector((state) => state.screen.analyzer.on);

  if (state.analyzerOn) startAnalyzer();

  return state;
};

const useAnalyzerStyle = ({ analyzerMode, analyzerOn, splitSamplePanel, editing }) => {
  const memo = useMemo(() => {
    const data = {};
    data.scaleX = analyzerMode === ANALYZER_MODES.WAVE ? 0.2 : 1;
    data.scaleY = analyzerMode === ANALYZER_MODES.RIPPLE ? 1 : 0;
    data.blur = analyzerMode === ANALYZER_MODES.BARS ? 0 : 50;

    const classes = {};
    classes.analyzer = 'analyzer ' + analyzerMode;
    if (!splitSamplePanel) {
      classes.analyzer += ' bg3q';
      if (editing || !analyzerOn) classes.analyzer += ' hide';
    }

    return { classes, data };
  }, [analyzerMode, analyzerOn, editing, splitSamplePanel]);
  return memo;
};
