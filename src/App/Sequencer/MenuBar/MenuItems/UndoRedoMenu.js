import React, { useCallback, useMemo } from 'react';
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { connect, useDispatch, useSelector } from 'react-redux';
import { UndoRedoIcon } from 'assets/icons';
import { setStatus } from 'App/reducers/appSlice';
import { MenuItem, PopupMenu } from 'App/shared/PopupMenu/PopupMenu';

let UndoRedoMenu = ({ canUndo, canRedo }) => {
  return (
    <PopupMenu
      name='undo/redo'
      Icon={UndoRedoIcon}
      disabled={!canUndo && !canRedo}
      keepOpenOnSelect={true}
    >
      <UndoRedoMenuItems />
    </PopupMenu>
  );
};

let UndoRedoMenuItems = ({ canUndo, canRedo, onUndo, onRedo }) => {
  const dispatch = useDispatch();

  const undoStatus = useSelector((state) => state.sequence.present.undoStatus);
  const future = useSelector((state) => state.sequence.future);
  const redoStatus = future.length > 0 ? future[0].undoStatus : null;

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

  const memo = useMemo(() => {
    return (
      <>
        <MenuItem item='undo' disabled={!canUndo} onClick={handleUndo} />
        <MenuItem item='redo' disabled={!canRedo} onClick={handleRedo} />
      </>
    );
  }, [canRedo, canUndo, handleRedo, handleUndo]);
  return memo;
};

const mapStateToProps = (state) => {
  return {
    canUndo: state.sequence.past.length > 0 && state.tone.buffersLoaded,
    canRedo: state.sequence.future.length > 0 && state.tone.buffersLoaded,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUndo: () => dispatch(UndoActionCreators.undo()),
    onRedo: () => dispatch(UndoActionCreators.redo()),
  };
};

UndoRedoMenu = connect(mapStateToProps)(UndoRedoMenu);
export { UndoRedoMenu };
UndoRedoMenuItems = connect(mapStateToProps, mapDispatchToProps)(UndoRedoMenuItems);
