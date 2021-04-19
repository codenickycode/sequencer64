import cuid from 'cuid';
import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'App/shared/Portal';
import { getGrid } from 'utils/getGrid';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Knob } from './Knob';
import { Kit, CHANNEL_PROPERTIES } from 'App/Tone';
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

const properties = Object.values(CHANNEL_PROPERTIES);
const MixSample = ({ i }) => {
  const sample = Kit.samples[i];

  const [property, setProperty] = useState(properties[2]);
  const { value, startFunc, moveFunc, endFunc } = useRotaryKnob(sample, property);
  const touchAndMouse = useTouchAndMouse(startFunc, moveFunc, endFunc);
  useApplyValue(sample, property, value);

  const onChange = ({ target: { value } }) => setProperty(value);

  const id = `mixSample${i}`;
  const knobId = id + property;
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
        <select
          id='mixerSelect'
          className='customSelect'
          value={property}
          onChange={onChange}
        >
          {properties.map((property) => {
            return (
              <option key={`option-${id}-${property}`} value={property}>
                {property}
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

const useApplyValue = (sample, property, value) => {
  const prevPropertyRef = useRef(null);
  useEffect(() => {
    if (prevPropertyRef.current !== property) return (prevPropertyRef.current = property);
    sample[property].set({ gain: value / 100 });
  }, [property, sample, value]);
};

const useRotaryKnob = (sample, property) => {
  const [value, setValue] = useState(sample[property].gain.value * 100);
  useEffect(() => {
    setValue(sample[property].gain.value * 100);
  }, [property, sample]);

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
