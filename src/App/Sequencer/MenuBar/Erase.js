import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { eraseAll } from 'App/reducers/sequenceSlice';
import { MODES, setMode } from 'App/reducers/editorSlice';
import { EraseAllIcon } from 'assets/icons';
import { Button } from 'App/shared/Button';

export const Erase = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.editor.mode);
  const editing = mode && mode !== MODES.PAINTING;
  const disabled = useSelector(
    (state) => state.sequence.present.noteTally.total.empty
  );

  const eraseMemo = useMemo(() => {
    const onClick = () => {
      dispatch(eraseAll());
      if (editing) {
        dispatch(setMode(MODES.PAINTING));
      }
    };

    // console.log('rendering: Erase');
    return (
      <div className='menuItems'>
        <Button
          id='erase-all'
          classes='menuBtn'
          disabled={disabled}
          onClick={onClick}
        >
          <EraseAllIcon />
          <label htmlFor='erase-all'>erase pattern</label>
        </Button>
      </div>
    );
  }, [disabled, dispatch, editing]);

  return eraseMemo;
};
