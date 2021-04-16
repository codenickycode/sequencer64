import { MODES } from 'App/reducers/editorSlice';
import { startAnalyzer, stopAnalyzer } from 'App/reducers/functions/animations';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Display = () => {
  const theme = useSelector((state) => state.app.theme);
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const transportState = useSelector((state) => state.tone.transportState);
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const mode = useSelector((state) => state.editor.mode);

  const tapping = mode === MODES.TAP || mode === MODES.TAP_RECORD;

  useEffect(() => {
    const spBorder = document.getElementById('samplePanelBorder');
    if (!spBorder) return;
    if (tapping) spBorder.classList.add('highlight');
    if (!tapping) spBorder.classList.remove('highlight');
  }, [tapping]);

  useEffect(() => {
    if (splitSamplePanel || !analyzerOn) return;
    const analyzer = document.getElementById('analyzer');
    if (!analyzer) return;
    if (mode === MODES.INIT || tapping) analyzer.style.opacity = 1;
    if (mode !== MODES.INIT && !tapping) analyzer.style.opacity = 0;
  });

  useEffect(() => {
    if (!analyzerOn) return;
    if (transportState === 'started') startAnalyzer();
    else if (transportState !== 'started' && !tapping) stopAnalyzer();
  }, [analyzerOn, tapping, transportState]);

  useEffect(() => {
    document.getElementById('root').className = `theme${theme}`;
  }, [theme]);

  return null;
};
