import {
  getSplitSamplePanel,
  setSplitSamplePanel,
  setAnalyzerOn,
} from 'App/reducers/appSlice';
import { MODES } from 'App/reducers/editorSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Display = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.app.theme);
  const splitSamplePanel = useSelector((state) => state.app.splitSamplePanel);
  const analyzerOn = useSelector((state) => state.app.analyzerOn);
  const mode = useSelector((state) => state.editor.mode);

  useEffect(() => {
    const newSplitSamplePanel = getSplitSamplePanel();
    if (newSplitSamplePanel !== splitSamplePanel)
      dispatch(setSplitSamplePanel(newSplitSamplePanel));
    if (newSplitSamplePanel && analyzerOn === null)
      dispatch(setAnalyzerOn(true));
  }, [analyzerOn, dispatch, splitSamplePanel]);

  useEffect(() => {
    if (!splitSamplePanel && analyzerOn) {
      const analyzer = document.getElementById('analyzer');
      if (!mode || mode === MODES.TAP) {
        if (analyzer) analyzer.style.display = 'initial';
      }
      if (mode && mode !== MODES.TAP) {
        if (analyzer) analyzer.style.display = 'none';
      }
    }
  });

  useEffect(() => {
    document.getElementById('root').className = `theme${theme}`;
  }, [theme]);
  return null;
};
