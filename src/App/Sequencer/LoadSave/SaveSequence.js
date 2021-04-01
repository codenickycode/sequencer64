import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStatus, updateSequences } from 'App/reducers/appSlice';
import { getStrFromPattern } from 'App/reducers/functions/sequence';
import ObjectID from 'bson-objectid';
import { ORIGIN } from 'utils/network';
import { Share } from './Share';
import { Save } from './Save';

export const SaveSequence = () => {
  const dispatch = useDispatch();
  const app = useSelector((state) => state.app);
  const fileLimit = 20 - app.userSequences.length;

  const [link, setLink] = useState('');
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

  const [newName, setNewName] = useState('');
  const handleNewName = (e) => setNewName(e.target.value);
  const [newId, setNewId] = useState('');

  const [userError, setUserError] = useState('');
  useEffect(() => {
    setUserError(app.error);
  }, [app.error]);

  useEffect(() => {
    if (app.confirmation.match(/cloud/)) {
      setLink(`${ORIGIN}/sequencer/${newId}`);
    }
  }, [newId, app.confirmation]);

  const sequence = useSelector((state) => state.sequence.present);
  const save = async (e) => {
    e.preventDefault();
    if (!newName) return setUserError('name required');
    const newId = ObjectID().toHexString();
    setNewId(newId);
    const cleanName = newName.replace(/[^a-zA-Z0-9 ]/g, '');
    const newSequence = {
      _id: newId,
      name: cleanName,
      kit: sequence.kit,
      bpm: sequence.bpm,
      length: sequence.length,
      pattern: getStrFromPattern(sequence.pattern),
    };
    setNewName('');
    dispatch(updateSequences('save', newSequence));
  };
  // console.log('rendering: SaveSequence');
  return (
    <div className='save-sequence'>
      <Share
        link={link}
        copyLink={copyLink}
        online={app.online}
        loggedIn={app.user.loggedIn}
      />
      <Save
        userError={userError}
        fileLimit={fileLimit}
        confirmation={app.confirmation}
        online={app.online}
        loggedIn={app.user.loggedIn}
        save={save}
        newName={newName}
        handleNewName={handleNewName}
        fetching={app.fetching}
      />
    </div>
  );
};
