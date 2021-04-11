import {
  getSplitSamplePanel,
  setSplitSamplePanel,
  setAnalyzerOn,
  setShowDisplayMenu,
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
  const showDisplayMenu = useSelector((state) => state.app.showDisplayMenu);

  useEffect(() => {
    if (!showDisplayMenu) return;
    function closeDisplayMenu(e) {
      if (
        !e.target.classList.contains('displayMenuBtn') &&
        !e.target.classList.contains('displayMenuSub')
      )
        dispatch(setShowDisplayMenu(false));
    }

    document.addEventListener('click', closeDisplayMenu);
    return () => {
      document.removeEventListener('click', closeDisplayMenu);
    };
  }, [dispatch, showDisplayMenu]);

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
        if (analyzer) analyzer.style.opacity = 1;
      }
      if (mode && mode !== MODES.TAP) {
        if (analyzer) analyzer.style.opacity = 0;
      }
    }
  });

  useEffect(() => {
    document.getElementById('root').className = `theme${theme}`;
  }, [theme]);
  return null;
};
