import { MODES, setMode } from 'App/reducers/editorSlice';
import { setAnalyzerMode, setAnalyzerOn } from 'App/reducers/screenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useAbstractState } from 'utils/hooks/useAbstractState';

export const useAnalyzerMenu = () => {
  const dispatch = useDispatch();
  const on = useSelector((state) => state.screen.analyzer.on);
  const currentMode = useSelector((state) => state.screen.analyzer.mode);
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const { editing } = useAbstractState();
  const showAnalyzer = !splitSamplePanel && !editing;

  const toggle = () => {
    const newOn = !on;
    dispatch(setAnalyzerOn(newOn));
    if (showAnalyzer) dispatch(setMode(MODES.INIT));
  };

  const changeMode = (newMode) => {
    if (newMode === currentMode) return;
    dispatch(setAnalyzerMode(newMode));
  };

  return { currentMode, changeMode, toggle, on };
};
