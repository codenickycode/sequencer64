import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as defaultSequences from '../../defaults/defaultSequences';
import { updateSequences } from '../../../../reducers/appSlice';
import { loadSequence } from '../../reducers/sequenceSlice';
import { DeleteIcon } from '../../../../icons';
import { Button } from '../../../../components/Button';
import cuid from 'cuid';
import { getPatternFromStr } from '../../reducers/functions/sequence';

export const LoadSequence = ({ handleStopSequence }) => {
  const dispatch = useDispatch();

  const userSequences = useSelector((state) => state.app.userSequences);

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
        sequence = userSequences.find((sequence) => sequence._id === id);
      dispatch(
        loadSequence({
          ...sequence,
          pattern: getPatternFromStr(sequence.pattern),
        })
      );
      setSelectedId(id);
    };

    return (
      <div className='load-sequence'>
        <div className='sequence-select'>
          <UserSection
            handleStopSequence={handleStopSequence}
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
  }, [handleStopSequence, selectedId, userSequences, dispatch]);
  return loadSequenceMemo;
};

const DefaultSection = ({ selectSequence, selectedId }) => {
  const defaultSectionMemo = useMemo(() => {
    return (
      <div className='sequence-select-group'>
        <p className='sequence-select-sub'>Default Sequences</p>
        <div className='load-sequence-sub'>
          <p>Name</p>
          <p className='p-left-25'>Kit</p>
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
              onClick={selected ? null : (e) => selectSequence(e, 'ds', id)}
            >
              <p>{sequence}</p>
              <p className='p-left-25'>{defaultSequences[sequence].kit}</p>
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

const UserSection = ({ selectSequence, selectedId }) => {
  const userSectionMemo = useMemo(() => {
    return (
      <div className='sequence-select-group'>
        <UserSequences
          selectSequence={selectSequence}
          selectedId={selectedId}
        />
      </div>
    );
  }, [selectSequence, selectedId]);
  return userSectionMemo;
};

const UserSequences = ({ selectSequence, selectedId }) => {
  const userSequences = useSelector((state) => state.app.userSequences);

  const userSequencesMemo = useMemo(() => {
    return (
      <>
        <p className='sequence-select-sub'>User Sequences</p>
        {!userSequences || userSequences.length === 0 ? (
          <p>No user sequences</p>
        ) : (
          <>
            <div className='load-sequence-sub'>
              <p>Name</p>
              <p className='p-left-25'>Kit</p>
              <p>Bpm</p>
              <p></p>
            </div>
            {userSequences
              ?.map((sequence) => {
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
              })
              .reverse()}
          </>
        )}
      </>
    );
  }, [selectSequence, selectedId, userSequences]);
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
        onClick={selected ? null : (e) => selectSequence(e, 'us', _id)}
      >
        <p>
          {deleting && 'deleting '}
          {name}
        </p>
        <p className='p-left-25'>{kit}</p>
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
