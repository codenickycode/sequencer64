import {
  getMainMixerFromStr,
  getPatternFromStr,
  getSampleMixerFromStr,
} from 'App/reducers/functions/sequence';
import { loadSequence } from 'App/reducers/sequenceSlice';
import { setRestarting } from 'App/reducers/toneSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const useSelectSequence = () => {
  const dispatch = useDispatch();
  const defaultSequences = useSelector((state) => state.assets.defaultSequences);
  const userSequences = useSelector((state) => state.assets.userSequences);
  const [selectedId, setSelectedId] = useState(null);

  const selectSequence = (e, _id) => {
    if (_id === selectedId) return;
    e.stopPropagation();
    const type = _id.substr(0, 7);
    let sequence;
    if (type === 'default') {
      sequence = defaultSequences.find((sequence) => sequence._id === _id);
    } else {
      sequence = userSequences.find((sequence) => sequence._id === _id);
    }
    dispatch(
      loadSequence({
        ...sequence,
        pattern: getPatternFromStr(sequence.patternStr),
        mainMixer: getMainMixerFromStr(sequence.mainMixerStr),
        sampleMixer: getSampleMixerFromStr(sequence.sampleMixerStr),
      })
    );
    dispatch(setRestarting(true));
    setSelectedId(_id);
  };
  return { selectSequence, selectedId };
};
