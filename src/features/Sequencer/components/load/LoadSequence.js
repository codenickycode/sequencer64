import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as defaultSequences from '../../defaults/defaultSequences';
import { deleteSequence, loadSequence } from '../../reducers/sequenceSlice';
import { DeleteIcon } from '../../../../icons';
import { setFetching } from '../../../../reducers/appSlice';

export const LoadSequence = ({ stopSequencer }) => {
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.sequence.present._id);

  const user = useSelector((state) => state.app.user);
  const fetching = useSelector((state) => state.app.fetching);

  const [error, setError] = useState('');
  useEffect(() => {
    let timeout = setTimeout(() => setError(''), 3000);
    return () => clearTimeout(timeout);
  }, [error]);

  const selectSequence = (e, type, id) => {
    e.stopPropagation();
    let sequence;
    if (type === 'ds')
      sequence = Object.values(defaultSequences).find(
        (sequence) => sequence._id === id
      );
    if (type === 'us')
      sequence = user.sequences.find((sequence) => sequence._id === id);
    dispatch(loadSequence({ sequence }));
  };

  // console.log('rendering: LoadSequence');
  return (
    <div className='load-sequence'>
      <h1 className='sequence-title'>Load Sequences</h1>
      <div className='sequence-select'>
        <div className='sequence-select-group'>
          {!user.username ? (
            <div className='login-div'>
              <p className='sequence-select-sub'>
                {fetching ? 'Logging in...' : 'Login to load user sequences'}
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
          ) : (
            <>
              <p className='sequence-select-sub'>User Sequences</p>
              {error && <p className='error'>{error}</p>}
              {user.sequences.length === 0 ? (
                <p>No user sequences</p>
              ) : (
                <>
                  <div className='load-sequence-sub'>
                    <p>Name</p>
                    <p>Kit</p>
                    <p>Bpm</p>
                    <p>Delete</p>
                  </div>
                  {user.sequences.map((sequence, i) => (
                    <UserSequence
                      key={`us-${_id}-${i}`}
                      sequence={sequence}
                      _id={_id}
                      selectSequence={selectSequence}
                      setError={setError}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </div>
        <div className='sequence-select-group'>
          <p className='sequence-select-sub'>Default Sequences</p>
          <div className='load-sequence-sub'>
            <p>Name</p>
            <p>Kit</p>
            <p>Bpm</p>
            <p></p>
          </div>
          {Object.keys(defaultSequences).map((sequence) => {
            const id = defaultSequences[sequence]._id;
            return (
              <div
                key={`ds-${id}`}
                className={id === _id ? 'sequence selected' : 'sequence'}
                onClick={(e) => selectSequence(e, 'ds', id)}
              >
                <p>{sequence}</p>
                <p>{defaultSequences[sequence].kit}</p>
                <p>{defaultSequences[sequence].bpm}</p>
                <p></p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const UserSequence = ({ sequence, _id, selectSequence, setError }) => {
  const dispatch = useDispatch();

  const fetching = useSelector((state) => state.app.fetching);

  const [showConfirm, setShowConfirm] = useState(false);

  const handleShowConfirm = (e, val) => {
    e.stopPropagation();
    setShowConfirm(val);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      dispatch(setFetching(true));
      dispatch(deleteSequence(sequence._id));
    } catch (e) {
      console.log('Delete Sequence ERROR ->\n', e);
      setError('Server error: please try again later.');
    } finally {
      dispatch(setFetching(false));
    }
  };

  // console.log('rendering: UserSequence');
  return showConfirm ? (
    <div className='confirm-delete'>
      <p>Are you sure?</p>
      <button className='red' onClick={handleDelete} disabled={fetching}>
        DELETE
      </button>
      <button
        className='purple'
        onClick={(e) => handleShowConfirm(e, false)}
        disabled={fetching}
      >
        CANCEL
      </button>
    </div>
  ) : (
    <div
      className={
        sequence._id === _id ? 'sequence select selected' : 'sequence select'
      }
      onClick={(e) => selectSequence(e, 'us', sequence._id)}
    >
      <p>{sequence.name}</p>
      <p>{sequence.kit}</p>
      <p>{sequence.bpm}</p>
      <div className='delete-btn' onClick={(e) => handleShowConfirm(e, true)}>
        <DeleteIcon />
      </div>
    </div>
  );
};
