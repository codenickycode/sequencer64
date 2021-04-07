import React, { useMemo, useRef, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTapCellById } from 'App/reducers/editorSlice';
import { Cell } from './Cell';
import { useDisablePassiveHack } from 'utils/useDisablePassiveHack';

export const Grid = () => {
  const dispatch = useDispatch();
  const length = useSelector((state) => state.sequence.present.length);
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const prevCellRef = useRef(null);

  const onTouchMove = useCallback(
    (e) => {
      e.preventDefault();
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

  const gridRef = useDisablePassiveHack('touchmove', onTouchMove);

  const gridMemo = useMemo(() => {
    // console.log('rendering: Grid');
    const handleMouseMove = (e) => {
      if (prevCellRef.current) onTouchMove(e);
    };

    const handleMouseUp = () => {
      prevCellRef.current = null;
    };

    let grid = [];
    for (let i = 0; i < length; i++) {
      grid.push(i);
    }
    return (
      <div
        ref={gridRef}
        id='grid'
        className='grid'
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
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
