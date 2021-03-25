import { useEffect, useRef, useContext } from 'react';
import * as Tone from 'tone';
import { PatternRef } from '../providers/PatternRef';
import { Kit } from '../providers/Kit';
import { useDispatch, useSelector } from 'react-redux';
import { restart, setTransportState } from '../reducers/toneSlice';

export const Transport = () => {
  const dispatch = useDispatch();
  const { patternRef, cellsRef } = useContext(PatternRef);
  const { kitRef } = useContext(Kit);

  const length = useSelector((state) => state.sequence.present.length);
  const transportState = useSelector((state) => state.tone.transportState);
  const prevTransportStateRef = useRef(transportState);
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);

  const stepRef = useRef(0);

  const bpm = useSelector((state) => state.sequence.present.bpm);
  useEffect(() => {
    Tone.Transport.bpm.value = bpm;
  }, [bpm]);

  const restarting = useSelector((state) => state.tone.restarting);
  useEffect(() => {
    if (restarting) {
      if (buffersLoaded) {
        stepRef.current = 0;
        dispatch(restart());
      }
    }
  }, [buffersLoaded, dispatch, restarting]);

  useEffect(() => {
    const schedulePattern = () => {
      Tone.Transport.scheduleRepeat((time) => {
        if (!buffersLoaded) return;
        try {
          scheduleCell(
            time,
            patternRef.current[stepRef.current],
            kitRef.current.sounds
          );
          animateCell(
            time,
            cellsRef.current[`cell-${stepRef.current}`].cellRef.current
          );
          animateSound(time, patternRef.current[stepRef.current]);
        } catch (e) {
          console.log('schedulePattern ERROR ->\n', e);
        }
        stepRef.current = (stepRef.current + 1) % patternRef.current.length;
      }, '16n');
    };

    if (transportState === 'started') {
      removeCursor(length, stepRef.current);
      if (prevTransportStateRef.current !== 'started') {
        pauseFlashing();
        if (prevTransportStateRef.current === 'stopped') schedulePattern();
        Tone.Transport.start();
      } else {
        dispatch(setTransportState('paused'));
      }
    } else if (transportState === 'paused') {
      addCursor(stepRef.current);
      startFlashing();
    } else if (transportState === 'stopped') {
      stopAndCancelEvents();
      removeCursor(length, stepRef.current);
      startFlashing();
      stepRef.current = 0;
    }
    prevTransportStateRef.current = transportState;
  }, [
    buffersLoaded,
    cellsRef,
    dispatch,
    kitRef,
    length,
    patternRef,
    transportState,
  ]);

  return null;
};

const animateCell = (time, cell) => {
  Tone.Draw.schedule(() => {
    if (cell.classList.contains('on')) {
      cell.classList.add('pulse');
      setTimeout(() => cell.classList.remove('pulse'), 0);
    } else {
      cell.classList.add('flash');
      setTimeout(() => cell.classList.remove('flash'), 0);
    }
  }, time);
};

const animateSound = (time, step) => {
  const soundBtns = document.querySelectorAll('.sound-btn');
  Tone.Draw.schedule(() => {
    step.forEach((sound, i) => {
      if (sound.noteOn) {
        soundBtns[i].classList.add('pulse');
        setTimeout(() => soundBtns[i].classList.remove('pulse'), 0);
      }
    });
  }, time);
};

const scheduleCell = (time, step, sounds) => {
  for (const [sound, { noteOn, notes }] of Object.entries(step)) {
    if (noteOn) {
      let slice = notes.length;
      sounds[sound].sampler.triggerAttackRelease(
        notes[0].pitch,
        notes[0].length,
        time,
        notes[0].velocity
      );
      if (slice === 2) {
        sounds[sound].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32n'),
          notes[1].velocity
        );
      } else if (slice === 3) {
        sounds[sound].sampler.triggerAttackRelease(
          notes[1].pitch,
          notes[1].length,
          time + Tone.Time('32t'),
          notes[1].velocity
        );
        sounds[sound].sampler.triggerAttackRelease(
          notes[2].pitch,
          notes[2].length,
          time + Tone.Time('32t') + Tone.Time('32t'),
          notes[2].velocity
        );
      }
    }
  }
};

export const stopAndCancelEvents = () => {
  Tone.Transport.stop();
  Tone.Transport.position = 0;
  Tone.Transport.cancel(0);
  const scheduledEvents = Tone.Transport._scheduledEvents;
  Object.keys(scheduledEvents).forEach((id) => Tone.Transport.clear(id));
};

const startFlashing = () => {
  const flashingCells = document.querySelectorAll('.flashing');
  flashingCells.forEach((cell) => cell.classList.remove('pause'));
};

const pauseFlashing = () => {
  const flashingCells = document.querySelectorAll('.flashing');
  flashingCells.forEach((cell) => cell.classList.add('pause'));
};

const addCursor = (step) => {
  const cell = document.getElementById(`cell-${step}`);
  if (cell) cell.dataset.cursor = 'true';
};

const removeCursor = (length, step) => {
  const prevStep = step - 1 > 0 ? step - 1 : length - 1;
  const nextStep = (step + 1) % length;
  const cell = document.getElementById(`cell-${step}`);
  const prevCell = document.getElementById(`cell-${prevStep}`);
  const nextCell = document.getElementById(`cell-${nextStep}`);
  if (cell) cell.dataset.cursor = false;
  if (prevCell) prevCell.dataset.cursor = false;
  if (nextCell) nextCell.dataset.cursor = false;
};
