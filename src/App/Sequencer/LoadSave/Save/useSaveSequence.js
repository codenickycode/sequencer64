import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ObjectID from 'bson-objectid';
import { getStrFromPattern } from 'App/reducers/functions/sequence';
import { saveSequence } from 'App/reducers/appSlice';

export const useSaveSequence = (idRef) => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.app.error);
  const sequence = useSelector((state) => state.sequence.present);

  const [newName, setNewName] = useState('');
  const handleNewName = (e) => setNewName(e.target.value);

  const [userError, setUserError] = useState('');
  useEffect(() => {
    setUserError(error);
  }, [error]);

  const save = async (e) => {
    e.preventDefault();
    if (!newName) return setUserError('name required');
    const newId = ObjectID().toHexString();
    idRef.current = newId;
    const cleanName = newName.replace(/[^a-zA-Z0-9 ]/g, '');
    const newSequence = {
      _id: newId,
      name: cleanName,
      kit: sequence.kit,
      bpm: sequence.bpm,
      length: sequence.length,
      patternStr: getStrFromPattern(sequence.pattern),
    };
    setNewName('');
    dispatch(saveSequence(newSequence));
  };

  return { newName, handleNewName, userError, save };
};
