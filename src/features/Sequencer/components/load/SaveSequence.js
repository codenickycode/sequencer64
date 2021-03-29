import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
import { updateSequences } from '../../../../reducers/appSlice';
import ObjectID from 'bson-objectid';
import { getStrFromPattern } from '../../reducers/functions/sequence';

export const SaveSequence = ({ handleStopSequence }) => {
  const dispatch = useDispatch();

  const bpm = useSelector((state) => state.sequence.present.bpm);
  const length = useSelector((state) => state.sequence.present.length);
  const pattern = useSelector((state) => state.sequence.present.pattern);
  const kit = useSelector((state) => state.sequence.present.kit);

  const loggedIn = useSelector((state) => state.app.user.loggedIn);
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
      _id: ObjectID().toHexString(),
      name: cleanName,
      kit,
      bpm,
      length,
      pattern: getStrFromPattern(pattern),
    };
    setNewName('');
    dispatch(updateSequences('save', newSequence));
  };

  // console.log('rendering: SaveSequence');
  return (
    <div className='save-sequence'>
      <div className='sequence-select-group'>
        {loggedIn && (
          <div className='share-div'>
            <p>share your sequence</p>
          </div>
        )}
      </div>
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
      <p className={userError ? 'error' : 'confirmation'}>
        {userError ? userError : confirmation}
      </p>
    </div>
  );
};
