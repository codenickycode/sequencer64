import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Tone from 'tone';
import {
  loadSamples,
  setRestarting,
  startSequence,
} from 'App/reducers/toneSlice';
import { Kit } from 'App/shared/KitProvider';
import { setStatus } from 'App/reducers/appSlice';
import { changeKit } from 'App/reducers/sequenceSlice';
import { analog } from 'utils/defaultSequences';

export const Transport = () => {
  const dispatch = useDispatch();
  const { kitRef } = useContext(Kit);

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
    console.log('loadingError: ', loadingError);
    if (loadingError) {
      if (loadingErrorCount > 3) throw new Error('Error loading samples');
      dispatch(setStatus('Error loading samples, reverting to default kit'));
      dispatch(changeKit('defaultKit'));
    }
  }, [dispatch, loadingError, loadingErrorCount]);

  // after changeKit
  useEffect(() => {
    if (loadingSamples) return;
    if (bufferedKit !== sequenceKitName) {
      if (Tone.Transport.state === 'started') dispatch(setRestarting(true));
      dispatch(loadSamples(kitRef.current));
    }
  }, [
    bufferedKit,
    dispatch,
    sequenceKitName,
    loadingSamples,
    kitRef,
    loadingError,
  ]);

  // after loadSequence && loadSamples ↑
  useEffect(() => {
    if (loadingSamples) return;
    if (bufferedKit === sequenceKitName && restarting) {
      dispatch(startSequence(kitRef.current));
    }
  }, [
    bufferedKit,
    dispatch,
    kitRef,
    loadingSamples,
    restarting,
    sequenceKitName,
  ]);

  return null;
};
