import * as Tone from 'tone';
import { edit } from 'App/reducers/editorSlice';
import { Kit } from 'App/Tone';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTouchAndMouse } from 'utils/hooks/useTouchAndMouse';
import * as icons from 'assets/icons/kit';
import { recordSample } from 'App/reducers/sequenceSlice';
import { useEditorState } from 'App/reducers/useAbstractState/useEditorState';

export const SampleBtns = () => {
  const dispatch = useDispatch();
  const sequenceKitName = useSelector((state) => state.sequence.present.kit);
  const kit = useSelector((state) => state.assets.kits[sequenceKitName]);
  const selectedSample = useSelector((state) => state.editor.selectedSample);

  const sampleBtnsMemo = useMemo(() => {
    const selectSample = (i) => {
      dispatch(edit({ sample: i }));
    };
    return (
      <div className='menu'>
        {kit &&
          kit.samples.map((sample, i) => (
            <SampleBtn
              key={`sample-menu-${sample.name}`}
              i={i}
              sample={sample}
              selectSample={selectSample}
              selected={selectedSample === i}
            />
          ))}
        <div id='samplePanelBorder' />
      </div>
    );
  }, [dispatch, kit, selectedSample]);
  return sampleBtnsMemo;
};

const SampleBtn = ({ i, sample, selectSample, selected }) => {
  const dispatch = useDispatch();
  const { tapRecording, tapModes } = useEditorState();

  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (flash) setTimeout(() => setFlash(false), 100);
  }, [flash]);

  const startFunc = useCallback(
    (e) => {
      if (tapRecording) dispatch(recordSample(i));
      if (tapModes) {
        Kit.samples[i].sampler.triggerAttack('C2', Tone.immediate(), 1);
        setFlash(true);
      }
    },
    [dispatch, i, tapRecording, tapModes]
  );

  const onClick = () => {
    if (!tapModes) selectSample(i);
  };

  const { onTouchStart, onMouseDown } = useTouchAndMouse(startFunc);

  let classes = 'sampleBtn';
  if (selected) classes += ' selected';
  if (flash) classes += ' flash';
  return (
    <div
      className={classes}
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
      onClick={onClick}
      aria-label={sample.name}
    >
      {icons[sample.icon](sample.color)}
      <div className={`border border${i}`} />
      <div className='bgFlash' />
      <div className={`bgSelected bg${i}`} />
    </div>
  );
};
