import React, { useCallback, useMemo, useRef } from 'react';
import { Cell } from './Cell';
import { getGrid } from 'utils/getGrid';
import { useDispatch, useSelector } from 'react-redux';
import { setTapCellById } from 'App/reducers/editorSlice';

export const Grid = () => {
  const { gridSize, moveFunc, endFunc, prevCellRef } = useGrid();
  const gridMemo = useMemo(() => {
    const grid = getGrid(gridSize);
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
  }, [endFunc, gridSize, moveFunc, prevCellRef]);
  return gridMemo;
};

const useGrid = () => {
  const dispatch = useDispatch();
  const gridSize = useSelector((state) => state.sequence.present.length);
  const notEditing = useSelector((state) => state.editor.selectedSample === -1);

  const prevCellRef = useRef(null);

  const onTouchMove = useCallback(
    (e) => {
      if (notEditing) return;
      if (!prevCellRef.current) return;
      const cell = getTouchedCell(e);
      const id = getIdOfCellToTap(cell, prevCellRef.current);
      if (!id) return;
      dispatch(setTapCellById({ id, val: true }));
      prevCellRef.current = id;
    },
    [dispatch, notEditing]
  );
  const moveFunc = (e) => onTouchMove(e);
  const endFunc = () => (prevCellRef.current = null);

  return { gridSize, moveFunc, endFunc, prevCellRef };
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
