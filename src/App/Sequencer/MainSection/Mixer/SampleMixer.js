import React, { useCallback, useRef, useState } from 'react';
import { Portal } from 'App/shared/Portal';
import { getGrid } from 'utils/getGrid';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Kit } from 'App/Tone';
import { ArrowUpDownIcon } from 'assets/icons';
import {
  adjustSampleMixer,
  resetSampleMixerProperty,
  SAMPLE_MIXER_PROPERTIES,
} from 'App/reducers/sequenceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getY } from 'utils/getY';
import { disableScrolling, enableScrolling } from 'utils/disableScrolling';

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
  const sampleName = Kit.samples[i].name;
  const value = useSelector((state) => state.sequence.present.sampleMixer[i]);
  const id = `mixItem${i}`;
  return (
    <div className='mixItem'>
      <p className='mixItemName'>{sampleName}</p>
      <div id={id} className='mixProperties'>
        <MixItemProperty
          property='vol'
          value={value.vol}
          properties={SAMPLE_MIXER_PROPERTIES.vol}
          sample={i}
        />
        <MixItemProperty
          property='pan'
          value={value.pan}
          properties={SAMPLE_MIXER_PROPERTIES.pan}
          sample={i}
        />
        <div className={`mixItemBorder border${i}`} />
      </div>
    </div>
  );
};

const MixItemProperty = ({ property, value, properties, sample }) => {
  const dispatch = useDispatch();

  const adjustSample = useCallback(
    (amount) => {
      dispatch(adjustSampleMixer({ sample, property, amount }));
    },
    [dispatch, property, sample]
  );

  const [editing, setEditing] = useState(false);

  const prevYRef = useRef(null);

  const startFunc = useCallback((e) => {
    disableScrolling();
    setEditing(true);
    prevYRef.current = getY(e);
  }, []);

  const moveFunc = (e) => {
    const newY = getY(e);
    let amount = prevYRef.current - newY;
    adjustSample(amount);
    prevYRef.current = newY;
  };

  const reset = useCallback(() => {
    dispatch(resetSampleMixerProperty({ sample, property }));
  }, [dispatch, property, sample]);

  const endFunc = useCallback(() => {
    setEditing(false);
    if (properties.snapback) setTimeout(reset, 0);
    prevYRef.current = null;
    enableScrolling();
  }, [properties.snapback, reset]);

  const touchAndMouse = useTouchAndMouse(startFunc, moveFunc, endFunc);

  let mixItemPropertyClass = 'mixItemProperty';
  if (editing) mixItemPropertyClass += ' editing';
  let formattedValue = property === 'pan' ? formatPan(value) : parseInt(value);
  return (
    <div className={mixItemPropertyClass} {...touchAndMouse} onDoubleClick={reset}>
      <p className='propertyName'>{property}:</p>
      <p className='propertyValue'>{formattedValue}</p>
      <ArrowUpDownIcon />
    </div>
  );
};

const formatPan = (value) => {
  if (value < 41) return ((value - 50) * 2).toString().replace('-', 'L');
  if (value > 59) return 'R' + (value - 50) * 2;
  else return 'C';
};
