import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteSequence } from 'App/reducers/appSlice';

export const useUserSequenceState = (_id, selected) => {
  const dispatch = useDispatch();
  const [showConfirm, setShowConfirm] = useState(false);

  const cancelConfirm = (e) => {
    e.stopPropagation();
    setShowConfirm(!showConfirm);
  };

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.stopPropagation();
    setDeleting(true);
    dispatch(deleteSequence(_id));
  };

  const classes = {};
  classes.sequence = selected
    ? 'sequence select selected'
    : deleting
    ? 'sequence select deleting'
    : 'sequence select';

  const functions = { cancelConfirm, handleDelete };
  return { classes, functions, showConfirm, deleting };
};
