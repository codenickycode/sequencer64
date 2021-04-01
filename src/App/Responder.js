import { useContext, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Tone from 'tone';
import { setLS } from 'utils/storage';
import { getUser, setConfirmation, setError } from 'App/reducers/appSlice';
import {
  loadSamples,
  setRestarting,
  startSequence,
} from 'App/reducers/toneSlice';
import { Kit } from 'App/shared/KitProvider';

export const Responder = () => {
  const dispatch = useDispatch();

  // App Reducer
  const online = useSelector((state) => state.app.online);
  const confirmation = useSelector((state) => state.app.confirmation);
  const error = useSelector((state) => state.app.error);

  // App effects
  useEffect(() => {
    dispatch(getUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer;
    if (confirmation)
      timer = setTimeout(() => dispatch(setConfirmation('')), 5000);
    return () => clearTimeout(timer);
  }, [confirmation, dispatch]);

  useEffect(() => {
    let timer;
    if (error) timer = setTimeout(() => dispatch(setError('')), 5000);
    return () => clearTimeout(timer);
  }, [dispatch, error]);

  const onlineRef = useRef(online);
  useEffect(() => {
    if (online) {
      if (!onlineRef.current) {
        console.log('back online');
        dispatch(getUser());
      }
      onlineRef.current = true;
    } else {
      console.log('offline');
      onlineRef.current = false;
    }
  }, [dispatch, online]);

  // Tone Reducer
  const bufferedKit = useSelector((state) => state.tone.bufferedKit);
  const loadingBuffers = useSelector((state) => state.tone.buffersLoading);

  // Sequence Reducer
  const sequenceId = useSelector((state) => state.sequence.present._id);
  const sequenceName = useSelector((state) => state.sequence.present.name);
  const sequenceBpm = useSelector((state) => state.sequence.present.bpm);
  const sequenceLength = useSelector((state) => state.sequence.present.length);
  const sequencePattern = useSelector(
    (state) => state.sequence.present.pattern
  );
  const sequenceKitName = useSelector((state) => state.sequence.present.kit);

  // Sequence effects
  useEffect(() => {
    setLS('sequenceId', sequenceId);
  }, [sequenceId]);

  useEffect(() => {
    setLS('sequenceName', sequenceName);
  }, [sequenceName]);

  useEffect(() => {
    Tone.Transport.bpm.value = sequenceBpm;
    setLS('sequenceBpm', sequenceBpm);
  }, [sequenceBpm]);

  useEffect(() => {
    setLS('sequenceLength', sequenceLength);
  }, [sequenceLength]);

  useEffect(() => {
    setLS('sequencePattern', sequencePattern);
  }, [sequencePattern]);

  useEffect(() => {
    setLS('sequenceKitName', sequenceKitName);
  }, [sequenceKitName]);

  const { kitRef } = useContext(Kit);
  const restarting = useSelector((state) => state.tone.restarting);

  // after changeKit
  useEffect(() => {
    if (loadingBuffers) return;
    if (bufferedKit !== sequenceKitName) {
      if (Tone.Transport.state === 'started') dispatch(setRestarting(true));
      dispatch(loadSamples(kitRef.current));
    }
  }, [bufferedKit, dispatch, sequenceKitName, loadingBuffers, kitRef]);

  // after loadSequence
  useEffect(() => {
    if (loadingBuffers) return;
    if (bufferedKit === sequenceKitName && restarting) {
      dispatch(startSequence(kitRef.current));
    }
  }, [
    bufferedKit,
    dispatch,
    kitRef,
    loadingBuffers,
    restarting,
    sequenceKitName,
  ]);

  return null;
};
