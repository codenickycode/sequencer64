import { MODES } from 'App/reducers/editorSlice';
import { useAbstractState } from 'App/reducers/useAbstractState/useAbstractState';
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
  const { started, editorMode, editing } = useAbstractState();
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const countIn = useSelector((state) => state.tone.countIn);

  const [countInClasses, setCountInClasses] = useState('countIn');
  useEffect(() => {
    if (countIn) {
      setCountInClasses('countIn show');
      setTimeout(() => setCountInClasses('countIn'), 100);
    }
  }, [countIn]);

  const [infoText, setInfoText] = useState(INFO_TEXT[editorMode]);
  useEffect(() => {
    if (started) setInfoText('');
    else setInfoText(INFO_TEXT[editorMode]);
  }, [editorMode, started]);

  const [infoTextClasses, setInfoTextClasses] = useState('infoText');
  useEffect(() => {
    setInfoTextClasses('infoText show');
    setTimeout(() => setInfoTextClasses('infoText'), 3000);
  }, [infoText]);

  const flashInfo = useSelector((state) => state.app.flashInfo);
  useEffect(() => {
    if (flashInfo) setInfoTextClasses('infoText show');
    setTimeout(() => setInfoTextClasses('infoText'), 3000);
  }, [flashInfo]);

  let showInfo = !editing;
  if (started && analyzerOn) showInfo = false;
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
