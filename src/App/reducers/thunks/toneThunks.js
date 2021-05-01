import * as Tone from 'tone';
import {
  animateCell,
  animateSample,
  removeCursor,
  startFlashing,
} from 'App/reducers/functions/animations';
import {
  applySampleMixer,
  buildSamplers,
  disposeSamplers,
  triggerMetronome,
  triggerStep,
} from 'App/reducers/functions/sampler';
import {
  setLoadingSamples,
  loadSamplesFinally,
  setStep,
  startSequenceFinally,
  stopSequenceFinally,
  setAudioContextReady,
  setCountIn,
  setCycle,
} from '../toneSlice';
import { setFetchingSamples } from '../assetsSlice';
import { setStatus } from '../appSlice';
import { Kit, metronome } from 'App/Tone';
import { MODES } from '../editorSlice';
import { wait } from 'utils/wait';
import store from 'App/store';

export const startTone = (start) => async (dispatch) => {
  await Tone.start();
  dispatch(setAudioContextReady(true));
  console.log('audio ready');
  window.log('audio ready');
  if (start) dispatch(startSequence());
};

export const loadSamples = () => async (dispatch, getState) => {
  dispatch(stopSequence());
  const sequenceKitName = getState().sequence.present.kit;
  const kits = getState().assets.kits;
  const kitAssets = kits[sequenceKitName];
  dispatch(setStatus(`Loading samples: ${sequenceKitName}`));
  let available = kitAssets.available;
  dispatch(setFetchingSamples({ kit: sequenceKitName, fetching: true, available }));
  let payload = { bufferedKit: Kit.name, loadingError: false };
  dispatch(setLoadingSamples(true));
  try {
    if (Kit.samples[0].sampler) disposeSamplers();
    await buildSamplers(kitAssets);
    applySampleMixer(getState().sequence.present.sampleMixer);
    available = true;
    payload.bufferedKit = sequenceKitName;
    payload.buffersLoaded = true;
    payload.message = sequenceKitName + ' samples loaded';
  } catch (e) {
    console.error('loadSamples ->\n', e);
    payload.buffersLoaded = false;
    payload.loadingError = true;
    payload.message = `Error loading ${sequenceKitName} samples`;
  } finally {
    payload.loadingSamples = false;
    dispatch(loadSamplesFinally(payload));
    dispatch(setFetchingSamples({ kit: sequenceKitName, fetching: false, available }));
    dispatch(setStatus(payload.message));
  }
};

export const schedulePattern = (dispatch, getState) => {
  Tone.Transport.scheduleRepeat((time) => {
    const step = getState().tone.step;
    const patternStep = getState().sequence.present.pattern[step];
    const recording = getState().editor.mode === MODES.TAP_RECORD;
    try {
      triggerStep(time, patternStep);
      if (recording) triggerMetronome(time, step);
      animateCell(time, document.getElementById(`cell-${step}`));
      animateSample(time, patternStep);
    } catch (e) {
      console.error('scheduleRepeat passed buffer interrupt');
    }
    const length = getState().sequence.present.length;
    if (step === length - 1) {
      dispatch(incCycleCount());
      dispatch(setStep(0));
    } else {
      dispatch(setStep(step + 1));
    }
  }, '16n');
};

export const startSequence = (stopAfterCycle) => async (dispatch, getState) => {
  const audioContextReady = getState().tone.audioContextReady;
  if (!audioContextReady) return dispatch(startTone(true));
  const mode = getState().editor.mode;
  removeCursor(getState().sequence.present.length, getState().tone.step);
  if (Tone.Transport.state === 'stopped') schedulePattern(dispatch, getState);
  if (mode === MODES.TAP_RECORD) await countIn();
  dispatch(startSequenceFinally(stopAfterCycle));
};

export const stopSequence = () => (dispatch, getState) => {
  stopAndCancelEvents();
  removeCursor(getState().sequence.present.length, getState().tone.step);
  startFlashing();
  dispatch(stopSequenceFinally());
};

export const incCycleCount = () => (dispatch, getState) => {
  const prevCycle = getState().tone.cycle;
  const stopAfterCycle = getState().tone.stopAfterCycle;
  if (stopAfterCycle && prevCycle === stopAfterCycle) {
    dispatch(stopSequence());
  } else {
    dispatch(setCycle(prevCycle + 1));
  }
};

const stopAndCancelEvents = () => {
  Tone.Transport.stop();
  Tone.Transport.position = 0;
  Tone.Transport.cancel(0);
  // this cleans up what cancel missed ↓
  const scheduledEvents = Tone.Transport._scheduledEvents;
  Object.keys(scheduledEvents).forEach((id) => Tone.Transport.clear(id));
};

export const startRecord = () => (dispatch) => {
  dispatch(setCountIn('...'));
  dispatch(stopSequence());
  dispatch(startSequence());
};

const countIn = () =>
  new Promise(async (resolve) => {
    const beat = 60000 / Tone.Transport.bpm.value;
    await wait(0, () => click('C2'));
    store.dispatch(setCountIn(4));
    await wait(beat, () => click('C1'));
    store.dispatch(setCountIn(3));
    await wait(beat, () => click('C1'));
    store.dispatch(setCountIn(2));
    await wait(beat, () => click('C1'));
    store.dispatch(setCountIn(1));
    await wait(beat - 100, resolve);
    store.dispatch(setCountIn(''));
  });

const click = (note) => {
  const cell0 = document.getElementById('cell-0');
  cell0.classList.add('countIn');
  setTimeout(() => cell0.classList.remove('countIn'), 100);
  metronome.triggerAttack(note, Tone.immediate());
};
