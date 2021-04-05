import React, { useCallback, useMemo } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { RedoIcon, UndoIcon } from 'assets/icons';
import { setStatus } from 'App/reducers/appSlice';

let UndoRedoBtn = ({ canUndo, canRedo, onUndo, onRedo }) => {
  const dispatch = useDispatch();

  const undoStatus = useSelector((state) => state.sequence.present.undoStatus);
  const future = useSelector((state) => state.sequence.future);
  const redoStatus = future.length > 0 ? future[0].undoStatus : null;
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);

  const handleUndo = useCallback(() => {
    const prefix = !undoStatus.match(/kit|sequence/g) ? 'undo: ' : '';
    onUndo();
    dispatch(setStatus(prefix + undoStatus));
  }, [dispatch, onUndo, undoStatus]);

  const handleRedo = useCallback(() => {
    const prefix = !redoStatus.match(/kit|sequence/g) ? 'redo: ' : '';
    onRedo();
    dispatch(setStatus(prefix + redoStatus));
  }, [dispatch, onRedo, redoStatus]);

  const undoRedoMemo = useMemo(() => {
    // console.log('rendering: UndoRedo');
    return (
      <>
        <Button
          id='undo'
          classes='menuBtn'
          disabled={!canUndo || !buffersLoaded}
          onClick={handleUndo}
        >
          <UndoIcon />
          <label htmlFor='undo'>undo</label>
        </Button>
        <Button
          id='redo'
          classes='menuBtn'
          disabled={!canRedo || !buffersLoaded}
          onClick={handleRedo}
        >
          <RedoIcon />
          <label htmlFor='redo'>redo</label>
        </Button>
      </>
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

UndoRedoBtn = connect(mapStateToProps, mapDispatchToProps)(UndoRedoBtn);

export { UndoRedoBtn };
