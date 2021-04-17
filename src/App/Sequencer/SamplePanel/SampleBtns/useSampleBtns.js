import * as Tone from 'tone';
import { edit } from 'App/reducers/editorSlice';
import { Kit } from 'App/Tone';
import { useDispatch, useSelector } from 'react-redux';
import { recordSample } from 'App/reducers/sequenceSlice';
import {
  areWeTapRecording,
  areWeTapping,
} from 'App/reducers/abstractState/abstractEditorState';
import { useAutoFalseState } from 'utils/hooks/useAutoFalseState';

export const useSampleBtnContainer = () => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const sequenceKitName = useSelector((state) => state.sequence.present.kit);
  const kit = useSelector((state) => state.assets.kits[sequenceKitName]);

  const selectSample = (i) => dispatch(edit({ sample: i }));

  return { kit, selectedSample, selectSample };
};

export const useSampleBtn = (selectSample, selected, i) => {
  const dispatch = useDispatch();
  const editorMode = useSelector((state) => state.editor.mode);
  const recording = areWeTapRecording(editorMode);
  const tapping = areWeTapping(editorMode);

  const [flash, setFlash] = useAutoFalseState(100);

  const startFunc = (e) => {
    if (recording) dispatch(recordSample(i));
    if (tapping) {
      Kit.samples[i].sampler.triggerAttack('C2', Tone.immediate(), 1);
      setFlash(true);
    }
  };

  const onClick = () => {
    if (!tapping) selectSample(i);
  };

  let containerClass = 'sampleBtn';
  if (selected) containerClass += ' selected';
  if (flash) containerClass += ' flash';

  return { containerClass, startFunc, onClick };
};
