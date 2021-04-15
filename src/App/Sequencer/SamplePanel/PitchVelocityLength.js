import React from 'react';
import { MODES } from 'App/reducers/editorSlice';
import { Button } from 'App/shared/Button';
import { ChevronLeftIcon, ChevronDownIcon } from 'assets/icons';
import { MIDI_NOTES } from 'utils/MIDI_NOTES';
import { usePitchVelocityLength } from './usePitchVelocityLength';
import { useTouchAndMouse } from 'utils/hooks/useTouchAndMouse';
import { useSelector } from 'react-redux';

export const PitchVelocityLength = ({ onReturn }) => {
  const values = usePitchVelocityLength();
  return (
    <div className={values.containerClasses}>
      <Button classes='close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='modWrapper'>
        <Pitch {...values} />
        <VelocityAndLength {...values} />
        <div className='modBtns'>
          <Button onClick={values.onReset}>Reset All</Button>
          <Button classes={values.editAll ? 'bgGreen' : ''} onClick={values.toggleAll}>
            Apply All
          </Button>
        </div>
      </div>
    </div>
  );
};

const Pitch = ({ value, onChange, applyInfo }) => {
  const editorMode = useSelector((state) => state.editor.mode);
  return editorMode !== MODES.MOD_PITCH ? null : (
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

const VelocityAndLength = ({ sliderRef, setSliderValue, endFunc, value, applyInfo }) => {
  const editorMode = useSelector((state) => state.editor.mode);
  const touchAndMouse = useTouchAndMouse(setSliderValue, setSliderValue, endFunc);
  if (editorMode === MODES.MOD_PITCH) return null;
  const sliderStyle = { transform: `scaleX(${value.toFixed(2)})` };
  const thumbStyle = { transform: `translateX(${parseInt(value * 100)}%)` };
  // console.log(thumbStyle.transform);
  return (
    <>
      <div ref={sliderRef} className='modSliderWrapper' {...touchAndMouse}>
        <div id='modSlider' style={sliderStyle} />
        <div className='modSliderThumbWrapper' style={thumbStyle}>
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
    </>
  );
};
