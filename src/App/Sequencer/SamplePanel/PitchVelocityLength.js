import React from 'react';
import { MODES } from 'App/reducers/editorSlice';
import { Button } from 'App/shared/Button';
import { ChevronLeftIcon, ChevronDownIcon } from 'assets/icons';
import { MIDI_NOTES } from 'utils/MIDI_NOTES';
import { usePitchVelocityLength } from './usePitchVelocityLength';
import { useTouchAndMouse } from 'utils/hooks/useTouchAndMouse';

export const PitchVelocityLength = ({ onReturn, editorMode, modPitchMode }) => {
  const {
    applyInfo,
    containerClasses,
    value,
    onChange,
    onTouchEnd,
    onReset,
    toggleAll,
    editAll,
  } = usePitchVelocityLength(editorMode, modPitchMode);
  return (
    <div className={containerClasses}>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='modWrapper'>
        {editorMode === MODES.MOD_PITCH ? (
          <Pitch value={value} onChange={onChange} applyInfo={applyInfo} />
        ) : (
          <VelocityAndLength
            onTouchEnd={onTouchEnd}
            value={value}
            onChange={onChange}
            applyInfo={applyInfo}
          />
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

const Pitch = ({ value, onChange, applyInfo }) => {
  return (
    <>
      {applyInfo.value ? (
        <p className={applyInfo.classes}>{applyInfo.value}</p>
      ) : (
        <label htmlFor='pitchSelect' className='selectLabel'>
          Select Pitch:
        </label>
      )}
      <div className='customSelectWrapper'>
        <select id='pitchSelect' className='customSelect' value={value} onChange={onChange}>
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
  );
};

const VelocityAndLength = ({ onTouchEnd, value, onChange, applyInfo }) => {
  const { touchStart, touchEnd, mouseUp } = useTouchAndMouse(null, null, onTouchEnd);

  return (
    <>
      <input
        type='range'
        id='modSlider'
        min={0.1}
        max={1}
        step={0.01}
        value={value}
        onTouchStart={touchStart}
        onTouchEnd={touchEnd}
        onMouseUp={mouseUp}
        onChange={onChange}
      />
      <div className='modValueWrapper'>
        {applyInfo.value ? (
          <p className={applyInfo.classes}>{applyInfo.value}</p>
        ) : (
          <>
            <label htmlFor='modSlider' className='modLabel'>
              Apply value:
            </label>
            <p className='modValue'>{value}</p>
          </>
        )}
      </div>
    </>
  );
};
