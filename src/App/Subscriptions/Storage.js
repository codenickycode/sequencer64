import { VIEWS } from 'App/reducers/appSlice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLS, setSS } from 'utils/storage';

export const Storage = () => {
  const show = useSelector((state) => state.app.show);
  const theme = useSelector((state) => state.app.theme);

  useEffect(() => {
    if (show !== VIEWS.THEMES && show !== VIEWS.CHANGE_KIT) setSS('show', show);
  }, [show]);

  useEffect(() => {
    setLS('theme', theme);
  }, [theme]);

  const sequence = useSelector((state) => state.sequence.present);

  useEffect(() => {
    setLS('sequenceId', sequence._id);
  }, [sequence._id]);

  useEffect(() => {
    setLS('sequenceName', sequence.name);
  }, [sequence.name]);

  useEffect(() => {
    setLS('sequenceBpm', sequence.bpm);
  }, [sequence.bpm]);

  useEffect(() => {
    setLS('sequenceLength', sequence.length);
  }, [sequence.length]);

  useEffect(() => {
    setLS('sequencePattern', sequence.pattern);
  }, [sequence.pattern]);

  useEffect(() => {
    setLS('sequenceKitName', sequence.kit);
  }, [sequence.kit]);

  return null;
};
