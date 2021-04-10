import * as Tone from 'tone';
import {
  animateCell,
  animateSample,
  removeCursor,
  startFlashing,
} from 'App/reducers/functions/animations';
import {
  buildSamplers,
  disposeSamplers,
  triggerStep,
} from 'App/reducers/functions/sampler';
import {
  setLoadingSamples,
  loadSamplesFinally,
  setStep,
  startSequenceFinally,
  stopSequenceFinally,
  setAudioContextReady,
} from '../toneSlice';
import { setFetchingSamples } from '../assetsSlice';
import { setStatus } from '../appSlice';

export const startTone = (kit) => async (dispatch) => {
  await Tone.start();
  dispatch(setAudioContextReady(true));
  console.log('audio ready');
  window.log('audio ready');
  if (kit) dispatch(startSequence(kit));
};

export const loadSamples = (kit) => async (dispatch, getState) => {
  dispatch(stopSequence());
  const sequenceKitName = getState().sequence.present.kit;
  const kits = getState().assets.kits;
  const kitAssets = kits[sequenceKitName];
  dispatch(setStatus(`Loading samples: ${sequenceKitName}`));
  let available = kitAssets.available;
  dispatch(
    setFetchingSamples({ kit: sequenceKitName, fetching: true, available })
  );
  let payload = { bufferedKit: kit.name, loadingError: false };
  dispatch(setLoadingSamples(true));
  try {
    if (kit.samples[0].sampler) disposeSamplers(kit);
    await buildSamplers(kit, kitAssets);
    available = true;
    payload.bufferedKit = sequenceKitName;
    payload.buffersLoaded = true;
    payload.message = sequenceKitName + ' samples loaded';
  } catch (e) {
    console.log('loadSamples ->\n', e);
    payload.buffersLoaded = false;
    payload.loadingError = true;
    payload.message = `Error loading ${sequenceKitName} samples`;
  } finally {
    payload.loadingSamples = false;
    dispatch(loadSamplesFinally(payload));
    dispatch(
      setFetchingSamples({ kit: sequenceKitName, fetching: false, available })
    );
    dispatch(setStatus(payload.message));
  }
};

export const schedulePattern = (dispatch, getState, kit) => {
  Tone.Transport.scheduleRepeat((time) => {
    const step = getState().tone.step;
    const patternStep = getState().sequence.present.pattern[step];
    const samples = kit.samples;
    try {
      triggerStep(time, patternStep, samples);
      animateCell(time, document.getElementById(`cell-${step}`));
      animateSample(time, patternStep);
    } catch (e) {
      console.log('scheduleRepeat passed buffer interrupt');
    }
    const length = getState().sequence.present.length;
    dispatch(setStep((step + 1) % length));
  }, '16n');
};

export const startSequence = (kit) => async (dispatch, getState) => {
  const audioContextReady = getState().tone.audioContextReady;
  if (!audioContextReady) return dispatch(startTone(kit));
  removeCursor(getState().sequence.present.length, getState().tone.step);
  if (Tone.Transport.state === 'stopped')
    schedulePattern(dispatch, getState, kit);
  dispatch(startSequenceFinally());
};

export const stopSequence = () => (dispatch, getState) => {
  stopAndCancelEvents();
  removeCursor(getState().sequence.present.length, getState().tone.step);
  startFlashing();
  dispatch(stopSequenceFinally());
};

const stopAndCancelEvents = () => {
  Tone.Transport.stop();
  Tone.Transport.position = 0;
  Tone.Transport.cancel(0);
  // this cleans up what cancel missed ↓
  const scheduledEvents = Tone.Transport._scheduledEvents;
  Object.keys(scheduledEvents).forEach((id) => Tone.Transport.clear(id));
};
