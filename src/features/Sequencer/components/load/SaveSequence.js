import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
import { setStatus, updateSequences } from '../../../../reducers/appSlice';
import ObjectID from 'bson-objectid';
import { getStrFromPattern } from '../../reducers/functions/sequence';
import { HOST } from '../../../../network';

export const SaveSequence = () => {
  const dispatch = useDispatch();

  //! ? Does this cause a bunch of re-renders or just one ????????????????????????????????
  const bpm = useSelector((state) => state.sequence.present.bpm);
  const length = useSelector((state) => state.sequence.present.length);
  const pattern = useSelector((state) => state.sequence.present.pattern);
  const kit = useSelector((state) => state.sequence.present.kit);

  const online = useSelector((state) => state.app.online);
  const loggedIn = useSelector((state) => state.app.user.loggedIn);
  const fetching = useSelector((state) => state.app.fetching);

  const [newName, setNewName] = useState('');
  const [newId, setNewId] = useState('');

  const error = useSelector((state) => state.app.error);

  const [userError, setUserError] = useState('');

  useEffect(() => {
    setUserError(error);
  }, [error]);

  const [link, setLink] = useState('');

  const confirmation = useSelector((state) => state.app.confirmation);

  useEffect(() => {
    if (confirmation.match(/cloud/)) {
      setLink(`${HOST}/sequence/${newId}`);
    }
  }, [newId, confirmation]);

  const copyLink = () => {
    try {
      const copyText = document.getElementById('sequence-link');
      copyText.select();
      copyText.setSelectionRange(0, 99999); /* For mobile devices */
      document.execCommand('copy');
      dispatch(setStatus('Link copied to clipboard'));
    } catch (e) {
      console.log(e);
    }
  };

  const save = async (e) => {
    e.preventDefault();
    if (!newName) return setUserError('name required');
    const newId = ObjectID().toHexString();
    setNewId(newId);
    const cleanName = newName.replace(/[^a-zA-Z0-9 ]/g, '');
    const newSequence = {
      _id: newId,
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
        {loggedIn && online && confirmation && (
          <div className='share-div'>
            <p>share your sequence:</p>
            <input type='text' value={link} id='sequence-link' />
            <Button id='copy-link' onClick={copyLink}>
              <label htmlFor='copy-link'>copy</label>
            </Button>
          </div>
        )}
      </div>
      <form id='save-form' onSubmit={save}>
        <h1 className='sequence-title'>Save & Share</h1>

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
