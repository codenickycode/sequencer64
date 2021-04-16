import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, MODES } from 'App/reducers/editorSlice';
import { Erase, Slice, Copy } from 'App/Sequencer/SamplePanel/EraseSliceCopy';
import { PitchVelocityLength } from 'App/Sequencer/SamplePanel/PitchVelocityLength';
import { SampleEditMenu } from './SampleEditMenu';
import { SampleBtns } from './SampleBtns';
import { VisualPanel } from 'App/Sequencer/VisualPanel/VisualPanel';
import { areCellsEditable, getIsActive } from 'App/reducers/useAbstractState/useEditorState';
import { hideEditable, showEditable } from 'utils/toggleClasses';

export const SamplePanel = () => {
  const { splitSamplePanel, isActive, onReturn } = useSamplePanel();
  const memo = useMemo(() => {
    return (
      <>
        <div className={splitSamplePanel ? 'spTop' : 'noSplit'}>
          {splitSamplePanel && <VisualPanel />}
          {isActive[MODES.PAINT] && <SampleEditMenu />}
          {isActive[MODES.ERASE] && <Erase onReturn={onReturn} />}
          {isActive[MODES.SLICE] && <Slice onReturn={onReturn} />}
          {isActive[MODES.COPY] && <Copy onReturn={onReturn} />}
          {(isActive[MODES.MOD_PITCH] ||
            isActive[MODES.MOD_VELOCITY] ||
            isActive[MODES.MOD_LENGTH]) && (
            <PitchVelocityLength onReturn={onReturn} isActive={isActive} />
          )}
        </div>
        <SampleBtns />
      </>
    );
  }, [splitSamplePanel, isActive, onReturn]);

  return memo;
};

const useSamplePanel = () => {
  const dispatch = useDispatch();
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const editorMode = useSelector((state) => state.editor.mode);
  const isActive = getIsActive(editorMode);

  if (areCellsEditable(editorMode)) showEditable();
  if (isActive[MODES.PAINT]) hideEditable();

  const onReturn = () => dispatch(setMode(MODES.PAINT));

  return { splitSamplePanel, isActive, onReturn };
};
