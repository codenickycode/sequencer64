import React, { useEffect, useRef } from 'react';
import { Portal } from 'App/shared/Portal';
import { getGrid } from 'utils/getGrid';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Kit } from 'App/Tone';
import { useRotaryKnob } from 'hooks/useRotaryKnob';
import { ArrowUpDownIcon } from 'assets/icons';

export const SampleMixer = () => {
  const grid = getGrid(Kit.samples.length);
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

const MixSample = ({ i }) => {
  const sample = Kit.samples[i];
  const id = `mixItem${i}`;
  return (
    <div className='mixItem'>
      <p className='mixItemName'>{sample.name}</p>
      <div id={id} className='mixProperties'>
        <MixItemProperty property='vol' sample={sample} currentVal={sample.vol.getVal()} />
        <MixItemProperty property='pan' sample={sample} currentVal={sample.pan.getVal()} />
        <div className={`mixItemBorder border${i}`} />
      </div>
    </div>
  );
};

const MixItemProperty = ({ property, sample, currentVal }) => {
  const { value, reset, startFunc, moveFunc, endFunc } = useRotaryKnob(currentVal, sample);
  const touchAndMouse = useTouchAndMouse(startFunc, moveFunc, endFunc);

  useEffect(() => {
    sample[property].setVal(value);
  }, [property, sample, value]);

  let formattedValue = property === 'pan' ? formatPan(value) : parseInt(value);
  return (
    <div className='mixItemProperty' {...touchAndMouse} onDoubleClick={reset}>
      <p className='propertyName'>{property}:</p>
      <p className='propertyValue'>{formattedValue}</p>
      <ArrowUpDownIcon />
    </div>
  );
};

const formatPan = (value) => {
  if (value === 50) return 'C';
  if (value < 50) return (value - 50).toString().replace('-', 'L');
  if (value > 50) return 'R' + (value - 50);
};
