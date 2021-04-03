import React from 'react';
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

  return (
    <div className='detail col'>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='mod-wrapper'>
        {mode === MODES.MOD_PITCH ? (
          <>
            <label htmlFor='pitch-select' className='select-label'>
              Select Pitch:
            </label>
            <div className='custom-select-wrapper'>
              <select
                id='pitch-select'
                className='custom-select'
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
              type='range'
              id='mod-slider'
              min={0.1}
              max={1}
              step={0.01}
              value={value}
              onChange={onChange}
              onTouchEnd={onTouchEnd}
            />
            <div className='mod-value-wrapper'>
              <label htmlFor='mod-slider' className='mod-label'>
                {mode && mode.substr(0, 1).toUpperCase() + mode.substr(1)}{' '}
                Value:
              </label>
              <p className='mod-value'>{value}</p>
            </div>
          </>
        )}
        <div className='mod-btns'>
          <Button onClick={onReset}>Reset All</Button>
          <Button classes={editAll ? 'bgGreen' : ''} onClick={toggleAll}>
            Apply All
          </Button>
        </div>
      </div>
    </div>
  );
};
