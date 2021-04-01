import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSequences } from 'App/reducers/appSlice';

export const useUserSequenceState = (_id, name, selected) => {
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
    dispatch(updateSequences('delete', { _id, name }));
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
