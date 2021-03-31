import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LoadSequence } from 'App/Sequencer/LoadSave/LoadSequence';
import { SaveSequence } from 'App/Sequencer/LoadSave/SaveSequence';
import { setShow } from 'App/reducers/appSlice';
import { Button } from 'App/shared/Button';
import { LoginSection } from './LoginSection';

export const LoadSaveSequence = () => {
  const dispatch = useDispatch();

  const show = useSelector((state) => state.app.show);

  const loadSaveSequenceMemo = useMemo(() => {
    const changeTab = (type) => {
      dispatch(setShow(type));
    };

    const onClose = () => dispatch(setShow(''));

    let loadStyle = 'load-save-tab';
    let saveStyle = loadStyle;
    if (show === 'load') loadStyle += ' selected';
    if (show === 'save') saveStyle += ' selected';

    // console.log('rendering: LoadSaveSequence');
    return (
      <>
        <div
          className={show ? 'load-save-sequence show' : 'load-save-sequence'}
        >
          <div className='load-save-tabs'>
            <button
              id='load-tab'
              className={loadStyle}
              onClick={() => changeTab('load')}
            >
              <label htmlFor='load-tab'>Load</label>
            </button>
            <button
              id='save-tab'
              className={saveStyle}
              onClick={() => changeTab('save')}
            >
              <label htmlFor='save-tab'>Save</label>
            </button>
          </div>
          <LoginSection />
          {show === 'save' && <SaveSequence />}
          {show === 'load' && <LoadSequence />}
        </div>
        <div className={show ? 'bottom-btn show' : 'bottom-btn'}>
          <Button classes='load-save-sequence-close' onClick={onClose}>
            Close
          </Button>
        </div>
      </>
    );
  }, [dispatch, show]);
  return loadSaveSequenceMemo;
};
