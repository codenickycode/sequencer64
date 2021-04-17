import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eraseAll } from 'App/reducers/sequenceSlice';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { EraseAllIcon } from 'assets/icons';
import { Button } from 'App/shared/Button';

export const EraseBtn = () => {
  const dispatch = useDispatch();

  const deepEditing = useSelector(
    (state) => state.editor.selectedSample !== -1 && state.editor.mode !== MODES.PAINT
  );
  const disabled = useSelector((state) => state.sequence.present.noteTally.total.empty);

  const eraseMemo = useMemo(() => {
    const onClick = () => {
      dispatch(eraseAll());
      if (deepEditing) dispatch(setMode(MODES.PAINT));
    };

    return (
      <>
        <Button id='erase-all' classes='menuBtn' disabled={disabled} onClick={onClick}>
          <EraseAllIcon />
          <label htmlFor='erase-all'>erase</label>
        </Button>
      </>
    );
  }, [disabled, dispatch, deepEditing]);

  return eraseMemo;
};
