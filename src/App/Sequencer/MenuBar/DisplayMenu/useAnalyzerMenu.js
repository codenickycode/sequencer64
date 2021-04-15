import { MODES, setMode } from 'App/reducers/editorSlice';
import { setAnalyzerMode, setAnalyzerOn } from 'App/reducers/screenSlice';
import { useDispatch, useSelector } from 'react-redux';

export const useAnalyzerMenu = () => {
  const dispatch = useDispatch();
  const on = useSelector((state) => state.screen.analyzer.on);
  const currentMode = useSelector((state) => state.screen.analyzer.mode);
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP || mode === MODES.TAP_RECORD;
  const showAnalyzer = !splitSamplePanel && mode !== MODES.INIT && !tapping;

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
