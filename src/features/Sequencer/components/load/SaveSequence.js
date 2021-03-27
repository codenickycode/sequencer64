import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button } from '../../../../components/Button';
import { updateSequences } from '../../../../reducers/appSlice';

export const SaveSequence = ({ stopSequencer }) => {
  const dispatch = useDispatch();

  const bpm = useSelector((state) => state.sequence.present.bpm);
  const length = useSelector((state) => state.sequence.present.length);
  const pattern = useSelector((state) => state.sequence.present.pattern);
  const kit = useSelector((state) => state.sequence.present.kit);

  const user = useSelector((state) => state.app.user);
  const fetching = useSelector((state) => state.app.fetching);

  const [newName, setNewName] = useState('');

  const error = useSelector((state) => state.app.error);
  const confirmation = useSelector((state) => state.app.confirmation);
  const [userError, setUserError] = useState('');
  useEffect(() => {
    setUserError(error);
  }, [error]);

  const save = async (e) => {
    e.preventDefault();
    if (!newName) return setUserError('name required');
    const cleanName = newName.replace(/[^a-zA-Z0-9 ]/g, '');
    const newSequence = {
      name: cleanName,
      kit,
      bpm,
      length,
      pattern,
    };
    setNewName('');
    dispatch(updateSequences('add', newSequence));
  };

  // console.log('rendering: SaveSequence');
  return (
    <div className='save-sequence'>
      {!user.username ? (
        <div className='sequence-select-group'>
          <div className='login-div'>
            <p className='sequence-select-sub'>
              {fetching ? 'Logging in...' : 'Login to save user sequences'}
            </p>
            <Link
              className='login-btn'
              onTouchStart={stopSequencer}
              to='/login'
              disabled={fetching}
            >
              {fetching ? 'x' : 'Login'}
            </Link>
          </div>
        </div>
      ) : (
        <form id='save-form' onSubmit={save}>
          <h1 className='sequence-title'>Save Sequence</h1>

          <div className='save-sequence-input'>
            <input
              type='text'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={fetching}
              placeholder={fetching ? 'saving...' : 'Enter sequence name'}
            />
            <Button type='submit' disabled={!newName}>
              Save
            </Button>
          </div>
        </form>
      )}
      {user.username && (
        <p className={userError ? 'error' : 'confirmation'}>
          {userError ? userError : confirmation}
        </p>
      )}
    </div>
  );
};
