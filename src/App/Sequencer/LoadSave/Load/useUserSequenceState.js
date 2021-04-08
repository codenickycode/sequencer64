import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSequence } from 'App/reducers/appSlice';

export const useUserSequenceState = (_id, kit, selected) => {
  const dispatch = useDispatch();
  const fetching = useSelector((state) => state.assets.kits[kit].fetching);
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

  const classes = { sequence: 'sequence select ' };
  if (selected && fetching) classes.sequence += 'fetching';
  if (selected && !fetching) classes.sequence += 'selected';
  if (deleting) classes.sequence += 'deleting';

  const functions = { cancelConfirm, handleDelete };
  return { classes, functions, showConfirm, deleting };
};
