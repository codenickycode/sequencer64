import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close, setMode, MODES } from 'App/reducers/editorSlice';
import { Erase, Slice, Copy } from 'App/Sequencer/SamplePanel/EraseSliceCopy';
import { PitchVelocityLength } from 'App/Sequencer/SamplePanel/PitchVelocityLength';
import { showEditable, hideEditable } from 'utils/toggleClasses';
import { SampleEditMenu } from './SampleEditMenu';
import { SampleBtns } from './SampleBtns';
import { VisualPanel } from 'App/Sequencer/VisualPanel/VisualPanel';

export const SamplePanel = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.editor.mode);
  const landscape = useSelector((state) => state.app.landscape);
  const splitSamplePanel = useSelector((state) => state.app.splitSamplePanel);

  const spMemo = useMemo(() => {
    // console.log('rendering: SamplePanel');
    const onReturn = () => {
      if (mode !== MODES.COPY) {
        hideEditable();
      }
      dispatch(setMode(MODES.PAINT));
    };

    const onClose = () => {
      dispatch(close());
    };

    const selectMode = (mode) => {
      if (mode && mode !== MODES.PAINT && mode !== MODES.COPY) showEditable();
      dispatch(setMode(mode));
    };

    return (
      <>
        <div className={splitSamplePanel ? 'spTop' : 'noSplit'}>
          {splitSamplePanel && <VisualPanel />}
          {mode === MODES.PAINT ? (
            <SampleEditMenu selectMode={selectMode} onClose={onClose} />
          ) : mode === MODES.ERASE ? (
            <Erase onReturn={onReturn} landscape={landscape} />
          ) : mode === MODES.SLICE ? (
            <Slice onReturn={onReturn} landscape={landscape} />
          ) : mode === MODES.COPY ? (
            <Copy onReturn={onReturn} landscape={landscape} />
          ) : mode === MODES.MOD_PITCH ||
            mode === MODES.MOD_VELOCITY ||
            mode === MODES.MOD_LENGTH ? (
            <PitchVelocityLength onReturn={onReturn} mode={mode} />
          ) : null}
        </div>
        <SampleBtns />
      </>
    );
  }, [splitSamplePanel, mode, landscape, dispatch]);

  return spMemo;
};
