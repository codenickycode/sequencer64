import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Tone from 'tone';
import {
  loadSamples,
  setRestarting,
  startSequence,
} from 'App/reducers/toneSlice';
import { Kit } from 'App/shared/KitProvider';

export const Transport = () => {
  const dispatch = useDispatch();
  const { kitRef } = useContext(Kit);

  const restarting = useSelector((state) => state.tone.restarting);
  const bufferedKit = useSelector((state) => state.tone.bufferedKit);
  const loadingBuffers = useSelector((state) => state.tone.buffersLoading);
  const sequenceBpm = useSelector((state) => state.sequence.present.bpm);
  const sequenceKitName = useSelector((state) => state.sequence.present.kit);

  useEffect(() => {
    Tone.Transport.bpm.value = sequenceBpm;
  }, [sequenceBpm]);

  // after changeKit
  useEffect(() => {
    if (loadingBuffers) return;
    if (bufferedKit !== sequenceKitName) {
      if (Tone.Transport.state === 'started') dispatch(setRestarting(true));
      dispatch(loadSamples(kitRef.current));
    }
  }, [bufferedKit, dispatch, sequenceKitName, loadingBuffers, kitRef]);

  // after loadSequence && loadSamples ^
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
