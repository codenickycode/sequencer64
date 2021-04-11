import React, { useLayoutEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { close, setMode, MODES } from 'App/reducers/editorSlice';
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

  const [bigEnough, setBigEnough] = useState(false);
  useLayoutEffect(() => {
    const newBigEnough = getBigEnough();
    if (newBigEnough !== bigEnough) setBigEnough(newBigEnough);
  }, [bigEnough]);

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
        {mode === MODES.PAINT || !mode ? (
          <div className='editMenuWrapper'>
            <SampleEditMenu
              selectMode={selectMode}
              onClose={onClose}
              bigEnough={bigEnough}
              showingAnalyzer={!mode}
            />
            {!mode && <Analyzer />}
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

const getBigEnough = () => {
  const samplePanel = document.getElementById('samplePanel');
  const enoughSpace = samplePanel?.clientHeight > 700;
  return enoughSpace;
};
