import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import * as defaultKits from 'utils/defaultKits';
import { SawIcon } from 'assets/icons';
import { useCellState } from './useCellState';
import { useCellFunctions } from './useCellFunctions';

export const Cell = ({ id, step }) => {
  const state = useCellState(id, step);
  const functions = useCellFunctions(id, step, state.values.noteOn);

  const cellMemo = useMemo(() => {
    // console.log('rendering: Cell');
    const { classes, styles, values } = state;
    return (
      <div className='cellWrapper'>
        <div
          id={id}
          className={classes.cell}
          onTouchStart={functions.onTouchStart}
        >
          <div className={classes.slice1}>
            <SawIcon />
          </div>
          <div className={classes.slice2}>
            <SawIcon />
          </div>
          <div className='bg' />
          <div style={styles.bgColor} className={classes.bgColor} />
          <div className='cursor' />
          <div className='border' />
          <SampleCells id={id} step={step} />
        </div>
      </div>
    );
  }, [state, id, functions.onTouchStart, step]);
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
