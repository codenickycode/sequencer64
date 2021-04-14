import { MODES } from 'App/reducers/editorSlice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Analyzer } from './Analyzer';

export const VisualPanel = () => {
  return (
    <div id='visualPanel' className='visualPanel'>
      <Info />
      <Analyzer />
    </div>
  );
};

const INFO_TEXT = {
  [MODES.TAP]: 'Tap to play samples',
  [MODES.TAP_RECORD]: 'Tap to record samples',
  [MODES.INIT]: 'Select a sample to edit',
};

const Info = () => {
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const transportState = useSelector((state) => state.tone.transportState);
  const mode = useSelector((state) => state.editor.mode);
  const tapRecording = mode === MODES.TAP_RECORD;
  const tapping = mode === MODES.TAP;
  const countIn = useSelector((state) => state.tone.countIn);
  const flashInfo = useSelector((state) => state.app.flashInfo);
  let showInfo = mode === MODES.INIT || tapping || tapRecording;

  const [countInClasses, setCountInClasses] = useState('countIn');
  useEffect(() => {
    if (countIn) {
      setCountInClasses('countIn show');
      setTimeout(() => setCountInClasses('countIn'), 100);
    }
  }, [countIn]);

  const [infoText, setInfoText] = useState(INFO_TEXT[mode]);
  useEffect(() => {
    if (transportState === 'started') setInfoText('');
    else setInfoText(INFO_TEXT[mode]);
  }, [mode, transportState]);

  const [infoTextClasses, setInfoTextClasses] = useState('infoText');
  useEffect(() => {
    setInfoTextClasses('infoText show');
    setTimeout(() => setInfoTextClasses('infoText'), 2000);
  }, [infoText]);
  useEffect(() => {
    if (flashInfo) setInfoTextClasses('infoText show');
    setTimeout(() => setInfoTextClasses('infoText'), 2000);
  }, [flashInfo]);

  if (transportState === 'started' && analyzerOn) showInfo = false;
  return (
    <div className={showInfo ? 'info show' : 'info'}>
      {countIn ? (
        <p className={countInClasses}>{countIn}</p>
      ) : (
        <p className={infoTextClasses}>{infoText}</p>
      )}
    </div>
  );
};
