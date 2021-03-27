import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { INITIAL_MODS, MODES, setModVal } from '../../reducers/editorSlice';
import { Button } from '../../../../components/Button';
import { ChevronLeftIcon, ChevronDownIcon } from '../../../../icons';
import { modAll, resetMods } from '../../reducers/sequenceSlice';
import { MIDI_NOTES } from '../../utils/MIDI_NOTES';

export const PitchVelocityLength = ({
  onReturn,
  mode,
  showEditable,
  hideEditable,
}) => {
  const dispatch = useDispatch();
  const selectedSample = useSelector((state) => state.editor.selectedSample);
  const value = useSelector((state) => state.editor.mods[mode]);

  const [editAll, setEditAll] = useState(true);

  const onChange = ({ target: { value } }) => {
    dispatch(setModVal(value));
  };

  const dispatchModAll = () => {
    dispatch(
      modAll({
        selectedSample,
        type: mode,
        value,
      })
    );
  };

  const toggleAll = () => {
    if (editAll) {
      setEditAll(false);
      showEditable();
    } else {
      dispatchModAll();
      setEditAll(true);
      hideEditable();
    }
  };

  // velocity & length
  const onTouchEnd = () => {
    if (editAll) dispatchModAll();
  };

  useEffect(() => {
    if (mode === MODES.MOD_PITCH && editAll)
      dispatch(
        modAll({
          selectedSample,
          type: MODES.MOD_PITCH,
          value,
        })
      );
  }, [dispatch, editAll, mode, selectedSample, value]);

  const onReset = () => {
    dispatch(setModVal(INITIAL_MODS[mode]));
    dispatch(resetMods({ selectedSample, type: mode }));
  };

  return (
    <div className='sample-edit-detail col'>
      <Button classes='sample-edit-close' onClick={onReturn}>
        <ChevronLeftIcon />
      </Button>
      <div className='mod-wrapper'>
        {mode === MODES.MOD_PITCH ? (
          <>
            <label htmlFor='pitch-select'>Select Pitch: </label>
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
              id='mod-velocity-slider'
              min={0.1}
              max={1}
              step={0.01}
              value={value}
              onChange={onChange}
              onTouchEnd={onTouchEnd}
            />
            <div className='mod-value-wrapper'>
              <label htmlFor='mod-velocity-slider' className='mod-label'>
                Velocity Value:
              </label>
              <p className='mod-value'>{value}</p>
            </div>
          </>
        )}
        <div className='mod-btns'>
          <Button classes='sample-edit-btn mod-all' onClick={onReset}>
            Reset All
          </Button>
          <Button classes='sample-edit-btn mod-all' onClick={toggleAll}>
            {editAll ? 'Tap Cell' : 'Apply All'}
          </Button>
        </div>
      </div>
    </div>
  );
};
