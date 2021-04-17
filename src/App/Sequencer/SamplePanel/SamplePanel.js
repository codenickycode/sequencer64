import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, MODES } from 'App/reducers/editorSlice';
import { Erase, Slice, Copy } from 'App/Sequencer/SamplePanel/Modes/EraseSliceCopy';
import { PitchVelocityLength } from 'App/Sequencer/SamplePanel/Modes/PitchVelocityLength';
import { SampleEditMenu } from './EditMenu/SampleEditMenu';
import { SampleBtns } from './SampleBtns/SampleBtns';
import { VisualPanel } from 'App/Sequencer/VisualPanel/VisualPanel';
import {
  areCellsEditable,
  getSampleEditModes,
} from 'App/reducers/abstractState/abstractEditorState';
import { hideEditable, showEditable } from 'utils/toggleClasses';

export const SamplePanel = () => {
  const { splitSamplePanel, sampleEditModes, onReturn } = useSamplePanel();

  const memo = useMemo(() => {
    const { painting, erasing, slicing, copying } = sampleEditModes;
    const { moddingPitch, moddingVelocity, moddingLength } = sampleEditModes;
    return (
      <>
        <div className={splitSamplePanel ? 'spTop' : 'noSplit'}>
          {splitSamplePanel && <VisualPanel />}
          {painting && <SampleEditMenu />}
          {erasing && <Erase onReturn={onReturn} />}
          {slicing && <Slice onReturn={onReturn} />}
          {copying && <Copy onReturn={onReturn} />}
          {(moddingPitch || moddingVelocity || moddingLength) && (
            <PitchVelocityLength onReturn={onReturn} moddingPitch={moddingPitch} />
          )}
        </div>
        <SampleBtns />
      </>
    );
  }, [sampleEditModes, splitSamplePanel, onReturn]);

  return memo;
};

const useSamplePanel = () => {
  const dispatch = useDispatch();
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const editorMode = useSelector((state) => state.editor.mode);
  const sampleEditModes = getSampleEditModes(editorMode);
  const { painting } = sampleEditModes;

  if (areCellsEditable(editorMode)) showEditable();
  if (painting) hideEditable();

  const onReturn = () => dispatch(setMode(MODES.PAINT));

  return { splitSamplePanel, sampleEditModes, onReturn };
};
