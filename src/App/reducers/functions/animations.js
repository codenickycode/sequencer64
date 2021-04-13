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

let freqs, spectrum, average, i, db, prevDb, newDb;
const prevDbs = new Array(36);
let drawAnalyzer;
export const startAnalyzer = () => {
  freqs = document.querySelectorAll('.freq');
  drawAnalyzer = true;
  requestAnimationFrame(animateAnalyzer);
};
export const stopAnalyzer = () => {
  drawAnalyzer = false;
  setTimeout(() => {
    freqs = document.querySelectorAll('.freq');
    freqs.forEach((freq) => {
      freq.style.removeProperty('transform');
      freq.style.removeProperty('filter');
    });
  }, 20);
};

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
    average = spectrum.reduce((acc, curr) => acc + curr) / spectrum.length;
    freqs.forEach((freq, index) => {
      i = index + 2; // first two freqs of fft are hyped
      db = Math.abs(spectrum[i] + average) * 100;
      prevDb = prevDbs[i] + 0.15;
      newDb = db < prevDb ? 0 : db > 1 ? 1 : db;
      prevDbs[i] = db;
      if (newDb !== prevDb) {
        freq.style.transitionDuration = newDb ? '60ms' : '1s';
        let scaleX = freq.dataset.scalex;
        if (scaleX !== '1') scaleX = newDb * 0.25;
        let transform = `scale(${scaleX}, ${newDb})`;
        freq.style.transform = transform;
        let blur = freq.dataset.blur - newDb * 100;
        if (blur < 0) blur = 0;
        freq.style.filter = `blur(${blur}px)`;
        freq.style.opacity = newDb + 0.5;
      }
    });
  }
  if (drawAnalyzer) requestAnimationFrame(animateAnalyzer);
}

document.addEventListener('keydown', () => {
  store.dispatch(startSequence());
});
