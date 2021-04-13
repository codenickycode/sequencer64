import { MODES } from 'App/reducers/editorSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Display = () => {
  const theme = useSelector((state) => state.app.theme);
  const splitSamplePanel = useSelector(
    (state) => state.screen.splitSamplePanel
  );
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const mode = useSelector((state) => state.editor.mode);

  const tapping = mode === MODES.TAP || mode === MODES.TAP_RECORD;

  useEffect(() => {
    const spBorder = document.getElementById('samplePanelBorder');
    if (spBorder) {
      if (tapping) spBorder.classList.add('highlight');
      if (!tapping) spBorder.classList.remove('highlight');
    }
  }, [tapping]);

  useEffect(() => {
    if (!splitSamplePanel && analyzerOn) {
      const analyzer = document.getElementById('analyzer');
      if (mode === MODES.INIT || tapping) {
        if (analyzer) analyzer.style.opacity = 1;
      }
      if (mode !== MODES.INIT && !tapping) {
        if (analyzer) analyzer.style.opacity = 0;
      }
    }
  });

  useEffect(() => {
    document.getElementById('root').className = `theme${theme}`;
  }, [theme]);

  return null;
};
