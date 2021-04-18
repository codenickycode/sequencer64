import cuid from 'cuid';
import React, { useEffect, useRef, useState } from 'react';
import { Portal } from 'App/shared/Portal';
import { getGrid } from 'utils/getGrid';
import { Button } from 'App/shared/Button';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Knob } from './Knob';
import { useSelector } from 'react-redux';
import { Kit } from 'App/Tone';

export const FX = () => {
  const grid = getGrid(9);
  return (
    <Portal targetId='overGridPortal'>
      <div id='mixer' className='mixer'>
        <div className='fxSamples'>
          {grid.map((i) => {
            return <FXSample key={cuid.slug()} i={i} />;
          })}
        </div>
      </div>
    </Portal>
  );
};

const FXSample = ({ i }) => {
  // const kitName = useSelector((state) => state.sequence.present.kit);
  // const sample = useSelector((state) => state.assets.kits[kitName].samples[i]);
  const sample = Kit.samples[i];
  console.log(sample);

  const [edit, setEdit] = useState('filter');
  const { value, startFunc, moveFunc, endFunc } = useRotaryKnob();
  const touchAndMouse = useTouchAndMouse(startFunc, moveFunc, endFunc);
  useApplyFX(i, value);

  const onClick = (type) => setEdit(type);

  const id = `fxSample${i}`;
  return (
    <div id={id} className='fxSample'>
      <p>{sample.name}</p>
      <div className='knob-wrapper'>
        <div className='knob' id='length-knob' {...touchAndMouse}>
          <label htmlFor='length-knob'>{edit}</label>
          <Knob value={value} />
        </div>
      </div>
      <div className='smallBtns'>
        <FXButton type='delay' edit={edit} onClick={() => onClick('delay')}>
          delay
        </FXButton>
        <FXButton type='reverb' edit={edit} onClick={() => onClick('reverb')}>
          reverb
        </FXButton>
      </div>
      <div className={`fxSampleBorder border${i}`} />
    </div>
  );
};

const useApplyFX = (i, value) => {
  useEffect(() => {
    Kit.samples[i].filter.set({ frequency: (20000 * value) / 100 });
  }, [i, value]);
};

const useRotaryKnob = () => {
  const [value, setValue] = useState(100);

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

const FXButton = ({ type, edit, onClick }) => {
  const id = `fx${type}`;
  const classes = edit === type ? 'active' : '';
  return (
    <Button id={id} classes={classes} edit={type} onClick={onClick}>
      <label htmlFor={id}>{type.substr(0, 1)}</label>
    </Button>
  );
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
