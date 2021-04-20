import { mainBus } from 'App/Tone';
import { Portal } from 'App/shared/Portal';
import { ArrowUpDownIcon } from 'assets/icons';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Knob } from './Knob';
import { useRotaryKnob } from 'hooks/useRotaryKnob';
import { useEffect } from 'react';

export const GlobalMixer = () => {
  return (
    <Portal targetId='overGridPortal'>
      <div id='mixer' className='mixer'>
        <div className='mixItemWrapper'>
          {Object.entries(mainBus.mixer).map(([property, node], i) => {
            const initialVal = getInitialValue(property, node);
            return (
              <RotaryKnob
                key={`rotaryKnob${i}`}
                property={property}
                node={node}
                initialVal={initialVal}
              />
            );
          })}
        </div>
      </div>
    </Portal>
  );
};

const RotaryKnob = ({ property, node, initialVal }) => {
  console.log(`property: ${property} | initialValue: ${initialVal}`);
  const { value, startFunc, moveFunc, endFunc } = useRotaryKnob(initialVal);
  const touchAndMouse = useTouchAndMouse(startFunc, moveFunc, endFunc);

  useEffect(() => {
    if (property === 'volume') {
      let newVal = (value - 100) * 0.25;
      return (node.value = newVal);
    }
    if (property === 'filter') return (node.frequency = value * 20000);
    if (property === 'pitch shift') return (node.pitch = value - 50);
    if (property === 'envelope') return (node.decay = value / 100);
    if (property === 'delay' || property === 'reverb') return node.set({ gain: value / 100 });
  }, [node, property, value]);

  const id = `globalMixItem${property}`;
  const knobId = `${id}Knob`;
  return (
    <div id={id} className='mixItem'>
      <p className='mixItemName'>{property}</p>
      <div className='knobWrapper'>
        <div className='knob' id={knobId} {...touchAndMouse}>
          <label htmlFor={knobId}>
            <ArrowUpDownIcon />
          </label>
          <Knob value={value} />
        </div>
      </div>
    </div>
  );
};

const getInitialValue = (property, node) => {
  if (property === 'volume') {
    let value = node.value * 4 + 100;
    if (value > 100) value = 100;
    return value;
  }
  if (property === 'filter') return node.frequency / 20000;
  if (property === 'pitch shift') return node.pitch + 50;
  if (property === 'envelope') return node.release * 100; //?!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  if (property === 'delay' || property === 'reverb') return node.gain.value * 100;
};
