import React, { useMemo, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTapCellById } from 'App/reducers/editorSlice';
import { Cell } from './Cell';

export const Grid = () => {
  const dispatch = useDispatch();
  const length = useSelector((state) => state.sequence.present.length);
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const prevCellRef = useRef(null);

  const onTouchMove = useCallback(
    (e) => {
      if (selectedSample === -1) return;
      let cell;
      if (e.touches) {
        const touch = e.touches[0];
        cell = document.elementFromPoint(touch.clientX, touch.clientY);
      } else {
        cell = e.target;
      }
      if (cell) {
        const id = cell.id;
        if (!id.match(/cell/)) return;
        if (prevCellRef.current !== id) {
          dispatch(setTapCellById({ id, val: true }));
          prevCellRef.current = id;
        }
      }
    },
    [dispatch, selectedSample]
  );

  const gridMemo = useMemo(() => {
    const moveFunc = (e) => {
      if (prevCellRef.current) onTouchMove(e);
    };

    const endFunc = () => {
      prevCellRef.current = null;
    };

    // console.log('rendering: Grid');
    let grid = [];
    for (let i = 0; i < length; i++) {
      grid.push(i);
    }
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
          return (
            <Cell key={id} id={id} step={step} prevCellRef={prevCellRef} />
          );
        })}
      </div>
    );
  }, [length, onTouchMove]);
  return gridMemo;
};
