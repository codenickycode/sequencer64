import { getPatternFromStr } from 'App/reducers/functions/sequence';
import { loadSequence } from 'App/reducers/sequenceSlice';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defaultSequences } from 'utils/defaultSequences';

export const useSelectSequence = () => {
  const dispatch = useDispatch();
  const userSequences = useSelector((state) => state.app.userSequences);
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
        pattern: getPatternFromStr(sequence.pattern),
      })
    );
    setSelectedId(_id);
  };
  return { selectSequence, selectedId };
};
