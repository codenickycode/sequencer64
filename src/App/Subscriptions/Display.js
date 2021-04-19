import { areWeTapping } from 'App/reducers/abstractState/abstractEditorState';
import { setFlashInfo } from 'App/reducers/appSlice';
import { startAnalyzer, stopAnalyzer } from 'App/reducers/functions/animations';
import { setAnalyzerOn } from 'App/reducers/screenSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const Display = () => {
  const dispatch = useDispatch();
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const transportStarted = useSelector((state) => state.tone.transportState === 'started');
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const editing = useSelector((state) => state.editor.selectedSample !== -1);
  const tapping = useSelector((state) => areWeTapping(state.editor.mode));

  useHighlightSamplePanelIfTapping(tapping);
  useTurnOnAnalyzerIfDeviceBigEnough(splitSamplePanel, analyzerOn, dispatch);
  useHideAnalyzerWhileEditingOnSmallDevice(splitSamplePanel, analyzerOn, editing);
  useStartAndStopAnalyzerAnimation(analyzerOn, tapping, transportStarted);
  useFlashInfoWhenAnalyzerStops(dispatch, transportStarted);

  useChangeTheme();

  return null;
};
const useChangeTheme = () => {
  const theme = useSelector((state) => state.app.theme);

  useEffect(() => {
    document.getElementById('root').className = `theme${theme}`;
  }, [theme]);
  return null;
};

const useHighlightSamplePanelIfTapping = (tapping) => {
  useEffect(() => {
    const spBorder = document.getElementById('sampleBtnsBorder');
    if (!spBorder) return;
    if (tapping) spBorder.classList.add('highlight');
    if (!tapping) spBorder.classList.remove('highlight');
  }, [tapping]);

  return null;
};

const useTurnOnAnalyzerIfDeviceBigEnough = (splitSamplePanel, analyzerOn, dispatch) => {
  useEffect(() => {
    if (splitSamplePanel && analyzerOn === null) {
      dispatch(setAnalyzerOn(true));
    }
  }, [splitSamplePanel, analyzerOn, dispatch]);

  return null;
};

const useHideAnalyzerWhileEditingOnSmallDevice = (splitSamplePanel, analyzerOn, editing) => {
  useEffect(() => {
    if (splitSamplePanel || !analyzerOn) return;
    const analyzer = document.getElementById('analyzer');
    if (!analyzer) return;
    if (!editing) analyzer.style.opacity = 1;
    if (editing) analyzer.style.opacity = 0;
  }, [analyzerOn, editing, splitSamplePanel]);

  return null;
};

const useStartAndStopAnalyzerAnimation = (analyzerOn, transportStarted, tapping) => {
  useEffect(() => {
    if (!analyzerOn) return;
    if (transportStarted) startAnalyzer();
    else if (!transportStarted && !tapping) stopAnalyzer();
  }, [analyzerOn, tapping, transportStarted]);

  return null;
};

const useFlashInfoWhenAnalyzerStops = (dispatch, transportStarted) => {
  useEffect(() => {
    if (!transportStarted) {
      dispatch(setFlashInfo(true));
      setTimeout(() => dispatch(setFlashInfo(false)), 0);
    }
  }, [dispatch, transportStarted]);

  return null;
};
