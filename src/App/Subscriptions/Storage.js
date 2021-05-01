import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { setLS, setSS } from 'utils/storage';

export const Storage = () => {
  const theme = useSelector((state) => state.app.theme);
  const analyzerMode = useSelector((state) => state.screen.analyzer.mode);
  const analyzerOn = useSelector((state) => state.screen.analyzer.on);
  const authToken = useSelector((state) => state.app.authToken);

  useEffect(() => {
    setLS('authToken', authToken);
  }, [authToken]);

  useEffect(() => {
    setLS('theme', theme);
  }, [theme]);

  useEffect(() => {
    setSS('analyzerOn', analyzerOn);
    setSS('analyzerMode', analyzerMode);
  }, [analyzerOn, analyzerMode]);

  const sequence = useSelector((state) => state.sequence.present);

  useEffect(() => {
    setSS('sequenceId', sequence._id);
  }, [sequence._id]);

  useEffect(() => {
    setSS('sequenceName', sequence.name);
  }, [sequence.name]);

  useEffect(() => {
    setSS('sequenceBpm', sequence.bpm);
  }, [sequence.bpm]);

  useEffect(() => {
    setSS('sequenceLength', sequence.length);
  }, [sequence.length]);

  useEffect(() => {
    setSS('sequencePattern', sequence.pattern);
  }, [sequence.pattern]);

  useEffect(() => {
    setSS('sequenceKitName', sequence.kit);
  }, [sequence.kit]);

  useEffect(() => {
    setSS('mainMixer', sequence.mainMixer);
  }, [sequence.mainMixer]);

  useEffect(() => {
    setSS('sampleMixer', sequence.sampleMixer);
  }, [sequence.sampleMixer]);

  return null;
};
