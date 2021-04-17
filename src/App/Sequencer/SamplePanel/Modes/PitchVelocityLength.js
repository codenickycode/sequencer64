import React, { useMemo } from 'react';
import { Button } from 'App/shared/Button';
import { ChevronLeftIcon, ChevronDownIcon } from 'assets/icons';
import { MIDI_NOTES } from 'utils/MIDI_NOTES';
import { useTouchAndMouse } from 'hooks/useTouchAndMouse';
import { useSelector } from 'react-redux';
import { useVelocityAndLength } from 'App/Sequencer/SamplePanel/Modes/useVelocityAndLength';
import { usePitch } from './usePitch';

export const PitchVelocityLength = ({ onReturn, moddingPitch }) => {
  const splitSamplePanel = useSelector((state) => state.screen.splitSamplePanel);
  const containerClass = splitSamplePanel ? 'detail col' : 'detail col dark';
  return (
    <div className={containerClass}>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='modWrapper'>
        {moddingPitch && <Pitch />}
        {!moddingPitch && <VelocityAndLength />}
      </div>
    </div>
  );
};

const Pitch = () => {
  const { value, applyInfo, onChange, onReset, editAll, toggleAll } = usePitch();
  const memo = useMemo(() => {
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
        <ModBtns onReset={onReset} editAll={editAll} toggleAll={toggleAll} />
      </>
    );
  }, [applyInfo, editAll, onChange, onReset, toggleAll, value]);
  return memo;
};

const VelocityAndLength = () => {
  const { sliderRef, setSliderValue, endFunc, styles, state } = useVelocityAndLength();
  const { value, applyInfo, onReset, editAll, toggleAll } = state;
  const touchAndMouse = useTouchAndMouse(setSliderValue, setSliderValue, endFunc);
  const memo = useMemo(() => {
    return (
      <>
        <div ref={sliderRef} className='modSliderWrapper' {...touchAndMouse}>
          <div id='modSlider' style={styles.slider} />
          <div className='modSliderThumbWrapper' style={styles.thumb}>
            <div className='modSliderThumb' />
          </div>
        </div>
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
        <ModBtns onReset={onReset} editAll={editAll} toggleAll={toggleAll} />
      </>
    );
  }, [
    applyInfo,
    editAll,
    onReset,
    sliderRef,
    styles.slider,
    styles.thumb,
    toggleAll,
    touchAndMouse,
    value,
  ]);
  return memo;
};

const ModBtns = ({ onReset, editAll, toggleAll }) => {
  return (
    <div className='modBtns'>
      <Button onClick={onReset}>Reset All</Button>
      <Button classes={editAll ? 'bgGreen' : ''} onClick={toggleAll}>
        Apply All
      </Button>
    </div>
  );
};
