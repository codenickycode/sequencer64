import React, {
  useEffect,
  useContext,
  useMemo,
  useRef,
  useCallback,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modCell } from '../../reducers/sequenceSlice';
import * as defaultKits from '../../defaults/defaultKits';
import { SawIcon } from '../../../../icons';
import { PatternRef } from '../../providers/PatternRef';
import { MIDI_NOTES } from '../../utils/MIDI_NOTES';
import { setTapCellById, setToggleOn } from '../../reducers/editorSlice';

export const Grid = () => {
  const dispatch = useDispatch();
  const length = useSelector((state) => state.sequence.present.length);
  const selectedSound = useSelector((state) => state.editor.selectedSound);

  const prevCellRef = useRef(null);

  const onTouchMove = (e) => {
    if (selectedSound === -1) return;
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
      className={selectedSound === -1 ? '' : 'no-drag'}
      onTouchMove={onTouchMove}
    >
      {grid.map((step) => {
        const id = `cell-${step}`;
        return (
          <Cell key={id} id={id} step={step} selectedSound={selectedSound} />
        );
      })}
    </div>
  );
};

const Cell = ({ id, step, selectedSound }) => {
  const dispatch = useDispatch();

  const noteOn = useSelector((state) =>
    selectedSound !== -1
      ? state.sequence.present.pattern[step][selectedSound].noteOn
      : false
  );
  const slice = useSelector((state) =>
    selectedSound !== -1
      ? state.sequence.present.pattern[step][selectedSound].notes.length
      : 1
  );
  const pitch = useSelector((state) =>
    selectedSound !== -1
      ? state.sequence.present.pattern[step][selectedSound].notes[0].pitch
      : 24
  );
  const length = useSelector((state) =>
    selectedSound !== -1
      ? state.sequence.present.pattern[step][selectedSound].notes[0].length
      : 1
  );
  const velocity = useSelector((state) =>
    selectedSound !== -1
      ? state.sequence.present.pattern[step][selectedSound].notes[0].velocity
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

  const { cellsRef } = useContext(PatternRef);
  const cellRef = useRef(null);
  useEffect(() => {
    cellsRef.current[id] = { events: {} };
    cellsRef.current[id].cellRef = cellRef;
  }, [id, cellsRef]);

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
        <div
          ref={cellRef}
          id={id}
          className={cellClasses}
          onTouchStart={onTouchStart}
        >
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
          <div style={bgColorStyle} className={`bg-color bg${selectedSound}`} />
          <div className='cursor' />
          <div className='border-flashing' />
          <SoundCells id={id} step={step} />
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
    selectedSound,
    step,
  ]);

  return cellMemo;
};

const SoundCells = ({ id, step }) => {
  const kit = useSelector((state) => state.sequence.present.kit);
  const sounds = defaultKits[kit].sounds;

  let grid = [];
  for (let i = 0; i < sounds.length; i++) {
    grid.push(i);
  }

  // console.log('rendering: SoundCells');
  return (
    <div className='sound-cells'>
      {grid.map((i) => {
        const scId = `${id}-sound-${i}`;
        return <SoundCell key={scId} id={scId} step={step} i={i} />;
      })}
    </div>
  );
};

const SoundCell = ({ id, step, i }) => {
  const noteOn = useSelector(
    (state) => state.sequence.present.pattern[step][i].noteOn
  );
  const velocity = useSelector(
    (state) => state.sequence.present.pattern[step][i].notes[0].velocity
  );
  const scMemo = useMemo(() => {
    // console.log('rendering: SoundCell');
    const classes = `sound-cell bg${i}`;
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
