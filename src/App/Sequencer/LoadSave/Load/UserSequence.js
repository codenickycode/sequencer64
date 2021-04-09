import React, { useMemo } from 'react';
import { DeleteIcon } from 'assets/icons';
import { Button } from 'App/shared/Button';
import { useUserSequence } from './useUserSequence';

export const UserSequence = ({ sequence, selectSequence, selectedId }) => {
  const { classes, values, functions } = useUserSequence(sequence, selectedId);
  const memo = useMemo(() => {
    const { _id, name, date, sync, showConfirm, deleting } = values;
    const { cancelConfirm, handleUpload } = functions;
    const handleSelect = (e) => selectSequence(e, _id);
    return showConfirm ? (
      <ConfirmDelete {...functions} deleting={deleting} />
    ) : (
      <div
        className={classes.sequence}
        disabled={deleting}
        onClick={handleSelect}
      >
        <p className='name'>{name}</p>
        <p className='date'>{date}</p>
        <Button classes='sync' onClick={handleUpload}>
          {sync}
        </Button>
        <Button classes='delete' disabled={deleting} onClick={cancelConfirm}>
          <DeleteIcon />
        </Button>
      </div>
    );
  }, [classes, values, functions, selectSequence]);
  return memo;
};

const ConfirmDelete = ({ deleting, handleDelete, cancelConfirm }) => {
  return (
    <div className='confirm-delete'>
      <p>Are you sure?</p>
      <Button classes='red' onClick={handleDelete} disabled={deleting}>
        DELETE
      </Button>
      <Button onClick={cancelConfirm} disabled={deleting}>
        CANCEL
      </Button>
    </div>
  );
};
