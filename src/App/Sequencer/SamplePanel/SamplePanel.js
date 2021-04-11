import React, { useLayoutEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close, setMode, MODES } from 'App/reducers/editorSlice';
import { setBigEnough, getBigEnough } from 'App/reducers/appSlice';
import { Erase, Slice, Copy } from 'App/Sequencer/SamplePanel/EraseSliceCopy';
import { PitchVelocityLength } from 'App/Sequencer/SamplePanel/PitchVelocityLength';
import { showEditable, hideEditable } from 'utils/toggleClasses';
import { SampleEditMenu } from './SampleEditMenu';
import { SampleBtns } from './SampleBtns';
import { Analyzer } from './Analyzer';

export const SamplePanel = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.editor.mode);
  const landscape = useSelector((state) => state.app.landscape);
  const bigEnough = useSelector((state) => state.app.bigEnough);

  useLayoutEffect(() => {
    const newBigEnough = getBigEnough();
    if (newBigEnough !== bigEnough) dispatch(setBigEnough(newBigEnough));
  }, [bigEnough, dispatch]);

  const spMemo = useMemo(() => {
    // console.log('rendering: SamplePanel');
    const onReturn = () => {
      if (mode !== MODES.COPY) {
        hideEditable();
      }
      dispatch(setMode(MODES.PAINT));
    };

    const onClose = () => dispatch(close());

    const selectMode = (mode) => {
      if (mode && mode !== MODES.PAINT && mode !== MODES.COPY) showEditable();
      dispatch(setMode(mode));
    };

    return bigEnough ? (
      <>
        {!mode ? (
          <div className='editMenuWrapper'>
            <Analyzer />
          </div>
        ) : mode === MODES.PAINT ? (
          <div className='editMenuWrapper'>
            <SampleEditMenu
              selectMode={selectMode}
              onClose={onClose}
              bigEnough={bigEnough}
              showingAnalyzer={!mode}
            />
          </div>
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
        <SampleBtns />
      </>
    ) : (
      <>
        {mode === MODES.PAINT ? (
          <SampleEditMenu
            selectMode={selectMode}
            onClose={onClose}
            bigEnough={bigEnough}
          />
        ) : mode === MODES.ERASE ? (
          <Erase onReturn={onReturn} landscape={landscape} />
        ) : mode === MODES.SLICE ? (
          <Slice onReturn={onReturn} landscape={landscape} />
        ) : mode === MODES.COPY ? (
          <Copy onReturn={onReturn} landscape={landscape} />
        ) : mode === MODES.TAP || !mode ? (
          <SampleBtns />
        ) : (
          <PitchVelocityLength onReturn={onReturn} mode={mode} />
        )}
      </>
    );
  }, [bigEnough, dispatch, landscape, mode]);

  return spMemo;
};
