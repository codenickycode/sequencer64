import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eraseAll } from 'App/reducers/sequenceSlice';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { EraseAllIcon } from 'assets/icons';
import { Button } from 'App/shared/Button';
import { useAbstractState } from 'utils/hooks/useAbstractState';

export const EraseBtn = () => {
  const dispatch = useDispatch();
  const { deepEditing } = useAbstractState();

  const disabled = useSelector(
    (state) => state.sequence.present.noteTally.total.empty
  );

  const eraseMemo = useMemo(() => {
    const onClick = () => {
      dispatch(eraseAll());
      if (deepEditing) dispatch(setMode(MODES.PAINT));
    };

    // console.log('rendering: Erase');
    return (
      <>
        <Button
          id='erase-all'
          classes='menuBtn'
          disabled={disabled}
          onClick={onClick}
        >
          <EraseAllIcon />
          <label htmlFor='erase-all'>erase</label>
        </Button>
      </>
    );
  }, [disabled, dispatch, deepEditing]);

  return eraseMemo;
};
