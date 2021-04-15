import { EDITOR_MODE_INFO, setInfo } from 'App/reducers/editorSlice';
import { useAbstractState } from 'App/reducers/useAbstractState/useAbstractState';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showAndHideClass } from 'utils/showAndHide';
import { Analyzer } from './Analyzer';

export const VisualPanel = () => {
  return (
    <div id='visualPanel' className='visualPanel'>
      <Info />
      <Analyzer />
    </div>
  );
};

const Info = () => {
  const dispatch = useDispatch();
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

  const infoText = useSelector((state) => state.editor.info);
  useEffect(() => {
    if (started) dispatch(setInfo(''));
    else dispatch(setInfo(EDITOR_MODE_INFO[editorMode]));
  }, [dispatch, editorMode, started]);

  const [infoTextClasses, setInfoTextClasses] = useState('infoText');

  useEffect(() => {
    showAndHideClass(setInfoTextClasses, 'infoText', 3000);
  }, [infoText]);

  const flashInfo = useSelector((state) => state.app.flashInfo);
  useEffect(() => {
    if (flashInfo) showAndHideClass(setInfoTextClasses, 'infoText', 3000);
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
