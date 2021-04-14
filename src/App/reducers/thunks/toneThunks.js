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
  setCountingIn,
} from '../toneSlice';
import { setFetchingSamples } from '../assetsSlice';
import { setStatus } from '../appSlice';
import { Kit, metronome } from 'App/Tone';
import { MODES } from '../editorSlice';
import { wait } from 'utils/wait';

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
  dispatch(
    setFetchingSamples({ kit: sequenceKitName, fetching: true, available })
  );
  let payload = { bufferedKit: Kit.name, loadingError: false };
  dispatch(setLoadingSamples(true));
  try {
    if (Kit.samples[0].sampler) disposeSamplers();
    await buildSamplers(kitAssets);
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

export const schedulePattern = (dispatch, getState) => {
  Tone.Transport.scheduleRepeat((time) => {
    const step = getState().tone.step;
    const patternStep = getState().sequence.present.pattern[step];
    try {
      triggerStep(time, patternStep);
      animateCell(time, document.getElementById(`cell-${step}`));
      animateSample(time, patternStep);
    } catch (e) {
      console.log('scheduleRepeat passed buffer interrupt');
    }
    const length = getState().sequence.present.length;
    dispatch(setStep((step + 1) % length));
  }, '16n');
};

export const startSequence = () => async (dispatch, getState) => {
  const audioContextReady = getState().tone.audioContextReady;
  if (!audioContextReady) return dispatch(startTone(true));
  removeCursor(getState().sequence.present.length, getState().tone.step);
  if (Tone.Transport.state === 'stopped') schedulePattern(dispatch, getState);
  if (getState().editor.mode === MODES.TAP_RECORD) await countIn();
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

export const startRecord = () => (dispatch) => {
  dispatch(setCountingIn(true));
  dispatch(stopSequence());
  dispatch(startSequence());
};

const countIn = () =>
  new Promise(async (resolve) => {
    const beat = 60000 / Tone.Transport.bpm.value;
    await wait(0, () => click('C2'));
    await wait(beat, () => click('C1'));
    await wait(beat, () => click('C1'));
    await wait(beat, () => click('C1'));
    await wait(beat - 100, resolve);
  });

const click = (note) => {
  const cell0 = document.getElementById('cell-0');
  cell0.classList.add('flash');
  setTimeout(() => cell0.classList.remove('flash'), 100);
  metronome.triggerAttack(note, Tone.immediate());
};
