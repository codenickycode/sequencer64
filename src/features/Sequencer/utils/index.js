export const getNoteTally = (pattern) => {
  let noteTally = {
    '-1': { count: 0, empty: true },
    total: { count: 0, empty: true },
  };
  pattern[0].forEach((_, i) => {
    noteTally[i] = { count: 0, empty: true };
  });
  pattern.forEach((step) => {
    step.forEach((sound, i) => {
      if (sound.noteOn) {
        noteTally[i].count++;
        noteTally.total.count++;
      }
    });
  });
  for (let i = 0; i < pattern[0].length; i++) {
    if (noteTally[i].count) {
      noteTally[i].empty = false;
      noteTally.total.empty = false;
    }
  }
  return noteTally;
};

export const inc = (noteTally, sound) => {
  noteTally[sound].count++;
  noteTally[sound].empty = false;
  noteTally.total.count++;
  noteTally.total.count = false;
};

export const dec = (noteTally, sound) => {
  noteTally[sound].count--;
  if (noteTally[sound].count === 0) noteTally[sound].empty = true;
  noteTally.total.count--;
  if (noteTally.total.count === 0) noteTally.total.empty = true;
};

export const initSoundStep = (sound) => {
  sound.noteOn = false;
  sound.notes.length = 0;
  sound.notes.push({ pitch: 'C2', velocity: 1, length: 1 });
};

export const INIT_PATTERN = () => {
  let pattern = [];
  let sounds = [];
  for (let i = 0; i < 9; i++) {
    sounds.push({
      noteOn: true,
      notes: [{ pitch: 'C2', velocity: 1, length: 1 }],
    });
  }
  for (let i = 0; i < 64; i++) {
    pattern.push(sounds);
  }
  return pattern;
};
