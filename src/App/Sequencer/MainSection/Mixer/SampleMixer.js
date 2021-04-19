import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'App/shared/Portal';
import { getGrid } from 'utils/getGrid';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Knob } from './Knob';
import { Kit, FX } from 'App/Tone';
import { ArrowUpDownIcon, ChevronDownIcon } from 'assets/icons';
import { useRotaryKnob } from 'hooks/useRotaryKnob';

export const SampleMixer = () => {
  const grid = getGrid(9);
  return (
    <Portal targetId='overGridPortal'>
      <div id='mixer' className='mixer'>
        <div className='mixItemWrapper mixSamples'>
          {grid.map((i) => {
            return <MixSample key={`mixItem${i}`} i={i} />;
          })}
        </div>
      </div>
    </Portal>
  );
};

const fxKeys = Object.keys(FX);
const MixSample = ({ i }) => {
  const sample = Kit.samples[i];

  const [property, setProperty] = useState('volume');
  const initialVal = getInitialValue(sample, property);

  const onChange = ({ target: { value } }) => setProperty(value);

  const id = `mixItem${i}`;
  const knobId = id + property;
  return (
    <div id={id} className='mixItem'>
      <p className='mixItemName'>{sample.name}</p>
      <RotaryKnob
        property={property}
        sample={sample}
        initialVal={initialVal}
        knobId={knobId}
      />
      <div className='customSelectWrapper'>
        <select
          id='mixerSelect'
          className='customSelect'
          value={property}
          onChange={onChange}
        >
          <option value='volume'>volume</option>
          <option value='pan'>pan</option>
          {fxKeys.map((property) => {
            return (
              <option key={`option-${id}-${property}`} value={property}>
                {property}
              </option>
            );
          })}
        </select>
        <ChevronDownIcon />
      </div>
      <div className={`mixItemBorder border${i}`} />
    </div>
  );
};

const RotaryKnob = ({ property, sample, initialVal, knobId }) => {
  const { value, startFunc, moveFunc, endFunc } = useRotaryKnob(initialVal);
  const touchAndMouse = useTouchAndMouse(startFunc, moveFunc, endFunc);

  const prevPropertyRef = useRef(null);
  useEffect(() => {
    if (prevPropertyRef.current !== property) return (prevPropertyRef.current = property);
    if (property === 'volume') {
      let newVal = (value - 100) * 0.25;
      return (sample.channel.volume.value = newVal);
    }
    if (property === 'pan') return (sample.channel.pan.value = (value - 50) / 100);
    sample[property].set({ gain: value / 100 });
  }, [property, sample, value]);

  return (
    <div className='knobWrapper'>
      <div className='knob' id={knobId} {...touchAndMouse}>
        <label htmlFor={knobId}>
          <ArrowUpDownIcon />
        </label>
        <Knob value={value} />
      </div>
    </div>
  );
};

const getInitialValue = (sample, property) => {
  console.log(sample, property);
  if (property === 'volume') {
    let value = sample.channel.volume.value * 4 + 100;
    if (value > 100) value = 100;
    return value;
  }
  if (property === 'pan') return sample.channel.pan.value + 50;
  else return sample[property].gain.value * 100;
};
