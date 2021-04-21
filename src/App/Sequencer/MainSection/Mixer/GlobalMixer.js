import { mainBus } from 'App/Tone';
import { Portal } from 'App/shared/Portal';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { Knob } from './Knob';
import { useRotaryKnob } from 'hooks/useRotaryKnob';
import { useEffect, useState } from 'react';
import { Button } from 'App/shared/Button';

export const GlobalMixer = () => {
  return (
    <Portal targetId='overGridPortal'>
      <div id='mixer' className='mixer'>
        <div className='mixItemWrapper global'>
          {Object.entries(mainBus.mixer).map(([property, node], i) => {
            const currentVal = node.getVal();
            return (
              <RotaryKnob
                key={`rotaryKnob${i}`}
                property={property}
                node={node}
                currentVal={currentVal}
              />
            );
          })}
        </div>
      </div>
    </Portal>
  );
};

const RotaryKnob = ({ property, node, currentVal }) => {
  const { value, reset, startFunc, moveFunc, endFunc } = useRotaryKnob(currentVal, node);
  const [editing, setEditing] = useState(false);

  const handleStart = (e) => {
    setEditing(true);
    startFunc(e);
  };

  const handleEnd = (e) => {
    setEditing(false);
    endFunc(e);
  };

  const touchAndMouse = useTouchAndMouse(handleStart, moveFunc, handleEnd);

  useEffect(() => {
    node.setVal(value);
  }, [node, value]);

  const id = `globalMixItem${property}`;
  const knobId = `${id}Knob`;
  let containerClass = 'mixItem';
  if (editing) containerClass += ' editing';
  return (
    <div id={id} className={containerClass}>
      <p className='mixItemName'>{property}</p>
      <div className='mixProperties global'>
        <Knob value={value} id={knobId} {...touchAndMouse} onDoubleClick={reset} />
        <Button disabled={node.snapback} classes='reset' onClick={reset}>
          reset
        </Button>
      </div>
    </div>
  );
};