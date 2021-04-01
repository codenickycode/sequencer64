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

export const TransportPanel = () => {
  const dispatch = useDispatch();

  const { kitRef } = useContext(Kit);

  const transportState = useSelector((state) => state.tone.transportState);
  const buffersLoaded = useSelector((state) => state.tone.buffersLoaded);

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
    const onStart = () => {
      if (transportState === 'started') {
        dispatch(pauseSequence());
      } else {
        setReady(false);
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
      <div className='menu-items transport'>
        <div className='transport-wrapper'>
          <Button id='stop' classes='menu-btn' onClick={onStop}>
            <StopIcon />
            <label htmlFor='stop'>stop</label>
          </Button>
          <Button
            id='start'
            classes={!ready ? 'menu-btn flashing' : 'menu-btn'}
            disabled={!ready}
            onClick={onStart}
          >
            {transportState === 'started' ? <PauseIcon /> : <StartIcon />}
            <label htmlFor='start'>start</label>
          </Button>
          <div className='input-div'>
            <input
              id='bpm'
              className={bpmEdited ? 'input edited' : 'input'}
              type='tel'
              value={tempBpm}
              onChange={onChange}
              onKeyPress={onKeyPress}
            ></input>
            <div className='bpm-or-btn'>
              {bpmEdited ? (
                <Button id='bpm-btn' classes='bpm-btn' onClick={handleBpm}>
                  <label htmlFor='bpm-btn'>
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
  }, [bpm, bpmEdited, dispatch, kitRef, ready, tempBpm, transportState]);
  return transportMemo;
};
