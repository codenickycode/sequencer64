import React, { useMemo } from 'react';
import { DeleteIcon } from 'assets/icons';
import { Button } from 'App/shared/Button';
import { useUserSequenceState } from './useUserSequenceState';

export const UserSequence = ({ sequence, selectSequence, selectedId }) => {
  const selected = selectedId === sequence._id;
  const { showConfirm, classes, functions, deleting } = useUserSequenceState(
    sequence._id,
    sequence.name,
    selected
  );
  const memo = useMemo(() => {
    const { _id, name, bpm, kit } = sequence;
    const handleSelect = (e) => selectSequence(e, _id);
    return showConfirm ? (
      <ConfirmDelete {...functions} deleting={deleting} />
    ) : (
      <div
        className={classes.sequence}
        disabled={deleting}
        onClick={handleSelect}
      >
        <p>{`${deleting ? 'deleting ' : ''}${name}`}</p>
        <p className='p-left-25'>{kit}</p>
        <p>{bpm}</p>
        <Button
          classes='delete-btn'
          disabled={deleting}
          onClick={functions.cancelConfirm}
        >
          <DeleteIcon />
        </Button>
      </div>
    );
  }, [sequence, classes, deleting, functions, selectSequence, showConfirm]);
  return memo;
};

const ConfirmDelete = ({ deleting, handleDelete, cancelConfirm }) => {
  return (
    <div className='confirm-delete'>
      <p>Are you sure?</p>
      <Button classes='red' onClick={handleDelete} disabled={deleting}>
        DELETE
      </Button>
      <Button classes='black' onClick={cancelConfirm} disabled={deleting}>
        CANCEL
      </Button>
    </div>
  );
};
