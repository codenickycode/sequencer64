import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { SliceIcon } from 'assets/icons';
import { useCell } from './useCell';
import { useTouchAndMouse } from 'utils/hooks/useTouchAndMouse';
import { getGrid } from 'utils/getGrid';

export const Cell = ({ id, step, prevCellRef }) => {
  const { state, startFunc } = useCell(id, step, prevCellRef);
  const { classes, styles, values } = state;

  const { onTouchStart, onMouseDown } = useTouchAndMouse(startFunc);

  const cellMemo = useMemo(() => {
    return (
      <div className='cellWrapper'>
        <div
          id={id}
          className={classes.cell}
          onTouchStart={onTouchStart}
          onMouseDown={onMouseDown}
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
    onTouchStart,
    onMouseDown,
    styles.bg,
    values.midiNote,
    step,
  ]);
  return cellMemo;
};

const SampleCells = ({ id, step }) => {
  const kit = useSelector((state) => state.sequence.present.kit);
  const length = useSelector((state) => state.assets.kits[kit].samples.length);

  const sampleCellsMemo = useMemo(() => {
    const grid = getGrid(length);
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
  const noteOn = useSelector((state) => state.sequence.present.pattern[step][i].noteOn);
  const velocity = useSelector(
    (state) => state.sequence.present.pattern[step][i].notes[0].velocity
  );
  const scMemo = useMemo(() => {
    const classes = `sample-cell bg${i}`;
    return <div id={id} className={classes} style={{ opacity: noteOn ? velocity : 0 }} />;
  }, [i, id, noteOn, velocity]);
  return scMemo;
};
