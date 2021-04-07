import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as defaultKits from 'utils/defaultKits';
import { SliceIcon } from 'assets/icons';
import { useCellState } from './useCellState';
import { useTouchAndMouse } from 'utils/useTouchAndMouse';

export const Cell = ({ id, step, prevCellRef }) => {
  const { state, onTouchStart } = useCellState(id, step, prevCellRef);
  const { classes, styles, values } = state;

  const { touchStart, mouseDown } = useTouchAndMouse(onTouchStart);

  const cellMemo = useMemo(() => {
    // console.log('rendering: Cell');
    return (
      <div className='cellWrapper'>
        <div
          id={id}
          className={classes.cell}
          onTouchStart={touchStart}
          onMouseDown={mouseDown}
        >
          <SliceIcon addClass={classes.slice1} />
          <SliceIcon addClass={classes.slice2} />
          <div style={styles.bg} className={classes.bg} />
          <div className='border' />
          <div className='pitch'>{values.midiNote}</div>
          <SampleCells id={id} step={step} />
        </div>
      </div>
    );
  }, [
    id,
    classes.cell,
    classes.slice1,
    classes.slice2,
    classes.bg,
    touchStart,
    mouseDown,
    styles.bg,
    values.midiNote,
    step,
  ]);
  return cellMemo;
};

const SampleCells = ({ id, step }) => {
  const kit = useSelector((state) => state.sequence.present.kit);
  const length = defaultKits[kit].samples.length;

  const sampleCellsMemo = useMemo(() => {
    // console.log('rendering: SampleCells');
    let grid = [];
    for (let i = 0; i < length; i++) {
      grid.push(i);
    }
    return (
      <div className='sample-cells'>
        {grid.map((i) => {
          const scId = `${id}-sample-${i}`;
          return <SampleCell key={scId} id={scId} step={step} i={i} />;
        })}
      </div>
    );
  }, [id, length, step]);
  return sampleCellsMemo;
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
