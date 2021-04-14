import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import {
  StopIcon,
  StartIcon,
  PauseIcon,
  CheckIcon,
  RecordIcon,
  RecordPauseIcon,
  RestartIcon,
} from 'assets/icons';
import { changeBpm } from 'App/reducers/sequenceSlice';
import {
  pauseSequence,
  startSequence,
  stopSequence,
} from 'App/reducers/toneSlice';
import { MODES } from 'App/reducers/editorSlice';
import { startRecord } from 'App/reducers/thunks/toneThunks';

export const TransportPanel = () => {
  const dispatch = useDispatch();

  const mode = useSelector((state) => state.editor.mode);
  const transportState = useSelector((state) => state.tone.transportState);
  const loadingSamples = useSelector((state) => state.tone.loadingSamples);
  const countingIn = useSelector((state) => state.tone.countingIn);

  const bpm = useSelector((state) => state.sequence.present.bpm);
  useEffect(() => {
    setTempBpm(bpm);
  }, [bpm]);

  const [tempBpm, setTempBpm] = useState(bpm);
  const [bpmEdited, setBpmEdited] = useState(false);

  const [ready, setReady] = useState(true);
  useEffect(() => {
    setReady(!loadingSamples);
  }, [loadingSamples]);

  const transportMemo = useMemo(() => {
    // console.log('rendering: TransportPanel');

    const onChange = ({ target: { value } }) => {
      if (value.match(/\D/)) return;
      const newTempo = value > 300 ? 300 : value;
      setTempBpm(newTempo);
      if (newTempo !== bpm) {
        setBpmEdited(true);
      } else {
        setBpmEdited(false);
      }
    };

    const onStop = () => {
      if (transportState !== 'stopped') dispatch(stopSequence());
    };
    const onStart = () => {
      if (transportState === 'started') {
        dispatch(pauseSequence());
      } else {
        dispatch(startSequence());
      }
    };
    const onRecord = () => {
      dispatch(startRecord());
    };

    const handleBpm = () => {
      dispatch(changeBpm(tempBpm));
      setBpmEdited(false);
    };

    const onKeyPress = (e) => {
      if (e.key === 'Enter') {
        if (bpmEdited) handleBpm();
      }
    };

    return (
      <div className='menuItems transport'>
        <div className='transportWrapper'>
          <Button
            id='stop'
            classes='menuBtn'
            aria-label='stop'
            disabled={countingIn}
            onClick={onStop}
          >
            <StopIcon />
          </Button>
          {mode === MODES.TAP_RECORD ? (
            <Button
              id='record'
              classes={!ready ? 'menuBtn flashing' : 'menuBtn'}
              disabled={!ready || countingIn}
              aria-label='record'
              onClick={onRecord}
            >
              {transportState === 'started' ? <RestartIcon /> : <RecordIcon />}
            </Button>
          ) : (
            <Button
              id='start'
              classes={!ready ? 'menuBtn flashing' : 'menuBtn'}
              disabled={!ready}
              aria-label='start'
              onClick={onStart}
            >
              {transportState === 'started' ? <PauseIcon /> : <StartIcon />}
            </Button>
          )}
          <div className='inputWrapper'>
            <input
              id='bpm'
              className={bpmEdited ? 'input edited' : 'input'}
              type='tel'
              value={tempBpm}
              onChange={onChange}
              onKeyPress={onKeyPress}
            ></input>
            <div className='bpmOrBtn'>
              {bpmEdited ? (
                <Button id='bpmBtn' classes='bpmBtn' onClick={handleBpm}>
                  <label htmlFor='bpmBtn'>
                    <CheckIcon />
                  </label>
                </Button>
              ) : (
                <label htmlFor='bpm'>bpm</label>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }, [
    bpm,
    bpmEdited,
    countingIn,
    dispatch,
    mode,
    ready,
    tempBpm,
    transportState,
  ]);
  return transportMemo;
};
