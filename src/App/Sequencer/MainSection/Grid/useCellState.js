import { MODES, setTapCellById, setToggleOn } from 'App/reducers/editorSlice';
import { modCell } from 'App/reducers/sequenceSlice';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useCellState = (id, step) => {
  const dispatch = useDispatch();

  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const mode = useSelector((state) => state.editor.mode);

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

  const tapCell = useCallback(() => {
    dispatch(modCell(step, noteOn));
  }, [dispatch, noteOn, step]);

  const tapCellAlert = useSelector((state) => state.editor.tapCellById[id]);
  useEffect(() => {
    if (tapCellAlert) {
      tapCell();
      dispatch(setTapCellById({ id, val: false }));
    }
  }, [dispatch, id, tapCell, tapCellAlert]);

  const onTouchStart = useCallback(
    (e) => {
      e.stopPropagation();
      e.preventDefault();
      dispatch(setToggleOn(!noteOn));
      tapCell();
    },
    [dispatch, noteOn, tapCell]
  );

  const state = useMemo(() => {
    const classes = {};
    const styles = {};
    const values = {};

    values.midiNote = noteOn && mode === MODES.MOD_PITCH ? pitch : null;

    classes.cell = noteOn ? 'cell on' : 'cell';
    classes.bg = noteOn ? `bg bg${selectedSample}` : 'bg';
    classes.slice1 =
      mode === MODES.MOD_PITCH
        ? 'slice'
        : noteOn && slice === 2
        ? 'slice slice-2'
        : noteOn && slice === 3
        ? 'slice slice-3'
        : 'slice';
    classes.slice2 =
      mode === MODES.MOD_PITCH
        ? 'slice'
        : noteOn && slice > 2
        ? 'slice slice-2'
        : 'slice';

    styles.bg = {
      transform: length >= 1 ? 'scaleX(1)' : `scaleX(${length * 3})`,
    };
    if (noteOn) styles.bg.opacity = velocity;

    return { classes, styles, values };
  }, [length, mode, noteOn, pitch, selectedSample, slice, velocity]);

  return { state, onTouchStart };
};
