import { MODES, setMode } from 'App/reducers/editorSlice';
import { setAnalyzerMode, setAnalyzerOn } from 'App/reducers/screenSlice';
import { useDispatch, useSelector } from 'react-redux';
import { areWeEditing } from 'App/reducers/useAbstractState/useEditorState';

export const useAnalyzerMenu = () => {
  const dispatch = useDispatch();
  const editing = useSelector((state) => areWeEditing(state.editor.mode));
  const on = useSelector((state) => state.screen.analyzer.on);
  const currentMode = useSelector((state) => state.screen.analyzer.mode);
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);

  const forceShowAnalyzer = !splitSamplePanel && editing;

  const toggle = () => {
    const newOn = !on;
    dispatch(setAnalyzerOn(newOn));
    if (newOn && forceShowAnalyzer) dispatch(setMode(MODES.INIT));
  };

  const changeMode = (newMode) => {
    if (newMode === currentMode) return;
    dispatch(setAnalyzerMode(newMode));
  };

  return { currentMode, changeMode, toggle, on };
};
