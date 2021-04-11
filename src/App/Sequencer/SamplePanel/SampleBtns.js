import * as Tone from 'tone';
import { edit, MODES } from 'App/reducers/editorSlice';
import { Kit } from 'App/reducers/toneSlice';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTouchAndMouse } from 'utils/useTouchAndMouse';
import * as icons from 'assets/icons/kit';

export const SampleBtns = () => {
  const dispatch = useDispatch();
  const sequenceKitName = useSelector((state) => state.sequence.present.kit);
  const kit = useSelector((state) => state.assets.kits[sequenceKitName]);

  const sampleBtnsMemo = useMemo(() => {
    // console.log('rendering: SampleBtns');
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
            />
          ))}
        <div id='samplePanelBorder' />
      </div>
    );
  }, [dispatch, kit]);
  return sampleBtnsMemo;
};

const SampleBtn = ({ i, sample, selectSample }) => {
  const mode = useSelector((state) => state.editor.mode);
  const tapping = mode === MODES.TAP;

  const [flash, setFlash] = useState(false);
  useEffect(() => {
    if (flash) setTimeout(() => setFlash(false), 100);
  }, [flash]);

  const startFunc = useCallback(
    (e) => {
      if (tapping) {
        Kit.samples[i].sampler.triggerAttack('C2', Tone.immediate(), 1);
        setFlash(true);
      }
    },
    [i, tapping]
  );

  const onClick = () => {
    if (!tapping) selectSample(i);
  };

  const { touchStart, mouseDown } = useTouchAndMouse(startFunc);
  return (
    <div
      className={flash ? 'sampleBtn flash' : 'sampleBtn'}
      onTouchStart={touchStart}
      onMouseDown={mouseDown}
      onClick={onClick}
      aria-label={sample.name}
    >
      {icons[sample.icon](sample.color)}
      <div className={`border border${i}`} />
      <div className='bgFlash' />
    </div>
  );
};
