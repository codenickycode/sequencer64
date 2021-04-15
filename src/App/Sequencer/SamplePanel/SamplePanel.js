import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, MODES } from 'App/reducers/editorSlice';
import { Erase, Slice, Copy } from 'App/Sequencer/SamplePanel/EraseSliceCopy';
import { PitchVelocityLength } from 'App/Sequencer/SamplePanel/PitchVelocityLength';
import { SampleEditMenu } from './SampleEditMenu';
import { SampleBtns } from './SampleBtns';
import { VisualPanel } from 'App/Sequencer/VisualPanel/VisualPanel';
import { useEditorState } from 'App/reducers/useAbstractState/useEditorState';
import { hideEditable, showEditable } from 'utils/toggleClasses';

export const SamplePanel = () => {
  const dispatch = useDispatch();

  const { editorMode, cellsEditable, paintMode } = useEditorState();
  if (cellsEditable) showEditable();
  if (paintMode) hideEditable();

  const landscape = useSelector((state) => state.screen.dimensions.landscape);
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);

  const spMemo = useMemo(() => {
    const onReturn = () => dispatch(setMode(MODES.PAINT));
    return (
      <>
        <div className={splitSamplePanel ? 'spTop' : 'noSplit'}>
          {splitSamplePanel && <VisualPanel />}
          {editorMode === MODES.PAINT ? (
            <SampleEditMenu />
          ) : editorMode === MODES.ERASE ? (
            <Erase onReturn={onReturn} landscape={landscape} />
          ) : editorMode === MODES.SLICE ? (
            <Slice onReturn={onReturn} landscape={landscape} />
          ) : editorMode === MODES.COPY ? (
            <Copy onReturn={onReturn} landscape={landscape} />
          ) : editorMode === MODES.MOD_PITCH ||
            editorMode === MODES.MOD_VELOCITY ||
            editorMode === MODES.MOD_LENGTH ? (
            <PitchVelocityLength onReturn={onReturn} editorMode={editorMode} />
          ) : null}
        </div>
        <SampleBtns />
      </>
    );
  }, [splitSamplePanel, editorMode, landscape, dispatch]);

  return spMemo;
};
