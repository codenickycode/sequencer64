import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLS, setSS } from 'utils/storage';

export const Storage = () => {
  const theme = useSelector((state) => state.app.theme);
  const analyzerMode = useSelector((state) => state.screen.analyzer.mode);
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);

  useEffect(() => {
    setLS('theme', theme);
  }, [theme]);

  useEffect(() => {
    setSS('analyzerOn', analyzerOn);
    setSS('analyzerMode', analyzerMode);
  }, [analyzerOn, analyzerMode]);

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
