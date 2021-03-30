import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
import { setStatus, updateSequences } from '../../../../reducers/appSlice';
import ObjectID from 'bson-objectid';
import { getStrFromPattern } from '../../reducers/functions/sequence';
import { ORIGIN, TWITTER_URL, FACEBOOK_URL } from '../../../../network';
import { FacebookIcon, TwitterIcon } from '../../../../icons';

export const SaveSequence = () => {
  const dispatch = useDispatch();

  const bpm = useSelector((state) => state.sequence.present.bpm);
  const length = useSelector((state) => state.sequence.present.length);
  const pattern = useSelector((state) => state.sequence.present.pattern);
  const kit = useSelector((state) => state.sequence.present.kit);

  const online = useSelector((state) => state.app.online);
  const loggedIn = useSelector((state) => state.app.user.loggedIn);
  const fetching = useSelector((state) => state.app.fetching);
  const userSequences = useSelector((state) => state.app.userSequences);

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
      setLink(`${ORIGIN}/sequencer/${newId}`);
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

  const fileLimit = 20 - userSequences.length;
  // console.log('rendering: SaveSequence');
  return (
    <div className='save-sequence'>
      <div className='save-sequence-group'>
        <h1 className='save-header'>Share:</h1>
        <div className='share-div'>
          {!online ? (
            <p className='share-p dim-2'>Share unavailable while offline</p>
          ) : !loggedIn ? (
            <p className='share-p dim-2'>Share unavailable until logged in</p>
          ) : !link ? (
            <p className='share-p dim-2'>
              Save your sequence to generate a shareable link
            </p>
          ) : (
            <div className='share-link-wrapper'>
              <div className='share-link'>
                <input
                  type='text'
                  value={link}
                  id='sequence-link'
                  readOnly={true}
                />
                <Button id='copy-link' onClick={copyLink}>
                  <label htmlFor='copy-link'>copy</label>
                </Button>
              </div>
              <div className='social-links'>
                <a
                  href={`${TWITTER_URL}${link}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button classes='social-btn' aria-label='Tweet'>
                    <TwitterIcon />
                    <span>Tweet</span>
                  </Button>
                </a>
                <a
                  href={`${FACEBOOK_URL}${link}`}
                  target='_blank'
                  rel='noreferrer'
                >
                  <Button classes='social-btn' aria-label='Share to Facebook'>
                    <FacebookIcon />
                    <span>Share</span>
                  </Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className='save-sequence-group'>
        <form id='save-form' onSubmit={save}>
          <h1 className='save-header flex-between'>
            Save:{' '}
            <span className='save-location'>{`(saving to ${
              online && loggedIn ? 'cloud and device' : 'device'
            })`}</span>
          </h1>

          <div className='save-sequence-input'>
            <input
              type='text'
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              disabled={fetching || fileLimit <= 0}
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
        <div className='file-limit'>
          <p className='file-limit-p'>
            File limit:{' '}
            <span
              className={
                fileLimit <= 0 ? 'file-limit-span error' : 'file-limit-span'
              }
            >
              {fileLimit}
            </span>
          </p>
          {fileLimit <= 0 && (
            <p className='file-limit-instructions error'>
              Delete some old sequences to save
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
