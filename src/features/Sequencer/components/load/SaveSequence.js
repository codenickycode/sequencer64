import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setFetching } from '../../../../reducers/appSlice';
import { saveSequence } from '../../reducers/sequenceSlice';

export const SaveSequence = ({ stopSequencer }) => {
  const dispatch = useDispatch();

  const bpm = useSelector((state) => state.sequence.present.bpm);
  const length = useSelector((state) => state.sequence.present.length);
  const pattern = useSelector((state) => state.sequence.present.pattern);
  const kit = useSelector((state) => state.sequence.present.kit);

  const user = useSelector((state) => state.app.user);
  const fetching = useSelector((state) => state.app.fetching);

  const [newName, setNewName] = useState('');

  const [confirmation, setConfirmation] = useState('');
  useEffect(() => {
    let timeout = setTimeout(() => setConfirmation(''), 3000);
    return () => clearTimeout(timeout);
  }, [confirmation]);

  const [error, setError] = useState('');
  useEffect(() => {
    let timeout = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  const save = async (e) => {
    e.preventDefault();
    if (!newName) return setError('name required');
    const cleanName = newName.replace(/[^a-zA-Z0-9 ]/g, '');
    const newSequence = {
      name: cleanName,
      kit,
      bpm,
      length,
      pattern,
    };
    setNewName('');
    try {
      dispatch(setFetching(true));
      await dispatch(saveSequence(newSequence));
      setConfirmation('Sequence saved!');
    } catch (e) {
      console.log('Save Sequence ERROR ->\n', e);
      setError('Server error: please try again later.');
    } finally {
      dispatch(setFetching(false));
    }
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
              placeholder='Enter sequence name'
            />
            <button type='submit' disabled={!newName}>
              Save
            </button>
          </div>
        </form>
      )}
      {user.username && (
        <p className={error ? 'error' : 'confirmation'}>
          {error ? error : confirmation}
        </p>
      )}
    </div>
  );
};
