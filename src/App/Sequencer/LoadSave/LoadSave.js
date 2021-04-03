import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Load } from 'App/Sequencer/LoadSave/Load/Load';
import { Save } from 'App/Sequencer/LoadSave/Save/Save';
import { setShow } from 'App/reducers/appSlice';
import { Button } from 'App/shared/Button';
import { LoginSection } from './LoginSection';
import { useFadeIn } from 'utils/useFadeIn';

export const LoadSave = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.app.show);
  const showLoadSave = show === 'save' || show === 'load';
  const { fadeInClass, fadeOutThen } = useFadeIn(showLoadSave);

  const loadSaveSequenceMemo = useMemo(() => {
    const onClose = () => fadeOutThen(() => dispatch(setShow('')));
    return (
      <>
        <div className={'loadSave' + fadeInClass}>
          <Tabs show={show} />
          <LoginSection />
          {show === 'save' && <Save />}
          {show === 'load' && <Load />}
        </div>
        <div className={'bottomBtn' + fadeInClass}>
          <Button onClick={onClose}>Close</Button>
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
  let loadClasses = 'tab';
  let saveClasses = loadClasses;
  if (show === 'load') loadClasses += ' selected';
  if (show === 'save') saveClasses += ' selected';
  return (
    <div className='tabs'>
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
