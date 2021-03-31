import { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { modCell } from 'App/reducers/sequenceSlice';
import { setTapCellById, setToggleOn } from 'App/reducers/editorSlice';

export const useCellFunctions = (id, step, noteOn) => {
  const dispatch = useDispatch();

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

  return { onTouchStart };
};
