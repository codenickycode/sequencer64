import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { MIDI_NOTES } from 'utils/MIDI_NOTES';

export const useCellState = (id, step) => {
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const noteOn = useSelector((state) =>
    selectedSample !== -1
      ? state.sequence.present.pattern[step][selectedSample].noteOn
      : false
  );
  const slice = useSelector((state) =>
    selectedSample !== -1
      ? state.sequence.present.pattern[step][selectedSample].notes.length
      : 1
  );
  const pitch = useSelector((state) =>
    selectedSample !== -1
      ? state.sequence.present.pattern[step][selectedSample].notes[0].pitch
      : 24
  );
  const length = useSelector((state) =>
    selectedSample !== -1
      ? state.sequence.present.pattern[step][selectedSample].notes[0].length
      : 1
  );
  const velocity = useSelector((state) =>
    selectedSample !== -1
      ? state.sequence.present.pattern[step][selectedSample].notes[0].velocity
      : 1
  );

  const state = useMemo(() => {
    const classes = {};
    const styles = {};
    const values = {};

    values.midiNote = MIDI_NOTES.indexOf(pitch);
    values.pitchShift = values.midiNote - 24;
    values.noteOn = noteOn;

    classes.cell = noteOn ? 'cell on' : 'cell';
    classes.bgColor = `bgColor bg${selectedSample}`;
    classes.slice1 =
      noteOn && slice === 2
        ? 'slice slice-2'
        : noteOn && slice === 3
        ? 'slice slice-3'
        : 'slice';
    classes.slice2 = noteOn && slice > 2 ? 'slice slice-2' : 'slice';

    styles.bgColor = {
      opacity: noteOn ? velocity : 0,
      transform: length >= 1 ? 'scaleX(1)' : `scaleX(${length * 3})`,
    };

    return { classes, styles, values };
  }, [length, noteOn, pitch, selectedSample, slice, velocity]);

  return state;
};
