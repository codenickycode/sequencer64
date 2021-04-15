import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TransportBtn } from 'App/shared/Button';
import {
  StopIcon,
  StartIcon,
  PauseIcon,
  CheckIcon,
  RecordIcon,
  RestartIcon,
} from 'assets/icons';
import { changeBpm } from 'App/reducers/sequenceSlice';
import { pauseSequence, startSequence, stopSequence } from 'App/reducers/toneSlice';
import { startRecord } from 'App/reducers/thunks/toneThunks';
import { useAbstractState } from 'utils/hooks/useAbstractState';

export const TransportPanel = () => {
  return (
    <div className='menuItems transport'>
      <div className='transportWrapper'>
        <TransportBtns />
        <BpmInput />
      </div>
    </div>
  );
};

const TransportBtns = () => {
  const dispatch = useDispatch();
  const { show } = useAbstractState();
  const { recordBtn, restartBtn, startBtn, pauseBtn } = show;

  const onStop = () => dispatch(stopSequence());
  const onRecord = () => dispatch(startRecord());
  const onStart = () => dispatch(startSequence());
  const onPause = () => dispatch(pauseSequence());
  return (
    <>
      <TransportBtn id='stop' onClick={onStop} Icon={StopIcon} show={true} />
      <TransportBtn id='record' onClick={onRecord} Icon={RecordIcon} show={recordBtn} />
      <TransportBtn id='restart' onClick={onRecord} Icon={RestartIcon} show={restartBtn} />
      <TransportBtn id='start' onClick={onStart} Icon={StartIcon} show={startBtn} />
      <TransportBtn id='pause' onClick={onPause} Icon={PauseIcon} show={pauseBtn} />
    </>
  );
};

const BpmInput = () => {
  const dispatch = useDispatch();

  const bpm = useSelector((state) => state.sequence.present.bpm);
  useEffect(() => {
    setTempBpm(bpm);
  }, [bpm]);
  const [tempBpm, setTempBpm] = useState(bpm);
  const [bpmEdited, setBpmEdited] = useState(false);

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
  );
};
