import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import * as defaultSequences from '../../defaults/defaultSequences';
import { updateSequences } from '../../../../reducers/appSlice';
import { loadSequence } from '../../reducers/sequenceSlice';
import { DeleteIcon } from '../../../../icons';
import { Button } from '../../../../components/Button';
import cuid from 'cuid';

export const LoadSequence = ({ stopSequencer }) => {
  const dispatch = useDispatch();

  const sequences = useSelector((state) => state.app.user.sequences);
  console.log(sequences);

  const [selectedId, setSelectedId] = useState(null);

  const loadSequenceMemo = useMemo(() => {
    const selectSequence = (e, type, id) => {
      e.stopPropagation();
      let sequence;
      if (type === 'ds')
        sequence = Object.values(defaultSequences).find(
          (sequence) => sequence._id === id
        );
      if (type === 'us')
        sequence = sequences.find((sequence) => sequence._id === id);
      dispatch(loadSequence({ sequence }));
      setSelectedId(id);
    };

    return (
      <div className='load-sequence'>
        <h1 className='sequence-title'>Load Sequences</h1>
        <div className='sequence-select'>
          <UserSection
            stopSequencer={stopSequencer}
            selectSequence={selectSequence}
            selectedId={selectedId}
          />
          <DefaultSection
            selectSequence={selectSequence}
            selectedId={selectedId}
          />
        </div>
      </div>
    );
  }, [stopSequencer, selectedId, sequences, dispatch]);
  return loadSequenceMemo;
};

const DefaultSection = ({ selectSequence, selectedId }) => {
  const defaultSectionMemo = useMemo(() => {
    return (
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
          const selected = id === selectedId;
          return (
            <div
              key={cuid()}
              className={selected ? 'sequence selected' : 'sequence'}
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
    );
  }, [selectSequence, selectedId]);
  return defaultSectionMemo;
};

const UserSection = ({ stopSequencer, selectSequence, selectedId }) => {
  const fetching = useSelector((state) => state.app.fetching);
  const username = useSelector((state) => state.app.user.username);

  const userSectionMemo = useMemo(() => {
    return (
      <div className='sequence-select-group'>
        {!username ? (
          <div className='login-div'>
            <p className='sequence-select-sub'>
              {fetching ? 'please wait...' : 'Login to load user sequences'}
            </p>
            <Link
              className='login-btn'
              onTouchStart={stopSequencer}
              to='/login'
              disabled={fetching}
            >
              {fetching ? 'loading...' : 'Login'}
            </Link>
          </div>
        ) : (
          <UserSequences
            selectSequence={selectSequence}
            selectedId={selectedId}
          />
        )}
      </div>
    );
  }, [fetching, selectSequence, selectedId, stopSequencer, username]);
  return userSectionMemo;
};

const UserSequences = ({ selectSequence, selectedId }) => {
  const sequences = useSelector((state) => state.app.user.sequences);

  const userSequencesMemo = useMemo(() => {
    return (
      <>
        <p className='sequence-select-sub'>User Sequences</p>
        {sequences.length === 0 ? (
          <p>No user sequences</p>
        ) : (
          <>
            <div className='load-sequence-sub'>
              <p>Name</p>
              <p>Kit</p>
              <p>Bpm</p>
              <p>Delete</p>
            </div>
            {sequences.map((sequence) => {
              const selected = sequence._id === selectedId;
              return (
                <UserSequence
                  key={sequence._id}
                  _id={sequence._id}
                  name={sequence.name}
                  kit={sequence.kit}
                  bpm={sequence.bpm}
                  selected={selected}
                  selectSequence={selectSequence}
                />
              );
            })}
          </>
        )}
      </>
    );
  }, [selectSequence, selectedId, sequences]);
  return userSequencesMemo;
};

const UserSequence = ({ _id, name, kit, bpm, selected, selectSequence }) => {
  const dispatch = useDispatch();

  const [showConfirm, setShowConfirm] = useState(false);

  const handleShowConfirm = (e, val) => {
    e.stopPropagation();
    setShowConfirm(val);
  };

  const [deleting, setDeleting] = useState(false);

  const userSequenceMemo = useMemo(() => {
    const handleDelete = async (e) => {
      e.stopPropagation();
      setDeleting(true);
      dispatch(updateSequences('delete', { _id, name }));
    };

    return showConfirm ? (
      <div className='confirm-delete'>
        <p>Are you sure?</p>
        <Button classes='red' onClick={handleDelete} disabled={deleting}>
          DELETE
        </Button>
        <Button
          classes='purple'
          onClick={(e) => handleShowConfirm(e, false)}
          disabled={deleting}
        >
          CANCEL
        </Button>
      </div>
    ) : (
      <div
        className={
          selected
            ? 'sequence select selected'
            : deleting
            ? 'sequence select deleting'
            : 'sequence select'
        }
        disabled={deleting}
        onClick={(e) => selectSequence(e, 'us', _id)}
      >
        <p>
          {deleting && 'deleting '}
          {name}
        </p>
        <p>{kit}</p>
        <p>{bpm}</p>
        <Button
          classes='delete-btn'
          disabled={deleting}
          onClick={(e) => handleShowConfirm(e, true)}
        >
          <DeleteIcon />
        </Button>
      </div>
    );
  }, [
    _id,
    bpm,
    deleting,
    dispatch,
    kit,
    name,
    selectSequence,
    selected,
    showConfirm,
  ]);
  return userSequenceMemo;
};
