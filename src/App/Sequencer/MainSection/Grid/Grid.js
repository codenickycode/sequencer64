import React, { useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTapCellById } from 'App/reducers/editorSlice';
import { Cell } from './Cell';
import { getGrid } from 'utils/getGrid';

export const Grid = () => {
  const dispatch = useDispatch();
  const length = useSelector((state) => state.sequence.present.length);
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const prevCellRef = useRef(null);

  const onTouchMove = useCallback(
    (e) => {
      if (selectedSample === -1) return;
      if (!prevCellRef.current) return;
      const cell = getTouchedCell(e);
      const id = getIdOfCellToTap(cell, prevCellRef.current);
      if (!id) return;
      dispatch(setTapCellById({ id, val: true }));
      prevCellRef.current = id;
    },
    [dispatch, selectedSample]
  );

  const gridMemo = useMemo(() => {
    const moveFunc = (e) => onTouchMove(e);
    const endFunc = () => (prevCellRef.current = null);

    const grid = getGrid(length);
    return (
      <div
        id='grid'
        className='grid'
        onTouchMove={moveFunc}
        onMouseMove={moveFunc}
        onTouchEnd={endFunc}
        onMouseUp={endFunc}
      >
        {grid.map((step) => {
          const id = `cell-${step}`;
          return <Cell key={id} id={id} step={step} prevCellRef={prevCellRef} />;
        })}
      </div>
    );
  }, [length, onTouchMove]);
  return gridMemo;
};

const getTouchedCell = (e) => {
  let cell;
  if (e.touches) {
    const touch = e.touches[0];
    cell = document.elementFromPoint(touch.clientX, touch.clientY);
  } else {
    cell = e.target;
  }
  return cell;
};

const getIdOfCellToTap = (cell, prevId) => {
  if (!cell) return null;
  const id = cell.id;
  if (!id.match(/cell/)) return null;
  if (prevId !== id) return id;
  return null;
};
