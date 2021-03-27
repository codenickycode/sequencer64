import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modCell } from '../../reducers/sequenceSlice';
import * as defaultKits from '../../defaults/defaultKits';
import { SawIcon } from '../../../../icons';
import { MIDI_NOTES } from '../../utils/MIDI_NOTES';
import { setTapCellById, setToggleOn } from '../../reducers/editorSlice';

export const Grid = () => {
  const dispatch = useDispatch();
  const length = useSelector((state) => state.sequence.present.length);
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const prevCellRef = useRef(null);

  const onTouchMove = (e) => {
    if (selectedSample === -1) return;
    const touch = e.touches[0];
    const cell = document.elementFromPoint(touch.clientX, touch.clientY);
    if (cell) {
      const id = cell.id;
      if (!id.match(/cell/)) return;
      if (prevCellRef.current !== id) {
        dispatch(setTapCellById({ id, val: true }));
        prevCellRef.current = id;
      }
    }
  };

  let grid = useMemo(() => {
    let grid = [];
    for (let i = 0; i < length; i++) {
      grid.push(i);
    }
    return grid;
  }, [length]);

  // console.log('rendering: Grid');
  return (
    <div
      id='grid'
      className={selectedSample === -1 ? '' : 'no-drag'}
      onTouchMove={onTouchMove}
    >
      {grid.map((step) => {
        const id = `cell-${step}`;
        return (
          <Cell key={id} id={id} step={step} selectedSample={selectedSample} />
        );
      })}
    </div>
  );
};

const Cell = ({ id, step, selectedSample }) => {
  const dispatch = useDispatch();

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
      dispatch(setToggleOn(!noteOn));
      tapCell();
    },
    [dispatch, noteOn, tapCell]
  );

  const cellMemo = useMemo(() => {
    // console.log('rendering: Cell');
    const cellClasses = noteOn ? 'cell on' : 'cell';
    const midiNote = MIDI_NOTES.indexOf(pitch);
    const pitchUpClasses =
      noteOn && midiNote > 24 ? 'pitch-up show' : 'pitch-up';
    const pitchDownClasses =
      noteOn && midiNote < 24 ? 'pitch-down show' : 'pitch-down';
    const pitchShift = midiNote - 24;
    const slice1Classes =
      noteOn && slice === 2
        ? 'slice slice-2'
        : noteOn && slice === 3
        ? 'slice slice-3'
        : 'slice';
    const slice2Classes = noteOn && slice > 2 ? 'slice slice-2' : 'slice';
    const bgColorStyle = {
      opacity: noteOn ? velocity : 0,
      width: length === 1 ? '100%' : `${100 * length * 3}%`,
    };
    return (
      <div className='cell-wrapper'>
        <div id={id} className={cellClasses} onTouchStart={onTouchStart}>
          <div className='cell-mods'>
            <p className={pitchUpClasses}>+{pitchShift}</p>
            <p className={pitchDownClasses}>{pitchShift}</p>
            <div className={slice1Classes}>
              <SawIcon />
            </div>
            <div className={slice2Classes}>
              <SawIcon />
            </div>
          </div>
          <div className='bg' />
          <div
            style={bgColorStyle}
            className={`bg-color bg${selectedSample}`}
          />
          <div className='cursor' />
          <div className='border-flashing' />
          <SampleCells id={id} step={step} />
        </div>
      </div>
    );
  }, [
    noteOn,
    velocity,
    length,
    id,
    onTouchStart,
    pitch,
    slice,
    selectedSample,
    step,
  ]);

  return cellMemo;
};

const SampleCells = ({ id, step }) => {
  const kit = useSelector((state) => state.sequence.present.kit);
  const samples = defaultKits[kit].samples;

  let grid = [];
  for (let i = 0; i < samples.length; i++) {
    grid.push(i);
  }

  // console.log('rendering: SampleCells');
  return (
    <div className='sample-cells'>
      {grid.map((i) => {
        const scId = `${id}-sample-${i}`;
        return <SampleCell key={scId} id={scId} step={step} i={i} />;
      })}
    </div>
  );
};

const SampleCell = ({ id, step, i }) => {
  const noteOn = useSelector(
    (state) => state.sequence.present.pattern[step][i].noteOn
  );
  const velocity = useSelector(
    (state) => state.sequence.present.pattern[step][i].notes[0].velocity
  );
  const scMemo = useMemo(() => {
    // console.log('rendering: SampleCell');
    const classes = `sample-cell bg${i}`;
    return (
      <div
        id={id}
        className={classes}
        style={{ opacity: noteOn ? velocity : 0 }}
      />
    );
  }, [i, id, noteOn, velocity]);
  return scMemo;
};
