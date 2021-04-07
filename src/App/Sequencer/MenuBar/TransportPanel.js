import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'App/shared/Button';
import { StopIcon, StartIcon, PauseIcon, CheckIcon } from 'assets/icons';
import { changeBpm } from 'App/reducers/sequenceSlice';
import {
  pauseSequence,
  startSequence,
  stopSequence,
} from 'App/reducers/toneSlice';
import { Kit } from 'App/shared/KitProvider';
import { startTone } from 'App/reducers/thunks/toneThunks';

export const TransportPanel = () => {
  const dispatch = useDispatch();

  const { kitRef } = useContext(Kit);

  const transportState = useSelector((state) => state.tone.transportState);
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);
  const audioContextReady = useSelector(
    (state) => state.tone.audioContextReady
  );

  const bpm = useSelector((state) => state.sequence.present.bpm);
  useEffect(() => {
    setTempBpm(bpm);
  }, [bpm]);

  const [tempBpm, setTempBpm] = useState(bpm);
  const [bpmEdited, setBpmEdited] = useState(false);

  const [ready, setReady] = useState(true);
  useEffect(() => {
    if (!ready && buffersLoaded) {
      setReady(true);
    }
  }, [ready, buffersLoaded]);

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
    const onStart = async () => {
      if (transportState === 'started') {
        dispatch(pauseSequence());
      } else {
        setReady(false);
        // if (!audioContextReady) dispatch(startTone(kitRef.current));
        // if (audioContextReady) dispatch(startSequence(kitRef.current));
        window.log('starting sequence');
        dispatch(startSequence(kitRef.current));
      }
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
            onClick={onStop}
          >
            <StopIcon />
          </Button>
          <Button
            id='start'
            classes={!ready ? 'menuBtn flashing' : 'menuBtn'}
            disabled={!ready}
            aria-label='start'
            onClick={onStart}
          >
            {transportState === 'started' ? <PauseIcon /> : <StartIcon />}
          </Button>
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
    audioContextReady,
    bpm,
    bpmEdited,
    dispatch,
    kitRef,
    ready,
    tempBpm,
    transportState,
  ]);
  return transportMemo;
};
