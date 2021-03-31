import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadSequence } from 'App/Sequencer/LoadSave/LoadSequence';
import { SaveSequence } from 'App/Sequencer/LoadSave/SaveSequence';
import { setShow } from 'App/reducers/appSlice';
import { Button } from 'App/shared/Button';
import { LoginSection } from './LoginSection';
import { useFadeIn } from 'utils/useFadeIn';

export const LoadSaveSequence = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.show);
  const showLoadSave = show === 'save' || show === 'load';
  const { fadeInClass, fadeOutThen } = useFadeIn(showLoadSave);

  const loadSaveSequenceMemo = useMemo(() => {
    const onClose = () => fadeOutThen(() => dispatch(setShow('')));
    return (
      <>
        <div className={'load-save-sequence' + fadeInClass}>
          <Tabs show={show} />
          <LoginSection />
          {show === 'save' && <SaveSequence />}
          {show === 'load' && <LoadSequence />}
        </div>
        <div className={'bottom-btn' + fadeInClass}>
          <Button classes='load-save-sequence-close' onClick={onClose}>
            Close
          </Button>
        </div>
      </>
    );
  }, [dispatch, fadeInClass, fadeOutThen, show]);
  return showLoadSave ? loadSaveSequenceMemo : null;
};

const Tabs = ({ show }) => {
  const dispatch = useDispatch();
  const changeTab = ({ target: { value } }) => {
    dispatch(setShow(value));
  };
  let loadClasses = 'load-save-tab';
  let saveClasses = loadClasses;
  if (show === 'load') loadClasses += ' selected';
  if (show === 'save') saveClasses += ' selected';
  return (
    <div className='load-save-tabs'>
      <input
        type='button'
        id='load-tab'
        className={loadClasses}
        value='load'
        aria-label='load'
        onClick={changeTab}
      ></input>
      <input
        type='button'
        id='save-tab'
        className={saveClasses}
        value='save'
        aria-label='save'
        onClick={changeTab}
      ></input>
    </div>
  );
};
