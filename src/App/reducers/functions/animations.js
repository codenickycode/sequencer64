import * as Tone from 'tone';

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
  const sampleBtns = document.querySelectorAll('.sample-btn');
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
