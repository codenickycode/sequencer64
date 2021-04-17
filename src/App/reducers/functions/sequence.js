export const getNoteTally = (pattern) => {
  if (!Array.isArray(pattern)) {
    console.log('pattern is not an array');
    return;
  }
  let noteTally = {
    '-1': { count: 0, empty: true },
    total: { count: 0, empty: true },
  };
  pattern[0].forEach((_, i) => {
    noteTally[i] = { count: 0, empty: true };
  });
  pattern.forEach((step) => {
    step.forEach((sample, i) => {
      if (sample.noteOn) {
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

export const inc = (noteTally, sample) => {
  noteTally[sample].count++;
  noteTally[sample].empty = false;
  noteTally.total.count++;
  noteTally.total.empty = false;
};

export const dec = (noteTally, sample) => {
  noteTally[sample].count--;
  if (noteTally[sample].count === 0) noteTally[sample].empty = true;
  noteTally.total.count--;
  if (noteTally.total.count === 0) noteTally.total.empty = true;
};

export const initSampleStep = (sample) => {
  sample.noteOn = false;
  sample.notes.length = 0;
  sample.notes.push(INIT_NOTE());
};

export const INIT_NOTE = () => ({ pitch: 'C2', velocity: 1, length: 1 });

export const INIT_SAMPLE = () => ({
  noteOn: false,
  notes: [INIT_NOTE()],
});

export const INIT_PATTERN = () => {
  let pattern = [];
  let step = [];
  for (let i = 0; i < 9; i++) {
    step.push(INIT_SAMPLE());
  }
  for (let i = 0; i < 64; i++) {
    // Object.assign req'd to not mutate previous edits in loop
    pattern.push(Object.assign([], step));
  }
  return pattern;
};

const stepRegexp = /S(\d+)/g;
const sampleRegexp = /s(\d+)/g;
const valsRegexp = /p\w\d|v\d+(?:\.\d+)?|l\d+(?:\.\d+)?/g;
const slicesRegexp = /(n1.*)(n2.*)|n1.*$|n2.*$/;

export const getStrFromPattern = (editedPattern) => {
  const initialPattern = INIT_PATTERN();
  const edits = [];
  editedPattern.forEach((step, i) => {
    const stepEdits = [];
    let stepEdited = false;
    step.forEach((sample, s) => {
      const sampleEdits = [];
      const initialSample = initialPattern[i][s];
      if (sample.noteOn !== initialSample.noteOn) {
        sampleEdits.push(sample.noteOn ? 't' : 'f');
      }
      if (sample.notes[0].pitch !== initialSample.notes[0].pitch) {
        sampleEdits.push('p' + sample.notes[0].pitch);
      }
      if (sample.notes[0].velocity !== initialSample.notes[0].velocity) {
        sampleEdits.push('v' + sample.notes[0].velocity);
      }
      if (sample.notes[0].velocity !== initialSample.notes[0].length) {
        sampleEdits.push('l' + sample.notes[0].length);
      }
      if (sample.notes[1]) {
        sampleEdits.push('n1' + getNoteStrFromObj(sample.notes[1]));
      }
      if (sample.notes[2]) {
        sampleEdits.push('n2' + getNoteStrFromObj(sample.notes[2]));
      }
      if (sampleEdits.length > 0) {
        stepEdited = true;
        stepEdits.push(`s${s}${sampleEdits.join('')}`);
      }
    });
    if (stepEdited) {
      edits.push(`S${i}${stepEdits.join('')}`);
    }
  });
  const string = edits.join('');
  return string || 'init';
};

const getNoteStrFromObj = (note) => `p${note.pitch}v${note.velocity}l${note.length}`;

const getNoteObjFromStr = (string) => {
  const noteVals = INIT_NOTE();
  const edits = string.match(valsRegexp);
  if (edits) {
    edits.forEach((edit) => {
      switch (edit[0]) {
        case 'p':
          noteVals.pitch = edit.substr(1);
          break;
        case 'v':
          noteVals.velocity = Number(edit.substr(1));
          break;
        case 'l':
          noteVals.length = Number(edit.substr(1));
          break;
        default:
          break;
      }
    });
  }
  return noteVals;
};

const getVals = (string) => {
  let sample = { noteOn: false, notes: [] };
  const slices = string.match(slicesRegexp);
  if (slices) {
    let note1, note2;
    if (slices[1]) {
      note1 = getNoteObjFromStr(slices[1]);
    } else {
      note1 = getNoteObjFromStr(slices[0]);
    }
    if (slices[2]) {
      note2 = getNoteObjFromStr(slices[2]);
    }
    const n = string.indexOf('n');
    const note0String = string.substr(0, n);
    const note0 = getNoteObjFromStr(note0String);
    sample.notes.push(note0, note1);
    if (note2) sample.notes.push(note2);
  } else {
    const note0 = getNoteObjFromStr(string);
    sample.notes.push(note0);
  }
  if (string[0] === 't') sample.noteOn = true;
  if (string[0] === 'f') sample.noteOn = false;
  return sample;
};

const getEntries = (string, regexp) => {
  const array = string.split(regexp);
  const entries = [];
  for (let i = 1, len = array.length; i < len; i += 2) {
    let key = array[i];
    let val = array[i + 1];
    let entry = [key, val];
    entries.push(entry);
  }
  return entries;
};

export const getPatternFromStr = (editString) => {
  const pattern = INIT_PATTERN();
  if (editString === 'init') return pattern;
  const stepEntries = getEntries(editString, stepRegexp);
  stepEntries.forEach(([step, sampleEditsString]) => {
    const sampleEntries = getEntries(sampleEditsString, sampleRegexp);
    sampleEntries.forEach(([sample, edits]) => {
      pattern[step][sample] = getVals(edits);
    });
  });
  return pattern;
};
