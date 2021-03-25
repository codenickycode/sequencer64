import React from 'react';
import { LoadSequence } from './LoadSequence';
import { SaveSequence } from './SaveSequence';
import { useDispatch, useSelector } from 'react-redux';
import { logout, setShow } from '../../../../reducers/appSlice';
import { setTransportState } from '../../reducers/toneSlice';

export const LoadSaveSequence = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.app.user);

  const show = useSelector((state) => state.app.show);
  const fetching = useSelector((state) => state.app.fetching);

  const changeTab = (type) => {
    dispatch(setShow(type));
  };

  const onLogout = () => dispatch(logout());

  const onClose = () => dispatch(setShow(''));

  const stopSequencer = () => {
    dispatch(setTransportState('stopped'));
  };

  let loadStyle = 'load-save-tab';
  let saveStyle = loadStyle;
  if (show === 'load') loadStyle += ' selected';
  if (show === 'save') saveStyle += ' selected';

  // console.log('rendering: LoadSaveSequence');
  return (
    <>
      <div className={show ? 'load-save-sequence show' : 'load-save-sequence'}>
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
        {user.username && (
          <>
            <div className='login-status'>
              {fetching ? (
                <p>Logging out...</p>
              ) : (
                <p>Logged in as: {user.username}</p>
              )}
              <button disabled={fetching} onClick={onLogout}>
                logout
              </button>
            </div>
          </>
        )}
        {show === 'save' && <SaveSequence stopSequencer={stopSequencer} />}
        {show === 'load' && <LoadSequence stopSequencer={stopSequencer} />}
      </div>
      <div className={show ? 'bottom-btn show' : 'bottom-btn'}>
        <button className='load-save-sequence-close' onClick={onClose}>
          Close
        </button>
      </div>
    </>
  );
};
