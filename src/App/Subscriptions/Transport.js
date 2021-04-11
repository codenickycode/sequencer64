import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Tone from 'tone';
import {
  loadSamples,
  setRestarting,
  startSequence,
} from 'App/reducers/toneSlice';
import { changeKit } from 'App/reducers/sequenceSlice';

export const Transport = () => {
  const dispatch = useDispatch();

  const loadingError = useSelector((state) => state.tone.loadingError.error);
  const loadingErrorCount = useSelector(
    (state) => state.tone.loadingError.count
  );
  const restarting = useSelector((state) => state.tone.restarting);
  const bufferedKit = useSelector((state) => state.tone.bufferedKit);
  const loadingSamples = useSelector((state) => state.tone.loadingSamples);
  const sequenceBpm = useSelector((state) => state.sequence.present.bpm);
  const sequenceKitName = useSelector((state) => state.sequence.present.kit);

  useEffect(() => {
    Tone.Transport.bpm.value = sequenceBpm;
  }, [sequenceBpm]);

  useEffect(() => {
    if (loadingError) {
      if (loadingErrorCount > 3) throw new Error('Error loading samples');
      dispatch(changeKit('analog'));
    }
  }, [dispatch, loadingError, loadingErrorCount]);

  // after changeKit
  useEffect(() => {
    if (loadingSamples) return;
    if (bufferedKit !== sequenceKitName) {
      if (Tone.Transport.state === 'started') dispatch(setRestarting(true));
      dispatch(loadSamples());
    }
  }, [bufferedKit, dispatch, sequenceKitName, loadingSamples, loadingError]);

  // after loadSequence && loadSamples ↑
  useEffect(() => {
    if (loadingSamples) return;
    if (bufferedKit === sequenceKitName && restarting) {
      dispatch(startSequence());
    }
  }, [bufferedKit, dispatch, loadingSamples, restarting, sequenceKitName]);

  return null;
};
