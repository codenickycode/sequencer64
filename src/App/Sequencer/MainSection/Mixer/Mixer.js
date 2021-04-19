import cuid from 'cuid';
import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'App/shared/Portal';
import { getGrid } from 'utils/getGrid';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Knob } from './Knob';
import { Kit, FX } from 'App/Tone';
import { ArrowUpDownIcon, ChevronDownIcon } from 'assets/icons';

export const Mixer = () => {
  const grid = getGrid(9);
  return (
    <Portal targetId='overGridPortal'>
      <div id='mixer' className='mixer'>
        <div className='mixSamples'>
          {grid.map((i) => {
            return <MixSample key={cuid.slug()} i={i} />;
          })}
        </div>
      </div>
    </Portal>
  );
};

const fxKeys = Object.keys(FX);
const MixSample = ({ i }) => {
  const sample = Kit.samples[i];

  const [fxKey, setProperty] = useState(fxKeys[2]);
  const { value, startFunc, moveFunc, endFunc } = useRotaryKnob(sample, fxKey);
  const touchAndMouse = useTouchAndMouse(startFunc, moveFunc, endFunc);
  useApplyValue(sample, fxKey, value);

  const onChange = ({ target: { value } }) => setProperty(value);

  const id = `mixSample${i}`;
  const knobId = id + fxKey;
  return (
    <div id={id} className='mixSample'>
      <p className='sampleName'>{sample.name}</p>
      <div className='knobWrapper'>
        <div className='knob' id={knobId} {...touchAndMouse}>
          <label htmlFor={knobId}>
            <ArrowUpDownIcon />
          </label>
          <Knob value={value} />
        </div>
      </div>
      <div className='customSelectWrapper'>
        <select id='mixerSelect' className='customSelect' value={fxKey} onChange={onChange}>
          {fxKeys.map((fxKey) => {
            return (
              <option key={`option-${id}-${fxKey}`} value={fxKey}>
                {fxKey}
              </option>
            );
          })}
        </select>
        <ChevronDownIcon />
      </div>
      <div className={`mixSampleBorder border${i}`} />
    </div>
  );
};

const useApplyValue = (sample, fxKey, value) => {
  const prevPropertyRef = useRef(null);
  useEffect(() => {
    if (prevPropertyRef.current !== fxKey) return (prevPropertyRef.current = fxKey);
    sample[fxKey].set({ gain: value / 100 });
  }, [fxKey, sample, value]);
};

const useRotaryKnob = (sample, fxKey) => {
  const [value, setValue] = useState(sample[fxKey].gain.value * 100);
  useEffect(() => {
    setValue(sample[fxKey].gain.value * 100);
  }, [fxKey, sample]);

  const prevYRef = useRef(null);

  const startFunc = (e) => {
    prevYRef.current = getY(e);
  };
  const moveFunc = (e) => {
    const newY = getY(e);
    let amount = getKnobAmount(newY, prevYRef.current);
    prevYRef.current = newY;
    setValue((value) => {
      let newVal = value + amount;
      if (newVal < 0) newVal = 0;
      if (newVal > 100) newVal = 100;
      return newVal;
    });
  };
  const endFunc = () => {
    prevYRef.current = null;
  };

  return { value, startFunc, moveFunc, endFunc };
};

const getY = (e) => {
  let y;
  if (e.touches) y = e.touches[0].clientY;
  else y = e.clientY;
  return y;
};

const getKnobAmount = (newY, prevY) => {
  let amount = prevY - newY;
  return amount;
};
