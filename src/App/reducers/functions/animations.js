import store from 'App/store';
import { fft } from 'App/Tone';
import * as Tone from 'tone';
import { startSequence } from '../toneSlice';

export const startFlashing = () => {
  const flashingCells = document.querySelectorAll('.flashing');
  flashingCells.forEach((cell) => cell.classList.remove('pause'));
};

export const pauseFlashing = () => {
  const flashingCells = document.querySelectorAll('.flashing');
  flashingCells.forEach((cell) => cell.classList.add('pause'));
};

export const addCursor = (step) => {
  const cell = document.getElementById(`cell-${step}`);
  if (cell) cell.dataset.cursor = 'true';
};

export const removeCursor = (length, step) => {
  const prevStep = step - 1 > 0 ? step - 1 : length - 1;
  const nextStep = (step + 1) % length;
  const cell = document.getElementById(`cell-${step}`);
  const prevCell = document.getElementById(`cell-${prevStep}`);
  const nextCell = document.getElementById(`cell-${nextStep}`);
  if (cell) cell.dataset.cursor = false;
  if (prevCell) prevCell.dataset.cursor = false;
  if (nextCell) nextCell.dataset.cursor = false;
};

export const animateCell = (time, cell) => {
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

export const animateSample = (time, step) => {
  const sampleBtns = document.querySelectorAll('.sampleBtn');
  Tone.Draw.schedule(() => {
    step.forEach((sample, i) => {
      if (sample.noteOn) {
        sampleBtns && sampleBtns[i]?.classList.add('pulse');
        setTimeout(() => {
          sampleBtns && sampleBtns[i]?.classList.remove('pulse');
        }, 0);
      }
    });
  }, time);
};

let freqs, spectrum, i, db, prevDb, newDb;
const prevDbs = new Array(36);
let drawAnalyzer;
export const startAnalyzer = () => {
  freqs = document.querySelectorAll('.freq');
  drawAnalyzer = requestAnimationFrame(animateAnalyzer);
};
export const stopAnalyzer = () => cancelAnimationFrame(drawAnalyzer);

let fps = 60;
let interval = 1000 / fps;
let then = Date.now();
let now, elapsed;
function animateAnalyzer() {
  now = Date.now();
  elapsed = now - then;
  if (elapsed > interval) {
    then = now;
    spectrum = fft.getValue();
    freqs.forEach((freq, index) => {
      i = index + 3;
      db = spectrum[i] * 1000;
      if (db > 1) db = 1;
      prevDb = prevDbs[i] + 0.25;
      newDb = db < prevDb ? 0 : db;
      prevDbs[i] = db;
      if (newDb !== prevDb) {
        freq.style.transitionDuration = newDb ? '60ms' : '2s';
        freq.style.transform = `scale(${newDb})`;
      }
    });
  }
  requestAnimationFrame(animateAnalyzer);
}

document.addEventListener('keydown', () => {
  store.dispatch(startSequence());
});
