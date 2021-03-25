import React, { useCallback, useMemo } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/Button';
import { RedoIcon, UndoIcon } from '../../../../icons';
import { setStatus } from '../../../../reducers/appSlice';

let UndoRedo = ({ canUndo, canRedo, onUndo, onRedo }) => {
  const dispatch = useDispatch();

  const undoStatus = useSelector((state) => state.sequence.present.undoStatus);
  const future = useSelector((state) => state.sequence.future);
  const redoStatus = future.length > 0 ? future[0].undoStatus : null;
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);

  const handleUndo = useCallback(() => {
    dispatch(setStatus('undo: ' + undoStatus));
    onUndo();
  }, [dispatch, onUndo, undoStatus]);

  const handleRedo = useCallback(() => {
    dispatch(setStatus('redo: ' + redoStatus));
    onRedo();
  }, [dispatch, onRedo, redoStatus]);

  const undoRedoMemo = useMemo(() => {
    // console.log('rendering: UndoRedo');
    return (
      <div className='menu-items'>
        <span className='menu-dummy' />
        <Button
          id='undo'
          classes='menu-btn'
          disabled={!canUndo || !buffersLoaded}
          onClick={handleUndo}
        >
          <UndoIcon />
          <label htmlFor='undo' className='menu-label'>
            undo
          </label>
        </Button>
        <Button
          id='redo'
          classes='menu-btn'
          disabled={!canRedo || !buffersLoaded}
          onClick={handleRedo}
        >
          <RedoIcon />
          <label htmlFor='redo' className='menu-label'>
            redo
          </label>
        </Button>
        <span className='menu-dummy' />
      </div>
    );
  }, [buffersLoaded, canRedo, canUndo, handleRedo, handleUndo]);
  return undoRedoMemo;
};

const mapStateToProps = (state) => {
  return {
    canUndo: state.sequence.past.length > 0,
    canRedo: state.sequence.future.length > 0,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
  };
};

UndoRedo = connect(mapStateToProps, mapDispatchToProps)(UndoRedo);

export { UndoRedo };
