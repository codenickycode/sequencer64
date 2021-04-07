import React, { useEffect, useRef } from 'react';
import { MODES } from 'App/reducers/editorSlice';
import { Button } from 'App/shared/Button';
import { ChevronLeftIcon, ChevronDownIcon } from 'assets/icons';
import { MIDI_NOTES } from 'utils/MIDI_NOTES';
import { usePitchVelocityLength } from './usePitchVelocityLength';

export const PitchVelocityLength = ({ onReturn, mode }) => {
  const {
    value,
    onChange,
    onTouchEnd,
    onReset,
    toggleAll,
    editAll,
  } = usePitchVelocityLength(mode);

  // disable passive eventListener hack
  const inputRef = useRef(null);
  useEffect(() => {
    let keepRef = inputRef;
    if (keepRef.current)
      keepRef.current.addEventListener('touchend', onTouchEnd, {
        passive: false,
      });
    return () => {
      if (keepRef.current)
        keepRef.current.removeEventListener('touchend', onTouchEnd);
    };
  }, [onTouchEnd]);

  return (
    <div className='detail col'>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='modWrapper'>
        {mode === MODES.MOD_PITCH ? (
          <>
            <label htmlFor='pitchSelect' className='selectLabel'>
              Select Pitch:
            </label>
            <div className='customSelectWrapper'>
              <select
                id='pitchSelect'
                className='customSelect'
                value={value}
                onChange={onChange}
              >
                {/* limit C1-C3 */}
                {MIDI_NOTES.slice(12, 37).map((note) => {
                  return (
                    <option key={`pitch-${note}`} value={note}>
                      {note}
                    </option>
                  );
                })}
              </select>
              <ChevronDownIcon />
            </div>
          </>
        ) : (
          <>
            <input
              ref={inputRef}
              type='range'
              id='modSlider'
              min={0.1}
              max={1}
              step={0.01}
              value={value}
              onMouseUp={onTouchEnd}
              onChange={onChange}
            />
            <div className='modValueWrapper'>
              <label htmlFor='modSlider' className='modLabel'>
                {mode && mode.substr(0, 1).toUpperCase() + mode.substr(1)}{' '}
                Value:
              </label>
              <p className='mod-value'>{value}</p>
            </div>
          </>
        )}
        <div className='modBtns'>
          <Button onClick={onReset}>Reset All</Button>
          <Button classes={editAll ? 'bgGreen' : ''} onClick={toggleAll}>
            Apply All
          </Button>
        </div>
      </div>
    </div>
  );
};
