import React, { useMemo } from 'react';
import { LoadSequence } from './LoadSequence';
import { SaveSequence } from './SaveSequence';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setShow } from '../../../../reducers/appSlice';
import { stopSequence } from '../../reducers/toneSlice';
import { Button } from '../../../../components/Button';

export const LoadSaveSequence = () => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.app.user.username);

  const show = useSelector((state) => state.app.show);
  const fetching = useSelector((state) => state.app.fetching);

  const loadSaveSequenceMemo = useMemo(() => {
    const changeTab = (type) => {
      dispatch(setShow(type));
    };

    const onLogout = () => dispatch(logout());

    const onClose = () => dispatch(setShow(''));

    const handleStopSequence = () => {
      dispatch(stopSequence());
    };

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
          {username && (
            <>
              <div className='login-status'>
                {fetching ? (
                  <p>please wait...</p>
                ) : (
                  <p>Logged in as: {username}</p>
                )}
                <button disabled={fetching} onClick={onLogout}>
                  logout
                </button>
              </div>
            </>
          )}
          {show === 'save' && (
            <SaveSequence handleStopSequence={handleStopSequence} />
          )}
          {show === 'load' && (
            <LoadSequence handleStopSequence={handleStopSequence} />
          )}
        </div>
        <div className={show ? 'bottom-btn show' : 'bottom-btn'}>
          <Button classes='load-save-sequence-close' onClick={onClose}>
            Close
          </Button>
        </div>
      </>
    );
  }, [dispatch, fetching, show, username]);
  return loadSaveSequenceMemo;
};
