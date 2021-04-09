import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSequence, setStatus } from 'App/reducers/appSlice';
import { CheckIcon, CloudUploadIcon } from 'assets/icons';
import { apiSaveSequence } from 'api';
import { get, set } from 'idb-keyval';

export const useUserSequence = (sequence, selectedId) => {
  const dispatch = useDispatch();
  const selected = selectedId === sequence._id;
  const { _id, kit, name, date, synched } = sequence;
  const fetching = useSelector((state) => state.assets.kits[kit].fetching);
  const online = useSelector((state) => state.app.online);
  const loggedIn = useSelector((state) => state.app.user.loggedIn);
  const userId = useSelector((state) => state.app.user._id);

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

  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.stopPropagation();
    if (synched || !online || !loggedIn) return;
    setUploading(true);
    try {
      // const idbSeqs = await get('sequences');
      // const seqToUpdate = idbSeqs.find((seq) => seq._id.toString() === _id);
      // seqToUpdate.sharedWith.push(userId);
      // await set('sequences', idbSeqs);
      const newSequence = [...sequence];
      newSequence.sharedWith = [...sequence.sharedWith, userId];
      await apiSaveSequence(newSequence);
      dispatch(setStatus('Sequence saved to cloud'));
    } catch (e) {
      dispatch(setStatus('Error saving sequence to cloud'));
    } finally {
      setUploading(false);
    }
  };

  const classes = { sequence: 'userSequence select ' };
  if (selected && fetching) classes.sequence += 'fetching';
  if (selected && !fetching) classes.sequence += 'selected';
  if (deleting) classes.sequence += 'deleting';

  const values = {
    _id,
    date,
    name: deleting ? 'deleting ' : '' + name,
    showConfirm,
    deleting,
  };
  if (synched) values.sync = <CheckIcon addClass='check' />;
  if (!synched && online && loggedIn)
    values.sync = (
      <CloudUploadIcon addClass={uploading ? 'fetching cloud' : 'cloud'} />
    );
  if ((!synched && !online) || (!synched && !loggedIn))
    values.sync = <CloudUploadIcon addClass='unavailable cloud' />;

  const functions = { cancelConfirm, handleDelete, handleUpload };
  return { classes, values, functions };
};
