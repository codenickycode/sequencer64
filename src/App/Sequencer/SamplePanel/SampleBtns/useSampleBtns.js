import * as Tone from 'tone';
import { edit } from 'App/reducers/editorSlice';
import { Kit } from 'App/Tone';
import { useDispatch, useSelector } from 'react-redux';
import { recordSample } from 'App/reducers/sequenceSlice';
import {
  areWeTapRecording,
  areWeTapping,
} from 'App/reducers/abstractState/abstractEditorState';
import { useAutoFalseState } from 'hooks/useAutoFalseState';
import { useEffect } from 'react';
import { useCurrentPath, useGoTo } from 'hooks/useGoTo';
import { vanillaShowAndHideClass } from 'hooks/useShowAndHide';

export const useSampleBtnContainer = () => {
  const dispatch = useDispatch();
  const goTo = useGoTo();
  const { atBase } = useCurrentPath();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const sequenceKitName = useSelector((state) => state.sequence.present.kit);
  const kit = useSelector((state) => state.assets.kits[sequenceKitName]);

  const selectSample = (i) => {
    dispatch(edit({ sample: i }));
    if (!atBase) goTo.base();
  };

  return { kit, selectedSample, selectSample };
};

export const useSampleBtn = (selectSample, selected, i) => {
  const dispatch = useDispatch();
  const editorMode = useSelector((state) => state.editor.mode);
  const recording = areWeTapRecording(editorMode);
  const tapping = areWeTapping(editorMode);
  const { mixingSamples } = useCurrentPath();

  const [flash, setFlash] = useAutoFalseState(100);

  // flash mix panel
  useEffect(() => {
    if (!flash || !mixingSamples) return;
    vanillaShowAndHideClass(`mixItem${i}`, 'flash', 100);
  }, [flash, i, mixingSamples]);

  const startFunc = (numpad) => {
    if (recording) dispatch(recordSample(i));
    if (tapping || numpad) {
      Kit.samples[i].sampler.triggerAttack('C2', Tone.immediate(), 1);
      setFlash(true);
    }
  };

  useEffect(() => {
    function mpcStyle(e) {
      if (e.code === Kit.samples[i].code) startFunc(true);
    }
    document.addEventListener('keydown', mpcStyle);
    return () => document.removeEventListener('keydown', mpcStyle);
  });

  const onClick = () => {
    if (!tapping) selectSample(i);
  };

  let containerClass = 'sampleBtn';
  if (selected) containerClass += ' selected';
  if (flash) containerClass += ' flash';

  return { containerClass, startFunc, onClick };
};
