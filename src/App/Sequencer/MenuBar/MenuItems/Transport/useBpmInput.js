import { changeBpm } from 'App/reducers/sequenceSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useBpmInput = () => {
  const dispatch = useDispatch();

  const bpm = useSelector((state) => state.sequence.present.bpm);
  const [tempBpm, setTempBpm] = useState(bpm);
  const [bpmEdited, setBpmEdited] = useState(false);

  useEffect(() => {
    setTempBpm(bpm);
  }, [bpm]);

  useEffect(() => {
    if (tempBpm !== bpm) setBpmEdited(true);
    else setBpmEdited(false);
  }, [bpm, tempBpm]);

  const onChange = ({ target: { value } }) => {
    if (value.match(/\D/)) return;
    const newTempo = value > 300 ? 300 : value;
    setTempBpm(newTempo);
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

  return { bpmEdited, tempBpm, onChange, onKeyPress, handleBpm };
};
